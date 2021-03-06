import { action } from '../../common';

export const types = {
    FETCH_INITIAL_REGULAR_ROLE: 'Roles/FETCH_INITIAL_REGULAR_ROLE',
    FETCH_INITIAL_REGULAR_ROLE_REQUEST: 'Roles/FETCH_INITIAL_REGULAR_ROLE_REQUEST',
    FETCH_INITIAL_REGULAR_ROLE_SUCCESS: 'Roles/FETCH_INITIAL_REGULAR_ROLE_SUCCESS',
    FETCH_INITIAL_REGULAR_ROLE_FAILURE: 'Roles/FETCH_INITIAL_REGULAR_ROLE_FAILURE',

    FETCH_INITIAL_ORGANIZATIONAL_ROLE: 'Roles/FETCH_INITIAL_ORGANIZATIONAL_ROLE',
    FETCH_INITIAL_ORGANIZATIONAL_REQUEST: 'Roles/FETCH_INITIAL_ORGANIZATIONAL_REQUEST',
    FETCH_INITIAL_ORGANIZATIONAL_SUCCESS: 'Roles/FETCH_INITIAL_ORGANIZATIONAL_SUCCESS',
    FETCH_INITIAL_ORGANIZATIONAL_FAILURE: 'Roles/FETCH_INITIAL_ORGANIZATIONAL_FAILURE',

    LIST_REGULAR_ROLE: 'Roles/LIST_REGULAR_ROLE',
    LIST_REGULAR_ROLE_REQUEST: 'Roles/LIST_REGULAR_ROLE_REQUEST',
    LIST_REGULAR_ROLE_SUCCESS: 'Roles/LIST_REGULAR_ROLE_SUCCESS',
    LIST_REGULAR_ROLE_FAILURE: 'Roles/LIST_REGULAR_ROLE_FAILURE',

    LIST_ORGANISATION_ROLE: 'Roles/LIST_ORGANISATION_ROLE',
    LIST_ORGANISATION_ROLE_REQUEST: 'Roles/LIST_ORGANISATION_ROLE_REQUEST',
    LIST_ORGANISATION_ROLE_SUCCESS: 'Roles/LIST_ORGANISATION_ROLE_SUCCESS',
    LIST_ORGANISATION_ROLE_FAILURE: 'Roles/LIST_ORGANISATION_ROLE_FAILURE',

    DELETE_ORGANISATIONAL_ROLE: 'Roles/DELETE_ORGANISATIONAL_ROLE',
    DELETE_ORGANISATIONAL_ROLE_REQUEST: 'Roles/DELETE_ORGANISATIONAL_ROLE_REQUEST',
    DELETE_ORGANISATIONAL_ROLE_SUCCESS: 'Roles/DELETE_ORGANISATIONAL_ROLE_SUCCESS',
    DELETE_ORGANISATIONAL_ROLE_FAILURE: 'Roles/DELETE_ORGANISATIONAL_ROLE_FAILURE',

    DELETE_REGULAR_ROLE: 'Roles/DELETE_REGULAR_ROLE',
    DELETE_REGULAR_ROLE_REQUEST: 'Roles/DELETE_REGULAR_ROLE_REQUEST',
    DELETE_REGULAR_ROLE_SUCCESS: 'Roles/DELETE_REGULAR_ROLE_SUCCESS',
    DELETE_REGULAR_ROLE_FAILURE: 'Roles/DELETE_REGULAR_ROLE_FAILURE',

    ADD_ROLE: 'Roles/ADD_ROLE',
    ADD_ROLE_REQUEST: 'Roles/ADD_ROLE_REQUEST',
    ADD_ROLE_SUCCESS: 'Roles/ADD_ROLE_SUCCESS',
    ADD_ROLE_FAILURE: 'Roles/ADD_ROLE_FAILURE',

    SET_ROLE: 'Roles/SET_ROLE',
    SET_ROLE_SUCCESS: 'Roles/SET_ROLE_SUCCESS',
    SET_ROLE_REQUEST: 'Roles/SET_ROLE_REQUEST',
    SET_ROLE_FAILURE: 'Roles/SET_ROLE_FAILURE',

    UPDATE_ROLE: 'Roles/UPDATE_ROLE',
    UPDATE_ROLE_REQUEST: 'Roles/UPDATE_ROLE_REQUEST',
    UPDATE_ROLE_SUCCESS: 'Roles/UPDATE_ROLE_SUCCESS',
    UPDATE_ROLE_FAILURE: 'Roles/UPDATE_ROLE_FAILURE',

    LIST_PERMISSION_CONTROLLER: 'Roles/LIST_PERMISSION_CONTROLLER',
    LIST_PERMISSION_CONTROLLER_REQUEST: 'Roles/LIST_PERMISSION_CONTROLLER_REQUEST',
    LIST_PERMISSION_CONTROLLER_SUCCESS: 'Roles/LIST_PERMISSION_CONTROLLER_SUCCESS',
    LIST_PERMISSION_CONTROLLER_FAILURE: 'Roles/LIST_PERMISSION_CONTROLLE_FAILURE',

    LIST_PERMISSION_CONTROLLER_BY_ROLE_ID: 'Roles/LIST_PERMISSION_CONTROLLER_BY_ROLE_ID',
    LIST_PERMISSION_CONTROLLER_REQUEST_BY_ROLE_ID: 'Roles/LIST_PERMISSION_CONTROLLER_REQUEST_BY_ROLE_ID',
    LIST_PERMISSION_CONTROLLER_SUCCESS_BY_ROLE_ID: 'Roles/LIST_PERMISSION_CONTROLLER_SUCCESS_BY_ROLE_ID',
    LIST_PERMISSION_CONTROLLER_FAILURE_BY_ROLE_ID: 'Roles/LIST_PERMISSION_CONTROLLE_FAILURE_BY_ROLE_ID',

    SEND_ACTION_IDS: 'Roles/SEND_ACTION_IDS',
    SEND_ACTION_IDS_REQUEST: 'Roles/SEND_ACTION_IDS_REQUEST',
    SEND_ACTION_IDS_SUCCESS: 'Roles/SEND_ACTION_IDS_SUCCESS',
    SEND_ACTION_IDS_FAILURE: 'Roles/SEND_ACTION_IDS_FAILURE',

    GET_ROLE_PERMISSION_FOR_EDIT: 'Roles/GET_ROLE_PERMISSION_FOR_EDIT',
    GET_ROLE_PERMISSION_FOR_EDIT_REQUEST: 'Roles/GET_ROLE_PERMISSION_FOR_EDIT_REQUEST',
    GET_ROLE_PERMISSION_FOR_EDIT_SUCCESS: 'Roles/GET_ROLE_PERMISSION_FOR_EDIT_SUCCESS',
    GET_ROLE_PERMISSION_FOR_EDIT_FAILURE: 'Roles/GET_ROLE_PERMISSION_FOR_EDIT_FAILURE',

    SEND_PERMISSION_FOR_EDIT: 'Roles/SEND_PERMISSION_FOR_EDIT',
    SEND_PERMISSION_FOR_EDIT_REQUEST: 'Roles/SEND_PERMISSION_FOR_EDIT_REQUEST',
    SEND_PERMISSION_FOR_EDIT_SUCCESS: 'Roles/SEND_PERMISSION_FOR_EDIT_SUCCESS',
    SEND_PERMISSION_FOR_EDIT_FAILURE: 'Roles/SEND_PERMISSION_FOR_EDIT_FAILURE',

    GET_USERS_BASED_ON_ROLE_ID: 'Roles/GET_USERS_BASED_ON_ROLE_ID',
    GET_USERS_BASED_ON_ROLE_ID_REQUEST: 'Roles/GET_USERS_BASED_ON_ROLE_ID_REQUEST',
    GET_USERS_BASED_ON_ROLE_ID_SUCCESS: 'Roles/GET_USERS_BASED_ON_ROLE_ID_SUCCESS',
    GET_USERS_BASED_ON_ROLE_ID_FAILURE: 'Roles/GET_USERS_BASED_ON_ROLE_ID_FAILURE',

    UPDATE_USERS_IN_ROLES: 'Roles/UPDATE_USERS_IN_ROLES',
    UPDATE_USERS_IN_ROLES_REQUEST: 'Roles/UPDATE_USERS_IN_ROLES_REQUEST',
    UPDATE_USERS_IN_ROLES_SUCCESS: 'Roles/UPDATE_USERS_IN_ROLES_SUCCESS',
    UPDATE_USERS_IN_ROLES_FAILURE: 'Roles/UPDATE_USERS_IN_ROLES_FAILURE',

    FETCH_RESOURCE_ACTIONS: 'Roles/FETCH_RESOURCE_ACTIONS',
    FETCH_RESOURCE_ACTIONS_REQUEST: 'Roles/FETCH_RESOURCE_ACTIONS_REQUEST',
    FETCH_RESOURCE_ACTIONS_SUCCESS: 'Roles/FETCH_RESOURCE_ACTIONS_SUCCESS',
    FETCH_RESOURCE_ACTIONS_FAILURE: 'Roles/FETCH_RESOURCE_ACTIONS_FAILURE',

    SAVE_RESOURCE_ACTIONS: 'Roles/SAVE_RESOURCE_ACTIONS',
    SAVE_RESOURCE_ACTIONS_REQUEST: 'Roles/SAVE_RESOURCE_ACTIONS_REQUEST',
    SAVE_RESOURCE_ACTIONS_SUCCESS: 'Roles/SAVE_RESOURCE_ACTIONS_SUCCESS',
    SAVE_RESOURCE_ACTIONS_FAILURE: 'Roles/SAVE_RESOURCE_ACTIONS_FAILURE',

    UPDATE_RESOURCE_ACTIONS: 'Roles/UPDATE_RESOURCE_ACTIONS',
    UPDATE_RESOURCE_ACTIONS_REQUEST: 'Roles/UPDATE_RESOURCE_ACTIONS_REQUEST',
    UPDATE_RESOURCE_ACTIONS_SUCCESS: 'Roles/UPDATE_RESOURCE_ACTIONS_SUCCESS',
    UPDATE_RESOURCE_ACTIONS_FAILURE: 'Roles/UPDATE_RESOURCE_ACTIONS_FAILURE',

    SET_CHECKBOX_VALUE: 'Roles/SET_CHECKBOX_VALUE',
    SET_ROLE_TYPE: 'Roles/SET_ROLE_TYPE',
    SET_RESOURCE_ACTION_ARRAY: 'Roles/SET_RESOURCE_ACTION_ARRAY',
    REMOVING_BIT_WISE_VALUE_ARRAY: 'Roles/REMOVING_BIT_WISE_VALUE_ARRAY',
    REMOVE_RESOURCE_ARRAY_ON_INITIAL_RENDER: 'Roles/REMOVE_RESOURCE_ARRAY_ON_INITIAL_RENDER',
    CHANGE_CHECK_BOX_STATE: 'Roles/CHANGE_CHECK_BOX_STATE',
    TO_STORE_BITWISE_VALUE: 'Roles/TO_STORE_BITWISE_VALUE',
    MINUS_ACTION_IDS: 'Roles/MINUS_ACTION_IDS',

    SET_DATA: 'Role/SET_DATA',

    SET_USER_ROLE_TAB_INDEX: 'UserRole/SET_USER_ROLE_TAB_INDEX',
    SET_USER_ROLE_EDIT_TAB_INDEX: 'UserRole/SET_USER_ROLE_EDIT_TAB_INDEX',

    FETCH_ASSIGN_ROLE_TO_USER: 'UserRole/FETCH_ASSIGN_ROLE_TO_USER',
    FETCH_ASSIGN_ROLE_TO_USER_REQUEST: 'UserRole/FETCH_ASSIGN_ROLE_TO_USER_REQUEST',
    FETCH_ASSIGN_ROLE_TO_USER_SUCCESS: 'UserRole/FETCH_ASSIGN_ROLE_TO_USER_SUCCESS',
    FETCH_ASSIGN_ROLE_TO_USER_FAILURE: 'UserRole/FETCH_ASSIGN_ROLE_TO_USER_FAILURE',

    SUBMIT_ASSIGN_ROLE_TO_USER: 'UserRole/SUBMIT_ASSIGN_ROLE_TO_USER',
    SUBMIT_ASSIGN_ROLE_TO_USER_REQUEST: 'UserRole/SUBMIT_ASSIGN_ROLE_TO_USER_REQUEST',
    SUBMIT_ASSIGN_ROLE_TO_USER_SUCCESS: 'UserRole/SUBMIT_ASSIGN_ROLE_TO_USER_SUCCESS',
    SUBMIT_ASSIGN_ROLE_TO_USER_FAILURE: 'UserRole/SUBMIT_ASSIGN_ROLE_TO_USER_FAILURE',

    FETCH_VIEWS: 'Roles/FETCH_VIEWS',
    FETCH_VIEWS_REQUEST: 'Roles/FETCH_VIEWS_REQUEST',
    FETCH_VIEWS_SUCCESS: 'Roles/FETCH_VIEWS_SUCCESS',
    FETCH_VIEWS_FAILURE: 'Roles/FETCH_VIEWS_FAILURE',

    FETCH_LEVELS: 'Roles/FETCH_LEVELS',
    FETCH_LEVELS_REQUEST: 'Roles/FETCH_LEVELS_REQUEST',
    FETCH_LEVELS_SUCCESS: 'Roles/FETCH_LEVELS_SUCCESS',
    FETCH_LEVELS_FAILURE: 'Roles/FETCH_LEVELS_FAILURE',

    SUBMIT_CONFIG_DATA_ACCESS: 'Roles/SUBMIT_CONFIG_DATA_ACCESS',
    SUBMIT_CONFIG_DATA_ACCESS_REQUEST: 'Roles/SUBMIT_CONFIG_DATA_ACCESS_REQUEST',
    SUBMIT_CONFIG_DATA_ACCESS_SUCCESS: 'Roles/SUBMIT_CONFIG_DATA_ACCESS_SUCCESS',
    SUBMIT_CONFIG_DATA_ACCESS_FAILURE: 'Roles/SUBMIT_CONFIG_DATA_ACCESS_FAILURE',


    FETCH_CONFIG_DATA_ACCESS_BY_ID: 'Roles/FETCH_CONFIG_DATA_ACCESS_BY_ID',
    FETCH_CONFIG_DATA_ACCESS_BY_ID_REQUEST: 'Roles/FETCH_CONFIG_DATA_ACCESS_BY_ID_REQUEST',
    FETCH_CONFIG_DATA_ACCESS_BY_ID_SUCCESS: 'Roles/FETCH_CONFIG_DATA_ACCESS_BY_ID_SUCCESS',
    FETCH_CONFIG_DATA_ACCESS_BY_ID_FAILURE: 'Roles/FETCH_CONFIG_DATA_ACCESS_BY_ID_FAILURE',

    SUBMIT_ROLE_ASSIGNEE_DATA_ACCESS: 'UserRole/SUBMIT_ROLE_ASSIGNEE_DATA_ACCESS',
    SUBMIT_ROLE_ASSIGNEE_DATA_ACCESS_REQUEST: 'UserRole/SUBMIT_ROLE_ASSIGNEE_DATA_ACCESS_REQUEST',
    SUBMIT_ROLE_ASSIGNEE_DATA_ACCESS_SUCCESS: 'UserRole/SUBMIT_ROLE_ASSIGNEE_DATA_ACCESS_SUCCESS',
    SUBMIT_ROLE_ASSIGNEE_DATA_ACCESS_FAILURE: 'UserRole/SUBMIT_ROLE_ASSIGNEE_DATA_ACCESS_FAILURE'

};
//to list regular roles
export const listRegularRoles = (data) => action(types.LIST_REGULAR_ROLE, { data });
//to list organisation roles
export const listOrganizationRoles = (data) => action(types.LIST_ORGANISATION_ROLE, { data });
//to delete organisational role
export const deleteOrganisationalRole = (id, page, rowsPerPage, totalCount) => action(types.DELETE_ORGANISATIONAL_ROLE, { id, page, rowsPerPage, totalCount });
//to delete regular role
export const deleteRegularRole = (id, page, rowsPerPage, totalCount) => action(types.DELETE_REGULAR_ROLE, { id, page, rowsPerPage, totalCount });

//to add role
export const addRole = (data, roleType) => action(types.ADD_ROLE, { data, roleType });
//to get a role
export const setRole = (id) => action(types.SET_ROLE, { id });
//to update a role

export const setData = (data) => action(types.SET_DATA, { data });
export const updateRole = (id, data) => action(types.UPDATE_ROLE, { id, data });

export const setRoleType = (data) => action(types.SET_ROLE_TYPE, { data });

export const getPermissionswithRoleId = (id) => action(types.LIST_PERMISSION_CONTROLLER_BY_ROLE_ID, { id });
export const getPermissionswithRoleIdToEdit = (eventValue, id) => action(types.GET_ROLE_PERMISSION_FOR_EDIT, { eventValue, id });

export const permissionValue = (data) => action(types.SET_CHECKBOX_VALUE, { data });
export const sendingActionIds = (data) => action(types.SEND_ACTION_IDS, { data });
export const setResourceAtctionArray = (array, actionIds) => action(types.SET_RESOURCE_ACTION_ARRAY, { array, actionIds });

export const changeCheckboxState = (data) => action(types.CHANGE_CHECK_BOX_STATE, { data });
export const storeBitWiseValue = (data) => action(types.TO_STORE_BITWISE_VALUE, { data });
export const minusActionIds = (data) => action(types.MINUS_ACTION_IDS, { data });

export const sendingActionIdsForEdit = (id, data) => action(types.SEND_PERMISSION_FOR_EDIT, { id, data });
export const removeResourceArray = () => action(types.REMOVE_RESOURCE_ARRAY_ON_INITIAL_RENDER);

export const getUsersBasedOnRoleId = (id) => action(types.GET_USERS_BASED_ON_ROLE_ID, { id });
export const removingbitWiseValueArray = () => action(types.REMOVING_BIT_WISE_VALUE_ARRAY);

//Actions Used in Permission Tab
export const listPermissionControllers = () => action(types.LIST_PERMISSION_CONTROLLER);
export const updateUsersInRole = (data) => action(types.UPDATE_USERS_IN_ROLES, { data });
export const fetchResourceActions = (data) => action(types.FETCH_RESOURCE_ACTIONS, { data });
export const saveResourceActions = (data) => action(types.SAVE_RESOURCE_ACTIONS, { data });
// export const fetchInitialOrganizationalRoles = () => action(types.FETCH_INITIAL_ORGANIZATIONAL_ROLE);
export const fetchInitialRegularRoles = () => action(types.FETCH_INITIAL_REGULAR_ROLE);

export const setTabIndex = (data) => action(types.SET_USER_ROLE_TAB_INDEX, { data });
export const setEditTabIndex = (data) => action(types.SET_USER_ROLE_EDIT_TAB_INDEX, { data });

export const fetchAssignRoleToUser = (data) => action(types.FETCH_ASSIGN_ROLE_TO_USER, { data });

export const submitAssignRole = (data) => action(types.SUBMIT_ASSIGN_ROLE_TO_USER, { data });

export const submitDataAccessAssignee = (data) => action(types.SUBMIT_ROLE_ASSIGNEE_DATA_ACCESS, { data });

export const fetchViews = (data) => action(types.FETCH_VIEWS, { data });
export const fetchLevels = (data) => action(types.FETCH_LEVELS, { data });
export const submitDataAccess = (data) => action(types.SUBMIT_CONFIG_DATA_ACCESS, { data });
export const getDatatAccessById = (id) => action(types.FETCH_CONFIG_DATA_ACCESS_BY_ID, { id });
