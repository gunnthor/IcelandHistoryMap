import { useI18n } from '../../i18n';

/** "Sagas of Blood & Fire" — the page's one h1. The ampersand (Icelandic:
 *  "og") is set in italic ember, the only ornament the chrome allows itself. */
export function Wordmark({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <h1 className={`chrome-wordmark${className ? ` ${className}` : ''}`}>
      {t.brand.a} <em>{t.brand.amp}</em> {t.brand.b}
    </h1>
  );
}
