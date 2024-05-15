import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='h-[160px] w-full bg-[#040404] border-t-[1px]  z-50'>
      <div className='flex justify-start items-center w-[90%] h-full m-auto py-2'>
        <div className='flex items-center h-1/3 w-1/4 '>
          <img src='/logoTC.png' alt='' className='h-full' />
        </div>
        <div className='flex-grow flex flex-row h-full space-x-24'>
          <div className=' space-y-2'>
            <h3 className='text-lg font-medium'>Giới thiệu</h3>
            <p className='text-[#ccccc1]'>
              <Link to={'/'} className='text-[#ccccc1]'>
                Trang chủ
              </Link>
            </p>
          </div>
          <div className=' space-y-2'>
            <h3 className='text-lg font-medium'>Liên hế</h3>
            <p className='text-[#ccccc1]'>
              <span>none</span>
            </p>
          </div>
          <div className=' space-y-2'>
            <h3 className='text-lg font-medium'>Các trang</h3>
            <div className='grid grid-cols-2 space-x-3 text-left'>
              <p className='text-[#ccccc1]'>
                <Link to={'/'} className='text-[#ccccc1]'>
                  Trang chủ
                </Link>
              </p>
              <p className='text-[#ccccc1]'>
                <Link to={'/phim-bo'} className='text-[#ccccc1] text-left'>
                  Phim bộ
                </Link>
              </p>
              <p className='text-[#ccccc1]'>
                <Link to={'/phim-le'} className='text-[#ccccc1]'>
                  Phim lẻ
                </Link>
              </p>
              <p className='text-[#ccccc1]'>
                <Link to={'/hoat-hinh'} className='text-[#ccccc1]'>
                  Hoạt hình
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
