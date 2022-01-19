import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';


const getSubscription = state => state[STATE_REDUCER_KEY];

const subscription = state => state.listSubscriptionDetails;
export const getSubscriptions = flow(getSubscription, subscription);
