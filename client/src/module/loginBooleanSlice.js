import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  memberId: '',
};

const loginBooleanSlice = createSlice({
  name: 'loginBooleanSlice',
  initialState,
  reducers: {
    loginBoolean: (state, action) => {
      const { isLogin, memberId } = action.payload;
      state.isLogin = isLogin;
      state.memberId = memberId;
    },
  },
});

export const { loginBoolean } = loginBooleanSlice.actions;
export default loginBooleanSlice;
