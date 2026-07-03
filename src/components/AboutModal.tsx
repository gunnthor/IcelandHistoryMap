import { useEffect } from 'react';
import { HistoricFlags } from './HistoricFlags';

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

const AUTHOR = 'Gunnþór Karl Rafnsson';
const REPO_URL = 'https://github.com/gunnthor/IcelandHistoryMap';
// Feedback goes through GitHub Issues (no personal contact details in the frontend).
const ISSUES_NEW_URL = `${REPO_URL}/issues/new?title=${encodeURIComponent(
  'Report correction / suggest source',
)}`;

export function AboutModal({ open, onClose }: AboutModalProps) {
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
        className="about-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="about-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <h2 id="about-title" className="about-title">
          ⚔ Sagas of Blood &amp; Fire
        </h2>
        <p className="about-tagline">An interactive map of Iceland&apos;s violent history.</p>

        <p className="about-body">
          An interactive map of Iceland&apos;s messiest historical conflicts — battles, raids,
          burnings and feuds from the Saga Age through the Sturlung civil war and into modern
          times. Each marker carries a plain-language summary, why it happened, why it matters,
          a confidence rating and its sources. Use the era presets and timeline to travel
          through the centuries, or pick a <strong>Story Route</strong> for a guided tour.
        </p>

        <div className="about-divider" />

        <HistoricFlags />

        <div className="about-divider" />

        <dl className="about-meta">
          <dt>Author</dt>
          <dd>{AUTHOR}</dd>
        </dl>

        <p className="about-body about-note">
          History is messy and the sources often disagree — some saga-era locations and
          casualty numbers are approximate, which is why every event shows a confidence level
          and links to its sources. Spotted a mistake or have an event to suggest? I&apos;d love
          to hear it.
        </p>

        <div className="about-actions">
          <a
            className="btn btn-primary"
            href={ISSUES_NEW_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            ✎ Report correction / suggest source
          </a>
          <a className="btn btn-ghost" href={REPO_URL} target="_blank" rel="noopener noreferrer">
            ⌥ Source on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
