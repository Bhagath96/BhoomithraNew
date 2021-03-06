import { action } from '../../common';

export const types = {
    LIST_COMPLAINT_CONFIG: 'Complaint/LIST_COMPLAINT_CONFIG',
    LIST_COMPLAINT_CONFIG_REQUEST: 'Complaint/LIST_COMPLAINT_CONFIG_REQUEST',
    LIST_COMPLAINT_CONFIG_SUCCESS: 'Complaint/LIST_COMPLAINT_CONFIG_SUCCESS',
    LIST_COMPLAINT_CONFIG_FAILURE: 'Complaint/LIST_COMPLAINT_CONFIG_FAILURE',

    SENT_COMPLAINT_CONFIG: 'Complaint/SENT_COMPLAINT_CONFIG',
    SENT_COMPLAINT_CONFIG_REQUEST: 'Complaint/SENT_COMPLAINT_CONFIG_REQUEST',
    SENT_COMPLAINT_CONFIG_SUCCESS: 'Complaint/SENT_COMPLAINT_CONFIG_SUCCESS',
    SENT_COMPLAINT_CONFIG_FAILURE: 'Complaint/SENT_COMPLAINT_CONFIG_FAILURE',

    EDIT_COMPLAINT_CONFIG: 'Complaint/EDIT_COMPLAINT_CONFIG',
    EDIT_COMPLAINT_CONFIG_REQUEST: 'Complaint/EDIT_COMPLAINT_CONFIG_REQUEST',
    EDIT_COMPLAINT_CONFIG_SUCCESS: 'Complaint/EDIT_COMPLAINT_CONFIG_SUCCESS',
    EDIT_COMPLAINT_CONFIG_FAILURE: 'Complaint/EDIT_COMPLAINT_CONFIG_FAILURE',

    GET_COMPLAINT_CONFIG_BY_ID: 'Complaint/GET_COMPLAINT_CONFIG_BY_ID',
    GET_COMPLAINT_CONFIG_BY_ID_REQUEST: 'Complaint/GET_COMPLAINT_CONFIG_BY_ID_REQUEST',
    GET_COMPLAINT_CONFIG_BY_ID_SUCCESS: 'Complaint/GET_COMPLAINT_CONFIG_BY_ID_SUCCESS',
    GET_COMPLAINT_CONFIG_BY_ID_FAILURE: 'Complaint/GET_COMPLAINT_CONFIG_BY_ID_FAILRUE',

    DELETE_COMPLAINT_CONFIG: 'Complaint/DELETE_COMPLAINT_CONFIG',
    DELETE_COMPLAINT_CONFIG_REQUEST: 'Complaint/DELETE_COMPLAINT_CONFIG_REQUEST',
    DELETE_COMPLAINT_CONFIG_SUCCESS: 'Complaint/DELETE_COMPLAINT_CONFIG_SUCCESS',
    DELETE_COMPLAINT_CONFIG_FAILURE: 'Complaint/DELETE_COMPLAINT_CONFIG_FAILURE',

    RESET_COMPLAINT_CONFIG_FORM: 'Complaint/RESET_COMPLAINT_CONFIG_FORM',

    FETCH_COMPLAINT_CONFIG_FOR_CHK: 'Complaint/FETCH_COMPLAINT_CONFIG_FOR_CHK',
    FETCH_COMPLAINT_CONFIG_FOR_CHK_REQUEST: 'Complaint/FETCH_COMPLAINT_CONFIG_FOR_CHK_REQUEST',
    FETCH_COMPLAINT_CONFIG_FOR_CHK_SUCCESS: 'Complaint/FETCH_COMPLAINT_CONFIG_FOR_CHK_SUCCESS',
    FETCH_COMPLAINT_CONFIG_FOR_CHK_FAILURE: 'Complaint/FETCH_COMPLAINT_CONFIG_FOR_CHK_FAILURE',

    SAVE_COMPLAINT_CONFIG_FOR_CHK: 'Complaint/SAVE_COMPLAINT_CONFIG_FOR_CHK',
    SAVE_COMPLAINT_CONFIG_FOR_CHK_REQUEST: 'Complaint/SAVE_COMPLAINT_CONFIG_FOR_CHK_REQUEST',
    SAVE_COMPLAINT_CONFIG_FOR_CHK_SUCCESS: 'Complaint/SAVE_COMPLAINT_CONFIG_FOR_CHK_SUCCESS',
    SAVE_COMPLAINT_CONFIG_FOR_CHK_FAILURE: 'Complaint/SAVE_COMPLAINT_CONFIG_FOR_CHK_FAILURE'

};

export const listComplaintConfig = (data) => action(types.LIST_COMPLAINT_CONFIG, { data });

export const sentComplaintConfig = (data) => action(types.SENT_COMPLAINT_CONFIG, { data });
export const editComplaintConfig = (id, data) => action(types.EDIT_COMPLAINT_CONFIG, { id, data });

export const fetchComplaintConfigCHK = (data) => action(types.FETCH_COMPLAINT_CONFIG_FOR_CHK, { data });


export const getComplaintConfigById = (id) => action(types.GET_COMPLAINT_CONFIG_BY_ID, { id });

export const deleteComplaintConfig = (data, page, size, count) => action(types.DELETE_COMPLAINT_CONFIG, { data, page, size, count });

export const resetComplaintConfigForm = () => action(types.RESET_COMPLAINT_CONFIG_FORM);

export const saveComplaintConfigChk = (data) => action(types.SAVE_COMPLAINT_CONFIG_FOR_CHK, { data });


