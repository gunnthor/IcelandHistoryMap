import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { ConflictEvent, Confidence, EventType, FilterState } from '../types';
import { events as baseEvents } from '../data/events';
import { TOURS, Tour, resolveTourEvents } from '../data/tours';
import { ERAS, Era, clampRange, getYearBounds } from '../utils/eventConfig';
import { normalizeForSearch } from '../utils/text';
import { useI18n } from '../i18n';
import { PEOPLE, Person, personDisplayName } from './people';
import { KEYS, storage } from './storage';
import { useEscape } from './escape';

// ════════════════════════════════════════════════════════════════
// The explorer: one store for everything a visitor can do — what's
// selected, what's filtered, which route they're on, whether autoplay runs.
// Components read it with useExplorer() and never own this state
// themselves, so the map, timeline, story and command bar can't drift
// apart. The selection is stored as an id: a language switch swaps the
// whole localized event array, and an id survives that untouched.
// ════════════════════════════════════════════════════════════════

export const [MIN_YEAR, MAX_YEAR] = getYearBounds(baseEvents);

export type MapStyle = 'satellite' | 'summer' | 'parchment' | 'ortelius';
export const MAP_STYLES: MapStyle[] = ['satellite', 'summer', 'parchment', 'ortelius'];

/** A story route: a curated tour, or "follow this person" built from data. */
export type Route = { kind: 'tour'; id: string } | { kind: 'person'; key: string };

/** Modal dialogs. Popovers and mobile sheets keep their own open state. */
export type DialogId = 'about' | 'routes' | null;

/** Where a selection came from — lets the map and story decide whether to
 *  fly, steal focus, or announce. 'scrub' is a slider step (the compact
 *  timeline scrubber): the visitor's own choice, but focus must stay on the
 *  slider so the next arrow key keeps stepping. */
export type SelectSource =
  | 'map'
  | 'timeline'
  | 'scrub'
  | 'search'
  | 'story'
  | 'route'
  | 'play'
  | 'link'
  | 'keyboard';

export const ALL_YEARS: [number, number] = [MIN_YEAR, MAX_YEAR];
export const INITIAL_FILTERS: FilterState = { types: [], confidence: 'all', yearRange: ALL_YEARS };

interface State {
  selectedId: string | null;
  selectSource: SelectSource | null;
  filters: FilterState;
  search: string;
  showClans: boolean;
  route: Route | null;
  /** Index of the last route stop the visitor was on. Kept separately from
   *  the selection so clicking an off-route marker mid-route doesn't lose
   *  your place: "Next stop" continues from here. */
  routeCursor: number;
  playing: boolean;
  dialog: DialogId;
  mapStyle: MapStyle;
  /** Bumped to ask the map to frame all of Iceland (or the route). */
  fitRequest: number;
  /** Bumped to ask the map to re-centre on the selection. */
  focusRequest: number;
  /** Shared hover between map markers, timeline ticks and lists. */
  hoveredId: string | null;
  welcome: boolean;
  /** Arrived on a shared /event/<id> link and hasn't moved on yet. */
  cameFromLink: boolean;
  /** A deep link named an id that doesn't exist. */
  missingLinkId: string | null;
}

type Action =
  | { type: 'select'; id: string | null; source: SelectSource }
  | { type: 'filters'; patch: Partial<FilterState> }
  | { type: 'search'; q: string }
  | { type: 'resetFilters' }
  | { type: 'era'; era: Era | null }
  | { type: 'clans'; show: boolean }
  | { type: 'startRoute'; route: Route; stops: string[]; at: number }
  | { type: 'routeTo'; index: number; id: string }
  | { type: 'exitRoute' }
  | { type: 'playing'; on: boolean }
  | { type: 'dialog'; id: DialogId }
  | { type: 'mapStyle'; style: MapStyle }
  | { type: 'fit' }
  | { type: 'focus' }
  | { type: 'hover'; id: string | null }
  | { type: 'welcome'; open: boolean }
  | { type: 'dismissMissing' };

const ids = new Set(baseEvents.map((e) => e.id));

/** Read /event/<id> (or a legacy #event=<id> hash) from the current URL. */
function idFromUrl(): string | null {
  const base = import.meta.env.BASE_URL;
  const path = window.location.pathname.startsWith(base)
    ? window.location.pathname.slice(base.length)
    : window.location.pathname.replace(/^\//, '');
  return path.match(/^event\/([\w-]+)\/?$/)?.[1] ?? window.location.hash.match(/event=([\w-]+)/)?.[1] ?? null;
}

function loadMapStyle(): MapStyle {
  const v = storage.get(KEYS.mapStyle);
  return (MAP_STYLES as string[]).includes(v ?? '') ? (v as MapStyle) : 'satellite';
}

function init(): State {
  const linked = idFromUrl();
  const valid = linked && ids.has(linked) ? linked : null;
  return {
    selectedId: valid,
    selectSource: valid ? 'link' : null,
    filters: INITIAL_FILTERS,
    search: '',
    showClans: false,
    route: null,
    routeCursor: 0,
    playing: false,
    dialog: null,
    mapStyle: loadMapStyle(),
    fitRequest: 0,
    focusRequest: 0,
    hoveredId: null,
    // First visit only, and never on top of a shared link.
    welcome: !linked && storage.get(KEYS.welcomed) === null,
    cameFromLink: !!valid,
    missingLinkId: linked && !valid ? linked : null,
  };
}

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case 'select':
      return {
        ...s,
        selectedId: a.id,
        selectSource: a.id ? a.source : null,
        cameFromLink: s.cameFromLink && a.source === 'link',
        // Doing anything dismisses the welcome card.
        welcome: a.id ? false : s.welcome,
      };
    case 'filters':
      return { ...s, filters: { ...s.filters, ...a.patch } };
    case 'search':
      return { ...s, search: a.q, welcome: a.q ? false : s.welcome };
    case 'resetFilters':
      return { ...s, filters: INITIAL_FILTERS, search: '', showClans: false };
    case 'era':
      return {
        ...s,
        filters: { ...s.filters, yearRange: a.era ? a.era.range : ALL_YEARS },
        showClans: !!a.era?.showClans,
      };
    case 'clans':
      return { ...s, showClans: a.show };
    case 'startRoute':
      // A route replaces autoplay and clears filters so every stop is visible.
      return {
        ...s,
        route: a.route,
        routeCursor: a.at,
        selectedId: a.stops[a.at] ?? null,
        selectSource: 'route',
        playing: false,
        dialog: null,
        filters: INITIAL_FILTERS,
        search: '',
        showClans: false,
        welcome: false,
        cameFromLink: false,
      };
    case 'routeTo':
      return { ...s, routeCursor: a.index, selectedId: a.id, selectSource: 'route', cameFromLink: false };
    case 'exitRoute':
      // Leaving a route keeps the current stop open — you were reading it.
      return { ...s, route: null, routeCursor: 0 };
    case 'playing':
      return { ...s, playing: a.on, route: a.on ? null : s.route, welcome: a.on ? false : s.welcome };
    case 'dialog':
      return { ...s, dialog: a.id, welcome: a.id ? false : s.welcome };
    case 'mapStyle':
      return { ...s, mapStyle: a.style };
    case 'fit':
      return { ...s, fitRequest: s.fitRequest + 1 };
    case 'focus':
      return { ...s, focusRequest: s.focusRequest + 1 };
    case 'hover':
      return s.hoveredId === a.id ? s : { ...s, hoveredId: a.id };
    case 'welcome':
      return { ...s, welcome: a.open };
    case 'dismissMissing':
      return { ...s, missingLinkId: null };
  }
}

// ── Derived data ──

const dataOrder = new Map(baseEvents.map((e, i) => [e.id, i]));
/** Chronological, ties broken by data order — the one canonical ordering. */
export const byYear = (a: ConflictEvent, b: ConflictEvent) =>
  a.year - b.year || (dataOrder.get(a.id) ?? 0) - (dataOrder.get(b.id) ?? 0);

/** Which field a search hit came from — shown next to search results. */
export type MatchField = 'name' | 'alias' | 'person' | 'side' | 'place' | 'period' | 'type';

/** Which field of an event matches an already-normalized query, best first.
 *  Pass the localized type names so "eruption" / "eldgos" finds every
 *  eruption — checked last, so a name hit always outranks it. */
export function matchEvent(
  e: ConflictEvent,
  normalizedQuery: string,
  typeName?: (type: EventType) => string,
): MatchField | null {
  const q = normalizedQuery;
  const has = (s: string) => normalizeForSearch(s).includes(q);
  if (has(e.name) || (e.icelandicName && has(e.icelandicName))) return 'name';
  if (e.aliases?.some(has)) return 'alias';
  if (e.keyPeople.some(has)) return 'person';
  if (e.factions.some(has)) return 'side';
  if (has(e.locationName)) return 'place';
  if (has(e.period)) return 'period';
  if (typeName && has(typeName(e.type))) return 'type';
  return null;
}

export interface ResolvedRoute {
  route: Route;
  /** Display title (tour title, or the person's name). */
  title: string;
  tagline?: string;
  tour?: Tour;
  person?: Person;
  stops: ConflictEvent[];
}

export interface Explorer {
  // raw state
  state: State;
  // data
  events: ConflictEvent[];
  byId: Map<string, ConflictEvent>;
  /** Events passing every filter, in data order. */
  filtered: ConflictEvent[];
  /** Events passing every filter except the year range — the timeline
   *  shows these and dims the ones outside the range. Chronological. */
  timeline: ConflictEvent[];
  /** What the map draws: filtered ∪ route stops ∪ the selection, so the
   *  thing you're reading always has a marker. */
  mapEvents: ConflictEvent[];
  selected: ConflictEvent | null;
  eras: Era[];
  activeEraId: string | null;
  filtersActive: boolean;
  route: ResolvedRoute | null;
  /** Index of the selection within the route, or -1 when off-route. */
  routeIndex: number;
  playlist: ConflictEvent[];
  /** matchEvent bound to the active language's type names — the one search
   *  rule the map, counts and result lists all share. */
  matchQuery: (e: ConflictEvent, normalizedQuery: string) => MatchField | null;
  earlier: ConflictEvent | null;
  later: ConflictEvent | null;
  // actions
  select: (id: string | null, source?: SelectSource) => void;
  close: () => void;
  setTypes: (types: EventType[]) => void;
  toggleType: (type: EventType) => void;
  setConfidence: (c: Confidence | 'all') => void;
  setYearRange: (range: [number, number]) => void;
  setSearch: (q: string) => void;
  resetFilters: () => void;
  selectEra: (eraId: string | null) => void;
  setShowClans: (show: boolean) => void;
  startTour: (tourId: string) => void;
  followPerson: (key: string) => void;
  stepRoute: (delta: 1 | -1) => void;
  goToStop: (index: number) => void;
  exitRoute: () => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  stepChrono: (delta: 1 | -1) => void;
  surprise: () => void;
  openDialog: (id: DialogId) => void;
  closeDialog: () => void;
  setMapStyle: (style: MapStyle) => void;
  requestFit: () => void;
  requestFocus: () => void;
  setHovered: (id: string | null) => void;
  setWelcome: (open: boolean) => void;
  dismissMissing: () => void;
  /** Push a message to the polite live region. */
  announce: (msg: string) => void;
}

const ExplorerContext = createContext<Explorer | null>(null);

// Autoplay dwell per event: long enough to read the story's opening lines,
// short enough that the full run stays under ~8 minutes.
export const PLAY_DWELL_MS = 9000;

export function ExplorerProvider({ children, announcer }: { children: ReactNode; announcer: (msg: string) => void }) {
  const { t, events } = useI18n();
  const [state, dispatch] = useReducer(reducer, undefined, init);

  const byId = useMemo(() => new Map(events.map((e) => [e.id, e])), [events]);

  const eras = useMemo(() => ERAS.map((e) => ({ ...e, range: clampRange(e.range, MIN_YEAR, MAX_YEAR) })), []);

  const { filters, search } = state;
  const q = search.trim() ? normalizeForSearch(search.trim()) : '';

  const matchQuery = useMemo(() => {
    const typeName = (type: EventType) => t.types[type];
    return (e: ConflictEvent, nq: string) => matchEvent(e, nq, typeName);
  }, [t]);

  const timeline = useMemo(
    () =>
      events
        .filter((e) => {
          if (filters.types.length > 0 && !filters.types.includes(e.type)) return false;
          if (filters.confidence !== 'all' && e.confidence !== filters.confidence) return false;
          if (q && !matchQuery(e, q)) return false;
          return true;
        })
        .sort(byYear),
    [events, filters.types, filters.confidence, q, matchQuery],
  );

  const filtered = useMemo(
    () =>
      timeline
        .filter((e) => e.year >= filters.yearRange[0] && e.year <= filters.yearRange[1])
        .sort((a, b) => (dataOrder.get(a.id) ?? 0) - (dataOrder.get(b.id) ?? 0)),
    [timeline, filters.yearRange],
  );

  const selected = state.selectedId ? byId.get(state.selectedId) ?? null : null;

  const route = useMemo<ResolvedRoute | null>(() => {
    const r = state.route;
    if (!r) return null;
    if (r.kind === 'tour') {
      const tour = TOURS.find((x) => x.id === r.id);
      if (!tour) return null;
      const content = t.tours.content[tour.id] ?? { title: tour.title, tagline: tour.tagline };
      return { route: r, tour, title: content.title, tagline: content.tagline, stops: resolveTourEvents(tour, events) };
    }
    const person = PEOPLE.get(r.key);
    if (!person) return null;
    return {
      route: r,
      person,
      title: personDisplayName(person, events),
      stops: person.eventIds.map((id) => byId.get(id)).filter((e): e is ConflictEvent => !!e),
    };
  }, [state.route, events, byId, t]);

  const routeIndex = route && selected ? route.stops.findIndex((e) => e.id === selected.id) : -1;

  const mapEvents = useMemo(() => {
    const out = new Map(filtered.map((e) => [e.id, e]));
    route?.stops.forEach((e) => out.set(e.id, e));
    if (selected) out.set(selected.id, selected);
    return [...out.values()];
  }, [filtered, route, selected]);

  const playlist = useMemo(() => [...filtered].sort(byYear), [filtered]);

  // Earlier / Later: chronological neighbours among what's shown; if the
  // selection itself is filtered out, among everything.
  const { earlier, later } = useMemo(() => {
    if (!selected) return { earlier: null, later: null };
    const list = playlist.some((e) => e.id === selected.id) ? playlist : [...events].sort(byYear);
    const i = list.findIndex((e) => e.id === selected.id);
    return { earlier: i > 0 ? list[i - 1] : null, later: i >= 0 && i < list.length - 1 ? list[i + 1] : null };
  }, [selected, playlist, events]);

  const activeEraId = useMemo(
    () => eras.find((e) => e.range[0] === filters.yearRange[0] && e.range[1] === filters.yearRange[1])?.id ?? null,
    [eras, filters.yearRange],
  );

  const filtersActive =
    filters.types.length > 0 ||
    filters.confidence !== 'all' ||
    filters.yearRange[0] !== MIN_YEAR ||
    filters.yearRange[1] !== MAX_YEAR ||
    q !== '';

  // ── Actions ──
  // Latest values for stable callbacks.
  const live = useRef({ state, route, events, byId, playlist, earlier, later, filtered, eras, t });
  live.current = { state, route, events, byId, playlist, earlier, later, filtered, eras, t };

  const actions = useMemo(() => {
    const select = (id: string | null, source: SelectSource = 'map') => {
      const L = live.current;
      // Mid-autoplay, picking an event by hand just moves the playhead: the
      // run continues from there (the dwell timer re-arms on selection).
      dispatch({ type: 'select', id, source });
      if (id && L.state.route) {
        const i = L.route?.stops.findIndex((e) => e.id === id) ?? -1;
        if (i >= 0) dispatch({ type: 'routeTo', index: i, id });
      }
    };
    const startRoute = (r: Route, stops: ConflictEvent[], at = 0) => {
      if (!stops.length) return;
      dispatch({ type: 'startRoute', route: r, stops: stops.map((e) => e.id), at });
    };
    return {
      select,
      close: () => dispatch({ type: 'select', id: null, source: 'story' }),
      setTypes: (types: EventType[]) => dispatch({ type: 'filters', patch: { types } }),
      toggleType: (type: EventType) => {
        const cur = live.current.state.filters.types;
        dispatch({
          type: 'filters',
          patch: { types: cur.includes(type) ? cur.filter((x) => x !== type) : [...cur, type] },
        });
      },
      setConfidence: (confidence: Confidence | 'all') => dispatch({ type: 'filters', patch: { confidence } }),
      setYearRange: (yearRange: [number, number]) => dispatch({ type: 'filters', patch: { yearRange } }),
      setSearch: (q: string) => dispatch({ type: 'search', q }),
      resetFilters: () => dispatch({ type: 'resetFilters' }),
      // Picking the active era again returns to all years (and only that —
      // it never silently clears your type or search filters).
      selectEra: (eraId: string | null) => {
        const L = live.current;
        const era = eraId ? L.eras.find((e) => e.id === eraId) ?? null : null;
        const active = L.eras.find(
          (e) => e.range[0] === L.state.filters.yearRange[0] && e.range[1] === L.state.filters.yearRange[1],
        );
        dispatch({ type: 'era', era: era && active?.id === era.id ? null : era });
      },
      setShowClans: (show: boolean) => dispatch({ type: 'clans', show }),
      startTour: (tourId: string) => {
        const tour = TOURS.find((x) => x.id === tourId);
        if (tour) startRoute({ kind: 'tour', id: tourId }, resolveTourEvents(tour, live.current.events));
      },
      // Following a person starts where you are if you're reading one of
      // their events — "2 of 6", not a jump back to the beginning.
      followPerson: (key: string) => {
        const person = PEOPLE.get(key);
        if (!person) return;
        const stops = person.eventIds.map((id) => live.current.byId.get(id)).filter((e): e is ConflictEvent => !!e);
        const at = Math.max(0, stops.findIndex((e) => e.id === live.current.state.selectedId));
        startRoute({ kind: 'person', key }, stops, at);
      },
      stepRoute: (delta: 1 | -1) => {
        const L = live.current;
        if (!L.route) return;
        const i = Math.min(Math.max(L.state.routeCursor + delta, 0), L.route.stops.length - 1);
        dispatch({ type: 'routeTo', index: i, id: L.route.stops[i].id });
      },
      goToStop: (index: number) => {
        const L = live.current;
        const stop = L.route?.stops[index];
        if (stop) dispatch({ type: 'routeTo', index, id: stop.id });
      },
      exitRoute: () => dispatch({ type: 'exitRoute' }),
      play: () => dispatch({ type: 'playing', on: true }),
      pause: () => dispatch({ type: 'playing', on: false }),
      togglePlay: () => dispatch({ type: 'playing', on: !live.current.state.playing }),
      stepChrono: (delta: 1 | -1) => {
        const L = live.current;
        const target = delta > 0 ? L.later : L.earlier;
        if (target) select(target.id, 'keyboard');
      },
      // Weighted toward stories with a human-drama section — the best first
      // impression the data can make. Never the one you're already on.
      surprise: () => {
        const L = live.current;
        const pool = (L.filtered.length ? L.filtered : L.events).filter((e) => e.id !== L.state.selectedId);
        if (!pool.length) return;
        const weighted = pool.flatMap((e) => (e.humanDrama ? [e, e, e] : [e]));
        select(weighted[Math.floor(Math.random() * weighted.length)].id, 'search');
      },
      openDialog: (id: DialogId) => dispatch({ type: 'dialog', id }),
      closeDialog: () => dispatch({ type: 'dialog', id: null }),
      setMapStyle: (style: MapStyle) => {
        storage.set(KEYS.mapStyle, style);
        dispatch({ type: 'mapStyle', style });
      },
      requestFit: () => dispatch({ type: 'fit' }),
      requestFocus: () => dispatch({ type: 'focus' }),
      setHovered: (id: string | null) => dispatch({ type: 'hover', id }),
      setWelcome: (open: boolean) => {
        if (!open) storage.set(KEYS.welcomed, '1');
        dispatch({ type: 'welcome', open });
      },
      dismissMissing: () => dispatch({ type: 'dismissMissing' }),
    };
  }, []);

  // ── Autoplay: a lean-back pass through the shown events, oldest first ──
  // A timeout re-armed on every selection, so hand-picking an event mid-run
  // simply moves the playhead and gives it a full dwell.
  useEffect(() => {
    if (!state.playing) return;
    if (playlist.length === 0) {
      dispatch({ type: 'playing', on: false });
      return;
    }
    const i = selected ? playlist.findIndex((e) => e.id === selected.id) : -1;
    if (i < 0) {
      // Start (or resume) from the next event by year, else the beginning.
      const next = (selected && playlist.find((e) => e.year > selected.year)) || playlist[0];
      dispatch({ type: 'select', id: next.id, source: 'play' });
      return;
    }
    const timer = window.setTimeout(() => {
      if (i < playlist.length - 1) dispatch({ type: 'select', id: playlist[i + 1].id, source: 'play' });
      else dispatch({ type: 'playing', on: false }); // the present: stop, keep the last event open
    }, PLAY_DWELL_MS);
    return () => window.clearTimeout(timer);
  }, [state.playing, state.selectedId, playlist, selected]);

  // ── Announcements for things that change without the visitor's hand ──
  useEffect(() => {
    if (!selected) return;
    if (state.selectSource === 'play') {
      const i = playlist.findIndex((e) => e.id === selected.id);
      announcer(`${t.timeline.playing(i + 1, playlist.length)}: ${t.announce.opened(selected.name, selected.year)}`);
    } else if (state.selectSource === 'route' && route) {
      const i = route.stops.findIndex((e) => e.id === selected.id);
      announcer(`${t.tours.stopOf(i + 1, route.stops.length)}: ${t.announce.opened(selected.name, selected.year)}`);
    }
    // Only on selection changes; the strings follow the language implicitly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedId, state.selectSource]);

  const firstCount = useRef(true);
  useEffect(() => {
    if (firstCount.current) {
      firstCount.current = false;
      return;
    }
    const id = window.setTimeout(() => announcer(t.announce.results(filtered.length, events.length)), 600);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered.length]);

  // ── The welcome card, once dismissed by any action, stays dismissed ──
  // (the reducer closes it on select / route / play; this persists that).
  const welcomeWasOpen = useRef(state.welcome);
  useEffect(() => {
    if (welcomeWasOpen.current && !state.welcome) storage.set(KEYS.welcomed, '1');
    welcomeWasOpen.current = state.welcome;
  }, [state.welcome]);

  // ── URL + tab title follow the selection ──
  // Always written (a legacy #event= hash is rewritten to the path form);
  // the initial state already came from the URL, so the first write is a no-op.
  useEffect(() => {
    const base = import.meta.env.BASE_URL;
    const path = selected ? `${base}event/${selected.id}` : base;
    if (window.location.pathname !== path || window.location.hash) window.history.replaceState(null, '', path);
    document.title = selected ? t.doc.eventTitle(selected.name) : t.doc.siteTitle;
  }, [selected, t]);

  // ── Escape, base layer: pause → leave the route → close the story ──
  useEscape(
    () => {
      const s = live.current.state;
      if (s.playing) dispatch({ type: 'playing', on: false });
      else if (s.route) dispatch({ type: 'exitRoute' });
      else if (s.selectedId) dispatch({ type: 'select', id: null, source: 'keyboard' });
    },
    true,
    true,
  );

  // ── Global shortcuts ──
  // ←/→ step the route (or Earlier/Later); "/" jumps to search. Suppressed
  // while typing and inside widgets that own their arrow keys (the map pans
  // with them, sliders and listboxes navigate with them).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      const el = e.target as HTMLElement | null;
      const typing = !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
      if (typing) return;
      if (e.key === '/') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('sagas:focus-search'));
        return;
      }
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      if (el?.closest('.leaflet-container, [role="slider"], [role="listbox"], [role="radiogroup"], [role="tablist"], [data-own-arrows]'))
        return;
      const d = e.key === 'ArrowRight' ? 1 : -1;
      const s = live.current.state;
      if (s.route) {
        e.preventDefault();
        actions.stepRoute(d);
      } else if (s.selectedId) {
        e.preventDefault();
        actions.stepChrono(d);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [actions]);

  const value = useMemo<Explorer>(
    () => ({
      state,
      events,
      byId,
      filtered,
      timeline,
      mapEvents,
      selected,
      eras,
      activeEraId,
      filtersActive,
      route,
      routeIndex,
      playlist,
      matchQuery,
      earlier,
      later,
      announce: announcer,
      ...actions,
    }),
    [
      state,
      events,
      byId,
      filtered,
      timeline,
      mapEvents,
      selected,
      eras,
      activeEraId,
      filtersActive,
      route,
      routeIndex,
      playlist,
      matchQuery,
      earlier,
      later,
      announcer,
      actions,
    ],
  );

  return <ExplorerContext.Provider value={value}>{children}</ExplorerContext.Provider>;
}

export function useExplorer(): Explorer {
  const ctx = useContext(ExplorerContext);
  if (!ctx) throw new Error('useExplorer must be used inside <ExplorerProvider>');
  return ctx;
}

