import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchStockInDetails({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_RRF_STOCK_IN_DETAILS_REQUEST, ActionTypes.FETCH_RRF_STOCK_IN_DETAILS_SUCCESS, ActionTypes.FETCH_RRF_STOCK_IN_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.RRF.LIST_STOCK_IN,
        api: restAPI.get,
        payload
    };
}
export function fetchRRFSalesDetails({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_RRF_SALES_DETAILS_REQUEST, ActionTypes.FETCH_RRF_SALES_DETAILS_SUCCESS, ActionTypes.FETCH_RRF_SALES_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.RRF.LIST_RRF_SHREDDED,
        api: restAPI.get,
        payload
    };
}

export function fetchRRFShredded({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_RRF_SHREDDED_REQUEST, ActionTypes.FETCH_RRF_SHREDDED_SUCCESS, ActionTypes.FETCH_RRF_SHREDDED_FAILURE],
        params
    };
    return {
        url: URL.RRF.LIST_RRF_SHREDDED,
        api: restAPI.get,
        payload
    };
}


export function fetchRRFItems({ params, id }) {
    let payload = {
        types: [ActionTypes.FETCH_RRF_ITEMS_REQUEST, ActionTypes.FETCH_RRF_ITEMS_SUCCESS, ActionTypes.FETCH_RRF_ITEMS_FAILURE],
        params
    };
    return {
        url: URL.FACILITY.LIST_ITEMS.replace(':id', id),
        api: restAPI.get,
        payload
    };
}


