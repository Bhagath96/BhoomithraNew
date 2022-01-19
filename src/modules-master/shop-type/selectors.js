import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constants';


const getShopType = state => state[STATE_REDUCER_KEY];

const shopType = shop => shop.listShopType;
export const getShopTypes = flow(getShopType, shopType);
