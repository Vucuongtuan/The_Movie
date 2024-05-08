import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './style.scss';
import { Menu, MenuItem } from '../ui/navbar-menu';
import {
  getListOptionNation,
  getListOptionTheLoai,
} from '../../services/movie.api';

import SearchMovie from './searchMovie';
import { Drawer } from 'flowbite-react';

export default function Header({ className }) {
  const [navColor, setNavColor] = useState(false);
  const [active, setActive] = useState(null);
  const [theloai, setTheLoai] = useState([]);
  const [country, setCountry] = useState([]);
  const [isViewMovie, setIsViewMovie] = useState(false);
  const { pathname } = useLocation();
  // const { name } = useParams();

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
      className={`  top-0 flex transition-all  duration-500 inset-x-0 w-full h-[64px] leading-[64px] 
         mx-auto z-40
         ${
           isViewMovie
             ? 'bg-black sticky mb-2'
             : navColor
             ? 'bg-black sticky mb-2'
             : 'fixed bg-transparent'
         }
         `}
      style={
        navColor
          ? { backgroundColor: '#0a0c0f' }
          : { backgroundColor: 'transparent' }
      }
    >
      <div className='w-2/3 flex pl-16 text-white '>
        <Link to={'/'} className='px-8'>
          <img src='/logoTC-BG.png' alt='' className='h-full w-full' />
          <h1 className='hidden'>TC Phim</h1>
        </Link>

        <Menu setActive={setActive}>
          <Link to={'/danh-sach/phim-bo'}>Phim bộ</Link>
          <Link to={'/danh-sach/phim-le'}>Phim lẻ</Link>
          <Link to={'/danh-sach/hoat-hinh'}>Hoạt hình</Link>
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
      <div className='w-1/3'>
        <SearchMovie />
      </div>
    </header>
  );
}
