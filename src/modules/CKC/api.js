import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchPickupDetails({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_CKC_PICKUP_DETAILS_REQUEST, ActionTypes.FETCH_CKC_PICKUP_DETAILS_SUCCESS, ActionTypes.FETCH_CKC_PICKUP_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.CKC.LIST_PICKUP,
        api: restAPI.get,
        payload
    };
}
export function fetchCKCSalesDetails({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_CKC_SALES_DETAILS_REQUEST, ActionTypes.FETCH_CKC_SALES_DETAILS_SUCCESS, ActionTypes.FETCH_CKC_SALES_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.CKC.LIST_SALES,
        api: restAPI.get,
        payload
    };
}

export function fetchCKCItems({ params, id }) {
    let payload = {
        types: [ActionTypes.FETCH_CKC_ITEMS_REQUEST, ActionTypes.FETCH_CKC_ITEMS_SUCCESS, ActionTypes.FETCH_CKC_ITEMS_FAILURE],
        params
    };
    return {
        url: URL.FACILITY.LIST_ITEMS.replace(':id', id),
        api: restAPI.get,
        payload
    };
}
