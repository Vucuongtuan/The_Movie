import { useParams } from 'react-router-dom';
import { getCastMovie, getDetailMovie } from '../../services/UserService';
import { memo, useEffect, useState } from 'react';
import './style.scss';
import { Container } from 'react-bootstrap';
import { HeroDetail } from './component';
import PreViewMovie from './component/PreViewMovie';
import Poster from './component/Poster';
import Similar from './component/Similar';

function DetailMovie() {
  const { id } = useParams();
  const [dataDetail, setDataDetail] = useState([]);
  const [dataCasts, setDataCasts] = useState([]);
  const [visibleCasts] = useState(10);
  useEffect(() => {
    const getDetail = async () => {
      let res = await getDetailMovie(id);
      setDataDetail([res.data]);
    };
    const getCasts = async () => {
      let resCasts = await getCastMovie(id);
      const casts = resCasts.data.cast;
      setDataCasts(casts);
    };
    getDetail();
    getCasts();
  }, [id]);

  return (
    <div className='h-auto bg-[rgb(6,6,6)]'>
      <div className='h-[800px] relative bg-[rgb(6,6,6)]'>
        <HeroDetail
          dataDetail={dataDetail}
          dataCasts={dataCasts}
          visibleCasts={visibleCasts}
        />
      </div>
      <div
        className='h-[2200px]'
        style={{
          backgroundImage: `
        linear-gradient(to bottom, rgb(10 10 10) 20%, rgb(0 0 0 / 6%) 100%)`,
        }}
      >
        <Container className='mt-24'>
          <PreViewMovie id='preview' />
          <h3 className='mt-24 mb-24'>Movie</h3>
          <h3 className='mb-8'>Poster</h3>
          <Poster />
        </Container>
        <h3 className='ml-[30px]'>Có lên quan</h3>
        <Similar />
      </div>
    </div>
  );
}

export default memo(DetailMovie);
