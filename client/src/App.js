import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { createGlobalStyle } from 'styled-components';
import './App.css';
import Navbar from './Components/Navbar';
// import Question from './Components/Question';
import Login from './Components/Login';
import Main from './Pages/Main';

function App() {
  return (
    <BrowserRouter>
      <Navbar isLoggedIn={true} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
