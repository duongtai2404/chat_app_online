import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/index';

import userSlice from '../slice/userSlice';
import listChatSlice from '../slice/listChatSlice';
import peopleSlice from '../slice/peopleSlice';
import friendsSlice from '../slice/friendsSlice';
import chatLineSlice from '../slice/chatLineSlice';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    user: userSlice,
    listChat: listChatSlice,
    people: peopleSlice,
    friends: friendsSlice,
    chatLine: chatLineSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
