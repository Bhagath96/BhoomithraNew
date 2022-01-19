import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';

const getRRF = state => state[STATE_REDUCER_KEY];

const stockIn = state => state?.listRRFStockIn;
export const getStockInList = flow(getRRF, stockIn);

const sales = state => state?.listRRFSales;
export const getSales = flow(getRRF, sales);

const shredding = state => state?.listRRFShreddedDetails;
export const getShredding = flow(getRRF, shredding);
