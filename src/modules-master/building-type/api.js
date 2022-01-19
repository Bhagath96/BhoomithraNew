import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function listBuildingType({ params, types }) {
    let payload = {
        types,
        params
    };
    return {
        url: URL.BUILDING_TYPE.LIST_BUILDING_TYPE,
        api: restAPI.get,
        payload
    };
}
export function loadResidentialCategory(type) {
    let payload = {
        types: [ActionTypes.LOAD_RESIDENTIAL_CATEGORY_REQUEST, ActionTypes.LOAD_RESIDENTIAL_CATEGORY_SUCCESS, ActionTypes.LOAD_RESIDENTIAL_CATEGORY_FAILURE],
        params: { type }
    };
    return {
        url: URL.BUILDING_TYPE.GET_RESIDENTIAL_CATEGORY,
        api: restAPI.get,
        payload
    };
}

export function sentBuildingType(data) {
    let payload = {
        types: [ActionTypes.SENT_BUILDING_TYPE_REQUEST, ActionTypes.SENT_BUILDING_TYPE_SUCCESS, ActionTypes.SENT_BUILDING_TYPE_FAILURE],
        body: data
    };
    return {
        url: URL.BUILDING_TYPE.LIST_BUILDING_TYPE,
        api: restAPI.post,
        payload
    };
}


export function editBuildingType(id, data) {
    let payload = {
        types: [ActionTypes.EDIT_BUILDING_TYPE_REQUEST, ActionTypes.EDIT_BUILDING_TYPE_SUCCESS, ActionTypes.EDIT_BUILDING_TYPE_FAILURE],
        body: data
    };
    return {
        url: URL.BUILDING_TYPE.EDIT_BUILDING_TYPE.replace(':BuildingTypeId', id),
        api: restAPI.put,
        payload
    };
}

export function getBuildingTypeById(id) {
    let payload = {
        types: [ActionTypes.GET_BUILDING_TYPE_BY_ID_REQUEST, ActionTypes.GET_BUILDING_TYPE_BY_ID_SUCCESS, ActionTypes.GET_BUILDING_TYPE_BY_ID_FAILURE]
    };
    return {
        url: URL.BUILDING_TYPE.GET_BUILDING_TYPE_BY_ID.replace(':BuildingTypeId', id),
        api: restAPI.get,
        payload
    };
}

export function deleteBuildingType(data) {
    let payload = {
        types: [ActionTypes.DELETE_BUILDING_TYPE_REQUEST, ActionTypes.DELETE_BUILDING_TYPE_SUCCESS, ActionTypes.DELETE_BUILDING_TYPE_FAILURE],
        body: data
    };
    return {
        url: URL.BUILDING_TYPE.GET_BUILDING_TYPE_BY_ID.replace(':BuildingTypeId', data),
        api: restAPI.del,
        payload
    };
}


