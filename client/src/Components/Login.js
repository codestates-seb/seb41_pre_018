import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { BiUser } from 'react-icons/bi';
import { BsKey } from 'react-icons/bs';

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

    span {
      color: rgba(240, 40, 70, 0.95);
    }

    label {
      margin-top: 5px;
      font-size: 12px;
      font-weight: 600;
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
      border: none;
      width: 75px;
      margin-top: 10px;
      padding: 5px;
      font-size: 14px;
      background-color: rgba(241, 223, 91, 0.5);

      &:hover {
        cursor: pointer;
        scale: 1.025;
        border: solid black 1px;
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
  const onSubmit = (data) => console.log(data);

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
        <label htmlFor="email">이메일</label>
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
        {errors.email && <span role="alert">{errors.email.message}</span>}

        <label htmlFor="password">비밀번호</label>

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
        {errors.password && <span role="alert">{errors.password.message}</span>}
        <input type="submit" />
      </form>
    </Login_Wrapper>
  );
}
