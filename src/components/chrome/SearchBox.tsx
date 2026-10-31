import { useEffect, useId, useRef, useState } from 'react';
import { useI18n } from '../../i18n';
import { useExplorer } from '../../state/explorer';
import { useEscape } from '../../state/escape';
import { Popover } from '../ui';
import { Icon } from '../icons/Icon';
import { SearchOption, SearchResults, optionId, useSearchModel } from './SearchResults';

const MAX_ROWS = 8;

/**
 * The command-bar search (wide layouts). Typing filters the map live — the
 * query lives in the store — and opens a results popover under the field.
 * Focus never leaves the input: ↑/↓ move a highlighted option, Enter takes
 * it, and the first option is pre-highlighted so Enter opens the best match.
 */
export function SearchBox() {
  const { t } = useI18n();
  const x = useExplorer();
  const s = t.chrome.search;
  const uid = useId().replace(/:/g, '');
  const listId = `${uid}-results`;
  const inputRef = useRef<HTMLInputElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  // Closed by an outside click while the input kept focus; reopens on typing.
  const [dismissed, setDismissed] = useState(false);
  const [active, setActive] = useState(0);
  const model = useSearchModel(MAX_ROWS, false);
  const query = x.state.search;
  const hasText = query.trim() !== '';
  const open = focused && !dismissed && hasText;

  useEffect(() => {
    setActive(0);
    setDismissed(false);
  }, [query]);

  // "/" anywhere (dispatched by the store's shortcut handler).
  useEffect(() => {
    const focus = () => {
      inputRef.current?.focus();
      inputRef.current?.select();
    };
    window.addEventListener('sagas:focus-search', focus);
    return () => window.removeEventListener('sagas:focus-search', focus);
  }, []);

  const clear = () => {
    x.setSearch('');
    inputRef.current?.focus();
  };

  // Escape clears the text first (which also closes the results). Registered
  // in the same commit as the popover's own Escape layer but after it — a
  // parent's effects run after its children's — so this one wins.
  useEscape(clear, open);
  useEscape(clear, !open && hasText && focused);

  const pick = (o: SearchOption | undefined) => {
    if (!o) return;
    if (o.kind === 'all') x.requestFit();
    else x.select(o.hit.event.id, 'search');
    setDismissed(true);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const n = model.options.length;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!hasText || !n) return;
      e.preventDefault();
      if (dismissed) {
        setDismissed(false);
        return;
      }
      setActive((i) => (i + (e.key === 'ArrowDown' ? 1 : -1) + n) % n);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (open) pick(model.options[active]);
      else if (hasText) setDismissed(false);
    }
  };

  const activeOption = open ? model.options[active] : undefined;
  const width = Math.max(fieldRef.current?.offsetWidth ?? 0, 420);

  return (
    <form
      role="search"
      className="chrome-search"
      onSubmit={(e) => e.preventDefault()}
      onFocus={() => {
        setFocused(true);
        setDismissed(false);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div ref={fieldRef} className="chrome-search__field">
        <Icon name="search" size={18} className="chrome-search__icon" />
        <input
          ref={inputRef}
          type="search"
          className="chrome-search__input"
          value={query}
          onChange={(e) => x.setSearch(e.target.value)}
          onKeyDown={onKeyDown}
          onClick={() => setDismissed(false)}
          placeholder={s.placeholder}
          aria-label={s.aria}
          role="combobox"
          aria-expanded={open && model.options.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeOption ? optionId(uid, activeOption) : undefined}
          aria-keyshortcuts="/"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="search"
        />
        {query ? (
          <button
            type="button"
            className="chrome-search__clear"
            aria-label={s.clear}
            title={s.clear}
            onMouseDown={(e) => e.preventDefault()}
            onClick={clear}
          >
            <Icon name="x" size={16} />
          </button>
        ) : (
          !focused && (
            <kbd className="ui-kbd chrome-search__kbd" title={s.shortcutHint} aria-hidden="true">
              /
            </kbd>
          )
        )}
      </div>
      <Popover
        open={open}
        onClose={() => setDismissed(true)}
        anchorRef={fieldRef}
        placement="bottom-start"
        label={s.resultsLabel}
        autoFocus={false}
        width={width}
        className="chrome-results"
      >
        <SearchResults
          model={model}
          listId={listId}
          idPrefix={uid}
          active={active}
          onActive={setActive}
          onPick={pick}
          variant="popover"
        />
      </Popover>
    </form>
  );
}
