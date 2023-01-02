import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getQuestionThunk = createAsyncThunk(
  'thunkModule/postQuestionThunk',
  async (data) => {
    const questionId = data;
    try {
      const response = await axios
        .get(
          `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/questions/${questionId}`
        )
        .then((data) => data.data.data);

      return response;
    } catch (e) {
      console.error(e);
    }
  }
);
const initialState = {
  title: '',
  text: '',
  tags: [],
};

const questionPageInfoSlice = createSlice({
  name: 'questionPageInfoSlice',
  initialState,
  reducers: {
    getQuestionAction: (state, action) => {
      const { title, text, tags } = action.payload;
      state.title = title;
      state.text = text;
      state.tags = tags;
    },
  },
});

export const { getQuestionAction } = questionPageInfoSlice.actions;
export default questionPageInfoSlice;
