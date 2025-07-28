import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Import UI5 Web Components
import '@ui5/webcomponents/dist/Assets.js';
import '@ui5/webcomponents-fiori/dist/Assets.js';
import '@ui5/webcomponents-icons/dist/Assets.js';

// Set UI5 theme
import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme.js';
setTheme('sap_horizon');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
