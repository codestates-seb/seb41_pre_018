import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const getUserInfo = createAsyncThunk(
  'userInfoSlice/getUserInfo',

  async (data) => {
    const { email } = data;
    await axios.get(`http://localhost:8080/members/${email}`);
  }
);

const initialState = {
  email: '',
  username: '',
  created_time: '',
  modified_time: '',
  aboutMe: '',
  image: '',
  answers: [],
  questions: [],
};
const userInfoSlice = createSlice({
  name: 'userInfoSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      const {
        email,
        username,
        dayAgo,
        modified_time,
        aboutMe,
        image,
        answers,
        questions,
      } = action.payload;

      function dateChange(UserBirthDay) {
        const d1 = UserBirthDay.split('.')
          .slice(0, 3)
          .map((el) => Number(el))
          .join('-');
        const d2 = new Date()
          .toLocaleString('ko-KR')
          .split('.')
          .slice(0, 3)
          .map((el) => Number(el))
          .join('-');
        const date1 = new Date(d1);
        const date2 = new Date(d2);

        const diffDate = date2.getTime() - date1.getTime();
        return diffDate / (1000 * 60 * 60 * 24);
      }

      state.email = email;
      state.username = username;
      state.dayAgo = dateChange(created_time);
      state.modified_time = modified_time;
      state.aboutMe = aboutMe;
      state.image = image;
      state.answers = answers;
      state.questions = questions;
    });
  },
});

export default userInfoSlice;
export { getUserInfo };
