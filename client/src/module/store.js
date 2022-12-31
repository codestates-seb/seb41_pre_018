import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import questionsSlice from './questionsSlice';
import userInfoSlice from './userInfoSlice';
import loginBooleanSlice from './loginBooleanSlice';
import cookieVerifySlice from './cookieVerifySlice';

const reducers = combineReducers({
  loginBoolean: loginBooleanSlice.reducer,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginBoolean'],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
});

export default store;
