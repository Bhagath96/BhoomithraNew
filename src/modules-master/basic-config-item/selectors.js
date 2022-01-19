import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';


const getItem = state => state[STATE_REDUCER_KEY];

const item = state => state.listItemDetails;
export const getItems = flow(getItem, item);

