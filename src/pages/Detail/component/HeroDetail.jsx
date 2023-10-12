import Cast from './Cast';
import '../style.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
function HeroDetail({ dataDetail, dataCasts, visibleCasts }) {
  const { id } = useParams();
  const [overViewEnglish, setOverViewEnglish] = useState('');
  useEffect(() => {
    getOverEnglish();
  });
  const getOverEnglish = async () => {
    const apiKey = 'e9e9d8da18ae29fc430845952232787c';
    const axiosUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
    axios.get(axiosUrl).then((res) => {
      setOverViewEnglish(res.data.overview);
    });
  };

  return (
    <>
      {dataDetail.map((item) => (
        <div key={item.id} className=' hero'>
          <div
            className=' h-[800px] w-full flex bg-center brightness-[.6] '
            style={{
              backgroundImage: `
              linear-gradient(to top, rgb(10 10 10) 20%, rgb(0 0 0 / 6%) 100%),
              url('https://image.tmdb.org/t/p/original${item.backdrop_path}')`,
              backgroundSize: 'cover',
            }}
          ></div>
          <div className='content-hero flex'>
            <div className='content-hero-gr h-full  flex justify-center items-end'>
              <div
                className='hero-image h-[700px] w-[500px] ml-[60px] relative 
              md:ml-[0px] md:h-[500px] md:w-[350px]
              sm:ml-0 sm:h-[400px] sm:w-[270px]
              '
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                  alt=''
                  className='h-full w-full rounded-md '
                />
                <a href='#preview' className='text-white '>
                  <button className='w-full h-[50px] bg-red-600 mt-2 rounded-md'>
                    Xem
                  </button>
                </a>
                <div className='absolute top-2 right-5'>
                  <svg
                    className='w-[60px] h-[60px]'
                    style={{ strokeWidth: ' 3.8' }}
                  >
                    <path
                      d='M28 2.0845 a 26.9155 26.9155 0 1 1 0 53.831 a 26.9155 26.9155 0 1 1 0 -53.831'
                      strokeDasharray={`${item.vote_average * 15}, 100`}
                      fill='none'
                      stroke='#444'
                      strokeWidth='5'
                      className='stroke-green-600'
                    />
                    <text
                      x='50%'
                      y='50%'
                      textAnchor='middle'
                      dy='.3em'
                      className='text-white'
                      fill='white'
                    >
                      {item.vote_average}
                    </text>
                  </svg>
                </div>
              </div>
            </div>
            <div
              className='detail_hero_title 
             
            '
            >
              <div className='h-[600px] flex flex-col w-full'>
                <h1>{item.title}</h1>
                <span className='mt-[-10px] mb-[15px] text-[rgb(115,128,149)]'>
                  {item.original_title}
                </span>
                <div className='flex mb-2'>
                  <span className='mr-2'>Thể loại : {'   '}</span>
                  <span>
                    {item.genres.map((gen) => gen.name).join('  ,  ')}
                  </span>
                </div>

                <div className='mt-2 w-[95%] md:w-full'>
                  <h5>Overview</h5>
                  <span>{item.overview || overViewEnglish}</span>
                </div>
                <div className='mt-3'>
                  <h5 className='border_bottom_red relative mb-4'>
                    Diễn viên chính
                  </h5>

                  <Cast visibleCasts={visibleCasts} dataCasts={dataCasts} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default HeroDetail;
