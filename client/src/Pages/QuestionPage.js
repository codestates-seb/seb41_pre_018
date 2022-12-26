import { useState } from "react";
import Comments from "../Components/Comments";
MdKeyboardArrowUp
import { MdKeyboardArrowUp, MdKeyboardArrowDown} from 'react-icons/md';

const Outer_Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 47px;
    position: fixed;
    overflow-y: scroll;
`

const Content_Wrapper =styled.div`
    display: flex;
`

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
`

const Question_Title = styled.div`
    font-size: 38px;
`

const Profile_Image = styled.img`
  cursor: pointer;
  height: 30px;
  width: 30px;
  border-radius: 5px;
`;

const Username = styled.div`
    font-size: 18px;
`

const Userinfo_Wrapper = styled.div `
    display: flex;
    justify-content: space-between;
`

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
`

const Button_Wrapper = styled.div`
    display: flex;
    * {
        margin: 5px;
    }
`

const Button = styled.button`
    height: 30px;
    width: 85px;
    font-size: 10px;
    font-weight: bold;
    letter-spacing: normal;
    font-family: -apple-system, "system-ui", "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif;
    color: black;
    text-align: center;
    line-height: 30px;
    border-radius: 4px;
    word-break: break-all;
    white-space: pre-wrap;
    cursor: pointer;
    border: none;
    font-weight: border;
`
const Blue_Button = styled(Button)`
    color: white;
    background-color: #3498db;
`
const Red_Button = styled(Button)`
    background-color: #b55454;
    color: white;
`
const Answer_Delete_Button = styled(Button)`
    background-color: #3498db;
    color: white;
`
const Answer_Edit_Button = styled(Button)`
    background-color: #b55454;
    color: white;
`

const Custom_Hr = styled.hr` 
    width: 1400px;
    align-items: center;
    opacity: 70%;
`
const Vote_Wrapper = styled.div`
    height: 90px;
    width: 30px;
    /* border: 1px solid gray; */
    border-radius: 5px;
    background-color: none;
`
const Vote_Count = styled.div`
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Text_Content = styled.div`
    width: 80rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
    margin-left: 30px;
    * {
        margin: 30px;
    }
`
const Question_Image = styled.img`
    width: 500px;
`
const Gray_Text = styled.span`
    color: #7F7F7F;
    white-space: pre;
`
const Middle_Text_Wrapper = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
`



const Question_Page = () => {
    const [questionVotes, setQuestionVotes] = useState(0);
    const [answerVotes, setAnswerVotes] = useState(0);
    
    const upVote_question = () => {
        setQuestionVotes(questionVotes + 1)
    }  
    const downVote_question = () => {
        setQuestionVotes(questionVotes - 1)
    }
    
    const upVote_answer = () => {
        setAnswerVotes(answerVotes + 1)
    }  
    const downVote_answer = () => {
        setAnswerVotes(answerVotes - 1)
    }
    

    return (
        <Outer_Wrapper>
            <Inner_Wrapper>
                <Question_Title>Unable to open Preferences windows on scilab</Question_Title>
                <Userinfo_Wrapper>
                    <User_Wrapper>
                        <Profile_Image src={process.env.PUBLIC_URL + '/Sample_Avatar.png'}/>
                        <Username>Human_001</Username>
                    </User_Wrapper>
                        <Middle_Text_Wrapper>
                            <Gray_Text>   Asked </Gray_Text>
                            <span> today</span>
                            <Gray_Text>   Modified </Gray_Text>
                            <span> today</span>
                            <Gray_Text>   Viewed </Gray_Text>
                            <span> 2 times</span>
                        </Middle_Text_Wrapper>
                    <Button_Wrapper>
                        <Blue_Button>질문 수정하기</Blue_Button>
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
                    <Text_Content>안녕하세요.
                        섹션4 Unit10 - [Deploy] CI/CD의 Chapter3. Github Action 튜토리얼을 학습중인데
                        나만의 새로운 레포지토리를 만들고, 기존 나만의 아고라 스테이츠 서버 레퍼런스를 클론받아서 git push를 해야하는데 아래 이미지처럼 push하는 과정이 되지 않습니다.
                        <br/>
                        <Question_Image src="Question_Image.png"/>
                    </Text_Content>
                </Content_Wrapper>
                <Comments/>
                <Question_Title>내 답변</Question_Title>
                <Userinfo_Wrapper>
                    <User_Wrapper>
                        <Profile_Image src={process.env.PUBLIC_URL + '/Sample_Avatar.png'}/>
                        <Username>Human_001</Username>
                    </User_Wrapper>
                    <Middle_Text_Wrapper>
                        <Gray_Text>   Asked </Gray_Text>
                        <span> today</span>
                        <Gray_Text>   Modified </Gray_Text>
                        <span> today</span>
                        <Gray_Text>   Viewed </Gray_Text>
                        <span> 2 times</span>
                    </Middle_Text_Wrapper>
                    <Button_Wrapper>
                        <Answer_Delete_Button>답변 삭제하기</Answer_Delete_Button>
                        <Answer_Edit_Button>답변 수정하기</Answer_Edit_Button>
                    </Button_Wrapper>
                </Userinfo_Wrapper>
                <Custom_Hr />
                <Content_Wrapper>
                <Vote_Wrapper>
                    <MdKeyboardArrowUp onClick={upVote_answer} size="30" />
                    <Vote_Count>{answerVotes}</Vote_Count>
                    <MdKeyboardArrowDown onClick={downVote_answer} size="30" />
                </Vote_Wrapper>
                <Text_Content>{`collision detection
You need to define a function that checks whether two of your shapes collide. If you only have rectangles whose vertex are parallel with the OX and OY vertexes, it would look like this:

function areColliding(r1, r2) {
    return !(
           (r1.x > r2.x + r2.w) ||
           (r1.x + r1.w < r2.x) ||
           (r1.y > r2.y + r2.h) ||
           (r1.y + r1.h < r2.y)
           );
}
Of course, if some rotation or even other shapes are involved into your problem, then you need to extend/adjust the collision detector accordingly.

a shared function
You need to create a function that would receive the current status of the elements and the move that happens. It would look like this:

function handleMove(currentPositions, proposedPositions) {
    while (!validPositions(proposedPositions)) {
        proposedPositions = generateNewPositions(currentPositions, handleCollisions(proposedPositions));
    }
    refreshUI(proposedPositions);
}
currentPositions is the set of positions your elements currently have
proposedPositions is the set of positions your elements are going to have if there are no collisions
validPositions checks for any pair of shapes that would collide and returns true if none of those pair collide and false if at least one such pair collides
proposedPositions is being refreshed while there are still collisions
generateNewPositions is your handler for collision-based changes
handleCollisions effectuates changes to avoid collision
refreshUI refreshes the UI
event handling
your mouse events should handle change updates by loading all the positions of your elements and calling this shared functionality.

Note: If you have further problems, then you might need to create a reproducible example so we could see your exact structure, styling and code as well.

`}
                </Text_Content>
                </Content_Wrapper>
            </Inner_Wrapper>
        </Outer_Wrapper>
    )
}

export default Question_Page;