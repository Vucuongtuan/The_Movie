import { memo, useEffect } from 'react';
import { useState } from 'react';
import { getTrailerMovie } from '../../../services/UserService';
import { useParams } from 'react-router-dom';

import { Carousel } from 'react-bootstrap';
import SkeletonDetail from './Skeleton';

function PreViewMovie() {
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [nav1, setNav1] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [nav2, setNav2] = useState(null);
  const [dataTrailer, setDataTrailer] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const getTraiLer = async () => {
      let res = await getTrailerMovie(id);
      const resData = res.data.results;
      setDataTrailer(resData.slice(0, 6));

      if (res.data.results) {
        setLoad(true);
      }
    };
    getTraiLer();
  }, [id]);

  let slider1, slider2;
  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2 className='p-5'>PREVIEW</h2>
      <Carousel className='h-[700px] w-full' controls='false' interval={null}>
        {dataTrailer.map((item) => (
          <Carousel.Item key={item.id} className='h-[700px] w-full'>
            {load ? (
              // <YouTube
              //   videoId={item.key}
              //   opts={opts}
              //   className='cursor-pointer h-[700px] w-full'
              // />
              <iframe
                className='cursor-pointer h-[700px] w-full'
                src={`http://www.youtube.com/embed/${item.key}`}
                title={item.title}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              ></iframe>
            ) : (
              <SkeletonDetail />
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

export default memo(PreViewMovie);
