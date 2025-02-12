import React from 'react';
import { Link } from 'react-router-dom';



const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-top bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)]   h-screen w-full bg-red-400 flex justify-between flex-col p-8'>
        <img 
        className='max-w-20'
        src="https://imgs.search.brave.com/iUu_pSUB4XC14yY3lkGujRPUI3q11j4kizg-ipgasO8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY1OTc2ODc3/OXViZXItbG9nby13/aGl0ZS5wbmc" 
        alt="UBER LOGO" />
        <div className='bg-white py-4 px-4 pb-7'>
          <h2 className='text-2xl font-bold'>Get Started with UBER</h2>
          <Link
          to='/login'
          className='flex justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
        </div>

      </div>
    </div>
  );
}

export default Start;