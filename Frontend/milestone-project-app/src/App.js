import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.css';
import Home from './components/home';
import Login from './components/user/login';

import CurrentUserProvider, { CurrentUser } from './contexts/CurrentUser'


function App() {


  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={CurrentUser
              ? <Home />
              : <Navigate to="/login" replace />
            }
          />
          <Route path="/login" element={<Login />} />

          <Route exact path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </CurrentUserProvider>
  )
};

export default App;