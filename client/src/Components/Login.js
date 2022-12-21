import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const Login_Wrapper = styled.div`
  margin: 0 auto;
  height: 500px;
  width: 500px;
  border: solid red 1px;

  .Login_Form {
    margin: 0 auto;
    width: 80%;
    display: flex;
    flex-direction: column;
  }
`;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  // const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

  return (
    <Login_Wrapper>
      <form className="Login_Form" onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="아이디를 입력해주세요" {...register('id')} />
        <input
          placeholder="비밀번호를 입력해주세요"
          {...register('exampleRequired', { required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </Login_Wrapper>
  );
}
