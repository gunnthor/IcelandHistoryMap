import { RefObject, useEffect, useRef } from 'react';
import { MAX_YEAR, MIN_YEAR, useExplorer } from '../../state/explorer';
import { useI18n } from '../../i18n';
import { useEscape } from '../../state/escape';
import { TypeSeal } from '../icons/Icon';
import { Button } from '../ui';
import { at, useAxis, useRangeLabel } from './model';
import { Strip } from './Strip';
import { Thumb, useBrush } from './useBrush';
import { EraPicker } from './EraPicker';

// ── The expanded timeline (compact docks) ──
// A sheet that rises out of the dock: the year range as a two-thumb slider
// on the same ordinal axis as the scrubber, and every event in order as
// 56px rows. On a phone this is the precise path to an event, and for a
// screen reader it's the plain-list alternative to the map.
export function TimelineSheet({
  open,
  onClose,
  toggleRef,
  showEras,
}: {
  open: boolean;
  onClose: () => void;
  toggleRef: RefObject<HTMLButtonElement>;
  showEras: boolean;
}) {
  const x = useExplorer();
  const { t } = useI18n();
  const axis = useAxis();
  const sheetRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const dismiss = () => {
    onClose();
    toggleRef.current?.focus({ preventScroll: true });
  };
  useEscape(dismiss, open);

  // On open: bring the selected row into the middle of the list and put
  // focus on it (or on the title when nothing is selected).
  // On short screens the whole sheet scrolls instead of the list (CSS), so
  // centre the row in whichever of the two actually scrolls.
  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    const row = list?.querySelector<HTMLElement>('[aria-current="true"]');
    const scroller = list && list.scrollHeight > list.clientHeight + 1 ? list : sheetRef.current;
    if (scroller && row) {
      const s = scroller.getBoundingClientRect();
      const r = row.getBoundingClientRect();
      scroller.scrollTop += r.top - s.top - (s.height - r.height) / 2;
    }
    (row ?? titleRef.current)?.focus({ preventScroll: true });
    // Only on opening.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const count = x.filtersActive ? t.shownOf(x.filtered.length, x.events.length) : t.eventCount(x.events.length);

  return (
    <>
      <div className="tl-scrim" onClick={dismiss} aria-hidden="true" />
      <div className="tl-sheet" id="tl-sheet" ref={sheetRef} role="dialog" aria-labelledby="tl-sheet-title">
        <div className="tl-sheet__head">
          <h2 id="tl-sheet-title" ref={titleRef} tabIndex={-1} className="t-eyebrow tl-sheet__title">
            {t.timeline.listTitle}
          </h2>
          <span className="tl-sheet__count t-num">{count}</span>
        </div>
        {showEras && <EraPicker variant="chips" />}
        <RangeField />
        <div className="tl-sheet__list" ref={listRef}>
          {axis.n === 0 && <p className="tl-empty tl-empty--list">{t.timeline.empty}</p>}
          {axis.bands.map((b) => (
            <section key={b.id} className="tl-group" aria-labelledby={`tl-group-${b.id}`}>
              <h3 id={`tl-group-${b.id}`} className="tl-group__head">
                <span className="t-eyebrow">{b.label}</span>
                <span className="tl-group__years t-num">{b.years}</span>
              </h3>
              <ul>
                {axis.list.slice(b.first, b.last + 1).map((e, k) => {
                  const i = b.first + k;
                  const inRange = axis.inRange(i);
                  return (
                    <li key={e.id}>
                      <button
                        type="button"
                        className="tl-row"
                        data-out={inRange ? undefined : true}
                        aria-current={i === axis.selected ? 'true' : undefined}
                        onClick={() => {
                          x.select(e.id, 'timeline');
                          onClose();
                        }}
                      >
                        <TypeSeal type={e.type} confidence={e.confidence} size={28} />
                        <span className="tl-row__year t-num">{e.year}</span>
                        <span className="tl-row__name">{e.name}</span>
                        {!inRange && <span className="visually-hidden">, {t.timeline.outOfRange}</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

// ── Year range: two 44px thumbs on the ordinal axis ──
// The whole track takes the press and moves whichever thumb is nearer, so
// thumbs that sit close together on a narrow phone stay easy to grab.
function RangeField() {
  const x = useExplorer();
  const { t } = useI18n();
  const axis = useAxis();
  const trackRef = useRef<HTMLDivElement>(null);
  const brush = useBrush(axis, trackRef);
  const label = useRangeLabel();
  const { list, n } = axis;
  if (!n) return null;

  const ranged = !(axis.lo === 0 && axis.hi === n - 1);
  const spanHi = axis.empty ? axis.lo : axis.hi + 1;
  const [r0, r1] = x.state.filters.yearRange;

  const thumb = (which: Thumb) => {
    const i = which === 'start' ? Math.min(axis.lo, n - 1) : Math.max(axis.hi, 0);
    const e = list[i];
    return (
      <div
        role="slider"
        tabIndex={0}
        className={`tl-thumb${brush.dragging === which ? ' is-dragging' : ''}`}
        style={{ left: at(which === 'start' ? axis.lo : spanHi, n) }}
        aria-label={which === 'start' ? t.timeline.startYear : t.timeline.endYear}
        aria-orientation="horizontal"
        aria-valuemin={list[0].year}
        aria-valuemax={list[n - 1].year}
        aria-valuenow={e.year}
        aria-valuetext={t.timeline.valueText(e.year, e.name)}
        onKeyDown={(ev) => brush.onKeyDown(which, ev)}
      />
    );
  };

  return (
    <div className="tl-range" data-ranged={ranged || undefined}>
      <div className="tl-range__head">
        <span className="tl-range__label">{t.timeline.yearsShown}</span>
        <span className="tl-range__value t-num">
          {label ?? t.timeline.range(Math.max(r0, MIN_YEAR), Math.min(r1, MAX_YEAR))}
        </span>
        {ranged && (
          <Button variant="ghost" size="sm" icon="reset" onClick={() => x.selectEra(null)}>
            {t.timeline.resetYears}
          </Button>
        )}
      </div>
      <div className="tl-range__track" ref={trackRef} {...brush.pointerHandlers('auto')}>
        <Strip axis={axis} />
        {!axis.empty && (
          <span className="tl-range__span" aria-hidden="true" style={{ left: at(axis.lo, n), width: at(spanHi - axis.lo, n) }} />
        )}
        {thumb('start')}
        {thumb('end')}
      </div>
    </div>
  );
}
