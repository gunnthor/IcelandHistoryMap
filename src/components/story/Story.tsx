import { useExplorer } from '../../state/explorer';
import { useI18n } from '../../i18n';

// STUB — replaced by the story area (see docs/DESIGN.md §Story).
export function Story() {
  const { t } = useI18n();
  const x = useExplorer();
  if (!x.selected) return null;
  return (
    <aside
      className="on-vellum"
      style={{ position: 'fixed', right: 16, top: 76, bottom: 16, width: 420, padding: 24, zIndex: 30, overflow: 'auto' }}
    >
      <button onClick={x.close}>{t.story.close}</button>
      <h2 className="t-title">{x.selected.name}</h2>
      <p className="t-body">{x.selected.summary}</p>
    </aside>
  );
}
