import React, { useEffect, useState } from 'react';
import { Navbar, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Login } from '../../pages';
import './style.scss';

export default function Header() {
  const [navColor, setNavColor] = useState('transparent');
  const [showOffcanvas, setShowOffCanvas] = useState(false);
  const setData = localStorage.data;
  const handleClose = () => {
    setShowOffCanvas(!showOffcanvas);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 400) {
        setNavColor('rgb(32,33,36)');
      } else {
        setNavColor('transparent');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <Navbar
        style={{ backgroundColor: `${navColor}`, transition: '1s' }}
        className={`w-full  fixed top-0 right-0 z-50 ${
          window.scrollY >= 400 ? `bg-[rgb(32, 33, 36)]` : `bg-transparent`
        } `}
      >
        <div className={`navbar-container flex justify-between m-auto `}>
          <Navbar.Brand as={Link} to='/' style={{ color: '#fff' }}>
            The Movie
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end '>
            <div className='header-right  flex justify-between '>
              <Form className='form-search mr-5 w-[80%] '>
                <input
                  type='text'
                  className='search1 border-b-[1px] border-b-slate-300 outline-0 h-full  bg-transparent '
                  placeholder='  Search ...'
                />
              </Form>
              {setData && (
                <>
                  <Button
                    onClick={handleClose}
                    className=' btn-system d-inline mx-2 bg-slate-600 border-0'
                  >
                    System
                  </Button>
                  <Login
                    handleClose={handleClose}
                    showOffcanvas={showOffcanvas}
                  />
                </>
              )}
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
      {/* <Navbar
      key='md'
      expand='md'
      style={{backgroundColor:`${navColor}`,transition:'1s'}}
      className="w-full color-w fixed top-0 right-0 z-50 "
      >
        <div className='w-[80%] m-auto flex justify-between'>
          <Navbar.Brand href="#" style={{color:'#fff'}}>The Movie</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
              <Nav className="justify-content-end flex-grow-1 pe-3">
              <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" activeKey={location.pathname}>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/contact">Quản lý</Nav.Link>
            </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 bg-transparent placeholder-white  text-white"
                  aria-label="Search"
                />
              </Form>
              <Button 
              onClick={handleClose}
              className="d-inline mx-2 bg-slate-600 border-0"
              >
                System
              </Button>
              <Login
              showOffcanvas={showOffcanvas}
              />
          </Navbar.Collapse>
              </Nav>
        </div>
      </Navbar> */}
    </>
  );
}
