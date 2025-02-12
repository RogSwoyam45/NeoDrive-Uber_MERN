import React from 'react';
import { Route, Routes } from 'react-router-dom';

import UserLogin from './Pages/UserLogin';
import Start from './Pages/Start';
import CaptainLogin from './Pages/CaptainLogin';
import CaptainSignup from './Pages/CaptainSignup';
import UserSignup from './Pages/UserSignup';
import Home from './Pages/Home';
import UserProtectedWrapper from './Pages/UserProtectedWrapper';
import UserLogout from './Pages/UserLogout';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        } />
        <Route path='/user/logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />
      </Routes>
    </div>
  );
}

export default App;