import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './style.scss';
import { Menu, MenuItem } from '../ui/navbar-menu';
import {
  getListOptionNation,
  getListOptionTheLoai,
} from '../../services/movie.api';

import SearchMovie from './searchMovie';
import { Drawer, Sidebar } from 'flowbite-react';
import { Accordion } from 'flowbite-react';

export default function Header({ className }) {
  const [navColor, setNavColor] = useState(false);
  const [active, setActive] = useState(null);
  const [theloai, setTheLoai] = useState([]);
  const [country, setCountry] = useState([]);
  const [isViewMovie, setIsViewMovie] = useState(false);
  const { pathname } = useLocation();
  // const { name } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  useEffect(() => {
    if (
      pathname.includes('/movie/') ||
      pathname.includes('/danh-sach/') ||
      pathname.includes('/the-loai/') ||
      pathname.includes('/quoc-gia/')
    ) {
      setIsViewMovie(true);
    } else {
      setIsViewMovie(false);
    }
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const getList = async () => {
      const [theloai, country] = await Promise.all([
        getListOptionTheLoai(),
        getListOptionNation(),
      ]);
      setTheLoai(theloai.data.data.items);
      setCountry(country.data.data.items);
    };
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 400) {
        setNavColor(true);
      } else {
        setNavColor(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navColor]);
  const drawerMovile = () => (
    <div className='hidden  md:block lg:block'>
      <div className='flex h-full  items-center '>
        <button
          onClick={() => setIsOpen(true)}
          className='my-3  hover:bg-slate-300 rounded-full p-1 transition-all duration-300'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-7 h-7'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
            />
          </svg>
        </button>
      </div>
      <Drawer open={isOpen} onClose={handleClose} className='bg-[#1e1e1e] '>
        <Drawer.Header title='Drawer' />
        <Drawer.Items>
          <Sidebar
            aria-label='Sidebar with multi-level dropdown example '
            className='[&>div]:bg-transparent [&>div]:p-0'
          >
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Sidebar.Item
                  as={Link}
                  to={'/danh-sach/phim-bo'}
                  className='text-white hover:text-black'
                >
                  Phim bộ
                </Sidebar.Item>
                <Sidebar.Item
                  as={Link}
                  to={'/danh-sach/phim-le'}
                  className='text-white hover:text-black'
                >
                  Phim lẻ
                </Sidebar.Item>
                <Sidebar.Item
                  as={Link}
                  to={'/danh-sach/hoat-hinh'}
                  className='text-white hover:text-black'
                >
                  Hoạt hình
                </Sidebar.Item>
                <Accordion>
                  <Accordion.Panel>
                    <Accordion.Title className='h-[40px] text-white  hover:text-black focus:text-white dark:bg-red-500'>
                      Thể loại
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className='  text-sm grid grid-cols-2 gap-1 px-1'>
                        {theloai &&
                          theloai.map((item) => (
                            <Link
                              key={item._id}
                              as={Link}
                              to={'/the-loai/' + item.slug}
                              className='overflow-hidden hover:bg-slate-100 hover:text-black hover:font-semibold hover:rounded-md py-2 px-2'
                            >
                              {item.name}
                            </Link>
                          ))}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>

                  <Accordion.Panel>
                    <Accordion.Title className='h-[40px] text-white   hover:text-black focus:text-white dark:bg-red-500'>
                      Quốc gia
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className='  text-sm grid grid-cols-2 gap-1 px-1'>
                        {country &&
                          country.map((item) => (
                            <Link
                              key={item._id}
                              as={Link}
                              to={'/quoc-gia/' + item.slug}
                              className='overflow-hidden hover:bg-slate-100 hover:text-black hover:font-semibold hover:rounded-md py-2 px-2'
                            >
                              {item.name}
                            </Link>
                          ))}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                </Accordion>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </div>
  );
  return (
    <header
      className={`  top-0 flex transition-all  duration-500 inset-x-0 w-full h-[64px] leading-[64px] lg:h-[70px]  px-[8rem] 2xl:px-[5rem] xl:px-[4rem] lg:px-[1rem] md:px-[1rem]
         mx-auto z-40 md:sticky
         ${
           isViewMovie
             ? 'bg-black sticky mb-2'
             : navColor
             ? 'bg-black sticky mb-2'
             : 'fixed bg-transparent '
         }
         `}
      style={
        navColor
          ? { backgroundColor: '#0a0c0f' }
          : { backgroundColor: 'transparent' }
      }
    >
      <div className='w-[60%] flex  md:pl-2 text-white md:w-[40%] md:block lg:w-[30%]  lg:text-lg'>
        <Link to={'/'} className='px-8 md:px-0 md:w-full lg:px-1'>
          <img src='/logoTC-BG.png' alt='' className='h-full w-full ' />
          <h1 className='hidden'>TC Phim</h1>
        </Link>

        <Menu setActive={setActive}>
          <Link to={'/danh-sach/phim-bo'} className='mr-4'>
            Phim bộ
          </Link>
          <Link to={'/danh-sach/phim-le'} className='mr-4'>
            Phim lẻ
          </Link>
          <Link to={'/danh-sach/hoat-hinh'} className='mr-4'>
            Hoạt hình
          </Link>
          <MenuItem setActive={setActive} active={active} item='Quốc gia '>
            <div className='grid grid-cols-6 gap-2  text-sm '>
              {country &&
                country.map((item) => (
                  <Link
                    key={item._id}
                    as={Link}
                    to={'/quoc-gia/' + item.slug}
                    className='overflow-hidden hover:bg-slate-100 hover:text-black hover:font-semibold hover:rounded-md py-2 px-2'
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item='Thể loại'>
            <div className='  text-sm grid grid-cols-4 gap-6 p-4 overflow-hidden'>
              {theloai &&
                theloai.map((item) => (
                  <Link
                    key={item._id}
                    as={Link}
                    to={'/the-loai/' + item.slug}
                    className='overflow-hidden hover:bg-slate-100 hover:text-black hover:font-semibold hover:rounded-md py-2 px-2'
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          </MenuItem>
          {/* <MenuItem setActive={setActive} active={active} item='Hoạt hình'>
            <div className='flex flex-col space-y-4 text-sm'>
              <HoveredLink href='/hobby'>Hobby</HoveredLink>
              <HoveredLink href='/individual'>Individual</HoveredLink>
              <HoveredLink href='/team'>Team</HoveredLink>
              <HoveredLink href='/enterprise'>Enterprise</HoveredLink>
            </div>
          </MenuItem> */}
        </Menu>
      </div>
      <div className='w-[40%] md:w-[60%] lg:w-[70%]  flex justify-between'>
        <div className='flex-grow'>
          <SearchMovie />
        </div>
        <div className='h-full w-[35px]  py-1  flex justify-end '>
          {drawerMovile()}
          {/* <button
            className='w-8 h-8 text-center mx-2 px-1 rounded-full  bg-yellow-400'
            aria-label='menu'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
              />
            </svg>
          </button> */}
        </div>
      </div>
    </header>
  );
}
