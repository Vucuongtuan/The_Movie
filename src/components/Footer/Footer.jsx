import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='h-[90px] w-full bg-customBaseColors mt-10 z-50'>
      <div className='flex justify-between w-[90%] h-full m-auto'>
        <div className='flex items-center h-full'>
          <span className='text-[2.5em]'>The Movie</span>
        </div>
        <div className='w-[400px] flex items-center justify-around h-full'>
          <Nav.Link as={Link} to='/'>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to='/popular'>
            Phổ biến
          </Nav.Link>
          <Nav.Link as={Link} to='/tv_series'>
            TV Series
          </Nav.Link>
          <Nav.Link as={Link} to='/anime'>
            Hoạt hình
          </Nav.Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
