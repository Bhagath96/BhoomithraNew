import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';
export function loadLSGITypes({ types, body }) {
    let payload = {
        types,
        body
    };
    return {
        url: URL.COMMON.LOAD_LSGI_TYPES,
        api: restAPI.get,
        payload
    };
}

export function loadStates({ types, body }) {
    let payload = {
        types,
        body
    };
    return {
        url: URL.COMMON.LIST_STATE,
        api: restAPI.get,
        payload
    };
}

export function loadDistricts({ types, body }) {
    let payload = {
        types,
        params: { stateId: body.stateId, type: 'dropdown' }

    };
    return {
        url: URL.COMMON.LOAD_DISTRICTS,
        api: restAPI.get,
        payload
    };
}

export function loadBlockPanchayath({ types, districtId }) {
    let payload = {
        types,
        params: { districtId: districtId, type: 'dropdown' }
    };
    return {
        url: URL.COMMON.LOAD_BLOCK_PANCHAYATHS,
        api: restAPI.get,
        payload
    };
}

export function loadDistrictPanchayath({ types, districtId }) {
    let payload = {
        types,
        params: { districtId: districtId, type: 'dropdown' }
    };
    return {
        url: URL.COMMON.LOAD_DISTRICT_PANCHAYATHS,
        api: restAPI.get,
        payload
    };
}

export function loadLSGI({ types, params }) {
    let payload = {
        types,
        params: { ...params, type: 'dropdown' }

    };
    return {
        url: URL.COMMON.LOAD_LSGI,
        api: restAPI.get,
        payload
    };
}

export function loadLanguages() {
    let payload = {
        types: [ActionTypes.GET_ALL_LANGUAGES_REQUEST, ActionTypes.GET_ALL_LANGUAGES_SUCCESS, ActionTypes.GET_ALL_LANGUAGES_FAILED]
    };
    return {
        url: URL.COMMON.LOAD_LANGUAGES,
        api: restAPI.get,
        payload
    };
}
export function fetchState() {
    let payload = {
        types: [ActionTypes.LIST_STATES_REQUEST, ActionTypes.LIST_STATES_SUCCESS, ActionTypes.LIST_STATES_FAILURE]
    };
    return {
        url: URL.COMMON.LIST_STATE,
        api: restAPI.get,
        payload
    };
}

export function fetchTableDropdownFilterList({ type, searchValue, searchKey, langId, url, params }) {
    let payload = {
        types: [
            ActionTypes.FETCH_TABLE_FILTER_OPTIONS_LIST_REQUEST,
            ActionTypes.FETCH_TABLE_FILTER_OPTIONS_LIST_SUCCESS,
            ActionTypes.FETCH_TABLE_FILTER_OPTIONS_LIST_FAILURE],
        params: { type, searchValue, searchKey, langId, ...params }
    };
    return {
        url,
        api: restAPI.get,
        payload
    };
}
export function fetchTableDropdownFilterListWithMember({ type, searchValue, searchKey, member, langId, url }) {
    let payload = {
        types: [
            ActionTypes.FETCH_TABLE_FILTER_OPTIONS_LIST_REQUEST,
            ActionTypes.FETCH_TABLE_FILTER_OPTIONS_LIST_SUCCESS,
            ActionTypes.FETCH_TABLE_FILTER_OPTIONS_LIST_FAILURE],
        params: { type, searchValue, searchKey, langId, member }
    };
    return {
        url,
        api: restAPI.get,
        payload
    };
}
export const getQRCodeRegex = ({ organizationId }) => {
    let payload = {
        types: [
            ActionTypes.FETCH_QR_CODE_REGEX_REQUEST,
            ActionTypes.FETCH_QR_CODE_REGEX_SUCCESS,
            ActionTypes.FETCH_QR_CODE_REGEX_FAILURE
        ]
    };
    return {
        url: URL.COMMON.QR_REGEX.replace(':organizationId', organizationId),
        api: restAPI.get,
        payload
    };
};

export const checkQRCodeExists = ({ qrCode }) => {
    let payload = {
        types: [ActionTypes.CHECK_QR_CODE_EXISTS_REQUEST, ActionTypes.CHECK_QR_CODE_EXISTS_SUCCESS, ActionTypes.CHECK_QR_CODE_EXISTS_FAILURE]
    };
    return {
        url: URL.COMMON.QR_EXISTS.replace(':qrCode', qrCode),
        api: restAPI.get,
        payload
    };
};

export function getAllServiceProviders({ organizationId, langId, wardId }) {
    const type = 'dropdown';
    let payload = {
        types: [
            ActionTypes.ALL_SERVICE_PROVIDER_DROPDOWN_REQUEST,
            ActionTypes.ALL_SERVICE_PROVIDER_DROPDOWN_SUCCESS,
            ActionTypes.ALL_SERVICE_PROVIDER_DROPDOWN_FAILURE
        ],
        params: { type, langId }
    };
    return {
        url: URL.ORGANIZATION.GET_ALL_SERVICE_PROVIDERS_FOR_COMPLAINTS.replace(':orgId', organizationId).replace(':wardId', wardId),
        api: restAPI.get,
        payload
    };
}

export function getAllWardsUnderServiceProvider({ langId, organizationId, serviceProviderId }) {
    const type = 'dropdown';
    let payload = {
        types: [
            ActionTypes.ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN_REQUEST,
            ActionTypes.ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN_SUCCESS,
            ActionTypes.ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN_FAILURE
        ],
        params: { type, langId }
    };
    return {
        url: URL.REASSIGNGT.GET_ALL_WARDS_BY_PROVIDER_ID.replace(':organizationId', organizationId).replace(':serviceProviderId', serviceProviderId),
        api: restAPI.get,
        payload
    };
}

export function getAllServiceWorkerSupervisorUnderWards({ wardId, langId, organizationId, serviceProviderId }) {
    const multiTenant = true;
    const type = 'dropdown';

    let payload = {
        types: [ActionTypes.ALL_SW_SP_BY_WARD_DROPDOWN_REQUEST, ActionTypes.ALL_SW_SP_BY_WARD_DROPDOWN_SUCCESS, ActionTypes.ALL_SW_SP_BY_WARD_DROPDOWN_FAILURE],
        params: { wardId, langId, multiTenant, type }
    };
    return {
        url: URL.ORGANIZATION.GET_SW_SUPER_VISOR_FROM_WARD.replace(':orgId', organizationId).replace(':serviceProviderId', serviceProviderId),
        api: restAPI.get,
        payload
    };
}

export function getAllServiceWorkersUnderSupervisor({ wardId, langId, organizationId, serviceProviderId, supervisorId }) {
    const type = 'dropdown';

    let payload = {
        types: [ActionTypes.ALL_SW_BY_SP_DROPDOWN_REQUEST, ActionTypes.ALL_SW_BY_SP_DROPDOWN_SUCCESS, ActionTypes.ALL_SW_BY_SP_DROPDOWN_FAILURE],
        params: { langId, type }
    };
    return {
        url: URL.ORGANIZATION.GET_SERVICE_WORKER_FROM_SUPERVISOR.replace(':organizationId', organizationId).replace(':serviceProviderId', serviceProviderId).replace(':wardId', wardId).replace(':supervisorId', supervisorId),
        api: restAPI.get,
        payload
    };
}
