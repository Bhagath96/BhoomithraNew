import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';


const getIncidents = state => state[STATE_REDUCER_KEY];

const incidents = state => state.listIncidents;
export const getIncidentsList = flow(getIncidents, incidents);
