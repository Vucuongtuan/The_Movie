import React, { useLayoutEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import './style.module.scss';
import { Navigation } from 'swiper/modules';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getMovie } from '../../../services/movie.api';
import Image from '../../../components/imageComponent/image';
import { Link } from 'react-router-dom';

import LoadingLayout from '../../../components/LoadingElement/loadingLayout';
export default function CarouselLayout() {
  const [widthScreen, setWidthScreen] = useState(false);
  useLayoutEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        setWidthScreen(true);
      } else {
        setWidthScreen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [widthScreen]);
  const { data, error, isFetching } = useQuery({
    queryKey: ['/danh-sach/phim-moi-year'],
    queryFn: async () => await getMovie(1, '', 2024, 'phim-moi'),
  });

  if (error) {
    <h1 className='text-white'>Liox</h1>;
  }
  if (window.innerWidth <= 786) {
    return (
      <section className='px-4 rounded-md overflow-hidden'>
        <Swiper
          navigation={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          modules={[Navigation]}
          className='mySwiper h-[502px] mt-1 rounded-md'
        >
          {' '}
          {!isFetching ? (
            data.data.items.map((item) => {
              return (
                <SwiperSlide
                  key={item._id}
                  autoplay={1000}
                  className=' h-[500px] w-full  relative bg-gr'
                >
                  <div className='h-full w-full '>
                    <Image
                      resizeLayout={widthScreen}
                      movie={item}
                      className={'w-full h-full object-cover brightness-50'}
                    />
                  </div>
                  <div className='flex px-8   absolute bottom-2 left-4 h-2/3 w-3/6 z-50 lg:w-4/6 md:w-full md:h-[300px]'>
                    <div
                      className='w-[60%] px-2 md:w-full
              
              '
                    >
                      <h2 className='font-cursive text-3xl  py-2'>
                        {item.name}
                      </h2>
                      <span className=''>{item.origin_name}</span>
                      <div className='w-full h-auto mt-1'>
                        <span className='w-[45px] border-r border-r-red pr-2'>
                          {item.episode_current}
                        </span>
                        <span className='w-[45px] border-r border-r-red px-2'>
                          {item.time}
                        </span>
                        <span className='w-[45px]  px-2'>{item.type}</span>
                      </div>
                      <div className='mt-1 flex flex-col '>
                        <span>Sub : {item.lang} </span>
                        <span>Phát hành : {item.year} </span>
                        <span>
                          Thể loại :{' '}
                          {item.category.map((cate) => cate.name).join(', ')}{' '}
                        </span>
                      </div>
                      <div className='mt-8'>
                        <Link
                          to={`/details/${item.slug}`}
                          className='px-16 py-2 bg-red-600 rounded-md'
                        >
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            <LoadingLayout />
          )}
        </Swiper>
      </section>
    );
  }
  return (
    <Swiper
      direction={'vertical'}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 7000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination]}
      className='mySwiper h-[662px]'
    >
      {data &&
        data.data.items.map((item) => {
          return (
            <SwiperSlide
              key={item._id}
              autoplay={1000}
              className=' h-[662px] w-full relative bg-gr'
            >
              <div className='h-full w-full'>
                <Image
                  resizeLayout={widthScreen}
                  movie={item}
                  className={'w-full h-full object-cover brightness-50'}
                />
              </div>
              <div className='flex   absolute bottom-12 left-4 h-2/3 w-3/6 z-50 lg:w-4/6 md:w-full md:h-[300px]'>
                <Image
                  resizeLayout={!widthScreen}
                  movie={item}
                  className={'p-2 h-full  rounded-md w-full md:hidden'}
                />
                <div
                  className='w-[60%] px-2 md:w-full
              
              '
                >
                  <h2 className='font-cursive text-3xl  py-2'>{item.name}</h2>
                  <span className=''>{item.origin_name}</span>
                  <div className='w-full h-auto mt-1'>
                    <span className='w-[45px] border-r border-r-red pr-2'>
                      {item.episode_current}
                    </span>
                    <span className='w-[45px] border-r border-r-red px-2'>
                      {item.time}
                    </span>
                    <span className='w-[45px]  px-2'>{item.type}</span>
                  </div>
                  <div className='mt-1 flex flex-col '>
                    <span>Sub : {item.lang} </span>
                    <span>Phát hành : {item.year} </span>
                    <span>
                      Thể loại :{' '}
                      {item.category.map((cate) => cate.name).join(', ')}{' '}
                    </span>
                  </div>
                  <div className='mt-8'>
                    <Link
                      to={`/details/${item.slug}`}
                      className='px-16 py-2 bg-red-600 rounded-md'
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}
// export default function CarouselLayout() {
//   const [widthScreen, setWidthScreen] = useState(false);
//   const [overView, setOverView] = useState('');
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) setWidthScreen(true);
//       else setWidthScreen(false);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [widthScreen]);
//   const { data, error } = useQuery({
//     queryKey: ['/danh-sach/phim-moi-year'],
//     queryFn: async () => await getMovieByYear(2024, 1),
//   });
//   // const getOverview = async (slug) => {
//   //   const res = await getDetailMovie(slug);
//   //   console.log(res);
//   // };
//   if (error) {
//     <h1 className='text-white'>Liox</h1>;
//   }
//   console.log(widthScreen);
//   return (
//     <Carousel className={cx('Introduction')} interval='5000'>
//       {data &&
//         data.data.items.map((item) => (
//           <Carousel.Item key={item._id} className={cx('slide-show')}>
//             <div className={cx('box-slide')}>
//               <div className={cx('title-new-movie')}>
//                 <div className={cx('name-movie')}>
//                   <div className={cx('overview')}>
//                     <h2 style={{ color: 'white' }}>{item.name}</h2>

//                     {item.episode_current && item.episode_current ? (
//                       <p> Tập : {item.episode_current}</p>
//                     ) : (
//                       <></>
//                     )}

//                     <p>Thời lượng : {item.time} </p>
//                     <p className={cx('overview-movie')}>
//                       {/* {getOverview(item.slug)} */}
//                     </p>
//                     <Nav.Link as={Link} to={`detail/${item.slug}`}>
//                       <button className={cx('btn-ct')}>Xem chi tiết</button>
//                     </Nav.Link>
//                   </div>
//                 </div>
//               </div>
//               <img
//                 src={
//                   widthScreen
//                     ? `${BASE_IMAGE_URL}${item.thumb_url}`
//                     : `${BASE_IMAGE_URL}${item.poster_url}`
//                 }
//                 alt=''
//                 className={cx('box-image')}
//               />
//             </div>
//           </Carousel.Item>
//         ))}
//     </Carousel>
//   );
// }
