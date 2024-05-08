import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
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

export default function ListMovie() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [typeMovie, settypeMovie] = useState([]);
  const [nationMovie, setnationMovie] = useState([]);
  const { data, isLoading, isFetching, refetch } = useQuery({
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
  const onPageChange = (page) => {
    setSearchParams((oldParams) => {
      const params = new URLSearchParams(oldParams);
      params.set('page', page);
      return params.toString();
    });
  };
  const handleChangeYear = (number) => {
    if (number === 'default') {
      setSearchParams(``);
      return;
    }
    setSearchParams((oldParams) => {
      const params = new URLSearchParams(oldParams);
      params.set('year', number);
      return params.toString();
    });
  };
  const handleChangeType = (type) => {
    if (type === 'default') {
      setSearchParams(``);
      return;
    }
    setSearchParams((oldParams) => {
      const params = new URLSearchParams(oldParams);
      params.set('the-loai', type);
      return params.toString();
    });
  };
  const handleChangeNation = (nation) => {
    if (nation === 'default') {
      setSearchParams(``);
      return;
    }
    setSearchParams((oldParams) => {
      const params = new URLSearchParams(oldParams);
      params.set('quoc-gia', nation);
      return params.toString();
    });
  };
  return (
    <>
      {isFetching === true ? (
        <LoadingElement />
      ) : (
        <main className='m-auto px-[8rem] 2xl:px-[5rem] xl:px-[4rem] lg:px-[3rem] md:px-[1rem]  md:pt-24'>
          <section className='w-full pb-1 flex flex-wrap mb-2 '>
            <div className='w-[200px]  pr-2 md:w-[120px] '>
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
                    <option value={item} key={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='w-[200px]  pr-2 md:w-[100px]'>
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
                    <option value={item.slug} key={item._id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='w-[200px]  pr-2 md:w-[120px]'>
              <label className='w-full' htmlFor='Quốc gia'>
                Quốc gia
              </label>
              <select
                name=''
                id=''
                value={searchParams.get('quoc-gia') ?? 'default'}
                className='text-white w-full rounded-sm py-1 bg-[#111319] shadow-white shadow-sm'
                onChange={(e) => handleChangeNation(e.target.value)}
              >
                <option value='default'>--Chọn--</option>
                {nationMovie.map((item) => {
                  return (
                    <option value={item.slug} key={item._id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </section>
          <div className='h-auto w-full grid grid-cols-5 gap-4  md:grid-cols-2'>
            {data &&
              data?.data?.items?.map((movie) => (
                <Link to={`/details/${movie.slug}`} key={movie._id}>
                  <Card data={movie} />
                </Link>
              ))}
          </div>
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
        </main>
      )}
    </>
  );
}
