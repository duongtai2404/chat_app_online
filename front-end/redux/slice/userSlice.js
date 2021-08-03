import { createSlice } from '@reduxjs/toolkit';
import { configureApiHeaderAuthen } from '../../api/api';

const initialState = {
  userId: '',
  name: '',
  token: '',
  login: '',
  signup: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login: () => {},
    loginSuccessful: (state, action) => {
      const { userId, name, token } = action.payload;
      state.userId = userId;
      state.name = name;
      state.token = token;
      state.login = 'successful';
      configureApiHeaderAuthen(token);
    },
    loginFailure: (state, action) => {
      state.login = action.payload.error;
    },
    setDefaultLoginError: (state) => {
      state.login = '';
    },
    signup: () => {},
    signupSuccessful: (state, action) => {
      state.signup = 'successful';
    },
    signupFailure: (state, action) => {
      state.signup = action.payload.error;
    },
    setDefaultSignUpError: (state) => {
      state.signup = '';
    },
  },
});

export const { login, signup, setDefaultSignUpError, setDefaultLoginError } =
  userSlice.actions;

export default userSlice.reducer;
