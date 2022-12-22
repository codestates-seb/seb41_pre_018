import styled from 'styled-components';


const Title = styled.div`
  color: rgb(41, 128, 185);
  font-size: 20px;
`;
const Content = styled.div`
  color: rgb(51, 51, 51);
  font-size: 12px;
`;
const Count_Wrapper = styled.div`
  color: rgb(51, 51, 51);
  font-size: 12px;
  padding-left: 10px;
`

const Question_Wrapper = styled.div`
  display: flex;
  width: 1000px;
  height: 130px;
  border: 1px solid #D9D9D9;
  justify-content: space-between;
  align-items: center;
  border-bottom: none;
  * {
    margin: 10px;
  }
`;
const Content_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 80px;
  /* border: 1px solid darkgray; */
  justify-content: space-between;
`;
const Userinfo_Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 250px;
  height: 20px;
  /* border: 1px solid lightblue; */
  font-size: 8px;
  margin-top: 70px;
  * {
    margin-right: 5px;
  }
`
const Profile_Image = styled.img`
  cursor: pointer;
  height: 20px;
  width: 20px;
  border-radius: 5px;
`;

const Question = (props) => {
  return (
    <div>        
      <Question_Wrapper>
          <Count_Wrapper>
            {props.vote} votes
            <br />0 answers
            <br />
            {props.views} views
          </Count_Wrapper>
          <Content_Wrapper>
            <Title>{props.title}</Title>
            <Content>{props.content}</Content>
          </Content_Wrapper>
          <Userinfo_Wrapper>
            <Profile_Image src="Sample_Avatar.png"/>
            {`${props.username} `}
            {`${props.createdAt}`}
          </Userinfo_Wrapper>
        </Question_Wrapper>
    </div>
  );
};

export default Question;
