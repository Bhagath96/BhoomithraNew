import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function listPublicGatheringMethod({ params, types }) {
    let payload = {
        types,
        params
    };
    return {
        url: URL.PUBLIC_GATHERING_METHOD.LIST_PUBLIC_GATHERING_METHOD,
        api: restAPI.get,
        payload
    };
}
export function sentPublicGatheringMethod(data) {
    let payload = {
        types: [ActionTypes.SENT_PUBLIC_GATHERING_METHOD_REQUEST, ActionTypes.SENT_PUBLIC_GATHERING_METHOD_SUCCESS, ActionTypes.SENT_PUBLIC_GATHERING_METHOD_FAILURE],
        body: data
    };
    return {
        url: URL.PUBLIC_GATHERING_METHOD.LIST_PUBLIC_GATHERING_METHOD,
        api: restAPI.post,
        payload
    };
}


export function editPublicGatheringMethod(id, data) {
    let payload = {
        types: [ActionTypes.EDIT_PUBLIC_GATHERING_METHOD_REQUEST, ActionTypes.EDIT_PUBLIC_GATHERING_METHOD_SUCCESS, ActionTypes.EDIT_PUBLIC_GATHERING_METHOD_FAILURE],
        body: data
    };
    return {
        url: URL.PUBLIC_GATHERING_METHOD.EDIT_PUBLIC_GATHERING_METHOD.replace(':publicGatheringMethodId', id),
        api: restAPI.put,
        payload
    };
}

export function getPublicGatheringMethodById(id) {
    let payload = {
        types: [ActionTypes.GET_PUBLIC_GATHERING_METHOD_BY_ID_REQUEST, ActionTypes.GET_PUBLIC_GATHERING_METHOD_BY_ID_SUCCESS, ActionTypes.GET_PUBLIC_GATHERING_METHOD_BY_ID_FAILURE]
    };
    return {
        url: URL.PUBLIC_GATHERING_METHOD.GET_PUBLIC_GATHERING_METHOD_BY_ID.replace(':publicGatheringMethodId', id),
        api: restAPI.get,
        payload
    };
}

export function deletePublicGatheringMethod(data) {
    let payload = {
        types: [ActionTypes.DELETE_PUBLIC_GATHERING_METHOD_REQUEST, ActionTypes.DELETE_PUBLIC_GATHERING_METHOD_SUCCESS, ActionTypes.DELETE_PUBLIC_GATHERING_METHOD_FAILURE],
        body: data
    };
    return {
        url: URL.PUBLIC_GATHERING_METHOD.GET_PUBLIC_GATHERING_METHOD_BY_ID.replace(':publicGatheringMethodId', data),
        api: restAPI.del,
        payload
    };
}


