import { action } from '../../common';

export const types = {
    LIST_BUNDLED_SERVICE_CONFIG: 'ServiceCategory/LIST_BUNDLED_SERVICE_CONFIG',
    LIST_BUNDLED_SERVICE_CONFIG_REQUEST: 'ServiceCategory/LIST_BUNDLED_SERVICE_CONFIG_REQUEST',
    LIST_BUNDLED_SERVICE_CONFIG_SUCCESS: 'ServiceCategory/LIST_BUNDLED_SERVICE_CONFIG_SUCCESS',
    LIST_BUNDLED_SERVICE_CONFIG_FAILURE: 'ServiceCategory/LIST_BUNDLED_SERVICE_CONFIG_FAILURE',

    SENT_BUNDLED_SERVICE_CONFIG: 'ServiceCategory/SENT_BUNDLED_SERVICE_CONFIG',
    SENT_BUNDLED_SERVICE_CONFIG_REQUEST: 'ServiceCategory/SENT_BUNDLED_SERVICE_CONFIG_REQUEST',
    SENT_BUNDLED_SERVICE_CONFIG_SUCCESS: 'ServiceCategory/SENT_BUNDLED_SERVICE_CONFIG_SUCCESS',
    SENT_BUNDLED_SERVICE_CONFIG_FAILURE: 'ServiceCategory/SENT_BUNDLED_SERVICE_CONFIG_FAILURE',

    EDIT_BUNDLED_SERVICE_CONFIG: 'ServiceCategory/EDIT_BUNDLED_SERVICE_CONFIG',
    EDIT_BUNDLED_SERVICE_CONFIG_REQUEST: 'ServiceCategory/EDIT_BUNDLED_SERVICE_CONFIG_REQUEST',
    EDIT_BUNDLED_SERVICE_CONFIG_SUCCESS: 'ServiceCategory/EDIT_BUNDLED_SERVICE_CONFIG_SUCCESS',
    EDIT_BUNDLED_SERVICE_CONFIG_FAILURE: 'ServiceCategory/EDIT_BUNDLED_SERVICE_CONFIG_FAILURE',

    GET_BUNDLED_SERVICE_CONFIG_BY_ID: 'ServiceCategory/GET_BUNDLED_SERVICE_CONFIG_BY_ID',
    GET_BUNDLED_SERVICE_CONFIG_BY_ID_REQUEST: 'ServiceCategory/GET_BUNDLED_SERVICE_CONFIG_BY_ID_REQUEST',
    GET_BUNDLED_SERVICE_CONFIG_BY_ID_SUCCESS: 'ServiceCategory/GET_BUNDLED_SERVICE_CONFIG_BY_ID_SUCCESS',
    GET_BUNDLED_SERVICE_CONFIG_BY_ID_FAILURE: 'ServiceCategory/GET_BUNDLED_SERVICE_CONFIG_BY_ID_FAILRUE',
    DELETE_BUNDLED_SERVICE_CONFIG: 'ServiceCategory/DELETE_BUNDLED_SERVICE_CONFIG',
    DELETE_BUNDLED_SERVICE_CONFIG_REQUEST: 'ServiceCategory/DELETE_BUNDLED_SERVICE_CONFIG_REQUEST',
    DELETE_BUNDLED_SERVICE_CONFIG_SUCCESS: 'ServiceCategory/DELETE_BUNDLED_SERVICE_CONFIG_SUCCESS',
    DELETE_BUNDLED_SERVICE_CONFIG_FAILURE: 'ServiceCategory/DELETE_BUNDLED_SERVICE_CONFIG_FAILURE',
    RESET_SERVICE_FORM: 'ServiceCategory/RESET_SERVICE_FORM',

    FETCH_BUNDLED_SERVICE_CONFIG_FOR_CHK: 'ServiceCategory/FETCH_BUNDLED_SERVICE_CONFIG_FOR_CHK',
    FETCH_BUNDLED_SERVICE_CONFIG_FOR_CHK_REQUEST: 'ServiceCategory/FETCH_BUNDLED_SERVICE_CONFIG_FOR_CHK_REQUEST',
    FETCH_BUNDLED_SERVICE_CONFIG_FOR_CHK_SUCCESS: 'ServiceCategory/FETCH_BUNDLED_SERVICE_CONFIG_FOR_CHK_SUCCESS',
    FETCH_BUNDLED_SERVICE_CONFIG_FOR_CHK_FAILURE: 'ServiceCategory/FETCH_BUNDLED_SERVICE_CONFIG_FOR_CHK_FAILURE',

    SAVE_BUNDLED_SERVICE_CONFIG_FOR_CHK: 'ServiceCategory/SAVE_BUNDLED_SERVICE_CONFIG_FOR_CHK',
    SAVE_BUNDLED_SERVICE_CONFIG_FOR_CHK_REQUEST: 'ServiceCategory/SAVE_BUNDLED_SERVICE_CONFIG_FOR_CHK_REQUEST',
    SAVE_BUNDLED_SERVICE_CONFIG_FOR_CHK_SUCCESS: 'ServiceCategory/SAVE_BUNDLED_SERVICE_CONFIG_FOR_CHK_SUCCESS',
    SAVE_BUNDLED_SERVICE_CONFIG_FOR_CHK_FAILURE: 'ServiceCategory/SAVE_BUNDLED_SERVICE_CONFIG_FOR_CHK_FAILURE'

};

export const listBundledServiceConfig = (data) => action(types.LIST_BUNDLED_SERVICE_CONFIG, { data });

export const sentBundledServiceConfig = (data) => action(types.SENT_BUNDLED_SERVICE_CONFIG, { data });
export const editBundledServiceConfig = (id, data) => action(types.EDIT_BUNDLED_SERVICE_CONFIG, { id, data });

export const fetchBundledServiceConfig = (data) => action(types.FETCH_BUNDLED_SERVICE_CONFIG_FOR_CHK, { data });


export const getBundledServiceConfigById = (id) => action(types.GET_BUNDLED_SERVICE_CONFIG_BY_ID, { id });

export const deleteBundledServiceConfig = (data, page, size, count) => action(types.DELETE_BUNDLED_SERVICE_CONFIG, { data, page, size, count });

export const resetBundledServiceConfigForm = () => action(types.RESET_SERVICE_FORM);

export const saveBundledServiceConfigChk = (data) => action(types.SAVE_BUNDLED_SERVICE_CONFIG_FOR_CHK, { data });


