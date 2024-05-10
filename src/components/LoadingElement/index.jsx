import React from 'react';

export default function LoadingElement() {
  return (
    <div className='absolute h-full w-full bg-[#040404] z-50 justify-center items-center top-0 left-0'>
      <div className='flex space-x-2 justify-center items-center  h-screen dark:invert'>
        <span className='sr-only'>Loading...</span>
        <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='h-8 w-8 bg-white rounded-full animate-bounce'></div>
      </div>
    </div>
  );
}
