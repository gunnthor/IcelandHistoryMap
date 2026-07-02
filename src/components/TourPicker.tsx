import { useEffect } from 'react';
import { Tour, TOURS, resolveTourEvents } from '../data/tours';

interface TourPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (tour: Tour) => void;
}

export function TourPicker({ open, onClose, onSelect }: TourPickerProps) {
  // Close on Esc while the dialog is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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
        <button className="about-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <h2 id="route-picker-title" className="about-title">
          🧭 Story Routes
        </h2>
        <p className="about-tagline">
          Don&apos;t browse — be led. Pick a route and we&apos;ll walk you through it, stop by stop.
        </p>

        <div className="route-list">
          {TOURS.map((tour) => {
            const stops = resolveTourEvents(tour).length;
            return (
              <button key={tour.id} className="route-card" onClick={() => onSelect(tour)}>
                <span className="route-emoji">{tour.emoji}</span>
                <span className="route-info">
                  <span className="route-title">{tour.title}</span>
                  <span className="route-tagline">{tour.tagline}</span>
                </span>
                <span className="route-stops">{stops} stops</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
