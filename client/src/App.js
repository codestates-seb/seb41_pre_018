import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import './App.css';
import Navbar from './Components/Navbar';
// import Question from './Components/Question';
import Login from './Components/Login';
import Main from './Pages/Main';
import Sign from './Pages/Sign';
import MyPage from './Pages/MyPage';
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f1f2f3;
  }
`;
function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Navbar isLoggedIn={true} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/user/:name" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
