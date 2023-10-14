import Slider from 'react-slick';

function Cast({ dataCasts, visibleCasts }) {
  const settings = {
    speed: 500,
    infinite: false,
    slidesToShow: window.innerWidth <= 800 ? 3 : 5,
    slidesToScroll: 3,
    initialSlide: 0,
  };
  console.log('Cast render=>>');

  return (
    <div
      className='flex  h-[240px] w-[80%] space-x-8 overflow-hidden
      md:w-full md:h-[200px] 
      sm:w-full 
      '
      style={{
        whiteSpace: 'nowrap',
      }}
    >
      <Slider {...settings} className='w-full h-[230px]'>
        {dataCasts.slice(0, visibleCasts).map((cast) => (
          <div className='w-[160px] h-full flex flex-col ' key={cast.id}>
            <img
              src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
              alt=''
              className='w-full h-full rounded-md'
            />
            <span className='h-[20px] w-full mt-[-70px] bg-[#1211117d]'>
              {cast.name}
            </span>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Cast;
