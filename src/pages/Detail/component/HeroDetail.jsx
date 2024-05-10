import '../style.scss';
import { Link } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import Image from '../../../components/imageComponent/image';

function HeroDetail({ dataDetail, slug }) {
  const [resizeWidth, setResizeWidth] = useState(false);
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
            <div className='mt-4  md:mt-4'>
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
