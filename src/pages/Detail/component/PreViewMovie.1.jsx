import { useEffect } from 'react';
import { useState } from 'react';
import { getTrailerMovie } from '../../../services/UserService';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

export function PreViewMovie() {
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [dataTrailer, setDataTrailer] = useState([]);
  useEffect(() => {
    const getTraiLer = async () => {
      let res = await getTrailerMovie(id);
      setDataTrailer(res.data.results);
    };
    getTraiLer();
  }, [id]);

  let slider1, slider2;
  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleIframeClick = (iframe) => {
    iframe.setAttribute(
      'src',
      `https://www.youtube.com/embed/${iframe.getAttribute('data-key')}`,
    );
  };

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
              data-key={trl.key}
              title={trl.name}
              allowFullScreen
              onClick={(e) => handleIframeClick(e.target)}
              srcDoc=''
            ></iframe>
          </div>
        ))}
      </Slider>
    </>
  );
}
