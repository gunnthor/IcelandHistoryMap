import { useState, useMemo, useEffect, useCallback } from 'react';
import { ConflictEvent, FilterState } from './types';
import { events as allEvents } from './data/events';
import { getYearBounds } from './utils/eventConfig';
import { BattleMap } from './components/BattleMap';
import { EventPanel, MobileDrawer } from './components/EventPanel';
import { FilterBar } from './components/FilterBar';
import { Timeline } from './components/Timeline';
import { SearchBar } from './components/SearchBar';
import { TourBanner } from './components/TourBanner';

// Year bounds are derived from the data so adding events outside 1238–1627
// (e.g. the Cod Wars) automatically extends the timeline and slider range.
const [MIN_YEAR, MAX_YEAR] = getYearBounds(allEvents);

const INITIAL_FILTERS: FilterState = {
  type: 'all',
  confidence: 'all',
  yearRange: [MIN_YEAR, MAX_YEAR],
};

// Tour order: chronological.
const TOUR_EVENTS = [...allEvents].sort((a, b) => a.year - b.year);

export default function App() {
  const [selectedEvent, setSelectedEvent] = useState<ConflictEvent | null>(null);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [tourActive, setTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      if (filters.type !== 'all' && event.type !== filters.type) return false;
      if (filters.confidence !== 'all' && event.confidence !== filters.confidence) return false;
      if (event.year < filters.yearRange[0] || event.year > filters.yearRange[1]) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const haystack = [
          event.name,
          event.icelandicName ?? '',
          event.locationName,
          event.period,
          ...event.keyPeople,
          ...event.factions,
        ]
          .join(' ')
          .toLowerCase();
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
  }, []);

  const startTour = () => {
    setTourActive(true);
    setTourStep(0);
    setSelectedEvent(TOUR_EVENTS[0]);
    // Reset filters so every tour stop is visible on the map.
    setFilters(INITIAL_FILTERS);
    setSearchQuery('');
  };

  const exitTour = () => {
    setTourActive(false);
    setSelectedEvent(null);
  };

  const tourNext = () => {
    const next = Math.min(tourStep + 1, TOUR_EVENTS.length - 1);
    setTourStep(next);
    setSelectedEvent(TOUR_EVENTS[next]);
  };

  const tourPrev = () => {
    const prev = Math.max(tourStep - 1, 0);
    setTourStep(prev);
    setSelectedEvent(TOUR_EVENTS[prev]);
  };

  // Deep-link: read an event id from the URL hash on first load.
  useEffect(() => {
    const match = window.location.hash.match(/event=([\w-]+)/);
    if (match) {
      const ev = allEvents.find((e) => e.id === match[1]);
      if (ev) setSelectedEvent(ev);
    }
  }, []);

  // Deep-link: keep the URL hash in sync with the selection (shareable links).
  useEffect(() => {
    const url = new URL(window.location.href);
    url.hash = selectedEvent ? `event=${selectedEvent.id}` : '';
    window.history.replaceState(null, '', url.toString());
  }, [selectedEvent]);

  // Keyboard shortcuts: Esc closes / exits tour, arrows step through the tour.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = !!target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');
      if (e.key === 'Escape') {
        if (tourActive) exitTour();
        else if (selectedEvent) handleCloseEvent();
        return;
      }
      if (typing) return;
      if (tourActive) {
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
  }, [tourActive, selectedEvent]);

  const filtersActive =
    filters.type !== 'all' ||
    filters.confidence !== 'all' ||
    filters.yearRange[0] !== MIN_YEAR ||
    filters.yearRange[1] !== MAX_YEAR ||
    searchQuery.trim() !== '';

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-branding">
          <div className="header-title">⚔ Battle Map of Iceland</div>
          <div className="header-subtitle">
            Sagas of blood, fire &amp; feud across the old North.
          </div>
        </div>
        <div className="header-controls">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          {!tourActive && (
            <button className="btn btn-primary" onClick={startTour}>
              🧭 Start Here
            </button>
          )}
        </div>
      </header>

      {/* Tour banner */}
      {tourActive && (
        <TourBanner
          events={TOUR_EVENTS}
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
      />

      {/* Main: map + desktop panel */}
      <div className="main-area">
        <BattleMap
          events={filteredEvents}
          selectedEvent={selectedEvent}
          onSelectEvent={handleSelectEvent}
          onResetFilters={resetFilters}
        />
        <EventPanel event={selectedEvent} onClose={handleCloseEvent} />
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
      <MobileDrawer event={selectedEvent} onClose={handleCloseEvent} />
    </div>
  );
}
