import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { SelectSource, useExplorer } from '../../state/explorer';
import { useCoarsePointer, useIsShort, useLayoutMode, prefersReducedMotion } from '../../state/layout';
import { useI18n } from '../../i18n';
import { FinishedRoute, StepControl, StoryContext, StoryController } from './context';
import { eventUrl, shortDate } from './format';
import { Folio } from './Folio';
import { BottomSheet } from './BottomSheet';
import './story.css';

// ════════════════════════════════════════════════════════════════
// The story: one article, three shells. Wide screens get the folio (a
// vellum placard docked right), landscape phones a full-height side sheet,
// phones and tablet portrait a bottom sheet. Only one shell is mounted.
// This component owns what they share — focus, scroll, share, the step
// controls and the end-of-route card — and hands it down by context.
// ════════════════════════════════════════════════════════════════

/** Selections the visitor made themselves. These move focus to the story
 *  heading; autoplay, route steps and page loads never steal focus. */
const USER_SOURCES = new Set<SelectSource>(['map', 'timeline', 'search', 'story', 'keyboard']);

const TITLE_ID = 'story-title';

export function Story() {
  const x = useExplorer();
  const { t } = useI18n();
  const mode = useLayoutMode();
  const short = useIsShort();
  const coarse = useCoarsePointer();

  const { selected, route, routeIndex, earlier, later, state } = x;
  const id = state.selectedId;
  const source = state.selectSource;
  const userOpened = !!source && USER_SOURCES.has(source);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);
  const focusEnd = useRef(false);
  const pendingFollow = useRef<{ key: string; firstId: string } | null>(null);

  // The reading level is a preference, not a per-event toggle: it holds
  // while you move between stories.
  const [eli12, setEli12] = useState(false);
  const [finished, setFinished] = useState<FinishedRoute | null>(null);
  const [copied, setCopied] = useState(false);

  // ── Remember what opened the story, to hand focus back on close ──
  // Runs before any child focuses anything (layout effects precede passive
  // ones), so activeElement is still the marker / tick / result clicked.
  useLayoutEffect(() => {
    if (!id || !userOpened) return;
    const a = document.activeElement as HTMLElement | null;
    if (a && a !== document.body && !a.closest('.story')) opener.current = a;
  }, [id, userOpened]);

  // ── Every new event starts at the top ──
  useLayoutEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [id, finished]);

  // ── Focus: the heading on hand-picked opens; back to the opener on close ──
  useEffect(() => {
    if (id) {
      wasOpen.current = true;
      if (userOpened) headingRef.current?.focus({ preventScroll: true });
      return;
    }
    if (!wasOpen.current) return;
    wasOpen.current = false;
    const a = document.activeElement;
    // Only when focus was lost with the story — a click elsewhere keeps it.
    if ((!a || a === document.body) && opener.current?.isConnected) opener.current.focus();
    opener.current = null;
    // The selection id alone drives this; the source is read with it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // ── The end card lives until the visitor picks something else ──
  useEffect(() => {
    if (finished && id !== finished.lastId) setFinished(null);
  }, [id, finished]);

  useEffect(() => {
    if (finished && focusEnd.current) {
      focusEnd.current = false;
      headingRef.current?.focus({ preventScroll: true });
    }
  }, [finished]);

  // "Start over" on a person route: reopen stop 1, then follow from there.
  useEffect(() => {
    const p = pendingFollow.current;
    if (p && id === p.firstId) {
      pendingFollow.current = null;
      x.followPerson(p.key);
    }
  }, [id, x]);

  const close = useCallback(() => {
    if (x.state.playing) x.pause();
    if (x.state.route) x.exitRoute();
    setFinished(null);
    x.close();
  }, [x]);

  const share = useCallback(async () => {
    if (!selected) return;
    const url = eventUrl(selected.id);
    // The native sheet on phones; on desktop it's a clumsy OS dialog, so copy.
    if (coarse && typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: selected.name, url });
      } catch {
        // dismissed — nothing to do
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    x.announce(t.story.linkCopied);
  }, [selected, coarse, x, t]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);
  useEffect(() => setCopied(false), [id]);

  const finish = useCallback(() => {
    if (!route || !selected) return;
    focusEnd.current = true;
    setFinished({ route: route.route, stopIds: route.stops.map((s) => s.id), lastId: selected.id });
    x.exitRoute();
    x.announce(t.tours.endTitle);
  }, [route, selected, x, t]);

  const restartPerson = useCallback(
    (key: string, firstId: string) => {
      setFinished(null);
      pendingFollow.current = { key, firstId };
      x.select(firstId, 'story');
    },
    [x],
  );

  const jumpToTrust = useCallback(() => {
    const target = scrollRef.current?.querySelector<HTMLElement>('#story-trust');
    if (!target) return;
    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    target.querySelector<HTMLElement>('h3')?.focus({ preventScroll: true });
  }, []);

  // ── The two step controls ──
  const steps = useMemo((): { prev: StepControl; next: StepControl } => {
    if (route) {
      const n = route.stops.length;
      const atFirst = routeIndex === 0;
      const atLast = routeIndex === n - 1;
      return {
        prev: {
          label: t.tours.prev,
          aria: t.tours.prev,
          icon: 'chevron-left',
          disabled: atFirst,
          run: () => !atFirst && x.stepRoute(-1),
        },
        next: atLast
          ? { label: t.tours.finish, aria: t.tours.finish, icon: 'check', disabled: false, run: finish }
          : { label: t.tours.next, aria: t.tours.next, icon: 'chevron-right', disabled: false, run: () => x.stepRoute(1) },
      };
    }
    return {
      prev: {
        label: t.story.earlier,
        aria: earlier ? t.story.earlierAria(earlier.name, shortDate(earlier)) : t.story.earlier,
        icon: 'chevron-left',
        disabled: !earlier,
        run: () => earlier && x.select(earlier.id, 'story'),
      },
      next: {
        label: t.story.later,
        aria: later ? t.story.laterAria(later.name, shortDate(later)) : t.story.later,
        icon: 'chevron-right',
        disabled: !later,
        run: () => later && x.select(later.id, 'story'),
      },
    };
  }, [route, routeIndex, earlier, later, x, t, finish]);

  const ctl = useMemo<StoryController | null>(
    () =>
      selected
        ? {
            event: selected,
            finished,
            titleId: TITLE_ID,
            headingRef,
            scrollRef,
            userOpened,
            eli12,
            setEli12,
            close,
            share,
            copied,
            finish,
            clearFinished: () => setFinished(null),
            restartPerson,
            prev: steps.prev,
            next: steps.next,
            jumpToTrust,
          }
        : null,
    [selected, finished, userOpened, eli12, close, share, copied, finish, restartPerson, steps, jumpToTrust],
  );

  if (!ctl) return null;
  return (
    <StoryContext.Provider value={ctl}>
      {mode === 'compact' ? <BottomSheet /> : <Folio side={short} />}
    </StoryContext.Provider>
  );
}
