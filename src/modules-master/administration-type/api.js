import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function listAdministrationType({ params, types }) {
    let payload = {
        types,
        params
    };
    return {
        url: URL.ADMINISTRATION_TYPE.LIST_ADMINISTRATION_TYPE,
        api: restAPI.get,
        payload
    };
}

export function listJsonForAdministrationTypeFilter({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_ADMINISTRATION_TYPE_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_ADMINISTRATION_TYPE_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_ADMINISTRATION_TYPE_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.ADMINISTRATION_TYPE.LIST_ADMINISTRATION_TYPE,
        api: restAPI.get,
        payload
    };
}

export function sentAdministrationType(data) {
    let payload = {
        types: [ActionTypes.SENT_ADMINISTRATION_TYPE_REQUEST, ActionTypes.SENT_ADMINISTRATION_TYPE_SUCCESS, ActionTypes.SENT_ADMINISTRATION_TYPE_FAILURE],
        body: data
    };
    return {
        url: URL.ADMINISTRATION_TYPE.LIST_ADMINISTRATION_TYPE,
        api: restAPI.post,
        payload
    };
}


export function editAdministrationType(id, data) {
    let payload = {
        types: [ActionTypes.EDIT_ADMINISTRATION_TYPE_REQUEST, ActionTypes.EDIT_ADMINISTRATION_TYPE_SUCCESS, ActionTypes.EDIT_ADMINISTRATION_TYPE_FAILURE],
        body: data
    };
    return {
        url: URL.ADMINISTRATION_TYPE.EDIT_ADMINISTRATION_TYPE.replace(':administrationTypeId', id),
        api: restAPI.put,
        payload
    };
}

export function getAdministrationTypeById(id) {
    let payload = {
        types: [ActionTypes.GET_ADMINISTRATION_TYPE_BY_ID_REQUEST, ActionTypes.GET_ADMINISTRATION_TYPE_BY_ID_SUCCESS, ActionTypes.GET_ADMINISTRATION_TYPE_BY_ID_FAILURE]
    };
    return {
        url: URL.ADMINISTRATION_TYPE.GET_ADMINISTRATION_TYPE_BY_ID.replace(':administrationTypeId', id),
        api: restAPI.get,
        payload
    };
}

export function deleteAdministrationType(data) {
    let payload = {
        types: [ActionTypes.DELETE_ADMINISTRATION_TYPE_REQUEST, ActionTypes.DELETE_ADMINISTRATION_TYPE_SUCCESS, ActionTypes.DELETE_ADMINISTRATION_TYPE_FAILURE],
        body: data
    };
    return {
        url: URL.ADMINISTRATION_TYPE.GET_ADMINISTRATION_TYPE_BY_ID.replace(':administrationTypeId', data),
        api: restAPI.del,
        payload
    };
}


