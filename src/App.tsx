import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { ConflictEvent, FilterState } from './types';
import { events as baseEvents } from './data/events';
import { getYearBounds, ERAS, clampRange, Era } from './utils/eventConfig';
import { useI18n } from './i18n';
import { normalizeForSearch } from './utils/text';
import { BattleMap } from './components/BattleMap';
import { EventPanel, MobileDrawer } from './components/EventPanel';
import { FilterBar } from './components/FilterBar';
import { Timeline } from './components/Timeline';
import { SearchBar } from './components/SearchBar';
import { TourBanner } from './components/TourBanner';
import { TourPicker } from './components/TourPicker';
import { AboutModal } from './components/AboutModal';
import { Tour, resolveTourEvents } from './data/tours';

// Year bounds are derived from the data so adding events outside 1238–1627
// (e.g. the Cod Wars) automatically extends the timeline and slider range.
// Years are language-independent, so the English base is fine here.
const [MIN_YEAR, MAX_YEAR] = getYearBounds(baseEvents);

const INITIAL_FILTERS: FilterState = {
  types: [], // empty = all types
  confidence: 'all',
  yearRange: [MIN_YEAR, MAX_YEAR],
};

// Autoplay dwell per event: long enough to read the panel's opening lines,
// short enough that the full 52-stop run stays under ~8 minutes.
const PLAY_DWELL_MS = 9000;

export default function App() {
  // The event dataset in the active language; everything downstream renders it.
  const { t, lang, setLang, events: allEvents } = useI18n();
  const [selectedEvent, setSelectedEvent] = useState<ConflictEvent | null>(null);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showClans, setShowClans] = useState(false);
  const [activeTour, setActiveTour] = useState<Tour | null>(null);
  const [tourStep, setTourStep] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [playing, setPlaying] = useState(false);

  // The active route's stops, in route order (localized).
  const tourEvents = useMemo(
    () => (activeTour ? resolveTourEvents(activeTour, allEvents) : []),
    [activeTour, allEvents],
  );

  // Era presets, with ranges clamped to the years we actually have data for.
  const eras = useMemo(
    () => ERAS.map((e) => ({ ...e, range: clampRange(e.range, MIN_YEAR, MAX_YEAR) })),
    [],
  );

  // The era whose range exactly matches the current year slider, if any. Drives
  // which era chip shows as active; null once the user nudges the slider away.
  const activeEraId = useMemo(() => {
    const match = eras.find(
      (e) => e.range[0] === filters.yearRange[0] && e.range[1] === filters.yearRange[1],
    );
    return match?.id ?? null;
  }, [eras, filters.yearRange]);

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      if (filters.types.length > 0 && !filters.types.includes(event.type)) return false;
      if (filters.confidence !== 'all' && event.confidence !== filters.confidence) return false;
      if (event.year < filters.yearRange[0] || event.year > filters.yearRange[1]) return false;
      if (searchQuery.trim()) {
        // Both sides normalized: accent- and Icelandic-letter-insensitive.
        const q = normalizeForSearch(searchQuery.trim());
        const haystack = normalizeForSearch(
          [
            event.name,
            event.icelandicName ?? '',
            ...(event.aliases ?? []),
            event.locationName,
            event.period,
            ...event.keyPeople,
            ...event.factions,
          ].join(' '),
        );
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [allEvents, filters, searchQuery]);

  const handleSelectEvent = useCallback((event: ConflictEvent) => {
    setSelectedEvent(event);
  }, []);

  // On language switch, re-resolve the selection into the new dataset so the
  // open panel changes language too (same id, different object).
  useEffect(() => {
    setSelectedEvent((prev) => (prev ? allEvents.find((e) => e.id === prev.id) ?? null : prev));
  }, [allEvents]);

  // ── Autoplay: a lean-back pass through the filtered events, oldest first ──
  const playlist = useMemo(
    () => [...filteredEvents].sort((a, b) => a.year - b.year),
    [filteredEvents],
  );

  // The playhead derives from whatever is selected, read through a ref so the
  // interval never holds a stale selection — clicking around while playing
  // simply moves the needle and the tour continues from there.
  const selectedRef = useRef<ConflictEvent | null>(null);
  useEffect(() => {
    selectedRef.current = selectedEvent;
  }, [selectedEvent]);

  useEffect(() => {
    if (!playing) return;
    if (playlist.length === 0) {
      setPlaying(false);
      return;
    }
    // First stop: resume from the selection if it's on the playlist,
    // otherwise from the next event by year (or the very beginning).
    const cur = selectedRef.current;
    if (!cur || !playlist.some((e) => e.id === cur.id)) {
      const next = cur ? playlist.find((e) => e.year > cur.year) ?? playlist[0] : playlist[0];
      setSelectedEvent(next);
    }
    const timer = setInterval(() => {
      const now = selectedRef.current;
      const idx = now ? playlist.findIndex((e) => e.id === now.id) : -1;
      if (idx >= 0 && idx < playlist.length - 1) {
        setSelectedEvent(playlist[idx + 1]);
      } else if (idx === playlist.length - 1) {
        setPlaying(false); // reached the present — stop, keep the last event open
      } else {
        const next = now ? playlist.find((e) => e.year > now.year) ?? playlist[0] : playlist[0];
        setSelectedEvent(next);
      }
    }, PLAY_DWELL_MS);
    return () => clearInterval(timer);
  }, [playing, playlist]);

  const togglePlay = useCallback(() => {
    if (!playing && activeTour) setActiveTour(null); // play takes over from a route
    setPlaying(!playing);
  }, [playing, activeTour]);

  const playLabel = useMemo(() => {
    if (!playing || !selectedEvent) return null;
    const i = playlist.findIndex((e) => e.id === selectedEvent.id);
    return t.timeline.playing(selectedEvent.year, selectedEvent.name, i + 1, playlist.length);
  }, [playing, selectedEvent, playlist, t]);

  const handleCloseEvent = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setSearchQuery('');
    setShowClans(false); // leaving any era hides the clan-seats layer
  }, []);

  // Pick an era: snap the timeline to its range and reveal the clan-seats layer
  // for the Sturlung Age (and only then). Re-clicking the active era clears it.
  const selectEra = useCallback(
    (era: Era) => {
      if (activeEraId === era.id) {
        resetFilters();
        return;
      }
      setFilters((f) => ({ ...f, yearRange: era.range }));
      setShowClans(!!era.showClans);
    },
    [activeEraId, resetFilters],
  );

  const startTour = (tour: Tour) => {
    const stops = resolveTourEvents(tour, allEvents);
    if (!stops.length) return;
    setPlaying(false); // a guided route replaces the autoplay
    setPickerOpen(false);
    setActiveTour(tour);
    setTourStep(0);
    setSelectedEvent(stops[0]);
    // Reset filters so every tour stop is visible on the map.
    setFilters(INITIAL_FILTERS);
    setSearchQuery('');
    setShowClans(false);
  };

  const exitTour = () => {
    setActiveTour(null);
    setSelectedEvent(null);
  };

  const tourNext = () => {
    const next = Math.min(tourStep + 1, tourEvents.length - 1);
    setTourStep(next);
    setSelectedEvent(tourEvents[next]);
  };

  const tourPrev = () => {
    const prev = Math.max(tourStep - 1, 0);
    setTourStep(prev);
    setSelectedEvent(tourEvents[prev]);
  };

  // Deep-link: read /event/<id> (or a legacy #event= hash) on first load.
  useEffect(() => {
    const base = import.meta.env.BASE_URL;
    const path = window.location.pathname.startsWith(base)
      ? window.location.pathname.slice(base.length)
      : window.location.pathname.replace(/^\//, '');
    const id =
      path.match(/^event\/([\w-]+)\/?$/)?.[1] ??
      window.location.hash.match(/event=([\w-]+)/)?.[1];
    if (id) {
      const ev = allEvents.find((e) => e.id === id);
      if (ev) setSelectedEvent(ev);
    }
    // Mount-only: the language-switch effect re-resolves the selection later.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Deep-link: keep the URL path + tab title in sync with the selection.
  // Skipped on mount — the URL is already right, and the first run would
  // briefly wipe a deep-linked path before the selection state lands.
  const urlSyncReady = useRef(false);
  useEffect(() => {
    if (!urlSyncReady.current) {
      urlSyncReady.current = true;
      return;
    }
    const base = import.meta.env.BASE_URL;
    window.history.replaceState(null, '', selectedEvent ? `${base}event/${selectedEvent.id}` : base);
    document.title = selectedEvent ? t.doc.eventTitle(selectedEvent.name) : t.doc.siteTitle;
  }, [selectedEvent, t]);

  // Keyboard shortcuts: Esc closes / exits tour, arrows step through the tour.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = !!target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');
      if (e.key === 'Escape') {
        if (playing) setPlaying(false);
        else if (activeTour) exitTour();
        else if (selectedEvent) handleCloseEvent();
        return;
      }
      if (typing) return;
      if (activeTour) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          tourNext();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          tourPrev();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // selectedEvent in deps means fresh closures on every tour step.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTour, selectedEvent, playing]);

  const filtersActive =
    filters.types.length > 0 ||
    filters.confidence !== 'all' ||
    filters.yearRange[0] !== MIN_YEAR ||
    filters.yearRange[1] !== MAX_YEAR ||
    searchQuery.trim() !== '';

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-branding">
          <div className="header-title">{t.header.title}</div>
          <div className="header-subtitle">{t.header.subtitle}</div>
        </div>
        <div className="header-controls">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          {!activeTour && (
            <button className="btn btn-primary" onClick={() => setPickerOpen(true)}>
              🧭 <span className="btn-word-optional">{t.header.routesOptional}</span>
              {t.header.routesRest}
            </button>
          )}
          <button
            className="btn btn-secondary"
            onClick={() => setAboutOpen(true)}
            title={t.header.aboutTitle}
            aria-label={t.header.aboutTitle}
          >
            ⓘ<span className="btn-word-optional">{t.header.aboutWord}</span>
          </button>
          {/* Language switcher — the manual choice persists across visits */}
          <div className="lang-switch" role="group" aria-label={t.lang.groupAria}>
            <button
              className={`lang-btn${lang === 'en' ? ' active' : ''}`}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
              title={t.lang.enTitle}
            >
              EN
            </button>
            <button
              className={`lang-btn${lang === 'is' ? ' active' : ''}`}
              onClick={() => setLang('is')}
              aria-pressed={lang === 'is'}
              title={t.lang.isTitle}
            >
              ÍS
            </button>
          </div>
        </div>
      </header>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />

      {/* Story-route picker */}
      <TourPicker open={pickerOpen} onClose={() => setPickerOpen(false)} onSelect={startTour} />

      {/* Tour banner */}
      {activeTour && (
        <TourBanner
          tour={activeTour}
          events={tourEvents}
          step={tourStep}
          onNext={tourNext}
          onPrev={tourPrev}
          onExit={exitTour}
        />
      )}

      {/* Filter bar */}
      <FilterBar
        filters={filters}
        onChange={setFilters}
        resultCount={filteredEvents.length}
        active={filtersActive}
        onReset={resetFilters}
        eras={eras}
        activeEraId={activeEraId}
        onSelectEra={selectEra}
      />

      {/* Main: map + desktop panel */}
      <div className="main-area">
        <BattleMap
          events={filteredEvents}
          selectedEvent={selectedEvent}
          onSelectEvent={handleSelectEvent}
          onResetFilters={resetFilters}
          showClans={showClans}
          onShowClansChange={setShowClans}
        />
        <EventPanel
          event={selectedEvent}
          onClose={handleCloseEvent}
          onSelectEvent={handleSelectEvent}
        />
      </div>

      {/* Timeline */}
      <Timeline
        events={allEvents}
        selectedEvent={selectedEvent}
        yearRange={filters.yearRange}
        minYear={MIN_YEAR}
        maxYear={MAX_YEAR}
        onSelectEvent={handleSelectEvent}
        onYearRangeChange={(range) => setFilters((f) => ({ ...f, yearRange: range }))}
        playing={playing}
        onTogglePlay={togglePlay}
        playLabel={playLabel}
      />

      {/* Mobile bottom drawer */}
      <MobileDrawer
        event={selectedEvent}
        onClose={handleCloseEvent}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
}
