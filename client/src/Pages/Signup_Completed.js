import { Link } from "react-router-dom";
import styled from "styled-components";


const Wrapper = styled.div `
		display:flex;
		flex-direction: column;
		align-items: center;
		margin-top: 30vh;
		height: 100vh;
		* {
				margin: 10px;
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

const Button_Wrapper = styled.div `
	display: flex;
`

const Login_Button = styled.button ` 
	font-weight: bold;
	height: 30px;
	width: 80px;
	border-radius: 5px;
	background-color: #C0C0C0;
	border: none;
	color: #333333;
	&:hover {
		background-color: #A6A6A6;
		cursor: pointer;
	}
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


const Signup_Completed = () => {
		return (
				<Wrapper>
						<Icon src='Icon.png' />
						<Message>
								You are successfully signed up!
						</Message>
						<Button_Wrapper>
							<Link to ='/login'>
								<Login_Button>Log in</Login_Button>
							</Link>
							<Link to ='/'>
								<Main_Button>To Main</Main_Button>
							</Link>
						</Button_Wrapper>
				</Wrapper>
		)

}

export default Signup_Completed;