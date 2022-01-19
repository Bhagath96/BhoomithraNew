import { action } from '../../common';

export const types = {
    LIST_TRADING_TYPE: 'ServiceCategory/LIST_TRADING_TYPE',
    LIST_TRADING_TYPE_REQUEST: 'ServiceCategory/LIST_TRADING_TYPE_REQUEST',
    LIST_TRADING_TYPE_SUCCESS: 'ServiceCategory/LIST_TRADING_TYPE_SUCCESS',
    LIST_TRADING_TYPE_FAILURE: 'ServiceCategory/LIST_TRADING_TYPE_FAILURE',
    STORE_JSON_DATA_FOR_TRADING_TYPE: 'ServiceCategory/STORE_JSON_DATA_FOR_TRADING_TYPE',
    SET_FILTER_VALUES: 'ServiceCategory/SET_FILTER_VALUES',
    RESET_FILTER_VALUES: 'ServiceCategory/RESET_FILTER_VALUES',

    LIST_JSON_DATA_FOR_TRADING_TYPE_FILTER: 'ServiceCategory/LIST_JSON_DATA_FOR_TRADING_TYPE_FILTER',
    LIST_JSON_DATA_FOR_TRADING_TYPE_FILTER_REQUEST: 'ServiceCategory/LIST_JSON_DATA_FOR_TRADING_TYPE_FILTER_REQUEST',
    LIST_JSON_DATA_FOR_TRADING_TYPE_FILTER_SUCCESS: 'ServiceCategory/LIST_JSON_DATA_FOR_TRADING_TYPE_FILTER_SUCCESS',
    LIST_JSON_DATA_FOR_TRADING_TYPE_FILTER_FAILURE: 'ServiceCategory/LIST_JSON_DATA_FOR_TRADING_TYPE_FILTER_FAILURE',

    SENT_TRADING_TYPE: 'ServiceCategory/SENT_TRADING_TYPE',
    SENT_TRADING_TYPE_REQUEST: 'ServiceCategory/SENT_TRADING_TYPE_REQUEST',
    SENT_TRADING_TYPE_SUCCESS: 'ServiceCategory/SENT_TRADING_TYPE_SUCCESS',
    SENT_TRADING_TYPE_FAILURE: 'ServiceCategory/SENT_TRADING_TYPE_FAILURE',

    EDIT_TRADING_TYPE: 'ServiceCategory/EDIT_TRADING_TYPE',
    EDIT_TRADING_TYPE_REQUEST: 'ServiceCategory/EDIT_TRADING_TYPE_REQUEST',
    EDIT_TRADING_TYPE_SUCCESS: 'ServiceCategory/EDIT_TRADING_TYPE_SUCCESS',
    EDIT_TRADING_TYPE_FAILURE: 'ServiceCategory/EDIT_TRADING_TYPE_FAILURE',

    GET_TRADING_TYPE_BY_ID: 'ServiceCategory/GET_TRADING_TYPE_BY_ID',
    GET_TRADING_TYPE_BY_ID_REQUEST: 'ServiceCategory/GET_TRADING_TYPE_BY_ID_REQUEST',
    GET_TRADING_TYPE_BY_ID_SUCCESS: 'ServiceCategory/GET_TRADING_TYPE_BY_ID_SUCCESS',
    GET_TRADING_TYPE_BY_ID_FAILURE: 'ServiceCategory/GET_TRADING_TYPE_BY_ID_FAILRUE',
    DELETE_TRADING_TYPE: 'ServiceCategory/DELETE_TRADING_TYPE',
    DELETE_TRADING_TYPE_REQUEST: 'ServiceCategory/DELETE_TRADING_TYPE_REQUEST',
    DELETE_TRADING_TYPE_SUCCESS: 'ServiceCategory/DELETE_TRADING_TYPE_SUCCESS',
    DELETE_TRADING_TYPE_FAILURE: 'ServiceCategory/DELETE_TRADING_TYPE_FAILURE',
    RESET_SERVICE_FORM: 'ServiceCategory/RESET_SERVICE_FORM'

};

export const listTradingType = (data) => action(types.LIST_TRADING_TYPE, { data });

export const listJsonDataForTradingType = (searchValue, searchKey, columnName) => action(types.LIST_JSON_DATA_FOR_TRADING_TYPE_FILTER, { searchValue, searchKey, columnName });
export const storeJsonDataForTradingType = (data) => action(types.STORE_JSON_DATA_FOR_TRADING_TYPE, { data });

export const setFilter = (data) => action(types.SET_FILTER_VALUES, { data });

export const resetFilter = () => action(types.RESET_FILTER_VALUES);

export const sentTradingType = (data) => action(types.SENT_TRADING_TYPE, { data });
export const editTradingType = (id, data) => action(types.EDIT_TRADING_TYPE, { id, data });


export const getTradingTypeById = (id) => action(types.GET_TRADING_TYPE_BY_ID, { id });

export const deleteTradingType = (data, page, size, count) => action(types.DELETE_TRADING_TYPE, { data, page, size, count });

export const resetTradingTypeForm = () => action(types.RESET_SERVICE_FORM);

