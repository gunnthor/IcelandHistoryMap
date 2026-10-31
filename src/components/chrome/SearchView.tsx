import { useEffect, useId, useRef, useState } from 'react';
import { useI18n } from '../../i18n';
import { useExplorer } from '../../state/explorer';
import { useEscape } from '../../state/escape';
import { Dialog, IconButton } from '../ui';
import { Icon } from '../icons/Icon';
import { FiltersButton } from './Filters';
import { SearchOption, SearchResults, optionId, useSearchModel } from './SearchResults';

/**
 * Phones: search takes the whole screen — back arrow, a 16px input (no iOS
 * zoom) and full-width result rows. "Show all on the map" sits first so the
 * keyboard can't hide it. An empty field offers a few example searches.
 */
export function SearchView({ open, onClose, onFilters }: { open: boolean; onClose: () => void; onFilters: () => void }) {
  const { t } = useI18n();
  const x = useExplorer();
  const s = t.chrome.search;
  const uid = useId().replace(/:/g, '');
  const listId = `${uid}-results`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(-1);
  const model = useSearchModel(null, true);
  const query = x.state.search;
  const hasText = query.trim() !== '';

  useEffect(() => setActive(-1), [query]);

  // Focus the field once the dialog is showing. A parent effect runs after
  // <Dialog>'s showModal; for a tap it still runs inside the gesture, which
  // lets mobile browsers raise the keyboard.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Escape clears the text before it closes the view (the dialog's own layer).
  useEscape(() => {
    x.setSearch('');
    inputRef.current?.focus();
  }, open && hasText);

  const pick = (o: SearchOption | undefined) => {
    if (!o) return;
    if (o.kind === 'all') x.requestFit();
    else x.select(o.hit.event.id, 'search');
    inputRef.current?.blur();
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const n = model.options.length;
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && n) {
      e.preventDefault();
      setActive((i) => (i < 0 ? (e.key === 'ArrowDown' ? 0 : n - 1) : (i + (e.key === 'ArrowDown' ? 1 : -1) + n) % n));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      // The keyboard's Search key: open the highlighted row, else show the
      // matches on the map.
      if (active >= 0) pick(model.options[active]);
      else if (model.hits.length) pick({ kind: 'all' });
    }
  };

  const activeOption = active >= 0 ? model.options[active] : undefined;

  return (
    <Dialog open={open} onClose={onClose} labelledBy={`${uid}-title`} tone="dark" className="chrome-searchview">
      <h2 id={`${uid}-title`} className="visually-hidden">
        {t.chrome.header.search}
      </h2>
      <form role="search" className="chrome-searchview__head" onSubmit={(e) => e.preventDefault()}>
        <IconButton icon="arrow-left" label={s.close} onClick={onClose} className="chrome-iconbtn" />
        <div className="chrome-search__field chrome-searchview__field">
          <Icon name="search" size={18} className="chrome-search__icon" />
          <input
            ref={inputRef}
            type="search"
            className="chrome-search__input"
            value={query}
            onChange={(e) => x.setSearch(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={s.placeholderShort}
            aria-label={s.aria}
            role="combobox"
            aria-expanded={hasText && model.options.length > 0}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={activeOption ? optionId(uid, activeOption) : undefined}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="search"
          />
          {query && (
            <button
              type="button"
              className="chrome-search__clear"
              aria-label={s.clear}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                x.setSearch('');
                inputRef.current?.focus();
              }}
            >
              <Icon name="x" size={18} />
            </button>
          )}
        </div>
        <FiltersButton expanded={false} iconOnly onClick={onFilters} className="chrome-iconbtn" />
      </form>

      <div className="chrome-searchview__body">
        {hasText ? (
          <SearchResults
            model={model}
            listId={listId}
            idPrefix={uid}
            active={active}
            onActive={setActive}
            onPick={pick}
            variant="view"
          />
        ) : (
          <div className="chrome-searchview__try">
            <p className="t-eyebrow">{s.tryLabel}</p>
            <div className="chrome-searchview__chips">
              {s.suggestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  className="ui-chip"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    x.setSearch(q);
                    inputRef.current?.focus();
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="chrome-searchview__routes"
              onClick={() => {
                onClose();
                x.openDialog('routes');
              }}
            >
              <Icon name="route" size={20} />
              <span>
                <span className="chrome-searchview__routes-title">{t.tours.pickerTitle}</span>
                <span className="chrome-searchview__routes-sub">{t.tours.pickerTagline}</span>
              </span>
              <Icon name="chevron-right" size={18} />
            </button>
          </div>
        )}
      </div>
    </Dialog>
  );
}
