import { useCallback, useState } from 'react';
import { useI18n } from './i18n';
import { ExplorerProvider } from './state/explorer';
import { useLayoutMode, useIsShort } from './state/layout';
import { MapStage } from './components/map/MapStage';
import { Story } from './components/story/Story';
import { TimeDock } from './components/timeline/TimeDock';
import { Chrome } from './components/chrome/Chrome';

// ── The shell ──
// A full-bleed map with everything else floating over it. Regions are
// siblings in reading order — chrome (header), map (main), story (aside),
// timeline — and each positions itself; they coordinate through the
// explorer store and the layout insets (state/layout.ts), never through
// each other.
export default function App() {
  const { t } = useI18n();
  const mode = useLayoutMode();
  const short = useIsShort();

  // One polite live region for the whole app. Clearing first makes a
  // repeated message ("Link copied" twice) announce again.
  const [message, setMessage] = useState('');
  const announce = useCallback((msg: string) => {
    setMessage('');
    window.requestAnimationFrame(() => setMessage(msg));
  }, []);

  return (
    <ExplorerProvider announcer={announce}>
      <div className="app" data-layout={mode} data-short={short || undefined}>
        <nav className="skip-links" aria-label="Skip links">
          <a className="skip-link" href="#map">
            {t.skip.map}
          </a>
          <a className="skip-link" href="#timeline">
            {t.skip.timeline}
          </a>
        </nav>
        <Chrome />
        <MapStage />
        <Story />
        <TimeDock />
        <div className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
          {message}
        </div>
      </div>
    </ExplorerProvider>
  );
}
