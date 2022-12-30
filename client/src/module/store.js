import { configureStore } from '@reduxjs/toolkit';
import questionsSlice from './questionsSlice';
import userInfoSlice from './userInfoSlice';
import loginBooleanSlice from './loginBooleanSlice';
import cookieVerifySlice from './cookieVerifySlice';
const store = configureStore({
  reducer: {
    questions: questionsSlice.reducer,
    currentUserInfo: userInfoSlice.reducer,
    loginBoolean: loginBooleanSlice.reducer,
    cookieVerify: cookieVerifySlice.reducer,
  },
});

export default store;
