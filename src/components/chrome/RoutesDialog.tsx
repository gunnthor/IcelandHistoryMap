import { useEffect, useMemo, useRef } from 'react';
import { useI18n } from '../../i18n';
import { useExplorer } from '../../state/explorer';
import { useIsShort, useLayoutMode } from '../../state/layout';
import { TOURS, resolveTourEvents } from '../../data/tours';
import { Button, Dialog, IconButton } from '../ui';
import { Icon } from '../icons/Icon';
import { RouteSketch } from './RouteSketch';

const FEATURED = 'start-here';

/**
 * The story-route picker. One card per curated tour: title, tagline, how
 * long it is, and a sketch of where it goes. The first tour is the on-ramp
 * for newcomers, so it gets the full width.
 */
export function RoutesDialog() {
  const { t, events } = useI18n();
  const x = useExplorer();
  const compact = useLayoutMode() === 'compact';
  const short = useIsShort();
  const open = x.state.dialog === 'routes';
  const listRef = useRef<HTMLUListElement>(null);

  const cards = useMemo(
    () =>
      TOURS.map((tour) => {
        const stops = resolveTourEvents(tour, events);
        const years = stops.map((e) => e.year);
        const content = t.tours.content[tour.id] ?? { title: tour.title, tagline: tour.tagline };
        return {
          id: tour.id,
          stops,
          title: content.title,
          tagline: content.tagline,
          meta: stops.length ? t.tours.meta(stops.length, Math.min(...years), Math.max(...years)) : t.tours.stops(0),
        };
      }).filter((c) => c.stops.length > 0),
    [events, t],
  );

  // Land on the first route rather than the close button: the likeliest next
  // key press is Enter. (Runs after <Dialog>'s showModal, a child effect.)
  useEffect(() => {
    if (open) listRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
  }, [open]);

  return (
    <Dialog open={open} onClose={x.closeDialog} labelledBy="routes-title" tone="dark" className="chrome-routes">
      <div className="ui-dialog__head chrome-routes__head">
        <div>
          <h2 id="routes-title" className="t-display chrome-routes__title">
            {t.tours.pickerTitle}
          </h2>
          <p className="chrome-routes__tagline">{t.tours.pickerTagline}</p>
        </div>
        <IconButton icon="x" label={t.close} onClick={x.closeDialog} />
      </div>
      <div className="ui-dialog__body chrome-routes__body">
        <ul ref={listRef} className="chrome-routes__grid">
          {cards.map((c) => {
            const featured = c.id === FEATURED;
            return (
              <li key={c.id} className={featured ? 'is-featured' : undefined}>
                <button type="button" className="route-card" onClick={() => x.startTour(c.id)}>
                  <span className="route-card__sketch">
                    <RouteSketch stops={c.stops} width={compact ? 88 : featured && !short ? 208 : 132} />
                  </span>
                  <span className="route-card__head">
                    {featured && <span className="t-eyebrow route-card__eyebrow">{t.tours.recommended}</span>}
                    <span className="route-card__title">{c.title}</span>
                  </span>
                  <span className="route-card__tagline">{c.tagline}</span>
                  <span className="route-card__meta t-num">
                    {c.meta}
                    <Icon name="arrow-right" size={16} className="route-card__go" />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="chrome-routes__foot">
          <span>{t.tours.surpriseLead}</span>
          <Button
            variant="ghost"
            size="sm"
            icon="shuffle"
            onClick={() => {
              x.closeDialog();
              x.surprise();
            }}
          >
            {t.chrome.welcome.surprise}
          </Button>
        </p>
      </div>
    </Dialog>
  );
}
