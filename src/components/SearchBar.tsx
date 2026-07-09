import { useI18n } from '../i18n';

interface SearchBarProps {
  value: string;
  onChange: (q: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const { t } = useI18n();
  return (
    <div className="search-wrap">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder={t.search.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={t.search.aria}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')} title={t.search.clear}>
          ✕
        </button>
      )}
    </div>
  );
}
