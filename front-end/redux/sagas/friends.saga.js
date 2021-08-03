import { takeLatest, call, put } from 'redux-saga/effects';
import { api } from '../../api/api';

function* getFriends(action) {
  try {
    const result = yield call(api, 'get', 'friend', '');
    yield put({ type: 'friends/getFriendsSuccessful', payload: result.data });
  } catch (err) {
    if (err.response !== undefined) {
      yield put({
        type: 'friends/getFriendsFailure',
        payload: err.response.data,
      });
    } else {
      console.log(err);
    }
  }
}

export function* watchGetFriends() {
  yield takeLatest('friends/getFriends', getFriends);
}
