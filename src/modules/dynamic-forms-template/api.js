import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function saveTemplateRoute({ templateId, fragmentJson, linkJson }) {
    let payload = {
        types: [ActionTypes.SAVE_TEMPLATE_ROUTES_REQUEST, ActionTypes.SAVE_TEMPLATE_ROUTES_SUCCESS, ActionTypes.SAVE_TEMPLATE_ROUTES_FAILURE],
        body: { fragmentJson, linkJson }
    };
    return {
        url: URL.DYNAMIC_FORM_TEMPLATE.SAVE_TEMPLATE_ROUTE.replace(':templateId', templateId),
        api: restAPI.post,
        payload
    };
}

export function updateTemplateRoute({ templateId, fragmentId, fragmentJson, linkJson }) {
    let payload = {
        types: [ActionTypes.UPDATE_TEMPLATE_ROUTE_REQUEST, ActionTypes.UPDATE_TEMPLATE_ROUTE_SUCCESS, ActionTypes.UPDATE_TEMPLATE_ROUTE_FAILURE],
        body: { fragmentJson, linkJson }
    };
    return {
        url: URL.DYNAMIC_FORM_TEMPLATE.SAVE_TEMPLATE_ROUTE.replace(':templateId', templateId).replace(':fragmentId', fragmentId),
        api: restAPI.put,
        payload
    };
}

export function fetchTemplates({ params, types }) {
    let payload = {
        types,
        params
    };
    return {
        url: URL.DYNAMIC_FORM_TEMPLATE.LIST_ALL_TEMPLATES,
        api: restAPI.get,
        payload
    };
}


export function fetchTemplateTypes(data) {
    let payload = {
        types: [ActionTypes.FETCH_TEMPLATE_TYPE_REQUEST, ActionTypes.FETCH_TEMPLATE_TYPE_SUCCESS, ActionTypes.FETCH_TEMPLATE_TYPE_FAILURE],
        params: data
    };
    return {
        url: URL.DYNAMIC_FORM_TEMPLATE.LIST_TEMPLATE_TYPE,
        api: restAPI.get,
        payload
    };
}
export function fetchTemplateDetailsById({ templateId }) {
    let payload = {
        types: [ActionTypes.FETCH_TEMPLATE_BY_ID_REQUEST, ActionTypes.FETCH_TEMPLATE_BY_ID_SUCCESS, ActionTypes.FETCH_TEMPLATE_BY_ID_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM_TEMPLATE.FETCH_TEMPLATE_DETAILS.replace(':templateId', templateId),
        api: restAPI.get,
        payload
    };
}

export function saveTemplate(data) {
    let payload = {
        types: [ActionTypes.SAVE_TEMPLATE_REQUEST, ActionTypes.SAVE_TEMPLATE_SUCCESS, ActionTypes.SAVE_TEMPLATE_FAILURE],
        body: data
    };
    return {
        url: URL.DYNAMIC_FORM_TEMPLATE.SAVE,
        api: restAPI.post,
        payload
    };
}

export function updateTemplate({ data, templateId }) {
    let payload = {
        types: [ActionTypes.UPDATE_TEMPLATE_REQUEST, ActionTypes.UPDATE_TEMPLATE_SUCCESS, ActionTypes.UPDATE_TEMPLATE_FAILURE],
        body: data
    };
    return {
        url: URL.DYNAMIC_FORM_TEMPLATE.UPDATE.replace(':templateId', templateId),
        api: restAPI.put,
        payload
    };
}

export function deleteTemplates(data) {
    let payload = {
        types: [ActionTypes.DELETE_TEMPLATE_REQUEST, ActionTypes.DELETE_TEMPLATE_SUCCESS, ActionTypes.DELETE_TEMPLATE_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM_TEMPLATE.DELETE_TEMPLATE.replace(':templateId', data),
        api: restAPI.del,
        payload
    };
}

export function deleteAssignedFragment(id, templateId) {

    let payload = {
        types: [ActionTypes.DELETE_ASSIGNED_FRAGMENT_REQUEST, ActionTypes.DELETE_ASSIGNED_FRAGMENT_SUCCESS, ActionTypes.DELETE_ASSIGNED_FRAGMENT_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM_TEMPLATE.DELETE_FRAGMENT.replace(':fragmentId', id).replace(':templateId', templateId),
        api: restAPI.del,
        payload
    };
}

export function fetchRoutesFromTemplate(templateId, fragmentId) {

    let payload = {
        types: [ActionTypes.FETCH_ROUTES_FROM_TEMPLATE_REQUEST, ActionTypes.FETCH_ROUTES_FROM_TEMPLATE_SUCCESS, ActionTypes.FETCH_ROUTES_FROM_TEMPLATE_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM_TEMPLATE.FETCH_TEMPLATE_ROUTE.replace(':fragmentId', fragmentId).replace(':templateId', templateId),
        api: restAPI.get,
        payload
    };
}

export function fetchFragmentsByTemplate({ templateId, params, types }) {
    let payload = { types, params };
    return {
        url: URL.DYNAMIC_FORM_TEMPLATE.FETCH_FRAGMENTS_BY_TEMPLATE.replace(':templateId', templateId),
        api: restAPI.get,
        payload
    };
}

export function fetchAllFragments({ params, types }) {
    let payload = { types, params };
    return {
        url: URL.DYNAMIC_FORM_TEMPLATE.FETCH_ALL_FRAGMENTS,
        api: restAPI.get,
        payload
    };
}

export function fetchFragmentJSON({ fragmentId }) {
    let payload = {
        types: [ActionTypes.FETCH_FRAGMENTS_BY_FRAGMENT_ID_REQUEST, ActionTypes.FETCH_FRAGMENTS_BY_FRAGMENT_ID_SUCCESS, ActionTypes.FETCH_FRAGMENTS_BY_FRAGMENT_ID_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM_TEMPLATE.FETCH_FRAGMENT_JSON.replace(':fragmentId', fragmentId),
        api: restAPI.get,
        payload
    };
}
export function assignFragmentsToTemplate({ formData, templateId }) {
    let payload = {
        types: [ActionTypes.ASSIGN_FRAGMENT_TEMPLATE_REQUEST, ActionTypes.ASSIGN_FRAGMENT_TEMPLATE_SUCCESS, ActionTypes.ASSIGN_FRAGMENT_TEMPLATE_FAILURE],
        body: formData
    };
    return {
        url: URL.DYNAMIC_FORM_TEMPLATE.ASSIGN_FRAGMENT_TEMPLATE.replace(':templateId', templateId),
        api: restAPI.post,
        payload
    };
}

export function updateAssignedFragment({ formData, templateId, fragmentId }) {
    let payload = {
        types: [ActionTypes.UPDATE_ASSIGNED_FRAGMENT_REQUEST, ActionTypes.UPDATE_ASSIGNED_FRAGMENT_SUCCESS, ActionTypes.UPDATE_ASSIGNED_FRAGMENT_FAILURE],
        body: formData
    };
    return {
        url: URL.DYNAMIC_FORM_TEMPLATE.UPDATE_ASSIGNED_FRAGMENT.replace(':fragmentId', fragmentId).replace(':templateId', templateId),
        api: restAPI.put,
        payload
    };
}

export function fetchAssignedFragment({ templateId, fragmentId }) {
    let payload = {
        types: [ActionTypes.FETCH_ASSIGNED_FRAGMENT_REQUEST, ActionTypes.FETCH_ASSIGNED_FRAGMENT_SUCCESS, ActionTypes.FETCH_ASSIGNED_FRAGMENT_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM_TEMPLATE.FETCH_ASSIGNED_FRAGMENT.replace(':fragmentId', fragmentId).replace(':templateId', templateId),
        api: restAPI.get,
        payload
    };
}
export function fetchCurrentAssociationList({ templateId }) {
    let payload = {
        types: [ActionTypes.FETCH_CURRENT_ASSOCIATION_REQUEST, ActionTypes.FETCH_CURRENT_ASSOCIATION_SUCCESS, ActionTypes.FETCH_CURRENT_ASSOCIATION_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM_TEMPLATE.FETCH_CURRENT_ASSOCIATION.replace(':templateId', templateId),
        api: restAPI.get,
        payload
    };
}
export function listJsonDataForTable({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_TEMPLATE_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_TEMPLATE_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_TEMPLATE_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.DYNAMIC_FORM_TEMPLATE.LIST_ALL_TEMPLATES,
        api: restAPI.get,
        payload
    };
}

