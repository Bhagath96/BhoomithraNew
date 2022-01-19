import { restAPI, URL } from '../../common';
import { types as ActionTypes, serviceTypes as ServiceActionTypes } from './actions';
import { RESPONSE_TYPE } from '../../common/constants';
import { ORG_TYPES } from '../common/constants';


export function fetchCustomers({ data: params }) {
    let payload = {
        types: [ActionTypes.FETCH_ALL_CUSTOMERS_REQUEST, ActionTypes.FETCH_ALL_CUSTOMERS_SUCCESS, ActionTypes.FETCH_ALL_CUSTOMERS_FAILURE],
        params
    };
    return {
        url: URL.SCHEDULE.FETCH_CUSTOMERS,
        api: restAPI.get,
        payload
    };
}
export function fetchSchedules({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_ALL_SCHEDULE_REQUEST, ActionTypes.FETCH_ALL_SCHEDULE_SUCCESS, ActionTypes.FETCH_ALL_SCHEDULE_FAILURE],
        params
    };
    return {
        url: URL.SCHEDULE.FETCH_SCHEDULE,
        api: restAPI.get,
        payload
    };
}
export function fetchScheduleById(id) {
    let payload = {
        types: [ActionTypes.FETCH_SCHEDULE_BY_ID_REQUEST, ActionTypes.FETCH_SCHEDULE_BY_ID_SUCCESS, ActionTypes.FETCH_SCHEDULE_BY_ID_FAILURE]
    };
    return {
        url: URL.SCHEDULE.FETCH_SCHEDULE_BY_ID.replace(':id', id),
        api: restAPI.get,
        payload
    };
}
export function listJsonDataForSchedule({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_SCHEDULE_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_SCHEDULE_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_SCHEDULE_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.SCHEDULE.FETCH_SCHEDULE,
        api: restAPI.get,
        payload
    };
}

export function fetchAllOrganizations({ langId }) {
    let payload = {
        types: [ActionTypes.FETCH_ALL_ORGANIZATIONS_REQUEST, ActionTypes.FETCH_ALL_ORGANIZATIONS_SUCCESS, ActionTypes.FETCH_ALL_ORGANIZATIONS_FAILURE],
        params: { langId, ...RESPONSE_TYPE.DROP_DOWN, ...ORG_TYPES }
    };
    return {
        url: URL.SCHEDULE.FETCH_ORGANIZATIONS,
        api: restAPI.get,
        payload
    };
}

export function fetchResidentialAssociations({ langId, wardId }) {
    let payload = {
        types: [ActionTypes.FETCH_RESIDENTIAL_ASSOCIATION_REQUEST, ActionTypes.FETCH_RESIDENTIAL_ASSOCIATION_SUCCESS, ActionTypes.FETCH_RESIDENTIAL_ASSOCIATION_FAILURE],
        params: { langId, wardId, ...RESPONSE_TYPE.DROP_DOWN }
    };
    return {
        url: URL.SCHEDULE.FETCH_RESIDENCE_TYPES,
        api: restAPI.get,
        payload
    };
}

export function fetchTradingType({ langId }) {
    let payload = {
        types: [ActionTypes.FETCH_TRADING_TYPE_REQUEST, ActionTypes.FETCH_TRADING_TYPE_SUCCESS, ActionTypes.FETCH_TRADING_TYPE_FAILURE],
        params: { langId, ...RESPONSE_TYPE.DROP_DOWN }
    };
    return {
        url: URL.SCHEDULE.FETCH_TRADING_TYPES,
        api: restAPI.get,
        payload
    };
}

export function fetchServiceProviders({ organizationId, langId }) {
    let payload = {
        types: [ActionTypes.FETCH_SERVICE_PROVIDERS_REQUEST, ActionTypes.FETCH_SERVICE_PROVIDERS_SUCCESS, ActionTypes.FETCH_SERVICE_PROVIDERS_FAILURE],
        params: { langId, ...RESPONSE_TYPE.DROP_DOWN }
    };
    return {
        url: URL.SCHEDULE.FETCH_SERVICE_PROVIDERS.replace(':organizationId', organizationId),
        api: restAPI.get,
        payload
    };
}

export function fetchWards({ organizationId, serviceProviderId, langId }) {
    let payload = {
        types: [ActionTypes.FETCH_WARDS_REQUEST, ActionTypes.FETCH_WARDS_SUCCESS, ActionTypes.FETCH_WARDS_FAILURE],
        params: { langId, ...RESPONSE_TYPE.DROP_DOWN }
    };
    return {
        url: URL.SCHEDULE.FETCH_WARDS.replace(':organizationId', organizationId).replace(':serviceProviderId', serviceProviderId),
        api: restAPI.get,
        payload
    };
}

export function fetchServiceWorkers({ serviceProviderId, wardId, langId }) {
    let payload = {
        types: [ActionTypes.FETCH_SERVICE_WORKERS_REQUEST, ActionTypes.FETCH_SERVICE_WORKERS_SUCCESS, ActionTypes.FETCH_SERVICE_WORKERS_FAILURE],
        params: { langId, ...RESPONSE_TYPE.DROP_DOWN }
    };
    return {
        url: URL.SCHEDULE.FETCH_SERVICE_WORKERS.replace(':serviceProviderId', serviceProviderId).replace(':wardId', wardId),
        api: restAPI.get,
        payload
    };
}

export function submitScheduledCustomer({ data, scheduleID }) {
    let payload = {
        types: [ActionTypes.SUBMIT_SCHEDULED_CUSTOMER_REQUEST, ActionTypes.SUBMIT_SCHEDULED_CUSTOMER_SUCCESS, ActionTypes.SUBMIT_SCHEDULED_CUSTOMER_FAILURE],
        body: data
    };
    return {
        url: URL.SCHEDULE.SUBMIT_SHEDULED_CUSTOMER.replace(':scheduleID', scheduleID),
        api: restAPI.get,
        payload
    };
}

export function fetchServices({ serviceProviderId, residenceCategoryId, langId }) {
    let payload = {
        types: [ActionTypes.FETCH_SERVICE_REQUEST, ActionTypes.FETCH_SERVICE_SUCCESS, ActionTypes.FETCH_SERVICE_FAILURE],
        params: { langId, ...RESPONSE_TYPE.DROP_DOWN }
    };
    return {
        url: URL.SCHEDULE.FETCH_SERVICES.replace(':serviceProviderId', serviceProviderId).replace(':residenceCategoryId', residenceCategoryId),
        api: restAPI.get,
        payload
    };
}

export function fetchServiceIntervals({ serviceConfigId, serviceProviderId, residenceCategoryId, langId }) {
    let payload = {
        types: [ActionTypes.FETCH_SERVICE_INTERVALS_REQUEST, ActionTypes.FETCH_SERVICE_INTERVALS_SUCCESS, ActionTypes.FETCH_SERVICE_INTERVALS_FAILURE],
        params: { langId, ...RESPONSE_TYPE.DROP_DOWN }
    };
    return {
        url: URL.SCHEDULE.FETCH_SERVICE_INTERVALS.replace(':serviceProviderId', serviceProviderId).replace(':serviceConfigId', serviceConfigId).replace(':residenceCategoryId', residenceCategoryId),
        api: restAPI.get,
        payload
    };
}

export function submitSchedule(data) {
    let payload = {
        types: [ActionTypes.POST_SCHEDULE_REQUEST, ActionTypes.POST_SCHEDULE_SUCCESS, ActionTypes.POST_SCHEDULE_FAILURE],
        body: data
    };
    return {
        url: URL.SCHEDULE.POST_SCHEDULE,
        api: restAPI.post,
        payload
    };
}

export function updateSchedule(data) {
    let payload = {
        types: [ActionTypes.UPDATE_SCHEDULE_REQUEST, ActionTypes.UPDATE_SCHEDULE_SUCCESS, ActionTypes.UPDATE_SCHEDULE_FAILURE],
        body: data
    };
    return {
        url: URL.SCHEDULE.UPDATE_SCHEDULE.replace(':id', data.id),
        api: restAPI.put,
        payload
    };
}

export function fetchCustomersByScheduleId({ params, queryData }) {
    let payload = {
        types: [ActionTypes.FETCH_CUSTOMERS_BY_SCHEDULE_ID_REQUEST, ActionTypes.FETCH_CUSTOMERS_BY_SCHEDULE_ID_SUCCESS, ActionTypes.FETCH_CUSTOMERS_BY_SCHEDULE_ID_FAILURE],
        params
    };
    return {
        url: URL.SCHEDULE.FETCH_CUSTOMERS_BY_SCHEDULE_ID.replace(':id', queryData.id).replace(':type', queryData.type),
        api: restAPI.get,
        payload
    };
}
export function addScheduledCustomer(data) {
    let payload = {
        types: [ActionTypes.ADD_CUSTOMERS_BY_SCHEDULE_ID_REQUEST, ActionTypes.ADD_CUSTOMERS_BY_SCHEDULE_ID_SUCCESS, ActionTypes.ADD_CUSTOMERS_BY_SCHEDULE_ID_FAILURE],
        body: data?.data
    };
    return {
        url: URL.SCHEDULE.SUBMIT_SCHEDULED_CUSTOMER.replace(':scheduleId', data?.id),
        api: restAPI.post,
        payload
    };
}
export function removeScheduledCustomer({ data: params, Id }) {

    let payload = {
        types: [ActionTypes.REMOVE_CUSTOMERS_BY_SCHEDULE_ID_REQUEST, ActionTypes.REMOVE_CUSTOMERS_BY_SCHEDULE_ID_SUCCESS, ActionTypes.REMOVE_CUSTOMERS_BY_SCHEDULE_ID_FAILURE],
        params

    };
    return {
        url: URL.SCHEDULE.SUBMIT_SCHEDULED_CUSTOMER.replace(':scheduleId', Id),
        api: restAPI.del,
        payload
    };
}

export function fetchSchedulesHistory({ scheduleId, data: params }) {
    let payload = {
        types: [ActionTypes.FETCH_SCHEDULE_HISTORY_REQUEST, ActionTypes.FETCH_SCHEDULE_HISTORY_SUCCESS, ActionTypes.FETCH_SCHEDULE_HISTORY_FAILURE],
        params
    };
    return {
        url: URL.SCHEDULE.FETCH_HISTORY.replace(':scheduleId', scheduleId),
        api: restAPI.get,
        payload
    };
}
export function deleteSchedule(data) {
    let payload = {
        types: [ActionTypes.DELETE_SCHEDULE_REQUEST, ActionTypes.DELETE_SCHEDULE_SUCCESS, ActionTypes.DELETE_SCHEDULE_FAILURE]
    };
    return {
        url: URL.SCHEDULE.DELETE_SCHEDULE.replace(':id', data),
        api: restAPI.del,
        payload
    };
}


export function fetchAllResidenceCategories({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_ALL_RESIDENCE_CATEGORIES_REQUEST, ActionTypes.FETCH_ALL_RESIDENCE_CATEGORIES_SUCCESS, ActionTypes.FETCH_ALL_RESIDENCE_CATEGORIES_FAILURE],
        params: { ...params, ...RESPONSE_TYPE.DROP_DOWN }
    };
    return {
        url: URL.SCHEDULE.RESIDENCE_CATEGORIES,
        api: restAPI.get,
        payload
    };
}

export function fetchAllSpecialServices({ params }) {
    let payload = {
        types: [ServiceActionTypes.FETCH_SPECIAL_SERVICE_LIST_REQUEST, ServiceActionTypes.FETCH_SPECIAL_SERVICE_LIST_SUCCESS, ServiceActionTypes.FETCH_SPECIAL_SERVICE_LIST_FAILURE],
        params
    };
    return {
        url: URL.SPECIAL_SERVICE.FETCH_SERVICES,
        api: restAPI.get,
        payload
    };
}

export function processSpecialService({ body, serviceId }) {
    let payload = {
        types: [ServiceActionTypes.PROCESS_SPECIAL_SERVICE_REQUEST, ServiceActionTypes.PROCESS_SPECIAL_SERVICE_SUCCESS, ServiceActionTypes.PROCESS_SPECIAL_SERVICE_FAILURE],
        body
    };
    return {
        url: URL.SPECIAL_SERVICE.PROCESS_SERVICE.replace(':specialServiceRequestId', serviceId),
        api: restAPI.put,
        payload
    };
}

export function fetchSpecialServiceScheduleData({ params, serviceId }) {
    let payload = {
        types: [ServiceActionTypes.FETCH_SPECIAL_SERVICE_SCHEDULE_DATA_REQUEST, ServiceActionTypes.FETCH_SPECIAL_SERVICE_SCHEDULE_DATA_SUCCESS, ServiceActionTypes.FETCH_SPECIAL_SERVICE_SCHEDULE_DATA_FAILURE],
        params
    };
    return {
        url: URL.SPECIAL_SERVICE.FETCH_SCHEDULE_DETAILS_BY_ID.replace(':specialServiceRequestId', serviceId),
        api: restAPI.get,
        payload
    };
}

export function processSpecialServiceSchedule({ serviceId }) {
    let payload = {
        types: [ServiceActionTypes.PROCESS_SPECIAL_SERVICE_SCHEDULE_REQUEST, ServiceActionTypes.PROCESS_SPECIAL_SERVICE_SCHEDULE_SUCCESS, ServiceActionTypes.PROCESS_SPECIAL_SERVICE_SCHEDULE_FAILURE]
    };
    return {
        url: URL.SPECIAL_SERVICE.PROCESS_SCHEDULE.replace(':specialServiceRequestId', serviceId),
        api: restAPI.post,
        payload
    };
}
export function listJSONDataForSpecialService({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_SPECIAL_SERVICE_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_SPECIAL_SERVICE_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_SPECIAL_SERVICE_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.SPECIAL_SERVICE.FETCH_SERVICES,
        api: restAPI.get,
        payload
    };
}

export function assignSpecialServiceServiceWorker(request) {
    const { specialServiceRequestId, supervisorId, serviceWorkerId } = request;

    let payload = {
        types: [ServiceActionTypes.ASSIGN_SERVICE_WORKER_REQUEST, ServiceActionTypes.ASSIGN_SERVICE_WORKER_SUCCESS, ServiceActionTypes.ASSIGN_SERVICE_WORKER_FAILURE]
    };
    return {
        url: URL.SPECIAL_SERVICE.ASSIGN_SERVICE_WORKER
            .replace(':specialServiceRequestId', specialServiceRequestId)
            .replace(':supervisorId', supervisorId)
            .replace(':serviceWorkerId', serviceWorkerId),
        api: restAPI.put,
        payload
    };
}
