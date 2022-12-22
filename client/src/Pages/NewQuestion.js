import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const New_Question_Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 30px 50px;
  width: 80%;
  height: 700px;
  margin: 0 auto;
`;

export default function NewQuestion() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <New_Question_Wrapper>
      <h1>새 질문을 추가합니다.</h1>
      <div className="New_Question_Guide">
        <h3>Writing a good question</h3>
        <p>
          You’re ready to ask a programming-related question and this form will
          help guide you through the process. Looking to ask a non-programming
          question? See the topics here to find a relevant site.
        </p>
        <ul>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>
            Add “tags” which help surface your question to members of the
            community.
          </li>
          <li>Review your question and post it to the site</li>
        </ul>
      </div>

      <form className="Login_Form" onSubmit={handleSubmit(onSubmit)}>
        <div className="Text_Wrapper">
          <h3>
            <label className="Form_Label" htmlFor="email">
              Title
            </label>
          </h3>
          <p>
            Be specific and imagine you’re asking a question to another person.
          </p>
          <input
            id="title"
            {...register('title', {
              required: '제목을 입력해주세요',
            })}
            placeholder="제목을 입력해주세요"
            type="text"
          />
        </div>

        <div className="Text_Wrapper">
          <h3>
            <label className="Form_Label" htmlFor="email">
              What are the details of your problem and what did you try and what
              were you expecting?
            </label>
          </h3>
          <p>Minimum 20 characters.</p>
        </div>

        <div className="Text_Wrapper">
          <h3>
            <label className="Form_Label" htmlFor="email">
              Tags
            </label>
          </h3>
          <p>
            Be specific and imagine you’re asking a question to another person.
          </p>
          <input
            id="tags"
            {...register('tags', {
              required: '태그를 입력해주세요',
            })}
            placeholder="태그를 입력해주세요"
            type="text"
          />
        </div>
        <div className="Form_Buttons">
          <input value="Post your question" type="submit" />
          <button>Discard draft</button>
        </div>
      </form>
    </New_Question_Wrapper>
  );
}
