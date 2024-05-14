import { Popover } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
export default function Profile() {
  const local = JSON.parse(localStorage.getItem('dataUser'));

  const auth = Cookies.get('token');
  useEffect(() => {}, []);
  const handleLogout = () => {
    localStorage.removeItem('dataUser');
    Cookies.remove('token');
    window.location.reload();
  };

  if (auth === undefined || auth === null) {
    return (
      <Link
        to={'/sign-in'}
        className='h-10 w-16 px-4 my-3 flex justify-center items-center text-center leading-7 rounded-lg bg-black hover:bg-red-600'
      >
        Login
      </Link>
    );
  }
  return (
    <Popover
      aria-labelledby='profile-popover'
      content={
        <div className='w-64 p-3 bg-[#1e1e1e]'>
          <div className='mb-2 h-10  flex items-center justify-between'>
            <img
              className='h-full w-10 rounded-full'
              src='https://flowbite.com/docs/images/people/profile-picture-1.jpg'
              alt='Jese Leos'
            />
          </div>
          <p
            id='profile-popover'
            className='text-base font-semibold leading-none text-white dark:text-white'
          >
            <span>{local && local.name}</span>
          </p>
          <p className='mb-3 text-sm font-normal'>
            @{local && local.name.toLowerCase()}
          </p>
          <p className='mb-4 text-sm'>
            Email :
            <span className='px-2 text-slate-400 '>{local && local.email}</span>
          </p>
          <ul className='flex text-sm  w-full text-center '>
            <li className='w-1/2 hover:scale-110 transition-all duration-500 cursor-pointer'>
              <Link to={'/profile'}>Profile</Link>
            </li>
            <li
              className='w-1/2 hover:scale-110 transition-all duration-500 cursor-pointer'
              onClick={handleLogout}
            >
              <span>Đăng xuất</span>
            </li>
          </ul>
        </div>
      }
    >
      <button className='h-10 w-10 my-3 flex justify-center items-center text-center leading-7 rounded-full bg-red-500 hover:bg-red-600'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6 text-center font-semibold'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
          />
        </svg>
      </button>
    </Popover>
  );
}
