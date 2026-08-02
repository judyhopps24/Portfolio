import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Dynamically initialize Google Analytics if VITE_GA_ID environment variable is provided
const gaId = import.meta.env.VITE_GA_ID;
if (gaId) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(arguments);
  }
  (window as any).gtag = gtag;
  
  gtag('js', new Date());
  gtag('config', gaId);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

