import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';


const getMcf = state => state[STATE_REDUCER_KEY];

const stockIn = state => state.listStockInDetails;
export const getStockes = flow(getMcf, stockIn);

const stockTransfer = state => state.listStockTransferDetails;
export const getStockTransfer = flow(getMcf, stockTransfer);


const stockSale = state => state.listStockSaleDetails;
export const getStockSale = flow(getMcf, stockSale);
