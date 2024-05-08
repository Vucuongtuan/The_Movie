import React from 'react';
import Image from '../imageComponent/image';

export default function Card({ data }) {
  return (
    <div className='w-full h-full rounded-md relative overflow-hidden group'>
      <Image
        resizeLayout={true}
        movie={data}
        className={
          'w-full h-full group-hover:scale-110 transition-all duration-500'
        }
      />
      <div className='w-full h-full flex justify-between items-center px-2 py-1 bg-gradient-to-t from-black via-[rgba(0, 0, 0, .39)] to-transparent  absolute bottom-0 left-0'>
        <div className='h-[25%] max-h-[50%] absolute bottom-0 left'>
          <h3
            className={`-mt-2 text-[1.2rem] md:text-[0.8rem] lg:text-[0.8rem] -py-8
            `}
          >
            {data.name}
          </h3>
          <span className='-mt-4 lg:text-[0.8rem] absolute bottom-0'>
            {data.episode_current}
          </span>
          <span className='lg:text-[0.8rem] absolute bottom-0 right-1'>
            {data.year}
          </span>
        </div>
      </div>
    </div>
  );
}
