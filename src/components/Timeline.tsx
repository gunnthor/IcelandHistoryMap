import { ConflictEvent } from '../types';
import { EVENT_CONFIG } from '../utils/eventConfig';
import { useI18n } from '../i18n';

interface TimelineProps {
  events: ConflictEvent[];
  selectedEvent: ConflictEvent | null;
  yearRange: [number, number];
  minYear: number;
  maxYear: number;
  onSelectEvent: (e: ConflictEvent) => void;
  onYearRangeChange: (range: [number, number]) => void;
  // Autoplay: lean-back pass through the visible events, oldest first.
  playing: boolean;
  onTogglePlay: () => void;
  playLabel: string | null;
}

export function Timeline({
  events,
  selectedEvent,
  yearRange,
  minYear,
  maxYear,
  onSelectEvent,
  onYearRangeChange,
  playing,
  onTogglePlay,
  playLabel,
}: TimelineProps) {
  const { t } = useI18n();
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
        <div className="timeline-head">
          <button
            type="button"
            className={`timeline-play${playing ? ' playing' : ''}`}
            onClick={onTogglePlay}
            aria-pressed={playing}
            aria-label={playing ? t.timeline.pauseAria : t.timeline.playAria}
            title={playing ? t.timeline.pauseTitle : t.timeline.playTitle}
          >
            {playing ? '⏸︎' : '▶︎'}
          </button>
          <div className="timeline-label">
            {playLabel ?? t.timeline.idle}
          </div>
        </div>

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
            aria-label={t.timeline.startYear}
            title={t.timeline.startYear}
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
            aria-label={t.timeline.endYear}
            title={t.timeline.endYear}
          />
          <span>{maxYear}</span>
        </div>
      </div>
    </div>
  );
}
