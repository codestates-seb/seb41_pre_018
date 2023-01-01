import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiCake } from 'react-icons/hi';
import DeleteUserModal from '../Components/DeleteUserModal';
import { Link } from 'react-router-dom';
import { getUserInfoThunk } from '../module/thunkModule';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { loginBoolean } from '../module/loginBooleanSlice';

const My_page_Container = styled.div`
  display: flex;
  justify-content: center;

  .opacityComponent {
    opacity: 0.3;
  }
`;
const My_Page_Sub_Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 50px;
`;
const My_Page_Header = styled.div`
  display: flex;
  align-items: center;
  width: 670px;
  height: 170px;
  padding-left: 10px;
  margin-bottom: 40px;
  position: relative;
  right: 50px;

  & span:first-child {
    margin-left: 30px;
    font-size: 30px;
  }
  .Header_Right_Wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    height: 130px;
  }
  .Created_User_Day {
    display: flex;
    align-items: center;
    margin-left: 30px;
    * {
      font-size: 15px;
      opacity: 0.5;
    }
    & span {
      margin-left: 5px;
    }
  }
`;
const My_Page_Profile_Image = styled.img`
  height: 130px;
  width: 130px;
  border-radius: 10%;
`;
const My_Page_About = styled.div`
  width: 780px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & div {
    width: 100%;
  }
  & div:first-child {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  & div:nth-child(2) {
    display: flex;
    height: 200px;
    border: 2px solid rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    padding: 5px;
    overflow: auto;
    background-color: white;
    .No_Aboutme {
      display: block;
      align-self: center;
      font-size: 20px;
      text-decoration: none;
      color: black;
      position: relative;
      left: 90px;
      &:hover {
        color: #3973b3;
        cursor: pointer;
      }
    }
  }
  & div:nth-child(2)::-webkit-scrollbar {
    width: 10px;
  }
  & div:nth-child(2)::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  & div:nth-child(2)::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
  & button {
    height: 30px;
    width: 100px;
    border: 1px solid #7aa7c7;
    border-radius: 5px;
    background-color: #e1ecf4;
    color: #3973b3;
    &:hover {
      background-color: #b3d3ea;
      cursor: pointer;
    }
    &:disabled:hover {
      background-color: #e1ecf4;
      cursor: auto;
    }
  }
`;
const My_Page_Answer_Question_Wrapper = styled.div`
  display: flex;
  width: 794px;
  justify-content: space-between;
`;
const My_Page_Answer_Question = styled.div`
  margin: 40px 0px;
  width: 370px;
`;
const My_Page_Answer_Question_Body = styled.div`
  padding: 5px;
  background-color: white;
  height: 200px;
  overflow: auto;
  border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 6px;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
  & > div {
    display: flex;
    flex-direction: column;
  }
`;
const My_Page_Title_Span = styled.span`
  display: block;
  font-size: 20px;
  margin-bottom: 10px;
`;
const My_Page_Answer_Question_Title = styled.span`
  margin: 5px 10px;
  font-size: 14px;
  color: black;
  .Question_Link {
    color: black;
    text-decoration: none;
    &:hover {
      font-weight: 500;
      color: #0080ff;
    }
  }
`;

export const My_Page_Delete_User_Button = styled.button`
  height: 30px;
  width: 300px;
  border: 1px solid #7aa7c7;
  border-radius: 5px;
  background-color: #f78181;
  color: #3973b3;

  &:hover {
    background-color: #fe2e2e;
    cursor: pointer;
  }
  &:disabled:hover {
    background-color: #f78181;
    cursor: auto;
  }
`;

export function dateChange(UserBirthDay) {
  const d1 = UserBirthDay;

  const d2 = new Date()
    .toLocaleString('ko-KR')
    .split('.')
    .slice(0, 3)
    .map((el) => Number(el))
    .join('-');
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  const diffDate = date2.getTime() - date1.getTime();

  return parseInt(diffDate / (1000 * 60 * 60 * 24));
}

function MyPage() {
  const [isLoding, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    dayAgo: '',
    username: '',
    aboutMe: '',
    questions: [],
    answers: [],
  });
  const [hiddenAction, setHiddenAction] = useState(false);
  const { memberId } = useSelector((state) => state.loginBoolean);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  //현재 더미데이터 조건부

  const deleteUserHandle = (boolean) => {
    setHiddenAction(boolean);
  };
  const navigateToHandle = () => {
    navigate(`/user/edit/${memberId}`);
  };
  useEffect(() => {
    async function fetchData() {
      const response = await dispatch(
        getUserInfoThunk({ cookie: cookies.access_token, memberId })
      ).then((data) => {
        if (data.payload === false) {
          removeCookie('access_token');
          dispatch(loginBoolean({ isLogin: false, memberId: '' }));
          navigate('/login');
        } else {
          return data.payload;
        }
      });

      const { createdTime, username, aboutMe, questions, answers } = response;

      const dayAgo = dateChange(createdTime);
      setUserInfo({
        ...userInfo,
        dayAgo,
        username,
        aboutMe,
        questions,
        answers,
      });
      setIsLoading(true);
    }
    fetchData();
  }, []);
  return (
    <My_page_Container>
      {isLoding === false ? (
        <span>loading</span>
      ) : (
        <>
          <My_Page_Sub_Container
            className={hiddenAction === true ? 'opacityComponent' : null}
          >
            <My_Page_Header>
              <My_Page_Profile_Image
                src={process.env.PUBLIC_URL + '/Sample_Avatar.png'}
              />
              <div className="Header_Right_Wrapper">
                <span>{userInfo.username}</span>
                <div className="Created_User_Day">
                  <HiCake className="Hi_Cake" />
                  <span>Member for {userInfo.dayAgo} days</span>
                </div>
              </div>
            </My_Page_Header>
            <My_Page_About>
              <div>
                <My_Page_Title_Span>About</My_Page_Title_Span>
                <button
                  disabled={hiddenAction === true ? true : false}
                  onClick={navigateToHandle}
                >
                  Click to edit
                </button>
              </div>
              <div>
                {userInfo.aboutMe === null ? (
                  <Link className="No_Aboutme" to={`/user/edit/${memberId}`}>
                    Your about me section is currently blank. Would you like to
                    add one?
                  </Link>
                ) : (
                  <span>{userInfo.aboutMe}</span>
                )}
              </div>
            </My_Page_About>
            <My_Page_Answer_Question_Wrapper>
              <My_Page_Answer_Question className="Answer_Box">
                <My_Page_Title_Span>Answers</My_Page_Title_Span>
                <My_Page_Answer_Question_Body>
                  {userInfo.answers.length === 0 ? (
                    <span>No answers</span>
                  ) : (
                    userInfo.answers.map((answer, index) => {
                      return (
                        <div key={answer.answerId}>
                          <My_Page_Answer_Question_Title>
                            {`${index + 1}.  `}
                            <Link
                              to={`/question/${answer.questionId}`}
                              className="Question_Link"
                            >
                              {answer.text}
                            </Link>
                          </My_Page_Answer_Question_Title>
                        </div>
                      );
                    })
                  )}
                </My_Page_Answer_Question_Body>
              </My_Page_Answer_Question>
              <My_Page_Answer_Question>
                <My_Page_Title_Span>Questions</My_Page_Title_Span>
                <My_Page_Answer_Question_Body>
                  {userInfo.questions.length === 0 ? (
                    <span>No questions</span>
                  ) : (
                    userInfo.questions.map((question, index) => {
                      return (
                        <div key={question.questionId}>
                          <My_Page_Answer_Question_Title>
                            {`${index + 1}.  `}
                            <Link
                              to={`/question/${question.questionId}`}
                              className="Question_Link"
                            >
                              {question.title}
                            </Link>
                          </My_Page_Answer_Question_Title>
                        </div>
                      );
                    })
                  )}
                </My_Page_Answer_Question_Body>
              </My_Page_Answer_Question>
            </My_Page_Answer_Question_Wrapper>
            <My_Page_Delete_User_Button
              onClick={() => deleteUserHandle(true)}
              disabled={hiddenAction === true ? true : false}
            >
              Delete profile
            </My_Page_Delete_User_Button>
          </My_Page_Sub_Container>
          {hiddenAction === false ? null : (
            <DeleteUserModal
              className="hi"
              deleteUserHandle={deleteUserHandle}
            />
          )}
        </>
      )}
    </My_page_Container>
  );
}

export default MyPage;
