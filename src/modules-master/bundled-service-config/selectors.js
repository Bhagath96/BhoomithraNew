import { STATE_REDUCER_KEY } from './constants';
import flow from 'lodash/fp/flow';

export const getBundleServiceConfog = state => state[STATE_REDUCER_KEY];


const bundledServiceConfigDetails = bundledServiceConfig => bundledServiceConfig.listBundledServiceConfig;
export const getBundleServiceConfigs = flow(getBundleServiceConfog, bundledServiceConfigDetails);
