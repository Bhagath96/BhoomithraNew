import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchRoleAssigneeDataAccessPermission({ roleId, langId }) {
    let payload = {
        types: [ActionTypes.FETCH_ROLE_ASSIGNEE_DATA_ACCESS_PERMISSION_REQUEST, ActionTypes.FETCH_ROLE_ASSIGNEE_DATA_ACCESS_PERMISSION_SUCCESS, ActionTypes.FETCH_ROLE_ASSIGNEE_DATA_ACCESS_PERMISSION_FAILURE],
        body: langId
    };
    return {
        url: URL.DATA_ACCESS_PERMISSION.ROLE_ASSIGNEE.replace(':roleId', roleId),
        api: restAPI.get,
        payload
    };
}

export function fetchUserRoleDataAccessPermission({ userId, langId }) {
    let payload = {
        types: [ActionTypes.FETCH_USER_ROLE_DATA_ACCESS_PERMISSION_REQUEST, ActionTypes.FETCH_USER_ROLE_DATA_ACCESS_PERMISSION_SUCCESS, ActionTypes.FETCH_USER_ROLE_DATA_ACCESS_PERMISSION_FAILURE],
        body: langId
    };
    return {
        url: URL.DATA_ACCESS_PERMISSION.USER_ROLE.replace(':userId', userId),
        api: restAPI.get,
        payload
    };
}

export function fetchAllLsgi(params) {
    let payload = {
        types: [ActionTypes.FETCH_ALL_LOCAL_BODIES_REQUEST, ActionTypes.FETCH_ALL_LOCAL_BODIES_SUCCESS, ActionTypes.FETCH_ALL_LOCAL_BODIES_FAILURE],
        params
    };
    return {
        url: URL.WARD.LIST_LSGI,
        api: restAPI.get,
        payload
    };
}

export function listWards(params) {
    let payload = {
        types: [ActionTypes.FETCH_ALL_WARDS_REQUEST, ActionTypes.FETCH_ALL_WARDS_SUCCESS, ActionTypes.FETCH_ALL_WARDS_FAILURE],
        params
    };
    return {
        url: URL.WARD.LIST_WARDS,
        api: restAPI.get,
        payload
    };
}

export function fetchAllResidenceCategories(params) {
    let payload = {
        types: [ActionTypes.FETCH_ALL_RESIDENCE_CATEGORY_REQUEST, ActionTypes.FETCH_ALL_RESIDENCE_CATEGORY_SUCCESS, ActionTypes.FETCH_ALL_RESIDENCE_CATEGORY_FAILURE],
        params
    };
    return {
        url: URL.RESIDENCE_CATEGORY.LIST_RESIDENCE_CATEGORY,
        api: restAPI.get,
        payload
    };
}
