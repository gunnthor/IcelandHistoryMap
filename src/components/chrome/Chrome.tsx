import { useExplorer } from '../../state/explorer';
import { useI18n } from '../../i18n';

// STUB — replaced by the chrome area (see docs/DESIGN.md §Chrome).
export function Chrome() {
  const { t, lang, setLang } = useI18n();
  const x = useExplorer();
  return (
    <header className="ui-glass" style={{ position: 'fixed', left: 16, top: 16, padding: 8, zIndex: 20, display: 'flex', gap: 8 }}>
      <h1 className="t-heading">{t.brand.full}</h1>
      <input value={x.state.search} onChange={(e) => x.setSearch(e.target.value)} aria-label={t.chrome.search.aria} />
      <button onClick={() => setLang(lang === 'en' ? 'is' : 'en')}>{lang === 'en' ? t.lang.shortIs : t.lang.shortEn}</button>
    </header>
  );
}
