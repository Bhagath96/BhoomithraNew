import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchServiceHistoryDetails({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_SERVICE_HISTORY_DETAILS_REQUEST, ActionTypes.FETCH_SERVICE_HISTORY_DETAILS_SUCCESS, ActionTypes.FETCH_SERVICE_HISTORY_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.LIST_SERVICE.LIST_SERVICE,
        api: restAPI.get,
        payload
    };
}

export function listServiceHistoryById(params) {
    let payload = {
        types: [ActionTypes.FETCH_SERVICE_HISTORY_DETAILS_BY_ID_REQUEST, ActionTypes.FETCH_SERVICE_HISTORY_DETAILS_BY_ID_SUCCESS, ActionTypes.FETCH_SERVICE_HISTORY_DETAILS_BY_ID_FAILURE],
        params
    };
    return {
        url: URL.LIST_SERVICE.LIST_SERVICE_HISTORY_BY_ID,
        api: restAPI.get,
        payload
    };
}

