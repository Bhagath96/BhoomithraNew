import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function listAssociationType({ params, types }) {
    let payload = {
        types,
        params
    };
    return {
        url: URL.ASSOCIATION_TYPE.LIST_ASSOCIATION_TYPE,
        api: restAPI.get,
        payload
    };
}

export function listJsonForAssociationTypeFilter({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_ASSOCIATION_TYPE_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_ASSOCIATION_TYPE_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_ASSOCIATION_TYPE_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.ASSOCIATION_TYPE.LIST_ASSOCIATION_TYPE,
        api: restAPI.get,
        payload
    };
}

export function sentAssociationType(data) {
    let payload = {
        types: [ActionTypes.SENT_ASSOCIATION_TYPE_REQUEST, ActionTypes.SENT_ASSOCIATION_TYPE_SUCCESS, ActionTypes.SENT_ASSOCIATION_TYPE_FAILURE],
        body: data
    };
    return {
        url: URL.ASSOCIATION_TYPE.LIST_ASSOCIATION_TYPE,
        api: restAPI.post,
        payload
    };
}


export function editAssociationType(id, data) {
    let payload = {
        types: [ActionTypes.EDIT_ASSOCIATION_TYPE_REQUEST, ActionTypes.EDIT_ASSOCIATION_TYPE_SUCCESS, ActionTypes.EDIT_ASSOCIATION_TYPE_FAILURE],
        body: data
    };
    return {
        url: URL.ASSOCIATION_TYPE.EDIT_ASSOCIATION_TYPE.replace(':associationTypeId', id),
        api: restAPI.put,
        payload
    };
}

export function getAssociationTypeById(id) {
    let payload = {
        types: [ActionTypes.GET_ASSOCIATION_TYPE_BY_ID_REQUEST, ActionTypes.GET_ASSOCIATION_TYPE_BY_ID_SUCCESS, ActionTypes.GET_ASSOCIATION_TYPE_BY_ID_FAILURE]
    };
    return {
        url: URL.ASSOCIATION_TYPE.GET_ASSOCIATION_TYPE_BY_ID.replace(':associationTypeId', id),
        api: restAPI.get,
        payload
    };
}

export function deleteAssociationType(data) {
    let payload = {
        types: [ActionTypes.DELETE_ASSOCIATION_TYPE_REQUEST, ActionTypes.DELETE_ASSOCIATION_TYPE_SUCCESS, ActionTypes.DELETE_ASSOCIATION_TYPE_FAILURE],
        body: data
    };
    return {
        url: URL.ASSOCIATION_TYPE.GET_ASSOCIATION_TYPE_BY_ID.replace(':associationTypeId', data),
        api: restAPI.del,
        payload
    };
}


