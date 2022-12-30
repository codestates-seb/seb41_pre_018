import { Link } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    display: flex;
    justify-content: center;
`

const Wrapper = styled.div `
		display:flex;
		flex-direction: column;
		align-items: center;
`

const Wrapper_2 = styled.div `
    display:flex;
    width: 500px;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 25vh;
    * {
       margin-right: 10px;
       margin-bottom: 30px;
    }
`

const Icon = styled.img `
    width: 50px;
`

const Message = styled.div `
    color: #333333;
    font-weight: bold;
    font-size: 24px;
`

const Sub_Message = styled.div `
    color: #333333;
    font-size: 13px;
`

const Main_Button = styled.button ` 
	font-weight: bold;
	height: 30px;
	width: 80px;
	border-radius: 5px;
	background-color: #F4811E;
	border: none;
	color: white;
	&:hover {
		background-color: #D9731B;
		cursor: pointer;
	}
`

const Deleteuser_Completed = () => {
		return (
				<Wrapper>
                    <Wrapper_2>
                        <GlobalStyle/>
						<Icon src='Icon.png' />
						<Message>
                            Profile deleted  
						</Message>
                        <Sub_Message>
                            Your profile has been successfully deleted and you are now logged out.
                        </Sub_Message>
							<Link to ='/'>
								<Main_Button>To Main</Main_Button>
							</Link>
                    </Wrapper_2>
				</Wrapper>
		)

}

export default Deleteuser_Completed;