import React, { useEffect, useState } from 'react';
import SideBar from './sideBar';
import { useParams } from 'react-router-dom';

export default function ProfileLayout({ children }) {
  return (
    <main className='h-[700px] w-full flex justify-end items-end '>
      <div className='h-[400px] w-full flex m-auto px-[8rem] 2xl:px-[5rem] xl:px-[4rem] lg:px-[3rem] md:px-[1rem]'>
        <SideBar />
        {children}
      </div>
    </main>
  );
}
