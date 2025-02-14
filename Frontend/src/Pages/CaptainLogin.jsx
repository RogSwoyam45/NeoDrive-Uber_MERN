import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [captain, setCaptain] = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const currentCaptain = {
      email: email,
      password: password
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/login`,
        currentCaptain
      );

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        // console.log(data.token);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className='bg-gray-300 p-7 h-screen'>
      <div className='w-24 h-10 mb-4'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
      </div>

      <div className='mt-16 flex items-center justify-center'>
        <form onSubmit={submitHandler} className='bg-emerald-300 p-8 rounded shadow-md flex flex-col justify-between h-96'>
          <div>
            <h3 className='text-xl font-medium mb-2'>What's your email</h3>
            <input
              className='bg-[#eeeeee] rounded flex items-center mb-7 px-4 py-2 border text-lg placeholder:text-base'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder='youremail@example.com'
            />

            <h3 className='text-xl font-medium mb-2'>Enter Password</h3>
            <input
              className='bg-white rounded px-4 py-2 border text-lg placeholder:text-base'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder='password'
            />
          </div>

          <button className='bg-black text-white font-semibold rounded px-4 py-2 text-lg self-center'>Login</button>

          <p className='text-center w-48 ml-6'>Want to join the fleet? <Link to='/captain-signup' className='text-blue-600'>Create New Account</Link></p>
        </form>
      </div>

      <div className='flex justify-center mt-4'>
        <Link to='/login' className='bg-[#9b3939] text-white font-semibold rounded px-4 py-2 text-lg'>
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;