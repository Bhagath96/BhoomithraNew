import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constants';


const getServiceChargeSlab = state => state[STATE_REDUCER_KEY];

const serviceChargeSlab = serviceCharge => serviceCharge.listServiceChargeSlab;
export const getServiceChargeSlabs = flow(getServiceChargeSlab, serviceChargeSlab);

