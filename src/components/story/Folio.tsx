import { CSSProperties, useEffect, useState } from 'react';
import { useExplorer } from '../../state/explorer';
import { setInset } from '../../state/layout';
import { useI18n } from '../../i18n';
import { IconButton } from '../ui';
import { useStory } from './context';
import { DeepLinkLine, StoryArticle } from './StoryArticle';
import { EndCard } from './EndCard';
import { Ribbon, ShareButton, StepButtons, StoryBar, StoryFooter, useScrolledPastTitle } from './StoryChrome';

// ── Wide shells ──
// The folio: a vellum placard docked right under the top row, minimizable to
// a title strip. `side`: landscape phones, where it becomes a full-height
// side sheet and the top row shrinks to a floating bar.
export function Folio({ side }: { side: boolean }) {
  const { t } = useI18n();
  const x = useExplorer();
  const ctl = useStory();
  const [el, setEl] = useState<HTMLElement | null>(null);
  const [min, setMin] = useState(false);

  // How much of the right edge the folio covers. Measured from the layout
  // box (offsetLeft ignores transforms), not the painted rect: the folio
  // slides in with a transform, and the map should frame for where it lands,
  // not where the animation starts. A minimized strip reports nothing.
  useEffect(() => {
    if (!el || min) {
      setInset('folio', 'right', 0);
      return;
    }
    const measure = () => setInset('folio', 'right', Math.max(0, window.innerWidth - el.offsetLeft));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      setInset('folio', 'right', 0);
    };
  }, [el, min]);

  // Picking something yourself means you want to read it.
  useEffect(() => {
    if (ctl.userOpened || ctl.finished) setMin(false);
  }, [ctl.event.id, ctl.userOpened, ctl.finished]);

  const scrolled = useScrolledPastTitle(ctl.scrollRef, ctl.headingRef, `${ctl.event.id}-${min}-${!!ctl.finished}`);
  const style = { ['--pigment' as string]: `var(--type-${ctl.event.type})` } as CSSProperties;

  const toggle = (
    <IconButton
      key="toggle"
      icon={min ? 'maximize' : 'minimize'}
      label={min ? t.story.expand : t.story.minimize}
      onClick={() => setMin(!min)}
    />
  );
  const closeBtn = <IconButton key="close" icon="x" label={t.story.closeAria} title={t.story.close} onClick={ctl.close} />;

  return (
    <aside
      ref={setEl}
      className={`story story--${side ? 'side' : 'folio'}${min ? ' is-min' : ''}`}
      aria-labelledby={ctl.titleId}
      style={style}
    >
      {!min && <Ribbon />}
      <StoryBar
        variant={min ? 'strip' : 'full'}
        scrolled={scrolled}
        actions={
          min ? (
            <>
              {!ctl.finished && <StepButtons />}
              {toggle}
              {closeBtn}
            </>
          ) : ctl.finished ? (
            closeBtn
          ) : (
            <>
              <IconButton key="map" icon="pin" label={t.story.showOnMap} onClick={x.requestFocus} />
              <ShareButton key="share" />
              {!side && toggle}
              {closeBtn}
            </>
          )
        }
      />
      {!min && (
        <>
          <div className="story-scroll on-vellum" ref={ctl.scrollRef}>
            {ctl.finished ? (
              <EndCard />
            ) : (
              <>
                <DeepLinkLine />
                <StoryArticle />
              </>
            )}
          </div>
          <StoryFooter />
        </>
      )}
    </aside>
  );
}
