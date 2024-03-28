import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.css';
import Home from './components/home';
import Login from './components/user/login';
import Map from './components/Map';

import CurrentUserProvider from './contexts/CurrentUser'


function App() {


  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path='/map' element={<Map />} />
        </Routes>
      </BrowserRouter>
    </CurrentUserProvider>
  )
};

export default App;