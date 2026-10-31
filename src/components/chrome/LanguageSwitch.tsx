import { useI18n, Lang } from '../../i18n';
import { SegmentedControl } from '../ui';

/** EN | ÍS. Each option carries its own `lang`, and its accessible name is
 *  the language's own name ("Íslenska"), not the two-letter code. */
export function LanguageSwitch({ className }: { className?: string }) {
  const { t, lang, setLang } = useI18n();
  return (
    <SegmentedControl<Lang>
      label={t.lang.groupAria}
      value={lang}
      onChange={setLang}
      className={`chrome-lang${className ? ` ${className}` : ''}`}
      options={[
        {
          value: 'en',
          lang: 'en',
          title: t.lang.en,
          label: (
            <>
              <span aria-hidden="true">{t.lang.shortEn}</span>
              <span className="visually-hidden">{t.lang.en}</span>
            </>
          ),
        },
        {
          value: 'is',
          lang: 'is',
          title: t.lang.is,
          label: (
            <>
              <span aria-hidden="true">{t.lang.shortIs}</span>
              <span className="visually-hidden">{t.lang.is}</span>
            </>
          ),
        },
      ]}
    />
  );
}
