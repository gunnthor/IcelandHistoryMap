import { RefObject, useCallback, useRef, useState } from 'react';
import { useExplorer } from '../../state/explorer';
import { Axis } from './model';

export type Thumb = 'start' | 'end';

// ── The range brush ──
// Two thumbs on slot boundaries of the ordinal axis. Whatever moves them —
// pointer or keys — goes through `apply`, which turns slots into years
// (Axis.rangeFor) and writes the store's year filter. The thumbs are drawn
// from the store, never from local state, so era tabs, the brush and the
// Filters popover can't disagree.
export function useBrush(axis: Axis, trackRef: RefObject<HTMLElement>) {
  const x = useExplorer();
  const [dragging, setDragging] = useState<Thumb | null>(null);
  const live = useRef({ axis, x });
  live.current = { axis, x };

  const apply = useCallback((lo: number, hi: number) => {
    const { axis: a, x: ex } = live.current;
    if (!a.n) return;
    const next = a.rangeFor(lo, hi);
    const cur = ex.state.filters.yearRange;
    if (next[0] !== cur[0] || next[1] !== cur[1]) ex.setYearRange(next);
  }, []);

  /** Boundary (0..n) nearest a viewport x. */
  const boundaryAt = useCallback(
    (clientX: number) => {
      const r = trackRef.current?.getBoundingClientRect();
      const { n } = live.current.axis;
      if (!r || !r.width) return 0;
      return Math.max(0, Math.min(n, Math.round(((clientX - r.left) / r.width) * n)));
    },
    [trackRef],
  );

  // Moving one thumb past the other pushes it along: the range never inverts
  // and always keeps at least one year.
  const moveTo = useCallback(
    (thumb: Thumb, boundary: number) => {
      const a = live.current.axis;
      if (!a.n) return;
      if (thumb === 'start') {
        const lo = a.groupStart(Math.min(boundary, a.n - 1));
        apply(lo, Math.max(a.hi, a.groupEnd(lo)));
      } else {
        const hi = a.groupEnd(Math.max(boundary - 1, 0));
        apply(Math.min(a.lo, a.groupStart(hi)), hi);
      }
    },
    [apply],
  );

  /** Which thumb a press at this boundary should grab: the nearer one; when
   *  they coincide, the one on the side the press is on. */
  const nearest = useCallback((boundary: number): Thumb => {
    const a = live.current.axis;
    const s = a.lo;
    const e = a.empty ? a.lo : a.hi + 1;
    if (boundary <= s) return 'start';
    if (boundary >= e) return 'end';
    return boundary - s <= e - boundary ? 'start' : 'end';
  }, []);

  const startDrag = useCallback(
    (thumb: Thumb, e: React.PointerEvent) => {
      if (e.button !== 0 || !e.isPrimary) return;
      e.preventDefault();
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      setDragging(thumb);
      moveTo(thumb, boundaryAt(e.clientX));
    },
    [boundaryAt, moveTo],
  );

  const pointerHandlers = (thumb: Thumb | 'auto') => ({
    onPointerDown: (e: React.PointerEvent) => startDrag(thumb === 'auto' ? nearest(boundaryAt(e.clientX)) : thumb, e),
    onPointerMove: (e: React.PointerEvent) => {
      if (!dragging) return;
      moveTo(dragging, boundaryAt(e.clientX));
    },
    onPointerUp: () => setDragging(null),
    onPointerCancel: () => setDragging(null),
    onLostPointerCapture: () => setDragging(null),
  });

  const onKeyDown = useCallback(
    (thumb: Thumb, e: React.KeyboardEvent) => {
      const a = live.current.axis;
      if (!a.n) return;
      let { lo, hi } = a;
      if (a.empty) {
        // No event inside the range: any key snaps to the nearest event.
        lo = hi = Math.min(a.lo, a.n - 1);
      }
      const starts = a.bands.map((b) => b.first);
      const ends = a.bands.map((b) => b.last);
      if (thumb === 'start') {
        switch (e.key) {
          case 'ArrowLeft':
          case 'ArrowDown':
            if (lo > 0) lo = a.groupStart(lo - 1);
            break;
          case 'ArrowRight':
          case 'ArrowUp': {
            const next = a.groupEnd(lo) + 1;
            if (next <= hi) lo = next;
            break;
          }
          case 'PageUp':
            lo = [...starts].reverse().find((s) => s < lo) ?? 0;
            break;
          case 'PageDown': {
            const s = starts.find((v) => v > lo);
            if (s !== undefined && s <= hi) lo = s;
            break;
          }
          case 'Home':
            lo = 0;
            break;
          case 'End':
            lo = a.groupStart(hi);
            break;
          default:
            return;
        }
      } else {
        switch (e.key) {
          case 'ArrowLeft':
          case 'ArrowDown': {
            const prev = a.groupStart(hi) - 1;
            if (prev >= lo) hi = prev;
            break;
          }
          case 'ArrowRight':
          case 'ArrowUp':
            if (hi < a.n - 1) hi = a.groupEnd(hi + 1);
            break;
          case 'PageUp': {
            const v = [...ends].reverse().find((s) => s < hi);
            if (v !== undefined && v >= lo) hi = v;
            break;
          }
          case 'PageDown':
            hi = ends.find((v) => v > hi) ?? a.n - 1;
            break;
          case 'Home':
            hi = a.groupEnd(lo);
            break;
          case 'End':
            hi = a.n - 1;
            break;
          default:
            return;
        }
      }
      e.preventDefault();
      apply(lo, hi);
    },
    [apply],
  );

  return { dragging, pointerHandlers, onKeyDown };
}
