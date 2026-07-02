import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { events } from './src/data/events';

// The deployed origin. Baked into canonical/OG URLs and the sitemap at build
// time — this is the ONE constant to change when the site moves domains.
// (The in-app share button uses window.location.origin, so it needs no change.)
const SITE_URL = 'https://iceland-ruddy.vercel.app';

const ROOT = dirname(fileURLToPath(import.meta.url));

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const truncate = (s: string, n: number) => (s.length <= n ? s : s.slice(0, n - 1).trimEnd() + '…');

// Pre-render one static HTML page per event (dist/event/<id>/index.html) with
// per-event title/description/OG/canonical tags, plus a sitemap.xml. Social
// crawlers don't run JS, so shareable previews need real files — and on
// Vercel the filesystem is checked before rewrites, so these pages serve
// directly while unknown paths still fall back to the SPA (see vercel.json).
function eventPages(): Plugin {
  return {
    name: 'generate-event-pages',
    apply: 'build',
    closeBundle() {
      const dist = resolve(ROOT, 'dist');
      const template = readFileSync(resolve(dist, 'index.html'), 'utf8');

      for (const ev of events) {
        const title = `${ev.name} (${ev.year}) — Sagas of Blood & Fire`;
        const desc = truncate(ev.summary, 160);
        const url = `${SITE_URL}/event/${ev.id}/`;
        const headTags = [
          `<link rel="canonical" href="${url}" />`,
          `<meta property="og:type" content="article" />`,
          `<meta property="og:title" content="${esc(title)}" />`,
          `<meta property="og:description" content="${esc(desc)}" />`,
          `<meta property="og:url" content="${url}" />`,
          `<meta name="twitter:card" content="summary" />`,
        ].join('\n    ');
        const html = template
          .replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`)
          .replace(
            /(<meta name="description" content=")[^"]*(")/,
            (_m, pre, post) => `${pre}${esc(desc)}${post}`,
          )
          .replace('</head>', `    ${headTags}\n  </head>`);

        const dir = resolve(dist, 'event', ev.id);
        mkdirSync(dir, { recursive: true });
        writeFileSync(resolve(dir, 'index.html'), html);
      }

      const urls = [`${SITE_URL}/`, ...events.map((e) => `${SITE_URL}/event/${e.id}/`)];
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls.map((u) => `  <url><loc>${u}</loc></url>`),
        '</urlset>',
        '',
      ].join('\n');
      writeFileSync(resolve(dist, 'sitemap.xml'), sitemap);

      this.info(`generated ${events.length} event pages + sitemap.xml`);
    },
  };
}

export default defineConfig({
  plugins: [react(), eventPages()],
});
