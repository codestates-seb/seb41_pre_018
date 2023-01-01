import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { loginBoolean } from '../module/loginBooleanSlice';
import { getUserInfoEditThunk, patchUserThunk } from '../module/thunkModule';

const User_Info_Edit_Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  & > * {
    margin: 0px 50px;
  }
`;
const My_Page_Profile_Image = styled.img`
  height: 130px;
  width: 130px;
  border-radius: 10%;
`;
const Edit_Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  position: relative;
  bottom: 60px;
`;
const Edit_Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px 0px 0px 60px;
  background-color: white;
  width: 700px;
  height: 600px;
  border-radius: 10px;
  box-shadow: 1px 1px 20px 1px #b3d3ea;
`;
const Edit_Input = styled.input`
  height: 20px;
  width: 244px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  &:focus {
    outline: 3px solid #b3d3ea;
  }
`;
const Edit_About_me = styled.textarea`
  width: 600px;
  height: 100px;
  resize: none;
  overflow: auto;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  &:focus {
    outline: 3px solid #b3d3ea;
  }
`;
const Edit_Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
  }
`;
const Edit_Input_Container = styled.div`
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
const Edit_Submit = styled.input`
  height: 40px;
  width: 200px;
  border: 1px solid #7aa7c7;
  border-radius: 5px;
  background-color: #e1ecf4;
  color: #3973b3;
  margin-top: 30px;
  margin-right: 30px;
  &:hover {
    background-color: #b3d3ea;
    cursor: pointer;
  }
  &:disabled {
    background-color: #eeeeee;
    cursor: auto;
  }
`;
const Sign_Text = styled.span`
  margin-top: 3px;
  font-size: 12px;
`;
const Edit_Cancel_Button = styled.input`
  height: 40px;
  width: 100px;
  border: 1px solid #7aa7c7;
  border-radius: 5px;
  background-color: #f78181;
  color: #3973b3;

  &:hover {
    cursor: pointer;
  }
`;
function UserInfoEdit() {
  const usernameRegExp = /[A-Za-z0-9가-힇]{2,20}/;
  const [verify, setVerify] = useState({
    usernameVerify: { boolean: false },
  });

  const { memberId } = useSelector((state) => state.loginBoolean);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const { register, handleSubmit, watch, getValues, setValue } = useForm({
    defaultValues: {
      usernameEdit: '',
      aboutMeEdit: '',
    },
  });

  const { usernameEdit } = watch();
  useEffect(() => {
    if (usernameRegExp.test(usernameEdit)) {
      setVerify({
        ...verify,
        usernameVerify: {
          ...verify.usernameVerify,
          boolean: true,
          username: usernameEdit,
        },
      });
    } else {
      setVerify({ ...verify, usernameVerify: { boolean: false } });
    }
  }, [usernameEdit]);

  const naviateHandle = () => {
    navigate(`/user/${memberId}`);
  };
  const onSubmit = async (userdata) => {
    let { usernameEdit, aboutMeEdit } = userdata;
    if (aboutMeEdit === '') {
      aboutMeEdit = null;
    }
    const response = await dispatch(
      patchUserThunk({
        cookie: cookies.access_token,
        memberId,
        username: usernameEdit,
        aboutMe: aboutMeEdit,
      })
    ).then((data) => {
      if (data.payload === false) {
        removeCookie('access_token');
        dispatch(loginBoolean({ isLogin: false, memberId: '' }));
        navigate('/login');
      } else {
        navigate(`/user/${memberId}`);
      }
    });
  };
  const onError = (e) => {
    console.log(e);
  };
  useEffect(() => {
    async function fetchData() {
      const response = await dispatch(
        getUserInfoEditThunk({ cookie: cookies.access_token, memberId })
      ).then((data) => {
        if (data.payload === false) {
          removeCookie('access_token');
          dispatch(loginBoolean({ isLogin: false, memberId: '' }));
          navigate('/login');
        } else {
          return data.payload;
        }
      });
      const { username, aboutMe } = response;
      setValue('usernameEdit', username);
      setValue('aboutMeEdit', aboutMe);
    }
    fetchData();
  }, []);

  return (
    <User_Info_Edit_Container>
      <Edit_Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Edit_Header>
          <Edit_Label>Profile image</Edit_Label>
          <My_Page_Profile_Image
            src={process.env.PUBLIC_URL + '/Sample_Avatar.png'}
          />
        </Edit_Header>
        <Edit_Input_Container>
          <Edit_Label htmlFor="username">Display Name</Edit_Label>
          <Edit_Input
            id="username"
            {...register('usernameEdit', {})}
            required
          />
          {getValues('usernameEdit') === '' ? null : verify.usernameVerify
              .boolean === true ? (
            <Sign_Text className="Allow_Text">
              올바른 형식의 이름입니다.
            </Sign_Text>
          ) : (
            <Sign_Text className="Error_Text">
              올바른 형식의 이름이 아닙니다.
            </Sign_Text>
          )}
        </Edit_Input_Container>

        <Edit_Label htmlFor="aboutMeEdit">About me</Edit_Label>
        <Edit_About_me
          id="aboutMeEdit"
          {...register('aboutMeEdit', {})}
        ></Edit_About_me>
        <div>
          <Edit_Submit
            type="submit"
            value="Save profile"
            disabled={!verify.usernameVerify.boolean === true}
          />
          <Edit_Cancel_Button
            type="button"
            value="Cancel"
            onClick={naviateHandle}
          />
        </div>
      </Edit_Form>
    </User_Info_Edit_Container>
  );
}
export default UserInfoEdit;
