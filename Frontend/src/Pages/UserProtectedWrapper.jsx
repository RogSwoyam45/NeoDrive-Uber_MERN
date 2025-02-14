import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        setIsLoading(false);
      }
    })
    .catch((error) => {
      console.error('Error during fetching user:', error);
      navigate('/login'); 
    });



  if(isLoading){
    return (
      <div>
        ....Loading
      </div>
    );
  }

  return (
    <div>
      {children}
    </div>
  );
};

export default UserProtectedWrapper;