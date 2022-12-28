import { useState } from 'react';
import Comments from '../Components/Comments';
import { Link, useParams } from 'react-router-dom';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { data } from '../dummydata';

const Outer_Wrapper = styled.div`
  width: 100vw;
  height: 150vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 47px;
  // position: fixed;
  overflow: auto;
`;

const Content_Wrapper = styled.div`
  display: flex;
`;

const Inner_Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 60vw;
  height: auto;
  padding: 30px;
  margin-top: 100px;
  padding-bottom: 100px;
  position: absolute;
`;

const Question_Title = styled.div`
  font-size: 38px;
`;

const Profile_Image = styled.img`
  cursor: pointer;
  height: 30px;
  width: 30px;
  border-radius: 5px;
`;

const Username = styled.div`
  font-size: 18px;
`;

const Userinfo_Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const User_Wrapper = styled.div`
  display: flex;
  justify-content: center;
  * {
    margin: 10px;
  }
  /* width: 1050px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: start; */
`;

const Button_Wrapper = styled.div`
  display: flex;
  * {
    margin: 5px;
  }
`;

const Button = styled.button`
  height: 30px;
  width: 85px;
  font-size: 10px;
  font-weight: bold;
  letter-spacing: normal;
  font-family: -apple-system, 'system-ui', 'Segoe UI Adjusted', 'Segoe UI',
    'Liberation Sans', sans-serif;
  color: black;
  text-align: center;
  line-height: 30px;
  border-radius: 4px;
  word-break: break-all;
  white-space: pre-wrap;
  cursor: pointer;
  border: none;
  font-weight: border;
`;
const Blue_Button = styled(Button)`
  color: white;
  background-color: #3498db;
`;
const Red_Button = styled(Button)`
  background-color: #b55454;
  color: white;
`;
const Answer_Delete_Button = styled(Button)`
  background-color: #3498db;
  color: white;
`;
const Answer_Edit_Button = styled(Button)`
  background-color: #b55454;
  color: white;
`;

const Custom_Hr = styled.hr`
  width: 1200px;
  align-items: center;
  opacity: 70%;
`;
const Vote_Wrapper = styled.div`
  height: 90px;
  width: 30px;
  /* border: 1px solid gray; */
  border-radius: 5px;
  background-color: none;
`;
const Vote_Count = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text_Content = styled.div`
  height: 500px;
  width: 70rem;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  * {
    margin: 30px;
  }

  .ql-toolbar,
  .ql-toolbar * {
    margin: 0;
  }
`;
const Question_Image = styled.img`
  width: 500px;
`;
const Gray_Text = styled.span`
  color: #7f7f7f;
  white-space: pre;
`;
const Middle_Text_Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Tags = styled.div`
  font-size: 12px;
  background-color: #e1ecf4;
  border-radius: 5px;
  padding: 5px;
  color: #39739d;
  width: fit-content;
  &:hover {
    background-color: #d0e3f1;
    cursor: pointer;
  }
`;
const Tag_Wrapper = styled.div`
  margin-bottom: 30px;
  margin-left: 10px;
  display: flex;
  * {
    margin-right: 10px;
  }
`;

const Question_Page = () => {
  // 질문 상세 페이지에서 가져올 더미 데이터
  // => 상태로 전달 받을 예정이며 정상 구현 이후 해당 변수는 삭제합니다.
  const currentId = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(
    data.question[currentId.id]
  );

  const [questionVotes, setQuestionVotes] = useState(0);
  const [answerVotes, setAnswerVotes] = useState(0);
  const [isAnswerEditOn, setIsAnswerEditOn] = useState(false);
  const [currentUserAnswer, setCurrentUserAnswer] = useState(
    data.member[0].answers[0].answer_content
  );

  const handleUserAnswer = (val) => {
    setCurrentUserAnswer(val);
  };

  const handleEditAnswer = () => {
    if (isAnswerEditOn === true) {
      if (confirm('수정을 완료하시겠습니까?')) {
        setIsAnswerEditOn(!isAnswerEditOn);
      }
    } else {
      setIsAnswerEditOn(!isAnswerEditOn);
    }
  };

  const upVote_question = () => {
    setQuestionVotes(questionVotes + 1);
  };
  const downVote_question = () => {
    setQuestionVotes(questionVotes - 1);
  };

  const upVote_answer = () => {
    setAnswerVotes(answerVotes + 1);
  };
  const downVote_answer = () => {
    setAnswerVotes(answerVotes - 1);
  };

  return (
    <Outer_Wrapper>
      <Inner_Wrapper>
        <Question_Title>{currentQuestion.title}</Question_Title>
        <Userinfo_Wrapper>
          <User_Wrapper>
            <Profile_Image
              src={process.env.PUBLIC_URL + '/Sample_Avatar.png'}
            />
            <Username>Human_001</Username>
          </User_Wrapper>
          <Middle_Text_Wrapper>
            <Gray_Text> Asked </Gray_Text>
            <span> today</span>
            <Gray_Text> Modified </Gray_Text>
            <span> today</span>
            <Gray_Text> Viewed </Gray_Text>
            <span> 2 times</span>
          </Middle_Text_Wrapper>
          <Button_Wrapper>
            <Link to="./edit">
              <Blue_Button>질문 수정하기</Blue_Button>
            </Link>
            <Red_Button>질문 삭제하기</Red_Button>
            <Button>답변 등록하기</Button>
          </Button_Wrapper>
        </Userinfo_Wrapper>
        <Custom_Hr />
        <Content_Wrapper>
          <Vote_Wrapper>
            <MdKeyboardArrowUp onClick={upVote_question} size="30" />
            <Vote_Count>{questionVotes}</Vote_Count>
            <MdKeyboardArrowDown onClick={downVote_question} size="30" />
          </Vote_Wrapper>
          <Text_Content>
            <div dangerouslySetInnerHTML={{ __html: currentQuestion.text }} />
          </Text_Content>
        </Content_Wrapper>
        <Tag_Wrapper>
          {currentQuestion.tags.map((item) => (
            <Tags>{item}</Tags>
          ))}
        </Tag_Wrapper>
        <Comments />
        <Question_Title>내 답변</Question_Title>
        <Userinfo_Wrapper>
          <User_Wrapper>
            <Profile_Image
              src={process.env.PUBLIC_URL + '/Sample_Avatar.png'}
            />
            <Username>Human_001</Username>
          </User_Wrapper>
          <Middle_Text_Wrapper>
            <Gray_Text> Asked </Gray_Text>
            <span> today</span>
            <Gray_Text> Modified </Gray_Text>
            <span> today</span>
            <Gray_Text> Viewed </Gray_Text>
            <span> 2 times</span>
          </Middle_Text_Wrapper>
          <Button_Wrapper>
            <Answer_Delete_Button>답변 삭제하기</Answer_Delete_Button>
            <Answer_Edit_Button onClick={handleEditAnswer}>
              {isAnswerEditOn ? '수정 완료' : '답변 수정하기'}
            </Answer_Edit_Button>
          </Button_Wrapper>
        </Userinfo_Wrapper>
        <Custom_Hr />
        <Content_Wrapper>
          <Vote_Wrapper>
            <MdKeyboardArrowUp onClick={upVote_answer} size="30" />
            <Vote_Count>{answerVotes}</Vote_Count>
            <MdKeyboardArrowDown onClick={downVote_answer} size="30" />
          </Vote_Wrapper>
          <Text_Content>
            {isAnswerEditOn ? (
              <ReactQuill
                theme="snow"
                className="Rich_Text_Editor"
                value={currentUserAnswer}
                onChange={handleUserAnswer}
              />
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: currentUserAnswer,
                }}
              />
            )}
          </Text_Content>
        </Content_Wrapper>
      </Inner_Wrapper>
    </Outer_Wrapper>
  );
};

export default Question_Page;
