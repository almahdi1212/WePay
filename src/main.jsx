import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
// داخل src/main.jsx (أو index.jsx) بعد الـ ReactDOM.render / createRoot
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((reg) => {
        console.log('✅ ServiceWorker registered:', reg.scope);
      })
      .catch((err) => {
        console.warn('❌ ServiceWorker registration failed:', err);
      });
  });
}

