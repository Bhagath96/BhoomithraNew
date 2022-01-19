import { action } from '../../common';

export const types = {
    COMMON_LOAD_STATE: 'Hierarchy/COMMON_LOAD_STATE',
    COMMON_LOAD_DISTRICT: 'Hierarchy/COMMON_LOAD_DISTRICT',
    COMMON_LOAD_DISTRICT_PANCHAYATH: 'Hierarchy/COMMON_LOAD_DISTRICT_PANCHAYATH',
    COMMON_LOAD_BLOCK_PANCHAYATH: 'Hierarchy/COMMON_LOAD_BLOCK_PANCHAYATH',
    COMMON_LOAD_LSGI: 'Hierarchy/COMMON_LOAD_LSGI',
    SET_PAGE_SIZE: 'SET_PAGE_SIZE',
    GET_ALL_LANGUAGES_REQUEST: 'GET_ALL_LANGUAGES_REQUEST',
    GET_ALL_LANGUAGES_SUCCESS: 'GET_ALL_LANGUAGES_SUCCESS',
    GET_ALL_LANGUAGES_FAILED: 'GET_ALL_LANGUAGES_FAILED',
    GET_ALL_LANGUAGES: 'GET_ALL_LANGUAGES',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    SHOW_NOTIFICATION: 'Common/SHOW_NOTIFICATION',
    SET_TABLE_PAGINATION: 'Common/SET_TABLE_PAGINATION',
    SET_TABLE_FILTER_CHIPS: 'Common/SET_TABLE_FILTER_CHIPS',
    SET_ADDITIONAL_TABLE_FILTERS: 'Common/SET_ADDITIONAL_TABLE_FILTERS',
    SET_ADDITIONAL_DROPDOWN_FILTER_DATA: 'Common/SET_ADDITIONAL_DROPDOWN_FILTER_DATA',
    SET_TABLE_FILTER_OPTIONS_LIST: 'Common/SET_TABLE_FILTER_OPTIONS_LIST',
    RESET_TABLE_FILTER_OPTIONS_LIST: 'Common/RESET_TABLE_FILTER_OPTIONS_LIST',
    SET_TABLE_FILTER_STATE: 'Common/SET_TABLE_FILTER_STATE',
    SET_TABLE_SELECTED_IDS: 'Common/SET_TABLE_SELECTED_IDS',
    SET_DROPDOWN_FILTER_OPTIONS: 'Common/SET_DROPDOWN_FILTER_OPTIONS',
    SET_PASSED_COLUMNS: 'Common/SET_PASSED_COLUMNS',

    FETCH_TABLE_FILTER_OPTIONS_LIST: 'Common/FETCH_TABLE_FILTER_OPTIONS_LIST',
    FETCH_TABLE_FILTER_OPTIONS_LIST_REQUEST: 'Common/FETCH_TABLE_FILTER_OPTIONS_LIST_REQUEST',
    FETCH_TABLE_FILTER_OPTIONS_LIST_SUCCESS: 'Common/FETCH_TABLE_FILTER_OPTIONS_LIST_SUCCESS',
    FETCH_TABLE_FILTER_OPTIONS_LIST_FAILURE: 'Common/FETCH_TABLE_FILTER_OPTIONS_LIST_FAILURE',

    FETCH_QR_CODE_REGEX: 'Common/FETCH_QR_CODE_REGEX',
    FETCH_QR_CODE_REGEX_REQUEST: 'Common/FETCH_QR_CODE_REGEX_REQUEST',
    FETCH_QR_CODE_REGEX_SUCCESS: 'Common/FETCH_QR_CODE_REGEX_SUCCESS',
    FETCH_QR_CODE_REGEX_FAILURE: 'Common/FETCH_QR_CODE_REGEX_FAILURE',

    CHECK_QR_CODE_EXISTS: 'Common/CHECK_QR_CODE_EXISTS',
    CHECK_QR_CODE_EXISTS_REQUEST: 'Common/CHECK_QR_CODE_EXISTS_REQUEST',
    CHECK_QR_CODE_EXISTS_SUCCESS: 'Common/CHECK_QR_CODE_EXISTS_SUCCESS',
    CHECK_QR_CODE_EXISTS_FAILURE: 'Common/CHECK_QR_CODE_EXISTS_FAILURE',

    SET_FILTERS_TO_INITIAL_VALUES: 'Common/SET_FILTERS_TO_INITIAL_VALUES',
    RESET_FILTER_BASED_ON_KEY: 'Common/RESET_FILTER_BASED_ON_KEY',
    SET_FILTERS_TO_INITIAL_DROPDOWN_LIST: 'Common/SET_FILTERS_TO_INITIAL_DROPDOWN_LIST',
    SET_FILTER_VALUES_FROM_INITIAL_STATE: 'Common/SET_FILTER_VALUES_FROM_INITIAL_STATE',

    //for basicConfig
    LIST_STATES: 'BasicConfig/LIST_STATES',
    LIST_STATES_REQUEST: 'BasicConfig/LIST_STATES_REQUEST',
    LIST_STATES_SUCCESS: 'BasicConfig/LIST_STATES_SUCCESS',
    LIST_STATES_FAILURE: 'BasicConfig/LIST_STATES_FAILURE',

    SET_BREAD_CRUMP_OBJECT: 'SET_BREAD_CRUMP_OBJECT',
    SET_BREAD_CRUMP_FROM_LOCAL_STORAGE: 'SET_BREAD_CRUMP_FROM_LOCAL_STORAGE',
    SET_BREAD_CRUMB_WITH_PATH: 'SET_BREAD_CRUMB_WITH_PATH',

    SET_FORM_CHANGE: 'Common/SET_FORM_CHANGE',
    RESET_FORM_CHANGE: 'Common/RESET_FORM_CHANGE',

    SET_ALL_SERVICE_PROVIDER_DROPDOWN: 'CommonModal/SET_ALL_SERVICE_PROVIDER_DROPDOWN',
    ALL_SERVICE_PROVIDER_DROPDOWN: 'CommonModal/ALL_SERVICE_PROVIDER_DROPDOWN',
    ALL_SERVICE_PROVIDER_DROPDOWN_REQUEST: 'CommonModal/ALL_SERVICE_PROVIDER_DROPDOWN_REQUEST',
    ALL_SERVICE_PROVIDER_DROPDOWN_SUCCESS: 'CommonModal/ALL_SERVICE_PROVIDER_DROPDOWN_SUCCESS',
    ALL_SERVICE_PROVIDER_DROPDOWN_FAILURE: 'CommonModal/ALL_SERVICE_PROVIDER_DROPDOWN_FAILURE',

    SET_ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN: 'CommonModal/SET_ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN',
    ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN: 'CommonModal/ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN',
    ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN_REQUEST: 'CommonModal/ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN_REQUEST',
    ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN_SUCCESS: 'CommonModal/ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN_SUCCESS',
    ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN_FAILURE: 'CommonModal/ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN_FAILURE',

    SET_ALL_SW_SP_BY_WARD_DROPDOWN: 'CommonModal/SET_ALL_SW_SP_BY_WARD_DROPDOWN',
    ALL_SW_SP_BY_WARD_DROPDOWN: 'CommonModal/ALL_SW_SP_BY_WARD_DROPDOWN',
    ALL_SW_SP_BY_WARD_DROPDOWN_REQUEST: 'CommonModal/ALL_SW_SP_BY_WARD_DROPDOWN_REQUEST',
    ALL_SW_SP_BY_WARD_DROPDOWN_SUCCESS: 'CommonModal/ALL_SW_SP_BY_WARD_DROPDOWN_SUCCESS',
    ALL_SW_SP_BY_WARD_DROPDOWN_FAILURE: 'CommonModal/ALL_SW_SP_BY_WARD_DROPDOWN_FAILURE',

    SET_ALL_SW_BY_SP_DROPDOWN: 'CommonModal/SET_ALL_SW_BY_SP_DROPDOWN',
    ALL_SW_BY_SP_DROPDOWN: 'CommonModal/ALL_SW_BY_SP_DROPDOWN',
    ALL_SW_BY_SP_DROPDOWN_REQUEST: 'CommonModal/ALL_SW_BY_SP_DROPDOWN_REQUEST',
    ALL_SW_BY_SP_DROPDOWN_SUCCESS: 'CommonModal/ALL_SW_BY_SP_DROPDOWN_SUCCESS',
    ALL_SW_BY_SP_DROPDOWN_FAILURE: 'CommonModal/ALL_SW_BY_SP_DROPDOWN_FAILURE'
};

export const commonTypes = {
    LOAD_LSGI_TYPES: 'Hierarchy/Common/LOAD_LSGI_TYPES',
    LOAD_LSGI_TYPES_REQUEST: 'Hierarchy/Common/LOAD_LSGI_TYPES_REQUEST',
    LOAD_LSGI_TYPES_SUCCESS: 'Hierarchy/Common/LOAD_LSGI_TYPES_SUCCESS',
    LOAD_LSGI_TYPES_FAILED: 'Hierarchy/Common/LOAD_LSGI_TYPES_FAILED',

    RENDER_MENU: 'RENDER_MENU'
};
export const keys = {
    COMMON_STATE: 'COMMON_STATE',
    COMMON_DISTRICT: 'COMMON_DISTRICT',
    COMMON_LSGI: 'COMMON_LSGI',
    COMMON_DISTRICT_PANCHAYATH: 'COMMON_DISTRICT_PANCHAYATH',
    COMMON_BLOCK_PANCHAYATH: 'COMMON_BLOCK_PANCHAYATH'

};

export const getAllLanguages = () => action(types.GET_ALL_LANGUAGES);

export const loadLSGITypes = () => action(commonTypes.LOAD_LSGI_TYPES);

export const loadStates = data => action(types.COMMON_LOAD_STATE, { data });

export const loadDistricts = data => action(types.COMMON_LOAD_DISTRICT, { data });

export const loadBlockPanchayath = data => action(types.COMMON_LOAD_BLOCK_PANCHAYATH, { data });

export const loadDistrictPanchayath = data => action(types.COMMON_LOAD_DISTRICT_PANCHAYATH, { data });

export const loadLSGI = data => action(types.COMMON_LOAD_LSGI, { data });

export const setPerPage = (paginationProperty, page, size) => action(types.SET_PAGE_SIZE, { paginationProperty, page, size });
export const setPageNo = (paginationProperty, size, page) => action(types.SET_PAGE_SIZE, { paginationProperty, size, page });
export const resetPagination = () => action(types.RESET_PAGINATION_FOR_QUESTION_LIST);
export const changeLanguage = (lang) => action(types.CHANGE_LANGUAGE, { lang });
export const fetchStateList = () => action(types.LIST_STATES);
export const setBreadcrumpObject = (data) => action(types.SET_BREAD_CRUMP_OBJECT, { data });
export const setBreadCrumbFromLocalStorage = (data) => action(types.SET_BREAD_CRUMP_FROM_LOCAL_STORAGE, { data });
export const setBreadCrumbObjWithPath = (data) => action(types.SET_BREAD_CRUMB_WITH_PATH, { data });
export const showNotification = (data) => action(types.SHOW_NOTIFICATION, { data });

export const setFormChange = (data) => action(types.SET_FORM_CHANGE, { data });
export const resetFormChange = () => action(types.RESET_FORM_CHANGE);

/**
 * setTablePagination => Common action to set Page props in common store
 *
 * @param {Key:TableKey,pagination:{page,size,count}} data
 *
 * @returns
 */

export const setTablePagination = (data) => action(types.SET_TABLE_PAGINATION, { data });

/**
 * setTableFilterChips => Common action to set filter values in Common store
 *
 * @param {Key:TableKey,chips:{page,size,count}} data
 *
 * @returns
 */

export const setTableFilterChips = (data) => action(types.SET_TABLE_FILTER_CHIPS, { data });

/**
 * setAdditionalTableFilters => Common action to set Additional filter values in Common store
 *
 * @param {Key:TableKey,filters:{}} data
 *
 * @returns
 */

export const setAdditionalTableFilters = (data) => action(types.SET_ADDITIONAL_TABLE_FILTERS, { data });

export const setAdditionalDropDownFilters = (data) => action(types.SET_ADDITIONAL_DROPDOWN_FILTER_DATA, { data });

export const fetchTableDropdownFilterList = (data) => action(types.FETCH_TABLE_FILTER_OPTIONS_LIST, { data });

export const setTableDropdownFilterList = (data) => action(types.SET_TABLE_FILTER_OPTIONS_LIST, { data });

export const resetTableDropdownFilterList = (data) => action(types.RESET_TABLE_FILTER_OPTIONS_LIST, { data });

export const setTableFilterState = (data) => action(types.SET_TABLE_FILTER_STATE, { data });

export const setSelectedIds = (data) => action(types.SET_TABLE_SELECTED_IDS, { data });

export const setPassedColumns = (data) => action(types.SET_PASSED_COLUMNS, { data });

export const setDropdownFilterOptions = (data) => action(types.SET_DROPDOWN_FILTER_OPTIONS, { data });

export const resetFilter = (data) => action(types.RESET_FILTER_BASED_ON_KEY, { data });

export const setInitialFilterList = (data) => action(types.SET_FILTERS_TO_INITIAL_DROPDOWN_LIST, { data });

export const setFilterValuesFromInitialStates = (data) => action(types.SET_FILTER_VALUES_FROM_INITIAL_STATE, { data });

export const fetchQRCodeRegEx = (data) => action(types.FETCH_QR_CODE_REGEX, { data });

export const checkQRCodeExists = (data) => action(types.CHECK_QR_CODE_EXISTS, { data });

export const getAllServiceProviderUnderOrg = (data) => action(types.ALL_SERVICE_PROVIDER_DROPDOWN, { data });

export const setCommonServiceProvider = (data) => action(types.SET_ALL_SERVICE_PROVIDER_DROPDOWN, { data });

export const getAllWardsUnderServiceProvider = (data) => action(types.ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN, { data });

export const setWards = (data) => action(types.SET_ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN, { data });

export const getAllSwSuperVisorUnderWard = (data) => action(types.ALL_SW_SP_BY_WARD_DROPDOWN, { data });

export const setServiceWorkerSupervisor = (data) => action(types.SET_ALL_SW_SP_BY_WARD_DROPDOWN, { data });

export const getAllServiceWorkersUnderSupervisor = (data) => action(types.ALL_SW_BY_SP_DROPDOWN, { data });

export const setServiceWorker = (data) => action(types.SET_ALL_SW_BY_SP_DROPDOWN, { data });
