import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchAllWards({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_ALL_WARDS_REQUEST, ActionTypes.FETCH_ALL_WARDS_SUCCESS, ActionTypes.FETCH_ALL_WARDS_FAILURE],
        params
    };
    return {
        url: URL.WARD.LIST_WARDS,
        api: restAPI.get,
        payload
    };
}
export function fetchAllRA({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_ALL_RESIDENTIAL_ASSOCIATIONS_REQUEST, ActionTypes.FETCH_ALL_RESIDENTIAL_ASSOCIATIONS_SUCCESS, ActionTypes.FETCH_ALL_RESIDENTIAL_ASSOCIATIONS_FAILURE],
        params,
        options: {
            encode: false
        }
    };
    return {
        url: URL.WARD.LIST_RESIDENTIAL_ASSOCIATIONS,
        api: restAPI.get,
        payload
    };
}

export function fetchAllLsgi({ districtId }) {
    let payload = {
        types: [ActionTypes.FETCH_ALL_LSGI_REQUEST, ActionTypes.FETCH_ALL_LSGI_SUCCESS, ActionTypes.FETCH_ALL_LSGI_FAILURE],
        params: { type: 'dropdown', districtId }
    };
    return {
        url: URL.WARD.LIST_LSGI,
        api: restAPI.get,
        payload
    };
}
export function listAllLsgi({ lsgiId }) {
    let payload = {
        types: [ActionTypes.LIST_ALL_WARDS_REQUEST, ActionTypes.LIST_ALL_WARDS_SUCCESS, ActionTypes.LIST_ALL_WARDS_FAILURE],
        params: { type: 'dropdown', lsgiId }
    };
    return {
        url: URL.WARD.LIST_WARDS,
        api: restAPI.get,
        payload
    };
}
export function fetchAllAssociationType() {
    let payload = {
        types: [ActionTypes.FETCH_ALL_ASSOCIATION_TYPE_REQUEST, ActionTypes.FETCH_ALL_ASSOCIATION_TYPE_SUCCESS, ActionTypes.FETCH_ALL_ASSOCIATION_TYPE_FAILURE],
        params: { type: 'dropdown' }
    };
    return {
        url: URL.WARD.LIST_ALL_ASSOCIATION_TYPE,
        api: restAPI.get,
        payload
    };
}
export function fetchAllState() {
    let payload = {
        types: [ActionTypes.FETCH_ALL_STATE_REQUEST, ActionTypes.FETCH_ALL_STATE_SUCCESS, ActionTypes.FETCH_ALL_STATE_FAILURE],
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
        types: [ActionTypes.FETCH_ALL_DISTRICT_REQUEST, ActionTypes.FETCH_ALL_DISTRICT_SUCCESS, ActionTypes.FETCH_ALL_DISTRICT_FAILURE],
        params: { type: 'dropdown', stateId }
    };
    return {
        url: URL.WARD.LIST_DISTRICTS,
        api: restAPI.get,
        payload
    };
}

export function fetchWardById({ wardId }) {
    let payload = {
        types: [ActionTypes.FETCH_WARD_BY_ID_REQUEST, ActionTypes.FETCH_WARD_BY_ID_SUCCESS, ActionTypes.FETCH_WARD_BY_ID_FAILURE]
    };
    return {
        url: URL.WARD.FETCH_WARD_BY_ID.replace(':id', wardId),
        api: restAPI.get,
        payload
    };
}

export function fetchRAById({ raId }) {
    let payload = {
        types: [ActionTypes.FETCH_RA_BY_ID_REQUEST, ActionTypes.FETCH_RA_BY_ID_SUCCESS, ActionTypes.FETCH_RA_BY_ID_FAILURE]
    };
    return {
        url: URL.WARD.FETCH_RA_BY_ID.replace(':id', raId),
        api: restAPI.get,
        payload
    };
}

export function updateWardData(data, id) {
    let payload = {
        types: [ActionTypes.UPDATE_WARD_REQUEST, ActionTypes.UPDATE_WARD_SUCCESS, ActionTypes.UPDATE_WARD_FAILURE],
        body: data

    };
    return {
        url: URL.WARD.FETCH_WARD_BY_ID.replace(':id', id),
        api: restAPI.put,
        payload
    };
}
export function addWardData(data) {
    let payload = {
        types: [ActionTypes.ADD_WARD_REQUEST, ActionTypes.ADD_WARD_SUCCESS, ActionTypes.ADD_WARD_FAILURE],
        body: data
    };
    return {
        url: URL.WARD.ADD_WARD,
        api: restAPI.post,
        payload
    };
}

export function deleteWardData(id) {
    let payload = {
        types: [ActionTypes.DELETE_WARD_REQUEST, ActionTypes.DELETE_WARD_SUCCESS, ActionTypes.DELETE_WARD_FAILURE]
    };
    return {
        url: URL.WARD.FETCH_WARD_BY_ID.replace(':id', id),
        api: restAPI.del,
        payload
    };
}


export function updateRAData(data, id) {
    let payload = {
        types: [ActionTypes.UPDATE_RESIDENTIAL_ASSOCIATION_REQUEST, ActionTypes.UPDATE_RESIDENTIAL_ASSOCIATION_SUCCESS, ActionTypes.UPDATE_RESIDENTIAL_ASSOCIATION_FAILURE],
        body: data
    };
    return {
        url: URL.WARD.FETCH_RESIDENTIAL_ASSOCIATION_BY_ID.replace(':id', id),
        api: restAPI.put,
        payload
    };
}
export function addRAData(data) {
    let payload = {
        types: [ActionTypes.ADD_RESIDENTIAL_ASSOCIATION_REQUEST, ActionTypes.ADD_RESIDENTIAL_ASSOCIATION_SUCCESS, ActionTypes.ADD_RESIDENTIAL_ASSOCIATION_FAILURE],
        body: data
    };
    return {
        url: URL.WARD.ADD_RESIDENTIAL_ASSOCIATION,
        api: restAPI.post,
        payload
    };
}

export function deleteRADataStatic(id) {
    let payload = {
        types: [ActionTypes.DELETE_RESIDENTIAL_ASSOCIATION_REQUEST, ActionTypes.DELETE_RESIDENTIAL_ASSOCIATION_SUCCESS, ActionTypes.DELETE_RESIDENTIAL_ASSOCIATION_FAILURE]
    };
    return {
        url: URL.WARD.FETCH_RESIDENTIAL_ASSOCIATION_BY_ID.replace(':id', id),
        api: restAPI.del,
        payload
    };
}
export function deleteRADataDFG(answerId) {
    let payload = {
        types: [ActionTypes.DELETE_RESIDENTIAL_ASSOCIATION_REQUEST, ActionTypes.DELETE_RESIDENTIAL_ASSOCIATION_SUCCESS, ActionTypes.DELETE_RESIDENTIAL_ASSOCIATION_FAILURE]
    };
    return {
        url: URL.WARD.FETCH_RESIDENTIAL_ASSOCIATION_DFG_BY_ID.replace(':id', answerId),
        api: restAPI.del,
        payload
    };
}
export function listJsonDataForWard({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_WARD_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_WARD_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_WARD_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.WARD.LIST_WARDS,
        api: restAPI.get,
        payload
    };
}

export function listJsonDataForRA({ type, searchValue, searchKey, wardId }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_RA_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_RA_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_RA_FILTER_FAILURE],
        params: { type, searchValue, searchKey, wardId }
    };
    return {
        url: URL.WARD.LIST_RESIDENTIAL_ASSOCIATIONS,
        api: restAPI.get,
        payload
    };
}
