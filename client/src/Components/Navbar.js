import styled from 'styled-components';
import { RxMagnifyingGlass, RxTextAlignJustify } from 'react-icons/rx';

const Orange_line = styled.div`
  display: flex;
  flex-grow: 1;
  height: 3px;
  background-color: #f48225;
`;
const Navbar_background = styled.div`
  display: flex;
  flex-grow: 1;
  height: 47px;
  background-color: #f8f9f9;
  justify-content: center;
  align-items: center;
  border-bottom: rgb(209, 209, 209);
  box-shadow: 0px 10px 10px 4px rgba(209, 209, 209, 0.56);
  * {
    margin: 10px;
  }
  /* box-shadow: 0 4px 2px -2px gray; */
`;

const Logo = styled.img`
  cursor: pointer;
  width: 150px;
  height: 30px;
  margin-left: 10px;
`;
const Search_wrapper = styled.div`
  width: 800px;
  height: 25px;
  border: 1.5px solid lightgray;
  border-radius: 3px;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 5px;
  &:focus-within {
    border: 1.5px solid lightblue;
    box-shadow: 0px 0px 5px 0px rgba(126, 202, 230, 1);
  }
`;
const Search_input = styled.input`
  flex-grow: 1;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Profile_image = styled.img`
  cursor: pointer;
  height: 30px;
  width: 30px;
  border-radius: 5px;
`;

const Login_button = styled.button`
  height: 30px;
  width: 80px;
  border: 2px solid #7aa7c7;
  border-radius: 5px;
  background-color: #e1ecf4;
  color: #3973b3;
  &:hover {
    background-color: #b3d3ea;
    cursor: pointer;
  }
`;
const Signup_button = styled.button`
  height: 30px;
  width: 80px;
  border: none;
  border-radius: 5px;
  background-color: #0a95ff;
  color: white;
  &:hover {
    background-color: #0074cc;
    cursor: pointer;
  }
`;
const Logout_button = styled.button`
  height: 30px;
  width: 80px;
  border: 2px solid #7aa7c7;
  border-radius: 5px;
  background-color: #e1ecf4;
  color: #3973b3;
  &:hover {
    background-color: #b3d3ea;
    cursor: pointer;
  }
`;

const Navbar = (props) => {
  return props.isLoggedIn ? (
    <div>
      <Orange_line />
      <Navbar_background>
        <RxTextAlignJustify color="gray" size={30} />
        <Logo src="Logo.png" />
        <Search_wrapper>
          <RxMagnifyingGlass color="gray" size={25} />
          <Search_input placeholder="Search..." />
        </Search_wrapper>
        <Profile_image src="Sample_Avatar.png" />
        <Logout_button>Log out</Logout_button>
      </Navbar_background>
    </div>
  ) : (
    <div>
      <Orange_line />
      <Navbar_background>
        <RxTextAlignJustify color="gray" size={30} />
        <Logo src="Logo.png" />
        <Search_wrapper>
          <RxMagnifyingGlass color="gray" size={25} />
          <Search_input placeholder="Search..." />
        </Search_wrapper>
        <Login_button>Log in</Login_button>
        <Signup_button>Sign up</Signup_button>
      </Navbar_background>
    </div>
  );
};

export default Navbar;
