import { configureStore } from '@reduxjs/toolkit';
import questionsSlice from './questionsSlice';
import userInfoSlice from './userInfoSlice';
import loginBooleanSlice from './loginBooleanSlice';
const store = configureStore({
  reducer: {
    questions: questionsSlice.reducer,
    userInfo: userInfoSlice.reducer,
    loginBoolean: loginBooleanSlice.reducer,
  },
});

export default store;
