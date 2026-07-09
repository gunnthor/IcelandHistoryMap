import { useEffect } from 'react';
import { HistoricFlags } from './HistoricFlags';
import { useI18n } from '../i18n';

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
  const { t } = useI18n();

  // Close on Esc while the dialog is open. Capture phase + stopPropagation:
  // the open dialog owns Escape (see TourPicker for the full story).
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
        className="about-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="about-close" onClick={onClose} aria-label={t.panel.close}>
          ✕
        </button>

        <h2 id="about-title" className="about-title">
          {t.about.title}
        </h2>
        <p className="about-tagline">{t.about.tagline}</p>

        <p className="about-body">
          {t.about.bodyStart}
          <strong>{t.about.bodyRoute}</strong>
          {t.about.bodyEnd}
        </p>

        <div className="about-divider" />

        <HistoricFlags />

        <div className="about-divider" />

        <dl className="about-meta">
          <dt>{t.about.authorLabel}</dt>
          <dd>{AUTHOR}</dd>
        </dl>

        <p className="about-body about-note">{t.about.note}</p>

        <div className="about-actions">
          <a
            className="btn btn-primary"
            href={ISSUES_NEW_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.about.reportBtn}
          </a>
          <a className="btn btn-ghost" href={REPO_URL} target="_blank" rel="noopener noreferrer">
            {t.about.sourceBtn}
          </a>
        </div>
      </div>
    </div>
  );
}
