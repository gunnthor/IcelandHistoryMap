import { useState } from 'react';
import { ConflictEvent } from '../types';
import { EVENT_CONFIG, CONFIDENCE_CONFIG, FLAG_CONFIG } from '../utils/eventConfig';

interface EventPanelProps {
  event: ConflictEvent | null;
  onClose: () => void;
}

function PanelContent({ event, onClose }: EventPanelProps) {
  const [copied, setCopied] = useState(false);

  if (!event) {
    return (
      <div className="panel-placeholder">
        <div className="panel-placeholder-icon">🗺️</div>
        <h3>Select an event</h3>
        <p>Click any marker on the map to read about a battle, raid, or other conflict.</p>
      </div>
    );
  }

  const typeCfg = EVENT_CONFIG[event.type];
  const confCfg = CONFIDENCE_CONFIG[event.confidence];

  // Every event has a shareable URL: /event/<id>. Native share sheet on
  // mobile, clipboard + a brief "Copied" confirmation elsewhere.
  const share = async () => {
    const url = `${window.location.origin}${import.meta.env.BASE_URL}event/${event.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: event.name, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // user dismissed the share sheet / clipboard denied — nothing to do
    }
  };

  return (
    <div className="panel-inner">
      <div className="panel-header">
        <div className="panel-header-top">
          <h2 className="panel-event-name">{event.name}</h2>
          <button
            className={`panel-share${copied ? ' copied' : ''}`}
            onClick={share}
            title="Copy link to this event"
            aria-label="Share this event"
          >
            {copied ? '✓ Copied' : '🔗 Share'}
          </button>
          <button className="panel-close" onClick={onClose} title="Close" aria-label="Close panel">✕</button>
        </div>
        {event.icelandicName && (
          <div className="panel-icelandic-name">{event.icelandicName}</div>
        )}
        <div className="panel-badges">
          <span
            className="badge"
            style={{ background: typeCfg.bgColor, color: typeCfg.color }}
          >
            <span>{typeCfg.symbol}</span>
            {typeCfg.label}
          </span>
          <span
            className="badge"
            style={{ background: confCfg.bgColor, color: confCfg.color }}
            title={confCfg.description}
          >
            {event.confidence === 'high' ? '✓' : event.confidence === 'medium' ? '~' : '?'} {confCfg.label} confidence
          </span>
        </div>
        {/* Source-quality flags: what exactly is (un)certain about this event */}
        {event.uncertaintyFlags && event.uncertaintyFlags.length > 0 && (
          <div className="flag-row">
            {event.uncertaintyFlags.map((flag) => {
              const cfg = FLAG_CONFIG[flag];
              return (
                <span key={flag} className={`flag-chip flag-${flag}`} title={cfg.description}>
                  <span>{cfg.symbol}</span>
                  {cfg.label}
                </span>
              );
            })}
          </div>
        )}
      </div>

      <div className="panel-body">
        {/* Meta */}
        <div className="panel-meta">
          <div className="meta-item">
            <span className="meta-label">Year</span>
            <span className="meta-value">{event.dateText ?? event.year}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Period</span>
            <span className="meta-value">{event.period}</span>
          </div>
          <div className="meta-item full">
            <span className="meta-label">Location</span>
            <span className="meta-value">📍 {event.locationName}</span>
          </div>
        </div>

        {/* Summary */}
        <div className="panel-section">
          <div className="panel-section-title">What happened</div>
          <p>{event.summary}</p>
        </div>

        {/* ELI12 */}
        <div className="eli12-box">
          <div className="eli12-label">🧒 Explain like I'm 12</div>
          <p>{event.eli12}</p>
        </div>

        {/* Human drama */}
        {event.humanDrama && (
          <div className="drama-box">
            <div className="drama-label">🎭 The drama</div>
            <p>{event.humanDrama}</p>
          </div>
        )}

        {/* Factions */}
        <div className="panel-section">
          <div className="panel-section-title">Who fought who</div>
          <div className="factions-list">
            {event.factions.map((f, i) => (
              <div key={i}>
                {i > 0 && <div className="faction-vs">vs</div>}
                <div className="faction-item">
                  <span>⚔</span>
                  <span>{f}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why */}
        <div className="panel-section">
          <div className="panel-section-title">Why it happened</div>
          <p>{event.whyItHappened}</p>
        </div>

        {/* Modern translation */}
        {event.modernTranslation && (
          <div className="modern-box">
            <div className="modern-label">📱 If this happened today</div>
            <p>{event.modernTranslation}</p>
          </div>
        )}

        {/* Winner */}
        {event.winner && (
          <div className="winner-box">
            <span>🏆</span>
            <span><strong>Winner:</strong> {event.winner}</span>
          </div>
        )}

        {/* Casualties */}
        {event.casualtyEstimate && (
          <div className="casualty-box">
            <span>☠</span>
            <span><strong>Casualties:</strong> {event.casualtyEstimate}</span>
          </div>
        )}

        {/* Why it matters */}
        <div className="panel-section">
          <div className="panel-section-title">Why it matters</div>
          <p>{event.whyItMatters}</p>
        </div>

        {/* Confidence note */}
        {event.confidenceNote && (
          <div className="confidence-note-box">
            <div className="confidence-note-label">🎯 How sure are we?</div>
            <p>{event.confidenceNote}</p>
          </div>
        )}

        {/* Key people */}
        {event.keyPeople.length > 0 && (
          <div className="panel-section">
            <div className="panel-section-title">Key people</div>
            <div className="key-people">
              {event.keyPeople.map((p) => (
                <span key={p} className="person-chip">👤 {p}</span>
              ))}
            </div>
          </div>
        )}

        {/* Sources */}
        {event.sources.length > 0 && (
          <div className="panel-section">
            <div className="panel-section-title">Sources</div>
            <div className="sources-list">
              {event.sources.map((s, i) => (
                <div key={i} className="source-link">
                  <span>📖</span>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a>
                  ) : (
                    <span className="source-note">{s.title}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Desktop sidebar
export function EventPanel({ event, onClose }: EventPanelProps) {
  return (
    <div className={`event-panel${!event ? ' collapsed' : ''}`}>
      <PanelContent event={event} onClose={onClose} />
    </div>
  );
}

// Mobile bottom drawer
export function MobileDrawer({ event, onClose }: EventPanelProps) {
  return (
    <>
      <div
        className={`mobile-overlay${!event ? ' hidden' : ''}`}
        onClick={onClose}
      />
      <div className={`mobile-drawer${event ? ' open' : ''}`}>
        <div className="drawer-handle" />
        <PanelContent event={event} onClose={onClose} />
      </div>
    </>
  );
}
