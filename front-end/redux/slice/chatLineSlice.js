import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [
    // {
    //   chatId: '60e196262faf5549a3bf6dcf',
    //   chats: [],
    // },
  ],
  isGettingChat: 'no',
};

const chatLineSLice = createSlice({
  name: 'chatLine',
  initialState: initialState,
  reducers: {
    sendChat: (state, action) => {
      const { chatId, chatUserId, chatLine } = action.payload;
      const data = state.data;
      const pos = data.findIndex((x) => x.chatId === chatId);
      if (pos > -1) {
        const add = {
          _id: data[pos].chats.length + 1 + '',
          user_id: chatUserId,
          line: chatLine,
        };
        data[pos].chats.unshift(add);
      }
    },
    receiveMessageInSlice: (state, action) => {
      const { chatId, userId, line } = action.payload;
      const data = state.data;
      const pos = data.findIndex((x) => x.chatId === chatId);
      if (pos > -1) {
        const add = {
          _id: data[pos].chats.length + 1 + '',
          user_id: userId,
          line: line,
        };
        data[pos].chats.unshift(add);
      }
    },
    getChatLines: () => {},
    isGettingChatLines: (state) => {
      state.isGettingChat = 'loading';
    },
    getChatLinesSuccessful: (state, action) => {
      state.isGettingChat = 'successful';
      const { chatId, data } = action.payload;
      const positionOfChat = state.data.findIndex((e) => e.chatId === chatId);
      if (positionOfChat > -1) {
        state.data[positionOfChat].chats = data;
      } else {
        state.data.push({ chatId, chats: data });
      }
    },
    getChatLinesFailure: (state) => {
      state.isGettingChat = 'failure';
    },
    setIsGettingChatToDefault: (state) => {
      state.isGettingChat = 'no';
    },
  },
});

export const {
  sendChat,
  getChatLines,
  isGettingChatLines,
  setIsGettingChatToDefault,
  receiveMessageInSlice,
} = chatLineSLice.actions;

export default chatLineSLice.reducer;
