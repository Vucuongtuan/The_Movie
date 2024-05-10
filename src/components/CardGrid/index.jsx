import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImageComponent from '../imageComponent';
export default function CardGrid({ movie, index }) {
  const [resizeLayout, setResizeLayout] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setResizeLayout(false);
      } else {
        setResizeLayout(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [resizeLayout]);
  return (
    <Link
      to={`/details/${movie.slug}`}
      key={movie._id}
      className={`rounded-md h-full w-full overflow-hidden relative group cursor-pointer  ${
        index === 0 ? 'col-span-3 row-span-2 md:row-span-2 md:col-span-2' : ''
      }`}
    >
      <ImageComponent resizeLayout={resizeLayout} index={index} movie={movie} />
      {/* <img
        src={
          (resizeLayout
            ? BASE_IMAGE_URL + movie.poster_url
            : index === 0
            ? BASE_IMAGE_URL + movie.poster_url
            : BASE_IMAGE_URL + movie.thumb_url) ||
          BASE_IMAGE_URL_2 +
            (resizeLayout
              ? movie.poster_url
              : index === 0
              ? movie.poster_url
              : movie.thumb_url)
        }
        alt={movie.name}
        loading='lazy'
        className='w-full object-cover h-full  group-hover:scale-110 transition-all duration-500 '
      /> */}
      <div className='w-full h-1/2 flex justify-between items-center px-2 py-1 bg-gradient-to-t from-black via-[rgba(0, 0, 0, .39)] to-transparent  absolute bottom-0 left-0'>
        <div className=''>
          <h3
            className={`-mt-2 ${
              index === 0
                ? 'text-[1.8rem] md:text-[1.2rem] mt-4'
                : 'text-[1.2rem] md:text-[0.8rem] lg:text-[0.8rem] -py-8'
            }`}
          >
            {movie.name}
          </h3>
          <span className='-mt-4 lg:text-[0.8rem] absolute bottom-0'>
            {movie.episode_current}
          </span>
        </div>
        <span className='lg:text-[0.8rem] absolute bottom-0 right-1'>
          {movie.year}
        </span>
      </div>
    </Link>
  );
}
