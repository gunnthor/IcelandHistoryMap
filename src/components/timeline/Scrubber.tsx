import { useLayoutEffect, useRef, useState } from 'react';
import { useExplorer } from '../../state/explorer';
import { useI18n } from '../../i18n';
import { TypeSeal } from '../icons/Icon';
import { ConflictEvent } from '../../types';
import { at, useAxis } from './model';
import { Strip } from './Strip';

// ── The scrubber (compact and landscape-phone docks) ──
// Fifty ticks in 300px are too dense to tap one by one, so the strip works
// like a slider instead: press and drag, a magnifier bubble above the finger
// names the event under it, release opens it. A plain tap opens the nearest
// event. It only lands on events inside the year range — the dimmed ticks
// outside are context, not targets.
export function Scrubber() {
  const x = useExplorer();
  const { t } = useI18n();
  const axis = useAxis();
  const { list, n, lo, hi, empty } = axis;
  const ref = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState(-1);
  const pointer = useRef<number | null>(null);

  const usable = n > 0 && !empty;
  const count = usable ? hi - lo + 1 : 0;
  const pos = axis.selected >= lo && axis.selected <= hi ? axis.selected - lo + 1 : 0;
  const sel = pos ? list[axis.selected] : null;

  const nearest = (clientX: number) => {
    const r = ref.current!.getBoundingClientRect();
    const i = Math.floor(((clientX - r.left) / r.width) * n);
    return Math.max(lo, Math.min(hi, i));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!usable || e.button !== 0 || !e.isPrimary) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pointer.current = e.pointerId;
    setCursor(nearest(e.clientX));
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (pointer.current !== e.pointerId) return;
    const i = nearest(e.clientX);
    if (i !== cursor) setCursor(i);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (pointer.current !== e.pointerId) return;
    pointer.current = null;
    const i = cursor >= 0 ? cursor : nearest(e.clientX);
    setCursor(-1);
    if (list[i] && list[i].id !== x.state.selectedId) x.select(list[i].id, 'timeline');
  };
  const cancel = () => {
    pointer.current = null;
    setCursor(-1);
  };

  // Arrow keys step through the events in range, selecting as they go
  // (slider semantics). The 'scrub' source tells the story not to pull focus
  // to its heading, so the next arrow key keeps stepping.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!usable) return;
    const cur = pos ? axis.selected : -1;
    let next: number;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        next = cur < 0 ? lo : Math.min(cur + 1, hi);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        next = cur < 0 ? hi : Math.max(cur - 1, lo);
        break;
      case 'Home':
        next = lo;
        break;
      case 'End':
        next = hi;
        break;
      case 'PageUp':
      case 'PageDown': {
        const b = axis.bandOf(cur < 0 ? lo : cur);
        const target = e.key === 'PageDown' ? axis.bands[b + 1]?.first : axis.bands[b - 1]?.first;
        next = Math.max(lo, Math.min(hi, target ?? (e.key === 'PageDown' ? hi : lo)));
        break;
      }
      default:
        return;
    }
    e.preventDefault();
    if (next === cur) return;
    x.select(list[next].id, 'scrub');
  };

  return (
    <div
      ref={ref}
      className={`tl-scrub${cursor >= 0 ? ' is-scrubbing' : ''}`}
      role="slider"
      tabIndex={0}
      aria-label={t.timeline.scrubber}
      aria-orientation="horizontal"
      aria-disabled={usable ? undefined : true}
      aria-valuemin={usable ? 1 : 0}
      aria-valuemax={count}
      aria-valuenow={pos || undefined}
      aria-valuetext={sel ? t.timeline.valueText(sel.year, sel.name) : usable ? t.timeline.noSelection : t.timeline.empty}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={cancel}
      onLostPointerCapture={cancel}
      onKeyDown={onKeyDown}
    >
      {n > 0 ? <Strip axis={axis} cursor={cursor} /> : <span className="tl-empty">{t.timeline.empty}</span>}
      {cursor >= 0 && list[cursor] && <Bubble e={list[cursor]} left={at(cursor + 0.5, n)} />}
    </div>
  );
}

function Bubble({ e, left }: { e: ConflictEvent; left: string }) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  // Centred over the finger, nudged to stay on screen; the caret keeps
  // pointing at the finger.
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
    <div ref={ref} className="tl-bubble ui-glass" style={{ left }} aria-hidden="true">
      <TypeSeal type={e.type} confidence={e.confidence} size={32} />
      <span className="tl-bubble__text">
        <span className="tl-bubble__year">{e.year}</span>
        <span className="tl-bubble__name">{e.name}</span>
        <span className="tl-bubble__type">{t.types[e.type]}</span>
      </span>
    </div>
  );
}
