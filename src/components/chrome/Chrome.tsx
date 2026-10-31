import { useCallback, useEffect, useRef, useState } from 'react';
import { useI18n } from '../../i18n';
import { useExplorer } from '../../state/explorer';
import { useIsShort, useLayoutMode, useReportInset } from '../../state/layout';
import { Button, IconButton } from '../ui';
import { AboutDialog } from './AboutDialog';
import { FilterTokens, FiltersButton, FiltersPopoverButton, FiltersSheet } from './Filters';
import { LanguageSwitch } from './LanguageSwitch';
import { MenuSheet } from './MenuSheet';
import { MissingToast } from './MissingToast';
import { RoutesDialog } from './RoutesDialog';
import { SearchBox } from './SearchBox';
import { SearchView } from './SearchView';
import { Welcome } from './Welcome';
import { Wordmark } from './Wordmark';
import './chrome.css';

// ════════════════════════════════════════════════════════════════
// The chrome: every command surface around the map. Wide layouts get a
// fixed top row (command bar left, routes/about/language right); phones and
// tablet portrait get a slim top bar whose search, filters and menu open as
// full-screen views and sheets; landscape phones get the same, as one
// floating 44px bar. Each reports how much of the top edge it covers, so the
// map can centre things in what's left.
// ════════════════════════════════════════════════════════════════

export function Chrome() {
  const { t, lang } = useI18n();
  const x = useExplorer();
  const mode = useLayoutMode();
  const short = useIsShort();
  const variant = mode === 'compact' ? 'compact' : short ? 'short' : 'wide';

  // Say the language change out loud, in the new language. Not on load.
  const firstLang = useRef(true);
  useEffect(() => {
    if (firstLang.current) {
      firstLang.current = false;
      return;
    }
    x.announce(t.chrome.header.langChanged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <>
      {variant === 'wide' ? <WideBar /> : <CompactBar floating={variant === 'short'} />}
      <Welcome compact={variant !== 'wide'} short={variant === 'short'} />
      <MissingToast />
      <RoutesDialog />
      <AboutDialog />
    </>
  );
}

/** Desktop and tablet landscape: the fixed top row. */
function WideBar() {
  const { t } = useI18n();
  const x = useExplorer();
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  useReportInset('chrome', 'top', el);

  return (
    <header ref={setEl} className="chrome-wide">
      <div className="chrome-wide__row">
        <div className="chrome-wide__left">
          <div className="chrome-bar ui-glass">
            <Wordmark />
            <span className="chrome-bar__rule" aria-hidden="true" />
            <SearchBox />
            <span className="chrome-bar__rule" aria-hidden="true" />
            <FiltersPopoverButton open={filtersOpen} setOpen={setFiltersOpen} />
          </div>
          <FilterTokens
            className="chrome-wide__tokens"
            onEmpty={() => window.dispatchEvent(new CustomEvent('sagas:focus-search'))}
          />
        </div>
        <nav className="chrome-cluster ui-glass" aria-label={t.chrome.header.menu}>
          <Button
            variant="ghost"
            icon="route"
            className="chrome-cluster__btn chrome-cluster__routes"
            aria-haspopup="dialog"
            onClick={() => x.openDialog('routes')}
          >
            <span className="chrome-label">{t.chrome.header.routes}</span>
          </Button>
          <Button
            variant="ghost"
            icon="info"
            className="chrome-cluster__btn chrome-cluster__about"
            aria-haspopup="dialog"
            title={t.chrome.header.aboutTitle}
            onClick={() => x.openDialog('about')}
          >
            <span className="chrome-label">{t.chrome.header.about}</span>
          </Button>
          <LanguageSwitch />
        </nav>
      </div>
    </header>
  );
}

/** Phones and tablet portrait (and, floating, landscape phones). */
function CompactBar({ floating }: { floating: boolean }) {
  const { t } = useI18n();
  const x = useExplorer();
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchBtn = useRef<HTMLButtonElement>(null);
  useReportInset('chrome', 'top', el);

  // "/" on a tablet keyboard opens the search view.
  useEffect(() => {
    const open = () => setSearchOpen(true);
    window.addEventListener('sagas:focus-search', open);
    return () => window.removeEventListener('sagas:focus-search', open);
  }, []);

  const openFiltersFromMenu = useCallback(() => {
    setMenuOpen(false);
    setFiltersOpen(true);
  }, []);

  return (
    <>
      <header ref={setEl} className={`chrome-compact${floating ? ' is-floating' : ''}`}>
        <div className="chrome-compact__bar ui-glass">
          <Wordmark className="chrome-wordmark--compact" />
          <div className="chrome-compact__actions">
            <IconButton
              ref={searchBtn}
              icon="search"
              label={t.chrome.header.search}
              className="chrome-iconbtn"
              aria-haspopup="dialog"
              onClick={() => setSearchOpen(true)}
            />
            {floating && (
              <FiltersButton
                expanded={filtersOpen}
                iconOnly
                className="chrome-iconbtn"
                onClick={() => setFiltersOpen(true)}
              />
            )}
            <IconButton
              icon="route"
              label={t.chrome.header.routes}
              className="chrome-iconbtn"
              aria-haspopup="dialog"
              onClick={() => x.openDialog('routes')}
            />
            <IconButton
              icon="menu"
              label={t.chrome.header.menu}
              className="chrome-iconbtn"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            />
          </div>
        </div>
        <FilterTokens
          className="chrome-compact__tokens"
          onEmpty={() => searchBtn.current?.focus()}
          lead={
            !floating && (
              <FiltersButton
                expanded={filtersOpen}
                className="ui-chip chrome-compact__filters"
                onClick={() => setFiltersOpen(true)}
              />
            )
          }
        />
      </header>
      <SearchView open={searchOpen} onClose={() => setSearchOpen(false)} onFilters={() => setFiltersOpen(true)} />
      <MenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} onFilters={openFiltersFromMenu} />
      <FiltersSheet open={filtersOpen} onClose={() => setFiltersOpen(false)} />
    </>
  );
}
