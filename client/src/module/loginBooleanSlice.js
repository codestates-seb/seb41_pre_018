import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const isLoginCheck = createAsyncThunk('loginBoolean/isLoginCheck', async () => {
  await axios.get('http://localhost:8080/????');
});

const initialState = {
  isLogin: false,
};

const loginBooleanSlice = createSlice({
  name: 'loginBooleanSlice',
  initialState,
  reducers: {
    isLogin: (state, action) => {
      const { boolean } = action.payload;
      state.isLogin = boolean;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      isLoginCheck.fulfilled,
      (state, action) => (state.isLogin = action.payload)
    );
  },
});

export default loginBooleanSlice;
