import styled from 'styled-components';
import { RxMagnifyingGlass, RxTextAlignJustify } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { loginBoolean } from '../module/loginBooleanSlice';

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
  *:not(a) {
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

const Navbar = () => {
  const navigate = useNavigate();
  const { isLogin, memberId } = useSelector((state) => state.loginBoolean);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const dispatch = useDispatch();
  const navigateToSearch = () => {
    navigate('/search');
  };
  const logoutHandle = () => {
    removeCookie('access_token');
    dispatch(loginBoolean({ isLogin: false, memberId: '' }));
    navigate('/');
  };
  return (
    <div>
      <Orange_Line />
      <Navbar_Background>
        <RxTextAlignJustify color="gray" size={30} />
        <Link to="/">
          <Logo src={process.env.PUBLIC_URL + '/Logo.png'} />
        </Link>
        <Search_Wrapper>
          <RxMagnifyingGlass color="gray" size={25} />
          <Search_Input
            placeholder="Search..."
            onChange={(e) => console.log(e.target.value)}
            onKeyUp={(e) => (e.keyCode === 13 ? navigateToSearch() : null)}
          />
        </Search_Wrapper>
        {isLogin ? (
          <>
            <Link to={`/user/${memberId}`}>
              <Profile_Image
                src={process.env.PUBLIC_URL + '/Sample_Avatar.png'}
              />
            </Link>
            <Logout_Button onClick={logoutHandle}>Log out</Logout_Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Login_Button>Log in</Login_Button>
            </Link>
            <Link to="/signup">
              <Signup_Button>Sign up</Signup_Button>
            </Link>
          </>
        )}
      </Navbar_Background>
    </div>
  );
};

export default Navbar;
