import { ReactNode, useEffect, useMemo } from 'react';
import { useI18n } from '../../i18n';
import { ALL_YEARS, MAX_YEAR, MIN_YEAR, useExplorer } from '../../state/explorer';
import { Icon, TypeSeal } from '../icons/Icon';
import { Button } from '../ui';
import { SearchHit, findHits, splitMatch } from './search';

// The shared results list: a popover under the command bar on wide screens,
// the body of the full-screen search view on phones. The input stays the
// focus owner either way (combobox + aria-activedescendant), so these rows
// are options, never tab stops.

export type SearchOption = { kind: 'hit'; hit: SearchHit } | { kind: 'all' };

export interface SearchModel {
  query: string;
  hits: SearchHit[];
  /** Options in visual (and arrow-key) order. */
  options: SearchOption[];
  /** Matches on the map — what "Show all N" fits to. */
  onMap: number;
  /** Matches hidden only by the year range. */
  outside: number;
}

/** Ranked matches among what the map shows; `limit` caps the hit rows. */
export function useSearchModel(limit: number | null, allFirst: boolean): SearchModel {
  const x = useExplorer();
  const { t } = useI18n();
  const query = x.state.search;
  // `playlist` is the filtered set in chronological order.
  const all = useMemo(
    () => findHits(x.playlist, query, x.matchQuery, (e) => t.types[e.type]),
    [x.playlist, query, x.matchQuery, t],
  );
  return useMemo(() => {
    const hits = limit ? all.slice(0, limit) : all;
    const rows: SearchOption[] = hits.map((hit) => ({ kind: 'hit', hit }));
    const options: SearchOption[] =
      all.length === 0 ? [] : allFirst ? [{ kind: 'all' }, ...rows] : [...rows, { kind: 'all' }];
    return {
      query,
      hits: all,
      options,
      onMap: all.length,
      outside: query.trim() ? x.timeline.length - x.filtered.length : 0,
    };
  }, [all, limit, allFirst, query, x.timeline.length, x.filtered.length]);
}

export const optionId = (prefix: string, o: SearchOption) => `${prefix}-${o.kind === 'all' ? 'all' : o.hit.event.id}`;

function Highlight({ text, query }: { text: string; query: string }) {
  const parts = splitMatch(text, query);
  if (!parts) return <>{text}</>;
  return (
    <>
      {parts[0]}
      <mark className="sr-mark">{parts[1]}</mark>
      {parts[2]}
    </>
  );
}

interface ResultsProps {
  model: SearchModel;
  listId: string;
  idPrefix: string;
  active: number;
  onActive: (i: number) => void;
  onPick: (o: SearchOption) => void;
  variant: 'popover' | 'view';
}

export function SearchResults({ model, listId, idPrefix, active, onActive, onPick, variant }: ResultsProps) {
  const { t, lang } = useI18n();
  const x = useExplorer();
  const s = t.chrome.search;
  const { query, options, hits, onMap, outside } = model;
  const [y0, y1] = x.state.filters.yearRange;
  const narrowed = y0 !== MIN_YEAR || y1 !== MAX_YEAR;

  // Linked hover ends when the list goes away.
  useEffect(() => () => x.setHovered(null), [x.setHovered]);

  // Keep the active row in view while arrowing through a long list.
  useEffect(() => {
    const o = options[active];
    if (o) document.getElementById(optionId(idPrefix, o))?.scrollIntoView({ block: 'nearest' });
  }, [active, options, idPrefix]);

  const otherLang = lang === 'en' ? 'is' : 'en';
  const context = (h: SearchHit): ReactNode => {
    const e = h.event;
    switch (h.field) {
      case 'name':
        return `${t.types[e.type]} · ${e.locationName}`;
      case 'other':
        return (
          <>
            {s.otherName} ·{' '}
            <i lang={otherLang}>
              <Highlight text={h.value} query={query} />
            </i>
          </>
        );
      default:
        return (
          <>
            {s.matched[h.field]} · <Highlight text={h.value} query={query} />
          </>
        );
    }
  };

  // A row press must not blur the input (that would close the popover
  // before the click lands).
  const keepFocus = (e: React.MouseEvent) => e.preventDefault();

  const outsideRow = narrowed && outside > 0 && (
    <div className="sr-outside">
      <span>{s.outsideYears(outside, `${y0}–${y1}`)}</span>
      <Button variant="ghost" size="sm" onMouseDown={keepFocus} onClick={() => x.setYearRange(ALL_YEARS)}>
        {s.allYears}
      </Button>
    </div>
  );

  if (hits.length === 0) {
    return (
      <div className={`sr sr--${variant}`}>
        <div className="sr-empty">
          <p className="sr-empty__title">{s.noResults(query.trim())}</p>
          <p className="sr-empty__hint">{s.noResultsHint}</p>
        </div>
        {outsideRow}
      </div>
    );
  }

  return (
    <div className={`sr sr--${variant}`}>
      <p className="sr-count t-eyebrow" aria-hidden="true">
        {s.results(hits.length)}
      </p>
      <ul id={listId} role="listbox" aria-label={s.resultsLabel} className="sr-list">
        {options.map((o, i) => {
          const id = optionId(idPrefix, o);
          const selected = i === active;
          if (o.kind === 'all') {
            return (
              <li
                key={id}
                id={id}
                role="option"
                aria-selected={selected}
                className="sr-row sr-row--all"
                onMouseDown={keepFocus}
                onMouseMove={() => !selected && onActive(i)}
                onClick={() => onPick(o)}
              >
                <span className="sr-row__icon">
                  <Icon name="fit" size={18} />
                </span>
                <span className="sr-row__main">{s.showAllOnMap(onMap)}</span>
                <Icon name="arrow-right" size={16} className="sr-row__go" />
              </li>
            );
          }
          const e = o.hit.event;
          return (
            <li
              key={id}
              id={id}
              role="option"
              aria-selected={selected}
              className="sr-row"
              onMouseDown={keepFocus}
              onMouseMove={() => !selected && onActive(i)}
              onMouseEnter={() => x.setHovered(e.id)}
              onMouseLeave={() => x.setHovered(null)}
              onClick={() => onPick(o)}
            >
              <TypeSeal type={e.type} confidence={e.confidence} size={variant === 'view' ? 32 : 28} />
              <span className="sr-row__main">
                <span className="sr-row__name">
                  {o.hit.field === 'name' ? <Highlight text={e.name} query={query} /> : e.name}
                </span>
                <span className="sr-row__meta">{context(o.hit)}</span>
              </span>
              <span className="sr-row__year t-num">{e.year}</span>
            </li>
          );
        })}
      </ul>
      {outsideRow}
    </div>
  );
}
