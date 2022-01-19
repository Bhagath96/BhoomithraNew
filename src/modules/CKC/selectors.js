import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';

const getCKC = state => state[STATE_REDUCER_KEY];

const pickup = state => state?.listCKCPickup;
export const getPickupList = flow(getCKC, pickup);


const sales = state => state?.listCKCSales;
export const getSales = flow(getCKC, sales);
