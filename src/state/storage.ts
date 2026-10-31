// localStorage that never throws: private modes and blocked storage just mean
// a preference lasts one visit instead of crashing the app.
export const storage = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // ignore — see above
    }
  },
};

// Every persisted key in one place, so nothing collides by accident.
// The first two predate the redesign; keep their names so return visitors
// keep their choices.
export const KEYS = {
  lang: 'iceland-map-lang',
  mapStyle: 'battlemap-style',
  welcomed: 'sagas-welcomed',
} as const;
