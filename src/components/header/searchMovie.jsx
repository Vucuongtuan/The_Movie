import debounce from 'lodash.debounce';
import React, { useCallback, useMemo, useState } from 'react';
import { getMovieSearch } from '../../services/movie.api';
import Image from '../imageComponent/image';
import { Link } from 'react-router-dom';

export default function SearchMovie() {
  const [dataResult, setDataResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputClicked, setInputClicked] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeInput = useCallback(
    debounce(async (e) => {
      setLoading(true);
      try {
        if (e.length > 0) {
          setInputClicked(true);
        } else {
          setInputClicked(false);
        }
        const res = await getMovieSearch(e.toLowerCase());
        setDataResult(res);
        if (e.length === 0) {
          setDataResult([]);
        }
      } catch (err) {
        setDataResult([]);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }, 1000),
    [],
  );
  const containerClassName = useMemo(() => {
    return `relative h-full w-full flex px-2 justify-start items-center transition-all duration-500 md:justify-center`;
  }, []);

  const resultContainerClassName = useMemo(() => {
    return `absolute h-auto max-h-[400px] w-[350px] top-14 rounded-md overflow-hidden items-start z-40 text-xl leading-[100px] bg-[#1e1e1e] transition-all duration-500 ${
      inputClicked ? '' : 'hidden'
    }`;
  }, [inputClicked]);
  return (
    <div className={containerClassName}>
      <input
        type='text'
        placeholder='Tìm kiếm phim ...'
        onChange={(e) => handleChangeInput(e.target.value)}
        className=' relative w-full h-1/2 bg-transparent border-none border-b-2 border-[#767f8f] text-white focus:outline-0 '
      />
      <div className={resultContainerClassName}>
        {loading ? (
          <div className='flex space-x-2 justify-center py-4 h-screen dark:invert transition-all duration-500'>
            <span className='sr-only'>Loading...</span>
            <div className='h-5 w-5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-5 w-5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-5 w-5 bg-white rounded-full animate-bounce'></div>
          </div>
        ) : dataResult.length === 0 ? (
          <span className='transition-all duration-500 text-center'>
            Không có data
          </span>
        ) : dataResult.data?.data?.items.length === 0 ? (
          <span className='transition-all duration-500 text-center'>
            Không có data
          </span>
        ) : (
          <ul className='w-full h-auto max-h-[400px] overflow-y-scroll transition-all duration-500'>
            {dataResult &&
              dataResult.data?.data?.items?.map((item) => (
                <Link
                  onClick={() => {
                    setInputClicked(false);
                  }}
                  to={`/details/${item.slug}`}
                  className='my-2 h-[80px]  w-full flex  text-ellipsis overflow-hidden ...'
                  key={item._id}
                >
                  <div className='w-[40%] h-full'>
                    <Image
                      resizeLayout={false}
                      movie={item}
                      className={'w-full h-full rounded-md object-cover'}
                    />
                  </div>
                  <div className='w-[60%] h-full flex flex-col items-start leading-[20px] pl-1 '>
                    <span className=' -py-4 text-[1rem] font-semibold'>
                      {item.name}
                    </span>
                    <span className='pr-2 text-[0.8rem] w-full text-ellipsis overflow-hidden'>
                      {item.origin_name}
                    </span>
                    <span className='text-[0.8rem]'>
                      {item.episode_current} | {item.time}
                    </span>
                    <span className='text-[0.8rem]'>{item.year}</span>
                  </div>
                </Link>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
{
  /* {!inputClicked ? (
        <></>
      ) : loading ? (
        <div className=' rounded-sm absolute items-start z-40 top-14 w-[350px] text-xl leading-[100px] h-[50px] text-center  bg-[#1e1e1e]  transition-all duration-500'>
          <div className='flex space-x-2 justify-center py-4 h-screen dark:invert'>
            <span className='sr-only'>Loading...</span>
            <div className='h-5 w-5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-5 w-5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-5 w-5 bg-white rounded-full animate-bounce'></div>
          </div>
        </div>
      ) : dataResult.length === 0 ? (
        <div className=' rounded-sm absolute z-40 top-14 w-[350px] text-xl leading-[100px] h-[100px] text-center  bg-[#1e1e1e]  transition-all duration-500'>
          <span>Không có data</span>
        </div>
      ) : dataResult.data?.data?.items.length === 0 ? (
        <div className=' rounded-sm absolute z-40 top-14 w-[350px] text-xl leading-[100px] h-[100px] text-center  bg-[#1e1e1e]  transition-all duration-500'>
          <span>Không có data</span>
        </div>
      ) : (
        <div className=' rounded-sm absolute z-40 top-14 left-0 w-[350px] h-auto  bg-[#1e1e1e]  transition-all duration-500'>
          <ul className='w-[350px] h-auto max-h-[400px] overflow-y-scroll'>
            {dataResult &&
              dataResult.data?.data?.items?.map((item) => (
                <Link
                  to={`/details/${item.slug}`}
                  className='my-1 h-[100px] w-full flex  text-ellipsis overflow-hidden ...'
                  key={item._id}
                >
                  <div className='w-[40%] h-full'>
                    <Image
                      resizeLayout={false}
                      movie={item}
                      className={'w-full h-full rounded-md object-cover'}
                    />
                  </div>
                  <div className='w-[60%] h-full flex flex-col items-start leading-[20px] pl-1 '>
                    <span className=' -py-4 text-lg'>{item.name}</span>
                    <span className='pr-2 text-ellipsis overflow-hidden'>
                      {item.origin_name}
                    </span>
                    <span>
                      {item.episode_current} | {item.time}
                    </span>
                    <span>{item.year}</span>
                  </div>
                </Link>
              ))}
          </ul>
        </div>
      )} */
}
