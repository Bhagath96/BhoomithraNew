import { action } from '../../common';

export const types = {
    LIST_MODULES: 'OrganizationModules/LIST_MODULES',
    LIST_MODULE_REQUEST: 'OrganizationModules/LIST_MODULE_REQUEST',
    LIST_MODULE_SUCCESS: 'OrganizationModules/LIST_MODULE_SUCCESS',
    LIST_MODULE_FAILURE: 'OrganizationModules/LIST_MODULE_FAILURE',

    GET_MODULE_BY_ID: 'OrganizationModules/GET_MODULE_BY_ID',
    GET_MODULE_BY_ID_REQUEST: 'OrganizationModules/GET_MODULE_BY_ID_REQUEST',
    GET_MODULE_BY_ID_SUCCESS: 'OrganizationModules/GET_MODULE_BY_ID_SUCCESS',
    GET_MODULE_BY_ID_FAILURE: 'OrganizationModules/GET_MODULE_BY_ID_FAILURE',

    LIST_PERMISSIONS: 'OrganizationModules/LIST_PERMISSIONS',
    LIST_PERMISSIONS_REQUEST: 'OrganizationModules/LIST_PERMISSIONS_REQUEST',
    LIST_PERMISSIONS_SUCCESS: 'OrganizationModules/LIST_PERMISSIONS_SUCCESS',
    LIST_PERMISSIONS_FAILURE: 'OrganizationModules/LIST_PERMISSIONS_FAILURE',

    GET_RESOURCE_ARRAY: 'OrganizationModules/GET_RESOURCE_ARRAY',
    GET_RESOURCE_ARRAY_REQUEST: 'OrganizationModules/GET_RESOURCE_ARRAY_REQUEST',
    GET_RESOURCE_ARRAY_SUCCESS: 'OrganizationModules/GET_RESOURCE_ARRAY_SUCCESS',
    GET_RESOURCE_ARRAY_FAILURE: 'OrganizationModules/GET_RESOURCE_ARRAY_FAILURE',

    LOAD_ORGANISATION_FOR_MODULE: 'OrganizationModules/LOAD_ORGANISATION_FOR_MODULE',
    LOAD_ORGANISATION_FOR_MODULE_REQUEST: 'OrganizationModules/LOAD_ORGANISATION_FOR_MODULE_REQUEST',
    LOAD_ORGANISATION_FOR_MODULE_SUCCESS: 'OrganizationModules/LOAD_ORGANISATION_FOR_MODULE_SUCCESS',
    LOAD_ORGANISATION_FOR_MODULE_FAILURE: 'OrganizationModules/LOAD_ORGANISATION_FOR_MODULE_FAILURE',

    UPDATE_ORGANISATION_MAPPING: 'OrganizationModules/UPDATE_ORGANISATION_MAPPING',
    UPDATE_ORGANISATION_MAPPING_REQUEST: 'OrganizationModules/UPDATE_ORGANISATION_MAPPING_REQUEST',
    UPDATE_ORGANISATION_MAPPING_SUCCESS: 'OrganizationModules/UPDATE_ORGANISATION_MAPPING_SUCCESS',
    UPDATE_ORGANISATION_MAPPING_FAILURE: 'OrganizationModules/UPDATE_ORGANISATION_MAPPING_FAILURE',

    UPDATE_MODULE_DETAIL_VIEW: 'OrganizationModules/UPDATE_MODULE_DETAIL_VIEW',
    UPDATE_MODULE_DETAIL_VIEW_REQUEST: 'OrganizationModules/UPDATE_MODULE_DETAIL_VIEW_REQUEST',
    UPDATE_MODULE_DETAIL_VIEW_SUCCESS: 'OrganizationModules/UPDATE_MODULE_DETAIL_VIEW_SUCCESS',
    UPDATE_MODULE_DETAIL_VIEW_FAILURE: 'OrganizationModules/UPDATE_MODULE_DETAIL_VIEW_FAILURE',

    SAVE_RESOURCE_ACTION: 'OrganizationModules/SAVE_RESOURCE_ACTION',
    SAVE_RESOURCE_ACTIONS_SUCCESS: 'OrganizationModules/SAVE_RESOURCE_ACTIONS_SUCCESS',
    SAVE_RESOURCE_ACTIONS_REQUEST: 'OrganizationModules/SAVE_RESOURCE_ACTIONS_REQUEST',
    SAVE_RESOURCE_ACTIONS_FAILURE: 'OrganizationModules/SAVE_RESOURCE_ACTIONS_FAILURE'

};

export const listModulesConfigurations = (data) => action(types.LIST_MODULES, { data });

export const getModuleDetailsById = (id) => action(types.GET_MODULE_BY_ID, { id });

export const listPermissionControllers = () => action(types.LIST_PERMISSIONS);

export const fetchResourceActions = (data) => action(types.GET_RESOURCE_ARRAY, { data });

export const loadOrganisationListForModule = (id) => action(types.LOAD_ORGANISATION_FOR_MODULE, { id });

export const updateUserOrganizationMapping = (id, data) => action(types.UPDATE_ORGANISATION_MAPPING, { id, data });

export const editModuleDetails = (id, values) => action(types.UPDATE_MODULE_DETAIL_VIEW, { id, values });

export const saveResourceActions = (data) => action(types.SAVE_RESOURCE_ACTION, { data });
