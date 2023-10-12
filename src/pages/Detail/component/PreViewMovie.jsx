import { useEffect } from 'react';
import { useState } from 'react';
import { getTrailerMovie } from '../../../services/UserService';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

function PreViewMovie() {
  const { id } = useParams();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [dataTrailer, setDataTrailer] = useState([]);

  useEffect(() => {
    getTraiLer();
  }, []);
  let slider1, slider2;
  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, []);
  const getTraiLer = async () => {
    let res = await getTrailerMovie(id);
    setDataTrailer(res.data.results);
  };
  console.log(dataTrailer);
  return (
    <>
      <h2 className='p-5'>PREVIEW</h2>
      <Slider
        asNavFor={nav2}
        ref={(slider) => (slider1 = slider)}
        className='h-[600px] w-full'
      >
        {dataTrailer.map((trl) => (
          <div key={trl.id}>
            <iframe
              width='100%'
              height='600px'
              src={`https://www.youtube.com/embed/${trl.key}`}
              title={trl.name}
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </Slider>
    </>
  );
}

export default PreViewMovie;
