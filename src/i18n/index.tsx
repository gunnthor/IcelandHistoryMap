import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { ConflictEvent } from '../types';
import { UI, UIStrings } from './ui';
import { Lang, localizeEvents, loadIcelandic } from './localize';

export type { Lang } from './localize';
export { loadIcelandic } from './localize';

const LANG_KEY = 'iceland-map-lang';

function storedLang(): Lang | null {
  try {
    const v = localStorage.getItem(LANG_KEY);
    return v === 'en' || v === 'is' ? v : null;
  } catch {
    return null;
  }
}

// Any Icelandic entry in the browser's language list. A stronger personal
// signal than IP: an Icelander abroad keeps Icelandic; IP never downgrades it.
function browserPrefersIcelandic(): boolean {
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  return langs.some((l) => /^is(-|$)/i.test(l ?? ''));
}

// IP-country lookup for the common Icelandic setup: living in Iceland with an
// English-language browser/OS. Two small free providers, first answer wins;
// any failure just means we stay with the browser-language default.
async function fetchCountry(signal: AbortSignal): Promise<string | null> {
  const providers: { url: string; pick: (j: unknown) => unknown }[] = [
    { url: 'https://api.country.is/', pick: (j) => (j as { country?: string })?.country },
    {
      url: 'https://ipwho.is/?fields=country_code',
      pick: (j) => (j as { country_code?: string })?.country_code,
    },
  ];
  for (const p of providers) {
    try {
      const res = await fetch(p.url, { signal });
      if (!res.ok) continue;
      const code = p.pick(await res.json());
      if (typeof code === 'string' && /^[A-Z]{2}$/i.test(code)) return code.toUpperCase();
    } catch {
      if (signal.aborted) return null;
    }
  }
  return null;
}

/** The language to start in, strongest signal first (geo-IP comes later). */
export function initialLang(): Lang {
  return storedLang() ?? (browserPrefersIcelandic() ? 'is' : 'en');
}

interface I18nValue {
  lang: Lang;
  /** Manual choice from the switcher — persisted for return visits. */
  setLang: (l: Lang) => void;
  t: UIStrings;
  /** The event dataset in the active language. */
  events: ConflictEvent[];
}

const I18nContext = createContext<I18nValue | null>(null);

// Language resolution, strongest signal first:
//   1. a stored manual choice   2. Icelandic in the browser's language list
//   3. an Icelandic IP address  4. English
export function I18nProvider({ children }: { children: ReactNode }) {
  // main.tsx has already loaded the Icelandic overlay if this resolves to 'is'.
  const [lang, setLangState] = useState<Lang>(initialLang);
  const userChose = useRef(storedLang() !== null);

  useEffect(() => {
    // Geo-detection only matters when nothing stronger decided already.
    if (userChose.current || browserPrefersIcelandic()) return;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 4000);
    fetchCountry(ctrl.signal)
      .then((code) => {
        if (code === 'IS' && !userChose.current)
          loadIcelandic().then(() => {
            if (!userChose.current) setLangState('is');
          });
      })
      .finally(() => clearTimeout(timer));
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, []);

  const setLang = useCallback((l: Lang) => {
    userChose.current = true;
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {
      // private-mode storage failures just mean the choice lasts one session
    }
    // Icelandic content is a lazy chunk: switch once it's in, so the map
    // never flashes half-translated.
    if (l === 'is') loadIcelandic().then(() => setLangState('is'));
    else setLangState(l);
  }, []);

  // Keep the document language honest for screen readers and search engines.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const events = useMemo(() => localizeEvents(lang), [lang]);
  const value = useMemo(() => ({ lang, setLang, t: UI[lang], events }), [lang, setLang, events]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
