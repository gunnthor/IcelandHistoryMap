import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { EventType, Confidence, FilterState } from '../types';
import { EVENT_CONFIG, CONFIDENCE_CONFIG, Era } from '../utils/eventConfig';

interface FilterBarProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  resultCount: number;
  active: boolean;
  onReset: () => void;
  eras: Era[];
  activeEraId: string | null;
  onSelectEra: (era: Era) => void;
}

const EVENT_TYPES: EventType[] = [
  'battle',
  'sea_battle',
  'raid',
  'burning',
  'massacre',
  'killing',
  'feud',
  'execution',
  'political',
  'occupation',
  'eruption',
  'plague',
];
const CONFIDENCES: Confidence[] = ['high', 'medium', 'low'];

// Multi-select dropdown for event types. The menu is rendered in a portal to
// <body>: the filter bar both scrolls horizontally (clipping) and creates a
// low z-index stacking context that Leaflet's map panes would otherwise cover.
function TypeDropdown({
  selected,
  onToggle,
  onClear,
}: {
  selected: EventType[];
  onToggle: (t: EventType) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = useCallback(() => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (rect) setPos({ top: rect.bottom + 4, left: rect.left });
    setOpen(true);
  }, []);

  // Close on outside click or Esc; a scroll/resize would detach the fixed
  // menu from its button, so just close then too.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      // The menu lives in a portal, so check both the trigger and the menu.
      if (wrapRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onScroll = (e: Event) => {
      // Scrolling inside the menu itself is fine; anything else detaches
      // the fixed-position menu from its button, so close.
      if (e.target instanceof Node && menuRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onScroll);
    window.addEventListener('scroll', onScroll, true);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [open]);

  return (
    <div className="type-dropdown" ref={wrapRef}>
      <button
        ref={btnRef}
        className={`chip${selected.length > 0 ? ' active' : ''}`}
        onClick={() => (open ? setOpen(false) : openMenu())}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        Type{selected.length > 0 ? ` (${selected.length})` : ''} ▾
      </button>
      {open &&
        createPortal(
          <div
            className="type-dd-menu"
            role="listbox"
            ref={menuRef}
            style={{ top: pos.top, left: pos.left }}
          >
            <button
              className={`type-dd-row type-dd-all${selected.length === 0 ? ' checked' : ''}`}
              onClick={onClear}
              role="option"
              aria-selected={selected.length === 0}
            >
              <span className="type-dd-check">{selected.length === 0 ? '✓' : ''}</span>
              All types
            </button>
            <div className="type-dd-divider" />
            {EVENT_TYPES.map((type) => {
              const cfg = EVENT_CONFIG[type];
              const checked = selected.includes(type);
              return (
                <button
                  key={type}
                  className={`type-dd-row${checked ? ' checked' : ''}`}
                  onClick={() => onToggle(type)}
                  role="option"
                  aria-selected={checked}
                >
                  <span className="type-dd-check">{checked ? '✓' : ''}</span>
                  <span className="chip-symbol">{cfg.symbol}</span>
                  {cfg.label}
                </button>
              );
            })}
          </div>,
          document.body,
        )}
    </div>
  );
}

export function FilterBar({
  filters,
  onChange,
  resultCount,
  active,
  onReset,
  eras,
  activeEraId,
  onSelectEra,
}: FilterBarProps) {
  const toggleType = (type: EventType) =>
    onChange({
      ...filters,
      types: filters.types.includes(type)
        ? filters.types.filter((t) => t !== type)
        : [...filters.types, type],
    });
  const clearTypes = () => onChange({ ...filters, types: [] });
  const setConf = (confidence: Confidence | 'all') => onChange({ ...filters, confidence });

  return (
    <div className="filter-bar">
      {/* Era presets: snap the timeline to a period (Sturlung Age also reveals
          the clan-seats layer). */}
      <span className="filter-label">Era</span>
      {eras.map((era) => (
        <button
          key={era.id}
          className={`chip${activeEraId === era.id ? ' active' : ''}`}
          onClick={() => onSelectEra(era)}
          aria-pressed={activeEraId === era.id}
          title={era.hint}
        >
          {era.showClans && <span className="chip-symbol">⚑</span>}
          {era.label}
        </button>
      ))}

      <div className="filter-divider" />

      {/* Type filter: multi-select dropdown to keep the bar uncluttered */}
      <TypeDropdown selected={filters.types} onToggle={toggleType} onClear={clearTypes} />

      <div className="filter-divider" />

      {/* Confidence filters */}
      <span className="filter-label">Confidence</span>
      <button
        className={`chip${filters.confidence === 'all' ? ' active' : ''}`}
        onClick={() => setConf('all')}
      >
        All
      </button>
      {CONFIDENCES.map((conf) => {
        const cfg = CONFIDENCE_CONFIG[conf];
        return (
          <button
            key={conf}
            className={`chip${filters.confidence === conf ? ' active' : ''}`}
            onClick={() => setConf(conf)}
          >
            {conf === 'high' ? '✓' : conf === 'medium' ? '~' : '?'} {cfg.label}
          </button>
        );
      })}

      <span className="filter-label" style={{ marginLeft: 'auto', whiteSpace: 'nowrap' }}>
        {resultCount} event{resultCount !== 1 ? 's' : ''}
      </span>

      {active && (
        <button className="chip chip-reset" onClick={onReset} title="Clear all filters">
          ↺ Reset
        </button>
      )}
    </div>
  );
}
