import { action } from '../../common';

export const types = {
    LIST_INCIDENT: 'BasicConfig/LIST_INCIDENT',
    LIST_INCIDENT_REQUEST: 'BasicConfig/LIST_INCIDENT_REQUEST',
    LIST_INCIDENT_SUCCESS: 'BasicConfig/LIST_INCIDENT_SUCCESS',
    LIST_INCIDENT_FAILURE: 'BasicConfig/LIST_INCIDENT_FAILURE',

    SAVE_INCIDENT: 'BasicConfig/SAVE_INCIDENT',
    SAVE_INCIDENT_REQUEST: 'BasicConfig/SAVE_INCIDENT_REQUEST',
    SAVE_INCIDENT_SUCCESS: 'BasicConfig/SAVE_INCIDENT_SUCCESS',
    SAVE_INCIDENT_FAILURE: 'BasicConfig/SAVE_INCIDENT_FAILURE',

    EDIT_INCIDENT: 'BasicConfig/EDIT_INCIDENT',
    EDIT_INCIDENT_REQUEST: 'BasicConfig/EDIT_INCIDENT_REQUEST',
    EDIT_INCIDENT_SUCCESS: 'BasicConfig/EDIT_INCIDENT_SUCCESS',
    EDIT_INCIDENT_FAILURE: 'BasicConfig/EDIT_INCIDENT_FAILURE',

    GET_INCIDENT_BY_ID: 'BasicConfig/GET_INCIDENT_BY_ID',
    GET_INCIDENT_BY_ID_REQUEST: 'BasicConfig/GET_INCIDENT_BY_ID_REQUEST',
    GET_INCIDENT_BY_ID_SUCCESS: 'BasicConfig/GET_INCIDENT_BY_ID_SUCCESS',
    GET_INCIDENT_BY_ID_FAILURE: 'BasicConfig/GET_INCIDENT_BY_ID_FAILRUE',

    DELETE_INCIDENT: 'BasicConfig/DELETE_INCIDENT',
    DELETE_INCIDENT_REQUEST: 'BasicConfig/DELETE_INCIDENT_REQUEST',
    DELETE_INCIDENT_SUCCESS: 'BasicConfig/DELETE_INCIDENT_SUCCESS',
    DELETE_INCIDENT_FAILURE: 'BasicConfig/DELETE_INCIDENT_FAILURE',
    RESET_SERVICE_FORM: 'BasicConfig/RESET_SERVICE_FORM'

};

export const listIncident = (data) => action(types.LIST_INCIDENT, { data });

export const saveIncident = (data) => action(types.SAVE_INCIDENT, { data });

export const editIncident = (id, data) => action(types.EDIT_INCIDENT, { id, data });

export const getIncidentById = (id) => action(types.GET_INCIDENT_BY_ID, { id });

export const deleteIncident = (data, page, size, count) => action(types.DELETE_INCIDENT, { data, page, size, count });

export const resetIncidentForm = () => action(types.RESET_SERVICE_FORM);

