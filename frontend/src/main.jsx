import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n';
import App from './App.jsx';

createRoot(document.getElementById('chat')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
