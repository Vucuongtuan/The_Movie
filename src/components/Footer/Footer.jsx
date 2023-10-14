import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='h-[80px] w-full bg-customBaseColors  z-50'>
      <div className='flex justify-start items-center w-[90%] h-full m-auto'>
        <div className='flex items-center h-full'>
          <span className='text-[1.8em]'>The Movie</span>
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
