import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function loadCustomerCount(params) {
    let payload = {
        types: [ActionTypes.CUSTOMER_CARD_COUNT_REQUEST, ActionTypes.CUSTOMER_CARD_COUNT_SUCCESS, ActionTypes.CUSTOMER_CARD_COUNT_FAILURE],
        params

    };
    return {
        url: URL.DASHBOARD.GET_CUSTOMER_COUNT,
        api: restAPI.get,
        payload
    };
}

export function loadServiceCount(params) {
    let payload = {
        types: [ActionTypes.SERVICE_CARD_COUNT_REQUEST, ActionTypes.SERVICE_CARD_COUNT_SUCCESS, ActionTypes.SERVICE_CARD_COUNT_FAILURE],
        params

    };
    return {
        url: URL.DASHBOARD.GET_SERVICE_COUNT,
        api: restAPI.get,
        payload
    };
}

export function getTotalAndPlanEnabledCustomers(params) {
    let payload = {
        types: [ActionTypes.TOTAL_CUSTOMERS_VS_PLAN_ENABLED_CUSTOMERS_REQUEST, ActionTypes.TOTAL_CUSTOMERS_VS_PLAN_ENABLED_CUSTOMERS_SUCCESS, ActionTypes.TOTAL_CUSTOMERS_VS_PLAN_ENABLED_CUSTOMERS_FAILURE],
        params
    };
    return {
        url: URL.DASHBOARD.TOTAL_CUSTOMERS_VS_PLAN_ENABLED_CUSTOMERS,
        api: restAPI.get,
        payload
    };
}

export function getServiceCreatedAndRegistered(params) {
    let payload = {
        types: [ActionTypes.SERVICE_CREATED_VS_SERVICE_EXECUTED_REQUEST, ActionTypes.SERVICE_CREATED_VS_SERVICE_EXECUTED_SUCCESS, ActionTypes.SERVICE_CREATED_VS_SERVICE_EXECUTED_FAILURE],
        params
    };
    return {
        url: URL.DASHBOARD.SERVICE_CREATED_VS_SERVICE_EXECUTED,
        api: restAPI.get,
        payload
    };
}

export function getCustomersRegistered(params) {
    let payload = {
        types: [ActionTypes.CHART_PIE_CUSTOMERS_REGISTERED_REQUEST, ActionTypes.CHART_PIE_CUSTOMERS_REGISTERED_SUCCESS, ActionTypes.CHART_PIE_CUSTOMERS_REGISTERED_FAILURE],
        params
    };
    return {
        url: URL.DASHBOARD.CHART_PIE_CUSTOMERS_REGISTERED,
        api: restAPI.get,
        payload
    };
}

export function getTotalWastePerCategory(params) {
    let payload = {
        types: [ActionTypes.TOTAL_WASTE_PER_CATEGORY_REQUEST, ActionTypes.TOTAL_WASTE_PER_CATEGORY_SUCCESS, ActionTypes.TOTAL_WASTE_PER_CATEGORY_FAILURE],
        params
    };
    return {
        url: URL.DASHBOARD.TOTAL_WASTE_PER_CATEGORY,
        api: restAPI.get,
        payload
    };
}

export function getTimeTakenToService(params) {
    let payload = {
        types: [ActionTypes.TIME_TAKEN_TO_SERVICE_REQUEST, ActionTypes.TIME_TAKEN_TO_SERVICE_SUCCESS, ActionTypes.TIME_TAKEN_TO_SERVICE_FAILURE],
        params
    };
    return {
        url: URL.DASHBOARD.TIME_TAKEN_TO_SERVICE,
        api: restAPI.get,
        payload
    };
}

export function getTimeTakenToServicePerCustomer(params) {
    let payload = {
        types: [ActionTypes.TIME_TAKEN_TO_SERVICE_PER_CUSTOMER_REQUEST, ActionTypes.TIME_TAKEN_TO_SERVICE_PER_CUSTOMER_SUCCESS, ActionTypes.TIME_TAKEN_TO_SERVICE_PER_CUSTOMER_FAILURE],
        params
    };
    return {
        url: URL.DASHBOARD.TIME_TAKEN_TO_SERVICE_PER_CUSTOMER,
        api: restAPI.get,
        payload
    };
}
