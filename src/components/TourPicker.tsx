import { useEffect } from 'react';
import { Tour, TOURS, resolveTourEvents } from '../data/tours';
import { useI18n } from '../i18n';

interface TourPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (tour: Tour) => void;
}

export function TourPicker({ open, onClose, onSelect }: TourPickerProps) {
  const { t } = useI18n();

  // Close on Esc while the dialog is open. Capture phase + stopPropagation:
  // the open dialog owns Escape, so App's handler doesn't also close the
  // event panel underneath — and can't win a listener re-subscription race
  // when its own state update re-renders us mid-dispatch.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="about-backdrop" onClick={onClose}>
      <div
        className="route-picker"
        role="dialog"
        aria-modal="true"
        aria-labelledby="route-picker-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="about-close" onClick={onClose} aria-label={t.panel.close}>
          ✕
        </button>

        <h2 id="route-picker-title" className="about-title">
          {t.tours.pickerTitle}
        </h2>
        <p className="about-tagline">{t.tours.pickerTagline}</p>

        <div className="route-list">
          {TOURS.map((tour) => {
            const stops = resolveTourEvents(tour).length;
            const content = t.tours.content[tour.id] ?? { title: tour.title, tagline: tour.tagline };
            return (
              <button key={tour.id} className="route-card" onClick={() => onSelect(tour)}>
                <span className="route-emoji">{tour.emoji}</span>
                <span className="route-info">
                  <span className="route-title">{content.title}</span>
                  <span className="route-tagline">{content.tagline}</span>
                </span>
                <span className="route-stops">{t.tours.stops(stops)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
