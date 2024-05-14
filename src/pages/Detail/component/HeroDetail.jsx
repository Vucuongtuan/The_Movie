import '../style.scss';
import { Link } from 'react-router-dom';
import { useCallback, useLayoutEffect, useState } from 'react';
import Image from '../../../components/imageComponent/image';
import { Popover, Spinner } from 'flowbite-react';
import { addListMovies } from '../../../services/auth';
import Cookies from 'js-cookie';
function HeroDetail({ dataDetail, slug }) {
  const [resizeWidth, setResizeWidth] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  let status;
  console.log(status);
  const tap = localStorage.getItem(slug);
  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setResizeWidth(true);
      else setResizeWidth(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [resizeWidth]);
  const handleClickScroll = (trailer) => {
    const element = document.getElementById(trailer);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const content = (
    <div className='w-64 text-sm text-gray-500 dark:text-gray-400'>
      <div className='border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700'>
        <h3 className='font-semibold text-gray-900 dark:text-white'>
          Thêm phim vào lịch sử
        </h3>
      </div>
      <div className='px-3 py-2'>
        <p>Lưu vào lịch sử để xem sau hoặc hiển thi dễ dàng hơn</p>
      </div>
    </div>
  );
  const auth = Cookies.get('token');
  const handleAddList = useCallback(async () => {
    setLoadingAdd(true);
    try {
      if (auth === undefined) {
        alert('Vui lòng đăng nhập để có thể thêm vào lịch sử');
        return;
      }
      const local = JSON.parse(localStorage.getItem('dataUser'));
      const movie = {
        name: dataDetail.name,
        slug: dataDetail.slug,
        tap: dataDetail.episode_current,
        thumb_url: dataDetail.thumb_url,
        poster_url: dataDetail.poster_url,
      };
      const res = await addListMovies(local.id, movie);
      const status = res?.data?.status;
      if (status === 'success') {
        Notification.requestPermission().then(function (permission) {
          if (permission === 'granted') {
            new Notification(res.data?.message);
          }
        });
      }
    } catch (e) {
      setLoadingAdd(false);
      console.log(e);
      alert(e.message);
    } finally {
      setLoadingAdd(false);
    }
  }, [
    auth,
    dataDetail.episode_current,
    dataDetail.name,
    dataDetail.poster_url,
    dataDetail.slug,
    dataDetail.thumb_url,
  ]);
  return (
    <>
      <div
        key={dataDetail?._id}
        className=' relative flex bg-[#040404] xl:bg-[] lg:flex-col-reverse md:flex-col-reverse '
      >
        <div className='  items-end h-full w-[40%] flex px-8 lg:w-full md:w-full md:px-2 lg:z-30 lg:absolute lg:bg-transparent lg:bottom-3 md:z-30 md:absolute md:bg-transparent md:bottom-4 '>
          <div
            className='w-full mt-36  px-2 md:w-full md:text-[0.7rem]    md:mb-12 md:h-1/2
            '
          >
            <h1 className='font-cursive text-4xl  py-2 md:text-2xl'>
              {dataDetail?.name}
            </h1>
            <span className=''>{dataDetail?.origin_name}</span>
            <div className='w-full h-auto mt-1 '>
              <span className='w-[45px] border-r border-r-red pr-2'>
                {dataDetail?.episode_current}
              </span>
              <span className='w-[45px] border-r border-r-red px-2'>
                {dataDetail?.time}
              </span>
              <span className='w-[45px] border-r border-r-red  px-2'>
                {dataDetail?.type}
              </span>
              <span className='w-[45px]  px-2'>{dataDetail?.year}</span>
            </div>
            <div className='mt-1 flex flex-col '>
              <span>Sub : {dataDetail?.lang} </span>
              <span>
                Thể loại :{' '}
                {dataDetail?.category &&
                  dataDetail?.category.map((cate) => cate.name).join(', ')}{' '}
              </span>
              <span>
                Đạo diễn :{' '}
                {dataDetail?.director &&
                  dataDetail?.director
                    .map((director) => director)
                    .join(', ')}{' '}
              </span>
              <span>
                Diễn viên :{' '}
                {dataDetail?.actor &&
                  dataDetail?.actor.map((actor) => actor).join(', ')}{' '}
              </span>
            </div>
            <div className='mt-2 max-h-[236px] md:overflow-y-scroll'>
              {dataDetail?.content && dataDetail.content.length <= 400 ? (
                <div
                  dangerouslySetInnerHTML={{ __html: dataDetail.content }}
                ></div>
              ) : (
                <div>
                  {dataDetail?.content?.slice(0, 400)}
                  {dataDetail?.content?.length > 400 && '...'}
                </div>
              )}
            </div>
            <div className='mt-4 flex items-center text-center  md:mt-4'>
              {dataDetail?.episode_current === 'Trailer' ? (
                <Link
                  onClick={() => handleClickScroll('trailer')}
                  className='w-[200px] py-3 px-12 no-underline bg-red-600 rounded-md'
                >
                  Trailer
                </Link>
              ) : dataDetail?.episodes[0].server_data[0].slug === 'full' ? (
                <Link
                  to={`/movie/${dataDetail?.slug}/full`}
                  className='w-[200px] py-3 px-12 no-underline bg-red-600 rounded-md'
                >
                  Xem phim
                </Link>
              ) : (
                <Link
                  to={`/movie/${dataDetail?.slug}/tap-${
                    tap !== null ? tap : '1'
                  }`}
                  className='w-[200px] py-3 px-12 no-underline bg-red-600 rounded-md'
                >
                  Xem phim
                </Link>
              )}

              <Popover content={content} trigger='hover' placement='right'>
                <button
                  data-popover-target='popover-default'
                  type='button'
                  className='w-8 h-8 rounded-full bg-red-600 mx-6'
                  onClick={handleAddList}
                >
                  {loadingAdd ? (
                    <Spinner aria-label='Default status example' />
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-8 h-8'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                      />
                    </svg>
                  )}
                </button>
              </Popover>
            </div>
          </div>
        </div>
        <div className=' h-full w-[60%] flex bg-center brightness-[.6] img-bg  lg:w-full md:w-full'>
          <Image
            resizeLayout={resizeWidth}
            movie={dataDetail}
            className={'h-[90vh] w-full object-cover lg:h-full md:h-full'}
          />
        </div>
      </div>
    </>
  );
}

export default HeroDetail;
