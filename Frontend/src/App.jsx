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
import CaptainHome from './Pages/CaptainHome';
import CaptainProtectedWrapper from './Pages/CaptainProtectedWrapper';
import CaptainLogout from './Pages/CaptainLogout';

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

        <Route path='/captain-home' element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
        } />

        <Route path='/captain/logout' element={
          <CaptainProtectedWrapper>
          <CaptainLogout />
        </CaptainProtectedWrapper>
        } />

      </Routes>
    </div>
  );
}

export default App;