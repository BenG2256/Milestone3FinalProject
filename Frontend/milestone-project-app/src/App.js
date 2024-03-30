import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.css';
import Home from './components/home';
import Login from './components/user/login';
import Map from './components/Map';
import NavBar from './components/NavBar'
import CurrentUserProvider from './contexts/CurrentUser'
import SignUp from './components/user/register'

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'


function App() {
  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </CurrentUserProvider>
  )
};

/*
          <Route path="/login" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path='/map' element={<Map />} />
          <Route exact path='/signup' element={<SignUp />} />
*/
export default App;