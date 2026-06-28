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
  'execution',
  'occupation',
  'other',
];
const CONFIDENCES: Confidence[] = ['high', 'medium', 'low'];

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
  const setType = (type: EventType | 'all') => onChange({ ...filters, type });
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

      {/* Type filters */}
      <span className="filter-label">Type</span>
      <button
        className={`chip${filters.type === 'all' ? ' active' : ''}`}
        onClick={() => setType('all')}
      >
        All
      </button>
      {EVENT_TYPES.map((type) => {
        const cfg = EVENT_CONFIG[type];
        return (
          <button
            key={type}
            className={`chip${filters.type === type ? ' active' : ''}`}
            onClick={() => setType(type)}
            style={filters.type === type ? {} : { borderColor: cfg.borderColor + '55' }}
          >
            <span className="chip-symbol">{cfg.symbol}</span>
            {cfg.label}
          </button>
        );
      })}

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
