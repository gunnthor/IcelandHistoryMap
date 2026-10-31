import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useExplorer } from '../../state/explorer';
import { useI18n } from '../../i18n';
import { TypeSeal } from '../icons/Icon';
import { ConflictEvent } from '../../types';
import { at, useAxis } from './model';
import { Thumb, useBrush } from './useBrush';

// ── The rail (wide layout) ──
// Three stacked strips on one ordinal axis: era bands with their labels,
// the ticks (a listbox — one tab stop), and the axis line carrying century
// marks and the range brush. Everything is positioned in % of the rail.

export function Rail() {
  const x = useExplorer();
  const { t } = useI18n();
  const axis = useAxis();
  const { list, n } = axis;
  const railRef = useRef<HTMLDivElement>(null);
  const brush = useBrush(axis, railRef);
  const width = useWidth(railRef, n > 0);

  // ── Roving focus: one option is tabbable — the last one focused, else
  // the selection, else the first event in range. Tracked by id so a filter
  // change doesn't move it onto a different event.
  const [focusId, setFocusId] = useState<string | null>(null);
  const optRefs = useRef(new Map<string, HTMLDivElement>());
  const rovingIndex = (() => {
    const f = focusId ? list.findIndex((e) => e.id === focusId) : -1;
    if (f >= 0) return f;
    if (axis.selected >= 0) return axis.selected;
    return axis.empty ? 0 : axis.lo;
  })();

  // ── Tooltip: pointer hover, or keyboard focus (only when focus is visible)
  const [hover, setHover] = useState(-1);
  const [keyTip, setKeyTip] = useState(-1);
  const ownsHover = useRef(false);
  const tip = hover >= 0 ? hover : keyTip;

  useEffect(
    () => () => {
      if (ownsHover.current) x.setHovered(null);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const slotAt = (clientX: number) => {
    const r = railRef.current?.getBoundingClientRect();
    if (!r || !n) return -1;
    return Math.max(0, Math.min(n - 1, Math.floor(((clientX - r.left) / r.width) * n)));
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    const i = slotAt(e.clientX);
    if (i === hover) return;
    setHover(i);
    ownsHover.current = i >= 0;
    x.setHovered(i >= 0 ? list[i].id : null);
  };
  const onPointerLeave = () => {
    setHover(-1);
    if (ownsHover.current) {
      ownsHover.current = false;
      x.setHovered(null);
    }
  };

  const focusSlot = (i: number) => {
    const e = list[i];
    if (!e) return;
    setFocusId(e.id);
    setKeyTip(i);
    optRefs.current.get(e.id)?.focus({ preventScroll: true });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!n) return;
    const cur = rovingIndex;
    const band = axis.bandOf(cur);
    let next = cur;
    switch (e.key) {
      case 'ArrowRight':
        next = Math.min(cur + 1, n - 1);
        break;
      case 'ArrowLeft':
        next = Math.max(cur - 1, 0);
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = n - 1;
        break;
      case 'PageDown':
        next = axis.bands[band + 1]?.first ?? n - 1;
        break;
      case 'PageUp': {
        const b = axis.bands[band];
        next = b && cur > b.first ? b.first : axis.bands[band - 1]?.first ?? 0;
        break;
      }
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (axis.inRange(cur)) x.select(list[cur].id, 'timeline');
        return;
      default:
        return;
    }
    e.preventDefault();
    focusSlot(next);
  };

  // ── Axis labels: the first and last year only. The axis gives every event
  // the same room, so century numbers at uneven spacing read as a broken
  // linear scale; the era bands above carry each period's years, and the
  // century turns stay as unlabelled marks.
  const labels = useMemo(() => {
    if (!width || !n) return [];
    const first = list[0].year;
    const last = list[n - 1].year;
    // The end labels sit inside the handles' beads (12px in from each end).
    const out: { key: string; x: number; year: number; end?: boolean }[] = [{ key: 'first', x: 0, year: first }];
    if (n > 1 && last !== first) out.push({ key: 'last', x: width, year: last, end: true });
    return out;
  }, [width, n, list]);

  // ── The needle's year flag sits in the band-label row: hide whichever
  // band label it would cut through mid-word. ──
  const bandsRef = useRef<HTMLDivElement>(null);
  const flagRef = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const host = bandsRef.current;
    if (!host) return;
    const f = flagRef.current?.getBoundingClientRect();
    host.querySelectorAll<HTMLElement>('.tl-band').forEach((band) => {
      let covered = false;
      const label = band.querySelector<HTMLElement>('.tl-band__label');
      if (f && label) {
        const top = label.getBoundingClientRect().top;
        // Only the first line shows; items that wrapped are clipped away.
        for (const part of label.querySelectorAll<HTMLElement>('.tl-band__name, .tl-band__years')) {
          const r = part.getBoundingClientRect();
          if (r.width && r.top < top + 2 && f.left < r.right + 4 && f.right > r.left - 4) covered = true;
        }
      }
      band.toggleAttribute('data-covered', covered);
    });
  }, [axis.selected, width, axis.bands]);

  if (!n) {
    return (
      <div className="tl-rail tl-rail--empty" ref={railRef}>
        <p className="tl-empty">{t.timeline.empty}</p>
      </div>
    );
  }

  const ranged = !(axis.lo === 0 && axis.hi === n - 1);
  // With nothing in range both handles meet at the boundary where it would be.
  const spanLo = axis.lo;
  const spanHi = axis.empty ? axis.lo : axis.hi + 1;
  const sel = axis.selected >= 0 ? list[axis.selected] : null;

  const handle = (thumb: Thumb) => {
    const i = thumb === 'start' ? Math.min(axis.lo, n - 1) : Math.max(axis.hi, 0);
    const e = list[i];
    return (
      <div
        key={thumb}
        role="slider"
        tabIndex={0}
        className={`tl-handle tl-handle--${thumb}${brush.dragging === thumb ? ' is-dragging' : ''}`}
        style={{ left: at(thumb === 'start' ? spanLo : spanHi, n) }}
        aria-label={thumb === 'start' ? t.timeline.startYear : t.timeline.endYear}
        aria-orientation="horizontal"
        aria-valuemin={list[0].year}
        aria-valuemax={list[n - 1].year}
        aria-valuenow={e.year}
        aria-valuetext={t.timeline.valueText(e.year, e.name)}
        onKeyDown={(ev) => brush.onKeyDown(thumb, ev)}
        {...brush.pointerHandlers(thumb)}
      >
        <span className="tl-handle__flag" aria-hidden="true">
          {e.year}
        </span>
      </div>
    );
  };

  return (
    <div className="tl-rail" ref={railRef} data-ranged={ranged || undefined}>
      <div className="tl-bands" aria-hidden="true" ref={bandsRef}>
        {axis.bands.map((b) => (
          <div
            key={b.id}
            className="tl-band"
            data-active={b.active || undefined}
            style={{ left: at(b.first, n), width: at(b.last + 1 - b.first, n) }}
            title={b.hint}
          >
            <span className="tl-band__label">
              <i className="tl-band__strut" />
              <span className="tl-band__name">{b.label}</span>
              <span className="tl-band__years">{b.years}</span>
            </span>
          </div>
        ))}
      </div>

      {!axis.empty && (
        <div className="tl-span" aria-hidden="true" style={{ left: at(spanLo, n), width: at(spanHi - spanLo, n) }} />
      )}

      {sel && (
        <div className="tl-needle" aria-hidden="true" style={{ left: at(axis.selected + 0.5, n) }}>
          <span className="tl-needle__flag" ref={flagRef}>
            {sel.year}
          </span>
        </div>
      )}

      <div
        className="tl-ticks"
        role="listbox"
        aria-label={t.timeline.eventsAria}
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setKeyTip(-1);
        }}
      >
        {list.map((e, i) => {
          const inRange = axis.inRange(i);
          const linked = x.state.hoveredId === e.id && hover !== i;
          return (
            <div
              key={e.id}
              ref={(el) => {
                if (el) optRefs.current.set(e.id, el);
                else optRefs.current.delete(e.id);
              }}
              id={`tl-opt-${e.id}`}
              role="option"
              tabIndex={i === rovingIndex ? 0 : -1}
              aria-selected={i === axis.selected}
              aria-disabled={inRange ? undefined : true}
              aria-describedby={inRange ? undefined : 'tl-out-desc'}
              aria-label={`${e.name}, ${t.types[e.type]}, ${e.year}`}
              className={`tl-opt${i === hover ? ' is-hover' : ''}${linked ? ' is-linked' : ''}`}
              style={{ left: at(i, n), width: at(1, n) }}
              onClick={() => {
                setFocusId(e.id);
                if (inRange) x.select(e.id, 'timeline');
              }}
              onFocus={(ev) => {
                setFocusId(e.id);
                setKeyTip(ev.currentTarget.matches(':focus-visible') ? i : -1);
              }}
            >
              <span className={`tl-tick tl-tick--${e.type} tl-tick--${e.confidence}`} />
            </div>
          );
        })}
      </div>
      <span id="tl-out-desc" hidden>
        {t.timeline.outOfRange}
      </span>

      <div className="tl-axis" aria-hidden="true" {...brush.pointerHandlers('auto')}>
        {!axis.empty && (
          <span className="tl-axis__span" style={{ left: at(spanLo, n), width: at(spanHi - spanLo, n) }} />
        )}
        {axis.centuries.map((c) => (
          <span key={c.at} className="tl-mark" style={{ left: at(c.at, n) }} />
        ))}
        {labels.map((l) => (
          <span
            key={l.key}
            className={`tl-axis__label${l.key === 'first' ? ' tl-axis__label--first' : ''}${l.end ? ' tl-axis__label--end' : ''}`}
            style={{ left: l.x }}
          >
            {l.year}
          </span>
        ))}
      </div>

      {handle('start')}
      {handle('end')}

      {tip >= 0 && list[tip] && <Tip e={list[tip]} left={at(tip + 0.5, n)} out={!axis.inRange(tip)} />}
    </div>
  );
}

function Tip({ e, left, out }: { e: ConflictEvent; left: string; out: boolean }) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  // Keep the tooltip inside the viewport: centre it on the tick, then nudge.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--tl-tip-shift', '0px');
    const r = el.getBoundingClientRect();
    const pad = 8;
    const shift = r.left < pad ? pad - r.left : r.right > window.innerWidth - pad ? window.innerWidth - pad - r.right : 0;
    el.style.setProperty('--tl-tip-shift', `${shift}px`);
  }, [e.id, left]);
  return (
    <div ref={ref} className="tl-tip ui-glass" style={{ left }} aria-hidden="true">
      <TypeSeal type={e.type} confidence={e.confidence} size={24} />
      <span className="tl-tip__text">
        <span className="tl-tip__name">{e.name}</span>
        <span className="tl-tip__meta">
          <span className="t-num">{e.year}</span> · {t.types[e.type]}
        </span>
        {out && <span className="tl-tip__out">{t.timeline.outOfRange}</span>}
      </span>
    </div>
  );
}

/** Live content-box width of an element (for label collision only). */
export function useWidth(ref: React.RefObject<HTMLElement>, key: unknown = null): number {
  const [w, setW] = useState(0);
  // `key` re-attaches the observer when the element behind the ref changes.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const ro = new ResizeObserver(([entry]) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setW(Math.round(entry.contentRect.width)));
    });
    ro.observe(el);
    setW(Math.round(el.getBoundingClientRect().width));
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [ref, key]);
  return w;
}

