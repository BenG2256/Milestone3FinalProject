import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/style.css';
import App from './App';
import Login from './components/login'
import Map from './Map';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Map />
  </React.StrictMode>
);

//ReactDOM.render(
// <App />,
//  document.getElementById('root')
//);
