import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Edit_Answer_Wrapper = styled.div`
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

export default function EditAnswer() {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [textEditorValue, setTextEditorValue] = useState('');
  const navigate = useNavigate();

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
      alert('질문은 20자 이상이어야 합니다.');
    }
    data['text'] = textEditorValue;
    console.log(data);
  };

  return (
    <Edit_Answer_Wrapper>
      <form className="Login_Form" onSubmit={handleSubmit(onSubmit)}>
        <Text_Wrapper>
          <h3>
            <label className="Form_Label" htmlFor="email">
              내 답변
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

        <div className="Form_Buttons">
          <input value="답변 수정하기" role="button" type="submit" />
          <button onClick={cancelRegister}>취소</button>
        </div>
      </form>
    </Edit_Answer_Wrapper>
  );
}
