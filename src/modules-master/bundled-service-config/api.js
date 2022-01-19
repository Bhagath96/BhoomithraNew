import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function listBundledServiceConfig({ params, types }) {
    let payload = {
        types,
        params
    };
    return {
        url: URL.BUNDLED_SERVICE_CONFIG.LIST_BUNDLED_SERVICE_CONFIG,
        api: restAPI.get,
        payload
    };
}

export function listJsonForBundledServiceConfigFilter({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_BUNDLED_SERVICE_CONFIG_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_BUNDLED_SERVICE_CONFIG_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_BUNDLED_SERVICE_CONFIG_FILTER_FAILURE],
        params: { filter: true, type, searchValue, searchKey }
    };
    return {
        url: URL.BUNDLED_SERVICE_CONFIG.LIST_BUNDLED_SERVICE_CONFIG,
        api: restAPI.get,
        payload
    };
}

export function sentBundledServiceConfig(data) {
    let payload = {
        types: [ActionTypes.SENT_BUNDLED_SERVICE_CONFIG_REQUEST, ActionTypes.SENT_BUNDLED_SERVICE_CONFIG_SUCCESS, ActionTypes.SENT_BUNDLED_SERVICE_CONFIG_FAILURE],
        body: data
    };
    return {
        url: URL.BUNDLED_SERVICE_CONFIG.LIST_BUNDLED_SERVICE_CONFIG,
        api: restAPI.post,
        payload
    };
}


export function editBundledServiceConfig(id, data) {
    let payload = {
        types: [ActionTypes.EDIT_BUNDLED_SERVICE_CONFIG_REQUEST, ActionTypes.EDIT_BUNDLED_SERVICE_CONFIG_SUCCESS, ActionTypes.EDIT_BUNDLED_SERVICE_CONFIG_FAILURE],
        body: data
    };
    return {
        url: URL.BUNDLED_SERVICE_CONFIG.EDIT_BUNDLED_SERVICE_CONFIG.replace(':bundledServiceConfigId', id),
        api: restAPI.put,
        payload
    };
}

export function getBundledServiceConfigById(id) {
    let payload = {
        types: [ActionTypes.GET_BUNDLED_SERVICE_CONFIG_BY_ID_REQUEST, ActionTypes.GET_BUNDLED_SERVICE_CONFIG_BY_ID_SUCCESS, ActionTypes.GET_BUNDLED_SERVICE_CONFIG_BY_ID_FAILURE]
    };
    return {
        url: URL.BUNDLED_SERVICE_CONFIG.GET_BUNDLED_SERVICE_CONFIG_BY_ID.replace(':bundledServiceConfigId', id),
        api: restAPI.get,
        payload
    };
}

export function deleteBundledServiceConfig(data) {
    let payload = {
        types: [ActionTypes.DELETE_BUNDLED_SERVICE_CONFIG_REQUEST, ActionTypes.DELETE_BUNDLED_SERVICE_CONFIG_SUCCESS, ActionTypes.DELETE_BUNDLED_SERVICE_CONFIG_FAILURE],
        body: data
    };
    return {
        url: URL.BUNDLED_SERVICE_CONFIG.GET_BUNDLED_SERVICE_CONFIG_BY_ID.replace(':bundledServiceConfigId', data),
        api: restAPI.del,
        payload
    };
}

export function fetchBundledServiceConfig(orgId) {
    let payload = {
        types: [ActionTypes.FETCH_BUNDLED_SERVICE_CONFIG_FOR_CHK_REQUEST, ActionTypes.FETCH_BUNDLED_SERVICE_CONFIG_FOR_CHK_SUCCESS, ActionTypes.FETCH_BUNDLED_SERVICE_CONFIG_FOR_CHK_FAILURE]
    };
    return {
        url: URL.BUNDLED_SERVICE_CONFIG.BUNDLE_SERVICE_CONFIG_ASSOCIATION.replace(':bundledServiceConfigId', orgId),
        api: restAPI.get,
        payload
    };
}

export function saveBundledServiceConfig(Id, body) {
    let payload = {
        types: [ActionTypes.SAVE_BUNDLED_SERVICE_CONFIG_FOR_CHK_REQUEST, ActionTypes.SAVE_BUNDLED_SERVICE_CONFIG_FOR_CHK_SUCCESS, ActionTypes.SAVE_BUNDLED_SERVICE_CONFIG_FOR_CHK_FAILURE],
        body
    };
    return {
        url: URL.BUNDLED_SERVICE_CONFIG.BUNDLE_SERVICE_CONFIG_ASSOCIATION.replace(':bundledServiceConfigId', Id),
        api: restAPI.put,
        payload
    };
}


