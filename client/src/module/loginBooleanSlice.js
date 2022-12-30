import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const isLoginThunk = createAsyncThunk(
  'thunkModule/inLoginThunk',
  async (data) => {
    const { cookie, memberId } = data;

    try {
      const response = await axios
        .get(
          `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/members/${memberId}`,
          {
            headers: {
              Authorization: cookie,
            },
          }
        )
        .then((data) => data);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }
);
const initialState = {
  isLogin: false,
  memberId: '',
};

const loginBooleanSlice = createSlice({
  name: 'loginBooleanSlice',
  initialState,
  reducers: {
    boolean: (state, action) => {
      state.isLogin = action.payload;
    },
    setMemberId: (state, action) => {
      state.memberId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(isLoginThunk.fulfilled, (state, action) => {
      state.isLogin = action.payload;
    });
  },
});
export { boolean, setMemberId };
export default loginBooleanSlice;
