import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.css';
import Home from './components/home';
import Login from './components/user/login';
import Map from './components/Map';
import NavBar from './components/NavBar'
import CurrentUserProvider from './contexts/CurrentUser'


function App() {


  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path='/map' element={<Map />} />
        </Routes>
      </BrowserRouter>
    </CurrentUserProvider>
  )
};

export default App;