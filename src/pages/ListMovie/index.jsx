import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  getListOptionNation,
  getListOptionTheLoai,
  getMovie,
} from '../../services/movie.api';
import LoadingElement from '../../components/LoadingElement';
import Card from '../../components/CardGrid/card';
import { Pagination } from 'flowbite-react';
import yearsArray from '../../utils/year';
import Skeleton from 'react-loading-skeleton';

export default function ListMovie() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [typeMovie, settypeMovie] = useState([]);
  const [nationMovie, setnationMovie] = useState([]);
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ['/danh-sach/' + slug],
    queryFn: async () =>
      await getMovie(
        parseInt(searchParams.get('page')) || 1,
        searchParams.get('quoc-gia') || '',
        parseInt(searchParams.get('year')) || '',
        slug,
        searchParams.get('the-loai') || '',
      ),
  });
  useEffect(() => {
    const getType = async () => {
      const [theloai, nation] = await Promise.all([
        getListOptionTheLoai(),
        getListOptionNation(),
      ]);
      settypeMovie(theloai.data.data.items);
      setnationMovie(nation.data.data.items);
    };
    getType();
  }, []);
  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);
  const onPageChange = useCallback(
    (page) => {
      setSearchParams((oldParams) => {
        const params = new URLSearchParams(oldParams);
        params.set('page', page);
        return params.toString();
      });
    },
    [setSearchParams],
  );

  const handleChangeYear = useCallback(
    (number) => {
      if (number === 'default') {
        setSearchParams(``);
        return;
      }
      setSearchParams((oldParams) => {
        const params = new URLSearchParams(oldParams);
        params.set('year', number);
        return params.toString();
      });
    },
    [setSearchParams],
  );

  const handleChangeType = useCallback(
    (type) => {
      if (type === 'default') {
        setSearchParams(``);
        return;
      }
      setSearchParams((oldParams) => {
        const params = new URLSearchParams(oldParams);
        params.set('the-loai', type);
        return params.toString();
      });
    },
    [setSearchParams],
  );

  const handleChangeNation = useCallback(
    (nation) => {
      if (nation === 'default') {
        setSearchParams(``);
        return;
      }
      setSearchParams((oldParams) => {
        const params = new URLSearchParams(oldParams);
        params.set('quoc-gia', nation);
        return params.toString();
      });
    },
    [setSearchParams],
  );
  if (isFetching) {
    return <LoadingElement />;
  }

  return (
    <>
      <main className='m-auto px-[8rem] 2xl:px-[5rem] xl:px-[4rem] lg:px-[3rem] md:px-[1rem]  md:pt-2'>
        <section className='w-full pb-1 flex flex-wrap mb-2 '>
          {slug === 'phim-sap-chieu' ? null : (
            <div className='w-[200px]  pr-2 md:w-full '>
              <label className='w-full' htmlFor='Năm phát hành'>
                Năm phát hành
              </label>
              <select
                name=''
                value={searchParams.get('year') ?? 'default'}
                className='text-white w-full rounded-sm py-1 bg-[#111319] shadow-white shadow-sm'
                onChange={(e) => handleChangeYear(e.target.value)}
              >
                <option value='default'>--Chọn--</option>
                {yearsArray.map((item) => {
                  return (
                    <option value={item} key={item} className='md:text-sm'>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          <div className='w-[200px]  pr-2 md:w-1/2'>
            <label className='w-full' htmlFor='Thể loại'>
              Thể loại
            </label>
            <select
              name=''
              id=''
              value={searchParams.get('the-loai') ?? 'default'}
              className='text-white w-full rounded-sm py-1 bg-[#111319] shadow-white shadow-sm'
              onChange={(e) => handleChangeType(e.target.value)}
            >
              <option value='default'>--Chọn--</option>
              {typeMovie.map((item) => {
                return (
                  <option
                    value={item.slug}
                    key={item._id}
                    className='md:text-sm'
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='w-[200px]  pr-2 md:w-1/2 '>
            <label className='w-full' htmlFor='Quốc gia'>
              Quốc gia
            </label>
            <select
              name=''
              id=''
              value={searchParams.get('quoc-gia') ?? 'default'}
              className='text-white w-full rounded-sm py-1 bg-[#111319] shadow-white shadow-sm '
              onChange={(e) => handleChangeNation(e.target.value)}
            >
              <option value='default'>--Chọn--</option>
              {nationMovie.map((item) => {
                return (
                  <option
                    value={item.slug}
                    key={item._id}
                    className='md:text-sm'
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        </section>

        {isLoading ? (
          Array(24)
            .fill(0)
            .map((_, index) => <Skeleton key={index} height={404} />)
        ) : data && data?.data?.items.length === 0 ? (
          <section className='w-full h-[600px]'>
            <h1 className='text-white text-4xl  text-center '>
              Không có kết quả
            </h1>
          </section>
        ) : (
          <>
            <section className='h-auto min-h-[2090px]   w-full grid grid-cols-5 gap-4  lg:grid-cols-3 md:grid-cols-2'>
              {data?.data?.items?.map((movie) => (
                <Link
                  to={`/details/${movie.slug}`}
                  key={movie._id}
                  className='h-[404px] lg:h-auto lg:min-h-[300px] md:max-h-[250px] md:h-[250px] '
                >
                  <Card data={movie} />
                </Link>
              ))}
            </section>
            <section className='flex   sm:justify-center md:px-2'>
              {' '}
              <Pagination
                className='pagination'
                layout='pagination'
                currentPage={parseInt(searchParams.get('page')) || 1}
                totalPages={100}
                onPageChange={onPageChange}
                previousLabel='Go back'
                nextLabel='Go forward'
                showIcons
              />
            </section>
          </>
        )}
      </main>
    </>
  );
}
