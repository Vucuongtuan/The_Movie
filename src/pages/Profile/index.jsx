import React from 'react';
import ProfileLayout from './layout';

export default function Profile() {
  const local = JSON.parse(localStorage.getItem('dataUser'));

  return (
    <ProfileLayout>
      <section className='flex-grow h-full'>
        <h1 className='text-4xl px-4 pb-4 font-medium'>Thông tin cá nhân</h1>
        <div className='h-auto w-full px-8 space-y-2'>
          <p>
            <label htmlFor='Tên'>Tên : </label>
            <span className='px-2'>{local.name}</span>
          </p>
          <p>
            <label htmlFor='Email'>Email : </label>
            <span className='px-2'>{local.email}</span>
          </p>
          <p>
            <label htmlFor='ID'>ID :</label>
            <span className='px-2'>{local.id}</span>
          </p>
        </div>
      </section>
    </ProfileLayout>
  );
}
