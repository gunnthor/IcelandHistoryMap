import { ConflictEvent } from '../types';
import { EVENT_CONFIG } from '../utils/eventConfig';

interface TimelineProps {
  events: ConflictEvent[];
  selectedEvent: ConflictEvent | null;
  yearRange: [number, number];
  minYear: number;
  maxYear: number;
  onSelectEvent: (e: ConflictEvent) => void;
  onYearRangeChange: (range: [number, number]) => void;
}

export function Timeline({
  events,
  selectedEvent,
  yearRange,
  minYear,
  maxYear,
  onSelectEvent,
  onYearRangeChange,
}: TimelineProps) {
  // Sorted chronologically for left-to-right ordering.
  const sorted = [...events].sort((a, b) => a.year - b.year);
  const n = sorted.length;
  const [minY, maxY] = yearRange;

  // Even spacing (not proportional): keeps tightly-clustered events — e.g. the
  // 1238–1253 Sturlung battles — readable instead of overlapping on the left.
  const leftFor = (i: number) => (n <= 1 ? 50 : 6 + (i / (n - 1)) * 88);

  return (
    <div className="timeline-wrap">
      <div className="timeline-inner">
        <div className="timeline-label">Timeline — click an event to jump to it</div>

        <div className="timeline-track-wrap">
          <div className="timeline-track" />
          <div className="timeline-events">
            {sorted.map((event, i) => {
              const cfg = EVENT_CONFIG[event.type];
              const isSelected = event.id === selectedEvent?.id;
              const inRange = event.year >= minY && event.year <= maxY;

              return (
                <div
                  key={event.id}
                  className={`timeline-dot${isSelected ? ' selected' : ''}`}
                  style={{ left: `${leftFor(i)}%`, opacity: inRange ? 1 : 0.3 }}
                  onClick={() => onSelectEvent(event)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectEvent(event);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${event.name}, ${event.year}`}
                  title={`${event.name} (${event.year})`}
                >
                  <div
                    className="timeline-dot-marker"
                    style={{ background: cfg.color }}
                  >
                    {cfg.symbol}
                  </div>
                  <div className="timeline-dot-year">{event.year}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Year range slider row (proportional to real years) */}
        <div className="timeline-year-range">
          <span>{minYear}</span>
          <input
            type="range"
            min={minYear}
            max={maxYear}
            value={minY}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (v < maxY) onYearRangeChange([v, maxY]);
            }}
            aria-label="Start year"
            title="Start year"
          />
          <span className="timeline-year-label">{minY} – {maxY}</span>
          <input
            type="range"
            min={minYear}
            max={maxYear}
            value={maxY}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (v > minY) onYearRangeChange([minY, v]);
            }}
            aria-label="End year"
            title="End year"
          />
          <span>{maxYear}</span>
        </div>
      </div>
    </div>
  );
}
