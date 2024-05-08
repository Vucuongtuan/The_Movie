import React from 'react';

export default function LoadingLayout() {
  return (
    <div className=' h-full w-full  z-40 justify-center items-center top-0 left-0'>
      <div className='flex space-x-2 justify-center items-center  h-screen dark:invert'>
        <span className='sr-only'>Loading...</span>
        <div className='h-5 w-5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='h-5 w-5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='h-5 w-5 bg-white rounded-full animate-bounce'></div>
      </div>
    </div>
  );
}
