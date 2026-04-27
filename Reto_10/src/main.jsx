import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Se purga el StrictMode para evitar el doble montaje en desarrollo.
// react-d3-graph genera fugas de memoria y colapsa si React 18 lo monta y desmonta concurrentemente.
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);