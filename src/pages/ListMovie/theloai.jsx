import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import LoadingElement from '../../components/LoadingElement';
import Card from '../../components/CardGrid/card';
import { Pagination } from 'flowbite-react';
import { getListOptionTheLoai, getType } from '../../services/movie.api';
import Skeleton from 'react-loading-skeleton';

export default function TheLoai() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [country, setCountry] = useState([]);
  const currentDate = new Date();
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['/the-loai/' + slug],
    queryFn: async () =>
      await getType(
        parseInt(searchParams.get('page')) || 1,
        searchParams.get('country') || '',
        parseInt(searchParams.get('year')) || currentDate.getFullYear(),
        slug,
        'the-loai',
      ),
  });
  useEffect(() => {
    const getList = async () => {
      const res = await getListOptionTheLoai();
      setCountry(res.country);
    };
    getList();
  }, [country, isFetching]);
  const onPageChange = (page) => {
    if (page !== 1) {
      setSearchParams(`?page=${page}`);
    } else {
      setSearchParams(``);
    }
  };
  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);
  const handleCountry = (type) => {
    if (type === 'default') {
      setSearchParams(``);
      return;
    }
    setCountry(type);
    setSearchParams(`?country=${type}`);
  };
  return (
    <>
      {isFetching === true ? (
        <LoadingElement />
      ) : (
        <main className='m-auto pt-[80px] px-[8rem] 2xl:px-[5rem] xl:px-[4rem] lg:px-[3rem] md:px-[1rem] '>
          <section className='w-full py-4 flex flex-wrap'>
            <div className=''>
              <label htmlFor='Quốc gia' className='w-full'>
                Quốc gia :{' '}
              </label>
              <select
                name='Chọn'
                id=''
                value={searchParams.get('country') ?? 'default'}
                className='text-white rounded-sm px-2 py-1 bg-black shadow-white shadow-sm'
                onChange={(e) => handleCountry(e.target.value)}
              >
                <option value='default'>--Chọn--</option>
                <>
                  {country &&
                    country?.map((country) => (
                      <option key={country._id} value={country.slug}>
                        {country.name}
                      </option>
                    ))}
                </>
              </select>
            </div>
            <div className=''>
              {/* <YearSelector
                type={'the-loai'}
                setSearchParams={setSearchParams}
                refetch={refetch()}
              /> */}
            </div>
          </section>
          <div className='h-auto w-full grid grid-cols-5 gap-4  lg:grid-cols-3 md:grid-cols-2'>
            {isFetching
              ? Array(24)
                  .fill(0)
                  .map((_, index) => <Skeleton key={index} height={404} />)
              : data &&
                data?.data?.items?.map((movie) => (
                  <Link to={`/details/${movie.slug}`} key={movie._id}>
                    <Card data={movie} />
                  </Link>
                ))}
          </div>
          <section className='flex   sm:justify-center'>
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
        </main>
      )}
    </>
  );
}
