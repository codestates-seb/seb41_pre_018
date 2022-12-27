import { useState } from "react";
import styled from "styled-components";
import { data } from "../dummydata";

const Custom_Hr = styled.hr` 
    width: 75rem;
    align-items: center;
    opacity: 70%;
`

const Comment_Wrapper = styled.div`
    width: 75rem;
    display: flex;
    flex-direction: column;
    * {
        margin: 10px;
    }
`

const Comment_Button = styled.button`
    width: 100px;
`

const New_Comment = styled.textarea`
    width: 75rem;
    height: 70px;
`

const Comments = () => {
    const [newComment, setNewComment] = useState();
    return (
        <Comment_Wrapper>
            {data.comments.map(item=><><Comment_Wrapper>{item.comment}</Comment_Wrapper><Custom_Hr/></>)}
            <New_Comment placeholder="댓글을 입력하세요" onChange={e => setNewComment(e.target.value)} value={newComment}/>
            <Comment_Button onClick={() => console.log(newComment)}>댓글 추가하기</Comment_Button>
        </Comment_Wrapper>
    )
}

export default Comments;