import { takeLatest, all, call, select, fork, take } from 'redux-saga/effects';
import { saga } from '../../common';
import { DEFAULT_TABLE_PROPS } from '../../../src/common/constants';
import { getDefaultLanguage } from '../common/selectors';
import utils from '../../utils';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { TEMPLATE_FOR_API } from './constant';
import { history } from '../../../src/common';

const { lodashUtils: _ } = utils;
function* fetchStateDetails(action) {
    let page = _.get(action, 'payload.data.page', DEFAULT_TABLE_PROPS.pageNo);
    let size = _.get(action, 'payload.data.size', DEFAULT_TABLE_PROPS.pageSize);
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let preData = {
        templateTypeIds: TEMPLATE_FOR_API,
        type: 'table'
    };
    yield call(saga.handleAPIRequest, API.fetchStateDetails, { ...action.payload.data, page, size, langId, ...preData });
}
function* saveState(action) {
    yield fork(saga.handleAPIRequest, API.saveState, action.payload.data);
    yield take(ActionTypes.SAVE_STATE_DETAILS_SUCCESS);
    yield call(successNotify, 'State saved successfully.');
    yield call(history.push, '/admin/index/state');
}
function* deleteState(action) {
    yield fork(saga.handleAPIRequest, API.deleteState, action.payload.data);
    yield take(ActionTypes.DELETE_STATE_DETAILS_SUCCESS);
    yield call(successNotify, 'State deleted successfully.');
    let data = {
        payload: {
            size: action.payload.size,
            page: action.payload.page
        }
    };
    yield call(fetchStateDetails, data);
}
function* fetchStateById(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchStateById, { langId, stateID: action.payload.data });
}
function* updateStateData(action) {
    yield fork(saga.handleAPIRequest, API.updateState, action.payload.data, action.payload.id);
    yield take(ActionTypes.UPDATE_STATE_DETAILS_SUCCESS);
    yield call(successNotify, 'State updated successfully.');
    yield call(history.push, '/admin/index/state');
}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_STATE_DETAILS, fetchStateDetails),
        takeLatest(ActionTypes.SAVE_STATE_DETAILS, saveState),
        takeLatest(ActionTypes.DELETE_STATE_DETAILS, deleteState),
        takeLatest(ActionTypes.FETCH_STATE_DETAILS_BY_ID, fetchStateById),
        takeLatest(ActionTypes.UPDATE_STATE_DETAILS, updateStateData)
    ]);
}

