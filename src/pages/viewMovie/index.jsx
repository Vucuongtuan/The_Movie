import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, Button } from 'flowbite-react';
import LinkMovie from './components/linkMovie';
import { getDetailMovie } from '../../services/movie.api';
import VideoPlayer from '../../components/HLSVideo';
import LoadingElement from '../../components/LoadingElement';
import ErrorElement from '../../components/Error';
import Comment from './components/comment';

export default function ViewMovie() {
  const [linkMovie, setLinkMovie] = useState([]);
  const [dataMovie, setDataMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { name, slug } = useParams();
  const tap = slug ? parseInt(slug.split('-')[1]?.trim()) : 1;
  localStorage.setItem(dataMovie?.data?.item?.slug, tap);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = await getDetailMovie(name);
        const serverData = res?.data.data?.item?.episodes[0]?.server_data;
        let link;
        setDataMovie(res?.data);
        if (slug === 'full') {
          link = serverData[0];
        } else {
          const tapp = slug.split('-')[1]?.trim();
          if (serverData) {
            for (let i = 0; i < serverData.length; i++) {
              if (parseInt(serverData[i].slug) === tapp) {
                link = serverData[i];
                break;
              }
            }
          }
        }
        setLinkMovie([link?.link_embed, 'link_embed']);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, name]);
  console.log('====================================');
  console.log(linkMovie[0]);
  console.log('====================================');
  const elementVideo = () => {
    if (linkMovie[1] === 'link_embed') {
      return <LinkMovie linkMovie={linkMovie[0]} />;
    } else if (linkMovie[1] === 'link_m3u8') {
      return <VideoPlayer src={linkMovie[0]} />;
    } else if (slug === 'trailer') {
      return (
        <iframe
          src={dataMovie?.data?.item.trailer_url
            .replace('www.youtube.com', 'www.youtube.com/embed')
            .replace('/watch?v=', '/')}
          title={dataMovie?.data?.item.name}
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerpolicy='strict-origin-when-cross-origin'
          allowfullscreen
          className='w-full h-[600px] rounded-md'
        ></iframe>
      );
    }
  };
  if (isLoading) {
    return <LoadingElement />;
  }
  if (isError) {
    return <ErrorElement />;
  }
  console.log('Tap====================================');
  console.log(
    dataMovie?.data?.item?.episodes[0]?.server_data.find(
      (episode) => parseInt(episode.slug) === tap,
    ).link,
  );
  console.log('====================================');
  return (
    <main className=' m-auto mb-4 px-[8rem] 2xl:px-[5rem] xl:px-[4rem] lg:px-[3rem] md:px-[1rem]'>
      <Breadcrumb aria-label='Default breadcrumb example' className='py-2'>
        <Breadcrumb.Item>
          <Link to={'/'} className='no-underline'>
            Trang chủ
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/details/${name}`} className='no-underline'>
            {name}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{slug}</Breadcrumb.Item>
      </Breadcrumb>

      <section className='w-full h-auto'>
        <div className='h-[619px] w-full md:h-[300px]'>{elementVideo()}</div>
        <div className='w-full py-1 mt-2 flex justify-end'>
          {dataMovie?.data?.item?.episodes[0]?.server_data[0].slug === '' ? (
            <></>
          ) : (
            <>
              <Button
                onClick={() => {
                  setLinkMovie([
                    dataMovie?.data?.item?.episodes[0]?.server_data.find(
                      (episode) => parseInt(episode.slug) === tap,
                    ).link_embed,
                    'link_embed',
                  ]);
                }}
                disabled={linkMovie[1] === 'link_embed'}
                className={` 
             ml-2 rounded-md  font-medium
             ${
               linkMovie[1] === 'link_embed'
                 ? 'cursor-no-drop bg-red-600 '
                 : 'hover:bg-white hover:text-black'
             }`}
              >
                Server 1
              </Button>
              <Button
                onClick={() => {
                  console.log('link====================================');
                  console.log(
                    dataMovie?.data?.item?.episodes[0]?.server_data.find(
                      (episode) => parseInt(episode.slug) === tap,
                    ).link_m3u8,
                  );
                  console.log('====================================');
                  setLinkMovie([
                    dataMovie?.data?.item?.episodes[0]?.server_data.find(
                      (episode) => parseInt(episode.slug) === tap,
                    ).link_m3u8,
                    'link_m3u8',
                  ]);
                }}
                disabled={linkMovie[1] === 'link_m3u8'}
                className={`
              ml-2 rounded-md  font-medium
              ${
                linkMovie[1] === 'link_m3u8'
                  ? 'cursor-no-drop bg-red-600 '
                  : 'hover:bg-white hover:text-black'
              }
              `}
              >
                Server 2
              </Button>
            </>
          )}
        </div>
      </section>
      <section className='w-full h-auto'>
        <h2>Danh sách tập</h2>
        <div className='w-full py-4 flex flex-wrap overflow-y-scroll max-h-[800px]'>
          {dataMovie?.data?.item?.episodes[0]?.server_data[0].slug === '' ? (
            <Link
              to={`/movie/${dataMovie?.data?.item?.slug}/trailer`}
              className={` my-1 mx-1 no-underline rounded-md py-1 px-3 border-1 hover:bg-slate-100 hover:text-black font-medium transform transition duration-200 hover:shadow-md  ${
                ('tap-', 'trailer' === slug ? `bg-red-600 mr-1` : ` mx-1`)
              }`}
            >
              Trailer
            </Link>
          ) : (
            dataMovie?.data?.item?.episodes[0]?.server_data?.map((movie) => {
              const movieSlug = movie.slug.startsWith('tap-')
                ? movie.slug
                : `tap-${movie.slug}`;
              return (
                <Link
                  key={movie.name}
                  to={`/movie/${dataMovie?.data?.item?.slug}/${
                    slug === 'full' ? 'full' : movieSlug
                  }`}
                  className={`my-1 mx-1 no-underline rounded-md py-1 px-3 border-1 hover:bg-slate-100 hover:text-black font-medium transform transition duration-200 hover:shadow-md ${
                    slug !== 'full'
                      ? movieSlug === slug
                        ? 'bg-red-600 mr-1'
                        : 'mx-1'
                      : 'full' === slug
                      ? 'bg-red-600 mr-1'
                      : 'mx-1'
                  }`}
                >
                  Tập {movie.name}
                </Link>
              );
            })
          )}
        </div>
      </section>
      <Comment slug={slug} />
    </main>
  );
}
