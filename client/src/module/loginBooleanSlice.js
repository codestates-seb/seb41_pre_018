import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const isLoginThunk = createAsyncThunk(
  'thunkModule/inLoginThunk',
  async () => {
    await axios.get('http://localhost:8080/questions');
  }
);
const initialState = {
  isLogin: false,
};

const loginBooleanSlice = createSlice({
  name: 'loginBooleanSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      isLoginThunk.fulfilled,
      (state, action) => (state.isLogin = action.payload)
    );
  },
});

export default loginBooleanSlice;
