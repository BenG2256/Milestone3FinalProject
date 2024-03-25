import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/style.css';
import App from './App';
import Login from './components/user/login'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<App />
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);
