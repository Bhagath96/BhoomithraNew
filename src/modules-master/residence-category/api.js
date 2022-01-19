import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function listResidenceCategory({ params, types }) {
    let payload = {
        types,
        params
    };
    return {
        url: URL.RESIDENCE_CATEGORY.LIST_RESIDENCE_CATEGORY,
        api: restAPI.get,
        payload
    };
}

export function listJsonForResidenceCategoryFilter({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_RESIDENCE_CATEGORY_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_RESIDENCE_CATEGORY_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_RESIDENCE_CATEGORY_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.RESIDENCE_CATEGORY.LIST_RESIDENCE_CATEGORY,
        api: restAPI.get,
        payload
    };
}

export function sentResidenceCategory(data) {
    let payload = {
        types: [ActionTypes.SENT_RESIDENCE_CATEGORY_REQUEST, ActionTypes.SENT_RESIDENCE_CATEGORY_SUCCESS, ActionTypes.SENT_RESIDENCE_CATEGORY_FAILURE],
        body: data
    };
    return {
        url: URL.RESIDENCE_CATEGORY.LIST_RESIDENCE_CATEGORY,
        api: restAPI.post,
        payload
    };
}


export function editResidenceCategory(id, data) {
    let payload = {
        types: [ActionTypes.EDIT_RESIDENCE_CATEGORY_REQUEST, ActionTypes.EDIT_RESIDENCE_CATEGORY_SUCCESS, ActionTypes.EDIT_RESIDENCE_CATEGORY_FAILURE],
        body: data
    };
    return {
        url: URL.RESIDENCE_CATEGORY.EDIT_RESIDENCE_CATEGORY.replace(':ResidenceCategoryId', id),
        api: restAPI.put,
        payload
    };
}

export function getResidenceCatById(id) {
    let payload = {
        types: [ActionTypes.GET_RESIDENCE_CATEGORY_BY_ID_REQUEST, ActionTypes.GET_RESIDENCE_CATEGORY_BY_ID_SUCCESS, ActionTypes.GET_RESIDENCE_CATEGORY_BY_ID_FAILURE]
    };
    return {
        url: URL.RESIDENCE_CATEGORY.GET_RESIDENCE_CAT_BY_ID.replace(':ResidenceCategoryId', id),
        api: restAPI.get,
        payload
    };
}

export function deleteResidenceCategory(data) {
    let payload = {
        types: [ActionTypes.DELETE_RESIDENCE_CATEGORY_REQUEST, ActionTypes.DELETE_RESIDENCE_CATEGORY_SUCCESS, ActionTypes.DELETE_RESIDENCE_CATEGORY_FAILURE],
        body: data
    };
    return {
        url: URL.RESIDENCE_CATEGORY.GET_RESIDENCE_CAT_BY_ID.replace(':ResidenceCategoryId', data),
        api: restAPI.del,
        payload
    };
}


