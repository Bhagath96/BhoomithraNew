import { takeLatest, all, call, fork, select } from 'redux-saga/effects';
import { saga } from '../../common';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { getDefaultLanguage } from '../common/selectors';

function* fetchOrganizationDetails() {
    yield call(saga.handleAPIRequest, API.fetchOrganization);
}
function* generateQRCodeData(action) {
    const language = yield select(getDefaultLanguage);
    const { id: defaultLangId } = language;
    const langId = action.payload.data.langId || defaultLangId;
    const count = action.payload.data.noQRCode;
    const start = action.payload.data.startNo;
    const organizationId = action.payload.data.organization;
    yield fork(saga.handleAPIRequest, API.generateQRCode, { data: { langId, count, start }, organizationId });
}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_ORGANIZATION_DETAILS, fetchOrganizationDetails),
        takeLatest(ActionTypes.GENERATE_QR_CODE_DATA, generateQRCodeData)
    ]);
}
