import { CSSProperties, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useExplorer } from '../../state/explorer';
import { prefersReducedMotion, setInset } from '../../state/layout';
import { useEscape } from '../../state/escape';
import { useI18n } from '../../i18n';
import { IconButton } from '../ui';
import { SheetContext, useStory } from './context';
import { DeepLinkLine, StoryArticle } from './StoryArticle';
import { EndCard } from './EndCard';
import { Ribbon, ShareButton, StepButtons, StoryBar, StoryFooter, useScrolledPastTitle } from './StoryChrome';

// ════════════════════════════════════════════════════════════════
// The phone shell: a bottom sheet above the time dock with three snap
// points. Peek is a placard (title, the opening lines, "Read the full
// story"); half shows the masthead and the start of the story with the map
// still live; full reads like a page and is modal (scrim, focus trapped).
//
// The sheet is always laid out at full height and only ever moved with a
// transform, so a drag never triggers layout. A clip box ending at the dock
// hides the part that's pushed down.
// ════════════════════════════════════════════════════════════════

type Snap = 'peek' | 'half' | 'full';

const SLOP = 8; // px before a gesture picks an axis
const FLING = 0.5; // px/ms
const CLOSE_PAST_PEEK = 64; // px dragged below peek that closes
const RUBBER = 0.25;
const RUBBER_MAX = 24;
const SLIDE_MS = 320; // matches --dur-slow

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface Metrics {
  clipH: number;
  sheetH: number;
  peek: number;
}

/** Visible heights (px) of each snap point. */
function snapHeights(m: Metrics) {
  const peek = Math.round(Math.min(Math.max(m.peek, 140), m.clipH * 0.55));
  const half = Math.round(m.clipH * 0.52);
  // Half only earns its place when it's clearly between the other two.
  const hasHalf = half - peek >= 72 && m.sheetH - half >= 72;
  return { peek, half: hasHalf ? half : null, full: m.sheetH };
}

interface Gesture {
  id: number;
  x0: number;
  y0: number;
  yStart: number;
  inScroll: boolean;
  locked: boolean;
  samples: { t: number; y: number }[];
}

export function BottomSheet() {
  const { t } = useI18n();
  const x = useExplorer();
  const ctl = useStory();

  const clipRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [snap, setSnapState] = useState<Snap>('peek');
  // Peek shows a reduced layout; it switches to the full article as soon as
  // a drag heads upward, so the story is already there as the sheet rises.
  const [layout, setLayout] = useState<'peek' | 'open'>('peek');
  const [dragging, setDragging] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [m, setM] = useState<Metrics>({ clipH: 0, sheetH: 0, peek: 0 });

  const y = useRef<number | null>(null);
  const gesture = useRef<Gesture | null>(null);
  const closing = useRef(false);
  const suppressClick = useRef(false);
  const reported = useRef(-1);
  // Latest store for stable callbacks: nothing below re-subscribes or
  // re-fires just because some unrelated part of the store changed.
  const live = useRef(x);
  live.current = x;

  // ── Snap geometry (visible heights, px) ──
  const heights = useMemo(() => snapHeights(m), [m]);

  const visibleFor = useCallback(
    (s: Snap) => (s === 'full' ? heights.full : s === 'half' ? heights.half ?? heights.full : heights.peek),
    [heights],
  );

  const applyY = useCallback((next: number) => {
    const el = sheetRef.current;
    if (!el) return;
    y.current = next;
    el.style.transform = `translate3d(0, ${next}px, 0)`;
  }, []);

  // ── Measuring ──
  const measure = useCallback((): Metrics | null => {
    const clip = clipRef.current;
    const sheet = sheetRef.current;
    if (!clip || !sheet) return null;
    const clipH = clip.clientHeight;
    const sheetH = sheet.offsetHeight;
    // Peek is content-driven: down to the bottom of "Read the full story".
    // Only measurable in the peek layout; otherwise keep the last value.
    let peek: number | null = null;
    if (sheet.dataset.layout === 'peek') {
      const more = sheet.querySelector<HTMLElement>('.story-peek-more, .endcard__head');
      if (more) {
        // Layout offsets, not rects: the sheet may be mid-transition.
        let top = 0;
        for (let n: HTMLElement | null = more; n && n !== sheet; n = n.offsetParent as HTMLElement | null) top += n.offsetTop;
        peek = top + more.offsetHeight + 12;
      }
    }
    let next: Metrics = { clipH, sheetH, peek: peek ?? 0 };
    setM((cur) => {
      const p = peek ?? cur.peek;
      next = { clipH, sheetH, peek: p };
      return Math.abs(cur.clipH - clipH) < 1 && Math.abs(cur.sheetH - sheetH) < 1 && Math.abs(cur.peek - p) < 1
        ? cur
        : next;
    });
    return next;
  }, []);

  // Measured on explicit triggers only (layout switch, new story, end card)
  // plus resize observers on everything peek depends on — never "after every
  // render", so an inset change elsewhere can't feed back into a loop.
  useLayoutEffect(() => {
    measure();
  }, [measure, layout, ctl.event.id, ctl.finished]);

  useEffect(() => {
    const ro = new ResizeObserver(() => measure());
    const sheet = sheetRef.current;
    for (const el of [clipRef.current, innerRef.current, sheet?.querySelector('.sheet-head')]) if (el) ro.observe(el);
    let alive = true;
    document.fonts?.ready.then(() => alive && measure());
    return () => {
      alive = false;
      ro.disconnect();
    };
  }, [measure]);

  const report = useCallback((px: number) => {
    if (px === reported.current) return;
    reported.current = px;
    setInset('sheet', 'bottom', px);
  }, []);

  // On open, tell the map where the peek will end up *in this commit*: its
  // flight to the new selection runs in a passive effect, after layout
  // effects, so it frames the marker above the sheet from the first frame.
  useLayoutEffect(() => {
    const first = measure();
    if (first?.sheetH) report(snapHeights(first).peek);
    // Mount only; later changes go through the placement effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Put the sheet where its snap says, and tell the map ──
  useLayoutEffect(() => {
    if (!m.sheetH || dragging || closing.current) return;
    const target = m.sheetH - visibleFor(snap);
    if (y.current === null) {
      // First placement: start below the fold so it slides up.
      applyY(m.sheetH);
      sheetRef.current?.getBoundingClientRect();
    }
    applyY(target);
    report(visibleFor(snap));
  }, [snap, m, dragging, visibleFor, applyY, report]);

  useEffect(
    () => () => {
      // Forget what we reported, or a remount (StrictMode does one) would
      // skip re-reporting the same height after this cleared it.
      reported.current = -1;
      setInset('sheet', 'bottom', 0);
    },
    [],
  );

  // ── Snap changes ──
  const setSnap = useCallback((s: Snap) => {
    // Reaching for more of the story is a sign you want to read it:
    // stop the slideshow under your thumb.
    if (s !== 'peek' && live.current.state.playing) live.current.pause();
    setLayout(s === 'peek' ? 'peek' : 'open');
    setSnapState(s);
  }, []);

  const expand = useCallback(
    (focusHeading = true) => {
      setSnap('full');
      // The button that asked is hidden at full; keep focus somewhere real.
      if (focusHeading) requestAnimationFrame(() => ctl.headingRef.current?.focus({ preventScroll: true }));
    },
    [setSnap, ctl.headingRef],
  );

  const animateClose = useCallback(() => {
    // During a route or autoplay "close" collapses: those modes live here.
    if (live.current.route || live.current.state.playing) {
      setSnap('peek');
      return;
    }
    closing.current = true;
    report(0);
    applyY(m.sheetH + 24);
    window.setTimeout(ctl.close, prefersReducedMotion() ? 0 : SLIDE_MS);
  }, [setSnap, applyY, report, m.sheetH, ctl.close]);

  // The end card needs room — once, when it appears.
  const hasEnd = !!ctl.finished;
  useEffect(() => {
    if (hasEnd) setSnap('full');
  }, [hasEnd, setSnap]);

  // A new story at full keeps reading at full; at peek it re-measures.
  useEffect(() => {
    setAtTop(true);
  }, [ctl.event.id]);

  // ── Full = modal: Escape collapses, Tab stays inside ──
  useEscape(() => setSnap('peek'), snap === 'full');

  useEffect(() => {
    if (snap !== 'full') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const sheet = sheetRef.current;
      if (!sheet) return;
      const items = [...sheet.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((n) => n.getClientRects().length > 0);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const a = document.activeElement as HTMLElement | null;
      if (!a || !sheet.contains(a)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && a === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && a === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [snap]);

  // Tabbing onto something below the visible edge opens the sheet fully.
  // Measured against the sheet's own top, not the viewport: when a story is
  // opened from the map the heading is focused while the sheet is still
  // sliding up, and a viewport test would read that as "below the edge".
  const onFocus = (e: React.FocusEvent) => {
    const sheet = sheetRef.current;
    // The heading always sits in the peek; and before the first measurement
    // there is no "visible edge" to be below.
    if (snap === 'full' || !sheet || closing.current || !m.sheetH || e.target === ctl.headingRef.current) return;
    const below = (e.target as HTMLElement).getBoundingClientRect().bottom - sheet.getBoundingClientRect().top;
    if (below > visibleFor(snap) - 4) setSnap('full');
  };

  // ── Drag ──
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || closing.current || y.current === null) return;
    const scroll = ctl.scrollRef.current;
    const inScroll = !!scroll && scroll.contains(e.target as Node);
    // At full the content scrolls natively; only a pull at the very top
    // belongs to the sheet.
    if (inScroll && snap === 'full' && (scroll?.scrollTop ?? 0) > 0) return;
    gesture.current = {
      id: e.pointerId,
      x0: e.clientX,
      y0: e.clientY,
      yStart: y.current,
      inScroll,
      locked: false,
      samples: [{ t: e.timeStamp, y: e.clientY }],
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const g = gesture.current;
    if (!g || e.pointerId !== g.id) return;
    const dx = e.clientX - g.x0;
    const dy = e.clientY - g.y0;
    if (!g.locked) {
      if (Math.hypot(dx, dy) < SLOP) return;
      if (Math.abs(dx) > 1.5 * Math.abs(dy) || (g.inScroll && snap === 'full' && dy < 0)) {
        gesture.current = null; // horizontal, or scrolling the story
        return;
      }
      g.locked = true;
      sheetRef.current?.setPointerCapture(e.pointerId);
      setDragging(true);
      if (dy < 0 && layout === 'peek') setLayout('open');
    }
    let next = g.yStart + dy;
    if (next < 0) next = -Math.min(RUBBER_MAX, -next * RUBBER);
    applyY(next);
    g.samples.push({ t: e.timeStamp, y: e.clientY });
    while (g.samples.length > 2 && e.timeStamp - g.samples[0].t > 100) g.samples.shift();
  };

  const settle = (velocity: number) => {
    const cur = y.current ?? 0;
    const snaps = (['full', 'half', 'peek'] as Snap[])
      .filter((s) => s !== 'half' || heights.half !== null)
      .map((s) => ({ s, y: m.sheetH - visibleFor(s) })); // ascending y
    const peekY = m.sheetH - heights.peek;
    if (cur > peekY + CLOSE_PAST_PEEK) return animateClose();
    let target: Snap;
    if (Math.abs(velocity) >= FLING) {
      if (velocity > 0) {
        const below = snaps.find((p) => p.y > cur + 4);
        if (!below) return animateClose();
        target = below.s;
      } else {
        const above = [...snaps].reverse().find((p) => p.y < cur - 4);
        target = above ? above.s : 'full';
      }
    } else {
      target = snaps.reduce((a, b) => (Math.abs(b.y - cur) < Math.abs(a.y - cur) ? b : a)).s;
    }
    setSnap(target);
    // Same snap as before: the layout effect won't re-run, so put it back.
    if (target === snap) applyY(m.sheetH - visibleFor(target));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const g = gesture.current;
    gesture.current = null;
    if (!g || !g.locked || e.pointerId !== g.id) return;
    suppressClick.current = true;
    window.setTimeout(() => (suppressClick.current = false), 0);
    const first = g.samples[0];
    const last = g.samples[g.samples.length - 1];
    const dt = Math.max(1, last.t - first.t);
    setDragging(false);
    settle((last.y - first.y) / dt);
  };

  const onPointerCancel = () => {
    const g = gesture.current;
    gesture.current = null;
    if (!g?.locked) return;
    setDragging(false);
    settle(0);
  };

  // A drag that ends over a button must not also press it.
  const onClickCapture = (e: React.MouseEvent) => {
    if (suppressClick.current) {
      e.preventDefault();
      e.stopPropagation();
      suppressClick.current = false;
    }
  };

  const cycle = () => setSnap(snap === 'full' ? 'peek' : 'full');

  const onScroll = () => {
    const top = (ctl.scrollRef.current?.scrollTop ?? 0) <= 0;
    if (top !== atTop) setAtTop(top);
  };

  const scrolled = useScrolledPastTitle(ctl.scrollRef, ctl.headingRef, `${ctl.event.id}-${layout}-${!!ctl.finished}`);
  const full = snap === 'full';
  const style = { ['--pigment' as string]: `var(--type-${ctl.event.type})` } as CSSProperties;

  return (
    <SheetContext.Provider value={{ expand }}>
      {full && <div className="sheet-scrim" aria-hidden="true" onClick={() => setSnap('peek')} />}
      <div className={`sheet-clip${full ? ' is-full' : ''}`} ref={clipRef}>
        <aside
          ref={sheetRef}
          className={`story story--sheet${dragging ? ' is-dragging' : ''}`}
          data-snap={snap}
          data-layout={layout}
          data-at-top={atTop || undefined}
          role={full ? 'dialog' : undefined}
          aria-modal={full || undefined}
          aria-labelledby={ctl.titleId}
          style={style}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onClickCapture={onClickCapture}
          onFocus={onFocus}
        >
          <div className="sheet-head">
            <button
              type="button"
              className="sheet-handle"
              aria-label={t.story.sheetHandle}
              aria-expanded={full}
              onClick={cycle}
            >
              <span className="sheet-handle__pill" aria-hidden="true" />
            </button>
            <Ribbon compact />
            <StoryBar
              variant="sheet"
              scrolled={full && scrolled}
              actions={
                ctl.finished ? (
                  <IconButton icon="x" label={t.story.closeAria} title={t.story.close} onClick={ctl.close} />
                ) : (
                  <>
                    {full ? (
                      <>
                        <IconButton
                          icon="pin"
                          label={t.story.showOnMap}
                          onClick={() => {
                            setSnap('peek');
                            x.requestFocus();
                          }}
                        />
                        <ShareButton />
                      </>
                    ) : (
                      <StepButtons />
                    )}
                    <IconButton icon="x" label={t.story.closeAria} title={t.story.close} onClick={ctl.close} />
                  </>
                )
              }
            />
          </div>
          <div className="story-scroll on-vellum" ref={ctl.scrollRef} onScroll={onScroll}>
            <div ref={innerRef}>
              {ctl.finished ? (
                <EndCard />
              ) : (
                <>
                  <DeepLinkLine />
                  <StoryArticle />
                </>
              )}
            </div>
          </div>
          <StoryFooter />
        </aside>
      </div>
    </SheetContext.Provider>
  );
}
