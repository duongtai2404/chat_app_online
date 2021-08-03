import { takeLatest, call, put } from 'redux-saga/effects';
import { api } from '../../api/api';

function* getChats(action) {
  try {
    const result = yield call(api, 'get', 'chat', '');
    yield put({ type: 'listChat/getChatsSuccessful', payload: result.data });
  } catch (err) {
    yield put({
      type: 'listChat/getChatsFailure',
      payload: err.response.data,
    });
  }
}

function* createChat(action) {
  const { chatUserId } = action.payload;
  const body = {
    chatUserId,
  };

  try {
    const result = yield call(api, 'post', 'chat', body);
    yield put({ type: 'listChat/createChatSuccessful', payload: result.data });
  } catch (err) {
    if (err.response !== undefined) {
      yield put({
        type: 'listChat/createChatFailure',
        payload: err.response.data,
      });
    } else {
      console.log(err);
    }
  }
}

export function* watchGetChats() {
  yield takeLatest('listChat/getChats', getChats);
}

export function* watchCreateChat() {
  yield takeLatest('listChat/createChat', createChat);
}
