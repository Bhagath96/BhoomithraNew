import _ from 'lodash';
import { put, call, select, delay } from 'redux-saga/effects';
import action from './action';
import { types as UserActionTypes } from '../modules/user/actions';
// import * as restAPI from './ajax.request';
import { getUserAuthData } from '../modules/user/selectors';
import { URL } from './url';
import { ERROR_CODES } from './constants';
import { errorNotify, warningNotify } from '../utils/ReactReduxNotifyUtils';
import { I18n } from '../common/components';
const nonRestrictedURLs = ['users/signup', 'user/otp', 'otp/verify', 'user/reset-password'];
// let refreshTokenInProgress = false;

// function* refreshToken() {
//     try {
//         const authData = yield select(getUserAuthData);
//         let currentRefreshToken = authData && authData.refresh_token ? authData.refresh_token : null;
//         let payload = {
//             // eslint-disable-next-line camelcase
//             body: { grant_type: 'refresh_token', refresh_token: currentRefreshToken, client_id: 'web-app' },
//             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//         };
//         const { response, error } = yield call(restAPI.post, URL.USER.AUTHENTICATE, payload);
//         if (response) {
//             yield put(action(UserActionTypes.REFRESH_TOKEN_API_SUCCESS, { data: response }));
//         }
//         return { response, error };
//     } catch (error) {
//         // Skip errors for now
//     }
//     return { error: { message: 'Unknown error occurred while token refresh' } };
// }

function isNonRestrictedURL(url) {
    return _.filter(nonRestrictedURLs, function (value) {
        return url.indexOf(value) !== -1;
    }).length;
}

function* showErrorNotification(error) {
    let message = error ? error.message : I18n.t('technical_error');
    yield call(errorNotify, message, 3000);
}

function* invokeApi(api, url, payload) {
    const types = payload.types ? payload.types : ['REQUEST', 'SUCCESS', 'FAILURE'];

    let authHeaders = {};
    if (url.indexOf(URL.USER.AUTHENTICATE) !== -1) {
        authHeaders = {};
    } else if (!isNonRestrictedURL(url)) {
        const authData = yield select(getUserAuthData);

        let bearerToken = authData && authData.access_token ? authData.access_token : null;
        if (bearerToken) {
            authHeaders = { Authorization: `Bearer ${bearerToken}` };
        } else {
            window.location.hash = '/';
            return;
        }
    }
    payload.headers = Object.assign({}, payload.headers, authHeaders);
    yield put(action(types[0]));
    // yield delay(500);
    const { response, error } = yield call(api, url, payload);

    if (error) {
        let errorCode = error ? error.error_cd : null;
        if (errorCode === ERROR_CODES.JWT_EXPIRED) { //token expiry
            yield delay(100);
            // if (!refreshTokenInProgress) {
            //     refreshTokenInProgress = true;
            //     // eslint-disable-next-line no-shadow
            //     const { error } = yield call(refreshToken);
            //     refreshTokenInProgress = false;
            //     if (error) {
            //         yield put(action(types[2], { error: error }));
            //         yield call(errorNotify, 'Token expired. Logging out..');
            //         yield delay(100);
            //         yield put(action(UserActionTypes.LOGOUT_USER)); // if refresh token error, logout the user
            //         return { error };
            //     }
            // } else {
            //     while (refreshTokenInProgress) {
            //         yield delay(1500);
            //     }
            // }
            // return yield call(invokeApi, api, url, payload);

            // yield put(action(types[2], { error: error }));
            // yield delay(200);
            yield call(warningNotify, I18n.t('token_expired'), 10000);
            yield delay(200);

        } else if (errorCode === 4403) { //Invalid token
            yield call(showErrorNotification, error);
            yield put(action(UserActionTypes.LOGOUT_USER)); // if invalid token error, logout the user
            return { error };
        } else {
            yield call(showErrorNotification, error);
            yield put(action(types[2], { error: error }));
        }
    } else {
        if (response.error) {
            yield call(showErrorNotification, response.error);
            yield put(action(types[2], { error: response.error }));
        } else {
            yield put(action(types[1], { data: response }));
        }
    }
    return { response, error };
}

export function* handleAPIRequest(apiFn, ...requestData) {
    let { api, url, payload } = apiFn(...requestData);
    return yield call(invokeApi, api, url, payload);
}
