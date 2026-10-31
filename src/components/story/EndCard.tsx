import { useExplorer } from '../../state/explorer';
import { PEOPLE, personDisplayName } from '../../state/people';
import { TOURS, resolveTourEvents } from '../../data/tours';
import { useI18n } from '../../i18n';
import { ConflictEvent } from '../../types';
import { Button } from '../ui';
import { Icon, TypeSeal } from '../icons/Icon';
import { useStory } from './context';
import { shortDate, suggestTours } from './format';

// ── End of a route ──
// A route that just stops at its last event is a dead end; this closes it:
// what you walked (tap to revisit), walk it again, and two routes that share
// the fewest stops with this one.
export function EndCard() {
  const { t } = useI18n();
  const x = useExplorer();
  const ctl = useStory();
  const done = ctl.finished;
  if (!done) return null;

  const stops = done.stopIds.map((id) => x.byId.get(id)).filter((e): e is ConflictEvent => !!e);
  const r = done.route;
  const tour = r.kind === 'tour' ? TOURS.find((tt) => tt.id === r.id) : undefined;
  const person = r.kind === 'person' ? PEOPLE.get(r.key) : undefined;
  const title = tour
    ? (t.tours.content[tour.id] ?? { title: tour.title }).title
    : person
      ? personDisplayName(person, x.events)
      : '';
  const years = stops.map((s) => s.year);
  const meta = person
    ? t.tours.personEvents(title, stops.length)
    : t.tours.meta(stops.length, Math.min(...years), Math.max(...years));
  const suggestions = suggestTours(done.stopIds, tour?.id);

  const startOver = () => {
    if (tour) {
      ctl.clearFinished();
      x.startTour(tour.id);
    } else if (person && stops[0]) {
      ctl.restartPerson(person.key, stops[0].id);
    }
  };

  return (
    <div className="endcard">
      <header className="endcard__head">
        <h2 id={ctl.titleId} ref={ctl.headingRef} tabIndex={-1} className="endcard__title">
          <span className="endcard__eyebrow t-eyebrow">{t.tours.endTitle}</span>
          <span className="t-title">{title}</span>
        </h2>
        <p className="endcard__meta">{meta}</p>
      </header>

      <section className="story-section" aria-labelledby="endcard-recap">
        <h3 id="endcard-recap" className="story-h3">
          {t.story.recap}
        </h3>
        <ol className="endcard__stops">
          {stops.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className="story-jump endcard__stop"
                onClick={() => {
                  ctl.clearFinished();
                  x.select(s.id, 'story');
                }}
                onPointerEnter={() => x.setHovered(s.id)}
                onPointerLeave={() => x.setHovered(null)}
              >
                <span className="endcard__n t-num" aria-hidden="true">
                  {i + 1}
                </span>
                <TypeSeal type={s.type} confidence={s.confidence} size={24} />
                <span className="story-jump__text">
                  <span className="story-jump__name">{s.name}</span>
                  <span className="story-jump__date t-num">{shortDate(s)}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <Button variant="secondary" icon="reset" className="endcard__again" onClick={startOver}>
          {t.tours.startOver}
        </Button>
      </section>

      {suggestions.length > 0 && (
        <section className="story-section" aria-labelledby="endcard-next">
          <h3 id="endcard-next" className="story-h3">
            {t.tours.endBody}
          </h3>
          <ul className="endcard__routes">
            {suggestions.map((s) => {
              const content = t.tours.content[s.id] ?? { title: s.title, tagline: s.tagline };
              const evs = resolveTourEvents(s, x.events);
              const ys = evs.map((e) => e.year);
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    className="endcard__route"
                    onClick={() => {
                      ctl.clearFinished();
                      x.startTour(s.id);
                    }}
                  >
                    <span className="endcard__route-title">{content.title}</span>
                    <span className="endcard__route-tag">{content.tagline}</span>
                    <span className="endcard__route-meta t-num">
                      <Icon name="route" size={16} />
                      {t.tours.meta(evs.length, Math.min(...ys), Math.max(...ys))}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
