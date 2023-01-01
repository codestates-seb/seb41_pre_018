import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { patchQuestionThunk } from '../module/thunkModule.js';

import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

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

    input,
    button {
      border: none;
      width: 100px;
      height: 30px;
      border-radius: 5px;
      padding: 5px;
      margin-right: 25px;
      font-size: 14px;
    }

    input {
      background-color: rgb(9, 149, 253);
      color: white;

      &:hover {
        cursor: pointer;
        border: solid black 1.5px;
      }
    }

    button {
      color: rgb(110, 152, 183);
      background-color: transparent;

      &:hover {
        cursor: pointer;
        color: black;
      }
    }
  }
`;

const Text_Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 15px 25px;

  h3 {
    margin: 0 0 10px 0;
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
    top: 55%;
    color: rgb(40, 128, 185);
    font-size: 14px;
    margin-left: 10px;

    .Tag {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(225, 236, 244);
      padding: 2.5px;
      margin-right: 5px;
      border-radius: 3px;

      span {
        margin-right: 2px;
      }

      div {
        height: 100%;
        border: none;
        font-size: 16px;
        font-weight: bold;
        background-color: rgb(225, 236, 244);
        color: rgb(40, 128, 185);

        &:hover {
          cursor: pointer;
          color: black;
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
  // 질문 상세 페이지에서 가져올 더미 데이터
  // => 상태로 전달 받을 예정이며 정상 구현 이후 해당 변수는 삭제합니다.
  const currentId = useParams();
  const { title, text, tags } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { title: '' },
  });
  const [userTags, setUserTags] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [tagInputXCord, setTagInputXCord] = useState(0);
  const [textEditorValue, setTextEditorValue] = useState();
  const navigate = useNavigate();
  const [cookies] = useCookies([]);

  useEffect(() => {
    setValue('title', title);
    setTextEditorValue(text);
    setUserTags(tags);
  }, []);
  useEffect(() => {
    setTagInputXCord(document.querySelector('.Tag_Wrapper').clientWidth + 7.5);
  }, [userTags]);

  const handleUserTagInput = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }

    if (userInput !== '' && (event.keyCode === 188 || event.keyCode === 32)) {
      setUserInput('');
      setUserTags(userTags.concat({ hashTag: event.target.value }));
    }
  };

  const handleUserInput = (event) => {
    const filteredString = event.target.value.replace(',', '');
    setUserInput(filteredString.trim());
    setTagInputXCord(document.querySelector('.Tag_Wrapper').clientWidth + 7.5);
  };
  const deleteTag = (event) => {
    const filter = userTags.filter((el) => {
      return el.tagId !== Number(event.target.id);
    });
    setUserTags(filter);
    setTagInputXCord(document.querySelector('.Tag_Wrapper').clientWidth + 7.5);
    event.preventDefault();
  };

  const cancelRegister = () => {
    if (confirm('정말 취소하시겠습니까?')) {
      navigate('./../');
    }
  };

  const handleTextEditorChange = (val) => {
    setTextEditorValue(val);
  };

  const onSubmit = async (data) => {
    const { title } = data;
    if (textEditorValue === '') {
      alert('질문의 내용을 작성해 주세요.');
    } else if (textEditorValue.length < 27) {
      // <p> 태그를 기본적으로 포함하고 있기 때문에 길이를 20자 이상일 경우 +7
      alert('질문은 20자 이상이어야 합니다.');
    } else {
      if (confirm('수정한 내용을 등록하시겠습니까?')) {
        const tags = [];

        userTags.forEach((item) => tags.push({ hashTag: `${item.hashTag}` }));
        data['text'] = textEditorValue;
        data['tags'] = tags;
        data['cookie'] = cookies.access_token;
        data.questionId = currentId.id;

        const response = await dispatch(patchQuestionThunk(data)).then(
          (data) => {
            if (data.payload !== false) {
              alert('질문이 수정되었습니다');
              navigate('./../');
            } else {
              alert(`에러: 에러코드${data.payload.status}`);
            }
          }
        );
      }
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
                  <div
                    className="Tag"
                    key={a.tagId !== undefined ? a.tagId : idx}
                    id={`Tag${idx}`}
                  >
                    <span>{a.hashTag}</span>
                    <div type="button" onClick={deleteTag} id={a.tagId}>
                      x
                    </div>
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
