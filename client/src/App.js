import { createGlobalStyle } from 'styled-components';
import './App.css';
import Navbar from './Components/Navbar';
import Question from './Components/Question';
import Main from './Pages/Main';

function App() {
  return (
    <>
      <Navbar isLoggedIn={true} />
      <Main />
    </>
  );
}

export default App;
