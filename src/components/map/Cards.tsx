import { KeyboardEvent, RefObject, useMemo } from 'react';
import { ConflictEvent, PowerCenter } from '../../types';
import { useExplorer } from '../../state/explorer';
import { useI18n } from '../../i18n';
import { powerCenterTranslations } from '../../data/powerCenters.is';
import { CLAN_CONFIG } from '../../utils/clanConfig';
import { Popover } from '../ui';
import { Icon, TypeSeal } from '../icons/Icon';
import { shieldSvg } from './overlays';

// Popovers anchored to things on the map. Same UI language as the rest of
// the chrome (dark glass, the type seal), not Leaflet's default popups.

/** Put the card above anchors in the lower half of the screen. */
function placementFor(anchor: RefObject<HTMLElement>) {
  const r = anchor.current?.getBoundingClientRect();
  return r && r.top > window.innerHeight / 2 ? 'top-start' : 'bottom-start';
}

// Compass words and the country never name a place on their own.
const NOT_A_PLACE = /^(iceland|ísland\w*|north\w*|south\w*|east\w*|west\w*|norður\w*|suður\w*|austur\w*|vestur\w*|the|marker)$/i;

/** The place name every member's location shares ("Þingvellir",
 *  "Reykjavík"), if there is one. Location strings are free text, so look
 *  for a capitalised word that appears in all of them. */
export function commonPlace(events: ConflictEvent[]): string | null {
  const words = (s: string) =>
    s
      .split(/[\s,()/—–\-:;.]+/)
      .filter((w) => w.length >= 4 && w[0] === w[0].toLocaleUpperCase('is') && w[0] !== w[0].toLocaleLowerCase('is') && !NOT_A_PLACE.test(w));
  if (!events.length) return null;
  const rest = events.slice(1).map((e) => new Set(words(e.locationName)));
  return words(events[0].locationName).find((w) => rest.every((set) => set.has(w))) ?? null;
}

/** Up/Down/Home/End between the buttons of a list. */
function onListKeys(e: KeyboardEvent<HTMLElement>) {
  const items = [...e.currentTarget.querySelectorAll<HTMLElement>('button')];
  const i = items.indexOf(document.activeElement as HTMLElement);
  const next =
    e.key === 'ArrowDown' ? items[Math.min(i + 1, items.length - 1)]
    : e.key === 'ArrowUp' ? items[Math.max(i - 1, 0)]
    : e.key === 'Home' ? items[0]
    : e.key === 'End' ? items[items.length - 1]
    : null;
  if (!next) return;
  e.preventDefault();
  next.focus();
}

export function PlaceCard({
  ids,
  anchorRef,
  onClose,
}: {
  ids: string[] | null;
  anchorRef: RefObject<HTMLElement>;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const x = useExplorer();
  const events = useMemo(
    () => (ids ?? []).map((id) => x.byId.get(id)).filter((e): e is ConflictEvent => !!e),
    [ids, x.byId],
  );
  const place = useMemo(() => commonPlace(events), [events]);
  return (
    <Popover
      open={!!ids && events.length > 0}
      onClose={onClose}
      anchorRef={anchorRef}
      placement={placementFor(anchorRef)}
      label={place ? `${t.map.placeCard}: ${place}` : t.map.placeCard}
      width={320}
      className="map-card"
    >
      <div className="map-card__head map-card__head--place">
        <p className="t-eyebrow map-card__eyebrow">{t.map.placeCard}</p>
        {place && <p className="map-card__title">{place}</p>}
      </div>
      <ul className="map-card__list" data-own-arrows onKeyDown={onListKeys}>
        {events.map((e) => (
          <li key={e.id}>
            <button
              type="button"
              className="map-card__row"
              aria-current={e.id === x.state.selectedId ? 'true' : undefined}
              onClick={() => {
                onClose();
                x.setHovered(null);
                x.select(e.id, 'map');
              }}
              onMouseEnter={() => x.setHovered(e.id)}
              onMouseLeave={() => x.setHovered(null)}
              onFocus={() => x.setHovered(e.id)}
              onBlur={() => x.setHovered(null)}
            >
              <TypeSeal type={e.type} confidence={e.confidence} size={24} />
              <span className="map-card__year t-num">{e.year}</span>
              <span className="map-card__name">{e.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </Popover>
  );
}

export function SeatCard({
  seat,
  anchorRef,
  onClose,
}: {
  seat: PowerCenter | null;
  anchorRef: RefObject<HTMLElement>;
  onClose: () => void;
}) {
  const { t, lang } = useI18n();
  if (!seat) return null;
  const cfg = CLAN_CONFIG[seat.clan];
  const l10n = lang === 'is' ? powerCenterTranslations[seat.id] : undefined;
  const role = l10n?.role ?? seat.role;
  const description = l10n?.description ?? seat.description;
  const sources = (seat.sources ?? []).filter((s) => s.url);
  return (
    <Popover
      open
      onClose={onClose}
      anchorRef={anchorRef}
      placement={placementFor(anchorRef)}
      label={`${seat.name}, ${cfg.label}`}
      width={320}
      className="map-card"
    >
      <div className="map-card__head">
        <span className="map-card__shield" dangerouslySetInnerHTML={{ __html: shieldSvg(seat.clan, 28) }} />
        <div>
          <p className="t-eyebrow map-card__eyebrow">
            <span lang="is">{cfg.label}</span> · {role}
          </p>
          <p className="map-card__title" lang="is">
            {seat.name}
          </p>
        </div>
      </div>
      <p className="map-card__body">{description}</p>
      {seat.approximate && (
        <p className="map-card__note">
          <Icon name="pin" size={14} />
          {t.map.approx}
        </p>
      )}
      {sources.length > 0 && (
        <div className="map-card__sources">
          <p className="t-eyebrow map-card__eyebrow">{t.map.sources}</p>
          <ul>
            {sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.title}
                  <Icon name="external" size={14} />
                  <span className="visually-hidden">{t.opensNewTab}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Popover>
  );
}
