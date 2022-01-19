import { action } from '../../common';
export const types = {
    FETCH_MCF: 'BasicConfig/FETCH_MCF',
    FETCH_MCF_REQUEST: 'BasicConfig/FETCH_MCF_REQUEST',
    FETCH_MCF_SUCCESS: 'BasicConfig/FETCH_MCF_SUCCESS',
    FETCH_MCF_FAILURE: 'BasicConfig/FETCH_MCF_FAILURE',

    FETCH_MCF_BY_ID: 'BasicConfig/FETCH_MCF_BY_ID',
    FETCH_MCF_BY_ID_REQUEST: 'BasicConfig/FETCH_MCF_BY_ID_REQUEST',
    FETCH_MCF_BY_ID_SUCCESS: 'BasicConfig/FETCH_MCF_BY_ID_SUCCESS',
    FETCH_MCF_BY_ID_FAILURE: 'BasicConfig/FETCH_MCF_BY_ID_FAILURE',

    LIST_STATE: 'BasicConfig/LIST_STATE',
    LIST_STATE_REQUEST: 'BasicConfig/LIST_STATE_REQUEST',
    LIST_STATE_SUCCESS: 'BasicConfig/LIST_STATE_SUCCESS',
    LIST_STATE_FAILURE: 'BasicConfig/LIST_STATE_FAILURE',

    LIST_DISTRICT: 'BasicConfig/LIST_DISTRICT',
    LIST_DISTRICT_REQUEST: 'BasicConfig/LIST_DISTRICT_REQUEST',
    LIST_DISTRICT_SUCCESS: 'BasicConfig/LIST_DISTRICT_SUCCESS',
    LIST_DISTRICT_FAILURE: 'BasicConfig/LIST_DISTRICT_FAILURE',

    LIST_LSGI: 'BasicConfig/LIST_LSGI',
    LIST_LSGI_REQUEST: 'BasicConfig/LIST_LSGI_REQUEST',
    LIST_LSGI_SUCCESS: 'BasicConfig/LIST_LSGI_SUCCESS',
    LIST_LSGI_FAILURE: 'BasicConfig/LIST_LSGI_FAILURE',

    LIST_WARD_BY_ID: 'BasicConfig/LIST_WARD_BY_ID',
    LIST_WARD_BY_ID_REQUEST: 'BasicConfig/LIST_WARD_BY_ID_REQUEST',
    LIST_WARD_BY_ID_SUCCESS: 'BasicConfig/LIST_WARD_BY_ID_SUCCESS',
    LIST_WARD_BY_ID_FAILURE: 'BasicConfig/LIST_WARD_BY_ID_FAILURE',


    FETCH_STATE_DETAILS_BY_ID: 'BasicConfig/FETCH_STATE_DETAILS_BY_ID',
    FETCH_STATE_DETAILS_BY_ID_REQUEST: 'BasicConfig/FETCH_STATE_DETAILS_BY_ID_REQUEST',
    FETCH_STATE_DETAILS_BY_ID_SUCCESS: 'BasicConfig/FETCH_STATE_DETAILS_BY_ID_SUCCESS',
    FETCH_STATE_DETAILS_BY_ID_FAILURE: 'BasicConfig/FETCH_STATE_DETAILS_BY_ID_FAILURE',

    SAVE_MCF_DETAILS: 'BasicConfig/SAVE_MCF_DETAILS',
    SAVE_MCF_DETAILS_REQUEST: 'BasicConfig/SAVE_MCF_DETAILS_REQUEST',
    SAVE_MCF_DETAILS_SUCCESS: 'BasicConfig/SAVE_MCF_DETAILS_SUCCESS',
    SAVE_MCF_DETAILS_FAILURE: 'BasicConfig/SAVE_MCF_DETAILS_FAILURE',

    UPDATE_MCF_DETAILS: 'BasicConfig/UPDATE_MCF_DETAILS',
    UPDATE_MCF_DETAILS_REQUEST: 'BasicConfig/UPDATE_MCF_DETAILS_REQUEST',
    UPDATE_MCF_DETAILS_SUCCESS: 'BasicConfig/UPDATE_MCF_DETAILS_SUCCESS',
    UPDATE_MCF_DETAILS_FAILURE: 'BasicConfig/UPDATE_MCF_DETAILS_FAILURE',

    DELETE_MCF_DETAILS: 'BasicConfig/DELETE_MCF_DETAILS',
    DELETE_MCF_DETAILS_REQUEST: 'BasicConfig/DELETE_MCF_DETAILS_REQUEST',
    DELETE_MCF_DETAILS_SUCCESS: 'BasicConfig/DELETE_MCF_DETAILS_SUCCESS',
    DELETE_MCF_DETAILS_FAILURE: 'BasicConfig/DELETE_MCF_DETAILS_FAILURE',

    CLEAR_MCF_DETAILS_REDUCER: 'BasicConfig/CLEAR_MCF_DETAILS_REDUCER'

};
export const fetchMCF = (data) => action(types.FETCH_MCF, { data });
export const fetchMCFbyId = (data) => action(types.FETCH_MCF_BY_ID, { data });
export const fetchLSGI = (data) => action(types.LIST_LSGI, { data });
export const fetchWardByLSGI = (data) => action(types.LIST_WARD_BY_ID, { data });
export const fetchState = () => action(types.LIST_STATE);
export const fetchDistrictByState = (data) => action(types.LIST_DISTRICT, { data });
export const saveMCFData = (data) => action(types.SAVE_MCF_DETAILS, { data });
export const updatesMCFData = (id, data) => action(types.UPDATE_MCF_DETAILS, { id, data });
export const deleteMCFData = (data, size, page) => action(types.DELETE_MCF_DETAILS, { data, size, page });

export const clearMFCReducer = () => action(types.CLEAR_MCF_DETAILS_REDUCER);
