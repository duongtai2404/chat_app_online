import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  people: [],
  getPeopleStatus: '',
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState: initialState,
  reducers: {
    getPeople: (state) => {
      state.getPeopleStatus = 'loading';
    },
    getPeopleSuccessful: (state, action) => {
      state.getPeopleStatus = 'successful';
      state.people = action.payload;
    },
    getPeopleFailure: (state) => {
      state.getPeopleStatus = 'failure';
    },
  },
});

export const { getPeople } = peopleSlice.actions;

export default peopleSlice.reducer;
