import { useState } from 'react';
import styled from 'styled-components';
import { data } from '../dummydata';

const Custom_Hr = styled.hr`
  width: 99%;
  align-items: center;
  opacity: 70%;
`;

const Comment_Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  * {
    margin: 10px;
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

const Comments = ({ questionId }) => {
  const [newComment, setNewComment] = useState();
  return (
    <Comment_Wrapper>
      {data.comments.map((item, idx) => (
        <div key={`${questionId}_${idx}`}>
          <Comment_Wrapper>{item.comment}</Comment_Wrapper>
          <Custom_Hr />
        </div>
      ))}
      <New_Comment
        placeholder="댓글을 입력하세요"
        onChange={(e) => setNewComment(e.target.value)}
        value={newComment}
      />
      <Comment_Button onClick={() => console.log(newComment)}>
        댓글 추가하기
      </Comment_Button>
    </Comment_Wrapper>
  );
};

export default Comments;
