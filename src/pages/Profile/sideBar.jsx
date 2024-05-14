import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function SideBar() {
  const location = useLocation();
  return (
    <div className='h-full w-1/5'>
      <nav className='w-full h-full overflow-y-scroll '>
        <ul className='space-y-3 w-full flex flex-col px-2'>
          <Link
            to={'/profile/'}
            className={`  hover:bg-red-600 font-semibold active:bg-red-700 mx-4 px-2 py-2 rounded-lg ${
              location.pathname === `/profile` ? 'bg-red-600' : ''
            }`}
          >
            Thông tin cá nhân
          </Link>
          <Link
            className={`hover:bg-red-600 font-semibold active:bg-red-700 mx-4 px-2 py-2 rounded-lg ${
              location.pathname === `/profile` ? 'bg-red-600' : ''
            }`}
          >
            Phim đã xem
          </Link>
          <Link
            to={'/profile/list'}
            className={`hover:bg-red-600 font-semibold active:bg-red-700 mx-4 px-2 py-2 rounded-lg ${
              location.pathname === `/profile/list` ? 'bg-red-600' : ''
            }`}
          >
            List movie
          </Link>
        </ul>
      </nav>
    </div>
  );
}
