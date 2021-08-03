import { takeLatest, call, put } from 'redux-saga/effects';
import { api } from '../../api/api';

function* getChatLines(action) {
  const { chatId } = action.payload;
  try {
    const response = yield call(api, 'get', `chatLine/${chatId}`, '');
    yield put({
      type: 'chatLine/getChatLinesSuccessful',
      payload: { chatId, data: response.data },
    });
  } catch (err) {
    console.log(err);
    yield put({ type: 'chatLine/getChatLinesFailure' });
  }
}

export function* watchGetChatLines() {
  yield takeLatest('chatLine/getChatLines', getChatLines);
}
