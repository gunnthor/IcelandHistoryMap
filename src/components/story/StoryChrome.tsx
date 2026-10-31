import { ReactNode, RefObject, useEffect, useState } from 'react';
import { useExplorer } from '../../state/explorer';
import { useI18n } from '../../i18n';
import { Button, IconButton } from '../ui';
import { Icon, TypeSeal } from '../icons/Icon';
import { useStory } from './context';
import { shortDate } from './format';

// ── The frame around the article: bar, route ribbon, footer ──

/** True once the masthead title has scrolled out of view — the bar then
 *  carries the title as a running head. */
export function useScrolledPastTitle(scrollRef: RefObject<HTMLElement>, headingRef: RefObject<HTMLElement>, key: unknown) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const s = scrollRef.current;
    if (!s) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      const h = headingRef.current;
      if (!h || !s.contains(h)) return setPast(false);
      setPast(h.getBoundingClientRect().bottom < s.getBoundingClientRect().top + 4);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    s.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      s.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [scrollRef, headingRef, key]);
  return past;
}

interface BarProps {
  /** 'strip' = the minimized folio: the bar is all there is, so it holds the h2. */
  variant: 'full' | 'strip' | 'sheet';
  scrolled?: boolean;
  actions: ReactNode;
}

export function StoryBar({ variant, scrolled = false, actions }: BarProps) {
  const { t } = useI18n();
  const ctl = useStory();
  const e = ctl.event;

  if (ctl.finished) {
    const person = ctl.finished.route.kind === 'person';
    return (
      <div className="story-bar on-vellum">
        <span className="story-bar__glyph" aria-hidden="true">
          <Icon name={person ? 'user' : 'route'} size={18} />
        </span>
        <div className="story-bar__label">
          <p className="story-bar__eyebrow t-eyebrow">{person ? t.tours.followingLabel : t.tours.routeLabel}</p>
        </div>
        <div className="story-bar__actions">{actions}</div>
      </div>
    );
  }

  return (
    <div className={`story-bar story-bar--${variant} on-vellum`}>
      <TypeSeal type={e.type} confidence={e.confidence} size={variant === 'sheet' ? 26 : 28} />
      <div className="story-bar__label">
        {variant === 'strip' ? (
          <h2 id={ctl.titleId} ref={ctl.headingRef} tabIndex={-1} className="story-bar__title">
            <span className="story-bar__title-text">{e.name}</span>
            <span className="story-bar__title-year t-num">{shortDate(e)}</span>
          </h2>
        ) : (
          <>
            <p className="story-bar__eyebrow t-eyebrow" data-hidden={scrolled || undefined}>
              {t.types[e.type]}
              <span aria-hidden="true"> · </span>
              {e.period}
            </p>
            <p className="story-bar__running" aria-hidden="true" data-shown={scrolled || undefined}>
              {e.name}
            </p>
          </>
        )}
      </div>
      <div className="story-bar__actions">{actions}</div>
    </div>
  );
}

/** The ‹ › pair: Earlier/Later, or Previous/Next stop (Finish at the end). */
export function StepButtons() {
  const ctl = useStory();
  return (
    <>
      {[ctl.prev, ctl.next].map((s, i) => (
        <IconButton
          key={i ? 'next' : 'prev'}
          icon={s.icon}
          label={s.aria}
          aria-disabled={s.disabled || undefined}
          className="story-step"
          onClick={() => !s.disabled && s.run()}
        />
      ))}
    </>
  );
}

export function ShareButton() {
  const { t } = useI18n();
  const ctl = useStory();
  return (
    <IconButton
      icon={ctl.copied ? 'check' : 'share'}
      label={ctl.copied ? t.story.linkCopied : t.story.shareAria}
      title={ctl.copied ? t.story.linkCopied : t.story.share}
      className={ctl.copied ? 'story-share is-copied' : 'story-share'}
      onClick={ctl.share}
    />
  );
}

/** "Story route · Sturlung Civil War Speedrun   ✕ End route" — or, while
 *  autoplay runs, "Playing 3 of 15   Pause". Dark: it's navigation, not text. */
export function Ribbon({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  const x = useExplorer();
  const { route, routeIndex, state, playlist, selected } = x;

  if (route) {
    const n = route.stops.length;
    const pos = (routeIndex >= 0 ? routeIndex : state.routeCursor) + 1;
    const person = !!route.person;
    const sub =
      routeIndex === 0 && !compact
        ? person
          ? t.tours.personEvents(route.title, n)
          : route.tagline
        : null;
    return (
      <div className="story-ribbon" role="group" aria-label={person ? t.tours.followingLabel : t.tours.routeLabel}>
        <Icon name={person ? 'user' : 'route'} size={18} className="story-ribbon__icon" />
        <div className="story-ribbon__text">
          <p className="story-ribbon__line">
            <span className="t-eyebrow story-ribbon__kind">{person ? t.tours.followingLabel : t.tours.routeLabel}</span>
            <span className="story-ribbon__title">{route.title}</span>
          </p>
          {sub && <p className="story-ribbon__sub">{sub}</p>}
        </div>
        <span className="story-ribbon__count t-num" aria-hidden="true">
          {pos}/{n}
        </span>
        {compact ? (
          <IconButton icon="x" label={t.tours.exit} className="story-ribbon__exit" onClick={x.exitRoute} />
        ) : (
          <Button variant="ghost" size="sm" icon="x" className="story-ribbon__exit" onClick={x.exitRoute}>
            {t.tours.exit}
          </Button>
        )}
        <span className="story-ribbon__progress" style={{ ['--p' as string]: pos / n }} aria-hidden="true" />
      </div>
    );
  }

  if (state.playing && selected) {
    const i = playlist.findIndex((e) => e.id === selected.id);
    return (
      <div className="story-ribbon story-ribbon--play" role="group" aria-label={t.timeline.playing(i + 1, playlist.length)}>
        <Icon name="play" size={16} className="story-ribbon__icon" />
        <p className="story-ribbon__line">
          <span className="story-ribbon__title t-num">{t.timeline.playing(i + 1, playlist.length)}</span>
        </p>
        {compact ? (
          <IconButton icon="pause" label={t.timeline.pause} className="story-ribbon__exit" onClick={x.pause} />
        ) : (
          <Button variant="ghost" size="sm" icon="pause" className="story-ribbon__exit" onClick={x.pause}>
            {t.timeline.pause}
          </Button>
        )}
      </div>
    );
  }
  return null;
}

function EarlierLater() {
  const { t } = useI18n();
  const x = useExplorer();
  const { earlier, later } = x;
  if (!earlier && !later) return null;
  return (
    <div className="story-chrono">
      {earlier ? (
        <button
          type="button"
          className="story-chrono__btn story-chrono__btn--prev"
          aria-label={t.story.earlierAria(earlier.name, shortDate(earlier))}
          onClick={() => x.select(earlier.id, 'story')}
          onPointerEnter={() => x.setHovered(earlier.id)}
          onPointerLeave={() => x.setHovered(null)}
        >
          <Icon name="arrow-left" size={18} />
          <span className="story-chrono__text">
            <span className="story-chrono__dir">{t.story.earlier}</span>
            <span className="story-chrono__name">
              {earlier.name}
              <span className="story-chrono__year t-num"> · {shortDate(earlier)}</span>
            </span>
          </span>
        </button>
      ) : (
        <span />
      )}
      {later ? (
        <button
          type="button"
          className="story-chrono__btn story-chrono__btn--next"
          aria-label={t.story.laterAria(later.name, shortDate(later))}
          onClick={() => x.select(later.id, 'story')}
          onPointerEnter={() => x.setHovered(later.id)}
          onPointerLeave={() => x.setHovered(null)}
        >
          <span className="story-chrono__text">
            <span className="story-chrono__dir">{t.story.later}</span>
            <span className="story-chrono__name">
              {later.name}
              <span className="story-chrono__year t-num"> · {shortDate(later)}</span>
            </span>
          </span>
          <Icon name="arrow-right" size={18} />
        </button>
      ) : (
        <span />
      )}
    </div>
  );
}

function Stepper() {
  const { t } = useI18n();
  const x = useExplorer();
  const ctl = useStory();
  const { route, routeIndex, state } = x;
  if (!route) return null;
  const n = route.stops.length;
  const off = routeIndex < 0;
  const pos = off ? state.routeCursor : routeIndex;
  const { prev, next } = ctl;
  return (
    <div className="stepper">
      <ol className="stepper__track">
        {route.stops.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              className="stepper__seg"
              aria-label={t.story.stopAria(i + 1, s.name)}
              aria-current={i === routeIndex ? 'step' : undefined}
              data-done={i < pos || undefined}
              data-cursor={(off && i === pos) || undefined}
              title={`${i + 1}. ${s.name}`}
              onClick={() => x.goToStop(i)}
              onPointerEnter={() => x.setHovered(s.id)}
              onPointerLeave={() => x.setHovered(null)}
            />
          </li>
        ))}
      </ol>
      <div className="stepper__row">
        <Button
          variant="ghost"
          icon="chevron-left"
          className="stepper__prev"
          aria-label={prev.aria}
          aria-disabled={prev.disabled || undefined}
          onClick={() => !prev.disabled && prev.run()}
        >
          <span className="stepper__label">{prev.label}</span>
        </Button>
        <p className="stepper__pos t-num">
          {off ? (
            <>
              <span className="stepper__off">{t.story.offRoute}</span>
              <button type="button" className="story-textlink" onClick={() => x.goToStop(pos)}>
                {t.story.backToStop(pos + 1)}
              </button>
            </>
          ) : (
            t.tours.stopOf(pos + 1, n)
          )}
        </p>
        <Button
          variant="primary"
          iconEnd={next.icon}
          className="stepper__next"
          aria-label={next.aria}
          onClick={next.run}
        >
          <span className="stepper__label">{next.label}</span>
        </Button>
      </div>
    </div>
  );
}

export function StoryFooter() {
  const x = useExplorer();
  const ctl = useStory();
  if (ctl.finished) return null;
  const body = x.route ? <Stepper /> : <EarlierLater />;
  if (!x.route && !x.earlier && !x.later) return null;
  return <footer className="story-foot on-vellum">{body}</footer>;
}
