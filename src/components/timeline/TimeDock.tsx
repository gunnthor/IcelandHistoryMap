import { useExplorer } from '../../state/explorer';
import { useI18n } from '../../i18n';

// STUB — replaced by the timeline area (see docs/DESIGN.md §Timeline).
export function TimeDock() {
  const { t } = useI18n();
  const x = useExplorer();
  return (
    <section
      id="timeline"
      aria-label={t.timeline.aria}
      className="ui-glass"
      style={{ position: 'fixed', left: 16, bottom: 16, padding: 12, zIndex: 20 }}
    >
      <button onClick={x.togglePlay} aria-pressed={x.state.playing}>
        {x.state.playing ? t.timeline.pause : t.timeline.play}
      </button>{' '}
      {t.shownOf(x.filtered.length, x.events.length)}
    </section>
  );
}
