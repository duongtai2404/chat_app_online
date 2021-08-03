import { all } from 'redux-saga/effects';
import { watchLogin, watchSignup } from './user.saga';
import { watchGetChats, watchCreateChat } from './listChat.saga';
import { watchGetPeople } from './people.saga';
import { watchGetFriends } from './friends.saga';
import { watchGetChatLines } from './chatLine.saga';

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchSignup(),
    watchGetChats(),
    watchCreateChat(),
    watchGetPeople(),
    watchGetFriends(),
    watchGetChatLines(),
  ]);
}
