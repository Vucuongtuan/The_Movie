import '../style.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Image from '../../../components/imageComponent/image';

function HeroDetail({ dataDetail }) {
  const [resizeWidth, setResizeWidth] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setResizeWidth(true);
      else setResizeWidth(false);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [resizeWidth]);
  console.log(dataDetail);
  const handleClickScroll = (trailer) => {
    const element = document.getElementById(trailer);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <div
        key={dataDetail?._id}
        className=' relative flex bg-[#040404] xl:bg-[] lg:flex-col-reverse md:flex-col-reverse '
      >
        <div className='  items-end h-full w-[40%] flex px-8 lg:w-full md:w-full md:px-2 lg:z-30 lg:absolute lg:bg-transparent lg:bottom-3 md:z-30 md:absolute md:bg-transparent md:bottom-4'>
          <div className='mt-36 w-full '>
            <div className='p-2 w-full '></div>
            <div
              className='w-full px-2 md:w-full md:text-[0.7rem]
            
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
                    dataDetail?.category
                      .map((cate) => cate.name)
                      .join(', ')}{' '}
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
              <div
                className='mt-2'
                dangerouslySetInnerHTML={{
                  __html: dataDetail?.content,
                }}
              ></div>
              <div className='mt-2  md:-mt-5'>
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
                    to={`/movie/${dataDetail?.slug}/tap-1`}
                    className='w-[200px] py-3 px-12 no-underline bg-red-600 rounded-md'
                  >
                    Xem phim
                  </Link>
                )}
              </div>
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
