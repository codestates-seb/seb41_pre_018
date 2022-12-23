import styled from 'styled-components';
import { data } from '../dummydata';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiCake } from 'react-icons/hi';
//username 파라미터와 user e-mail 토큰? 기반으로? 받아와야하지 않나?
const My_Page_Container = styled.div`
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
  font-size: 14px;
  color: #0080ff;
`;
const My_Page_Answer_Question_Text = styled.span`
  font-size: 12px;
`;
const My_Page_Delete_User_Button = styled.button`
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
function dateChange(UserBirthDay) {
  const d1 = UserBirthDay.split('.')
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
  return diffDate / (1000 * 60 * 60 * 24);
}
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
    <My_Page_Container>
      <My_Page_Header>
        <My_Page_Profile_Image
          src={process.env.PUBLIC_URL + '/Sample_Avatar.png'}
        />
        <div className="Header_Right_Wrapper">
          <span>{username}</span>
          <div className="Created_User_Day">
            <HiCake className="Hi_Cake" />
            <span>Member for {dayAgo} days</span>
          </div>
        </div>
      </My_Page_Header>
      <My_Page_About>
        <div>
          <My_Page_Title_Span>About</My_Page_Title_Span>
          <button>Click to edit</button>
        </div>
        <div>
          {aboutMe === '' ? (
            <span className="No_Aboutme">
              Your about me section is currently blank. Would you like to add
              one?
            </span>
          ) : (
            <span>{aboutMe}</span>
          )}
        </div>
      </My_Page_About>
      <My_Page_Answer_Question_Wrapper>
        <My_Page_Answer_Question className="Answer_Box">
          <My_Page_Title_Span>Answers</My_Page_Title_Span>
          <My_Page_Answer_Question_Body>
            {answers.length === 0
              ? null
              : answers.map((answer) => {
                  return (
                    <div key={answer.answer_id}>
                      <My_Page_Answer_Question_Title>
                        {answer.answer_title}
                      </My_Page_Answer_Question_Title>
                      <My_Page_Answer_Question_Text>
                        {answer.answer_content}
                      </My_Page_Answer_Question_Text>
                    </div>
                  );
                })}
          </My_Page_Answer_Question_Body>
        </My_Page_Answer_Question>
        <My_Page_Answer_Question>
          <My_Page_Title_Span>Questions</My_Page_Title_Span>
          <My_Page_Answer_Question_Body>
            {questions.length === 0
              ? null
              : questions.map((question) => {
                  return (
                    <div key={question.question_id}>
                      <My_Page_Answer_Question_Title>
                        {question.question_title}
                      </My_Page_Answer_Question_Title>
                      <My_Page_Answer_Question_Text>
                        {question.question_content}
                      </My_Page_Answer_Question_Text>
                    </div>
                  );
                })}
          </My_Page_Answer_Question_Body>
        </My_Page_Answer_Question>
      </My_Page_Answer_Question_Wrapper>
      <My_Page_Delete_User_Button>Delete profile</My_Page_Delete_User_Button>
    </My_Page_Container>
  );
}

export default MyPage;
