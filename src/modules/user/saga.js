import { all, take, takeLatest, call, fork, delay } from 'redux-saga/effects';
import { saga, history } from '../../common';
import { types as ActionTypes } from './actions';
import * as UserAPI from './api';
import { infoNotify, successNotify } from '../../utils/ReactReduxNotifyUtils';
import { getPayloadData } from '../../utils/ApiUtils';
import { PATH } from '../../routes';
import { I18n } from '../../common/components';


function* loadHomePage() {
    yield call(history.push, PATH.LANDING_PAGE);
}
function* authenticate(action) {
    yield call(infoNotify, `${I18n.t('sign_in')} ...`);
    yield fork(saga.handleAPIRequest, UserAPI.authenticate, action.payload.data);
    yield take(ActionTypes.AUTH_USER_SUCCESS);
    yield fork(saga.handleAPIRequest, UserAPI.getUserInfo);
    yield take(ActionTypes.FETCH_USER_INFO_SUCCESS);
    yield call(successNotify, `${I18n.t('login_success')}. ${I18n.t('redirecting')} ...`);
    yield call(loadHomePage);
}

function* fetchUserProfile() {
    yield call(saga.handleAPIRequest, UserAPI.getUserProfile);
}

function* sendUserProfile(action) {
    yield fork(saga.handleAPIRequest, UserAPI.sentUserProfile, action.payload.userId, action.payload.data);
    const profileAction = yield take([ActionTypes.SEND_USER_PROFILE_SUCCESS, ActionTypes.SEND_USER_PROFILE_FAILURE]);
    if (profileAction.type === ActionTypes.SEND_USER_PROFILE_SUCCESS) {
        yield call(successNotify, I18n.t('update_success', { type: I18n.t('profile') }));
        yield call(saga.handleAPIRequest, UserAPI.getUserInfo);
    }
}

function* changeUserProfilePassword(action) {
    yield fork(saga.handleAPIRequest, UserAPI.changePassword, action.payload.data);
    yield take(ActionTypes.CHANGE_USER_PASSWORD_SUCCESS);
    yield call(successNotify, 'User Password Changed successfully.');
}
function* loadOrganizations() {
    yield fork(saga.handleAPIRequest, UserAPI.loadOrganizations);
    const responseAction = yield take(ActionTypes.LOAD_ORGANIZATIONS_SUCCESS);
    const response = getPayloadData(responseAction.payload, []);
    if (Array.isArray(response) && response.length === 0) {
        yield call(infoNotify, 'organization_not_available');
        yield delay(200);
        yield call(history.push, `${PATH.ORGANIZATION}/create`);
    }
}

export default function* userSaga() {
    yield all([
        takeLatest(ActionTypes.REDIRECT_TO_HOME, loadHomePage),
        takeLatest(ActionTypes.AUTH_USER, authenticate),
        takeLatest(ActionTypes.FETCH_USER_PROFILE, fetchUserProfile),
        takeLatest(ActionTypes.SEND_USER_PROFILE, sendUserProfile),
        takeLatest(ActionTypes.CHANGE_USER_PASSWORD, changeUserProfilePassword),
        takeLatest(ActionTypes.LOAD_ORGANIZATIONS, loadOrganizations)
    ]);
}
