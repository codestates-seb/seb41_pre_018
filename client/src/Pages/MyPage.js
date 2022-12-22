import styled from 'styled-components';
import { data } from '../dummydata';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiCake } from 'react-icons/hi';
//username 파라미터와 user e-mail 토큰? 기반으로? 받아와야하지 않나?
const Mypage_Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 50px;
`;
const Mypage_Header = styled.div`
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
const Mypage_Profile_Image = styled.img`
  height: 130px;
  width: 130px;
  border-radius: 10%;
`;
const MyPage_About = styled.div`
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
    height: 200px;
    border: 2px solid rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    padding: 5px;
    overflow: auto;
    background-color: white;
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
  }
`;
const MyPage_AnswerQuestion_Wrapper = styled.div`
  display: flex;
  width: 794px;
  justify-content: space-between;
`;
const MyPage_AnswerQuestion = styled.div`
  margin: 40px 0px;
  width: 370px;
`;
const MyPage_AnswerQuestion_Body = styled.div`
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
const MyPage_Title_Span = styled.span`
  display: block;
  font-size: 20px;
  margin-bottom: 10px;
`;
const MyPage_AnswerQuestion_Title = styled.span`
  font-size: 14px;
  color: #0080ff;
`;
const MyPage_AnswerQuestion_Text = styled.span`
  font-size: 12px;
`;
const MyPage_Delete_User_Button = styled.button`
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
`;
//
//
function dateChange(UserVirthDay) {
  const d1 = UserVirthDay.split('.')
    .slice(0, 3)
    .map((el) => Number(el))
    .join('-');
  const d2 = new Date()
    .toLocaleString('ko-KR')
    .split('.')
    .slice(0, 3)
    .map((el) => Number(el))
    .join('-');
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  const diffDate = date2.getTime() - date1.getTime();
  return Math.abs(diffDate / (1000 * 60 * 60 * 24));
}
//
//
function MyPage() {
  const { name } = useParams();
  const [dayAgo, setDayAgo] = useState('');
  //현재 더미데이터 조건부
  let response;
  for (let i = 0; i < data.member.length; i++) {
    if (name === data.member[i].username) {
      response = data.member[i];
      break;
    }
  }
  const { username, created_time, modified_time, aboutMe, answers, questions } =
    response;

  useEffect(() => {
    const day = dateChange(created_time);
    setDayAgo(day);
  }, []);

  return (
    <Mypage_Container>
      <Mypage_Header>
        <Mypage_Profile_Image
          src={process.env.PUBLIC_URL + '/Sample_Avatar.png'}
        />
        <div className="Header_Right_Wrapper">
          <span>{username}</span>
          <div className="Created_User_Day">
            <HiCake className="Hi_Cake" />
            <span>Member for {dayAgo} days</span>
          </div>
        </div>
      </Mypage_Header>
      <MyPage_About>
        <div>
          <MyPage_Title_Span>About</MyPage_Title_Span>
          <button>Click to edit</button>
        </div>
        <div>
          <span>{aboutMe}</span>
        </div>
      </MyPage_About>
      <MyPage_AnswerQuestion_Wrapper>
        <MyPage_AnswerQuestion className="Answer_Box">
          <MyPage_Title_Span>Answers</MyPage_Title_Span>
          <MyPage_AnswerQuestion_Body>
            {answers.map((answer) => {
              return (
                <div key={answer.answer_id}>
                  <MyPage_AnswerQuestion_Title>
                    {answer.answer_title}
                  </MyPage_AnswerQuestion_Title>
                  <MyPage_AnswerQuestion_Text>
                    {answer.answer_content}
                  </MyPage_AnswerQuestion_Text>
                </div>
              );
            })}
          </MyPage_AnswerQuestion_Body>
        </MyPage_AnswerQuestion>
        <MyPage_AnswerQuestion>
          <MyPage_Title_Span>Questions</MyPage_Title_Span>
          <MyPage_AnswerQuestion_Body>
            {questions.map((question) => {
              return (
                <div key={question.question_id}>
                  <MyPage_AnswerQuestion_Title>
                    {question.question_title}
                  </MyPage_AnswerQuestion_Title>
                  <MyPage_AnswerQuestion_Text>
                    {question.question_content}
                  </MyPage_AnswerQuestion_Text>
                </div>
              );
            })}
          </MyPage_AnswerQuestion_Body>
        </MyPage_AnswerQuestion>
      </MyPage_AnswerQuestion_Wrapper>
      <MyPage_Delete_User_Button>Delete profile</MyPage_Delete_User_Button>
    </Mypage_Container>
  );
}

export default MyPage;
