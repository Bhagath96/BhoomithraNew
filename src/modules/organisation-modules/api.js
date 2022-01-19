import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

//to list modules
export function listModuleConfiguration(data) {
    let payload = {
        types: [ActionTypes.LIST_MODULE_REQUEST, ActionTypes.LIST_MODULE_SUCCESS, ActionTypes.LIST_MODULE_FAILURE],
        params: data
    };
    return {
        url: URL.ROLE.LIST_REGULAR_ROLE.replace(':roleTypeId', 1),
        api: restAPI.get,
        payload
    };
}

//getModuleById
export function getModulesById(id = 120) {
    let payload = {
        types: [ActionTypes.GET_MODULE_BY_ID_REQUEST, ActionTypes.GET_MODULE_BY_ID_SUCCESS, ActionTypes.GET_MODULE_BY_ID_FAILURE]
    };
    return {
        url: URL.ROLE.GET_ROLE_BY_ID.replace(':roleId', id),
        api: restAPI.get,
        payload
    };
}

export function listPermission() {
    let payload = {
        types: [ActionTypes.LIST_PERMISSIONS_REQUEST, ActionTypes.LIST_PERMISSIONS_SUCCESS, ActionTypes.LIST_PERMISSIONS_FAILURE]
    };
    return {
        url: URL.ROLE.GET_CONTROLLER_PERMISSIONS,
        api: restAPI.get,
        payload
    };
}

export function getResourceArray({ roleId = 0, resourceId = 0 }) {
    let payload = {
        types: [ActionTypes.GET_RESOURCE_ARRAY_REQUEST, ActionTypes.GET_RESOURCE_ARRAY_SUCCESS, ActionTypes.GET_RESOURCE_ARRAY_FAILURE]
    };
    return {
        url: URL.ROLE.FETCH_RESOURCE_ACTIONS.replace(':roleId', roleId).replace(':resourceId', resourceId),
        api: restAPI.get,
        payload
    };
}

export function updateModuleDetails(data) {
    let payload = {
        types: [ActionTypes.UPDATE_MODULE_DETAIL_VIEW_REQUEST, ActionTypes.UPDATE_MODULE_DETAIL_VIEW_SUCCESS, ActionTypes.UPDATE_MODULE_DETAIL_VIEW_FAILURE],
        body: data.data
    };
    return {
        url: URL.MODULES.UPDATE_MODULE_DETAIL_VIEW.replace(':moduleId', data.id),
        api: restAPI.put,
        payload
    };
}

// Not found any references need to remove

// export function loadOrganizationForModules(id) {
//     let payload = {
//         types: [ActionTypes.LOAD_ORGANISATION_FOR_MODULE_REQUEST, ActionTypes.LOAD_ORGANISATION_FOR_MODULE_SUCCESS, ActionTypes.LOAD_ORGANISATION_FOR_MODULE_FAILURE]
//     };
//     return {
//         url: URL.ROLE.FETCH_RESOURCE_ACTIONS.replace(':roleId', id),
//         api: restAPI.get,
//         payload
//     };
// }

export function updateOrganizationMapping({ id, data }) {
    let payload = {
        types: [ActionTypes.UPDATE_ORGANISATION_MAPPING_REQUEST, ActionTypes.UPDATE_ORGANISATION_MAPPING_SUCCESS, ActionTypes.UPDATE_ORGANISATION_MAPPING_FAILURE],
        data: data
    };
    return {
        url: URL.ROLE.FETCH_RESOURCE_ACTIONS.replace(':roleId', id),
        api: restAPI.put,
        payload
    };
}
