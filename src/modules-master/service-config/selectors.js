import { STATE_REDUCER_KEY } from './constants';
import flow from 'lodash/fp/flow';

const getServiceConfig = state => state[STATE_REDUCER_KEY];

const serviceCongigDetails = serviceCongig => serviceCongig.listServiceConfig;
export const getServiceConfigs = flow(getServiceConfig, serviceCongigDetails);
