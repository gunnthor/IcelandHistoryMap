// A small heraldic cartouche of Iceland's historic banners, shown as a
// decorative strip in the About modal. Each flag has a tooltip naming it and
// its era. (Formerly lived on the map itself, but earned no map real estate.)
interface FlagDef {
  id: string;
  name: string;
  years: string;
  svg: JSX.Element;
}

// All drawn on a 25×18 field (the Icelandic flag ratio).
const FLAGS: FlagDef[] = [
  {
    id: 'stockfish',
    name: 'Þorskmerkið — the crowned stockfish (old arms of Iceland)',
    years: 'to 1903',
    svg: (
      <>
        <rect width="25" height="18" fill="#9e2b25" />
        {/* split dried cod, silver, headless */}
        <path
          d="M7 9 q5-3 11 0 q-6 3-11 0 Z"
          fill="#e9e2cf"
          stroke="#cfc6ac"
          strokeWidth="0.4"
        />
        <path d="M18 8.2 l2 0.8 -2 0.8 Z" fill="#e9e2cf" />
        {/* crown */}
        <path d="M9.5 6.2 l1.3 1 1.2-1.4 1.2 1.4 1.3-1 -0.5 2 -4 0 Z" fill="#d9b441" />
      </>
    ),
  },
  {
    id: 'hvitblainn',
    name: 'Hvítbláinn — the white-and-blue',
    years: '1897',
    svg: (
      <>
        <rect width="25" height="18" fill="#1c5fa8" />
        <rect x="7" y="0" width="3" height="18" fill="#f6f3ea" />
        <rect x="0" y="7.5" width="25" height="3" fill="#f6f3ea" />
      </>
    ),
  },
  {
    id: 'falcon',
    name: 'Fálkafáninn — the white falcon',
    years: '1903–1918',
    svg: (
      <>
        <rect width="25" height="18" fill="#15539a" />
        {/* stylised white falcon, wings spread */}
        <path
          d="M12.5 6.6 c-1.4 1-3.2 1.4-5.2 1.2 1.6 0.8 3 1 4.2 0.8 -0.2 1.4-0.1 2.6 1 4 1.1-1.4 1.2-2.6 1-4 1.2 0.2 2.6 0 4.2-0.8 -2 0.2-3.8-0.2-5.2-1.2 Z"
          fill="#f6f3ea"
        />
        <circle cx="12.5" cy="6.3" r="0.8" fill="#f6f3ea" />
      </>
    ),
  },
  {
    id: 'modern',
    name: 'The current flag of Iceland',
    years: 'since 1915',
    svg: (
      <>
        <rect width="25" height="18" fill="#02529c" />
        <rect x="7" y="0" width="4" height="18" fill="#f6f3ea" />
        <rect x="0" y="7" width="25" height="4" fill="#f6f3ea" />
        <rect x="8" y="0" width="2" height="18" fill="#dc1e35" />
        <rect x="0" y="8" width="25" height="2" fill="#dc1e35" />
      </>
    ),
  },
];

export function HistoricFlags() {
  return (
    <div className="about-flags" aria-label="Historic banners of Iceland">
      <div className="about-flags-title">Fánar Íslands</div>
      <div className="about-flags-row">
        {FLAGS.map((f) => (
          <span className="about-flag" key={f.id} title={`${f.name} · ${f.years}`}>
            <svg viewBox="0 0 25 18" role="img" aria-label={`${f.name}, ${f.years}`}>
              {f.svg}
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
