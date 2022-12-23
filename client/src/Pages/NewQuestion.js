import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineBold, AiOutlineItalic } from 'react-icons/ai';
import styled from 'styled-components';

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

  input {
    height: 30px;
  }

  &:nth-child(3) {
    position: relative;
  }

  .Tag_Wrapper {
    position: absolute;
    display: flex;
    top: 75%;
    margin-left: 10px;

    .Tag {
      border: 1px solid black;
      background-color: aliceblue;
      margin-right: 5px;
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
  const onSubmit = (data) => console.log(data);
  const [userTags, setUserTags] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [tagInputXCord, setTagInputXCord] = useState(0);

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
    setUserInput(event.target.value.trim());
    setTagInputXCord(document.querySelector('.Tag_Wrapper').clientWidth + 7.5);
  };

  const deleteTag = (event) => {
    userTags.pop();
    setTagInputXCord(document.querySelector('.Tag_Wrapper').clientWidth + 7.5);
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
          <p>다른 사람에게 질문한다고 생각하고 자세하게 설명해 주세요.</p>
          <input
            id="title"
            {...register('title', {
              required: '제목을 입력해주세요',
            })}
            placeholder="제목을 입력해주세요"
            type="text"
          />
        </Text_Wrapper>

        <Text_Wrapper>
          <h3>
            <label className="Form_Label" htmlFor="email">
              현재 질문하고자 하는 문제에 대해 더 자세한 설명과 문제를 해결하기
              위해 어떤 노력을 했고, 어떤 결과를 예상했는지 적어 주세요.
            </label>
          </h3>
          <p>최소 20자 이상</p>
          <textarea rows="20" cols="50"></textarea>
          {errors.textField && (
            <span className="Error_Message" role="alert">
              {errors.textField.message}
            </span>
          )}
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
            {...register('tags')}
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
                  <div className="Tag" key={`Tag${idx}`}>
                    <span>{a}</span>
                    <button onClick={deleteTag}>x</button>
                  </div>
                );
              })}
            </div>
          ) : null}
        </Text_Wrapper>

        <div className="Form_Buttons">
          <input value="질문 등록하기" role="button" type="submit" />
          <button>등록 취소하기</button>
        </div>
      </form>
    </New_Question_Wrapper>
  );
}
