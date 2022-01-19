import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function listTradingType({ params, types }) {
    let payload = {
        types,
        params
    };
    return {
        url: URL.TRADING_TYPE.LIST_TRADING_TYPE,
        api: restAPI.get,
        payload
    };
}

export function listJsonForTradingTypeFilter({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_TRADING_TYPE_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_TRADING_TYPE_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_TRADING_TYPE_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.TRADING_TYPE.LIST_TRADING_TYPE,
        api: restAPI.get,
        payload
    };
}

export function sentTradingType(data) {
    let payload = {
        types: [ActionTypes.SENT_TRADING_TYPE_REQUEST, ActionTypes.SENT_TRADING_TYPE_SUCCESS, ActionTypes.SENT_TRADING_TYPE_FAILURE],
        body: data
    };
    return {
        url: URL.TRADING_TYPE.LIST_TRADING_TYPE,
        api: restAPI.post,
        payload
    };
}


export function editTradingType(id, data) {
    let payload = {
        types: [ActionTypes.EDIT_TRADING_TYPE_REQUEST, ActionTypes.EDIT_TRADING_TYPE_SUCCESS, ActionTypes.EDIT_TRADING_TYPE_FAILURE],
        body: data
    };
    return {
        url: URL.TRADING_TYPE.EDIT_TRADING_TYPE.replace(':TradingTypeId', id),
        api: restAPI.put,
        payload
    };
}

export function getTradingTypeById(id) {
    let payload = {
        types: [ActionTypes.GET_TRADING_TYPE_BY_ID_REQUEST, ActionTypes.GET_TRADING_TYPE_BY_ID_SUCCESS, ActionTypes.GET_TRADING_TYPE_BY_ID_FAILURE]
    };
    return {
        url: URL.TRADING_TYPE.GET_TRADING_TYPE_BY_ID.replace(':TradingTypeId', id),
        api: restAPI.get,
        payload
    };
}

export function deleteTradingType(data) {
    let payload = {
        types: [ActionTypes.DELETE_TRADING_TYPE_REQUEST, ActionTypes.DELETE_TRADING_TYPE_SUCCESS, ActionTypes.DELETE_TRADING_TYPE_FAILURE],
        body: data
    };
    return {
        url: URL.TRADING_TYPE.GET_TRADING_TYPE_BY_ID.replace(':TradingTypeId', data),
        api: restAPI.del,
        payload
    };
}


