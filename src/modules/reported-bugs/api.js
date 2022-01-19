import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchReportedBugsDetails({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_REPORTED_BUGS_DETAILS_REQUEST, ActionTypes.FETCH_REPORTED_BUGS_DETAILS_SUCCESS, ActionTypes.FETCH_REPORTED_BUGS_DETAILS_FAILURE],
        params
    };
    return {
        url: URL.LIST_REPORTED_BUGS.LIST_REPORTED_BUGS,
        api: restAPI.get,
        payload
    };
}


