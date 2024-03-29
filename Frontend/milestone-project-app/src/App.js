import React from 'react';
import './scss/style.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';


function App() {
  return (
    <div className="App-container">

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
