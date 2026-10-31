import { useI18n } from '../../i18n';
import { MAP_STYLES, MapStyle, useExplorer } from '../../state/explorer';
import { Dialog, IconButton, SegmentedControl } from '../ui';
import { Icon } from '../icons/Icon';
import { LanguageSwitch } from './LanguageSwitch';
import { useFilterCount } from './Filters';
import { ISSUES_NEW_URL, REPO_URL } from './links';

/**
 * The compact overflow menu: everything that isn't search or routes —
 * language, filters, map style and the clan layer, About, and the two
 * GitHub links. A bottom sheet on phones.
 */
export function MenuSheet({ open, onClose, onFilters }: { open: boolean; onClose: () => void; onFilters: () => void }) {
  const { t } = useI18n();
  const x = useExplorer();
  const m = t.chrome.menu;
  const n = useFilterCount();

  return (
    <Dialog open={open} onClose={onClose} labelledBy="menu-title" tone="dark" className="chrome-sheet chrome-menu">
      <div className="ui-dialog__head chrome-sheet__head">
        <h2 id="menu-title" className="t-heading">
          {m.title}
        </h2>
        <IconButton icon="x" label={t.close} onClick={onClose} />
      </div>
      <div className="ui-dialog__body chrome-sheet__body chrome-menu__body">
        <div className="chrome-menu__group" role="group" aria-labelledby="menu-lang">
          <p id="menu-lang" className="t-eyebrow chrome-menu__label">
            {m.language}
          </p>
          <LanguageSwitch className="chrome-menu__seg" />
        </div>

        <button type="button" className="chrome-menu__row" onClick={onFilters}>
          <Icon name="sliders" size={20} />
          <span className="chrome-menu__row-label">{t.chrome.filters.button}</span>
          {n > 0 && (
            <>
              <span className="ui-badge" aria-hidden="true">
                {n}
              </span>
              <span className="visually-hidden">, {t.chrome.filters.activeCount(n)}</span>
            </>
          )}
          <Icon name="chevron-right" size={18} className="chrome-menu__chev" />
        </button>

        <div className="chrome-menu__group" role="group" aria-labelledby="menu-map">
          <p id="menu-map" className="t-eyebrow chrome-menu__label">
            {m.mapAndLayers}
          </p>
          <SegmentedControl<MapStyle>
            label={t.map.mapStyle}
            value={x.state.mapStyle}
            onChange={x.setMapStyle}
            className="chrome-menu__seg chrome-menu__styles"
            options={MAP_STYLES.map((st) => ({ value: st, label: t.map.styles[st].label, title: t.map.styles[st].hint }))}
          />
          <button
            type="button"
            role="switch"
            aria-checked={x.state.showClans}
            className="chrome-menu__row chrome-menu__switch"
            onClick={() => x.setShowClans(!x.state.showClans)}
          >
            <Icon name="shield" size={20} />
            <span className="chrome-menu__row-label">
              {t.map.clans}
              <span className="chrome-menu__row-hint">{t.map.clansHint}</span>
            </span>
            <span className="ui-switch" aria-hidden="true" />
          </button>
        </div>

        <div className="chrome-menu__links">
          <button
            type="button"
            className="chrome-menu__row"
            onClick={() => {
              onClose();
              x.openDialog('about');
            }}
          >
            <Icon name="info" size={20} />
            <span className="chrome-menu__row-label">{t.chrome.header.aboutTitle}</span>
            <Icon name="chevron-right" size={18} className="chrome-menu__chev" />
          </button>
          <a className="chrome-menu__row" href={ISSUES_NEW_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="pencil" size={20} />
            <span className="chrome-menu__row-label">
              {m.correction}
              <span className="visually-hidden"> {t.opensNewTab}</span>
            </span>
            <Icon name="external" size={16} className="chrome-menu__chev" />
          </a>
          <a className="chrome-menu__row" href={REPO_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="github" size={20} />
            <span className="chrome-menu__row-label">
              {m.github}
              <span className="visually-hidden"> {t.opensNewTab}</span>
            </span>
            <Icon name="external" size={16} className="chrome-menu__chev" />
          </a>
        </div>
      </div>
    </Dialog>
  );
}
