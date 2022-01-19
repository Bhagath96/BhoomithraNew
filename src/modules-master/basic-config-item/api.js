import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchItemDetails({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_ITEM_DETAILS_REQUEST, ActionTypes.FETCH_ITEM_DETAILS_SUCCESS, ActionTypes.FETCH_ITEM_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.BASIC_CONFIG.LIST_ITEM,
        api: restAPI.get,
        payload
    };
}
export function saveItem(data) {
    let payload = {
        types: [ActionTypes.SAVE_ITEM_DETAILS_REQUEST, ActionTypes.SAVE_ITEM_DETAILS_SUCCESS, ActionTypes.SAVE_ITEM_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.SAVE_ITEM,
        api: restAPI.post,
        payload
    };
}
export function deleteItem(data) {
    let payload = {
        types: [ActionTypes.DELETE_ITEM_DETAILS_REQUEST, ActionTypes.DELETE_ITEM_DETAILS_SUCCESS, ActionTypes.DELETE_ITEM_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.DELETE_ITEM.replace(':itemId', data),
        api: restAPI.del,
        payload
    };
}
export function updateItem(data, id) {
    let payload = {
        types: [ActionTypes.UPDATE_ITEM_DETAILS_REQUEST, ActionTypes.UPDATE_ITEM_DETAILS_SUCCESS, ActionTypes.UPDATE_ITEM_DETAILS_FAILURE],
        body: data
    };
    return {
        url: URL.BASIC_CONFIG.UPDATE_ITEM.replace(':itemId', id),
        api: restAPI.put,
        payload
    };
}
export function fetchItemById({ langId, stateID }) {
    let payload = {
        types: [ActionTypes.FETCH_ITEM_DETAILS_BY_ID_REQUEST, ActionTypes.FETCH_ITEM_DETAILS_BY_ID_SUCCESS, ActionTypes.FETCH_ITEM_DETAILS_BY_ID_FAILURE],
        params: { langId }
    };
    return {
        url: URL.BASIC_CONFIG.UPDATE_ITEM.replace(':itemId', stateID),
        api: restAPI.get,
        payload
    };
}
//fetch sub category item details
export function fetchSubCategoryItems({ langId }) {
    let payload = {
        types: [ActionTypes.FETCH_SUB_CATEGORY_ITEM_DETAILS_REQUEST, ActionTypes.FETCH_SUB_CATEGORY_ITEM_DETAILS_SUCCESS, ActionTypes.FETCH_SUB_CATEGORY_ITEM_DETAILS_FAILURE],
        params: { langId }
    };
    return {
        url: URL.BASIC_CONFIG.LIST_ITEM_SUBCATEGORIES,
        api: restAPI.get,
        payload
    };
}
//save sub category item details
export function saveSubCategoryItems({ id, itemSubCatId }) {
    let payload = {
        types: [ActionTypes.SAVE_SUB_CATEGORY_ITEM_DETAILS_REQUEST, ActionTypes.SAVE_SUB_CATEGORY_ITEM_DETAILS_SUCCESS, ActionTypes.SAVE_SUB_CATEGORY_ITEM_DETAILS_FAILURE],
        body: { itemSubCatId: itemSubCatId }
    };
    return {
        url: URL.BASIC_CONFIG.SAVE_ITEM_SUB_CATEGORY.replace(':id', id),
        api: restAPI.post,
        payload
    };
}
//fetch sub category item by id details
export function fetchSubCategoryItemsById({ id }) {
    let payload = {
        types: [ActionTypes.FETCH_SUB_CATEGORY_ITEM_BY_ID_DETAILS_REQUEST, ActionTypes.FETCH_SUB_CATEGORY_ITEM_BY_ID_DETAILS_SUCCESS, ActionTypes.FETCH_SUB_CATEGORY_ITEM_BY_ID_DETAILS_FAILURE]
    };
    return {
        url: URL.BASIC_CONFIG.FETCH_ITEM_SUB_CATEGORY_BY_ID.replace(':id', id),
        api: restAPI.get,
        payload
    };
}
//delete sub category item by id details
export function deleteItemSubCategoryById({ id, itemSubCategoryId }) {
    let payload = {
        types: [ActionTypes.DELETE_SUB_CATEGORY_ITEM_BY_ID_DETAILS_REQUEST, ActionTypes.DELETE_SUB_CATEGORY_ITEM_BY_ID_DETAILS_SUCCESS, ActionTypes.DELETE_SUB_CATEGORY_ITEM_BY_ID_DETAILS_FAILURE]
    };
    return {
        url: URL.BASIC_CONFIG.DELETE_ITEM_SUB_CATEGORY_BY_ID.replace(':id', id).replace(':itemSubCategoryId', itemSubCategoryId),
        api: restAPI.del,
        payload
    };
}


