import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';


const getCustomer = state => state[STATE_REDUCER_KEY];

const customer = state => state.listCustomerDetails;
export const getCustomers = flow(getCustomer, customer);
