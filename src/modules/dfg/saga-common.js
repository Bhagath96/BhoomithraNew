import { all, fork } from "redux-saga/effects";
import mobileSaga from './saga';
import webSaga from './saga-web';

export default function* () {
    yield all([
        fork(mobileSaga),
        fork(webSaga)
    ]);
}