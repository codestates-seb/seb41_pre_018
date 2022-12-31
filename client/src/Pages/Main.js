import Question from '../Components/Question';
import { data } from '../dummydata';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllQuestionsThunk } from '../module/thunkModule';
import { useSelector } from 'react-redux';

const Pagination_Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
  * {
    margin: 3px;
  }
`;
const Questions_Wrapper = styled.div`
  display: flex;
  align-items: center;
  > :last-child {
    border-bottom: 1px solid #d9d9d9;
  }
  flex-direction: column;
  padding-top: 50px;
  padding-bottom: 50px;
`;
const All_Questions = styled.p`
  font-size: 30px;
`;
const Number_Of_Questions = styled.p``;
const Ask_Question = styled.button`
  font-size: 18px;
  height: 30px;
  width: 150px;
  border: none;
  border-radius: 5px;
  background-color: #0a95ff;
  color: white;
  &:hover {
    background-color: #0074cc;
    cursor: pointer;
  }
`;

const All_Questions_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title_And_Button_Wrapper = styled.div`
  display: flex;
  width: 1000px;
  justify-content: space-between;
  align-items: center;
`;

const Pagination_Button = styled.button`
  height: 30px;
  width: 25px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  background-color: white;
  color: #2e2e2e;
  &:hover {
    background-color: #cfcfcf;
    cursor: pointer;
  }
  &:focus {
    background-color: #f08650;
    color: white;
    cursor: pointer;
  }
`;

const Main = () => {
  const postPerPage = 10; // 한 페이지에 표시할 글 수
  const postCount = data.question.length; // 모든 글 수
  const pageCount = Math.ceil(postCount / postPerPage); // 페이지 수
  let pages = []; // 페이지 아이콘을 렌더링 하기 위한 배열
  for (let i = 1; i < pageCount + 1; i++) {
    // 페이지 아이콘 배열에 페이지 넘버 푸쉬
    pages.push(i);
  }
  const [questions, setQuestions] = useState([]);
  const dispatch = useDispatch();
  const allQuestionCondition = {
    page: 1,
    size: 10,
    sortingMethod: 'QuestionId',
  };

  useEffect(() => {
    async function fetchAllQuestions() {
      const response = await dispatch(
        getAllQuestionsThunk(allQuestionCondition)
      ).then((res) => setQuestions(res.payload));
    }
    fetchAllQuestions();
  }, []);
  const { isLogin, memberId } = useSelector((state) => state.loginBoolean);
  const [pageState, setPageState] = useState(1); //페이지 버튼 뭐 눌렀는지 상태. 디폴트는 1페이지.

  const handlePageClick = (event) => {
    setPageState(event.target.textContent); // 버튼 숫자에 따라 state 바뀜
  };

  const navigateWithArrow = (event) => {
    if (event.target.textContent === '>' && pageState < pages.length) {
      setPageState(Number(pageState) + 1);
    } else if (event.target.textContent === '<' && pageState > 1) {
      setPageState(Number(pageState) - 1);
    }
  };

  return (
    <>
      <Questions_Wrapper>
        <Title_And_Button_Wrapper>
          <All_Questions_Wrapper>
            <All_Questions>All Questions</All_Questions>
            <Number_Of_Questions>
              {`${data.question.length} questions`}
            </Number_Of_Questions>
          </All_Questions_Wrapper>
          <Link to={isLogin ? '/question/new' : '/login'}>
            <Ask_Question>Ask Question</Ask_Question>
          </Link>
        </Title_And_Button_Wrapper>

        {pageState ? ( //클릭한 페이지에 따른 조건부 렌더링
          <div className="posts">
            {questions &&
              questions.map((item, idx) => {
                {
                  return (
                    <Question
                      key={item.questionId}
                      questionId={item.questionId}
                      title={item.title}
                      content={item.text}
                      views={item.views}
                      vote={item.voteResult}
                      username={item.username}
                      createdAt={item.createdAt}
                      tags={item.tags}
                      idx={idx}
                    />
                  );
                }
              })}
          </div>
        ) : null}
      </Questions_Wrapper>
      <Pagination_Wrapper>
        <Pagination_Button onClick={navigateWithArrow}>{'<'}</Pagination_Button>
        {pages.map((element, idx) => (
          <Pagination_Button
            className={`button${element}`}
            onClick={handlePageClick}
            key={idx}
          >
            {element}
          </Pagination_Button>
        ))}{' '}
        {/*숫자*/}
        <Pagination_Button onClick={navigateWithArrow}>{'>'}</Pagination_Button>
      </Pagination_Wrapper>
    </>
  );
};

export default Main;
