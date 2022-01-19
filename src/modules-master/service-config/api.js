import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function listServiceConfig({ params, types }) {
    let payload = {
        types,
        params
    };
    return {
        url: URL.SERVICE_CONFIG.LIST_SERVICE_CONFIG,
        api: restAPI.get,
        payload
    };
}

export function listJsonForServiceConfigFilter({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_SERVICE_CONFIG_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_SERVICE_CONFIG_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_SERVICE_CONFIG_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.SERVICE_CONFIG.LIST_SERVICE_CONFIG,
        api: restAPI.get,
        payload
    };
}

export function sentServiceConfig(data) {
    let payload = {
        types: [ActionTypes.SENT_SERVICE_CONFIG_REQUEST, ActionTypes.SENT_SERVICE_CONFIG_SUCCESS, ActionTypes.SENT_SERVICE_CONFIG_FAILURE],
        body: data
    };
    return {
        url: URL.SERVICE_CONFIG.LIST_SERVICE_CONFIG,
        api: restAPI.post,
        payload
    };
}


export function editServiceConfig(id, data) {
    let payload = {
        types: [ActionTypes.EDIT_SERVICE_CONFIG_REQUEST, ActionTypes.EDIT_SERVICE_CONFIG_SUCCESS, ActionTypes.EDIT_SERVICE_CONFIG_FAILURE],
        body: data
    };
    return {
        url: URL.SERVICE_CONFIG.EDIT_SERVICE_CONFIG.replace(':serviceConfigId', id),
        api: restAPI.put,
        payload
    };
}

export function getServiceConfigById(id) {
    let payload = {
        types: [ActionTypes.GET_SERVICE_CONFIG_BY_ID_REQUEST, ActionTypes.GET_SERVICE_CONFIG_BY_ID_SUCCESS, ActionTypes.GET_SERVICE_CONFIG_BY_ID_FAILURE]
    };
    return {
        url: URL.SERVICE_CONFIG.GET_SERVICE_CONFIG_BY_ID.replace(':serviceConfigId', id),
        api: restAPI.get,
        payload
    };
}

export function deleteServiceConfig(data) {
    let payload = {
        types: [ActionTypes.DELETE_SERVICE_CONFIG_REQUEST, ActionTypes.DELETE_SERVICE_CONFIG_SUCCESS, ActionTypes.DELETE_SERVICE_CONFIG_FAILURE],
        body: data
    };
    return {
        url: URL.SERVICE_CONFIG.GET_SERVICE_CONFIG_BY_ID.replace(':serviceConfigId', data),
        api: restAPI.del,
        payload
    };
}


