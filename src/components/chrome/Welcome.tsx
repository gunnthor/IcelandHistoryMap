import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useI18n } from '../../i18n';
import { useExplorer } from '../../state/explorer';
import { useEscape } from '../../state/escape';
import { setInset } from '../../state/layout';
import { TOURS } from '../../data/tours';
import { Button, IconButton } from '../ui';
import { Icon } from '../icons/Icon';

const START_TOUR = 'start-here';

/**
 * The first-visit placard: a small vellum card over the map's lower left,
 * never a modal wall. Its one big button *is* the Start-here route; anything
 * the visitor does — a marker, a route, Play, a search — dismisses it for
 * good (the store handles that).
 */
export function Welcome({ compact, short }: { compact: boolean; short?: boolean }) {
  const { t, events } = useI18n();
  const x = useExplorer();
  const w = t.chrome.welcome;
  // Not on top of an open story (e.g. "show again" while reading).
  const visible = x.state.welcome && !x.selected;
  const dismiss = () => x.setWelcome(false);
  useEscape(dismiss, visible);

  // The card sits over the map: report it, so the camera frames Iceland in
  // what's left (and re-frames once it's dismissed). On phones it covers the
  // bottom; elsewhere it's a placard down the left side, over the West Fjords.
  const [el, setEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (!el) return;
    const edge = compact ? 'bottom' : 'left';
    // Layout boxes, not getBoundingClientRect: the entrance animation moves
    // the card, and the map should frame for where it lands.
    const measure = () => setInset('welcome', edge, compact ? el.offsetHeight + 8 : el.offsetLeft + el.offsetWidth + 8);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      ro.disconnect();
      setInset('welcome', edge, 0);
    };
  }, [el, compact]);

  // The store hides the card on any action (a marker, a route, Play) but
  // only setWelcome(false) remembers it — so make every dismissal stick.
  const wasOpen = useRef(x.state.welcome);
  useEffect(() => {
    if (wasOpen.current && !x.state.welcome) x.setWelcome(false);
    wasOpen.current = x.state.welcome;
  }, [x.state.welcome, x.setWelcome]);

  // If the card goes while it holds focus, don't drop the visitor on
  // <body>: whatever opened next (a story) may claim focus; else the map.
  // (React has already removed the card when this cleanup runs, so track
  // focus-within as it happens rather than asking the DOM afterwards.)
  const hasFocus = useRef(false);
  useLayoutEffect(() => {
    if (!visible) return;
    return () => {
      if (!hasFocus.current) return;
      hasFocus.current = false;
      window.requestAnimationFrame(() => {
        if (document.activeElement && document.activeElement !== document.body) return;
        document.querySelector<HTMLElement>('.leaflet-container')?.focus({ preventScroll: true });
      });
    };
  }, [visible]);

  if (!visible) return null;

  // "Start Here: 7 events that explain Iceland" → "7 events that explain
  // Iceland": the button already says "Start here".
  const tour = TOURS.find((tr) => tr.id === START_TOUR);
  const tourTitle = tour ? (t.tours.content[tour.id]?.title ?? tour.title) : '';
  const subtitle = tourTitle.includes(': ') ? tourTitle.slice(tourTitle.indexOf(': ') + 2) : tourTitle;

  return (
    <section
      ref={setEl}
      onFocus={() => (hasFocus.current = true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hasFocus.current = false;
      }}
      className={`chrome-welcome on-vellum${compact ? ' is-compact' : ''}${short ? ' is-short' : ''}`}
      aria-labelledby="welcome-title"
    >
      <IconButton icon="x" label={w.dismiss} className="chrome-welcome__close" onClick={dismiss} />
      <p className="t-eyebrow chrome-welcome__eyebrow">{t.brand.full}</p>
      <h2 id="welcome-title" className="chrome-welcome__title">
        {w.title}
      </h2>
      <p className="chrome-welcome__body">{w.body(events.length)}</p>

      {tour && (
        <button type="button" className="ui-btn ui-btn--primary chrome-welcome__start" onClick={() => x.startTour(START_TOUR)}>
          <Icon name="route" size={20} />
          <span className="chrome-welcome__start-text">
            <span className="chrome-welcome__start-label">{w.startHere}</span>
            <span className="chrome-welcome__start-sub">{subtitle}</span>
          </span>
          <Icon name="arrow-right" size={18} />
        </button>
      )}

      <div className="chrome-welcome__more">
        <Button variant="secondary" icon="play" onClick={x.play}>
          {compact ? w.playShort : w.play}
        </Button>
        <Button variant="secondary" icon="shuffle" onClick={x.surprise}>
          {w.surprise}
        </Button>
      </div>

      <p className="chrome-welcome__foot">
        <span className="chrome-welcome__or">{w.orClick}</span>
        <Button variant="ghost" size="sm" onClick={dismiss}>
          {w.explore}
        </Button>
      </p>
    </section>
  );
}
