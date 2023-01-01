import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  deleteCommentThunk,
  patchCommentThunk,
  postCommentThunk,
} from '../module/thunkModule';

const Custom_Hr = styled.hr`
  width: 99%;
  align-items: center;
  opacity: 70%;
`;

const Comment_Wrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;

  .Comment_Block {
    display: flex;
    padding: 5px 10px;
    justify-content: space-between;
    align-items: center;

    p {
      width: 90%;
    }

    input[type='text'] {
      border: solid 1px rgba(0, 0, 0, 0.5);
    }
  }

  .Delete_Comment_Button,
  .Edit_Comment_Button {
    padding: 5px;
    border: none;
    background-color: transparent;
    color: rgb(52, 152, 218);

    &:hover {
      cursor: pointer;
      color: blue;
    }

    &:first-child {
      border-right: solid 1px rgba(0, 0, 0, 0.15);
    }
  }
`;

const Comment_Buttons_Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;

  .Comment_Cancel_Button {
    background-color: #b55354;
  }
`;

const Comment_Button = styled.button`
  margin-bottom: 50px;
  height: 30px;
  width: 85px;
  font-size: 10px;
  font-weight: bold;
  border: none;
  padding: 10px;
  border-radius: 5px;
  background-color: #3498da;
  color: white;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;

const New_Comment = styled.textarea`
  padding: 10px;
  resize: none;
  width: auto;
  height: 50px;
  margin-bottom: 10px;
  border: 1px solid #c3c3c3;

  &:focus {
    outline: none;
    border: 1.5px solid lightblue;
    box-shadow: 0px 0px 5px 0px rgba(126, 202, 230, 1);
  }
`;

const Comments = ({
  currentQuestion,
  commentsData,
  setCommentsData,
  handleRender,
  render,
  memberId,
}) => {
  const dispatch = useDispatch();

  const [newComment, setNewComment] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [currentCommentId, setCurrentCommentId] = useState(0);
  const [isEditOn, setIsEditOn] = useState(false);

  const addComment = () => {
    if (confirm('댓글을 추가하시겠습니까?')) {
      async function postComment() {
        const response = await dispatch(
          postCommentThunk({
            questionId: currentQuestion.questionId,
            text: newComment,
            cookie: cookies.access_token,
          })
        ).then((res) => {
          setNewComment('');
          handleRender(!render);
        });
      }
      postComment();
    }
  };

  const deleteComment = (event) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      async function deleteComment() {
        const response = await dispatch(
          deleteCommentThunk({
            questionId: currentQuestion.questionId,
            commentId: commentsData[event.target.id].commentId,
            cookie: cookies.access_token,
          })
        ).then((data) => handleRender(!render));
      }
      deleteComment();
      setCommentsData(
        commentsData.filter(
          (a) => a.commentId !== commentsData[event.target.id].commentId
        )
      );
    }
  };

  const toggleEdit = (event) => {
    setIsEditOn(true);
    setNewComment(commentsData[event.target.id].text);
    setCurrentCommentId(Number(commentsData[event.target.id].commentId));
  };

  const editComment = () => {
    if (confirm('댓글을 수정하시겠습니까?')) {
      async function editComment() {
        const response = await dispatch(
          patchCommentThunk({
            questionId: currentQuestion.questionId,
            commentId: currentCommentId,
            text: newComment,
            cookie: cookies.access_token,
          })
        ).then((res) => {
          setNewComment('');
          handleRender(!render);
        });
      }
      editComment();
      setIsEditOn(false);
    }
  };

  const cancelEdit = () => {
    setIsEditOn(!isEditOn);
    setNewComment('');
  };

  return (
    <Comment_Wrapper>
      {currentQuestion.comments.map((item, idx) => (
        <li key={`${currentQuestion.questionId}_${idx}`}>
          <div className="Comment_Block">
            <p>{item.text}</p>
            {memberId === currentQuestion.memberId ? (
              <Comment_Buttons_Wrapper>
                <button
                  className="Edit_Comment_Button"
                  onClick={toggleEdit}
                  id={idx}
                >
                  수정
                </button>
                <button
                  className="Delete_Comment_Button"
                  onClick={deleteComment}
                  id={idx}
                >
                  삭제
                </button>
              </Comment_Buttons_Wrapper>
            ) : null}
          </div>
          <Custom_Hr />
        </li>
      ))}
      <New_Comment
        placeholder="댓글을 입력하세요"
        onChange={(e) => setNewComment(e.target.value)}
        value={newComment}
      />
      <Comment_Buttons_Wrapper>
        <Comment_Button onClick={isEditOn ? editComment : addComment}>
          {isEditOn ? '댓글 수정하기' : '댓글 추가하기'}
        </Comment_Button>
        {isEditOn ? (
          <Comment_Button
            className="Comment_Cancel_Button"
            onClick={cancelEdit}
          >
            수정 취소하기
          </Comment_Button>
        ) : null}
      </Comment_Buttons_Wrapper>
    </Comment_Wrapper>
  );
};

export default Comments;
