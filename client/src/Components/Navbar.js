import styled from 'styled-components';
import { RxMagnifyingGlass, RxTextAlignJustify } from 'react-icons/rx';

const Orange_Line = styled.div`
  display: flex;
  flex-grow: 1;
  height: 3px;
  background-color: #f48225;
`;
const Navbar_Background = styled.div`
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
`;

const Logo = styled.img`
  cursor: pointer;
  width: 150px;
  height: 30px;
  margin-left: 10px;
`;
const Search_Wrapper = styled.div`
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
const Search_Input = styled.input`
  flex-grow: 1;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Profile_Image = styled.img`
  cursor: pointer;
  height: 30px;
  width: 30px;
  border-radius: 5px;
`;

const Login_Button = styled.button`
  height: 30px;
  width: 80px;
  border: 1px solid #7aa7c7;
  border-radius: 5px;
  background-color: #e1ecf4;
  color: #3973b3;
  &:hover {
    background-color: #b3d3ea;
    cursor: pointer;
  }
`;

const Signup_Button = styled.button`
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
const Logout_Button = styled.button`
  height: 30px;
  width: 80px;
  border: 1px solid #7aa7c7;
  border-radius: 5px;
  background-color: #e1ecf4;
  color: #3973b3;
  &:hover {
    background-color: #b3d3ea;
    cursor: pointer;
  }
`;

const Navbar = (props) => {
  return (
    <div>
      <Orange_Line />
      <Navbar_Background>
        <RxTextAlignJustify color="gray" size={30} />
        <Logo src="Logo.png" />
        <Search_Wrapper>
          <RxMagnifyingGlass color="gray" size={25} />
          <Search_Input placeholder="Search..." />
        </Search_Wrapper>
        {props.isLoggedIn ? (
          <>
            <Profile_Image src="Sample_Avatar.png" />
            <Logout_Button>Log out</Logout_Button>
          </>
        ) : (
          <>
            <Login_Button>Log in</Login_Button>
            <Signup_Button>Sign up</Signup_Button>
          </>
        )}
      </Navbar_Background>
    </div>
  );
};

export default Navbar;
