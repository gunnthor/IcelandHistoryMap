import { ReactNode, useContext } from 'react';
import { ConflictEvent, UncertaintyFlag } from '../../types';
import { useExplorer } from '../../state/explorer';
import { PEOPLE, cleanPersonName, followableAt } from '../../state/people';
import { useI18n } from '../../i18n';
import { Button, Pips } from '../ui';
import { FLAG_ICONS, Icon, TypeSeal } from '../icons/Icon';
import { SheetContext, useStory } from './context';
import {
  correctionUrl,
  eventUrl,
  headlineCaveat,
  hostname,
  seeAlso,
  shortDate,
  splitFlags,
  splitParen,
  splitSources,
  yearRange,
} from './format';

// ── The article: one column, read top to bottom ──
// Masthead → lede → at a glance → the story → connections → how sure we
// are → sources. Hierarchy comes from type, space and hairlines, never from
// tinted boxes. Every word below the headings is the data's own.

/** "Name (detail)" with the detail set lighter. */
function Paren({ text }: { text: string }) {
  const [main, detail] = splitParen(text);
  return (
    <>
      {main}
      {detail && <span className="story-paren"> ({detail})</span>}
    </>
  );
}

function Section({ id, title, className, children }: { id: string; title: string; className?: string; children: ReactNode }) {
  return (
    <section className={`story-section${className ? ` ${className}` : ''}`} aria-labelledby={id}>
      <h3 id={id} className="story-h3" tabIndex={-1}>
        {title}
      </h3>
      {children}
    </section>
  );
}

/** A jump to another event: seal, name, short date. Hovering lights the
 *  marker on the map. */
export function JumpButton({ to, className }: { to: ConflictEvent; className?: string }) {
  const x = useExplorer();
  return (
    <button
      type="button"
      className={`story-jump${className ? ` ${className}` : ''}`}
      onClick={() => x.select(to.id, 'story')}
      onPointerEnter={() => x.setHovered(to.id)}
      onPointerLeave={() => x.setHovered(null)}
      onFocus={() => x.setHovered(to.id)}
      onBlur={() => x.setHovered(null)}
    >
      <TypeSeal type={to.type} confidence={to.confidence} size={24} />
      <span className="story-jump__text">
        <span className="story-jump__name">{to.name}</span>
        <span className="story-jump__date t-num">{shortDate(to)}</span>
      </span>
      <Icon name="arrow-right" size={18} className="story-jump__arrow" />
    </button>
  );
}

function Masthead({ e }: { e: ConflictEvent }) {
  const { t, lang } = useI18n();
  const ctl = useStory();
  const sheet = useContext(SheetContext);
  const flags = e.uncertaintyFlags ?? [];
  const range = yearRange(e);
  const caveat = headlineCaveat(e);
  const alt = e.icelandicName && e.icelandicName !== e.name ? e.icelandicName : null;
  const conf = t.confidence[e.confidence];
  return (
    <header className="masthead">
      <div className="masthead__head">
        <div className="masthead__names">
          <h2 id={ctl.titleId} ref={ctl.headingRef} tabIndex={-1} className="masthead__title t-title">
            {e.name}
          </h2>
          {alt && (
            <p className="masthead__alt t-subtitle" lang={lang === 'en' ? 'is' : 'en'}>
              {alt}
            </p>
          )}
        </div>
        {/* The dateline carries the date in words; the big year is the anchor. */}
        <p className="masthead__year" aria-hidden="true">
          <span className="t-year">{range ? range[0] : e.year}</span>
          {range && <span className="masthead__year-to t-num">–{range[1]}</span>}
        </p>
      </div>
      <p className="masthead__dateline">
        <span className="masthead__date">{e.dateText ?? e.year}</span>
        <span className="masthead__dot" aria-hidden="true">
          {' · '}
        </span>
        <span>{e.locationName}</span>
        {flags.includes('location_uncertain') && (
          <span className="masthead__approx">
            <Icon name="pin" size={14} />
            {t.story.locationApprox}
          </span>
        )}
      </p>
      <button
        type="button"
        className="masthead__certainty"
        onClick={() => {
          if (!sheet) return ctl.jumpToTrust();
          sheet.expand(false);
          requestAnimationFrame(() => requestAnimationFrame(ctl.jumpToTrust));
        }}
        aria-label={`${t.story.confidenceAria(conf.label)}${caveat ? `. ${t.flags[caveat].label}` : ''}. ${t.story.howSure}`}
      >
        <Pips confidence={e.confidence} />
        <span className="masthead__conf">{conf.label}</span>
        {caveat && (
          <>
            <span className="masthead__dot" aria-hidden="true">
              ·
            </span>
            <span>{t.flags[caveat].label}</span>
          </>
        )}
        <Icon name="chevron-down" size={16} className="masthead__jump" />
      </button>
    </header>
  );
}

function Lede({ e }: { e: ConflictEvent }) {
  const { t } = useI18n();
  const ctl = useStory();
  const sheet = useContext(SheetContext);
  const legendary = e.uncertaintyFlags?.includes('legendary');
  return (
    <div className="lede">
      {legendary && (
        <p className="lede__caveat">
          <Icon name={FLAG_ICONS.legendary} size={18} />
          <span>
            <strong>{t.flags.legendary.label}</strong>
            <span className="lede__caveat-desc"> — {t.flags.legendary.description}</span>
          </span>
        </p>
      )}
      <p className="lede__text" key={ctl.eli12 ? 'eli12' : 'full'}>
        {ctl.eli12 ? e.eli12 : e.summary}
      </p>
      <Button
        variant="ghost"
        size="sm"
        icon={ctl.eli12 ? 'arrow-left' : 'help'}
        className="lede__eli12"
        onClick={() => ctl.setEli12(!ctl.eli12)}
      >
        {ctl.eli12 ? t.story.eli12Back : t.story.eli12}
      </Button>
      {sheet && (
        <Button variant="secondary" iconEnd="chevron-up" className="story-peek-more" onClick={() => sheet.expand()}>
          {t.story.readFull}
        </Button>
      )}
    </div>
  );
}

function Glance({ e }: { e: ConflictEvent }) {
  const { t } = useI18n();
  const x = useExplorer();
  const following = x.route?.person?.key;
  const f = e.factions;
  return (
    <Section id="story-glance" title={t.story.atAGlance} className="glance">
      <dl className="ledger">
        {f.length > 0 && (
          <div className="ledger__row">
            <dt>{f.length === 1 ? t.story.struggle : t.story.sides}</dt>
            <dd>
              {f.length === 2 ? (
                <>
                  <span className="ledger__side">
                    <Paren text={f[0]} />
                  </span>
                  <span className="ledger__vs">{t.story.vs}</span>
                  <span className="ledger__side">
                    <Paren text={f[1]} />
                  </span>
                </>
              ) : f.length === 1 ? (
                f[0]
              ) : (
                <ul>
                  {f.map((s) => (
                    <li key={s} className="ledger__side">
                      <Paren text={s} />
                    </li>
                  ))}
                </ul>
              )}
            </dd>
          </div>
        )}
        {e.winner && (
          <div className="ledger__row">
            <dt>{t.story.outcome}</dt>
            <dd>{e.winner}</dd>
          </div>
        )}
        {e.casualtyEstimate && (
          <div className="ledger__row">
            <dt>{t.story.humanCost}</dt>
            <dd>{e.casualtyEstimate}</dd>
          </div>
        )}
        {e.keyPeople.length > 0 && (
          <div className="ledger__row">
            <dt>{t.story.keyPeople}</dt>
            <dd>
              <ul className="people">
                {e.keyPeople.map((name, i) => {
                  const person = followableAt(e.id, i);
                  const n = person ? PEOPLE.get(person.key)?.eventIds.length ?? 0 : 0;
                  return (
                    <li key={`${i}-${name}`} className="people__row">
                      <span className="people__name">
                        <Paren text={name} />
                      </span>
                      {person && (
                        <Button
                          variant="secondary"
                          size="sm"
                          icon="route"
                          className="people__follow"
                          aria-label={t.tours.followAria(cleanPersonName(name), n)}
                          aria-pressed={following === person.key}
                          onClick={() => x.followPerson(person.key)}
                        >
                          {t.tours.follow}
                          <span className="people__count t-num" aria-hidden="true">
                            ({n})
                          </span>
                        </Button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </dd>
          </div>
        )}
      </dl>
    </Section>
  );
}

function TheStory({ e }: { e: ConflictEvent }) {
  const { t } = useI18n();
  return (
    <>
      {e.humanDrama && (
        <Section id="story-human" title={t.story.humanStory} className="prose prose--human">
          <p>{e.humanDrama}</p>
        </Section>
      )}
      <Section id="story-why" title={t.story.whyHappened} className="prose">
        <p>{e.whyItHappened}</p>
      </Section>
      <Section id="story-matters" title={t.story.whyMatters} className="prose">
        <p>{e.whyItMatters}</p>
      </Section>
      {e.modernTranslation && (
        <Section id="story-modern" title={t.story.modernTitle} className="prose analogy">
          <p className="analogy__note">{t.story.modernNote}</p>
          <p>{e.modernTranslation}</p>
        </Section>
      )}
    </>
  );
}

function Connections({ e }: { e: ConflictEvent }) {
  const { t } = useI18n();
  const x = useExplorer();
  const before = e.before;
  const after = e.after;
  const beforeTo = before?.eventId ? x.byId.get(before.eventId) : undefined;
  const afterTo = after?.eventId ? x.byId.get(after.eventId) : undefined;
  const also = seeAlso(e, x.byId);
  return (
    <>
      {(before || after) && (
        <Section id="story-chain" title={t.story.chain} className="chain-section">
          <ol className="chain">
            {before && (
              <li className="chain__node">
                <p className="chain__label">{t.story.before}</p>
                <p className="chain__text">{before.text}</p>
                {beforeTo && <JumpButton to={beforeTo} />}
              </li>
            )}
            <li className="chain__node chain__node--this" aria-current="true">
              <p className="chain__label">{t.story.thisEvent}</p>
              <p className="chain__this">
                {e.name}
                <span className="chain__this-date"> · {e.dateText ?? e.year}</span>
              </p>
            </li>
            {after && (
              <li className="chain__node">
                <p className="chain__label">{t.story.after}</p>
                <p className="chain__text">{after.text}</p>
                {afterTo && <JumpButton to={afterTo} />}
              </li>
            )}
          </ol>
        </Section>
      )}
      {also.length > 0 && (
        <Section id="story-also" title={t.story.seeAlso}>
          <ul className="also">
            {also.map((r) => (
              <li key={r.id}>
                <JumpButton to={r} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}

function FlagList({ flags, tone }: { flags: UncertaintyFlag[]; tone: 'established' | 'open' }) {
  const { t } = useI18n();
  return (
    <ul className={`flags flags--${tone}`}>
      {flags.map((f) => (
        <li key={f} className="flags__row">
          <Icon name={FLAG_ICONS[f]} size={20} className="flags__icon" />
          <p>
            <strong>{t.flags[f].label}</strong>
            <span className="flags__desc">{t.flags[f].description}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}

function Trust({ e }: { e: ConflictEvent }) {
  const { t } = useI18n();
  const { established, open } = splitFlags(e);
  const conf = t.confidence[e.confidence];
  return (
    <section id="story-trust" className="story-section trust" aria-labelledby="story-trust-h">
      <h3 id="story-trust-h" className="story-h3" tabIndex={-1}>
        {t.story.howSure}
      </h3>
      <p className="trust__rating">
        <Pips confidence={e.confidence} className="trust__pips" />
        <span>
          <strong>{conf.label}</strong>
          <span className="trust__desc"> — {conf.description}</span>
        </span>
      </p>
      {e.confidenceNote && <p className="trust__note">{e.confidenceNote}</p>}
      {established.length > 0 && (
        <div className="trust__group">
          <h4 className="trust__h4">{t.story.established}</h4>
          <FlagList flags={established} tone="established" />
        </div>
      )}
      {open.length > 0 && (
        <div className="trust__group">
          <h4 className="trust__h4">{t.story.openQuestions}</h4>
          <FlagList flags={open} tone="open" />
        </div>
      )}
    </section>
  );
}

function Sources({ e }: { e: ConflictEvent }) {
  const { t } = useI18n();
  const { cited, notes } = splitSources(e.sources);
  const issue = correctionUrl(t.story.issueTitle(e.name, e.id), t.story.issueBody(eventUrl(e.id)));
  return (
    <>
      {(cited.length > 0 || notes.length > 0) && (
        <Section id="story-sources" title={t.story.sources} className="sources-section">
          {cited.length > 0 && (
            <ol className="sources">
              {cited.map((s, i) => (
                <li key={s.url + i}>
                  <a className="sources__link" href={s.url} target="_blank" rel="noopener noreferrer">
                    <span className="sources__n t-num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="sources__body">
                      <span className="sources__title">{s.title}</span>
                      <span className="sources__host">{hostname(s.url)}</span>
                    </span>
                    <Icon name="external" size={16} className="sources__ext" />
                    <span className="visually-hidden"> {t.opensNewTab}</span>
                  </a>
                </li>
              ))}
            </ol>
          )}
          {notes.length > 0 && (
            <div className="notes">
              <h4 className="trust__h4">{t.story.notes}</h4>
              <ul>
                {notes.map((n, i) => (
                  <li key={i}>{n.title}</li>
                ))}
              </ul>
            </div>
          )}
        </Section>
      )}
      <p className="colophon">
        {t.story.spotError}{' '}
        <a href={issue} target="_blank" rel="noopener noreferrer">
          {t.story.suggestCorrection}
          <Icon name="external" size={14} />
          <span className="visually-hidden"> {t.opensNewTab}</span>
        </a>
      </p>
    </>
  );
}

/** "One of 53 stories…  See the whole map" — only on arrival by shared link. */
export function DeepLinkLine() {
  const x = useExplorer();
  const { t } = useI18n();
  if (!x.state.cameFromLink) return null;
  return (
    <p className="story-deeplink">
      <span>{t.chrome.welcome.linkedIntro(x.events.length)}</span>{' '}
      <button
        type="button"
        className="story-textlink"
        onClick={() => {
          x.close();
          x.requestFit();
        }}
      >
        {t.chrome.welcome.seeWholeMap}
      </button>
    </p>
  );
}

export function StoryArticle() {
  const { event: e } = useStory();
  return (
    <article className="story-article" key={e.id}>
      <Masthead e={e} />
      <Lede e={e} />
      <div className="story-body">
        <Glance e={e} />
        <TheStory e={e} />
        <Connections e={e} />
        <Trust e={e} />
        <Sources e={e} />
      </div>
    </article>
  );
}
