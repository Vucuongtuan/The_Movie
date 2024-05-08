import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Drawer, Sidebar, TextInput } from 'flowbite-react';
import { Menu } from '../ui/navbar-menu';
import { Accordion } from 'flowbite-react';
import {
  getListOptionNation,
  getListOptionTheLoai,
} from '../../services/movie.api';
export default function HeaderMobile() {
  const [navColor, setNavColor] = useState(false);
  const [isViewMovie, setIsViewMovie] = useState(false);
  const [theloai, setTheLoai] = useState([]);
  const [country, setCountry] = useState([]);
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(true);

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
  }, [pathname]);
  useEffect(() => {
    const getList = async () => {
      const [theloai, country] = await Promise.all([
        getListOptionTheLoai(),
        getListOptionNation(),
      ]);
      console.log(theloai.data.data.items);
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
  return (
    <header
      className='w-full 
  h-[50px] fixed z-40 flex'
    >
      <div className='w-1/2 h-full'>
        <img src='/logoTC-BG.png' alt='' className=' object-cover' />
      </div>
      <div className='w-1/2 h-full flex pt-4 justify-end'>
        <div className='flex  items-center justify-center pr-4'>
          <button
            onClick={() => setIsOpen(true)}
            className=' rounded-full bg-white h-7 w-7 text-center'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 text-black'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
              />
            </svg>
          </button>
        </div>
        <Drawer
          open={isOpen}
          onClose={handleClose}
          className='w-[65vw] bg-[#1e1e1e] text-white'
        >
          <Drawer.Header title='MENU' titleIcon={() => <></>} />
          <Drawer.Items>
            <div className='w-full flex  text-white flex-col'>
              <Link
                to={'/danh-sach/phim-bo'}
                className='w-full py-2 text-left mb-2 '
              >
                Phim bộ
              </Link>
              <Link
                to={'/danh-sach/phim-le'}
                className='w-full py-2 text-left mb-2 '
              >
                Phim lẻ
              </Link>
              <Link
                to={'/danh-sach/hoat-hinh'}
                className='w-full py-2 text-left mb-2 '
              >
                Hoạt hình
              </Link>
              <Accordion className=' rounded-none py-2 text-white'>
                <Accordion.Panel className='bg-[#1e1e1e]'>
                  <Accordion.Title className='text-white hover:text-[#1e1e1e]'>
                    Quốc gia
                  </Accordion.Title>
                  <Accordion.Content>
                    <div className='grid grid-cols-2'>
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
            </div>
          </Drawer.Items>
        </Drawer>
        <Drawer
          open={isOpen}
          onClose={handleClose}
          className='w-[65vw] bg-[#1e1e1e] text-white'
        >
          <Drawer.Header title='MENU' titleIcon={() => <></>} />
          <Drawer.Items>
            <div className='w-full flex  text-white flex-col'>
              <Link
                to={'/danh-sach/phim-bo'}
                className='w-full py-2 text-left mb-2  px-2'
              >
                Phim bộ
              </Link>
              <Link
                to={'/danh-sach/phim-le'}
                className='w-full py-2 text-left mb-2  px-2'
              >
                Phim lẻ
              </Link>
              <Link
                to={'/danh-sach/hoat-hinh'}
                className='w-full py-2 text-left mb-2  px-2'
              >
                Hoạt hình
              </Link>
              <Accordion className=' rounded-none py-2 text-white mb-2 border-none px-2'>
                <Accordion.Panel className='bg-[#1e1e1e]'>
                  <Accordion.Title className='text-white hover:text-[#1e1e1e]'>
                    Quốc gia
                  </Accordion.Title>
                  <Accordion.Content>
                    <div className='grid grid-cols-2'>
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
              <Accordion className=' rounded-none py-2 text-white mb-2 border-none px-2'>
                <Accordion.Panel className='bg-[#1e1e1e]'>
                  <Accordion.Title className='text-white hover:text-[#1e1e1e]'>
                    Thể loại
                  </Accordion.Title>
                  <Accordion.Content>
                    <div className='grid grid-cols-2'>
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
              </Accordion>
            </div>
          </Drawer.Items>
        </Drawer>
      </div>
    </header>
  );
}
