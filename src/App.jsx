import {Routes,Route} from 'react-router-dom'
import './App.css';
import HomePage from './pages/Home/HomePage';
import Header from './components/header/Header';
import  Contact  from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import GlobalStyle from './components/GlobalStyle';

function App() {


  return (
    <GlobalStyle>
      <Header/>
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/login" element={<Login/>}/>
    {/* <Route path="/signup" element={<Contact/>}/> */}
  </Routes>
    </GlobalStyle>
  );
}

export default App;
