import { takeLatest, all, call, fork, take, delay } from 'redux-saga/effects';
import { types as ActionTypes } from './actions';
import { saga } from '../../common';
import * as API from './api';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';

function* sentMobileNumber(action) {
    yield fork(saga.handleAPIRequest, API.sentMobileNumberForOtp, action.payload.mobile);
}
function* sentOtp(action) {
    yield fork(saga.handleAPIRequest, API.sentOtpForVerification, action.payload.otp, action.payload.mobile);
}

function* resetPassword(action) {
    let { payload: { password = '', mobile = '', requestId = '' } = {} } = action;

    yield fork(saga.handleAPIRequest, API.resetPasswordForUser, { password, mobile, requestId });
    yield take(ActionTypes.RESET_PASSWORD_SUCCESS);
    yield call(successNotify, 'Password changed successfully.');
    yield delay(500);
    window.location.hash = '/';
}

export default function* forgotPasswordSaga() {
    yield all([
        takeLatest(ActionTypes.SENT_MOBILE_NUMBER, sentMobileNumber),
        takeLatest(ActionTypes.SENT_OTP, sentOtp),
        takeLatest(ActionTypes.RESET_PASSWORD, resetPassword)
    ]);
}
