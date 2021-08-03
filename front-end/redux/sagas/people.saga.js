import { takeLatest, call, put } from 'redux-saga/effects';
import { api } from '../../api/api';

function* getPeople(action) {
  try {
    const result = yield call(api, 'get', 'people', '');
    yield put({ type: 'people/getPeopleSuccessful', payload: result.data });
  } catch (error) {
    if (error.response !== undefined) {
      yield put({ type: 'people/getPeopleFailure', type: error.response.data });
    } else {
      console.log(error);
    }
  }
}

export function* watchGetPeople() {
  yield takeLatest('people/getPeople', getPeople);
}
