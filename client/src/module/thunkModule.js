import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// export const signinThunk = createAsyncThunk(
//   'thunkModule/signinThunk',
//   async (data) => {
//     const { username, email, password } = data;
//     await axios.post('http://localhost:8080/members', {
//       username,
//       email,
//       password,
//     });
//   }
// );

// export const loginThunk = createAsyncThunk(
//   'thunkModule/loginThunk',
//   async (data) => {
//     const { email, password } = data;
//     await axios.post('http://localhost:8080/login', { email, password });
//   }
// );

// export const logoutThunk = createAsyncThunk(
//   'thunkModule/logoutThunk',
//   async () => {
//     await axios.post('http://localhost:8080/logout');
//   }
// );
export const getAllQuestionsThunk = createAsyncThunk(
  'thunkModule/getAllQuestionsThunk',
  async (data) => {
    const { page, size, sort } = data;
    await axios.get(
      `http://localhost:8080/questions?page=${page}&size=${size}&sort=${sort}`
    );
  }
);

// export const deleteUserThunk = createAsyncThunk(
//   'thunkModule/deleteUserThunk',
//   async (data) => {
//     await axios.delete(`http://localhost:8080/member/${data.memberId}`);
//   }
// );
// export const patchUserThunk = createAsyncThunk(
//   'thunkModule/patchUserThunk',
//   async (data) => {
//     await axios.patch(`http://localhost:8080/member/${data.memberId}`);
//   }
// );
export const getQuestionThunk = createAsyncThunk(
  'thunkModule/postQuestionThunk',
  async (data) => {
    const { id } = data;
    await axios.get(`http://localhost:8080/questions/${id}`);
  }
);

export const postQuestionThunk = createAsyncThunk(
  'thunkModule/postQuestionThunk',
  async (data) => {
    const { title, text, Tags } = data;
    await axios.post('http://localhost:8080/questions', { title, text, Tags });
  }
);
export const getSearchQuestionThunk = createAsyncThunk(
  'thunkModule/getSearchQuestionThunk',
  async (data) => {
    const { page, size, sort, keyword } = data;
    await axios.get(
      `http://localhost:8080/questions?page=${page}&size=${size}&sort=${sort}&keyword=${keyword}`
    );
  }
);
export const delteQuestionThunk = createAsyncThunk(
  'thunkModule/deleteQuestionThunk',
  async (data) => {
    const { id } = data;
    await axios.delete(`http://localhost:8080/questions/${id}`);
  }
);
export const patchQuestionThunk = createAsyncThunk(
  'thunkModule/patchQuestionThunk',
  async (data) => {
    const { id, title, text, Tags } = data;
    await axios.patch(`http://localhost:8080/questions/${id}`, {
      id,
      title,
      text,
      Tags,
    });
  }
);
// export const postAnswerThunk = createAsyncThunk(
//   'thunkModule/postAnswerThunk',
//   async () => {
//     await axios.post('http://localhost:8080/questions');
//   }
// );
// export const patchAnswerThunk = createAsyncThunk(
//   'thunkModule/patchAnswerThunk',
//   async () => {
//     await axios.patch('http://localhost:8080/questions');
//   }
// );
// export const deleteAnswerThunk = createAsyncThunk(
//   'thunkModule/deleteAnswerThunk',
//   async () => {
//     await axios.delete('http://localhost:8080/questions');
//   }
// );

// export const postCommentThunk = createAsyncThunk(
//   'thunkModule/postCommentThunk',
//   async () => {
//     await axios.post('http://localhost:8080/questions');
//   }
// );
// export const deleteCommentThunk = createAsyncThunk(
//   'thunkModule/deleteCommentThunk',
//   async () => {
//     await axios.delete('http://localhost:8080/questions');
//   }
// );
