import React from 'react';
import { Link } from 'react-router-dom';

export default function SideBar() {
  const local = JSON.parse(localStorage.getItem('dataUser'));
  return (
    <div className='h-full w-1/5'>
      <nav className='w-full h-full overflow-y-scroll '>
        <ul className='space-y-3 w-full flex flex-col px-2'>
          <Link
            to={'/profile/' + local.id}
            className='  hover:bg-red-600 font-semibold active:bg-red-700 mx-4 px-2 py-2 rounded-lg'
          >
            Thông tin cá nhân
          </Link>
          <Link className='hover:bg-red-600 font-semibold active:bg-red-700 mx-4 px-2 py-2 rounded-lg'>
            Phim đã xem
          </Link>
          <Link className='hover:bg-red-600 font-semibold active:bg-red-700 mx-4 px-2 py-2 rounded-lg'>
            List movie
          </Link>
        </ul>
      </nav>
    </div>
  );
}
