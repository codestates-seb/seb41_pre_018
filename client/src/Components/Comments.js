import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { deleteCommentThunk, postCommentThunk } from '../module/thunkModule';

const Custom_Hr = styled.hr`
  width: 99%;
  align-items: center;
  opacity: 70%;
`;

const Comment_Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  flex-direction: column;

  .Comment_Block {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .Comment_Buttons {
    width: 100px;
  }

  .Delete_Comment_Button,
  .Edit_Comment_Button {
    padding: 5px;
    border: none;
    background-color: transparent;
    color: rgb(52, 152, 218);
    margin-right: 10px;

    &:hover {
      cursor: pointer;
      color: blue;
    }
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
  &:hover {
    background-color: #c3c3c3;
    cursor: pointer;
  }
`;

const New_Comment = styled.textarea`
  padding: 10px;
  resize: none;
  width: auto;
  height: 50px;
  border: 1px solid #c3c3c3;
  &:focus {
    outline: none;
    border: 1.5px solid lightblue;
    box-shadow: 0px 0px 5px 0px rgba(126, 202, 230, 1);
  }
`;

const Comments = ({ currentQuestion, commentsData, setCommentsData }) => {
  const dispatch = useDispatch();

  const [isPosted, setIsPosted] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const navigate = useNavigate();

  const addComment = () => {
    async function postComment() {
      const response = await dispatch(
        postCommentThunk({
          questionId: currentQuestion.questionId,
          text: newComment,
          cookie: cookies.access_token,
        })
      ).then((res) => {
        setNewComment('');
      });
    }
    postComment();
    setIsPosted(true);
  };

  const deleteComment = (event) => {
    async function deleteComment() {
      const response = await dispatch(
        deleteCommentThunk({
          questionId: currentQuestion.questionId,
          commentId: commentsData[event.target.id].commentId,
          cookie: cookies.access_token,
        })
      );
    }
    deleteComment();
    setCommentsData(
      commentsData.filter(
        (a) => a.commentId !== commentsData[event.target.id].commentId
      )
    );
  };

  return (
    <Comment_Wrapper>
      {currentQuestion.comments.map((item, idx) => (
        <Comment_Wrapper key={`${currentQuestion.questionId}_${idx}`}>
          <div className="Comment_Block">
            {item.text}
            <div className="Comment_Buttons">
              <button className="Edit_Comment_Button">수정</button>
              <button
                className="Delete_Comment_Button"
                onClick={deleteComment}
                id={idx}
              >
                삭제
              </button>
            </div>
          </div>
          <Custom_Hr />
        </Comment_Wrapper>
      ))}
      <New_Comment
        placeholder="댓글을 입력하세요"
        onChange={(e) => setNewComment(e.target.value)}
        value={newComment}
      />
      <Comment_Button onClick={addComment}>댓글 추가하기</Comment_Button>
    </Comment_Wrapper>
  );
};

export default Comments;
