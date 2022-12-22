import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { createGlobalStyle } from 'styled-components';
import './App.css';
import Navbar from './Components/Navbar';
// import Question from './Components/Question';
import Login from './Components/Login';
import Main from './Pages/Main';
import NewQuestion from './Pages/NewQuestion';

function App() {
  return (
    <BrowserRouter>
      <Navbar isLoggedIn={true} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/question/new" element={<NewQuestion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
