import { action } from '../../common';

export const types = {
    LIST_TERRACE_FARMING: 'ServiceCategory/LIST_TERRACE_FARMING',
    LIST_TERRACE_FARMING_REQUEST: 'ServiceCategory/LIST_TERRACE_FARMING_REQUEST',
    LIST_TERRACE_FARMING_SUCCESS: 'ServiceCategory/LIST_TERRACE_FARMING_SUCCESS',
    LIST_TERRACE_FARMING_FAILURE: 'ServiceCategory/LIST_TERRACE_FARMING_FAILURE',

    SENT_TERRACE_FARMING: 'ServiceCategory/SENT_TERRACE_FARMING',
    SENT_TERRACE_FARMING_REQUEST: 'ServiceCategory/SENT_TERRACE_FARMING_REQUEST',
    SENT_TERRACE_FARMING_SUCCESS: 'ServiceCategory/SENT_TERRACE_FARMING_SUCCESS',
    SENT_TERRACE_FARMING_FAILURE: 'ServiceCategory/SENT_TERRACE_FARMING_FAILURE',

    EDIT_TERRACE_FARMING: 'ServiceCategory/EDIT_TERRACE_FARMING',
    EDIT_TERRACE_FARMING_REQUEST: 'ServiceCategory/EDIT_TERRACE_FARMING_REQUEST',
    EDIT_TERRACE_FARMING_SUCCESS: 'ServiceCategory/EDIT_TERRACE_FARMING_SUCCESS',
    EDIT_TERRACE_FARMING_FAILURE: 'ServiceCategory/EDIT_TERRACE_FARMING_FAILURE',

    GET_TERRACE_FARMING_BY_ID: 'ServiceCategory/GET_TERRACE_FARMING_BY_ID',
    GET_TERRACE_FARMING_BY_ID_REQUEST: 'ServiceCategory/GET_TERRACE_FARMING_BY_ID_REQUEST',
    GET_TERRACE_FARMING_BY_ID_SUCCESS: 'ServiceCategory/GET_TERRACE_FARMING_BY_ID_SUCCESS',
    GET_TERRACE_FARMING_BY_ID_FAILURE: 'ServiceCategory/GET_TERRACE_FARMING_BY_ID_FAILRUE',
    DELETE_TERRACE_FARMING: 'ServiceCategory/DELETE_TERRACE_FARMING',
    DELETE_TERRACE_FARMING_REQUEST: 'ServiceCategory/DELETE_TERRACE_FARMING_REQUEST',
    DELETE_TERRACE_FARMING_SUCCESS: 'ServiceCategory/DELETE_TERRACE_FARMING_SUCCESS',
    DELETE_TERRACE_FARMING_FAILURE: 'ServiceCategory/DELETE_TERRACE_FARMING_FAILURE',
    RESET_SERVICE_FORM: 'ServiceCategory/RESET_SERVICE_FORM'

};

export const listTerraceFarming = (data) => action(types.LIST_TERRACE_FARMING, { data });

export const sentTerraceFarming = (data) => action(types.SENT_TERRACE_FARMING, { data });
export const editTerraceFarming = (id, data) => action(types.EDIT_TERRACE_FARMING, { id, data });


export const getTerraceFarmingById = (id) => action(types.GET_TERRACE_FARMING_BY_ID, { id });

export const deleteTerraceFarming = (data, page, size, count) => action(types.DELETE_TERRACE_FARMING, { data, page, size, count });

export const resetTerraceFarmingForm = () => action(types.RESET_SERVICE_FORM);

