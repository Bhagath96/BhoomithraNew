import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function listIncident({ params, types }) {
    let payload = {
        types,
        params
    };
    return {
        url: URL.INCIDENT.LIST_INCIDENT_CONFIG,
        api: restAPI.get,
        payload
    };
}

export function SaveIncident(data) {
    let payload = {
        types: [ActionTypes.SAVE_INCIDENT_REQUEST, ActionTypes.SAVE_INCIDENT_SUCCESS, ActionTypes.SAVE_INCIDENT_FAILURE],
        body: data
    };
    return {
        url: URL.INCIDENT.LIST_INCIDENT_CONFIG,
        api: restAPI.post,
        payload
    };
}


export function editIncident(id, data) {
    let payload = {
        types: [ActionTypes.EDIT_INCIDENT_REQUEST, ActionTypes.EDIT_INCIDENT_SUCCESS, ActionTypes.EDIT_INCIDENT_FAILURE],
        body: data
    };
    return {
        url: URL.INCIDENT.INCIDENT_CONFIG_BY_ID.replace(':incidentConfigId', id),
        api: restAPI.put,
        payload
    };
}

export function getIncidentById(id) {
    let payload = {
        types: [ActionTypes.GET_INCIDENT_BY_ID_REQUEST, ActionTypes.GET_INCIDENT_BY_ID_SUCCESS, ActionTypes.GET_INCIDENT_BY_ID_FAILURE]
    };
    return {
        url: URL.INCIDENT.INCIDENT_CONFIG_BY_ID.replace(':incidentConfigId', id),
        api: restAPI.get,
        payload
    };
}

export function deleteIncident(data) {
    let payload = {
        types: [ActionTypes.DELETE_INCIDENT_REQUEST, ActionTypes.DELETE_INCIDENT_SUCCESS, ActionTypes.DELETE_INCIDENT_FAILURE],
        body: data
    };
    return {
        url: URL.INCIDENT.GET_INCIDENT_BY_ID.replace(':incidentConfigId', data),
        api: restAPI.del,
        payload
    };
}


