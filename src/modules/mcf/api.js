import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchMcfStocksIn({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_STOCK_IN_DETAILS_REQUEST, ActionTypes.FETCH_STOCK_IN_DETAILS_SUCCESS, ActionTypes.FETCH_STOCK_IN_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.MCF.GET_ALL_MCF_STOCKS_IN,
        api: restAPI.get,
        payload
    };
}

export function fetchMcfSeggregation({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_MCF_SEGGRATION_REQUEST, ActionTypes.FETCH_MCF_SEGGRATION_SUCCESS, ActionTypes.FETCH_MCF_SEGGRATION_FAILURE],
        params
    };
    return {
        url: URL.MCF.GET_ALL_MCF_SEGGREGATION,
        api: restAPI.get,
        payload
    };
}

export function fetchMcfStocksTransfer({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_STOCK_TRANSFER_REQUEST, ActionTypes.FETCH_STOCK_TRANSFER_SUCCESS, ActionTypes.FETCH_STOCK_TRANSFER_FAILURE],
        params
    };
    return {
        url: URL.MCF.GET_ALL_MCF_STOCKS_TRANSFER,
        api: restAPI.get,
        payload
    };
}

export function fetchStateDetails({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_STOCK_SALE_REQUEST, ActionTypes.FETCH_STOCK_SALE_SUCCESS, ActionTypes.FETCH_STOCK_SALE_FAILURE],
        params
    };
    return {
        url: URL.MCF.GET_ALL_MCF_STOCKS_SALE,
        api: restAPI.get,
        payload
    };
}

export function fetchStockItems({ params, id }) {
    let payload = {
        types: [ActionTypes.FETCH_STOCK_ITEMS_REQUEST, ActionTypes.FETCH_STOCK_ITEMS_SUCCESS, ActionTypes.FETCH_STOCK_ITEMS_FAILURE],
        params
    };
    return {
        url: URL.FACILITY.LIST_ITEMS.replace(':id', id),
        api: restAPI.get,
        payload
    };
}
