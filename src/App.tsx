import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { ConflictEvent, FilterState } from './types';
import { events as allEvents } from './data/events';
import { getYearBounds, ERAS, clampRange, Era } from './utils/eventConfig';
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
const [MIN_YEAR, MAX_YEAR] = getYearBounds(allEvents);

const INITIAL_FILTERS: FilterState = {
  types: [], // empty = all types
  confidence: 'all',
  yearRange: [MIN_YEAR, MAX_YEAR],
};

export default function App() {
  const [selectedEvent, setSelectedEvent] = useState<ConflictEvent | null>(null);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showClans, setShowClans] = useState(false);
  const [activeTour, setActiveTour] = useState<Tour | null>(null);
  const [tourStep, setTourStep] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  // The active route's stops, in route order.
  const tourEvents = useMemo(
    () => (activeTour ? resolveTourEvents(activeTour) : []),
    [activeTour],
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
  }, [filters, searchQuery]);

  const handleSelectEvent = useCallback((event: ConflictEvent) => {
    setSelectedEvent(event);
  }, []);

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
    const stops = resolveTourEvents(tour);
    if (!stops.length) return;
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
    document.title = selectedEvent
      ? `${selectedEvent.name} — Sagas of Blood & Fire`
      : "Sagas of Blood & Fire — Iceland's violent history, mapped";
  }, [selectedEvent]);

  // Keyboard shortcuts: Esc closes / exits tour, arrows step through the tour.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = !!target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');
      if (e.key === 'Escape') {
        if (activeTour) exitTour();
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
  }, [activeTour, selectedEvent]);

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
          <div className="header-title">⚔ Sagas of Blood &amp; Fire</div>
          <div className="header-subtitle">
            An interactive map of Iceland&apos;s violent history.
          </div>
        </div>
        <div className="header-controls">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          {!activeTour && (
            <button className="btn btn-primary" onClick={() => setPickerOpen(true)}>
              🧭 <span className="btn-word-optional">Story </span>Routes
            </button>
          )}
          <button
            className="btn btn-secondary"
            onClick={() => setAboutOpen(true)}
            title="About this site"
            aria-label="About this site"
          >
            ⓘ<span className="btn-word-optional"> About</span>
          </button>
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
