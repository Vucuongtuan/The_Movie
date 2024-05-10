import { getMovie } from '../../../services/movie.api';
import { useQuery } from '@tanstack/react-query';

import { Link } from 'react-router-dom';
import CardGrid from '../../../components/CardGrid';
import SkeletonElement from '../../../components/Skeleton/Skeleton';
export default function MovieList() {
  // useEffect(() => {
  //   ApiKey();
  // }, []);
  // useEffect(() => {
  //   const handleResize = () => {
  //     setWidthScreen(window.innerWidth);
  //   };
  //   window.addEventListener('resize', handleResize);

  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);
  // const ApiKey = async () => {
  //   try {
  //     let res = await getTrendingMovie();
  //     setNewMovie(res.data.results);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const { data, isFetching } = useQuery({
    queryKey: ['/danh-sach/phim-moi-cap-nhat'],
    queryFn: async () => await getMovie(1, '', 2024, 'phim-moi-cap-nhat'),
  });

  // if (data.status === false) {
  //   return (
  //     <div className='h-[600px] w-full justify-center items-center flex'>
  //       <svg
  //         xmlns='http://www.w3.org/2000/svg'
  //         fill='none'
  //         viewBox='0 0 24 24'
  //         strokeWidth={1.5}
  //         stroke='currentColor'
  //         className='w-16 h-16 text-red-400'
  //       >
  //         <path
  //           strokeLinecap='round'
  //           strokeLinejoin='round'
  //           d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z'
  //         />
  //       </svg>
  //     </div>
  //   );
  // }
  // const newData = data.items.slice(0, 12);
  return (
    <section className='mt-8'>
      <div className='flex justify-between items-center'>
        <h2>Phim mới cập nhật</h2>
        <Link
          to={'/danh-sach/phim-moi-cap-nhat'}
          className='flex mr-2 py-1 px-4  rounded-md border border-white  text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] transition duration-200'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 mr-2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5'
            />
          </svg>
          Xem thêm{' '}
        </Link>
      </div>
      <div
        className='mt-8 mb-8  w-full min-h-[300px] h-[500px] gap-2 grid grid-cols-5 grid-rows-2 
        lg:h-[350px]
        md:h-auto
        md:max-h-[1800px]
      md:grid-cols-2
      md:grid-rows-5
      '
      >
        {isFetching
          ? Array.from({ length: data?.data?.items?.length }).map(
              (_, index) => (
                <SkeletonElement
                  key={index}
                  className={`rounded-md w-full h-full overflow-hidden relative group cursor-pointer`}
                />
              ),
            )
          : data &&
            data.data.items
              .slice(0, 10)
              .map((movie, index) => <CardGrid movie={movie} index={index} />)}
      </div>
    </section>
  );
}
