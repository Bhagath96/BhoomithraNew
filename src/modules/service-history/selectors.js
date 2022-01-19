import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';


const getServiceHistory = state => state[STATE_REDUCER_KEY];

const serviceHistories = state => state.listServiceHistoryDetails;
export const getServiceHistories = flow(getServiceHistory, serviceHistories);
