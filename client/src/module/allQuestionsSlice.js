import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//for main page render
const getAllQuestionsThunk = createAsyncThunk(
  'thunkModule/getAllQuestionsThunk',
  async (data) => {
    const { page, size, sortingMethod } = data;
    try {
      await axios
        .get(
          `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/questions?page=${page}&size=${size}&sort=${sortingMethod}`
        )
        .then((result) => {
          console.log(result.data.data);
          return result.data.data;
        });
    } catch (e) {
      console.error(e);
    }
  }
);

const initialState = {
  allQuestions: [],
};

const allQuestionsSlice = createSlice({
  name: 'allQuestionsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllQuestionsThunk.fulfilled,
      (state, action) => (state.questions = [action.payload])
    );
  },
});

export default allQuestionsSlice;
export { getAllQuestionsThunk };
