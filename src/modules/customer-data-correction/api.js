import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchCustomerDetails({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_CUSTOMER_DETAILS_REQUEST, ActionTypes.FETCH_CUSTOMER_DETAILS_SUCCESS, ActionTypes.FETCH_CUSTOMER_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.CUSTOMER_DATA_CURRECTION.LIST_CUSTOMER_DATA_CURRECTION,
        api: restAPI.get,
        payload
    };
}
export function fetchCustomerEnrollmentDetailsByEnrollmentId(params) {
    let payload = {
        types: [ActionTypes.VIEW_CUSTOMER_ENROLLMENT_DETAILS_REQUEST, ActionTypes.VIEW_CUSTOMER_ENROLLMENT_DETAILS_SUCESS, ActionTypes.VIEW_CUSTOMER_ENROLLMENT_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.CUSTOMER.DETAILS_SURVEY,
        api: restAPI.get,
        payload
    };
}
export function fetchCustomerConflictDetailsByConflictId(params) {
    let payload = {
        types: [ActionTypes.VIEW_CUSTOMER_CONFLICT_DETAILS_REQUEST, ActionTypes.VIEW_CUSTOMER_CONFLICT_DETAILS_SUCESS, ActionTypes.VIEW_CUSTOMER_CONFLICT_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.CUSTOMER.DETAILS_SURVEY,
        api: restAPI.get,
        payload
    };
}


