import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchDistrictPanchayathDetailsAPI({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_DISTRICT_PANCHAYATH_DETAILS_REQUEST, ActionTypes.FETCH_DISTRICT_PANCHAYATH_DETAILS_SUCCESS, ActionTypes.FETCH_DISTRICT_PANCHAYATH_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.BASIC_CONFIG.LIST_DISTRICT_PANCHAYATH,
        api: restAPI.get,
        payload
    };
}
export function saveDistrictPanchayath(data) {
    let payload = {
        types: [ActionTypes.SAVE_DISTRICT_PANCHAYATH_REQUEST, ActionTypes.SAVE_DISTRICT_PANCHAYATH_SUCCESS, ActionTypes.SAVE_DISTRICT_PANCHAYATH_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.SAVE_DISTRICT_PANCHAYATH,
        api: restAPI.post,
        payload
    };
}
export function deleteDistrictPanchayath(data) {
    let payload = {
        types: [ActionTypes.DELETE_DISTRICT_PANCHAYATH_REQUEST, ActionTypes.DELETE_DISTRICT_PANCHAYATH_SUCCESS, ActionTypes.DELETE_DISTRICT_PANCHAYATH_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.DELETE_DISTRICT_PANCHAYATH.replace(':districtPanchayathId', data),
        api: restAPI.del,
        payload
    };
}
export function updateDistrictPanchayath(data, id) {
    let payload = {
        types: [ActionTypes.UPDATE_DISTRICT_PANCHAYATH_REQUEST, ActionTypes.UPDATE_DISTRICT_PANCHAYATH_SUCCESS, ActionTypes.UPDATE_DISTRICT_PANCHAYATH_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.UPDATE_DISTRICT_PANCHAYATH.replace(':districtPanchayathId', id),
        api: restAPI.put,
        payload
    };
}
export function fetchDistrictPanchayathDataById({ langId, distId }) {
    let payload = {
        types: [ActionTypes.FETCH_DISTRICT_PANCHAYATH_BY_ID_REQUEST, ActionTypes.FETCH_DISTRICT_PANCHAYATH_BY_ID_SUCCESS, ActionTypes.FETCH_DISTRICT_PANCHAYATH_BY_ID_FAILURE],
        params: { langId }
    };
    return {
        url: URL.BASIC_CONFIG.FETCH_DISTRICT_PANCHAYATH_BY_ID.replace(':districtPanchayathId', distId),
        api: restAPI.get,
        payload
    };
}
export function fetchDistrict(stateId) {
    const type = 'dropdown';
    let payload = {
        types: [ActionTypes.LIST_DISTRICT_PANCHAYATH_DISTRICT_REQUEST, ActionTypes.LIST_DISTRICT_PANCHAYATH_DISTRICT_SUCCESS, ActionTypes.LIST_DISTRICT_PANCHAYATH_DISTRICT_FAILURE],
        params: { stateId, type }

    };
    return {
        url: URL.BASIC_CONFIG.LIST_DISTRICT,
        api: restAPI.get,
        payload
    };
}
export function listJsonDataForBasicConfig({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_DISTRICT_PANCHAYATH_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_DISTRICT_PANCHAYATH_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_DISTRICT_PANCHAYATH_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.BASIC_CONFIG.LIST_DISTRICT_PANCHAYATH,
        api: restAPI.get,
        payload
    };
}


