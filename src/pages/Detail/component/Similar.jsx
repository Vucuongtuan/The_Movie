import { useEffect, useState } from 'react';
import { getSimilarMovie } from '../../../services/UserService';
import { Link, useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function Similar() {
  const { id } = useParams();
  const [dataSimilar, setDataSimilar] = useState([]);

  useEffect(() => {
    const getSimilarData = async () => {
      let res = await getSimilarMovie(id);
      setDataSimilar(res.data.results);
    };
    getSimilarData();
  }, [id]);

  // console.log(dataSimilar);
  const urlImage = 'https://image.tmdb.org/t/p/original';
  return (
    <div className='w-full h-[350px] flex '>
      {dataSimilar &&
        dataSimilar.slice(0, 6).map((item) => (
          <Nav.Link
            as={Link}
            to={`/detail/${item.id}`}
            className='h-full w-[260px] m-auto overflow-hidden rounded-md'
            key={item.id}
          >
            <img
              src={`${urlImage}${item.poster_path}`}
              alt=''
              className='h-full w-full'
            />
          </Nav.Link>
        ))}
    </div>
  );
}

export default Similar;
