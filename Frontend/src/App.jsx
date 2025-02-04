import React from 'react';
import { Route, Routes } from 'react-router-dom';

import UserLogin from './Pages/UserLogin';
import Home from './Pages/HomePage';
import CaptainLogin from './Pages/CaptainLogin';
import CaptainSignup from './Pages/CaptainSignup';
import UserSignup from './Pages/UserSignup';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
      </Routes>
    </div>
  );
}

export default App;