import { useEffect, useState } from 'react';
import { getMoviePopular } from '../../../services/UserService';
import SkeletonLoading from './Skeleton';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function MoviePopular() {
  const [dataPopular, setDataPopular] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getDataPopular();
  }, []);
  const getDataPopular = async () => {
    let res = await getMoviePopular();
    let result = res.data.results;
    const data = result.slice(0, 10);
    setDataPopular(data);
    setLoading(true);
  };
  return (
    <>
      <div className='flex justify-between'>
        <h2>Phổ biến</h2>
        <button className='h-[30px] w-24 mt-2  rounded-md border-1  border-current'>
          Xem Thêm
        </button>
      </div>
      <br />
      <div
        className='h-auto w-full grid gap-x-3 gap-y-4
     xl:grid-cols-5 
     lg:grid-cols-5  
     md:grid-cols-4
     sm:grid-cols-2'
      >
        {loading ? (
          dataPopular.map((item, index) => (
            <Nav.Link
              as={Link}
              to={`/detail/${item.id}`}
              className='h-full w-full m-auto flex flex-col cursor-pointer'
              key={index}
            >
              <div className='h-[85%] w-full overflow-hidden rounded-md'>
                <img
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                  alt=''
                  className='h-full w-full rounded-md hover:scale-105 duration-500 ease-out'
                />
              </div>
              <span className='text-xl h-[15%] flex items-center'>
                {item.title}
              </span>
            </Nav.Link>
          ))
        ) : (
          <SkeletonLoading />
        )}
      </div>
    </>
  );
}

export default MoviePopular;
