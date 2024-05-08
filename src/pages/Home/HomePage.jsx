import { Suspense, lazy } from 'react';
import CarouselLayout from './component/Carousel';
import LoadingLayout from '../../components/LoadingElement/loadingLayout';
import { Helmet } from 'react-helmet';
const MovieNew = lazy(() => import('./component/MovieNew'));
const MovieLe = lazy(() => import('./component/MovieLe'));
const MovieCartoon = lazy(() => import('./component/MovieCartoon'));
function HomePage() {
  const title =
    'TC Phim - Xem phim mới | Xem Phim Online | Xem Phim Nhanh | Full HD - Vietsub';
  const description =
    'TC Phim  - Trang xem phim Online miễn phí tuyệt vời trên thiết bị di động với kho phim đa dạng như phim Hàn quốc, phim Trung quốc, phim Âu Mỹ được cập nhật nhanh nhất, mới nhất .';
  const thumbnailUrl = '/logoTC.png';
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={thumbnailUrl} />
        <meta property='og:image:width' content='1200' />{' '}
        <meta property='og:image:height' content='630' />
      </Helmet>
      <main className='w-full'>
        <CarouselLayout />
        <div className='m-auto px-[8rem] 2xl:px-[5rem] xl:px-[4rem] lg:px-[3rem] md:px-[1rem] '>
          <Suspense fallback={<LoadingLayout />}>
            <MovieNew />
          </Suspense>
          <Suspense fallback={<LoadingLayout />}>
            <MovieLe />
          </Suspense>
          <Suspense fallback={<LoadingLayout />}>
            <MovieCartoon />
          </Suspense>

          <br />
          {/* <Suspense fallback={<>Loading ...</>}>
          <MoviePopular />{' '}
          </Suspense>
          <br />
          <Suspense fallback={<>Loading ...</>}>
          <MovieSeries />{' '}
          </Suspense>
          <br />
          <Suspense fallback={<>Loading ...</>}>
          <MovieTopRated />{' '}
          </Suspense>
          <br />
          <Suspense fallback={<>Loading ...</>}>
          <MovieCartoon />{' '}
        </Suspense> */}
        </div>
      </main>
    </>
  );
}

export default HomePage;
