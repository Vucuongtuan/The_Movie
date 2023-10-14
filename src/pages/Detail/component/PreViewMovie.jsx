import { memo, useEffect } from 'react';
import { useState } from 'react';
import { getTrailerMovie } from '../../../services/UserService';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import YouTube from 'react-youtube';
import SkeletonDetail from './Skeleton';

function PreViewMovie() {
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [dataTrailer, setDataTrailer] = useState([]);
  const [load, setLoad] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const getTraiLer = async () => {
      let res = await getTrailerMovie(id);
      setDataTrailer(res.data.results);

      if (res.data.results) {
        setLoad(true);
      }
    };
    getTraiLer();
  }, [currentIndex, id]);

  let slider1, slider2;
  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const nextSlide = () => {
    setCurrentIndex(dataTrailer[currentIndex + 1]);
  };

  const prevSlide = () => {
    setCurrentIndex(dataTrailer[currentIndex - 1]);
  };

  console.log(dataTrailer);
  console.log(dataTrailer.key);
  return (
    <>
      <h2 className='p-5'>PREVIEW</h2>
      {load ? (
        <>
          <button onClick={prevSlide}>Previous</button>
          <div className='h-full w-full'>
            {/* <iframe
              width='100%'
              height='600'
              src={`https://www.youtube.com/embed/${dataTrailer.key}`}
              title='asd'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            ></iframe> */}
          </div>
          <button onClick={nextSlide}>Next</button>
          {/* {dataTrailer.map((trl) => ( */}
          {/* ))} */}
          {/* <iframe
            width='1259'
            height='708'
            src='https://www.youtube.com/embed/vPz8ftK_4bk?list=RDvPz8ftK_4bk'
            title='Obito - Đánh Đổi ft. MCK'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          ></iframe> */}
        </>
      ) : (
        <SkeletonDetail />
      )}
    </>
  );
}

export default memo(PreViewMovie);
