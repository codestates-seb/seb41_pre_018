import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const New_Question_Wrapper = styled.div`
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [userTags, setUserTags] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [tagInputXCord, setTagInputXCord] = useState(0);
  const [textEditorValue, setTextEditorValue] = useState('');
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
    } else if (textEditorValue.length < 26) {
      // <p> 태그를 기본적으로 포함하고 있기 때문에 길이를 20자 이상일 경우 +6
      alert('질문은 20자 이상이어야 합니다.');
    }
    data['text'] = textEditorValue;
    data['tags'] = userTags;
    console.log(data);
  };

  return (
    <New_Question_Wrapper>
      <h1>새 질문을 추가합니다.</h1>
      <div className="New_Question_Guide">
        <h3>좋은 질문을 하는 법</h3>
        <p>
          이제 프로그래밍과 관련된 질문을 할 준비가 되었군요. 아래 항목을 참조해
          질문을 작성해 보세요. 분명 도움이 되실 겁니다.
        </p>
        <ul>
          <li>현재 겪고 있는 문제를 제목에 한 줄로 요약해 보세요.</li>
          <li>해당 문제에 대해 더 자세한 설명을 적어 보세요.</li>
          <li>
            어떠한 시도를 했고, 그 때 예상했던 결과물이 무엇인지 설명해 보세요.
          </li>
          <li>
            커뮤니티 멤버들이 질문을 알아차릴 수 있게 "태그"를 추가해 보세요.
          </li>
          <li>마지막으로 질문을 점검하고, 웹 사이트에 추가해 보세요.</li>
        </ul>
      </div>

      <form className="Login_Form" onSubmit={handleSubmit(onSubmit)}>
        <Text_Wrapper>
          <h3>
            <label className="Form_Label" htmlFor="email">
              제목
            </label>
          </h3>
          <p>실제 사람에게 질문한다고 생각하고 자세하게 설명해 주세요.</p>
          <input
            id="title"
            {...register('title', {
              required: '제목을 입력해주세요',
            })}
            placeholder="제목을 입력해주세요"
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
              현재 질문하고자 하는 문제에 대해 더 자세한 설명과 문제를 해결하기
              위해 어떤 노력을 했고, 어떤 결과를 예상했는지 적어 주세요.
            </label>
          </h3>
          <p>최소 20자 이상 입력해주세요</p>
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
          <p>
            현재 문제와 연관성이 있다고 생각하는 키워드로 태그를 작성해 주세요.
          </p>

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
          <input value="질문 등록하기" role="button" type="submit" />
          <button onClick={cancelRegister}>등록 취소하기</button>
        </div>
      </form>
    </New_Question_Wrapper>
  );
}
