import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import './App.css';
import Navbar from './Components/Navbar';
// import Question from './Components/Question';
import Login from './Components/Login';
import Main from './Pages/Main';
import Sign from './Pages/Sign';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f1f2f3;
  }
`
let isLoggedIn = false;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Sign />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
