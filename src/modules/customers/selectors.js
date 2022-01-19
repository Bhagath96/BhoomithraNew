import { STATE_REDUCER_KEY } from './constants';
import flow from 'lodash/fp/flow';
// export const getSurveyDetails = state => state[STATE_REDUCER_KEY];

const getCustomer = state => state[STATE_REDUCER_KEY];

const subscriptions = customer => customer.subscriptions;
export const getSubscriptions = flow(getCustomer, subscriptions);

const filterValues = customer => customer.initialFilterResponse;
export const getInitialFilter = flow(getCustomer, filterValues);

