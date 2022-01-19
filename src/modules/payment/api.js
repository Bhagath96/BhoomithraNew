import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchPaymentDetails({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_PAYMENT_DETAILS_REQUEST, ActionTypes.FETCH_PAYMENT_DETAILS_SUCCESS, ActionTypes.FETCH_PAYMENT_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.LIST_PAYMENT.LIST_PAYMENT,
        api: restAPI.get,
        payload
    };
}


