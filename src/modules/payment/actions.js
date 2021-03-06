import { action } from '../../common';
export const types = {
    FETCH_PAYMENT_DETAILS: 'FETCH_PAYMENT_DETAILS',
    FETCH_PAYMENT_DETAILS_REQUEST: 'FETCH_PAYMENT_DETAILS_REQUEST',
    FETCH_PAYMENT_DETAILS_SUCCESS: 'FETCH_PAYMENT_DETAILS_SUCCESS',
    FETCH_PAYMENT_DETAILS_FAILURE: 'FETCH_PAYMENT_DETAILS_FAILURE',

    CLEAR_PAYMENT_DETAILS_REDUCER: 'CLEAR_PAYMENT_DETAILS_REDUCER',
    SET_FILTER_VALUES: 'SET_FILTER_VALUES',
    RESET_FILTER_VALUES: 'RESET_FILTER_VALUES',

    LIST_JSON_DATA_FOR_PAYMENT_FILTER: 'LIST_JSON_DATA_FOR_PAYMENT_FILTER',
    LIST_JSON_DATA_FOR_PAYMENT_FILTER_REQUEST: 'LIST_JSON_DATA_FOR_PAYMENT_FILTER_REQUEST',
    LIST_JSON_DATA_FOR_PAYMENT_FILTER_SUCCESS: 'LIST_JSON_DATA_FOR_PAYMENT_FILTER_SUCCESS',
    LIST_JSON_DATA_FOR_PAYMENT_FILTER_FAILURE: 'LIST_JSON_DATA_FOR_PAYMENT_FILTER_FAILURE',
    STORE_JSON_DATA_FOR_PAYMENT: 'STORE_JSON_DATA_FOR_PAYMENT'

};
export const fetchPaymentDetails = (data) => action(types.FETCH_PAYMENT_DETAILS, { data });
export const clearPaymentReducer = () => action(types.CLEAR_PAYMENT_DETAILS_REDUCER);

export const setFilter = (data) => action(types.SET_FILTER_VALUES, { data });
export const resetFilter = () => action(types.RESET_FILTER_VALUES);
export const listJsonDataForPayment = (searchValue, searchKey, columnName) => action(types.LIST_JSON_DATA_FOR_PAYMENT_FILTER, { searchValue, searchKey, columnName });
export const storeJsonDataForPayment = (data) => action(types.STORE_JSON_DATA_FOR_PAYMENT, { data });
