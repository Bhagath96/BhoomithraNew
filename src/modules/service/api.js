import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchServiceDetails({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_SERVICE_DETAILS_REQUEST, ActionTypes.FETCH_SERVICE_DETAILS_SUCCESS, ActionTypes.FETCH_SERVICE_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.LIST_SERVICE.LIST_SERVICE,
        api: restAPI.get,
        payload
    };
}
