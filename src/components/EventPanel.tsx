import { useState, useRef } from 'react';
import { ConflictEvent, StoryLink } from '../types';
import { EVENT_CONFIG, CONFIDENCE_CONFIG, FLAG_CONFIG } from '../utils/eventConfig';
import { events as allEvents } from '../data/events';

interface EventPanelProps {
  event: ConflictEvent | null;
  onClose: () => void;
  /** Jump to another event (used by the story-context links). */
  onSelectEvent: (event: ConflictEvent) => void;
}

const eventById = (id?: string) => (id ? allEvents.find((e) => e.id === id) : undefined);

// One "Before this / After this" line, with a jump chip when the narrative
// points at an event that exists on the map.
function ContextRow({
  label,
  link,
  onSelectEvent,
}: {
  label: string;
  link: StoryLink;
  onSelectEvent: (event: ConflictEvent) => void;
}) {
  const target = eventById(link.eventId);
  return (
    <div className="context-row">
      <span className="context-dir">{label}</span>
      <p>
        {link.text}
        {target && (
          <>
            {' '}
            <button className="context-link" onClick={() => onSelectEvent(target)}>
              {target.name} · {target.year} →
            </button>
          </>
        )}
      </p>
    </div>
  );
}

function PanelContent({ event, onClose, onSelectEvent }: EventPanelProps) {
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

        {/* Story context: what came before / after, plus related jumps */}
        {(event.before || event.after || (event.relatedIds?.length ?? 0) > 0) && (
          <div className="context-box">
            <div className="context-label">📖 The story around it</div>
            {event.before && (
              <ContextRow label="Before this" link={event.before} onSelectEvent={onSelectEvent} />
            )}
            {event.after && (
              <ContextRow label="After this" link={event.after} onSelectEvent={onSelectEvent} />
            )}
            {(event.relatedIds?.length ?? 0) > 0 && (
              <div className="context-related">
                <span className="context-dir">Related</span>
                <div className="context-related-chips">
                  {event.relatedIds!.map((id) => {
                    const target = eventById(id);
                    if (!target) return null;
                    return (
                      <button
                        key={id}
                        className="context-link"
                        onClick={() => onSelectEvent(target)}
                      >
                        {target.name} · {target.year}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

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
export function EventPanel({ event, onClose, onSelectEvent }: EventPanelProps) {
  return (
    <div className={`event-panel${!event ? ' collapsed' : ''}`}>
      <PanelContent event={event} onClose={onClose} onSelectEvent={onSelectEvent} />
    </div>
  );
}

// Mobile bottom drawer. Supports the pull-down-to-close gesture: a downward
// drag that starts while the card is scrolled to the top follows the finger,
// and releasing past the threshold dismisses the drawer.
export function MobileDrawer({ event, onClose, onSelectEvent }: EventPanelProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ startY: 0, delta: 0, fromTop: false, tracking: false });

  const onTouchStart = (e: React.TouchEvent) => {
    const inner = drawerRef.current?.querySelector('.panel-inner');
    drag.current = {
      startY: e.touches[0].clientY,
      delta: 0,
      // Only turn the gesture into a drag if the card isn't mid-scroll —
      // otherwise a downward swipe should scroll the content up.
      fromTop: !inner || inner.scrollTop <= 0,
      tracking: true,
    };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const el = drawerRef.current;
    if (!el || !drag.current.tracking || !drag.current.fromTop) return;
    const dy = e.touches[0].clientY - drag.current.startY;
    if (dy > 0) {
      drag.current.delta = dy;
      el.style.transition = 'none';
      el.style.transform = `translateY(${dy}px)`;
    }
  };

  const onTouchEnd = () => {
    const el = drawerRef.current;
    if (!el) return;
    el.style.transition = '';
    el.style.transform = '';
    if (drag.current.delta > 90) onClose();
    drag.current = { startY: 0, delta: 0, fromTop: false, tracking: false };
  };

  return (
    <>
      <div
        className={`mobile-overlay${!event ? ' hidden' : ''}`}
        onClick={onClose}
      />
      <div
        className={`mobile-drawer${event ? ' open' : ''}`}
        ref={drawerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="drawer-handle" />
        <PanelContent event={event} onClose={onClose} onSelectEvent={onSelectEvent} />
      </div>
    </>
  );
}
