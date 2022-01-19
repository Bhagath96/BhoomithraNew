import { action } from '../../common';
export const types = {
    FETCH_SUBSCRIPTION_DETAILS: 'FETCH_SUBSCRIPTION_DETAILS',
    FETCH_SUBSCRIPTION_DETAILS_REQUEST: 'FETCH_SUBSCRIPTION_DETAILS_REQUEST',
    FETCH_SUBSCRIPTION_DETAILS_SUCCESS: 'FETCH_SUBSCRIPTION_DETAILS_SUCCESS',
    FETCH_SUBSCRIPTION_DETAILS_FAILURE: 'FETCH_SUBSCRIPTION_DETAILS_FAILURE',

    CLEAR_SUBSCRIPTION_DETAILS_REDUCER: 'CLEAR_SUBSCRIPTION_DETAILS_REDUCER'

};
export const fetchSubscriptionDetails = (data) => action(types.FETCH_SUBSCRIPTION_DETAILS, { data });
export const clearSubscriptionReducer = () => action(types.CLEAR_SUBSCRIPTION_DETAILS_REDUCER);
