import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';


const getPayment = state => state[STATE_REDUCER_KEY];

const payment = state => state.listPaymentDetails;
export const getPaymentList = flow(getPayment, payment);
