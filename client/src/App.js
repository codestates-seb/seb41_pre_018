import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import './App.css';
import Navbar from './Components/Navbar';
// import Question from './Components/Question';
import Login from './Components/Login';
import Main from './Pages/Main';
import Sign from './Pages/Sign';
import MyPage from './Pages/MyPage';
import Signup_Completed from './Pages/Signup_Completed';
import Search from './Pages/Search';
import Deleteuser_Completed from './Pages/Deleteuser_Completed';
import Question_Page from './Pages/QuestionPage';

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
        <Route path="/user/:name" element={<MyPage />} />
        <Route path="/signup-completed" element={<Signup_Completed />} />
        <Route path="/search" element={<Search />} />
        <Route path="/deleteuser-completed" element={<Deleteuser_Completed />} />
        <Route path="/question-page" element={<Question_Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
