import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import questionsSlice from './questionsSlice';
import userInfoSlice from './userInfoSlice';
import loginBooleanSlice from './loginBooleanSlice';
import cookieVerifySlice from './cookieVerifySlice';
import searchSlice from './searchSlice';

const reducers = combineReducers({
  loginBoolean: loginBooleanSlice.reducer,
  search: searchSlice.reducer,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginBoolean', 'search'],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
