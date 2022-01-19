import { action } from '../../common';
export const types = {
    FETCH_INCIDENTS: 'FETCH_INCIDENTS',
    FETCH_INCIDENTS_REQUEST: 'FETCH_INCIDENTS_REQUEST',
    FETCH_INCIDENTS_SUCCESS: 'FETCH_INCIDENTS_SUCCESS',
    FETCH_INCIDENTS_FAILURE: 'FETCH_INCIDENTS_FAILURE'

};
export const fetchIncidents = (data) => action(types.FETCH_INCIDENTS, { data });
