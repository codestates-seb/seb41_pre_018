import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//for main page render
const getQuestions = createAsyncThunk(
  'questionsSlice/getQuestions',
  async () => {
    await axios.get('http://localhost:8080/questions');
  }
);

const initialState = {
  questions: [],
};

const questionsSlice = createSlice({
  name: 'questionsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getQuestions.fulfilled,
      (state, action) => (state.questions = [action.payload])
    );
  },
});

export default questionsSlice;
export { getQuestions };
