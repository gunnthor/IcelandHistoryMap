import { useI18n } from '../../i18n';
import { useExplorer } from '../../state/explorer';
import { Button, Dialog, IconButton } from '../ui';
import { Icon } from '../icons/Icon';
import { HistoricFlags } from './HistoricFlags';
import { AUTHOR, ISSUES_NEW_URL, REPO_URL } from './links';

/** About: a vellum page — what this is, how sure it is, who made it, and
 *  where to send a correction. */
export function AboutDialog() {
  const { t, lang } = useI18n();
  const x = useExplorer();
  const a = t.chrome.about;
  const open = x.state.dialog === 'about';

  return (
    <Dialog open={open} onClose={x.closeDialog} labelledBy="about-title" tone="vellum" className="chrome-about">
      <div className="ui-dialog__head chrome-about__head">
        <div>
          <p className="t-eyebrow chrome-about__eyebrow">{t.chrome.header.aboutTitle}</p>
          <h2 id="about-title" className="t-display chrome-about__title">
            {t.brand.a} <em>{t.brand.amp}</em> {t.brand.b}
          </h2>
          <p className="t-subtitle chrome-about__tagline">{a.tagline}</p>
        </div>
        <IconButton icon="x" label={t.close} onClick={x.closeDialog} />
      </div>

      <div className="ui-dialog__body chrome-about__body">
        <p className="t-body">
          {a.bodyStart}
          {/* The route word is a way in, not just emphasis. */}
          <button type="button" className="chrome-about__inline" onClick={() => x.openDialog('routes')}>
            {a.bodyRoute}
          </button>
          {a.bodyEnd}
        </p>
        <p className="chrome-about__disclaimer">{a.disclaimer}</p>

        <section className="about-section about-keys" aria-labelledby="about-keys-title">
          <h3 id="about-keys-title" className="t-eyebrow about-section__title">
            {a.shortcutsTitle}
          </h3>
          <dl className="about-keys__list">
            {a.shortcuts.map(([keys, what]) => (
              <div className="about-keys__row" key={keys}>
                <dt>
                  {keys.split(' ').map((k) => (
                    <kbd className="ui-kbd" key={k}>
                      {k}
                    </kbd>
                  ))}
                </dt>
                <dd>{what}</dd>
              </div>
            ))}
          </dl>
        </section>

        <HistoricFlags />

        <section className="about-section about-credit" aria-labelledby="about-credit-title">
          <h3 id="about-credit-title" className="t-eyebrow about-section__title">
            {a.authorLabel}
          </h3>
          <p className="about-credit__name" lang={lang === 'is' ? undefined : 'is'}>
            {AUTHOR}
          </p>
          <p className="about-credit__note">{a.feedback}</p>
          <div className="about-credit__actions">
            <a className="ui-btn ui-btn--primary" href={ISSUES_NEW_URL} target="_blank" rel="noopener noreferrer">
              <Icon name="pencil" size={18} />
              {a.reportBtn}
              <span className="visually-hidden"> {t.opensNewTab}</span>
            </a>
            <a className="ui-btn ui-btn--secondary" href={REPO_URL} target="_blank" rel="noopener noreferrer">
              <Icon name="github" size={18} />
              {a.sourceBtn}
              <span className="visually-hidden"> {t.opensNewTab}</span>
            </a>
          </div>
        </section>

        <div className="chrome-about__foot">
          <Button
            variant="ghost"
            size="sm"
            icon="reset"
            onClick={() => {
              x.setWelcome(true);
              x.closeDialog();
            }}
          >
            {t.chrome.welcome.showAgain}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
