import { createAsyncThunk } from '@reduxjs/toolkit';

export const isLoginThunk = createAsyncThunk(
  'thunkModule/inLoginThunk',
  async () => {
    await axios.get('http://localhost:8080/questions');
  }
);
export const LogoutThunk = createAsyncThunk(
  'thunkModule/LogoutThunk',
  async () => {
    await axios.get('http://localhost:8080/questions');
  }
);
export const getAllQuestionsThunk = createAsyncThunk(
  'thunkModule/getAllQuestionsThunk',
  async () => {
    await axios.get('http://localhost:8080/questions');
  }
);
export const getUserInfoThunk = createAsyncThunk(
  'thunkModule/getUserInfoThunk',
  async () => {
    await axios.get('http://localhost:8080/questions');
  }
);
export const deleteUserThunk = createAsyncThunk(
  'thunkModule/deleteUserThunk',
  async () => {
    await axios.get('http://localhost:8080/questions');
  }
);
export const patchUserThunk = createAsyncThunk(
  'thunkModule/patchUserThunk',
  async () => {
    await axios.get('http://localhost:8080/questions');
  }
);
export const getQuestionThunk = createAsyncThunk(
  'thunkModule/postQuestionThunk',
  async () => {
    await axios.get('http://localhost:8080/questions');
  }
);
export const postQuestionThunk = createAsyncThunk(
  'thunkModule/postQuestionThunk',
  async () => {
    await axios.get('http://localhost:8080/questions');
  }
);
export const delteQuestionThunk = createAsyncThunk(
  'thunkModule/deleteQuestionThunk',
  async () => {
    await axios.get('http://localhost:8080/questions');
  }
);
export const patchQuestionThunk = createAsyncThunk(
  'thunkModule/patchQuestionThunk',
  async () => {
    await axios.get('http://localhost:8080/questions');
  }
);
export const postAnswerThunk = createAsyncThunk(
  'thunkModule/postAnswerThunk',
  async () => {
    await axios.get('http://localhost:8080/questions');
  }
);
export const patchAnswerThunk = createAsyncThunk(
  'thunkModule/patchAnswerThunk',
  async () => {
    await axios.get('http://localhost:8080/questions');
  }
);
export const deleteAnswerThunk = createAsyncThunk(
  'thunkModule/deleteAnswerThunk',
  async () => {
    await axios.get('http://localhost:8080/questions');
  }
);

export const postCommentThunk = createAsyncThunk(
  'thunkModule/postCommentThunk',
  async () => {
    await axios.get('http://localhost:8080/questions');
  }
);
export const deleteCommentThunk = createAsyncThunk(
  'thunkModule/deleteCommentThunk',
  async () => {
    await axios.get('http://localhost:8080/questions');
  }
);
