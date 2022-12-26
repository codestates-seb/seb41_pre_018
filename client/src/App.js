import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import './App.css';
import Navbar from './Components/Navbar';
// import Question from './Components/Question';
import Login from './Components/Login';
import Main from './Pages/Main';
import Sign from './Pages/Sign';
import MyPage from './Pages/MyPage';
import Search from './Pages/Search';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f1f2f3;
  }
`
let isLoggedIn = true;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Sign />}/>
        <Route path="/user/:name" element={<MyPage />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
