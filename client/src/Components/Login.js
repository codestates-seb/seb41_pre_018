import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { BiUser } from 'react-icons/bi';
import { BsKey } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../module/thunkModule';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Login_Wrapper = styled.div`
  margin: 50px auto 0 auto;
  padding-top: 10px;
  height: 500px;
  width: 500px;

  .Icon_Wrapper {
    width: 50px;
    margin: 0 auto;

    img {
      width: 100%;
    }
  }

  h1 {
    margin: 0 auto;
    width: 325px;
    font-size: 24px;
  }

  .Login_Form {
    margin: 0 auto;
    width: 300px;
    display: flex;
    flex-direction: column;
    border: solid 1px rgba(0, 0, 0, 0.5);
    padding: 15px;
    box-shadow: 0 5px 10px rgb(0, 0, 0, 0.2);

    .Error_Message {
      margin-top: 2.5px;
      color: rgba(240, 40, 70, 0.9);
    }

    .Input_Wrapper {
      position: relative;
      font-size: 20px;
    }

    .Login_Icon {
      position: absolute;
      top: 25%;
      margin-left: 5px;
    }

    input[type='email'],
    input[type='password'] {
      font-size: 20px;
      padding-left: 30px;
      width: 260px;
      border: none;
      height: 30px;
      background-color: rgba(0, 0, 0, 0.25);
    }

    input[type='submit'] {
      margin: 10px auto 0 auto;
      border: none;
      border-radius: 2px;
      width: 100px;
      padding: 10px;
      color: white;
      font-size: 16px;
      font-weight: bold;
      background-color: rgba(51, 152, 219, 0.9);

      &:hover {
        cursor: pointer;
        scale: 1.025;
        border: solid black 1px;
      }
    }
  }

  .Password_Wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px 0 0;

    a {
      font-size: 13px;
      color: blue;
      text-decoration: none;

      &:visited {
        color: blue;
      }

      &:hover {
        cursor: pointer;
        color: blueviolet;
      }
    }
  }

  .Form_Label {
    font-weight: 600;
  }

  .Signup_Guide {
    margin: 15px auto;
    width: 300px;

    .Signup_Link {
      color: blue;
      text-decoration: none;

      &:visited {
        color: blue;
      }

      &:hover {
        cursor: pointer;
        color: blueviolet;
      }
    }
  }
`;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const onSubmit = async (data) => {
    const { email, password } = data;
    const [token, memberId] = await dispatch(
      loginThunk({ email, password })
    ).then((data) => {
      if (data.payload === false) {
        alert('확인');
      } else {
        return data.payload;
      }
    });
    setCookie('access_token', token.split(' ')[1], { path: '/' });
    setCookie('memberId', memberId, { path: '/' });

    navigate('/');
  };

  return (
    <Login_Wrapper>
      <div className="Icon_Wrapper">
        <img
          src={process.env.PUBLIC_URL + 'Icon.png'}
          alt="Stackoverflow icon"
        />
      </div>
      <h1>Log in</h1>
      <form className="Login_Form" onSubmit={handleSubmit(onSubmit)}>
        <label className="Form_Label" htmlFor="email">
          이메일
        </label>
        <div className="Input_Wrapper">
          <BiUser className="Login_Icon" />
          <input
            id="email"
            {...register('email', {
              required: '이메일을 입력해주세요',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '이메일 형식이 맞는지 다시 한 번 확인해주세요.',
              },
            })}
            type="email"
          />
        </div>
        {errors.email && (
          <span className="Error_Message" role="alert">
            {errors.email.message}
          </span>
        )}

        <div className="Password_Wrapper">
          <label className="Form_Label" htmlFor="password">
            비밀번호
          </label>
          <Link to="/find/credentials">비밀번호를 잊으셨나요?</Link>
        </div>

        <div className="Input_Wrapper">
          <BsKey className="Login_Icon" />
          <input
            id="password"
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              minLength: {
                value: 5,
                message: '최소 길이는 5가 넘어야 합니다.',
              },
            })}
            type="password"
          />
        </div>
        {errors.password && (
          <span className="Error_Message" role="alert">
            {errors.password.message}
          </span>
        )}
        <input value="로그인" type="submit" />
      </form>
      <p className="Signup_Guide">
        회원이 아니신가요? 지금 바로{' '}
        <Link className="Signup_Link" to="/signup">
          회원가입
        </Link>
        하세요.
      </p>
    </Login_Wrapper>
  );
}
