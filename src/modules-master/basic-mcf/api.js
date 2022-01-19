import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchMCF({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_MCF_REQUEST, ActionTypes.FETCH_MCF_SUCCESS, ActionTypes.FETCH_MCF_FAILURE],
        params
    };
    return {
        url: URL.BASIC_CONFIG.LIST_MCF,
        api: restAPI.get,
        payload
    };
}
export function loadLSGITypes() {
    let payload = {
        types: [ActionTypes.LIST_LSGI_REQUEST, ActionTypes.LIST_LSGI_SUCCESS, ActionTypes.LIST_LSGI_FAILURE]
    };
    return {
        url: URL.BASIC_CONFIG.LIST_LSGI_DROPDOWN,
        api: restAPI.get,
        payload
    };
}
export function fetchAllState() {
    let payload = {
        types: [ActionTypes.LIST_STATE_REQUEST, ActionTypes.LIST_STATE_SUCCESS, ActionTypes.LIST_STATE_FAILURE],
        params: { type: 'dropdown' }
    };
    return {
        url: URL.WARD.LIST_STATE,
        api: restAPI.get,
        payload
    };
}
export function fetchAllDistrict({ stateId }) {
    let payload = {
        types: [ActionTypes.LIST_DISTRICT_REQUEST, ActionTypes.LIST_DISTRICT_SUCCESS, ActionTypes.LIST_DISTRICT_FAILURE],
        params: { type: 'dropdown', stateId }
    };
    return {
        url: URL.WARD.LIST_DISTRICTS,
        api: restAPI.get,
        payload
    };
}
export function listAllLsgi({ districtId }) {
    let payload = {
        types: [ActionTypes.LIST_LSGI_REQUEST, ActionTypes.LIST_LSGI_SUCCESS, ActionTypes.LIST_LSGI_FAILURE],
        params: { type: 'dropdown', districtId }
    };
    return {
        url: URL.WARD.LIST_LSGI,
        api: restAPI.get,
        payload
    };
}
export function listAllWard({ lsgiId }) {
    let payload = {
        types: [ActionTypes.LIST_WARD_BY_ID_REQUEST, ActionTypes.LIST_WARD_BY_ID_SUCCESS, ActionTypes.LIST_WARD_BY_ID_FAILURE],
        params: { type: 'dropdown', lsgiId }
    };
    return {
        url: URL.WARD.LIST_WARDS,
        api: restAPI.get,
        payload
    };
}
export function fetchMCFById({ langId, mcfId }) {
    let payload = {
        types: [ActionTypes.FETCH_MCF_BY_ID_REQUEST, ActionTypes.FETCH_MCF_BY_ID_SUCCESS, ActionTypes.FETCH_MCF_BY_ID_FAILURE],
        params: { langId }
    };
    return {
        url: URL.BASIC_CONFIG.UPDATE_MCF.replace(':mcfId', mcfId),
        api: restAPI.get,
        payload
    };
}


export function saveMCF(data) {
    let payload = {
        types: [ActionTypes.SAVE_MCF_DETAILS_REQUEST, ActionTypes.SAVE_MCF_DETAILS_SUCCESS, ActionTypes.SAVE_MCF_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.SAVE_MCF,
        api: restAPI.post,
        payload
    };
}
export function deleteMCF(data) {
    let payload = {
        types: [ActionTypes.DELETE_MCF_DETAILS_REQUEST, ActionTypes.DELETE_MCF_DETAILS_SUCCESS, ActionTypes.DELETE_MCF_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.DELETE_MCF.replace(':mcfId', data),
        api: restAPI.del,
        payload
    };
}
export function updateMCF(data, id) {
    let payload = {
        types: [ActionTypes.UPDATE_MCF_DETAILS_REQUEST, ActionTypes.UPDATE_MCF_DETAILS_SUCCESS, ActionTypes.UPDATE_MCF_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.UPDATE_MCF.replace(':mcfId', id),
        api: restAPI.put,
        payload
    };
}


export function listJsonDataForBasicConfig({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_MCF_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_MCF_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_MCF_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.BASIC_CONFIG.LIST_MCF,
        api: restAPI.get,
        payload
    };
}

