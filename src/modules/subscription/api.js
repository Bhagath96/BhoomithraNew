import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchSubscriptionDetails({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_SUBSCRIPTION_DETAILS_REQUEST, ActionTypes.FETCH_SUBSCRIPTION_DETAILS_SUCCESS, ActionTypes.FETCH_SUBSCRIPTION_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.LIST_SUBSCRIPTION.LIST_SUBSCRIPTION,
        api: restAPI.get,
        payload
    };
}
export function listJsonDataForSubscription({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_SUBSCRIPTION_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_SUBSCRIPTION_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_SUBSCRIPTION_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.LIST_SUBSCRIPTION.LIST_SUBSCRIPTION,
        api: restAPI.get,
        payload
    };
}

