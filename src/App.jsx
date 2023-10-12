import { Routes, Route } from 'react-router-dom';
import './App.css';
import { HomePage, Register, DetailMovie } from './pages';
import { Header, Footer } from './components';
import GlobalStyle from './components/GlobalStyle';

function App() {
  return (
    <GlobalStyle>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/detail/:id' element={<DetailMovie />} />
      </Routes>
      <Footer />
    </GlobalStyle>
  );
}

export default App;
