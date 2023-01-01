import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useCallback } from 'react';
import { AiFillTrophy, AiFillTags } from 'react-icons/ai';
import { RiQuestionnaireFill } from 'react-icons/ri';
import { BiCaretUp } from 'react-icons/bi';
import { BsCaretDown } from 'react-icons/bs';
import { signinThunk, emaillCheckThunk } from '../module/thunkModule';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Sign_Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  & > * {
    margin: 0px 50px;
  }
`;
const Sign_Text_Box = styled.div`
  height: 300px;
  width: 400px;
  display: flex;
  flex-direction: column;

  & > h3 {
    font-weight: 500;
    font-size: 25px;
  }
  .Sign_Up_Content_Icon {
    color: #0995fe;
    font-size: 22px;
  }

  & > span {
    margin-top: 10px;
    font-size: 11px;
    color: grey;
  }
`;
const Sign_Text_Content_Box = styled.div`
  margin: 10px 0px;
  height: 22px;
  display: flex;
  align-items: center;

  & > span {
    margin-left: 10px;
    font-size: 15px;
  }

  & > div {
    display: flex;
    align-items: center;
    flex-direction: column;

    .Sign_Up_Icon_Up {
      color: #0995fe;
      font-size: 25px;
      position: relative;
      top: 6px;
    }
    .Sign_up_Icon_Down {
      color: #0995fe;
      font-size: 20px;
      position: relative;
      bottom: 6px;
    }
  }
`;
const Sign_Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 300px;
  height: 500px;
  border-radius: 10px;
  box-shadow: 1px 1px 20px 1px #b3d3ea;
`;

const Sign_Input = styled.input`
  height: 20px;
  width: 244px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;

  &:focus {
    outline: 3px solid #b3d3ea;
  }
`;
const Sign_Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
  &:hover {
    cursor: pointer;
  }
`;
const Sign_Text = styled.span`
  margin-top: 3px;
  font-size: 12px;
`;
const Sign_Input_Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90px;
  width: 250px;
  .Allow_Text {
    color: #3973b3;
  }
  .Error_Text {
    color: #f78181;
  }
`;
const Sign_Submit = styled.input`
  height: 40px;
  width: 250px;
  border: 1px solid #7aa7c7;
  border-radius: 5px;
  background-color: #e1ecf4;
  color: #3973b3;
  &:hover {
    background-color: #b3d3ea;
    cursor: pointer;
  }
  &:disabled {
    background-color: #eeeeee;
    cursor: auto;
  }
`;
const Email_Verify_Button = styled.input`
  margin-top: 5px;
  height: 20px;
  width: 250px;
  border: 1px solid #7aa7c7;
  border-radius: 5px;
  background-color: #e1ecf4;
  color: #3973b3;
  &:hover {
    background-color: #b3d3ea;
    cursor: pointer;
  }
  &:disabled {
    background-color: #eeeeee;
    cursor: auto;
  }
`;

function Sign() {
  const { register, handleSubmit, reset, watch, getValues } = useForm();
  const [verify, setVerify] = useState({
    emailVerify: { boolean: false },
    usernameVerify: { boolean: false },
    passwordVerify: { boolean: false },
    verifyPasswordVerify: { boolean: false },
    verifyEmailVerify: { boolean: false },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, username, password, verifyPassword } = watch();
  const passwordRegExp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,12}$/;
  const emailRegExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  const usernameRegExp = /[A-Za-z0-9가-힇]{2,20}/;

  useEffect(() => {
    if (emailRegExp.test(email)) {
      setVerify({
        ...verify,
        emailVerify: { ...verify.emailVerify, boolean: true, email: email },
      });
    } else {
      setVerify({ ...verify, emailVerify: { boolean: false } });
    }
  }, [email]);
  useEffect(() => {
    if (usernameRegExp.test(username)) {
      setVerify({
        ...verify,
        usernameVerify: {
          ...verify.usernameVerify,
          boolean: true,
          username: username,
        },
      });
    } else {
      setVerify({ ...verify, usernameVerify: { boolean: false } });
    }
  }, [username]);
  useEffect(() => {
    if (passwordRegExp.test(password)) {
      setVerify({
        ...verify,
        passwordVerify: {
          ...verify.passwordVerify,
          boolean: true,
          password: password,
        },
      });
    } else {
      setVerify({ ...verify, passwordVerify: { boolean: false } });
    }
  }, [password]);
  useEffect(() => {
    if (verifyPassword === verify.passwordVerify.password) {
      setVerify({ ...verify, verifyPasswordVerify: { boolean: true } });
    } else {
      setVerify({ ...verify, verifyPasswordVerify: { boolean: false } });
    }
  }, [verifyPassword]);
  const onSubmit = async (userdata) => {
    const { email, username, password } = userdata;
    const response = await dispatch(
      signinThunk({ email, username, password })
    ).then((data) => data.payload.status);
    navigate('/signup-completed');
    reset();
  };
  const onError = (e) => {
    console.error(e);
  };
  const idSubmitHandle = async () => {
    // const response = dispatch(emaillCheckThunk(verify.emailVerify.email)).then(
    //   (data) => data.payload
    // );
    const response = true;
    if (response === true && verify.emailVerify.boolean === true) {
      setVerify({ ...verify, verifyEmailVerify: { boolean: true } });
    } else {
      setVerify({ ...verify, verifyEmailVerify: { boolean: false } });
    }
  };
  return (
    <Sign_Container>
      <Sign_Text_Box>
        <h3>Join the Stack Overflow community</h3>
        <Sign_Text_Content_Box>
          <RiQuestionnaireFill className="Sign_Up_Content_Icon" />
          <span>Get unstuck - ask a question</span>
        </Sign_Text_Content_Box>
        <Sign_Text_Content_Box>
          <div>
            <BiCaretUp className="Sign_Up_Icon_Up" />
            <BsCaretDown className="Sign_up_Icon_Down" />
          </div>
          <span>Unlock new privileges like voting and commenting</span>
        </Sign_Text_Content_Box>
        <Sign_Text_Content_Box>
          <AiFillTags className="Sign_Up_Content_Icon" />
          <span>Save your favorite tags, filters, and jobs</span>
        </Sign_Text_Content_Box>
        <Sign_Text_Content_Box>
          <AiFillTrophy className="Sign_Up_Content_Icon" />
          <span>Earn reputation and badges</span>
        </Sign_Text_Content_Box>
        <span>
          Collaborate and share knowledge with a private group for FREE. Get
          Stack Overflow for Teams free for up to 50 users.
        </span>
      </Sign_Text_Box>
      <Sign_Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Sign_Input_Container>
          <Sign_Label htmlFor="email">Email</Sign_Label>
          <Sign_Input id="email" {...register('email')} required />

          <Email_Verify_Button
            type="button"
            onClick={idSubmitHandle}
            value="중복확인"
            disabled={!verify.emailVerify.boolean}
          />

          {getValues('email') === '' ? null : verify.verifyEmailVerify
              .boolean === true && verify.emailVerify.boolean === true ? (
            <Sign_Text className="Allow_Text">
              사용가능한 이메일입니다.
            </Sign_Text>
          ) : verify.emailVerify.boolean === true ? (
            <Sign_Text className="Allow_Text">
              올바른 형식의 이메일입니다.
            </Sign_Text>
          ) : (
            <Sign_Text className="Error_Text">
              올바른 형식의 이메일이 아닙니다.
            </Sign_Text>
          )}
        </Sign_Input_Container>
        <Sign_Input_Container>
          <Sign_Label htmlFor="username">Display Name</Sign_Label>
          <Sign_Input id="username" {...register('username')} required />
          {getValues('username') === '' ? null : verify.usernameVerify
              .boolean === true ? (
            <Sign_Text className="Allow_Text">
              올바른 형식의 이름입니다.
            </Sign_Text>
          ) : (
            <Sign_Text className="Error_Text">
              올바른 형식의 이름이 아닙니다.
            </Sign_Text>
          )}
        </Sign_Input_Container>
        <Sign_Input_Container>
          <Sign_Label htmlFor="password">Password</Sign_Label>
          <Sign_Input
            id="password"
            {...register('password')}
            type="password"
            required
          />
          {getValues('password') === '' ? null : verify.passwordVerify
              .boolean === true ? (
            <Sign_Text className="Allow_Text">
              사용가능한 비밀번호입니다.
            </Sign_Text>
          ) : (
            <Sign_Text className="Error_Text">
              비밀번호는 영문,숫자,특수기호 포함하여 8자 이상 12자 이하로
              작성하셔야 합니다.
            </Sign_Text>
          )}
        </Sign_Input_Container>
        <Sign_Input_Container>
          <Sign_Label htmlFor="verifyPassword">Password Check</Sign_Label>
          <Sign_Input
            id="verifyPassword"
            {...register('verifyPassword')}
            type="password"
            disabled={!verify.passwordVerify.boolean}
            required
          />
          {getValues('verifyPassword') === undefined ? null : verify
              .verifyPasswordVerify.boolean === true ? (
            <Sign_Text className="Allow_Text">비밀번호가 일치합니다.</Sign_Text>
          ) : (
            <Sign_Text className="Error_Text">
              비밀번호가 일치하지 않습니다.
            </Sign_Text>
          )}
        </Sign_Input_Container>

        <Sign_Submit
          type="submit"
          disabled={!Object.values(verify).every((el) => el.boolean === true)}
          value="Sign up"
        />
      </Sign_Form>
    </Sign_Container>
  );
}
export default Sign;
