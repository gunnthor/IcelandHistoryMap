import React from 'react';
import ReactDOM from 'react-dom/client';
import 'leaflet/dist/leaflet.css';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/app.css';
import App from './App';
import { I18nProvider, initialLang, loadIcelandic } from './i18n';

// Icelandic event text is a separate chunk; fetch it before the first
// render when the visitor starts in Icelandic, so nothing flashes English.
const ready = initialLang() === 'is' ? loadIcelandic().catch(() => undefined) : Promise.resolve();

ready.then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <I18nProvider>
        <App />
      </I18nProvider>
    </React.StrictMode>,
  );
});
