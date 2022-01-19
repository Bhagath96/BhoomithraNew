import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { history, saga } from '../../common';
import { DEFAULT_TABLE_PROPS } from '../../../src/common/constants';
import { getDefaultLanguage } from '../common/selectors';
import utils from '../../utils';
import { types as ActionTypes, serviceTypes as ServiceActionTypes } from './actions';
import * as API from './api';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import * as Actions from './actions';
import { I18n } from '../../common/components';
import { PATH } from '../../routes';
import { formatServiceIntervalForCron } from './utils';
import { ACTION_TYPES } from '../common/constants';
import { getSpecialServiceChips } from './selectors';
import _ from 'lodash';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../common/saga';
import { TABLE_IDS } from './constants';
import { setInitialFilterList, setTableDropdownFilterList } from '../common/actions';
const { notifyUtils: { errorNotify, successNotify } } = utils;

function* fetchCustomers(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchCustomers, {
        data: { ...action.payload.data, langId }
    });
}
function* fetchSchedules(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_SCHEDULE);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_SCHEDULE);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.fetchSchedules, { params: { ...tableProps, ...action.payload?.data, langId } });

    const scheduleAction = yield take([ActionTypes.FETCH_ALL_SCHEDULE_SUCCESS, ActionTypes.FETCH_ALL_SCHEDULE_FAILURE]);
    let tableData = getPayloadData(scheduleAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, tableData.content || []);
    if (scheduleAction.type === ActionTypes.FETCH_ALL_SCHEDULE_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_SCHEDULE, getPayloadData(scheduleAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_SCHEDULE, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_SCHEDULE, filterOptionsList: allFilterValues }));
    }
}

function* fetchScheduleById(action) {
    yield call(saga.handleAPIRequest, API.fetchScheduleById, action.payload.id);
}

function* deleteScheduleData(action) {
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_SCHEDULE);

    let data = {
        payload: {
            data: {
                ...tableProps
            }
        }
    };
    yield fork(saga.handleAPIRequest, API.deleteSchedule, action.payload.data);
    yield take(ActionTypes.DELETE_SCHEDULE_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('Schedule') }));
    yield call(fetchSchedules, data);
}

function* fetchAllOrganizations() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchAllOrganizations, { langId });
}

function* fetchServiceProviders(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const organizationId = action.payload.data;
    yield fork(saga.handleAPIRequest, API.fetchServiceProviders, { organizationId, langId });
    const serviceProviderAction = yield take([ActionTypes.FETCH_SERVICE_PROVIDERS_SUCCESS]);
    if (serviceProviderAction.type === ActionTypes.FETCH_SERVICE_PROVIDERS_SUCCESS) {
        const serviceProviderResponse = getPayloadData(serviceProviderAction.payload, []);
        yield put(Actions.setServiceProvider({ [organizationId]: serviceProviderResponse }));
    }
}

function* fetchWards(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const { organizationId, serviceProviderId } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.fetchWards, { organizationId, serviceProviderId, langId });
    const currentAction = yield take([ActionTypes.FETCH_WARDS_SUCCESS]);
    if (currentAction.type === ActionTypes.FETCH_WARDS_SUCCESS) {
        const response = getPayloadData(currentAction.payload, []);
        yield put(Actions.setWards({ [serviceProviderId]: response }));
    }
}
function* submitScheduledCustomer(action) {
    yield fork(saga.handleAPIRequest, API.submitScheduledCustomer, action.payload.customerID, action.payload.sheduleID);
    yield take(ActionTypes.SUBMIT_SCHEDULED_CUSTOMER_SUCCESS);
    yield call(successNotify, I18n.t('sheduled_success', { type: I18n.t('state') }));
    // yield call(history.push, Routes.PATH.BASIC_CONFIG_STATE);
}

function* fetchServiceWorkers(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const { serviceProviderId, wardId } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.fetchServiceWorkers, { serviceProviderId, wardId, langId });
    const currentAction = yield take([ActionTypes.FETCH_SERVICE_WORKERS_SUCCESS]);
    const response = getPayloadData(currentAction.payload, []);
    yield put(Actions.setServiceWorkers({ [wardId]: response }));
}

function* fetchServices(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const { serviceProviderId, residenceCategoryId } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.fetchServices, { serviceProviderId, residenceCategoryId, langId });
    const currentAction = yield take([ActionTypes.FETCH_SERVICE_SUCCESS]);
    const response = getPayloadData(currentAction.payload, []);
    yield put(Actions.setServices({ [residenceCategoryId]: response }));
}

function* fetchServiceIntervals(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const { serviceProviderId, serviceConfigId, residenceCategoryId } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.fetchServiceIntervals, { serviceConfigId, serviceProviderId, residenceCategoryId, langId });
    const currentAction = yield take([ActionTypes.FETCH_SERVICE_INTERVALS_SUCCESS]);
    const response = getPayloadData(currentAction.payload, []);
    yield put(Actions.setServiceIntervals({ [serviceConfigId]: formatServiceIntervalForCron(response) }));
}
function* fetchTradingType() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchTradingType, { langId });
}
function* fetchResidentialAssociations(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const { wardId } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.fetchResidentialAssociations, { langId, wardId });
    const currentAction = yield take([ActionTypes.FETCH_RESIDENTIAL_ASSOCIATION_SUCCESS]);
    const response = getPayloadData(currentAction.payload, []);
    yield put(Actions.setResidentialAssociations({ [wardId]: response }));
}

function* postSchedule(action) {
    yield fork(saga.handleAPIRequest, API.submitSchedule, action.payload.data);
    yield take(ActionTypes.POST_SCHEDULE_SUCCESS);
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('schedule') }));
    yield call(history.push, PATH.SCHEDULE);
}
function* updateSchedule(action) {
    yield fork(saga.handleAPIRequest, API.updateSchedule, action.payload.data);
    yield take(ActionTypes.UPDATE_SCHEDULE_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('schedule') }));
    yield call(history.push, PATH.SCHEDULE);
}
function* fetchCustomersByScheduleId(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_CUSTOMERS_SCHEDULE);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_CUSTOMERS_SCHEDULE);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.fetchCustomersByScheduleId, { params: { ...tableProps, langId }, queryData: { ...action.payload.data.queryData } });

    const scheduleAction = yield take([ActionTypes.FETCH_CUSTOMERS_BY_SCHEDULE_ID_SUCCESS, ActionTypes.FETCH_CUSTOMERS_BY_SCHEDULE_ID_FAILURE]);
    let tableData = getPayloadData(scheduleAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, tableData.content || []);

    if (scheduleAction.type === ActionTypes.FETCH_CUSTOMERS_BY_SCHEDULE_ID_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_CUSTOMERS_SCHEDULE, getPayloadData(scheduleAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_CUSTOMERS_SCHEDULE, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_CUSTOMERS_SCHEDULE, filterOptionsList: allFilterValues }));
    }
}
function* addCustomerByScheduleId(action) {
    const data = action.payload.data;
    if (data?.allSelected === true || data?.customerNumbers.length >= 1) {
        if (data?.allSelected === true) {
            data.customerNumbers = [];
        }
        yield fork(saga.handleAPIRequest, API.addScheduledCustomer, action.payload);
        yield take(ActionTypes.ADD_CUSTOMERS_BY_SCHEDULE_ID_SUCCESS);
        yield call(successNotify, I18n.t('added_success', { type: I18n.t('schedule') }));
        let actionToPass = {
            payload: {
                data: {
                    queryData: {
                        id: action.payload.id,
                        type: 'new'
                    }
                }
            }
        };
        yield call(fetchCustomersByScheduleId, actionToPass);
    } else {
        let message = I18n.t('missing_parameters');
        yield call(errorNotify, message, 5000);
    }
}
function* removeCustomerByScheduleId(action) {
    const data = action.payload.data;
    const Id = action.payload.id;
    let allSelected = _.get(data, 'allSelected', false);
    let selectedCustomers = _.get(data, 'customerNumbers', []);
    let customerIds = [];
    if (selectedCustomers?.length > 0) {

        _.forEach(selectedCustomers, (customer) => {
            customerIds.push(customer.customerNumber);
        });
    } else {
        customerIds = [{}];
    }

    if (allSelected === true || selectedCustomers.length >= 1) {
        yield fork(saga.handleAPIRequest, API.removeScheduledCustomer, { data: { allSelected, customerNumbers: customerIds }, Id });
        yield take(ActionTypes.REMOVE_CUSTOMERS_BY_SCHEDULE_ID_SUCCESS);
        yield call(successNotify, I18n.t('delete_success', { type: I18n.t('schedule') }));
        let actionToPass = {
            payload: {
                data: {
                    queryData: {
                        id: Id,
                        type: 'existing'
                    }
                }
            }
        };
        yield call(fetchCustomersByScheduleId, actionToPass);
    } else {
        let message = I18n.t('missing_parameters');
        yield call(errorNotify, message, 5000);
    }

}
function* fetchSchedulesHistory(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const { scheduleId, data } = action.payload.data;
    yield call(saga.handleAPIRequest, API.fetchSchedulesHistory, { data: { ...data, langId }, scheduleId });
}

function* fetchAllResidenceCategories() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchAllResidenceCategories, { params: { langId } });
}

function* getSpecialServiceFilters() {
    const filterChips = yield select(getSpecialServiceChips);
    let filterParams = {};
    if (!_.isEmpty(filterChips)) {
        filterParams = {
            filter: true,
            ...filterChips
        };
    }
    return filterParams;
}

function* fetchAllSpecialServices() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let filterParams = yield* getSpecialServiceFilters();
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_SPECIAL_SERVICE_REQUEST);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_SPECIAL_SERVICE_REQUEST);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.fetchAllSpecialServices, { params: { ...tableProps, ...filterParams, langId } });
    const specialServiceAction = yield take([ServiceActionTypes.FETCH_SPECIAL_SERVICE_LIST_SUCCESS, ServiceActionTypes.FETCH_SPECIAL_SERVICE_LIST_FAILURE]);
    const specialServiceActionResponse = getPayloadData(specialServiceAction.payload, {});
    let specialServiceTableData = specialServiceActionResponse.content || [];
    let allFilterValues = getAllFilterOptionValues(passedColumns, specialServiceTableData);
    if (specialServiceAction.type === ServiceActionTypes.FETCH_SPECIAL_SERVICE_LIST_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_SPECIAL_SERVICE_REQUEST, specialServiceActionResponse);
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_SPECIAL_SERVICE_REQUEST, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_SPECIAL_SERVICE_REQUEST, filterOptionsList: allFilterValues }));
    }

}

function* processSpecialService(action) {
    const { id: serviceId, type, pagination: { page = DEFAULT_TABLE_PROPS.pageNo, size = DEFAULT_TABLE_PROPS.pageSize, count = DEFAULT_TABLE_PROPS.totalCount } } = action.payload.data;
    let approve = type === ACTION_TYPES.ACCEPT ? true : false;
    yield fork(saga.handleAPIRequest, API.processSpecialService, { body: { approve }, serviceId });
    const processSpecialServiceApiAction = yield take([ServiceActionTypes.PROCESS_SPECIAL_SERVICE_SUCCESS, ServiceActionTypes.PROCESS_SPECIAL_SERVICE_FAILURE]);
    if (processSpecialServiceApiAction.type === ServiceActionTypes.PROCESS_SPECIAL_SERVICE_SUCCESS) {
        let message = (type === ACTION_TYPES.ACCEPT) ? 'approved_successfully' : 'declined_successfully';
        yield call(successNotify, I18n.t(message, { type: I18n.t('special_service_request_in_table') }), 5000);
    }
    yield call(fetchAllSpecialServices, { payload: { data: { page, size, count } } });
}

function* fetchSpecialServiceScheduleData(action) {
    const serviceId = action.payload.data;
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchSpecialServiceScheduleData, { params: { langId }, serviceId });
}

function* processSpecialServiceSchedule(action) {
    const { id: serviceId, pagination: { page = DEFAULT_TABLE_PROPS.pageNo, size = DEFAULT_TABLE_PROPS.pageSize, count = DEFAULT_TABLE_PROPS.totalCount } } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.processSpecialServiceSchedule, { serviceId });
    const processSpecialServiceScheduleApiAction = yield take([ServiceActionTypes.PROCESS_SPECIAL_SERVICE_SCHEDULE_SUCCESS, ServiceActionTypes.PROCESS_SPECIAL_SERVICE_SCHEDULE_FAILURE]);
    if (processSpecialServiceScheduleApiAction.type === ServiceActionTypes.PROCESS_SPECIAL_SERVICE_SCHEDULE_SUCCESS) {
        yield call(successNotify, I18n.t('special_service_schedule_created'), 5000);
        yield call(fetchAllSpecialServices, { payload: { data: { page, size, count } } });
    }
}

function* assignSpecialServiceServiceWorker(action) {
    yield fork(saga.handleAPIRequest, API.assignSpecialServiceServiceWorker, action.payload.data);
    const responseAction = yield take([ServiceActionTypes.ASSIGN_SERVICE_WORKER_SUCCESS, ServiceActionTypes.ASSIGN_SERVICE_WORKER_FAILURE]);
    if (responseAction.type === ServiceActionTypes.ASSIGN_SERVICE_WORKER_SUCCESS) {
        yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('service_worker') }));
        yield call(fetchAllSpecialServices);
    }
}


export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_ALL_ORGANIZATIONS, fetchAllOrganizations),
        takeLatest(ActionTypes.FETCH_SERVICE_PROVIDERS, fetchServiceProviders),
        takeLatest(ActionTypes.FETCH_WARDS, fetchWards),
        takeLatest(ActionTypes.FETCH_SERVICE_WORKERS, fetchServiceWorkers),
        takeLatest(ActionTypes.FETCH_SERVICE, fetchServices),
        takeLatest(ActionTypes.FETCH_SERVICE_INTERVALS, fetchServiceIntervals),
        takeLatest(ActionTypes.FETCH_ALL_CUSTOMERS, fetchCustomers),
        takeLatest(ActionTypes.FETCH_ALL_SCHEDULE, fetchSchedules),
        takeLatest(ActionTypes.FETCH_TRADING_TYPE, fetchTradingType),
        takeLatest(ActionTypes.FETCH_RESIDENTIAL_ASSOCIATION, fetchResidentialAssociations),
        takeLatest(ActionTypes.DELETE_SCHEDULE, deleteScheduleData),
        takeLatest(ActionTypes.SUBMIT_SCHEDULED_CUSTOMER, submitScheduledCustomer),
        takeLatest(ActionTypes.POST_SCHEDULE, postSchedule),
        takeLatest(ActionTypes.UPDATE_SCHEDULE, updateSchedule),
        takeLatest(ActionTypes.FETCH_CUSTOMERS_BY_SCHEDULE_ID, fetchCustomersByScheduleId),
        takeLatest(ActionTypes.ADD_CUSTOMERS_BY_SCHEDULE_ID, addCustomerByScheduleId),
        takeLatest(ActionTypes.REMOVE_CUSTOMERS_BY_SCHEDULE_ID, removeCustomerByScheduleId),
        takeLatest(ActionTypes.FETCH_SCHEDULE_BY_ID, fetchScheduleById),
        takeLatest(ActionTypes.FETCH_SCHEDULE_HISTORY, fetchSchedulesHistory),
        takeLatest(ActionTypes.FETCH_ALL_RESIDENCE_CATEGORIES, fetchAllResidenceCategories),

        takeLatest(ServiceActionTypes.FETCH_SPECIAL_SERVICE_LIST, fetchAllSpecialServices),
        takeLatest(ServiceActionTypes.PROCESS_SPECIAL_SERVICE, processSpecialService),
        takeLatest(ServiceActionTypes.FETCH_SPECIAL_SERVICE_SCHEDULE_DATA, fetchSpecialServiceScheduleData),
        takeLatest(ServiceActionTypes.PROCESS_SPECIAL_SERVICE_SCHEDULE, processSpecialServiceSchedule),
        takeLatest(ServiceActionTypes.ASSIGN_SERVICE_WORKER, assignSpecialServiceServiceWorker)

    ]);
}
