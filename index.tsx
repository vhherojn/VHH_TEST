
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Wait for the DOM to be fully loaded before trying to mount the React app.
// This prevents the "Could not find root element" error if the script executes
// before the <div id="root"></div> is available.
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});