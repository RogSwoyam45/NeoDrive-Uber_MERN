import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate()

  const [ user, setUser ] = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
  
    const newuser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newuser);
  
      if (response.status === 201) {
        const data = response.data;
        console.log('Response data:', data); // Log the response data
  
        setUser(data.user);
        localStorage.setItem('token', data.token);

        navigate('/home');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="bg-gray-300 p-7 h-screen flex flex-col justify-center items-center">
      {/* Uber Logo */}
      <div className="w-32 mb-6">
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
      </div>

      {/* Signup Form */}
      <div className="bg-purple-200 w-full max-w-md p-4 rounded shadow-md">
        <form onSubmit={submitHandler} className="bg-purple-300 p-8 rounded shadow-md">
          {/* Name Fields */}
          <h3 className="text-xl font-medium mb-2">What's your name?</h3>
          <div className="flex gap-2">
            <input
              className="bg-gray-200 rounded w-1/2 px-4 py-2 border placeholder:text-base text-lg"
              required
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />
            <input
              className="bg-gray-200 rounded w-1/2 px-4 py-2 border placeholder:text-base text-lg"
              required
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
            />
          </div>

          {/* Email */}
          <h3 className="text-xl font-medium mt-4 mb-2">What's your email?</h3>
          <input
            className="bg-gray-200 rounded w-full px-4 py-2 border text-lg placeholder:text-base"
            required
            type="email"
            placeholder="youremail@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          {/* Password */}
          <h3 className="text-xl font-medium mt-4 mb-2">Enter Password</h3>
          <input
            className="bg-gray-200 rounded w-full px-4 py-2 border text-lg placeholder:text-base"
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          {/* Sign Up Button */}
          <button className="bg-black text-white w-full font-semibold rounded mt-6 px-4 py-2 text-lg">Sign Up</button>

          {/* Already have an account? */}
          <p className="text-center mt-4">
            Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
          </p>
        </form>
      </div>

      {/* Sign in as Captain */}
      <div className="mt-4 w-full max-w-md">
        <p className="text-[15px] leading-right">
          By proceeding, you consent to get calls, Whatsapp or SMS messages, including automated means, from UBER and its affiliates to the number provided.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;