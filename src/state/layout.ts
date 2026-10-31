import { useEffect, useState, useSyncExternalStore } from 'react';

// ── Layout mode ──
// "compact" = phone-style layout: bottom sheet for stories, top bar + dock.
// Tablet portrait counts as compact (a 380px side panel would leave a map
// too narrow for a 1.6:1 island); landscape phones get the wide layout with
// a side sheet, tightened by the `short` flag.
const COMPACT_QUERY = '(max-width: 699px), (max-width: 1023px) and (orientation: portrait)';
const SHORT_QUERY = '(max-height: 500px)';
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';
const COARSE_QUERY = '(pointer: coarse)';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

export type LayoutMode = 'wide' | 'compact';

export function useLayoutMode(): LayoutMode {
  return useMediaQuery(COMPACT_QUERY) ? 'compact' : 'wide';
}
export const useIsShort = () => useMediaQuery(SHORT_QUERY);
export const useReducedMotion = () => useMediaQuery(REDUCED_QUERY);
export const useCoarsePointer = () => useMediaQuery(COARSE_QUERY);

/** Non-hook read, for imperative code (map flights) that runs outside render. */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(REDUCED_QUERY).matches;
}

// ── Layout insets ──
// How many pixels of each viewport edge are covered by floating UI (command
// bar, story folio or sheet, time dock). Owners report their own edge; the
// map reads the total to centre flights in the *visible* map, and CSS reads
// --inset-* so map controls and attribution never sit under a panel.
export type Edge = 'top' | 'right' | 'bottom' | 'left';
export type Insets = Record<Edge, number>;

// Per-edge contributions keyed by owner, so two owners on one edge (e.g.
// sheet + dock on the bottom) combine instead of overwriting each other.
const contributions: Record<Edge, Map<string, number>> = {
  top: new Map(),
  right: new Map(),
  bottom: new Map(),
  left: new Map(),
};
let snapshot: Insets = { top: 0, right: 0, bottom: 0, left: 0 };
const listeners = new Set<() => void>();

function recompute() {
  const next = {} as Insets;
  for (const edge of Object.keys(contributions) as Edge[]) {
    let sum = 0;
    for (const v of contributions[edge].values()) sum += v;
    next[edge] = Math.round(sum);
  }
  const changed = (Object.keys(next) as Edge[]).some((k) => next[k] !== snapshot[k]);
  if (!changed) return;
  snapshot = next;
  const root = document.documentElement.style;
  for (const edge of Object.keys(next) as Edge[]) root.setProperty(`--inset-${edge}`, `${next[edge]}px`);
  listeners.forEach((l) => l());
}

/** Report (or clear with 0) how much of `edge` the caller covers. */
export function setInset(owner: string, edge: Edge, px: number): void {
  if (px > 0) contributions[edge].set(owner, px);
  else contributions[edge].delete(owner);
  recompute();
}

export function getInsets(): Insets {
  return snapshot;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** Re-renders when any inset changes. */
export function useInsets(): Insets {
  return useSyncExternalStore(subscribe, getInsets, getInsets);
}

/**
 * Measure an element and report it as covering `edge`: its height for
 * top/bottom, its width for left/right, plus its distance from that edge
 * (a floating bar 16px above the bottom covers height + 16). Pass null to
 * stop reporting.
 */
export function useReportInset(owner: string, edge: Edge, el: HTMLElement | null, enabled = true): void {
  useEffect(() => {
    if (!el || !enabled) {
      setInset(owner, edge, 0);
      return;
    }
    const measure = () => {
      const r = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const px =
        edge === 'top' ? r.bottom : edge === 'bottom' ? vh - r.top : edge === 'left' ? r.right : vw - r.left;
      setInset(owner, edge, Math.max(0, px));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      setInset(owner, edge, 0);
    };
  }, [owner, edge, el, enabled]);
}
