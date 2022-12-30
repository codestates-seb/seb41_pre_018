import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cookie: '',
  memberId: '',
};

const cookieVerifySlice = createSlice({
  name: 'cookieVerifySlice',
  initialState,
  reducers: {
    setCookieStr: (state, action) => {
      state.cookie = `Bearer ${action.payload[0]}`;
      state.memberId = action.payload[1];
    },
  },
});
export const { setCookieStr } = cookieVerifySlice.actions;
export default cookieVerifySlice;
