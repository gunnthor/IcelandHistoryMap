import { forwardRef, useMemo, useRef } from 'react';
import { useI18n } from '../../i18n';
import { ALL_YEARS, MAX_YEAR, MIN_YEAR, useExplorer } from '../../state/explorer';
import { Confidence, EventType } from '../../types';
import { CONFIDENCE_LEVELS, EVENT_TYPES } from '../../utils/eventConfig';
import { normalizeForSearch } from '../../utils/text';
import { Button, Dialog, IconButton, Pips, Popover, SegmentedControl } from '../ui';
import { Icon, TypeSeal } from '../icons/Icon';

// Type, confidence and year filters. One panel, two shells: a popover under
// the Filters button on wide screens, a modal sheet on phones. The year
// *range* is set on the timeline dock — this panel only reads it out and
// offers the reset, so there's never a second, disagreeing year control.

/** How many filter groups are narrowed (the badge on the Filters button).
 *  Search is left out: it's visible in its own field. */
export function useFilterCount(): number {
  const { filters } = useExplorer().state;
  return (
    filters.types.length +
    (filters.confidence !== 'all' ? 1 : 0) +
    (filters.yearRange[0] !== MIN_YEAR || filters.yearRange[1] !== MAX_YEAR ? 1 : 0)
  );
}

export function FiltersPanel({ variant, onDone }: { variant: 'popover' | 'sheet'; onDone?: () => void }) {
  const { t, events } = useI18n();
  const x = useExplorer();
  const f = t.chrome.filters;
  const { types, confidence, yearRange } = x.state.filters;
  const search = x.state.search;
  const allYears = yearRange[0] === MIN_YEAR && yearRange[1] === MAX_YEAR;

  // Per-type counts under every *other* active filter, so each row says what
  // ticking it would add.
  const counts = useMemo(() => {
    const q = search.trim() ? normalizeForSearch(search.trim()) : '';
    const c = Object.fromEntries(EVENT_TYPES.map((ty) => [ty, 0])) as Record<EventType, number>;
    for (const e of events) {
      if (confidence !== 'all' && e.confidence !== confidence) continue;
      if (e.year < yearRange[0] || e.year > yearRange[1]) continue;
      if (q && !x.matchQuery(e, q)) continue;
      c[e.type]++;
    }
    return c;
  }, [events, confidence, yearRange, search, x.matchQuery]);

  const era = x.activeEraId ? t.eras[x.activeEraId]?.label : null;

  return (
    <div className={`flt flt--${variant}`}>
      <fieldset className="flt-section">
        <legend className="t-eyebrow flt-section__title">{f.type}</legend>
        <label className="flt-check flt-check--all">
          <input
            type="checkbox"
            className="flt-check__input"
            checked={types.length === 0}
            onChange={() => types.length && x.setTypes([])}
          />
          <span className="flt-check__box" aria-hidden="true">
            <Icon name="check" size={14} />
          </span>
          <span className="flt-check__label">{f.allTypes}</span>
          <span className="flt-check__count t-num">{Object.values(counts).reduce((a, b) => a + b, 0)}</span>
        </label>
        <div className="flt-types">
          {EVENT_TYPES.map((ty) => (
            <label className="flt-check" key={ty} data-empty={counts[ty] === 0 || undefined}>
              <input
                type="checkbox"
                className="flt-check__input"
                checked={types.includes(ty)}
                onChange={() => x.toggleType(ty)}
              />
              <span className="flt-check__box" aria-hidden="true">
                <Icon name="check" size={14} />
              </span>
              <TypeSeal type={ty} size={22} />
              <span className="flt-check__label">{t.types[ty]}</span>
              <span className="flt-check__count t-num">{counts[ty]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flt-section" role="group" aria-labelledby="flt-confidence">
        <p id="flt-confidence" className="t-eyebrow flt-section__title">
          {f.confidence}
        </p>
        <SegmentedControl<Confidence | 'all'>
          label={f.confidence}
          value={confidence}
          onChange={x.setConfidence}
          className="flt-confidence"
          options={[
            { value: 'all', label: <span className="flt-confidence__label">{f.any}</span> },
            ...CONFIDENCE_LEVELS.map((c) => ({
              value: c,
              title: t.confidence[c].description,
              label: (
                <>
                  <Pips confidence={c} />
                  <span className="flt-confidence__label">{t.confidence[c].label}</span>
                </>
              ),
            })),
          ]}
        />
      </div>

      <div className="flt-section" role="group" aria-labelledby="flt-years">
        <p id="flt-years" className="t-eyebrow flt-section__title">
          {f.years}
        </p>
        <div className="flt-years">
          <p className="flt-years__value">
            <span className="flt-years__range t-num">
              {yearRange[0]}–{yearRange[1]}
            </span>
            {era && <span className="flt-years__era">{era}</span>}
          </p>
          {!allYears && (
            <Button variant="ghost" size="sm" icon="reset" onClick={() => x.setYearRange(ALL_YEARS)}>
              {f.allYears}
            </Button>
          )}
        </div>
        <p className="flt-years__hint">{f.yearsHint}</p>
      </div>

      <div className="flt-foot">
        <p className="flt-foot__count" aria-live="polite">
          {f.showing(x.filtered.length, events.length)}
        </p>
        <Button
          variant="ghost"
          size="sm"
          aria-disabled={!x.filtersActive}
          onClick={() => x.filtersActive && x.resetFilters()}
        >
          {t.clearAll}
        </Button>
        {variant === 'sheet' && (
          <Button variant="primary" className="flt-foot__done" onClick={onDone}>
            {f.show(x.filtered.length)}
          </Button>
        )}
      </div>
    </div>
  );
}

/** The command-bar Filters button: label + a brass count badge. */
export const FiltersButton = forwardRef<
  HTMLButtonElement,
  { expanded: boolean; onClick: () => void; iconOnly?: boolean; className?: string }
>(function FiltersButton({ expanded, onClick, iconOnly, className }, ref) {
  const { t } = useI18n();
  const n = useFilterCount();
  return (
    <button
      ref={ref}
      type="button"
      className={`chrome-filters-btn${iconOnly ? ' is-icon' : ''}${className ? ` ${className}` : ''}`}
      aria-expanded={expanded}
      aria-haspopup="dialog"
      title={iconOnly ? t.chrome.filters.button : undefined}
      onClick={onClick}
    >
      <Icon name="sliders" size={18} />
      <span className={iconOnly ? 'visually-hidden' : 'chrome-filters-btn__label'}>{t.chrome.filters.button}</span>
      {n > 0 && (
        <>
          <span className="ui-badge chrome-filters-btn__badge" aria-hidden="true">
            {n}
          </span>
          <span className="visually-hidden">, {t.chrome.filters.activeCount(n)}</span>
        </>
      )}
    </button>
  );
});

/** Wide: the Filters button and its popover. */
export function FiltersPopoverButton({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const { t } = useI18n();
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <>
      <FiltersButton ref={ref} expanded={open} onClick={() => setOpen(!open)} />
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorRef={ref}
        placement="bottom-start"
        label={t.chrome.filters.title}
        width={448}
        className="chrome-filters-pop"
      >
        <FiltersPanel variant="popover" />
      </Popover>
    </>
  );
}

/** Compact: the same panel as a modal sheet with a "Show n events" button. */
export function FiltersSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();
  return (
    <Dialog open={open} onClose={onClose} labelledBy="filters-title" tone="dark" className="chrome-sheet chrome-filters-sheet">
      <div className="ui-dialog__head chrome-sheet__head">
        <h2 id="filters-title" className="t-heading">
          {t.chrome.filters.title}
        </h2>
        <IconButton icon="x" label={t.close} onClick={onClose} />
      </div>
      <div className="ui-dialog__body chrome-sheet__body">
        <FiltersPanel variant="sheet" onDone={onClose} />
      </div>
    </Dialog>
  );
}

/**
 * Active filters as removable tokens under the command bar. The whole token
 * is the remove button (a 22px ✕ alone is too small a target on touch);
 * focus moves to the neighbouring token so keyboard users aren't dropped.
 */
export function FilterTokens({
  className,
  onEmpty,
  lead,
}: {
  className?: string;
  /** Where focus goes once the last token is removed. */
  onEmpty?: () => void;
  /** Optional leading control (the compact Filters chip). */
  lead?: React.ReactNode;
}) {
  const { t } = useI18n();
  const x = useExplorer();
  const groupRef = useRef<HTMLDivElement>(null);
  const { types, confidence, yearRange } = x.state.filters;
  const q = x.state.search.trim();
  if (!x.filtersActive) return null;

  const era = x.activeEraId ? t.eras[x.activeEraId]?.label : null;
  const tokens: { key: string; label: string; icon: React.ReactNode; remove: () => void }[] = [
    ...(q
      ? [{ key: 'q', label: `“${q}”`, icon: <Icon name="search" size={14} />, remove: () => x.setSearch('') }]
      : []),
    ...types.map((ty) => ({
      key: ty,
      label: t.types[ty],
      icon: <TypeSeal type={ty} size={18} />,
      remove: () => x.toggleType(ty),
    })),
    ...(confidence !== 'all'
      ? [
          {
            key: 'c',
            label: t.confidence[confidence].label,
            icon: <Pips confidence={confidence} />,
            remove: () => x.setConfidence('all'),
          },
        ]
      : []),
    ...(yearRange[0] !== MIN_YEAR || yearRange[1] !== MAX_YEAR
      ? [
          {
            key: 'y',
            label: era ? `${era} · ${yearRange[0]}–${yearRange[1]}` : `${yearRange[0]}–${yearRange[1]}`,
            icon: null,
            remove: () => x.setYearRange(ALL_YEARS),
          },
        ]
      : []),
  ];

  const removeAt = (i: number, remove: () => void) => {
    remove();
    // After React drops the token, land on whatever now sits in its place.
    window.requestAnimationFrame(() => {
      const btns = groupRef.current?.querySelectorAll<HTMLButtonElement>('.ui-chip--token');
      const next = btns?.[Math.min(i, btns.length - 1)];
      if (next) next.focus();
      else onEmpty?.();
    });
  };

  return (
    <div ref={groupRef} className={`chrome-tokens${className ? ` ${className}` : ''}`} role="group" aria-label={t.chrome.filters.tokensLabel}>
      {lead}
      {tokens.map((tok, i) => (
        <button
          key={tok.key}
          type="button"
          className="ui-chip ui-chip--token chrome-token"
          aria-label={t.chrome.filters.remove(tok.label)}
          onClick={() => removeAt(i, tok.remove)}
        >
          {tok.icon}
          <span className="chrome-token__label">{tok.label}</span>
          <span className="ui-chip__x" aria-hidden="true">
            <Icon name="x" size={14} />
          </span>
        </button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="chrome-tokens__clear"
        onClick={() => {
          x.resetFilters();
          window.requestAnimationFrame(() => onEmpty?.());
        }}
      >
        {t.clearAll}
      </Button>
    </div>
  );
}
