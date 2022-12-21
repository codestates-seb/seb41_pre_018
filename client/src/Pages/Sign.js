import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
const Sign_Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f1f2f3;
`;
const Sign_Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 300px;
  height: 500px;
`;

const Sign_Input = styled.input`
  height: 30px;
`;
const Sign_Label = styled.label``;
const Sign_Text = styled.span``;
const Sign_Input_Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
`;
const Sign_Submit = styled.input``;
const Email_Verify_Button = styled.input``;

function Sign() {
  const { register, handleSubmit, reset, watch, getValues } = useForm();
  const [verify, setVerify] = useState({
    emailVerify: { boolean: false },
    usernameVerify: { boolean: false },
    passwordVerify: { boolean: false },
    verifyPasswordVerify: { boolean: false },
    verifyEmailVerify: { boolean: false },
  });
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
  const onSubmit = (userdata) => {
    //fetch 보낼 thunk 함수
    //login page routing
    console.log(userdata);
    reset();
  };
  const onError = (e) => {
    console.error(e);
  };
  const idSubmitHandle = () => {
    //fetch 보낼 함수 리턴 값으로 불리언 설정
    const response = 'ok';
    if (response === 'ok' && verify.emailVerify.boolean === true) {
      setVerify({ ...verify, verifyEmailVerify: { boolean: true } });
    } else {
      setVerify({ ...verify, verifyEmailVerify: { boolean: false } });
    }
  };
  return (
    <Sign_Container>
      <Sign_Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Sign_Input_Container>
          <Sign_Label htmlFor="email">E-MAIL</Sign_Label>
          <Sign_Input
            id="email"
            {...register('email')}
            placeholder="ex) abc123@aaaaaa.com"
            required
          />

          <Email_Verify_Button
            type="button"
            onClick={idSubmitHandle}
            value="중복확인"
            disabled={!verify.emailVerify.boolean}
          />

          {getValues('email') === '' ? null : verify.verifyEmailVerify
              .boolean === true && verify.emailVerify.boolean === true ? (
            <Sign_Text>사용가능한 이메일입니다.</Sign_Text>
          ) : verify.emailVerify.boolean === true ? (
            <Sign_Text>올바른 형식의 이메일입니다.</Sign_Text>
          ) : (
            <Sign_Text>올바른 형식의 이메일이 아닙니다.</Sign_Text>
          )}
        </Sign_Input_Container>
        <Sign_Input_Container>
          <Sign_Label htmlFor="username">이름</Sign_Label>
          <Sign_Input
            id="username"
            {...register('username')}
            placeholder="ex) 하수환"
            required
          />
          {getValues('username') === '' ? null : verify.usernameVerify
              .boolean === true ? (
            <Sign_Text>올바른 형식의 이름입니다.</Sign_Text>
          ) : (
            <Sign_Text>올바른 형식의 이름이 아닙니다.</Sign_Text>
          )}
        </Sign_Input_Container>
        <Sign_Input_Container>
          <Sign_Label htmlFor="password">비밀번호</Sign_Label>
          <Sign_Input
            id="password"
            {...register('password')}
            type="password"
            placeholder="ex) aaaa1234!!"
            required
          />
          {getValues('password') === '' ? null : verify.passwordVerify
              .boolean === true ? (
            <Sign_Text>사용가능한 비밀번호입니다.</Sign_Text>
          ) : (
            <Sign_Text>
              비밀번호는 영문,숫자,특수기호 포함하여 8자 이상 12자 이하로
              작성하셔야 합니다.
            </Sign_Text>
          )}
        </Sign_Input_Container>
        <Sign_Input_Container>
          <Sign_Label htmlFor="verifyPassword">비밀번호 확인</Sign_Label>
          <Sign_Input
            id="verifyPassword"
            {...register('verifyPassword')}
            type="password"
            disabled={!verify.passwordVerify.boolean}
            required
          />
          {getValues('verifyPassword') === undefined ? null : verify
              .verifyPasswordVerify.boolean === true ? (
            <Sign_Text>비밀번호가 일치합니다.</Sign_Text>
          ) : (
            <Sign_Text>비밀번호가 일치하지 않습니다.</Sign_Text>
          )}
        </Sign_Input_Container>
        <Sign_Submit
          type="submit"
          disabled={!Object.values(verify).every((el) => el.boolean === true)}
        />
      </Sign_Form>
    </Sign_Container>
  );
}
export default Sign;
