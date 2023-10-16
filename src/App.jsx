import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { HomePage, Register, DetailMovie, Login } from './pages';
import { Header, Footer } from './components';
import GlobalStyle from './components/GlobalStyle';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  return (
    <GlobalStyle>
      {!isLoginPage && <Header />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/detail/:id' element={<DetailMovie />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </GlobalStyle>
  );
}

export default App;
