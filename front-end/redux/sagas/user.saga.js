import { takeLatest, call, put } from 'redux-saga/effects';
import { api } from '../../api/api';

function* login(action) {
  const { userName, password } = action.payload;
  const body = {
    userName,
    password,
  };

  try {
    const result = yield call(api, 'post', 'login', body);
    yield put({ type: 'user/loginSuccessful', payload: result.data });
  } catch (err) {
    yield put({ type: 'user/loginFailure', payload: err.response.data });
  }
}

function* signup(action) {
  const body = action.payload;

  try {
    const result = yield call(api, 'post', 'signup', body);
    console.log(result);
    yield put({ type: 'user/signupSuccessful', payload: result.data });
  } catch (err) {
    console.log(err);
    yield put({ type: 'user/signupFailure', payload: err.response.data });
  }
}

export function* watchLogin() {
  yield takeLatest('user/login', login);
}

export function* watchSignup() {
  yield takeLatest('user/signup', signup);
}
