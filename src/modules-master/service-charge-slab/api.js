import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function listServiceChargeSlab({ params, types }) {
    let payload = {
        types,
        params
    };
    return {
        url: URL.SERVICE_CHARGE_SLAB.LIST_SERVICE_CHARGE_SLAB,
        api: restAPI.get,
        payload
    };
}

export function sentServiceChargeSlab(data) {
    let payload = {
        types: [ActionTypes.SENT_SERVICE_CHARGE_SLAB_REQUEST, ActionTypes.SENT_SERVICE_CHARGE_SLAB_SUCCESS, ActionTypes.SENT_SERVICE_CHARGE_SLAB_FAILURE],
        body: data
    };
    return {
        url: URL.SERVICE_CHARGE_SLAB.LIST_SERVICE_CHARGE_SLAB,
        api: restAPI.post,
        payload
    };
}


export function editServiceChargeSlab(id, data) {
    let payload = {
        types: [ActionTypes.EDIT_SERVICE_CHARGE_SLAB_REQUEST, ActionTypes.EDIT_SERVICE_CHARGE_SLAB_SUCCESS, ActionTypes.EDIT_SERVICE_CHARGE_SLAB_FAILURE],
        body: data
    };
    return {
        url: URL.SERVICE_CHARGE_SLAB.EDIT_SERVICE_CHARGE_SLAB.replace(':serviceChargeSlabId', id),
        api: restAPI.put,
        payload
    };
}

export function getServiceChargeSlabById(id) {
    let payload = {
        types: [ActionTypes.GET_SERVICE_CHARGE_SLAB_BY_ID_REQUEST, ActionTypes.GET_SERVICE_CHARGE_SLAB_BY_ID_SUCCESS, ActionTypes.GET_SERVICE_CHARGE_SLAB_BY_ID_FAILURE]
    };
    return {
        url: URL.SERVICE_CHARGE_SLAB.GET_SERVICE_CHARGE_SLAB_BY_ID.replace(':serviceChargeSlabId', id),
        api: restAPI.get,
        payload
    };
}

export function deleteServiceChargeSlab(data) {
    let payload = {
        types: [ActionTypes.DELETE_SERVICE_CHARGE_SLAB_REQUEST, ActionTypes.DELETE_SERVICE_CHARGE_SLAB_SUCCESS, ActionTypes.DELETE_SERVICE_CHARGE_SLAB_FAILURE],
        body: data
    };
    return {
        url: URL.SERVICE_CHARGE_SLAB.GET_SERVICE_CHARGE_SLAB_BY_ID.replace(':serviceChargeSlabId', data),
        api: restAPI.del,
        payload
    };
}


