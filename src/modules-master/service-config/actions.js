import { action } from '../../common';

export const types = {
    LIST_SERVICE_CONFIG: 'ServiceCategory/LIST_SERVICE_CONFIG',
    LIST_SERVICE_CONFIG_REQUEST: 'ServiceCategory/LIST_SERVICE_CONFIG_REQUEST',
    LIST_SERVICE_CONFIG_SUCCESS: 'ServiceCategory/LIST_SERVICE_CONFIG_SUCCESS',
    LIST_SERVICE_CONFIG_FAILURE: 'ServiceCategory/LIST_SERVICE_CONFIG_FAILURE',

    SENT_SERVICE_CONFIG: 'ServiceCategory/SENT_SERVICE_CONFIG',
    SENT_SERVICE_CONFIG_REQUEST: 'ServiceCategory/SENT_SERVICE_CONFIG_REQUEST',
    SENT_SERVICE_CONFIG_SUCCESS: 'ServiceCategory/SENT_SERVICE_CONFIG_SUCCESS',
    SENT_SERVICE_CONFIG_FAILURE: 'ServiceCategory/SENT_SERVICE_CONFIG_FAILURE',

    EDIT_SERVICE_CONFIG: 'ServiceCategory/EDIT_SERVICE_CONFIG',
    EDIT_SERVICE_CONFIG_REQUEST: 'ServiceCategory/EDIT_SERVICE_CONFIG_REQUEST',
    EDIT_SERVICE_CONFIG_SUCCESS: 'ServiceCategory/EDIT_SERVICE_CONFIG_SUCCESS',
    EDIT_SERVICE_CONFIG_FAILURE: 'ServiceCategory/EDIT_SERVICE_CONFIG_FAILURE',

    GET_SERVICE_CONFIG_BY_ID: 'ServiceCategory/GET_SERVICE_CONFIG_BY_ID',
    GET_SERVICE_CONFIG_BY_ID_REQUEST: 'ServiceCategory/GET_SERVICE_CONFIG_BY_ID_REQUEST',
    GET_SERVICE_CONFIG_BY_ID_SUCCESS: 'ServiceCategory/GET_SERVICE_CONFIG_BY_ID_SUCCESS',
    GET_SERVICE_CONFIG_BY_ID_FAILURE: 'ServiceCategory/GET_SERVICE_CONFIG_BY_ID_FAILRUE',
    DELETE_SERVICE_CONFIG: 'ServiceCategory/DELETE_SERVICE_CONFIG',
    DELETE_SERVICE_CONFIG_REQUEST: 'ServiceCategory/DELETE_SERVICE_CONFIG_REQUEST',
    DELETE_SERVICE_CONFIG_SUCCESS: 'ServiceCategory/DELETE_SERVICE_CONFIG_SUCCESS',
    DELETE_SERVICE_CONFIG_FAILURE: 'ServiceCategory/DELETE_SERVICE_CONFIG_FAILURE',
    RESET_SERVICE_FORM: 'ServiceCategory/RESET_SERVICE_FORM'

};

export const listServiceConfig = (data) => action(types.LIST_SERVICE_CONFIG, { data });

export const sentServiceConfig = (data) => action(types.SENT_SERVICE_CONFIG, { data });
export const editServiceConfig = (id, data) => action(types.EDIT_SERVICE_CONFIG, { id, data });


export const getServiceConfigById = (id) => action(types.GET_SERVICE_CONFIG_BY_ID, { id });

export const deleteServiceConfig = (data, page, size, count) => action(types.DELETE_SERVICE_CONFIG, { data, page, size, count });

export const resetServiceConfigForm = () => action(types.RESET_SERVICE_FORM);

