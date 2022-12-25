import styled from 'styled-components';
import { data } from '../dummydata';
import { RiDiscussFill } from 'react-icons/ri';

const Title = styled.div`
  color: rgb(41, 128, 185);
  font-size: 20px;
`;
const Content = styled.div`
  color: rgb(51, 51, 51);
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Count_Wrapper = styled.div`
  color: rgb(51, 51, 51);
  width: 100px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  * {
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
`

const Question_Wrapper = styled.div`
  display: flex;
  width: 1000px;
  height: 130px;
  border: 1px solid #D9D9D9;
  justify-content: space-between;
  align-items: center;
  border-bottom: none;
`;
const Content_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 80px;
  justify-content: space-between;
  margin-left: 20px;
`;
const Userinfo_Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 20px;
  font-size: 8px;
  margin-right: 20px;
  margin-top: 70px;
  * {
    margin-right: 5px;
  }
`
const Username = styled.span`
  font-weight: bold;
  font-size: 12px;
  color: #454545;
`
const Created_At = styled.span`
  font-size: 12px;
  color: #454545;
`

const Profile_Image = styled.img`
  cursor: pointer;
  height: 20px;
  width: 20px;
  border-radius: 5px;
`;

const Votes = styled.div`
`
const Answers = styled.div`
`
const Views = styled.div`
`

const Votes_Search = styled.p`
  color: black;
`
const Answers_Search = styled.div`
  color: white;
  background-color: #2F6F44;
  padding: 3px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`
const Views_Search = styled.p`
  color: #7D2121;
`

const Tag_Wrapper = styled.div`
  display: flex;
  *{
    margin-right: 10px;
  }
`
const Tags = styled.div`
  font-size: 12px;
  background-color: #E1ECF4;
  border-radius: 5px;
  padding: 5px;
  color: #39739D;
  width: fit-content;
`



const Question = (props) => {
  return (
    <div>        
      <Question_Wrapper>
          <Count_Wrapper>
            {props.isSearch ? <Votes_Search>{`${props.vote} votes`}</Votes_Search> : <Votes>{`${props.vote} votes`}</Votes>}
            {props.isSearch ? <Answers_Search>{`✓ ${data.question.length} answers`}</Answers_Search> : <Answers>{`${data.question.length} answers`}</Answers>}
            {props.isSearch ? <Views_Search>{`${props.views} views`}</Views_Search> : <Views>{`${props.views} views`}</Views>}
          </Count_Wrapper>
          <Content_Wrapper>
            <Title>{props.isSearch ? <RiDiscussFill color="black"/> : null} {props.title}</Title>
            <Content>{props.content}</Content>
            <Tag_Wrapper>
              {props.tags.map((item)=><Tags>{item}</Tags>)}
            </Tag_Wrapper>
          </Content_Wrapper>
          <Userinfo_Wrapper>
            <Profile_Image src="Sample_Avatar.png"/>
            <Username>{`${props.username} `}</Username>
            <Created_At>{`${props.createdAt}`}</Created_At>
          </Userinfo_Wrapper>
        </Question_Wrapper>
    </div>
  );
};

export default Question;
