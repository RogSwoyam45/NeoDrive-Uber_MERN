import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainProtectWrapper = ({
  children
}) => {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [ captain, setCaptain ] = useContext(CaptainDataContext)
  const [ isLoading, setIsLoading ] = useState(false)




  useEffect(() => {
      if (!token) {
        // console.log('No token found, redirecting to login');

          navigate('/captain-login')
      }
      // console.log('Fetching captain profile with token:', token);

      axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }).then((response) => {
          if (response.status === 200) {
              setCaptain(response.data.captain)
              setIsLoading(false)
          }
      })
          .catch((err) => {
            // console.error('Error during fetching captain:', err);

              localStorage.removeItem('token')
              navigate('/captain-login')
          })
  }, [ token ])

  

  if (isLoading) {
      return (
          <div>Loading...</div>
      )
  }



  return (
      <>
          {children}
      </>
  )
}

export default CaptainProtectWrapper