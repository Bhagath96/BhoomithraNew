import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchCustomerDetails({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_CUSTOMER_DETAILS_REQUEST, ActionTypes.FETCH_CUSTOMER_DETAILS_SUCCESS, ActionTypes.FETCH_CUSTOMER_DETAILS_FAILURE],
        params,
        options: {
            encode: false
        }
    };
    return {
        url: URL.CUSTOMER.LIST_DETAILS,
        api: restAPI.get,
        payload
    };
}

export function fetchCustomerDetailsBySurveyId(params) {
    let payload = {
        types: [ActionTypes.FETCH_CUSTOMER_DETAILS_BY_SURVEY_ID_REQUEST, ActionTypes.FETCH_CUSTOMER_DETAILS_BY_SURVEY_ID_SUCCESS, ActionTypes.FETCH_CUSTOMER_DETAILS_BY_SURVEY_ID_FAILURE],
        params
    };
    return {
        url: URL.CUSTOMER.DETAILS_SURVEY,
        api: restAPI.get,
        payload
    };
}

export function deleteCustomerDetailsBySurveyId({ surveyId }) {
    let payload = {
        types: [ActionTypes.DELETE_CUSTOMER_DETAILS_REQUEST, ActionTypes.DELETE_CUSTOMER_DETAILS_SUCCESS, ActionTypes.DELETE_CUSTOMER_DETAILS_FAILURE]
    };
    return {
        url: URL.CUSTOMER.DELETE_SURVEY.replace(':surveyId', surveyId),
        api: restAPI.del,
        payload
    };
}

export function listJSONData({ type, searchValue, searchKey }) {
    let moduleId = 8;
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_REQUEST, ActionTypes.LIST_JSON_DATA_SUCCESS, ActionTypes.LIST_JSON_DATA_FAILURE],
        params: { type, searchValue, searchKey, moduleId }
    };
    return {
        url: URL.CUSTOMER.LIST_FILTER,
        api: restAPI.get,
        payload
    };
}
export function listJSONDataForSubscription({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_SUBSCRIPTION_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_SUBSCRIPTION_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_SUBSCRIPTION_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.SUBSCRIPTION_REQUEST.LIST_SUBSCRIPTIONS,
        api: restAPI.get,
        payload
    };
}

export function fetchAllSubscriptions({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_ALL_SUBSCRIPTIONS_REQUEST, ActionTypes.FETCH_ALL_SUBSCRIPTIONS_SUCCESS, ActionTypes.FETCH_ALL_SUBSCRIPTIONS_FAILURE],
        params
    };
    return {
        url: URL.SUBSCRIPTION_REQUEST.LIST_SUBSCRIPTIONS,
        api: restAPI.get,
        payload
    };
}

export function processSubscription({ body, subscriptionId }) {
    let payload = {
        types: [ActionTypes.PROCESS_SUBSCRIPTION_REQUEST, ActionTypes.PROCESS_SUBSCRIPTION_SUCCESS, ActionTypes.PROCESS_SUBSCRIPTION_FAILURE],
        body
    };
    return {
        url: URL.SUBSCRIPTION_REQUEST.PROCESS_SUBSCRIPTION.replace(':subscriptionId', subscriptionId),
        api: restAPI.put,
        payload
    };
}
export function assignSubcriptionServiceWorker(request) {
    const { subScriptionRequestId, supervisorId, serviceWorkerId } = request;

    let payload = {
        types: [ActionTypes.ASSIGN_SERVICE_WORKER_REQUEST, ActionTypes.ASSIGN_SERVICE_WORKER_SUCCESS, ActionTypes.ASSIGN_SERVICE_WORKER_FAILURE]
    };
    return {
        url: URL.SUBSCRIPTION_REQUEST.ASSIGN_SERVICE_WORKER_IN_SUBSCRIPTION
            .replace(':subscriptionRequestId', subScriptionRequestId)
            .replace(':supervisorId', supervisorId)
            .replace(':serviceWorkerId', serviceWorkerId),
        api: restAPI.put,
        payload
    };
}
