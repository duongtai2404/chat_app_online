import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  friends: [],
  friendsStatus: '',
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState: initialState,
  reducers: {
    getFriends: (state) => {
      state.friendsStatus = 'loading';
    },
    getFriendsSuccessful: (state, action) => {
      state.friendsStatus = 'successful';
      state.friends = action.payload;
    },
    getFriendsFailure: (state) => {
      state.friendsStatus = 'failure';
    },
  },
});

export const { getFriends } = friendsSlice.actions;

export default friendsSlice.reducer;
