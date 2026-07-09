import { ConflictEvent } from '../types';
import { Tour } from '../data/tours';
import { useI18n } from '../i18n';

interface TourBannerProps {
  tour: Tour;
  events: ConflictEvent[]; // this tour's stops, in route order
  step: number;
  onNext: () => void;
  onPrev: () => void;
  onExit: () => void;
}

export function TourBanner({ tour, events, step, onNext, onPrev, onExit }: TourBannerProps) {
  const { t } = useI18n();
  const current = events[step];
  if (!current) return null;

  // Tour titles live in tours.ts (English) with an Icelandic overlay in ui.ts.
  const title = t.tours.content[tour.id]?.title ?? tour.title;

  return (
    <div className="tour-banner">
      <span className="tour-label" title={title}>
        {tour.emoji} {title}
      </span>
      <span className="tour-event-name">{current.name}</span>
      <span className="tour-step-count">{step + 1} / {events.length}</span>
      <div className="tour-controls">
        <button className="tour-btn" onClick={onPrev} disabled={step === 0}>
          {t.tours.prev}
        </button>
        <button className="tour-btn" onClick={onNext} disabled={step === events.length - 1}>
          {t.tours.next}
        </button>
        <button className="tour-btn-exit" onClick={onExit} title={t.tours.exitTitle}>
          {t.tours.exit}
        </button>
      </div>
    </div>
  );
}
