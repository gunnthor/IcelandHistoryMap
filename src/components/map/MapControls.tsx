import { CSSProperties, KeyboardEvent, useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { ClanId } from '../../types';
import { MAP_STYLES, MapStyle, useExplorer } from '../../state/explorer';
import { getInsets, useCoarsePointer } from '../../state/layout';
import { useI18n } from '../../i18n';
import { CLAN_BATTLES } from '../../data/clanBattles';
import { CLAN_CONFIG, CLAN_ORDER } from '../../utils/clanConfig';
import { IconButton, Popover } from '../ui';
import { Icon } from '../icons/Icon';
import { ORTELIUS_URL, TILE_URL } from './Basemap';
import { shieldSvg } from './overlays';

// ── Map controls: Fit, zoom ± (fine pointers only — touch pinches), Layers ──
// A column on the right edge of the *visible* map, so it follows the folio
// and the sheet instead of hiding under them.

// One z5 tile over Iceland makes a real thumbnail of each basemap.
const THUMB_TILE = '5/8/14';
const thumb = (url: string) => url.replace('{z}/{y}/{x}', THUMB_TILE);
const THUMBS: Record<MapStyle, CSSProperties> = {
  satellite: { backgroundImage: `url(${thumb(TILE_URL.imagery)})` },
  summer: { backgroundImage: `url(${thumb(TILE_URL.relief)}), url(${thumb(TILE_URL.physical)})` },
  parchment: { backgroundImage: `url(${thumb(TILE_URL.relief)}), url(${thumb(TILE_URL.physical)})` },
  ortelius: { backgroundImage: `url(${ORTELIUS_URL})` },
};

export function MapControls({
  map,
  tracing,
  onTrace,
  hidden,
}: {
  map: L.Map | null;
  tracing: ClanId | null;
  onTrace: (clan: ClanId | null) => void;
  hidden: boolean;
}) {
  const { t } = useI18n();
  const x = useExplorer();
  const coarse = useCoarsePointer();
  const [open, setOpen] = useState(false);
  const layersRef = useRef<HTMLButtonElement>(null);
  // The panel hangs from a point just under the top bar, left of this
  // column, so it has the visible map's full height and never covers the
  // chrome. Escape "returns focus to the anchor": the anchor hands it on to
  // the Layers button.
  const panelAnchor = useRef<HTMLSpanElement>(null);
  const closedAt = useRef(0);
  const close = () => {
    closedAt.current = performance.now();
    setOpen(false);
  };
  const [zoom, setZoom] = useState({ z: 0, min: 0, max: 20 });

  useEffect(() => {
    if (!map) return;
    const sync = () => setZoom({ z: map.getZoom(), min: map.getMinZoom(), max: map.getMaxZoom() });
    sync();
    map.on('zoomend zoomlevelschange', sync);
    return () => {
      map.off('zoomend zoomlevelschange', sync);
    };
  }, [map]);

  // The compact menu (chrome) can open this panel too.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('sagas:open-layers', onOpen);
    return () => window.removeEventListener('sagas:open-layers', onOpen);
  }, []);

  const atMax = zoom.z >= zoom.max - 0.01;
  const atMin = zoom.z <= zoom.min + 0.01;

  return (
    <>
      <div className="map-controls" data-hidden={hidden || undefined}>
        <IconButton float icon="fit" label={t.map.fit} onClick={x.requestFit} />
        {!coarse && (
          <div className="map-controls__zoom">
            <IconButton
              float
              icon="plus"
              label={t.map.zoomIn}
              aria-disabled={atMax || undefined}
              onClick={() => !atMax && map?.zoomIn(1)}
            />
            <IconButton
              float
              icon="minus"
              label={t.map.zoomOut}
              aria-disabled={atMin || undefined}
              onClick={() => !atMin && map?.zoomOut(1)}
            />
          </div>
        )}
        <IconButton
          ref={layersRef}
          float
          icon="layers"
          label={t.map.layers}
          aria-haspopup="dialog"
          aria-expanded={open}
          // A click on this button while open has already closed the panel
          // (outside pointer-down); don't reopen it.
          onClick={() => !open && performance.now() - closedAt.current > 250 && setOpen(true)}
        />
      </div>
      <span ref={panelAnchor} className="map-layers-anchor" tabIndex={-1} aria-hidden="true" onFocus={() => layersRef.current?.focus()} />
      {tracing && !hidden && (
        <div className="ui-chip ui-chip--token map-tracing" role="status">
          <span className="map-tracing__shield" dangerouslySetInnerHTML={{ __html: shieldSvg(tracing, 16) }} />
          <span>
            {t.map.tracing('')}
            <span lang="is">{CLAN_CONFIG[tracing].label}</span>
          </span>
          <button type="button" className="ui-chip__x" aria-label={t.map.stopTracing} title={t.map.stopTracing} onClick={() => onTrace(null)}>
            <Icon name="x" size={14} />
          </button>
        </div>
      )}
      <Popover
        open={open}
        onClose={close}
        anchorRef={panelAnchor}
        placement="left-start"
        label={t.map.layers}
        width={304}
        className="map-layers"
      >
        <LayersPanel
          tracing={tracing}
          onTrace={(c) => {
            onTrace(c);
            // Close so the trace is visible; the chip says what's on.
            if (c) {
              close();
              layersRef.current?.focus();
            }
          }}
          maxHeight={
            panelAnchor.current
              ? window.innerHeight - getInsets().bottom - panelAnchor.current.getBoundingClientRect().top - 12
              : undefined
          }
        />
      </Popover>
    </>
  );
}

function LayersPanel({
  tracing,
  onTrace,
  maxHeight,
}: {
  tracing: ClanId | null;
  onTrace: (c: ClanId | null) => void;
  maxHeight?: number;
}) {
  const { t } = useI18n();
  const x = useExplorer();
  const style = x.state.mapStyle;
  const cards = useRef<(HTMLButtonElement | null)[]>([]);

  // Radio-group keys: one tab stop, arrows move and choose.
  const onKeys = (e: KeyboardEvent, i: number) => {
    const step =
      e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const n = (i + step + MAP_STYLES.length) % MAP_STYLES.length;
    x.setMapStyle(MAP_STYLES[n]);
    cards.current[n]?.focus();
  };

  return (
    <div className="map-layers__body" style={{ maxHeight }}>
      <p className="t-eyebrow map-layers__title" id="map-style-label">
        {t.map.mapStyle}
      </p>
      <div className="map-layers__styles" role="radiogroup" aria-labelledby="map-style-label">
        {MAP_STYLES.map((s, i) => (
          <button
            key={s}
            ref={(el) => (cards.current[i] = el)}
            type="button"
            role="radio"
            aria-checked={style === s}
            tabIndex={style === s ? 0 : -1}
            className="map-style-card"
            title={t.map.styles[s].hint}
            onClick={() => x.setMapStyle(s)}
            onKeyDown={(e) => onKeys(e, i)}
          >
            <span className={`map-style-card__thumb map-style-card__thumb--${s}`} style={THUMBS[s]} aria-hidden="true" />
            <span className="map-style-card__label">{t.map.styles[s].label}</span>
          </button>
        ))}
      </div>

      <div className="map-layers__sep" />

      <button
        type="button"
        role="switch"
        aria-checked={x.state.showClans}
        className="map-layers__switch"
        onClick={() => x.setShowClans(!x.state.showClans)}
      >
        <span className="map-layers__switch-text">
          <span className="map-layers__switch-label">{t.map.clans}</span>
          <span className="map-layers__hint">{t.map.clansHint}</span>
        </span>
        <span className="ui-switch" aria-hidden="true" />
      </button>

      {x.state.showClans && (
        <div className="map-legend">
          <p className="map-layers__hint map-legend__hint">{t.map.legendHint}</p>
          <ul>
            {CLAN_ORDER.map((id) => {
              const c = CLAN_CONFIG[id];
              const n = (CLAN_BATTLES[id] ?? []).length;
              const active = tracing === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    className="map-legend__row"
                    aria-pressed={active}
                    aria-disabled={n === 0 || undefined}
                    title={n === 0 ? t.map.noBattles(c.label) : active ? t.map.stopTracing : t.map.trace(c.label)}
                    onClick={() => n > 0 && onTrace(active ? null : id)}
                  >
                    <span className="map-legend__shield" dangerouslySetInnerHTML={{ __html: shieldSvg(id, 18) }} />
                    <span className="map-legend__name" lang="is">
                      {c.label}
                    </span>
                    <span className="map-legend__count t-num">{t.map.conflicts(n)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
