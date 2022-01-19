import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchItemCategoryDetails({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_ITEM_SUBCATEGORY_REQUEST, ActionTypes.FETCH_ITEM_SUBCATEGORY_SUCCESS, ActionTypes.FETCH_ITEM_SUBCATEGORY_FAILURE],
        params
    };
    return {
        url: URL.BASIC_CONFIG.LIST_ITEM_SUBCATEGORIES,
        api: restAPI.get,
        payload
    };
}
export function saveItemCategory(data) {
    let payload = {
        types: [ActionTypes.SAVE_ITEM_SUBCATEGORY_REQUEST, ActionTypes.SAVE_ITEM_SUBCATEGORY_SUCCESS, ActionTypes.SAVE_ITEM_SUBCATEGORY_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.SAVE_ITEM_SUBCATEGORIES,
        api: restAPI.post,
        payload
    };
}
export function deleteItemCategory(data) {
    let payload = {
        types: [ActionTypes.DELETE_ITEM_SUBCATEGORY_REQUEST, ActionTypes.DELETE_ITEM_SUBCATEGORY_SUCCESS, ActionTypes.DELETE_ITEM_SUBCATEGORY_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.DELETE_ITEM_SUBCATEGORIES.replace(':itemId', data),
        api: restAPI.del,
        payload
    };
}
export function updateItemCategory(data, id) {
    let payload = {
        types: [ActionTypes.UPDATE_ITEM_SUBCATEGORY_REQUEST, ActionTypes.UPDATE_ITEM_SUBCATEGORY_SUCCESS, ActionTypes.UPDATE_ITEM_SUBCATEGORY_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.UPDATE_ITEM_SUBCATEGORIES.replace(':itemId', id),
        api: restAPI.put,
        payload
    };
}
export function fetchItemCategoryById({ langId, stateID }) {
    let payload = {
        types: [ActionTypes.FETCH_ITEM_SUBCATEGORY_BY_ID_REQUEST, ActionTypes.FETCH_ITEM_SUBCATEGORY_BY_ID_SUCCESS, ActionTypes.FETCH_ITEM_SUBCATEGORY_BY_ID_FAILURE],
        params: { langId }
    };
    return {
        url: URL.BASIC_CONFIG.UPDATE_ITEM_SUBCATEGORIES.replace(':itemId', stateID),
        api: restAPI.get,
        payload
    };
}


