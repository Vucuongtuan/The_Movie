import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import LoadingElement from '../../components/LoadingElement';
import Card from '../../components/CardGrid/card';
import { Pagination } from 'flowbite-react';
import { getListOptionNation, getType } from '../../services/movie.api';
import yearsArray from '../../utils/year';
import Skeleton from 'react-loading-skeleton';
import LoadingLayout from '../../components/LoadingElement/loadingLayout';

export default function CountryPage() {
  const { nation } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [country, setCountry] = useState([]);
  const currentDate = new Date();
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['/the-loai/' + nation],
    queryFn: async () =>
      await getType(
        parseInt(searchParams.get('page')) || 1,
        nation || '',
        parseInt(searchParams.get('year')) || yearsArray[yearsArray.length - 1],
        nation,
        'quoc-gia',
      ),
  });
  useEffect(() => {
    const getList = async () => {
      const res = await getListOptionNation();
      setCountry(res.country);
    };
    getList();
  }, []);
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
  const handleChangeYear = (number) => {
    if (number === 'default') {
      setSearchParams(``);
      return;
    }
    setSearchParams(`?year=${number}`);
  };
  return (
    <>
      {isFetching === true ? (
        <LoadingElement />
      ) : (
        <main className='m-auto  px-[8rem] 2xl:px-[5rem] xl:px-[4rem] lg:px-[3rem] md:px-[1rem] '>
          <section className='w-full py-2 flex flex-wrap'>
            <h1>Phim hàn</h1>
          </section>
          <section className='w-full pb-1 flex flex-wrap mb-2'>
            <select
              name=''
              id=''
              value={searchParams.get('year') ?? 'default'}
              className='text-white rounded-sm px-2 py-1 bg-[#111319] shadow-white shadow-sm'
              onChange={(e) => handleChangeYear(e.target.value)}
            >
              <option value='default'>--Chọn--</option>
              {yearsArray.map((item) => {
                return (
                  <option value={item} key={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </section>

          {!isFetching ? (
            data?.data?.items.length !== 0 ? (
              <>
                <section className='h-auto w-full grid grid-cols-5 gap-4 lg:grid-cols-3 md:grid-cols-2'>
                  {data?.data?.items?.map((movie) => (
                    <Link to={`/details/${movie.slug}`} key={movie._id}>
                      <Card data={movie} />
                    </Link>
                  ))}
                </section>
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
              </>
            ) : (
              <section className='w-full h-[600px]'>
                <h1 className='text-white text-4xl  text-center '>
                  Không có kết quả
                </h1>
              </section>
            )
          ) : (
            Array(24)
              .fill(0)
              .map((_, index) => <Skeleton key={index} height={404} />)
          )}
        </main>
      )}
    </>
  );
}
