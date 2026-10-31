import { useLayoutEffect, useRef, useState } from 'react';
import { MAX_YEAR, MIN_YEAR, useExplorer } from '../../state/explorer';
import { useI18n } from '../../i18n';
import { ERAS } from '../../utils/eventConfig';

// ── Era presets ──
// "All eras" + one button per era. Toggle buttons (aria-pressed), not a
// radio group: the year range can be something no button describes (a
// dragged brush), and picking the active era again returns to all years.
// Wide: a segmented strip with the years set small. Compact: chips that
// scroll sideways and keep the active one in view.
export function EraPicker({ variant }: { variant: 'tabs' | 'chips' }) {
  const x = useExplorer();
  const { t } = useI18n();
  const [r0, r1] = x.state.filters.yearRange;
  const all = r0 <= MIN_YEAR && r1 >= MAX_YEAR;
  const scroller = useRef<HTMLDivElement>(null);
  const [fade, setFade] = useState<'none' | 'start' | 'end' | 'both'>('none');

  const items = [
    {
      id: null as string | null,
      label: t.timeline.allEras,
      title: t.timeline.allErasTitle(MIN_YEAR, MAX_YEAR),
      years: null as string | null,
      pressed: all,
    },
    ...x.eras.map((era) => {
      const nominal = ERAS.find((e) => e.id === era.id)?.range ?? era.range;
      return {
        id: era.id as string | null,
        label: t.eras[era.id]?.label ?? era.id,
        title: t.eras[era.id]?.hint,
        years: nominal[1] > MAX_YEAR ? t.timeline.rangeFrom(nominal[0]) : t.timeline.range(nominal[0], nominal[1]),
        pressed: x.activeEraId === era.id,
      };
    }),
  ];

  // Keep the active chip in view, and fade only the edges that hide more.
  const activeKey = items.find((i) => i.pressed)?.id ?? (all ? 'all' : 'none');
  useLayoutEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const active = el.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (active && el.scrollWidth > el.clientWidth) {
      const target = active.offsetLeft - (el.clientWidth - active.offsetWidth) / 2;
      el.scrollTo({ left: Math.max(0, target), behavior: 'auto' });
    }
    updateFade();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey, variant]);

  const updateFade = () => {
    const el = scroller.current;
    if (!el) return;
    const more = el.scrollWidth - el.clientWidth;
    if (more <= 1) return setFade('none');
    const atStart = el.scrollLeft <= 1;
    const atEnd = el.scrollLeft >= more - 1;
    setFade(atStart ? 'end' : atEnd ? 'start' : 'both');
  };

  useLayoutEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const ro = new ResizeObserver(updateFade);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chips = variant === 'chips';
  return (
    <div
      ref={scroller}
      role="group"
      aria-label={t.timeline.erasAria}
      className={chips ? 'tl-chips' : 'tl-eras ui-seg'}
      data-fade={fade}
      onScroll={updateFade}
    >
      {items.map((item) => (
        <button
          key={item.id ?? 'all'}
          type="button"
          className={chips ? 'ui-chip tl-chip' : 'ui-seg__btn tl-era'}
          aria-pressed={item.pressed}
          title={item.title}
          onClick={() => x.selectEra(item.id)}
        >
          {item.label}
          {!chips && item.years && <span className="tl-era__years">{item.years}</span>}
        </button>
      ))}
    </div>
  );
}
