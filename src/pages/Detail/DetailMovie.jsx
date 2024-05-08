import { Link, useParams } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import './style.scss';
import { HeroDetail } from './component';
import { getDetailMovie, getDetailMovie1 } from '../../services/movie.api';
import ErrorPage from '../Error';
import LoadingElement from '../../components/LoadingElement';

function DetailMovie() {
  const { slug } = useParams();

  const [dataDetail, setDataDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getDetail = async () => {
      try {
        const res = await getDetailMovie(slug);
        setDataDetail(res);
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getDetail();
  }, [slug]);

  // if (isLoading) {
  //   return <LoadingElement />;
  // }
  if (isError) {
    return <ErrorPage />;
  }
  console.log(dataDetail?.data?.data.item);
  return (
    <>
      {' '}
      <div className=' bg-[#040404]'>
        {isLoading ? (
          <LoadingElement />
        ) : (
          <>
            <HeroDetail dataDetail={dataDetail?.data?.data.item} />
            <div className='m-auto px-[8rem] 2xl:px-[5rem] xl:px-[4rem] lg:px-[3rem] md:px-[1rem] '>
              <section className='h-auto py-4 bg-[#040404]  '>
                <h2 className='py-2'>Danh sách tập</h2>
                <div className='mt-1 h-auto flex flex-wrap '>
                  {dataDetail?.data?.data.item.episodes[0]?.server_data[0]
                    .slug === 'full'
                    ? dataDetail?.data?.data.item.episodes[0]?.server_data.map(
                        (movie) => (
                          <Link
                            key={movie.name}
                            to={`/movie/${dataDetail?.data?.data.item.movie?.slug}/full`}
                            className={`no-underline my-1 mx-1 rounded-md py-1 px-3 border-1 hover:bg-slate-100 hover:text-black font-medium transform transition duration-200 hover:shadow-md  ${
                              movie.slug === '1' ? `mr-1` : ` mx-1`
                            }`}
                          >
                            {movie.name}
                          </Link>
                        ),
                      )
                    : dataDetail?.data?.data.item.episodes[0]?.server_data[0]
                        .slug === ''
                    ? dataDetail?.data?.data.item.episodes[0]?.server_data.map(
                        (movie) => (
                          <Link
                            key={movie.name}
                            to={`/movie/${dataDetail?.data?.data.item.movie?.slug}/trailer`}
                            className={`no-underline my-1 mx-1 rounded-md py-1 px-3 border-1 hover:bg-slate-100 hover:text-black font-medium transform transition duration-200 hover:shadow-md  
                            `}
                          >
                            Trailer
                          </Link>
                        ),
                      )
                    : dataDetail?.data?.data.item.episodes[0]?.server_data.map(
                        (movie) => (
                          <Link
                            key={movie.name}
                            to={`/movie/${dataDetail?.data?.data.item?.slug}/tap-${movie.slug}`}
                            className={`no-underline my-1 mx-1 rounded-md py-1 px-3 border-1 hover:bg-slate-100 hover:text-black font-medium transform transition duration-200 hover:shadow-md  ${
                              movie.slug === '1' ? `mr-1` : ` mx-1`
                            }`}
                          >
                            Tập {movie.name}
                          </Link>
                        ),
                      )}
                </div>
              </section>
              <section className='w-full h-auto mb-2 ' id='trailer'>
                <h3 className='text-2xl'>Trailer</h3>
                <iframe
                  src={dataDetail?.data?.data.item.trailer_url
                    .replace(
                      'https://www.youtube.com',
                      'https://www.youtube.com/embed',
                    )
                    .replace('/watch?v=', '/')}
                  title={dataDetail?.data?.seoOnPage?.titleHead}
                  frameborder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerpolicy='strict-origin-when-cross-origin'
                  allowfullscreen
                  className='w-full h-[600px] rounded-md'
                ></iframe>
              </section>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default memo(DetailMovie);
