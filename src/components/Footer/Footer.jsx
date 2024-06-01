import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='h-[70px] w-full bg-[#040404] border-t-[1px]  z-50'>
      <div className='flex justify-between items-center w-[90%] h-full m-auto md:w-full'>
        <div className='flex items-center h-1/3 w-1/4 se:w-[180px] px-8'>
          <img
            src='/logoTC.png'
            alt=''
            className='h-[50px] w-[200px] object-cover se:w-full se:h-full'
          />
        </div>
        <div className='flex-grow flex justify-end items-center h-full '>
          <div className=' space-x-4 se:space-x-2 se:pr-1'>
            <Link to={'/'} className='text-[#ccccc1] se:text-[0.7rem]'>
              Trang chủ
            </Link>

            <Link to={'/'} className='text-[#ccccc1] se:text-[0.7rem]'>
              Trang chủ
            </Link>
            <Link
              to={'/phim-bo'}
              className='text-[#ccccc1] se:text-[0.7rem] text-left'
            >
              Phim bộ
            </Link>
            <Link to={'/phim-le'} className='text-[#ccccc1] se:text-[0.7rem]'>
              Phim lẻ
            </Link>
            <Link
              to={'/hoat-hinh'}
              className='text-[#ccccc1] se:text-[0.7rem] '
            >
              Hoạt hình
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
