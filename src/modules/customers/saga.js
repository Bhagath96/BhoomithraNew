import { takeLatest, all, call, select, fork, take, put, delay } from 'redux-saga/effects';

import { history, saga } from '../../common';
import { getDefaultLanguage } from '../common/selectors';
import { FILTER_API_PROPS } from '../../common/constants';
import utils from '../../utils';
import { getInitialFilter } from './selectors';
import { types as ActionTypes, storeJsonData, storeJsonDataForSubscription } from './actions';
import * as API from './api';
import { KEYS_FOR_API, TABLE_IDS, TEMPLATE_FOR_API } from './constants';
import { I18n } from '../../common/components';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { ACTION_TYPES } from '../common/constants';
import { getTableAdditionalPropertiesFromCommonStore, getTableFilterChipsFromCommonStore, setPaginationInCommonTableProps, getTableFiltersFromCommonStore } from '../common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../common/actions';
const { notifyUtils: { errorNotify, successNotify } } = utils;
import * as dfgSaga from '../../modules/dfg/saga-web';
import { initializeDynamicForm, setResumeModalVisibility, syncInprogressData, toggleDownloadingSurveyDataModalVisibility } from '../dfg/actions';
import { ORGANIZATION_SURVEY_TEMPLATE_ACTIVE_VERSION, TEMPLATE_TYPES, TEMPLATE_TYPE_IDS } from '../dfg/constants';
import { PATH } from '../../routes';
import { getQRCodeRegex, checkQRCodeExists } from '../common/api';
import { types as CommonActionTypes } from '../common/actions';
import _ from 'lodash';
import { types as DFGActionTypes } from '../dfg/actions';
import Swal from 'sweetalert2';

function* fetchCustomerDetails(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let preData = {
        templateTypeIds: TEMPLATE_FOR_API,
        uiKeys: KEYS_FOR_API,
        type: 'table'
    };
    let tableProps = yield* getTableFilterChipsFromCommonStore(TABLE_IDS.LIST_CUSTOMERS);
    yield fork(saga.handleAPIRequest, API.fetchCustomerDetails, { params: { ...tableProps, ...action.payload.data, ...preData, langId } });
    const customerAction = yield take([ActionTypes.FETCH_CUSTOMER_DETAILS_SUCCESS, ActionTypes.FETCH_CUSTOMER_DETAILS_FAILURE]);
    if (customerAction.type === ActionTypes.FETCH_CUSTOMER_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_CUSTOMERS, getPayloadData(customerAction.payload, {}));
    }
}

function* fetchCustomerDetailsBySurveyId(action) {
    let surveyId = action.payload.data;
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let preData = {
        templateTypeIds: TEMPLATE_FOR_API,
        surveyIds: [surveyId],
        type: 'list'
    };
    yield call(saga.handleAPIRequest, API.fetchCustomerDetailsBySurveyId, { ...preData, langId });
}

function* deleteCustomerDetailsBySurveyId(action) {
    yield fork(saga.handleAPIRequest, API.deleteCustomerDetailsBySurveyId, action.payload.data);
    yield take(ActionTypes.DELETE_CUSTOMER_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('customer_survey') }));
    let data = {
        payload: {
            size: action.payload.size,
            page: action.payload.page
        }
    };
    yield call(fetchCustomerDetails, data);

}

function* listJSONData(action) {
    const { payload: { data: { searchValue, searchKey, columnName } = {} } = {} } = action;
    yield fork(saga.handleAPIRequest, API.listJSONData, { ...FILTER_API_PROPS, searchValue, searchKey });
    const filterResponse = yield take(ActionTypes.LIST_JSON_DATA_SUCCESS);
    yield put(storeJsonData({ [columnName]: getPayloadData(filterResponse.payload) }));

}
function* listJSONDataFromInitialState() {
    const filterResponse = yield select(getInitialFilter);
    yield put(storeJsonData(filterResponse));
}
function* listJSONDataForSubscription(action) {
    const { payload: { searchValue, searchKey, columnName } = {} } = action;
    yield fork(saga.handleAPIRequest, API.listJSONDataForSubscription, { ...FILTER_API_PROPS, searchValue, searchKey });
    const filterResponse = yield take(ActionTypes.LIST_JSON_DATA_FOR_SUBSCRIPTION_SUCCESS);
    yield put(storeJsonDataForSubscription({ [columnName]: getPayloadData(filterResponse.payload) }));
}

function* fetchAllSubscriptions() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_SUBSCRIPTIONS);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_SUBSCRIPTIONS);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.fetchAllSubscriptions, { params: { ...tableProps, langId } });
    const subscriptionAction = yield take([ActionTypes.FETCH_ALL_SUBSCRIPTIONS_SUCCESS, ActionTypes.FETCH_ALL_SUBSCRIPTIONS_FAILURE]);
    let tableData = getPayloadData(subscriptionAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, tableData.content || []);

    if (subscriptionAction.type === ActionTypes.FETCH_ALL_SUBSCRIPTIONS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_SUBSCRIPTIONS, getPayloadData(subscriptionAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_SUBSCRIPTIONS, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_SUBSCRIPTIONS, filterOptionsList: allFilterValues }));
    }
}

function* processSubscription(action) {
    const { id: subscriptionId, type } = action.payload.data;
    let approve = type === ACTION_TYPES.ACCEPT ? true : false;
    yield fork(saga.handleAPIRequest, API.processSubscription, { body: { approve }, subscriptionId });
    const processSubscriptionApiAction = yield take([ActionTypes.PROCESS_SUBSCRIPTION_SUCCESS, ActionTypes.PROCESS_SUBSCRIPTION_FAILURE]);
    if (processSubscriptionApiAction.type === ActionTypes.PROCESS_SUBSCRIPTION_SUCCESS) {
        let message = (type === ACTION_TYPES.ACCEPT) ? 'approved_successfully' : 'declined_successfully';
        yield call(successNotify, I18n.t(message, { type: I18n.t('subscription_request') }), 5000);
        yield call(fetchAllSubscriptions);
    }
}

function* editCustomerDetails(action) {
    const { surveyId } = action.payload.data;
    const payload = {
        data: {
            surveyId,
            toggleModalVisibility: (data) => toggleDownloadingSurveyDataModalVisibility(data)
        }
    };
    const status = yield call([dfgSaga, 'editSyncedSurvey'], { payload });
    if (status) {
        const initializer = {
            templateTypeId: TEMPLATE_TYPE_IDS[TEMPLATE_TYPES.CUSTOMER_ENROLLMENT],
            surveyDataKey: surveyId,
            surveyFinishedAction: function* surveyFinishedAction() {
                yield put(syncInprogressData());
                // navigate after DFG
                yield call(history.push, PATH.CUSTOMER_DATA);
            },
            setResumeModalVisibility: (data) => setResumeModalVisibility(data)
        };
        yield put(initializeDynamicForm(initializer));
        // navigate to DFG
        yield call(history.push, `${PATH.CUSTOMER_DATA}/edit`);
    }
}

function* customerServiceEnrollmentDetails(action) {
    const { surveyId, templateTypeId } = action.payload.data;
    const payload = {
        data: {
            surveyId,
            toggleModalVisibility: (data) => toggleDownloadingSurveyDataModalVisibility(data)
        }
    };
    const status = yield call([dfgSaga, 'editSyncedSurvey'], { payload });
    if (status) {
        const initializer = {
            templateTypeId,
            surveyDataKey: surveyId,
            surveyFinishedAction: function* surveyFinishedAction() {
                yield put(syncInprogressData());
                // navigate after DFG
                yield call(history.push, PATH.CUSTOMER_DATA);
            },
            setResumeModalVisibility: (data) => setResumeModalVisibility(data)
        };
        yield put(initializeDynamicForm(initializer));
        // navigate to DFG
        yield call(history.push, `${PATH.CUSTOMER_DATA}/service_enrollment`);
    }
}

function* isValidQrCode({ scannedQrCode, organizationId }) {
    let qrCodeValidationRegex = '', regMatch = false, qrCodeExists = false;
    yield fork(saga.handleAPIRequest, getQRCodeRegex, { organizationId });
    const qrRegExAction = yield take([CommonActionTypes.FETCH_QR_CODE_REGEX_SUCCESS, CommonActionTypes.FETCH_QR_CODE_REGEX_FAILURE]);
    if (qrRegExAction.type === CommonActionTypes.FETCH_QR_CODE_REGEX_SUCCESS) {
        qrCodeValidationRegex = _.get(qrRegExAction, 'payload.data.data.name', '');
    }

    yield fork(saga.handleAPIRequest, checkQRCodeExists, { qrCode: scannedQrCode });
    const checkQrCodeExistsAction = yield take([CommonActionTypes.CHECK_QR_CODE_EXISTS_SUCCESS, CommonActionTypes.CHECK_QR_CODE_EXISTS_FAILURE]);
    if (checkQrCodeExistsAction.type === CommonActionTypes.CHECK_QR_CODE_EXISTS_SUCCESS) {
        qrCodeExists = _.get(checkQrCodeExistsAction, 'payload.data.data', false);
    }

    if (qrCodeExists) {
        yield call(errorNotify, I18n.t('qr_code_already_exists'), 2000);
        yield delay(1500);
        return false;
    }
    if (qrCodeValidationRegex === null || qrCodeValidationRegex === '') {
        yield call(errorNotify, I18n.t('no_qr_code'), 2000);
        yield delay(1500);
        return false;
    } else {
        regMatch = scannedQrCode.match(new RegExp(qrCodeValidationRegex));
        if (regMatch === null) {
            yield call(errorNotify, I18n.t('invalid_qr_code'), 2000);
            yield delay(1500);
            return false;
        }
    }
    return true;
}

function* customerQREnrollmentDetails(action) {
    let { surveyId, templateTypeId, organizationId, customerEnrollmentId } = action.payload.data;
    const initializer = {
        templateTypeId,
        skipResume: true,
        customValidations: {
            ENROLLMENT_CUSTOMER_QR_CODE: function* runQrCodeValidation(scannedQrCode) {
                const isValid = yield call(isValidQrCode, { scannedQrCode, organizationId });
                if (!isValid) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        surveyFinishedAction: function* surveyFinishedAction() {
            yield put(syncInprogressData());
            const syncAction = yield take([DFGActionTypes.SYNC_INPROGRESS_SURVEY_API_SUCCESS, DFGActionTypes.SYNC_INPROGRESS_SURVEY_API_FAILED]);
            if (syncAction.type === DFGActionTypes.SYNC_INPROGRESS_SURVEY_API_SUCCESS) {
                // const surveyData = getPayloadData(syncAction.payload);
                // yield call([dfgSaga, 'removeSyncedSurvey'], { payload: { data: { surveyId: surveyData.id } } });
            }

            // navigate after DFG
            yield call(history.push, PATH.CUSTOMER_DATA);
        }
    };

    if (surveyId) {
        initializer.surveyDataKey = surveyId;
        const payload = {
            data: {
                surveyId,
                toggleModalVisibility: (data) => toggleDownloadingSurveyDataModalVisibility(data)
            }
        };
        const status = yield call([dfgSaga, 'editSyncedSurvey'], { payload });
        if (status) {
            yield put(initializeDynamicForm(initializer));
            // navigate to DFG
            yield call(history.push, `${PATH.CUSTOMER_DATA}/qr-enrollment`);
        }
    } else {
        if (organizationId && templateTypeId && customerEnrollmentId) {
            const status = yield call([dfgSaga, 'fetchLatestTemplate'], { payload: { data: { organizationId, templateTypeId } } });
            if (status) {
                let activeTemplates = yield call([localStorage, 'getItem'], ORGANIZATION_SURVEY_TEMPLATE_ACTIVE_VERSION);
                activeTemplates = activeTemplates ? JSON.parse(activeTemplates) : {};
                initializer.version = activeTemplates[organizationId][templateTypeId] || undefined;
                initializer.additionalInfo = {
                    customerEnrollmentId
                };
                yield put(initializeDynamicForm(initializer));
                // navigate to DFG
                yield call(history.push, `${PATH.CUSTOMER_DATA}/qr-enrollment`);
            }
        } else {
            yield call([Swal, 'fire'], {
                title: 'Missing',
                html: `${(organizationId ? templateTypeId ? I18n.t('customer_enrollment_id') : I18n.t('qr_code') : I18n.t('organization_id'))} ${I18n.t('missing')}`,
                icon: 'error'
            });
        }
    }


}

function* assignSpecialServiceServiceWorker(action) {
    yield fork(saga.handleAPIRequest, API.assignSubcriptionServiceWorker, action.payload.data);
    const responseAction = yield take([ActionTypes.ASSIGN_SERVICE_WORKER_SUCCESS, ActionTypes.ASSIGN_SERVICE_WORKER_FAILURE]);
    if (responseAction.type === ActionTypes.ASSIGN_SERVICE_WORKER_SUCCESS) {
        yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('service_worker') }));
        yield call(fetchAllSubscriptions);
    }
}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_CUSTOMER_DETAILS, fetchCustomerDetails),
        takeLatest(ActionTypes.FETCH_CUSTOMER_DETAILS_BY_SURVEY_ID, fetchCustomerDetailsBySurveyId),
        takeLatest(ActionTypes.DELETE_CUSTOMER_DETAILS, deleteCustomerDetailsBySurveyId),
        takeLatest(ActionTypes.LIST_JSON_DATA, listJSONData),
        takeLatest(ActionTypes.SET_FILTER_FROM_INITIAL_STATE, listJSONDataFromInitialState),
        takeLatest(ActionTypes.LIST_JSON_DATA_FOR_SUBSCRIPTION, listJSONDataForSubscription),
        takeLatest(ActionTypes.FETCH_ALL_SUBSCRIPTIONS, fetchAllSubscriptions),
        takeLatest(ActionTypes.PROCESS_SUBSCRIPTION, processSubscription),
        takeLatest(ActionTypes.ASSIGN_SERVICE_WORKER, assignSpecialServiceServiceWorker),

        //Modifications for DFG
        takeLatest(ActionTypes.EDIT_CUSTOMER_DETAILS, editCustomerDetails),
        takeLatest(ActionTypes.CUSTOMER_SERVICE_ENROLLMENT_DETAILS, customerServiceEnrollmentDetails),
        takeLatest(ActionTypes.CUSTOMER_QR_ENROLLMENT_DETAILS, customerQREnrollmentDetails)

    ]);
}
