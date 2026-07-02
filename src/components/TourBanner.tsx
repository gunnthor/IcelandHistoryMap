import { ConflictEvent } from '../types';
import { Tour } from '../data/tours';

interface TourBannerProps {
  tour: Tour;
  events: ConflictEvent[]; // this tour's stops, in route order
  step: number;
  onNext: () => void;
  onPrev: () => void;
  onExit: () => void;
}

export function TourBanner({ tour, events, step, onNext, onPrev, onExit }: TourBannerProps) {
  const current = events[step];
  if (!current) return null;

  return (
    <div className="tour-banner">
      <span className="tour-label" title={tour.title}>
        {tour.emoji} {tour.title}
      </span>
      <span className="tour-event-name">{current.name}</span>
      <span className="tour-step-count">{step + 1} / {events.length}</span>
      <div className="tour-controls">
        <button className="tour-btn" onClick={onPrev} disabled={step === 0}>
          ← Prev
        </button>
        <button className="tour-btn" onClick={onNext} disabled={step === events.length - 1}>
          Next →
        </button>
        <button className="tour-btn-exit" onClick={onExit} title="Exit route">
          ✕ Exit
        </button>
      </div>
    </div>
  );
}
