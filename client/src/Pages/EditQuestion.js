import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { data } from './../dummydata.js';

const Edit_Question_Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 30px 50px;
  width: 80%;
  height: 1200px;
  margin: 0 auto;

  .New_Question_Guide {
    background-color: aliceblue;
    padding: 15px 25px;
  }

  .Login_Form {
    width: 100%;
  }

  .Form_Buttons {
    background-color: white;
    display: flex;
    padding: 15px 25px;

    button,
    input {
      background-color: aliceblue;
      border: none;
      width: 150px;
      height: 30px;
      padding: 5px;
      font-size: 16px;
      margin-right: 25px;

      &:hover {
        cursor: pointer;
        border: solid black 1px;
      }
    }

    button {
      color: red;
    }
  }
`;

const Text_Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 15px 25px;

  h3 {
    margin: 0;
  }

  input {
    height: 30px;
    border: 1px solid black;
  }

  &:nth-child(3) {
    position: relative;
  }

  .Error_Message {
    margin-top: 2.5px;
    color: rgba(240, 40, 70, 0.9);
  }

  .Tag_Wrapper {
    position: absolute;
    display: flex;
    top: 69%;
    margin-left: 10px;

    .Tag {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid black;
      background-color: aliceblue;
      margin-right: 5px;

      span {
        margin-right: 2px;
      }
      button {
        height: 100%;
        border: none;
        border-left: 1px solid black;
        background-color: white;

        &:hover {
          cursor: pointer;
          background-color: gainsboro;
        }
      }
    }
  }

  .Rich_Text_Editor {
    border: 1px solid black;
    .ql-container {
      height: 250px;
    }
  }
`;

const Tag_Input_Field = styled.input`
  padding-left: ${(props) => props.tagInputXCord}px;
`;

export default function NewQuestion() {
  console.log(data.question[0].title);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [userTags, setUserTags] = useState(data.question[0].tags);
  const [userInput, setUserInput] = useState('');
  const [tagInputXCord, setTagInputXCord] = useState(0);
  const [textEditorValue, setTextEditorValue] = useState(data.question[0].text);
  const navigate = useNavigate();

  useEffect(() => {
    setTagInputXCord(document.querySelector('.Tag_Wrapper').clientWidth + 7.5);
  }, [userTags]);

  const handleUserTagInput = (event) => {
    if (userInput !== '' && (event.keyCode === 188 || event.keyCode === 32)) {
      setUserInput('');
      userTags.push(event.target.value);
    }
  };

  const handleUserInput = (event) => {
    const filteredString = event.target.value.replace(',', '');
    setUserInput(filteredString.trim());
    setTagInputXCord(document.querySelector('.Tag_Wrapper').clientWidth + 7.5);
  };

  const deleteTag = (event) => {
    userTags.splice(event.target.id, 1);
    setTagInputXCord(
      document.querySelector('.Tag_Wrapper').clientWidth +
        7.5 -
        document.querySelector(`#Tag${userTags.length}`).clientWidth -
        5
    );
  };

  const cancelRegister = () => {
    if (confirm('정말 취소하시겠습니까?')) {
      navigate('/');
    } else {
    }
  };

  const handleTextEditorChange = (val) => {
    setTextEditorValue(val);
  };

  const onSubmit = (data) => {
    if (textEditorValue === '') {
      alert('질문의 내용을 작성해 주세요.');
    } else if (textEditorValue.length < 27) {
      // <p> 태그를 기본적으로 포함하고 있기 때문에 길이를 20자 이상일 경우 +7
      alert('질문은 20자 이상이어야 합니다.');
    } else {
      data['text'] = textEditorValue;
      data['tags'] = userTags;
      console.log(data);
    }
  };

  return (
    <Edit_Question_Wrapper>
      <h1>질문 수정 페이지</h1>
      <form className="Login_Form" onSubmit={handleSubmit(onSubmit)}>
        <Text_Wrapper>
          <h3>
            <label className="Form_Label" htmlFor="email">
              제목
            </label>
          </h3>
          <input
            id="title"
            {...register('title', {
              required: '제목을 입력해주세요',
            })}
            value={data.question[0].title}
            type="text"
          />
          {errors.title && (
            <span className="Error_Message" role="alert">
              {errors.title.message}
            </span>
          )}
        </Text_Wrapper>

        <Text_Wrapper>
          <h3>
            <label className="Form_Label" htmlFor="email">
              내용
            </label>
          </h3>
          <ReactQuill
            theme="snow"
            className="Rich_Text_Editor"
            placeholder="내용을 입력해주세요"
            value={textEditorValue}
            onChange={handleTextEditorChange}
          />
        </Text_Wrapper>

        <Text_Wrapper>
          <h3>
            <label className="Form_Label" htmlFor="email">
              태그
            </label>
          </h3>

          <Tag_Input_Field
            id="tags"
            type="text"
            value={userInput}
            onChange={handleUserInput}
            onKeyDown={handleUserTagInput}
            tagInputXCord={tagInputXCord}
          />
          {userTags ? (
            <div className="Tag_Wrapper">
              {userTags.map((a, idx) => {
                return (
                  <div className="Tag" key={`Tag${idx}`} id={`Tag${idx}`}>
                    <span>{a}</span>
                    <button onClick={deleteTag} id={idx}>
                      x
                    </button>
                  </div>
                );
              })}
            </div>
          ) : null}
        </Text_Wrapper>

        <div className="Form_Buttons">
          <input value="질문 수정하기" role="button" type="submit" />
          <button onClick={cancelRegister}>수정 취소하기</button>
        </div>
      </form>
    </Edit_Question_Wrapper>
  );
}
