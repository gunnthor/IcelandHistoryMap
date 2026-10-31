// Iceland's historic banners, set as a small captioned row in the About
// dialog. (They once floated on the map, but earned no map real estate.)
// The fills are the flags' own heraldic colours — artwork, not UI colour.
import { useI18n } from '../../i18n';

const FLAGS: { id: string; svg: JSX.Element }[] = [
  {
    id: 'stockfish',
    svg: (
      <>
        <rect width="25" height="18" fill="#9e2b25" />
        {/* split dried cod, silver, headless */}
        <path d="M7 9 q5-3 11 0 q-6 3-11 0 Z" fill="#e9e2cf" stroke="#cfc6ac" strokeWidth="0.4" />
        <path d="M18 8.2 l2 0.8 -2 0.8 Z" fill="#e9e2cf" />
        {/* crown */}
        <path d="M9.5 6.2 l1.3 1 1.2-1.4 1.2 1.4 1.3-1 -0.5 2 -4 0 Z" fill="#d9b441" />
      </>
    ),
  },
  {
    id: 'hvitblainn',
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
  const { t } = useI18n();
  const strings = t.chrome.about;
  return (
    <section className="about-section about-flags" aria-labelledby="about-flags-title">
      <h3 id="about-flags-title" className="t-eyebrow about-section__title">
        {strings.flagsTitle}
      </h3>
      <ul className="about-flags__row">
        {FLAGS.map((f) => {
          const l = strings.flags[f.id];
          if (!l) return null;
          return (
            <li className="about-flag" key={f.id}>
              <svg className="about-flag__art" viewBox="0 0 25 18" aria-hidden="true" focusable="false">
                {f.svg}
              </svg>
              {/* The flags' own names stay Icelandic in both languages. */}
              <span className="about-flag__name" lang="is">
                {l.name}
              </span>
              <span className="about-flag__gloss">{l.gloss}</span>
              <span className="about-flag__years t-num">{l.years}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
