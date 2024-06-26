import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Header, Footer } from './components';
import GlobalStyle from './components/GlobalStyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, lazy, useEffect, useState } from 'react';
import LoadingElement from './components/LoadingElement';
import SignUp from './pages/Auth/signUp';
import SignIn from './pages/Auth/signIn';
import Profile from './pages/Profile';
import ListMovieProfile from './pages/Profile/listMovie';
const HomePage = lazy(() => import('./pages/Home/HomePage'));
const DetailMovie = lazy(() => import('./pages/Detail/DetailMovie'));
const ViewMovie = lazy(() => import('./pages/viewMovie'));
const ListMovie = lazy(() => import('./pages/ListMovie'));
const TheLoai = lazy(() => import('./pages/ListMovie/theloai'));
const CountryPage = lazy(() => import('./pages/ListMovie/quocgia'));
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
  // const router = useNavigate();
  const isLoginPage =
    location.pathname === '/sign-in' || location.pathname === '/sign-up';

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
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingElement />}>
          {!isLoginPage && <Header />}
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/list' element={<ListMovieProfile />} />

            <Route path='/details/:slug' element={<DetailMovie />} />
            <Route path='/movie/:name/:slug' element={<ViewMovie />} />
            <Route path='/danh-sach/:slug' element={<ListMovie />} />
            <Route path='/the-loai/:slug' element={<TheLoai />} />
            <Route path='/quoc-gia/:nation' element={<CountryPage />} />
          </Routes>
          {!isLoginPage && <Footer />}{' '}
        </Suspense>
      </QueryClientProvider>
    </GlobalStyle>
  );
}

export default App;
