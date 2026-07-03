interface SearchBarProps {
  value: string;
  onChange: (q: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-wrap">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder="Search events, people, places…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search events"
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')} title="Clear search">
          ✕
        </button>
      )}
    </div>
  );
}
