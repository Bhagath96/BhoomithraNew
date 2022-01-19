import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function listShopType({ params, types }) {
    let payload = {
        types,
        params
    };
    return {
        url: URL.SHOP_TYPE.LIST_SHOP_TYPE,
        api: restAPI.get,
        payload
    };
}

export function sentShopType(data) {
    let payload = {
        types: [ActionTypes.SENT_SHOP_TYPE_REQUEST, ActionTypes.SENT_SHOP_TYPE_SUCCESS, ActionTypes.SENT_SHOP_TYPE_FAILURE],
        body: data
    };
    return {
        url: URL.SHOP_TYPE.LIST_SHOP_TYPE,
        api: restAPI.post,
        payload
    };
}


export function editShopType(id, data) {
    let payload = {
        types: [ActionTypes.EDIT_SHOP_TYPE_REQUEST, ActionTypes.EDIT_SHOP_TYPE_SUCCESS, ActionTypes.EDIT_SHOP_TYPE_FAILURE],
        body: data
    };
    return {
        url: URL.SHOP_TYPE.EDIT_SHOP_TYPE.replace(':ShopTypeId', id),
        api: restAPI.put,
        payload
    };
}

export function getShopTypeById(id) {
    let payload = {
        types: [ActionTypes.GET_SHOP_TYPE_BY_ID_REQUEST, ActionTypes.GET_SHOP_TYPE_BY_ID_SUCCESS, ActionTypes.GET_SHOP_TYPE_BY_ID_FAILURE]
    };
    return {
        url: URL.SHOP_TYPE.GET_SHOP_TYPE_BY_ID.replace(':ShopTypeId', id),
        api: restAPI.get,
        payload
    };
}

export function deleteShopType(data) {
    let payload = {
        types: [ActionTypes.DELETE_SHOP_TYPE_REQUEST, ActionTypes.DELETE_SHOP_TYPE_SUCCESS, ActionTypes.DELETE_SHOP_TYPE_FAILURE],
        body: data
    };
    return {
        url: URL.SHOP_TYPE.GET_SHOP_TYPE_BY_ID.replace(':ShopTypeId', data),
        api: restAPI.del,
        payload
    };
}


