import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchElement: '',
};

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    searchAction: (state, action) => {
      state.searchElement = action.payload;
    },
  },
});

export const { searchAction } = searchSlice.actions;
export default searchSlice;
