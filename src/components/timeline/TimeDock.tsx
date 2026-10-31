import { useEffect, useRef, useState } from 'react';
import { PLAY_DWELL_MS, useExplorer } from '../../state/explorer';
import { useIsShort, useLayoutMode, useReportInset } from '../../state/layout';
import { useI18n } from '../../i18n';
import { IconButton } from '../ui';
import { useRangeLabel } from './model';
import { Rail } from './Rail';
import { Scrubber } from './Scrubber';
import { EraPicker } from './EraPicker';
import { TimelineSheet } from './TimelineSheet';
import './timeline.css';

// ════════════════════════════════════════════════════════════════
// The time dock: the instrument for travelling through 1,100 years.
//   wide     — glass dock bottom-left that stops at the folio: play, era
//              tabs and a status line over the rail (ticks, bands, brush).
//   compact  — full-width dock on phones and tablet portrait: play + era
//              chips over a scrubber, and ⌃ for the full list and the year
//              range. Collapses to one row while a story is open.
//   short    — landscape phones (wide, but under 500px tall): one 48px row.
// It reports the bottom inset it covers and sets --dock-h so the story
// sheet can sit on top of it.
// ════════════════════════════════════════════════════════════════

type Variant = 'wide' | 'compact' | 'short';

export function TimeDock() {
  const x = useExplorer();
  const { t } = useI18n();
  const mode = useLayoutMode();
  const short = useIsShort();
  const variant: Variant = mode === 'compact' ? 'compact' : short ? 'short' : 'wide';

  const [dock, setDock] = useState<HTMLDivElement | null>(null);
  useReportInset('dock', 'bottom', dock);
  useDockHeight(dock);

  const [expanded, setExpanded] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (variant === 'wide') setExpanded(false);
  }, [variant]);

  // A story is open: give the sheet room — the scrubber row only.
  const collapsed = variant !== 'wide' && !!x.selected;
  const { playing } = x.state;

  return (
    <section id="timeline" className="tl" aria-label={t.timeline.aria} tabIndex={-1}>
      <div
        ref={setDock}
        className={`tl-dock tl-dock--${variant} ui-glass${collapsed ? ' is-collapsed' : ''}${expanded ? ' is-expanded' : ''}`}
      >
        {playing && x.selected && (
          // Re-keyed per event so the CSS animation restarts with the store's
          // dwell timer; under reduced motion it renders as a static line.
          <span
            key={x.selected.id}
            className="tl-dwell"
            style={{ animationDuration: `${PLAY_DWELL_MS}ms` }}
            aria-hidden="true"
          />
        )}
        <PlayButton />
        {variant === 'wide' ? (
          <>
            <EraPicker variant="tabs" />
            <Status />
            <Rail />
          </>
        ) : (
          <>
            {!collapsed && <EraPicker variant="chips" />}
            <Scrubber />
            <IconButton
              ref={toggleRef}
              className="tl-expand"
              icon={expanded ? 'chevron-down' : 'chevron-up'}
              label={expanded ? t.timeline.collapse : t.timeline.expand}
              aria-expanded={expanded}
              aria-controls={expanded ? 'tl-sheet' : undefined}
              onClick={() => setExpanded((v) => !v)}
            />
          </>
        )}
      </div>
      {variant !== 'wide' && (
        <TimelineSheet
          open={expanded}
          onClose={() => setExpanded(false)}
          toggleRef={toggleRef}
          showEras={collapsed || variant === 'short'}
        />
      )}
    </section>
  );
}

function PlayButton() {
  const x = useExplorer();
  const { t } = useI18n();
  const { playing } = x.state;
  const nothing = !playing && x.playlist.length === 0;
  return (
    <IconButton
      className="tl-play"
      icon={playing ? 'pause' : 'play'}
      iconSize={16}
      // The name stays "Play"; aria-pressed says whether it's running.
      label={t.timeline.play}
      title={playing ? t.timeline.pause : t.timeline.playTitle}
      aria-pressed={playing}
      aria-disabled={nothing || undefined}
      onClick={() => {
        if (!nothing) x.togglePlay();
      }}
    />
  );
}

function Status() {
  const x = useExplorer();
  const { t } = useI18n();
  const range = useRangeLabel();
  // While playing, "Playing 3 of 15" lives in the story's ribbon next to its
  // Pause button; the dock keeps showing what's in play (and its dwell line).
  const count = x.filtersActive ? t.shownOf(x.filtered.length, x.events.length) : t.eventCount(x.events.length);
  return (
    <span className="tl-status t-num">
      {range && <span className="tl-status__range">{range}</span>}
      {range && <span aria-hidden="true"> · </span>}
      {count}
    </span>
  );
}

/** --dock-h: how much of the viewport bottom the dock takes, gap included —
 *  the story sheet stacks on top of it. */
function useDockHeight(el: HTMLElement | null) {
  useEffect(() => {
    if (!el) return;
    const root = document.documentElement.style;
    const measure = () => {
      const px = Math.max(0, Math.round(window.innerHeight - el.getBoundingClientRect().top));
      root.setProperty('--dock-h', `${px}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      root.removeProperty('--dock-h');
    };
  }, [el]);
}
