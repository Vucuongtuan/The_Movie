import { useEffect, useState } from 'react';
import { Carousel, Nav } from 'react-bootstrap';
import { getTrendingMovie } from '../../../services/UserService';
import styles from './style.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function MovieNew() {
  const [newMovie, setNewMovie] = useState([]);
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  useEffect(() => {
    ApiKey();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setWidthScreen(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const ApiKey = async () => {
    try {
      let res = await getTrendingMovie();
      setNewMovie(res.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Carousel
      className={cx('Introduction')}
      interval='5000'
      controls={false}
      touch={true}
    >
      {newMovie.map((item) => (
        <Carousel.Item key={item.id} className={cx('slide-show')}>
          <div className={cx('box-slide')}>
            <div className={cx('title-new-movie')}>
              <div className={cx('name-movie')}>
                <div className={cx('poster-image')}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    alt=''
                  />
                </div>
                <div className={cx('overview')}>
                  <h1 style={{ color: 'white' }}>{item.original_title}</h1>
                  <p>
                    Rankting : {item.vote_average} {''}
                  </p>
                  <p>Vote : {item.vote_count} </p>
                  <p className={cx('overview-movie')}>{item.overview}</p>
                  <Nav.Link as={Link} to={`detail/${item.id}`}>
                    <button className={cx('btn-ct')}>Xem chi tiết</button>
                  </Nav.Link>
                </div>
              </div>
            </div>
            <img
              src={
                widthScreen >= 768
                  ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
                  : `https://image.tmdb.org/t/p/original${item.poster_path}`
              }
              alt=''
              className={cx('box-image')}
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default MovieNew;
