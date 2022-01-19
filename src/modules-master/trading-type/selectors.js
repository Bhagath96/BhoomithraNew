import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constants';


const getTradingType = state => state[STATE_REDUCER_KEY];

const tradingType = residence => residence.listTradingType;
export const getTradingTypes = flow(getTradingType, tradingType);
