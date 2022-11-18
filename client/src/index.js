import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const rootElem = document.getElementById('root');
const root = ReactDOM.createRoot(rootElem);

// Quick fix to remove horizontal scroll
rootElem.style.overflowX = 'hidden';

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
