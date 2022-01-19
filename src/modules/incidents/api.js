import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchIncidents({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_INCIDENTS_REQUEST, ActionTypes.FETCH_INCIDENTS_SUCCESS, ActionTypes.FETCH_INCIDENTS_FAILURE],
        params
    };
    return {
        url: URL.LIST_INCIDENTS,
        api: restAPI.get,
        payload
    };
}


