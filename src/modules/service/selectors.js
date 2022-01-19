import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';


const getService = state => state[STATE_REDUCER_KEY];

const services = state => state.listServiceDetails;
export const getServices = flow(getService, services);
