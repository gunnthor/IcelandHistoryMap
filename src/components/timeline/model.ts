import { useMemo } from 'react';
import { ConflictEvent } from '../../types';
import { MIN_YEAR, MAX_YEAR, useExplorer } from '../../state/explorer';
import { useI18n } from '../../i18n';
import { ERAS } from '../../utils/eventConfig';

// ════════════════════════════════════════════════════════════════
// The axis. One ordinal scale for everything the dock draws: every event
// in `timeline` gets an equal slot, in chronological order. Ticks sit at
// slot centres, era bands span their events' slots, and the range brush
// snaps to slot boundaries — so the handles always sit exactly between the
// ticks they include (the old dock stacked an evenly spaced dot strip on a
// year-proportional slider, and the two never lined up).
//
// Positions are percentages of the rail, so the rail can resize (the folio
// opening, a phone rotating) without re-rendering a single tick.
// ════════════════════════════════════════════════════════════════

export interface Band {
  id: string;
  /** First and last slot index of the era's events (inclusive). */
  first: number;
  last: number;
  label: string;
  hint: string;
  /** Nominal span for display ("870–1130", "1919–"). */
  years: string;
  active: boolean;
}

export interface Axis {
  list: ConflictEvent[];
  n: number;
  /** Slots inside the year range: lo..hi inclusive (lo > hi when none are). */
  lo: number;
  hi: number;
  empty: boolean;
  bands: Band[];
  /** Slot boundaries where the century turns, labelled with the new century. */
  centuries: { at: number; year: number }[];
  /** Slot of the selected event, or -1 when it isn't on the axis. */
  selected: number;
  inRange: (i: number) => boolean;
  /** Events sharing a year move together: a handle never splits 1238. */
  groupStart: (i: number) => number;
  groupEnd: (i: number) => number;
  /** Band index of a slot. */
  bandOf: (i: number) => number;
  /**
   * The year range for slots lo..hi. Snaps to "all years" when every slot is
   * in, and to an era's exact range when the slots are exactly that era's —
   * so dragging the brush onto an era lights its tab, and dragging it fully
   * open clears the year filter instead of leaving 875–1976 "active".
   */
  rangeFor: (lo: number, hi: number) => [number, number];
}

/** Left offset of a slot boundary (0..n) as a CSS percentage. */
export const at = (boundary: number, n: number) => `${n ? (boundary / n) * 100 : 0}%`;

export function useAxis(): Axis {
  const x = useExplorer();
  const { t } = useI18n();
  const list = x.timeline;
  const [r0, r1] = x.state.filters.yearRange;
  const selectedId = x.state.selectedId;

  return useMemo(() => {
    const n = list.length;
    let lo = list.findIndex((e) => e.year >= r0);
    if (lo < 0) lo = n;
    let hi = -1;
    for (let i = n - 1; i >= 0; i--) {
      if (list[i].year <= r1) {
        hi = i;
        break;
      }
    }

    const bands: Band[] = [];
    const bandIndex: number[] = new Array(n).fill(-1);
    for (const era of x.eras) {
      let first = -1;
      let last = -1;
      list.forEach((e, i) => {
        if (e.year >= era.range[0] && e.year <= era.range[1]) {
          if (first < 0) first = i;
          last = i;
        }
      });
      if (first < 0) continue;
      for (let i = first; i <= last; i++) bandIndex[i] = bands.length;
      const nominal = ERAS.find((e) => e.id === era.id)?.range ?? era.range;
      bands.push({
        id: era.id,
        first,
        last,
        label: t.eras[era.id]?.label ?? era.id,
        hint: t.eras[era.id]?.hint ?? '',
        years: nominal[1] > MAX_YEAR ? t.timeline.rangeFrom(nominal[0]) : t.timeline.range(nominal[0], nominal[1]),
        active: x.activeEraId === era.id,
      });
    }

    const centuries: Axis['centuries'] = [];
    for (let i = 1; i < n; i++) {
      const c = Math.floor(list[i].year / 100);
      if (c !== Math.floor(list[i - 1].year / 100)) centuries.push({ at: i, year: c * 100 });
    }

    const groupStart = (i: number) => {
      let j = i;
      while (j > 0 && list[j - 1].year === list[i].year) j--;
      return j;
    };
    const groupEnd = (i: number) => {
      let j = i;
      while (j < n - 1 && list[j + 1].year === list[i].year) j++;
      return j;
    };

    const rangeFor = (a: number, b: number): [number, number] => {
      if (a <= 0 && b >= n - 1) return [MIN_YEAR, MAX_YEAR];
      for (const band of bands) {
        if (band.first === a && band.last === b) return x.eras.find((e) => e.id === band.id)!.range;
      }
      return [list[a].year, list[b].year];
    };

    return {
      list,
      n,
      lo,
      hi,
      empty: lo > hi,
      bands,
      centuries,
      selected: selectedId ? list.findIndex((e) => e.id === selectedId) : -1,
      inRange: (i: number) => i >= lo && i <= hi,
      groupStart,
      groupEnd,
      bandOf: (i: number) => bandIndex[i] ?? -1,
      rangeFor,
    };
  }, [list, r0, r1, selectedId, x.eras, x.activeEraId, t]);
}

/** Display span of the current year range: an era's nominal years when an
 *  era is active, else the range itself. Null when every year is shown. */
export function useRangeLabel(): string | null {
  const x = useExplorer();
  const { t } = useI18n();
  const [r0, r1] = x.state.filters.yearRange;
  if (r0 <= MIN_YEAR && r1 >= MAX_YEAR) return null;
  const era = x.activeEraId ? ERAS.find((e) => e.id === x.activeEraId) : undefined;
  if (era) return era.range[1] > MAX_YEAR ? t.timeline.rangeFrom(era.range[0]) : t.timeline.range(...era.range);
  return r0 === r1 ? String(r0) : t.timeline.range(r0, r1);
}
