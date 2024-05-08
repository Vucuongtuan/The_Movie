import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { HomePage, DetailMovie } from './pages';
import { Header, Footer } from './components';
import GlobalStyle from './components/GlobalStyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ViewMovie from './pages/viewMovie';
import ListMovie from './pages/ListMovie';
import TheLoai from './pages/ListMovie/theloai';
import CountryPage from './pages/ListMovie/quocgia';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import HeaderMobile from './components/header/HeaderMobile';
import { useEffect, useState } from 'react';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 300000,
      staleTime: 60000,
      refetchOnWindowFocus: false,
      retry: 3,
    },
    mutations: {
      throwOnError: true,
    },
  },
});
function App() {
  const [resizeWidth, setResizeWidth] = useState(true);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        setResizeWidth(true);
      } else {
        setResizeWidth(false);
      }
    };
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('resize', handleScroll);
    };
  }, [resizeWidth, location]);

  return (
    <GlobalStyle>
      {' '}
      <QueryClientProvider client={queryClient}>
        {/* {!isLoginPage && <Header />} */}
        {!isLoginPage && resizeWidth ? <Header /> : <HeaderMobile />}
        <Routes>
          <Route path='/' element={<HomePage />} />

          <Route path='/details/:slug' element={<DetailMovie />} />
          <Route path='/movie/:name/:slug' element={<ViewMovie />} />
          <Route path='/danh-sach/:slug' element={<ListMovie />} />
          <Route path='/the-loai/:slug' element={<TheLoai />} />
          <Route path='/quoc-gia/:nation' element={<CountryPage />} />
        </Routes>
        {!isLoginPage && <Footer />}{' '}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GlobalStyle>
  );
}

export default App;
