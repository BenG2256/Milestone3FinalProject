import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.css';

import Login from './components/user/login';

import NavBar from './components/NavBar'
import CurrentUserProvider from './contexts/CurrentUser'
import SignUp from './components/user/register'

import HomePage from './pages/HomePage';


function App() {
  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<HomePage />} />
          <Route exact path='/signup' element={<SignUp />} />
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