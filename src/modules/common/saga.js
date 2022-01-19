import { takeLatest, all, call, put, select, fork, take } from 'redux-saga/effects';
import { types as ActionTypes, commonTypes as CommonActionTypes, keys, setTablePagination, setTableDropdownFilterList, setTableFilterChips } from './actions';
import { saga } from '../../common';
import * as API from './api';
import _ from 'lodash';
import { errorNotify, successNotify, infoNotify, warningNotify } from '../../utils/ReactReduxNotifyUtils';
import { MESSAGE_TYPES } from './constants';
import { getDefaultLanguage, getTableProps } from './selectors';
import { DEFAULT_TABLE_PROPS, FILTER_API_PROPS } from '../../common/constants';
import { getPayloadData, tableFilterDestructuringArray } from '../../utils/ApiUtils';
import * as commonActions from './actions';

function* loadLSGITypes() {
    const types = [CommonActionTypes.LOAD_LSGI_TYPES_REQUEST, CommonActionTypes.LOAD_LSGI_TYPES_SUCCESS, CommonActionTypes.LOAD_LSGI_TYPES_FAILED];
    yield call(saga.handleAPIRequest, API.loadLSGITypes, { types, body: {} });
}

function* loadState(action) {
    const identifier = _.get(action, 'payload.data.identifier', 'COMMON');
    const types = [`${identifier}/${keys.COMMON_STATE}_REQUEST`, `${identifier}/${keys.COMMON_STATE}_SUCCESS`, `${identifier}/${keys.COMMON_STATE}_FAILED`];
    yield call(saga.handleAPIRequest, API.loadStates, { types, body: {} });
}

function* loadDistrict(action) {
    const identifier = _.get(action, 'payload.data.identifier', 'COMMON');
    const id = _.get(action, 'payload.data.id', '');
    const types = [`${identifier}/${keys.COMMON_DISTRICT}_REQUEST`, `${identifier}/${keys.COMMON_DISTRICT}_SUCCESS`, `${identifier}/${keys.COMMON_DISTRICT}_FAILED`];
    yield call(saga.handleAPIRequest, API.loadDistricts, { types, body: { ...id } });
}

function* loadDistrictPanchayath(action) {
    const identifier = _.get(action, 'payload.data.identifier', 'COMMON');
    const districtId = _.get(action, 'payload.data.id.districtId', '');
    const types = [`${identifier}/${keys.COMMON_DISTRICT_PANCHAYATH}_REQUEST`, `${identifier}/${keys.COMMON_DISTRICT_PANCHAYATH}_SUCCESS`, `${identifier}/${keys.COMMON_DISTRICT_PANCHAYATH}_FAILED`];
    yield call(saga.handleAPIRequest, API.loadDistrictPanchayath, { types, districtId });
}

function* loadBlockPanchayath(action) {
    const identifier = _.get(action, 'payload.data.identifier', 'COMMON');
    const districtId = _.get(action, 'payload.data.id.districtId', '');
    const types = [`${identifier}/${keys.COMMON_BLOCK_PANCHAYATH}_REQUEST`, `${identifier}/${keys.COMMON_BLOCK_PANCHAYATH}_SUCCESS`, `${identifier}/${keys.COMMON_BLOCK_PANCHAYATH}_FAILED`];
    yield call(saga.handleAPIRequest, API.loadBlockPanchayath, { types, districtId });
}

function* loadLSGI(action) {
    const identifier = _.get(action, 'payload.data.identifier', 'COMMON');
    const id = _.get(action, 'payload.data.id', {});
    const types = [`${identifier}/${keys.COMMON_LSGI}_REQUEST`, `${identifier}/${keys.COMMON_LSGI}_SUCCESS`, `${identifier}/${keys.COMMON_LSGI}_FAILED`];
    yield call(saga.handleAPIRequest, API.loadLSGI, { types, params: { ...id } });
}

function* loadLanguages() {
    yield call(saga.handleAPIRequest, API.loadLanguages);
}
function* fetchState() {
    yield call(saga.handleAPIRequest, API.fetchState);
}

function* fetchQRCodeRegEx(action) {
    const { organizationId } = action.payload.data;
    yield call(saga.handleAPIRequest, API.getQRCodeRegex, { organizationId });
}

function* checkQRCodeExists(action) {
    const { qrCode } = action.payload.data;
    yield call(saga.handleAPIRequest, API.checkQRCodeExists, { qrCode });
}

function* showNotification(action) {
    const { payload: { data: { message = '', duration = 3000, type = MESSAGE_TYPES.ERROR } } = {} } = action;
    switch (type) {
        case MESSAGE_TYPES.ERROR:
            yield call(errorNotify, message, duration);
            break;
        case MESSAGE_TYPES.SUCCESS:
            yield call(successNotify, message, duration);
            break;
        case MESSAGE_TYPES.INFO:
            yield call(infoNotify, message, duration);
            break;
        case MESSAGE_TYPES.WARNING:
            yield call(warningNotify, message, duration);
            break;
        default:
            yield call(successNotify, message, duration);
            break;
    }
}

export function* getTableFiltersFromCommonStore(key) {
    const tableProps = yield select(getTableProps);
    let { pagination = DEFAULT_TABLE_PROPS, chips: filterChips = {}, filterState = {} } = _.get(tableProps, `${key}`, {});
    let filterParams = {};
    let filterStateResponse = {};
    Object.keys(filterState).forEach(filterKey => {
        let values = _.get(filterState, `${filterKey}.value`, []);
        let property = _.get(filterState, `${filterKey}.property`, []);
        if (!_.isEmpty(property)) {
            if (_.isArray(property)) {
                property = property[0];
            }
        } else {
            property = '';
        }
        if (!_.isEmpty(values)) {
            filterStateResponse[filterKey] = _.toString(values.map(item => item[property]));
        }
    });

    if (!_.isEmpty(filterChips)) {
        filterParams = {
            filter: true,
            ...filterStateResponse
        };
    }
    let response = { ...filterParams, ...pagination };
    return response;
}
export function* getTableFilterChipsFromCommonStore(key) {
    const tableProps = yield select(getTableProps);
    let { pagination = DEFAULT_TABLE_PROPS, chips: filterChips = {} } = _.get(tableProps, `${key}`, {});
    let filterParams = {};
    if (!_.isEmpty(filterChips)) {
        filterParams = {
            filter: true,
            ...filterChips
        };
    }
    let response = { ...filterParams, ...pagination };
    return response;
}

export function* getTableAdditionalPropertiesFromCommonStore(key) {
    const tableProps = yield select(getTableProps);
    let { additionalFilters = {}, passedColumns = [], filterOptions = {}, initialfilterOptions = {} } = _.get(tableProps, `${key}`, {});
    return { additionalFilters, passedColumns, filterOptions, initialfilterOptions };
}


export function* setPaginationInCommonTableProps(key = 'DEFAULT', response = {}) {
    let pagination = {
        size: _.get(response, 'pageable.pageSize', DEFAULT_TABLE_PROPS.size),
        page: _.get(response, 'pageable.pageNumber', DEFAULT_TABLE_PROPS.page),
        count: _.get(response, 'totalElements', DEFAULT_TABLE_PROPS.count)
    };
    yield put(setTablePagination({ key, pagination }));
}

export function* fetchTableDropdownFilterList(action) {
    const { searchValue, searchKey, columnName, key, url, ...rest } = action.payload.data;
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const tableProps = yield select(getTableProps);
    let { dropdownFilterOptions = {}, additionalDropdownFilters = {} } = _.get(tableProps, `${key}`, {});
    yield fork(saga.handleAPIRequest, API.fetchTableDropdownFilterList, { type: FILTER_API_PROPS.type, searchValue, searchKey, langId, url, params: { ...additionalDropdownFilters, ...dropdownFilterOptions, ...rest } });
    const filterResponseAction = yield take([ActionTypes.FETCH_TABLE_FILTER_OPTIONS_LIST_SUCCESS, ActionTypes.FETCH_TABLE_FILTER_OPTIONS_LIST_FAILURE]);
    if (filterResponseAction.type === ActionTypes.FETCH_TABLE_FILTER_OPTIONS_LIST_SUCCESS) {
        const response = getPayloadData(filterResponseAction.payload, []);
        yield put(setTableDropdownFilterList({ key, filterOptionsList: { [columnName]: response } }));
        yield put(setTableFilterChips({ key, chips: tableFilterDestructuringArray(response) }));
    }
}

function* getAllServiceProvidersDropdown(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let { organizationId, wardId } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.getAllServiceProviders, { organizationId, langId, wardId });
    const serviceProviderAction = yield take([ActionTypes.ALL_SERVICE_PROVIDER_DROPDOWN_SUCCESS, ActionTypes.ALL_SERVICE_PROVIDER_DROPDOWN_FAILURE]);
    if (serviceProviderAction.type === ActionTypes.ALL_SERVICE_PROVIDER_DROPDOWN_SUCCESS) {
        const serviceProviderResponse = getPayloadData(serviceProviderAction.payload, []);
        yield put(commonActions.setCommonServiceProvider({ [organizationId]: serviceProviderResponse }));
    }
}

function* getAllWardsUnderServiceProvider(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let { organizationId, serviceProviderId } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.getAllWardsUnderServiceProvider, { langId, organizationId, serviceProviderId });
    const currentAction = yield take([ActionTypes.ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN_SUCCESS, ActionTypes.ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN_FAILURE]);
    if (currentAction.type === ActionTypes.ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN_SUCCESS) {
        const response = getPayloadData(currentAction.payload, []);
        yield put(commonActions.setWards({ [serviceProviderId]: response }));
    }
}

function* getAllServiceWorkerSupervisorUnderWards(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let { organizationId, serviceProviderId, wardId } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.getAllServiceWorkerSupervisorUnderWards, { organizationId, serviceProviderId, wardId, langId });
    const currentAction = yield take([ActionTypes.ALL_SW_SP_BY_WARD_DROPDOWN_SUCCESS, ActionTypes.ALL_SW_SP_BY_WARD_DROPDOWN_FAILURE]);
    if (currentAction.type === ActionTypes.ALL_SW_SP_BY_WARD_DROPDOWN_SUCCESS) {
        const response = getPayloadData(currentAction.payload, []);
        yield put(commonActions.setServiceWorkerSupervisor({ [wardId]: response }));
    }
}

function* getAllServiceWorkersUnderSupervisor(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let { organizationId, serviceProviderId, wardId, supervisorId } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.getAllServiceWorkersUnderSupervisor, { langId, organizationId, serviceProviderId, wardId, supervisorId });
    const currentAction = yield take([ActionTypes.ALL_SW_BY_SP_DROPDOWN_SUCCESS, ActionTypes.ALL_SW_BY_SP_DROPDOWN_FAILURE]);
    if (currentAction.type === ActionTypes.ALL_SW_BY_SP_DROPDOWN_SUCCESS) {
        const response = getPayloadData(currentAction.payload, []);
        yield put(commonActions.setServiceWorker({ [supervisorId]: response }));
    }
}

export default function* commonSaga() {
    yield all([
        takeLatest(CommonActionTypes.LOAD_LSGI_TYPES, loadLSGITypes),
        takeLatest(ActionTypes.COMMON_LOAD_STATE, loadState),
        takeLatest(ActionTypes.COMMON_LOAD_DISTRICT, loadDistrict),
        takeLatest(ActionTypes.COMMON_LOAD_BLOCK_PANCHAYATH, loadBlockPanchayath),
        takeLatest(ActionTypes.COMMON_LOAD_DISTRICT_PANCHAYATH, loadDistrictPanchayath),
        takeLatest(ActionTypes.COMMON_LOAD_LSGI, loadLSGI),
        takeLatest(ActionTypes.GET_ALL_LANGUAGES, loadLanguages),
        takeLatest(ActionTypes.LIST_STATES, fetchState),
        takeLatest(ActionTypes.SHOW_NOTIFICATION, showNotification),
        takeLatest(ActionTypes.FETCH_TABLE_FILTER_OPTIONS_LIST, fetchTableDropdownFilterList),
        takeLatest(ActionTypes.FETCH_QR_CODE_REGEX, fetchQRCodeRegEx),
        takeLatest(ActionTypes.CHECK_QR_CODE_EXISTS, checkQRCodeExists),
        takeLatest(ActionTypes.ALL_SERVICE_PROVIDER_DROPDOWN, getAllServiceProvidersDropdown),
        takeLatest(ActionTypes.ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN, getAllWardsUnderServiceProvider),
        takeLatest(ActionTypes.ALL_SW_SP_BY_WARD_DROPDOWN, getAllServiceWorkerSupervisorUnderWards),
        takeLatest(ActionTypes.ALL_SW_BY_SP_DROPDOWN, getAllServiceWorkersUnderSupervisor)
    ]);
}
