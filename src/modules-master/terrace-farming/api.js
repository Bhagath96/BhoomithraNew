import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function listTerraceFarming({ params, types }) {
    let payload = {
        types,
        params
    };
    return {
        url: URL.TERRACE_FARMING.LIST_TERRACE_FARMING,
        api: restAPI.get,
        payload
    };
}

export function listJsonForTerraceFarmingFilter({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_TERRACE_FARMING_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_TERRACE_FARMING_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_TERRACE_FARMING_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.TERRACE_FARMING.LIST_TERRACE_FARMING,
        api: restAPI.get,
        payload
    };
}

export function sentTerraceFarming(data) {
    let payload = {
        types: [ActionTypes.SENT_TERRACE_FARMING_REQUEST, ActionTypes.SENT_TERRACE_FARMING_SUCCESS, ActionTypes.SENT_TERRACE_FARMING_FAILURE],
        body: data
    };
    return {
        url: URL.TERRACE_FARMING.LIST_TERRACE_FARMING,
        api: restAPI.post,
        payload
    };
}


export function editTerraceFarming(id, data) {
    let payload = {
        types: [ActionTypes.EDIT_TERRACE_FARMING_REQUEST, ActionTypes.EDIT_TERRACE_FARMING_SUCCESS, ActionTypes.EDIT_TERRACE_FARMING_FAILURE],
        body: data
    };
    return {
        url: URL.TERRACE_FARMING.EDIT_TERRACE_FARMING.replace(':terraceFarmingHelpTypeId', id),
        api: restAPI.put,
        payload
    };
}

export function getTerraceFarmingById(id) {
    let payload = {
        types: [ActionTypes.GET_TERRACE_FARMING_BY_ID_REQUEST, ActionTypes.GET_TERRACE_FARMING_BY_ID_SUCCESS, ActionTypes.GET_TERRACE_FARMING_BY_ID_FAILURE]
    };
    return {
        url: URL.TERRACE_FARMING.GET_TERRACE_FARMING_BY_ID.replace(':terraceFarmingHelpTypeId', id),
        api: restAPI.get,
        payload
    };
}

export function deleteTerraceFarming(data) {
    let payload = {
        types: [ActionTypes.DELETE_TERRACE_FARMING_REQUEST, ActionTypes.DELETE_TERRACE_FARMING_SUCCESS, ActionTypes.DELETE_TERRACE_FARMING_FAILURE],
        body: data
    };
    return {
        url: URL.TERRACE_FARMING.GET_TERRACE_FARMING_BY_ID.replace(':terraceFarmingHelpTypeId', data),
        api: restAPI.del,
        payload
    };
}


