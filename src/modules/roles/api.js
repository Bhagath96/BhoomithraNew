import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function listJsonDataForRegRole({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_ROLE_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_ROLE_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_ROLE_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.ROLE.LIST_ALL_NAME_FOR_ROLE,
        api: restAPI.get,
        payload
    };
}

export function listJsonDataForOrgRole({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_ORG_ROLE_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_ORG_ROLE_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_ORG_ROLE_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.ROLE.LIST_ALL_NAME_FOR_ORG_ROLE,
        api: restAPI.get,
        payload
    };
}


//to list regular roles
export function listRegularRole({ params, types }) {
    const regularRoleId = 1;
    let payload = {
        types,
        params
    };
    return {
        url: URL.ROLE.LIST_REGULAR_ROLE.replace(':roleTypeId', regularRoleId),
        api: restAPI.get,
        payload
    };
}

export function listOrganizationRole({ params, types }) {
    const orgRoleId = 2;
    let payload = {
        types,
        params
    };
    return {
        url: URL.ROLE.LIST_ORGANISATION_ROLE.replace(':roleTypeId', orgRoleId),
        api: restAPI.get,
        payload
    };
}

//to delete an organisation
export function deleteOrganisationalRole(roleId) {
    let payload = {
        types: [ActionTypes.DELETE_ORGANISATIONAL_ROLE_REQUEST, ActionTypes.DELETE_ORGANISATIONAL_ROLE_SUCCESS, ActionTypes.DELETE_ORGANISATIONAL_ROLE_FAILURE]
    };
    return {
        url: URL.ROLE.DELETE_ORGANISATIONAL_ROLE.replace(':roleId', roleId),
        api: restAPI.del,
        payload
    };
}

//to delete regular roles
export function deleteRegularRole(roleId) {
    let payload = {
        types: [ActionTypes.DELETE_REGULAR_ROLE_REQUEST, ActionTypes.DELETE_REGULAR_ROLE_SUCCESS, ActionTypes.DELETE_REGULAR_ROLE_FAILURE]
    };
    return {
        url: URL.ROLE.DELETE_REGULAR_ROLE.replace(':roleId', roleId),
        api: restAPI.del,
        payload
    };
}

//to add role
export function addRole(data) {
    let payload = {
        types: [ActionTypes.ADD_ROLE_REQUEST, ActionTypes.ADD_ROLE_SUCCESS, ActionTypes.ADD_ROLE_FAILURE],
        body: data
    };
    return {
        url: URL.ROLE.ADD_ROLE,
        api: restAPI.post,
        payload
    };
}

//to update role
export function updateRole(id, data) {
    let payload = {
        types: [ActionTypes.UPDATE_ROLE_REQUEST, ActionTypes.UPDATE_ROLE_SUCCESS, ActionTypes.UPDATE_ROLE_FAILURE],
        params: id,
        body: data
    };
    return {
        url: URL.ROLE.UPDATE_ROLE.replace(':roleId', id),
        api: restAPI.put,
        payload
    };
}

export function getControllerPermissions() {
    let payload = {
        types: [ActionTypes.LIST_PERMISSION_CONTROLLER_REQUEST, ActionTypes.LIST_PERMISSION_CONTROLLER_SUCCESS, ActionTypes.LIST_PERMISSION_CONTROLLER_FAILURE]
    };
    return {
        url: URL.ROLE.GET_CONTROLLER_PERMISSIONS,
        api: restAPI.get,
        payload
    };
}

export function getControllerPermissionsWithRoleId(resourceId) {
    let payload = {
        types: [ActionTypes.LIST_PERMISSION_CONTROLLER_REQUEST_BY_ROLE_ID, ActionTypes.LIST_PERMISSION_CONTROLLER_SUCCESS_BY_ROLE_ID, ActionTypes.LIST_PERMISSION_CONTROLLER_FAILURE_BY_ROLE_ID]
    };
    return {
        url: URL.ROLE.GET_CONTROLLER_PERMISSIONS_BY_ID.replace(':resourceId', resourceId),
        api: restAPI.get,
        payload
    };
}
export function sendActionIds(data) {
    let payload = {
        types: [ActionTypes.SEND_ACTION_IDS_REQUEST, ActionTypes.SEND_ACTION_IDS_SUCCESS, ActionTypes.SEND_ACTION_IDS_FAILURE],
        body: data
    };
    return {
        url: URL.ROLE.SEND_ACTION_IDS,
        api: restAPI.post,
        payload
    };
}

export function getRolespermissionsForEdit(data) {
    let payload = {
        types: [ActionTypes.GET_ROLE_PERMISSION_FOR_EDIT_REQUEST, ActionTypes.GET_ROLE_PERMISSION_FOR_EDIT_SUCCESS, ActionTypes.GET_ROLE_PERMISSION_FOR_EDIT_FAILURE],
        body: data
    };
    return {
        url: URL.ROLE.GET_ROLE_PERMISSION_FOR_EDIT.replace(':resourceId', data.eventValue).replace(':roleId', data.id),
        api: restAPI.get,
        payload
    };
}

export function sendPermissionForEdit(data) {
    let payload = {
        types: [ActionTypes.SEND_PERMISSION_FOR_EDIT_REQUEST, ActionTypes.SEND_PERMISSION_FOR_EDIT_SUCCESS, ActionTypes.SEND_PERMISSION_FOR_EDIT_FAILURE],
        body: data.data
    };
    return {
        url: URL.ROLE.SEND_PERMISSIONS_FOR_EDIT.replace(':resourcePermissionId', data.id),
        api: restAPI.put,
        payload
    };
}

export function getUserBasedOnRoleId(id) {
    let payload = {
        types: [ActionTypes.GET_USERS_BASED_ON_ROLE_ID_REQUEST, ActionTypes.GET_USERS_BASED_ON_ROLE_ID_SUCCESS, ActionTypes.GET_USERS_BASED_ON_ROLE_ID_FAILURE]
    };
    return {
        url: URL.ROLE.GET_USERS_BASED_ON_ROLE_ID.replace(':roleId', id),
        api: restAPI.get,
        payload
    };
}

export function updateUsersInRole({ roleId, requestBody }) {
    let payload = {
        types: [ActionTypes.UPDATE_USERS_IN_ROLES_REQUEST, ActionTypes.UPDATE_USERS_IN_ROLES_SUCCESS, ActionTypes.UPDATE_USERS_IN_ROLES_FAILURE],
        body: requestBody
    };
    return {
        url: URL.ROLE.UPDATE_USER_IN_ROLE.replace(':roleId', roleId),
        api: restAPI.put,
        payload
    };
}

export function getRoleById(id) {
    let payload = {
        types: [ActionTypes.SET_ROLE_REQUEST, ActionTypes.SET_ROLE_SUCCESS, ActionTypes.SET_ROLE_FAILURE]
    };
    return {
        url: URL.ROLE.GET_ROLE_BY_ID.replace(':roleId', id),
        api: restAPI.get,
        payload
    };
}
export function fetchResourceActions({ resourceId, roleId }) {

    let payload = {
        types: [ActionTypes.FETCH_RESOURCE_ACTIONS_REQUEST, ActionTypes.FETCH_RESOURCE_ACTIONS_SUCCESS, ActionTypes.FETCH_RESOURCE_ACTIONS_FAILURE]
    };
    return {
        url: URL.ROLE.FETCH_RESOURCE_ACTIONS.replace(':roleId', roleId).replace(':resourceId', resourceId),
        api: restAPI.get,
        payload
    };
}

export function saveResourceActions(body) {
    let payload = {
        types: [ActionTypes.SAVE_RESOURCE_ACTIONS_REQUEST, ActionTypes.SAVE_RESOURCE_ACTIONS_SUCCESS, ActionTypes.SAVE_RESOURCE_ACTIONS_FAILURE],
        body
    };
    return {
        url: URL.ROLE.SAVE_RESOURCE_ACTIONS,
        api: restAPI.post,
        payload
    };
}

export function updateResourceActions(body) {
    const { resourcePermissionId } = body;
    let payload = {
        types: [ActionTypes.UPDATE_RESOURCE_ACTIONS_REQUEST, ActionTypes.UPDATE_RESOURCE_ACTIONS_SUCCESS, ActionTypes.UPDATE_RESOURCE_ACTIONS_FAILURE],
        body
    };
    return {
        url: URL.ROLE.UPDATE_RESOURCE_ACTIONS.replace(':resourcePermissionId', resourcePermissionId),
        api: restAPI.put,
        payload
    };
}
export function fetchAssignRole({ params, roleId }) {
    let payload = {
        types: [ActionTypes.FETCH_ASSIGN_ROLE_TO_USER_REQUEST, ActionTypes.FETCH_ASSIGN_ROLE_TO_USER_SUCCESS, ActionTypes.FETCH_ASSIGN_ROLE_TO_USER_FAILURE],
        params
    };
    return {
        url: URL.ROLE.FETCH_ASSIGN_ROLE_TO_USER.replace(':roleId', roleId),
        api: restAPI.get,
        payload
    };
}

export function submitAssignRole({ roleId, requestBody }) {
    let payload = {
        types: [ActionTypes.SUBMIT_ASSIGN_ROLE_TO_USER_REQUEST, ActionTypes.SUBMIT_ASSIGN_ROLE_TO_USER_SUCCESS, ActionTypes.SUBMIT_ASSIGN_ROLE_TO_USER_FAILURE],
        body: requestBody
    };
    return {
        url: URL.ROLE.FETCH_ASSIGN_ROLE_TO_USER.replace(':roleId', roleId),
        api: restAPI.put,
        payload
    };
}

export function submitRoleAssigneeDataAccess({ roleId, dataAccessRequest }) {
    let payload = {
        types: [ActionTypes.SUBMIT_ROLE_ASSIGNEE_DATA_ACCESS_REQUEST, ActionTypes.SUBMIT_ROLE_ASSIGNEE_DATA_ACCESS_SUCCESS, ActionTypes.SUBMIT_ROLE_ASSIGNEE_DATA_ACCESS_FAILURE],
        body: dataAccessRequest
    };
    return {
        url: URL.ROLE.SAVE_ROLE_ASSIGNEE_DATA_ACCESS_PERMISSION.replace(':roleId', roleId),
        api: restAPI.put,
        payload
    };
}

export function fetchViews({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_VIEWS_REQUEST, ActionTypes.FETCH_VIEWS_SUCCESS, ActionTypes.FETCH_VIEWS_FAILURE],
        params
    };
    return {
        url: URL.ROLE.FETCH_VIEWS,
        api: restAPI.get,
        payload
    };
}

export function fetchLevels({ params }) {
    let payload = {
        types: [ActionTypes.FETCH_LEVELS_REQUEST, ActionTypes.FETCH_LEVELS_SUCCESS, ActionTypes.FETCH_LEVELS_FAILURE],
        params
    };
    return {
        url: URL.ROLE.FETCH_LEVELS,
        api: restAPI.get,
        payload
    };
}

export function submitDataAccess({ requestBody }) {
    let payload = {
        types: [ActionTypes.SUBMIT_CONFIG_DATA_ACCESS_REQUEST, ActionTypes.SUBMIT_CONFIG_DATA_ACCESS_SUCCESS, ActionTypes.SUBMIT_CONFIG_DATA_ACCESS_FAILURE],
        body: requestBody
    };
    return {
        url: URL.ROLE.SUBMIT_DATA_ACCESS,
        api: restAPI.post,
        payload
    };
}
export function getDatatAccessById(id) {
    let payload = {
        types: [ActionTypes.FETCH_CONFIG_DATA_ACCESS_BY_ID_REQUEST, ActionTypes.FETCH_CONFIG_DATA_ACCESS_BY_ID_SUCCESS, ActionTypes.FETCH_CONFIG_DATA_ACCESS_BY_ID_FAILURE]
    };
    return {
        url: URL.ROLE.GET_DATA_ACCESS_BY_ID.replace(':roleId', id),
        api: restAPI.get,
        payload
    };
}
