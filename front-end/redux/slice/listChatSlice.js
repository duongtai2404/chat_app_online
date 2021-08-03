import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chats: [],
  getChatsStatus: '',
  errorCreateChat: '',
};

export const listChatSlice = createSlice({
  name: 'listChat',
  initialState: initialState,
  reducers: {
    getChats: (state) => {
      state.getChatsStatus = 'loading';
    },
    getChatsLoading: (state) => {
      state.getChatsStatus = 'loading';
    },
    getChatsSuccessful: (state, action) => {
      state.chats = action.payload;
      state.getChatsStatus = 'successful';
    },
    getChatsFailure: (state, action) => {
      state.getChatsStatus = 'failure';
    },
    createChat: () => {},
    createChatSuccessful: (state, action) => {
      if (action.payload.message === undefined) {
        state.chats.unshift(action.payload);
      }
    },
    createChatFailure: (state) => {
      state.errorCreateChat = 'Cant create chat';
    },
  },
});

export const { getChats, createChat } = listChatSlice.actions;

export default listChatSlice.reducer;
