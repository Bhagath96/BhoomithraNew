import { action } from '../../common';

export const types = {
    FETCH_ALL_WARDS: 'Wards/FETCH_ALL_WARDS',
    FETCH_ALL_WARDS_REQUEST: 'Wards/FETCH_ALL_WARDS_REQUEST',
    FETCH_ALL_WARDS_SUCCESS: 'Wards/FETCH_ALL_WARDS_SUCCESS',
    FETCH_ALL_WARDS_FAILURE: 'Wards/FETCH_ALL_WARDS_FAILURE',

    LIST_ALL_WARDS: 'Wards/LIST_ALL_WARDS',
    LIST_ALL_WARDS_REQUEST: 'Wards/LIST_ALL_WARDS_REQUEST',
    LIST_ALL_WARDS_SUCCESS: 'Wards/LIST_ALL_WARDS_SUCCESS',
    LIST_ALL_WARDS_FAILURE: 'Wards/LIST_ALL_WARDS_FAILURE',

    FETCH_ALL_RESIDENTIAL_ASSOCIATIONS: 'Wards/FETCH_ALL_RESIDENTIAL_ASSOCIATIONS',
    FETCH_ALL_RESIDENTIAL_ASSOCIATIONS_REQUEST: 'Wards/FETCH_ALL_RESIDENTIAL_ASSOCIATIONS_REQUEST',
    FETCH_ALL_RESIDENTIAL_ASSOCIATIONS_SUCCESS: 'Wards/FETCH_ALL_RESIDENTIAL_ASSOCIATIONS_SUCCESS',
    FETCH_ALL_RESIDENTIAL_ASSOCIATIONS_FAILURE: 'Wards/FETCH_ALL_RESIDENTIAL_ASSOCIATIONS_FAILURE',

    FETCH_ALL_LSGI: 'Wards/FETCH_ALL_LSGI',
    FETCH_ALL_LSGI_REQUEST: 'Wards/FETCH_ALL_LSGI_REQUEST',
    FETCH_ALL_LSGI_SUCCESS: 'Wards/FETCH_ALL_LSGI_SUCCESS',
    FETCH_ALL_LSGI_FAILURE: 'Wards/FETCH_ALL_LSGI_FAILURE',

    FETCH_ALL_STATE: 'Wards/FETCH_ALL_STATE',
    FETCH_ALL_STATE_REQUEST: 'Wards/FETCH_ALL_STATE_REQUEST',
    FETCH_ALL_STATE_SUCCESS: 'Wards/FETCH_ALL_STATE_SUCCESS',
    FETCH_ALL_STATE_FAILURE: 'Wards/FETCH_ALL_STATE_FAILURE',

    FETCH_ALL_DISTRICT: 'Wards/FETCH_ALL_DISTRICT',
    FETCH_ALL_DISTRICT_REQUEST: 'Wards/FETCH_ALL_DISTRICT_REQUEST',
    FETCH_ALL_DISTRICT_SUCCESS: 'Wards/FETCH_ALL_DISTRICT_SUCCESS',
    FETCH_ALL_DISTRICT_FAILURE: 'Wards/FETCH_ALL_DISTRICT_FAILURE',

    FETCH_ALL_ASSOCIATION_TYPE: 'Wards/FETCH_ALL_ASSOCIATION_TYPE',
    FETCH_ALL_ASSOCIATION_TYPE_REQUEST: 'Wards/FETCH_ALL_ASSOCIATION_TYPE_REQUEST',
    FETCH_ALL_ASSOCIATION_TYPE_SUCCESS: 'Wards/FETCH_ALL_ASSOCIATION_TYPE_SUCCESS',
    FETCH_ALL_ASSOCIATION_TYPE_FAILURE: 'Wards/FETCH_ALL_ASSOCIATION_TYPE_FAILURE',

    FETCH_WARD_BY_ID: 'Wards/ FETCH_WARD_BY_ID',
    FETCH_WARD_BY_ID_REQUEST: 'Wards/ FETCH_WARD_BY_ID_REQUEST',
    FETCH_WARD_BY_ID_SUCCESS: 'Wards/ FETCH_WARD_BY_ID_SUCCESS',
    FETCH_WARD_BY_ID_FAILURE: 'Wards/ FETCH_WARD_BY_ID_FAILURE',

    FETCH_RA_BY_ID: 'Wards/ FETCH_RA_BY_ID',
    FETCH_RA_BY_ID_REQUEST: 'Wards/ FETCH_RA_BY_ID_REQUEST',
    FETCH_RA_BY_ID_SUCCESS: 'Wards/ FETCH_RA_BY_ID_SUCCESS',
    FETCH_RA_BY_ID_FAILURE: 'Wards/ FETCH_RA_BY_ID_FAILURE',

    SET_SELECTED_RA: 'Wards/ SET_SELECTED_RA',

    UPDATE_WARD: 'Wards/UPDATE_WARD',
    UPDATE_WARD_REQUEST: 'Wards/UPDATE_WARD_REQUEST',
    UPDATE_WARD_SUCCESS: 'Wards/UPDATE_WARD_SUCCESS',
    UPDATE_WARD_FAILURE: 'Wards/UPDATE_WARD_FAILURE',

    ADD_WARD: 'Wards/ADD_WARD',
    ADD_WARD_REQUEST: 'Wards/ADD_WARD_REQUEST',
    ADD_WARD_SUCCESS: 'Wards/ADD_WARD_SUCCESS',
    ADD_WARD_FAILURE: 'Wards/ADD_WARD_FAILURE',

    DELETE_WARD: 'Wards/DELETE_WARD',
    DELETE_WARD_REQUEST: 'Wards/DELETE_WARD_REQUEST',
    DELETE_WARD_SUCCESS: 'Wards/DELETE_WARD_SUCCESS',
    DELETE_WARD_FAILURE: 'Wards/DELETE_WARD_FAILURE',

    UPDATE_RESIDENTIAL_ASSOCIATION: 'Wards/UPDATE_RESIDENTIAL_ASSOCIATION',
    UPDATE_RESIDENTIAL_ASSOCIATION_REQUEST: 'Wards/UPDATE_RESIDENTIAL_ASSOCIATION_REQUEST',
    UPDATE_RESIDENTIAL_ASSOCIATION_SUCCESS: 'Wards/UPDATE_RESIDENTIAL_ASSOCIATION_SUCCESS',
    UPDATE_RESIDENTIAL_ASSOCIATION_FAILURE: 'Wards/UPDATE_RESIDENTIAL_ASSOCIATION_FAILURE',

    ADD_RESIDENTIAL_ASSOCIATION: 'Wards/ADD_RESIDENTIAL_ASSOCIATION',
    ADD_RESIDENTIAL_ASSOCIATION_REQUEST: 'Wards/ADD_RESIDENTIAL_ASSOCIATION_REQUEST',
    ADD_RESIDENTIAL_ASSOCIATION_SUCCESS: 'Wards/ADD_RESIDENTIAL_ASSOCIATION_SUCCESS',
    ADD_RESIDENTIAL_ASSOCIATION_FAILURE: 'Wards/ADD_RESIDENTIAL_ASSOCIATION_FAILURE',

    DELETE_RESIDENTIAL_ASSOCIATION: 'Wards/DELETE_RESIDENTIAL_ASSOCIATION',
    DELETE_RESIDENTIAL_ASSOCIATION_REQUEST: 'Wards/DELETE_RESIDENTIAL_ASSOCIATION_REQUEST',
    DELETE_RESIDENTIAL_ASSOCIATION_SUCCESS: 'Wards/DELETE_RESIDENTIAL_ASSOCIATION_SUCCESS',
    DELETE_RESIDENTIAL_ASSOCIATION_FAILURE: 'Wards/DELETE_RESIDENTIAL_ASSOCIATION_FAILURE',

    CLEAR_WARD_DETAILS_REDUCER: 'Wards/CLEAR_WARD_DETAILS_REDUCER',
    CLEAR_RA_DETAILS_REDUCER: 'Wards/CLEAR_RA_DETAILS_REDUCER',

    SET_FILTER_VALUES: 'Wards/SET_FILTER_VALUES',
    RESET_FILTER_VALUES: 'Wards/RESET_FILTER_VALUES',

    LIST_JSON_DATA_FOR_WARD_FILTER: 'Wards/LIST_JSON_DATA_FOR_WARD_FILTER',
    LIST_JSON_DATA_FOR_WARD_FILTER_REQUEST: 'Wards/LIST_JSON_DATA_FOR_WARD_FILTER_REQUEST',
    LIST_JSON_DATA_FOR_WARD_FILTER_SUCCESS: 'Wards/LIST_JSON_DATA_FOR_WARD_FILTER_SUCCESS',
    LIST_JSON_DATA_FOR_WARD_FILTER_FAILURE: 'Wards/LIST_JSON_DATA_FOR_WARD_FILTER_FAILURE',

    LIST_JSON_DATA_FOR_RA_FILTER: 'Wards/LIST_JSON_DATA_FOR_RA_FILTER',
    LIST_JSON_DATA_FOR_RA_FILTER_REQUEST: 'Wards/LIST_JSON_DATA_FOR_RA_FILTER_REQUEST',
    LIST_JSON_DATA_FOR_RA_FILTER_SUCCESS: 'Wards/LIST_JSON_DATA_FOR_RA_FILTER_SUCCESS',
    LIST_JSON_DATA_FOR_RA_FILTER_FAILURE: 'Wards/LIST_JSON_DATA_FOR_RA_FILTER_FAILURE',
    STORE_JSON_DATA_FOR_WARD: 'Wards/STORE_JSON_DATA_FOR_WARD',
    STORE_JSON_DATA_FOR_RA: 'Wards/STORE_JSON_DATA_FOR_RA',
    SET_WARD_TAB_INDEX: 'Wards/SET_WARD_TAB_INDEX',
    SET_RA_TAB_INDEX: 'Wards/SET_RA_TAB_INDEX',

    FETCH_RESIDENTIAL_ASSOCIATION_TEMPLATE: 'wards/FETCH_RESIDENTIAL_ASSOCIATION_TEMPLATE',
    RESIDENTIAL_ASSOCIATION_TEMPLATE_LOADING_FLAG: 'wards/RESIDENTIAL_ASSOCIATION_TEMPLATE_LOADING_FLAG',

    CONFIG_ISSUE_IN_ORG: 'wards/CONFIG_ISSUE_IN_ORG'

};

export const fetchAllLsgi = (districtId) => action(types.FETCH_ALL_LSGI, { districtId });
export const fetchAllState = () => action(types.FETCH_ALL_STATE);
export const fetchAllDistrict = (stateId) => action(types.FETCH_ALL_DISTRICT, { stateId });
export const fetchAllAssociationType = () => action(types.FETCH_ALL_ASSOCIATION_TYPE);

export const fetchAllWards = (data) => action(types.FETCH_ALL_WARDS, { data });
export const fetchWardById = (wardId) => action(types.FETCH_WARD_BY_ID, { wardId });
export const fetchRAById = (raId) => action(types.FETCH_RA_BY_ID, { raId });
export const setSelectedRA = (data) => action(types.SET_SELECTED_RA, { data });


export const updateWardData = (id, data) => action(types.UPDATE_WARD, { id, data });
export const addWardData = (data) => action(types.ADD_WARD, { data });
export const deleteWardData = (id) => action(types.DELETE_WARD, { id });

export const updateRAData = (data, id) => action(types.UPDATE_RESIDENTIAL_ASSOCIATION, { data, id });
export const addRAData = (data) => action(types.ADD_RESIDENTIAL_ASSOCIATION, { data });
export const deleteRAData = (id, wardId, answerId) => action(types.DELETE_RESIDENTIAL_ASSOCIATION, { id, wardId, answerId });

export const fetchAllRA = (data) => action(types.FETCH_ALL_RESIDENTIAL_ASSOCIATIONS, { data });


export const setFilter = (data) => action(types.SET_FILTER_VALUES, { data });
export const resetFilter = () => action(types.RESET_FILTER_VALUES);
export const listJsonDataForWard = (searchValue, searchKey, columnName) => action(types.LIST_JSON_DATA_FOR_WARD_FILTER, { searchValue, searchKey, columnName });
export const listJsonDataForRA = (searchValue, searchKey, columnName, wardId) => action(types.LIST_JSON_DATA_FOR_RA_FILTER, { searchValue, searchKey, columnName, wardId });

export const storeJsonDataForUser = (data) => action(types.STORE_JSON_DATA_FOR_WARD, { data });
export const storeJsonDataForRA = (data) => action(types.STORE_JSON_DATA_FOR_RA, { data });

// export const clearStateReducer = () => action(types.CLEAR_STATE_DETAILS_REDUCER);
export const clearSelectedRA = () => action(types.CLEAR_RA_DETAILS_REDUCER);
export const clearSelectedWard = () => action(types.CLEAR_WARD_DETAILS_REDUCER);
export const setTabIndex = (data) => action(types.SET_WARD_TAB_INDEX, { data });
export const setTabIndexRA = (data) => action(types.SET_RA_TAB_INDEX, { data });

export const fetchResidentialAssociationTemplate = (data) => action(types.FETCH_RESIDENTIAL_ASSOCIATION_TEMPLATE, { data });
export const configIssueError = () => action(types.CONFIG_ISSUE_IN_ORG);
export const residentialAssociationTemalateLoadFlag = (data) => action(types.RESIDENTIAL_ASSOCIATION_TEMPLATE_LOADING_FLAG, { data });
