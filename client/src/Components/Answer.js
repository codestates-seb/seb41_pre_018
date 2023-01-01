import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { data } from '../dummydata';
import ReactQuill from 'react-quill';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAnswerThunk,
  deleteUserThunk,
  getUserInfoThunk,
  patchAnswerThunk,
} from '../module/thunkModule';
import { useParams } from 'react-router-dom';
import { render } from 'react-dom';

const Content_Wrapper = styled.div`
  display: flex;
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
`;

const Button_Wrapper = styled.div`
  display: flex;
  align-items: center;
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

const Answer_Delete_Button = styled(Button)`
  background-color: #b55454;
  color: white;
`;
const Answer_Edit_Button = styled(Button)`
  background-color: #3498db;
  color: white;
`;

const Custom_Hr = styled.hr`
  width: 100%;
  align-items: center;
  opacity: 70%;
`;
const Vote_Wrapper = styled.div`
  height: auto;
  width: 40px;
  border-radius: 5px;
  background-color: none;
`;
const Vote_Count = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4a4a4a;
`;

const Text_Content = styled.div`
  height: auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 30px;
  margin-bottom: 50px;

  * {
    max-width: 100%;
  }

  .Rich_Text_Editor {
    .ql-toolbar {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    width: 100%;
    .ql-container {
      height: 250px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
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

const Answer = (props) => {
  const currentId = useParams();
  const [isAnswerEditOn, setIsAnswerEditOn] = useState(false);
  const [answerVotes, setAnswerVotes] = useState(props.vote);
  const [currentUserAnswer, setCurrentUserAnswer] = useState(props.text);
  const [cookies] = useCookies([]);
  const dispatch = useDispatch();
  const { memberId } = useSelector((state) => state.loginBoolean);
  const [username, setUsername] = useState('');

  // console.log(`props text: ${props.text}`);
  // console.log(`props member: ${memberId}`);

  useEffect(() => {
    async function fetchUsername() {
      const response = await dispatch(
        getUserInfoThunk({ cookie: cookies.access_token, memberId })
      ).then((data) => {
        setUsername(data.payload.username);
      });
    }
    fetchUsername();
  }, []);

  // console.log(`created at : ${props.createdAt}`);
  // console.log(`modified at: ${props.ModifiedAt}`);

  const handleUserAnswer = (val) => {
    setCurrentUserAnswer(val);
  };

  const handleEditAnswer = async () => {
    const data = {};
    data.questionId = currentId.id;
    data.answerId = props.answerId;
    data.text = currentUserAnswer;
    data.cookie = cookies.access_token;
    console.log(data);
    if (isAnswerEditOn === true) {
      await dispatch(patchAnswerThunk(data)).then((data) => {
        if (confirm('수정을 완료하시겠습니까?')) {
          props.handleRender(!props.render);
          setIsAnswerEditOn(!isAnswerEditOn);
        }
      });
    } else {
      setIsAnswerEditOn(!isAnswerEditOn);
    }
  };

  const handleDeleteAnswer = async () => {
    const data = {};
    data.answerId = 1;
    data.questionId = 2;
    data.cookie = cookies.access_token;
    const response = await dispatch(deleteAnswerThunk(data));
  };

  const upVote_answer = () => {
    setAnswerVotes(answerVotes + 1);
  };
  const downVote_answer = () => {
    setAnswerVotes(answerVotes - 1);
  };

  // useEffect(() => {
  //   async function fetchUserInfo() {
  //     const response = await dispatch(cookies.access_token, props.memberId).then(
  //       (res) => {
  //         console.log(res.payload)
  //       }
  //     )
  //   }
  //   fetchUserInfo();
  // }, []);

  return (
    <div>
      <Userinfo_Wrapper>
        <User_Wrapper>
          <Profile_Image src={process.env.PUBLIC_URL + '/Sample_Avatar.png'} />
          <Username>{username}</Username>
        </User_Wrapper>
        <Middle_Text_Wrapper>
          <Gray_Text> Answered </Gray_Text>
          <span>{` ${props.createdAt}`}</span>
          <Gray_Text>Modified</Gray_Text>
          <span>{` ${props.modifiedAt}`}</span>
        </Middle_Text_Wrapper>
        <Button_Wrapper>
          <Answer_Edit_Button onClick={handleEditAnswer}>
            {isAnswerEditOn ? '수정 완료' : '답변 수정하기'}
          </Answer_Edit_Button>
          <Answer_Delete_Button onClick={handleDeleteAnswer}>
            답변 삭제하기
          </Answer_Delete_Button>
        </Button_Wrapper>
      </Userinfo_Wrapper>
      <Custom_Hr />
      <Content_Wrapper>
        <Vote_Wrapper>
          <MdKeyboardArrowUp
            onClick={upVote_answer}
            size="40"
            color="#C0C0C0"
            cursor="pointer"
          />
          <Vote_Count>{answerVotes}</Vote_Count>
          <MdKeyboardArrowDown
            onClick={downVote_answer}
            size="40"
            color="#C0C0C0"
            cursor="pointer"
          />
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
                __html: `${props.text}`,
              }}
            />
          )}
        </Text_Content>
      </Content_Wrapper>
    </div>
  );
};

export default Answer;
