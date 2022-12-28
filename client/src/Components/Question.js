import styled from 'styled-components';
import { data } from '../dummydata';
import { RiDiscussFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Title = styled.a`
  color: rgb(41, 128, 185);
  font-size: 20px;
`;

const Custom_Div = styled.div`
  white-space: normal;
  word-break: break-all;
  overflow: auto;
`

const Content = styled.div`
  color: rgb(51, 51, 51);
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Count_Wrapper = styled.div`
  color: rgb(51, 51, 51);
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  * {
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;
const Question_Wrapper = styled.div`
  display: flex;
  width: 1000px;
  height: 160px;
  border: 1px solid #d9d9d9;
  justify-content: space-around;
  align-items: center;
  border-bottom: none;
  
`;
const Content_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 130px;
  justify-content: space-between;
  overflow: auto;
  margin-right: 10px;
`;
const Userinfo_Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  font-size: 8px;
  /* margin-right: 20px;
  margin-top: 70px; */
  * {
    margin-right: 5px;
  }
`;
const Username = styled.span`
  font-weight: bold;
  font-size: 12px;
  color: #454545;
`;
const Created_At = styled.span`
  font-size: 12px;
  color: #454545;
`;

const Profile_Image = styled.img`
  cursor: pointer;
  height: 20px;
  width: 20px;
  border-radius: 5px;
`;

const Votes = styled.div``;
const Answers = styled.div``;
const Views = styled.div``;

const Votes_Search = styled.p`
  color: black;
`;
const Answers_Search = styled.div`
  color: white;
  background-color: #2f6f44;
  padding: 3px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;
const Views_Search = styled.p`
  color: #7d2121;
`;

const Tag_Wrapper = styled.div`
  display: flex;
  * {
    margin-right: 10px;
  }
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

const Bottom_Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const Question = (props) => {
  return (
    <div>
      <Question_Wrapper>
        <Count_Wrapper>
          {props.isSearch ? (
            <Votes_Search>{`${props.vote} votes`}</Votes_Search>
          ) : (
            <Votes>{`${props.vote} votes`}</Votes>
          )}
          {props.isSearch ? (
            <Answers_Search>{`✓ ${data.question.length} answers`}</Answers_Search>
          ) : (
            <Answers>{`${data.question.length} answers`}</Answers>
          )}
          {props.isSearch ? (
            <Views_Search>{`${props.views} views`}</Views_Search>
          ) : (
            <Views>{`${props.views} views`}</Views>
          )}
        </Count_Wrapper>
        <Content_Wrapper>
          <Link to={`question/${props.idx}`} style={{ textDecoration: 'none' }}>
            <Title>
              {props.isSearch ? <RiDiscussFill color="black" /> : null}{' '}
              {props.title}
            </Title>
          </Link>
          <Content>
            <Custom_Div>
              {props.content.length <= 380 ? props.content.replace(/<[^>]*>?/g, '') : props.content.replace(/<[^>]*>?/g, '').slice(0,380) + '...'}
            </Custom_Div>
          </Content>
          <Bottom_Wrapper>
            <Tag_Wrapper>
              {props.tags.map((item) => (
                <Tags>{item}</Tags>
              ))}
            </Tag_Wrapper>
            <Userinfo_Wrapper>
                <Profile_Image src="Sample_Avatar.png" />
                <Username>{`${props.username} `}</Username>
                <Created_At>{`${props.createdAt}`}</Created_At>
            </Userinfo_Wrapper>
          </Bottom_Wrapper>
        </Content_Wrapper>
      </Question_Wrapper>
    </div>
  );
};

export default Question;
