import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constants';


const getIncident = state => state[STATE_REDUCER_KEY];

const incident = state => state.listIncident;
export const getIncidents = flow(getIncident, incident);
