
import { types as ActionTypes } from './actions';
import _ from 'lodash';
import { API_IDENTIFIER } from './constants';
import { keys } from '../common/actions';
import { getPayloadData } from '../../utils/ApiUtils';

const removeDataAccessPermissionItem = (currentData, details) => {
    let existingData = _.cloneDeep(currentData);
    _.forEach(existingData, data => {
        if (_.get(data, 'details.id', '') === details.userId) {
            _.forEach(data.componentDetails || [], component => {
                if (component.id === details.componentId) {
                    let removedArray = _.reject(component.data.data, { id: details.itemId });
                    _.set(component, 'data.data', removedArray);
                }
            });
        }
    });
    return existingData;
};

const addDataAccessPermissionItem = (currentData, details) => {
    let existingData = _.cloneDeep(currentData);
    _.forEach(existingData, data => {
        if (_.get(data, 'details.id', '') === details.userId) {
            _.forEach(data.componentDetails || [], component => {
                if (component.id === details.componentId) {
                    let currentArray = _.get(component, 'data.data', []);
                    let newArray = _.get(details, 'multiData', false) ? _.get(details, 'response', []) : [_.get(details, 'response', {})];
                    // @TODO Remove Existing Items if Present in New Array
                    //@TODO Check Max no of records
                    let componentData = {
                        data: [...currentArray, ...newArray]
                    };
                    _.set(component, 'data', componentData);
                }
            });
        }
    });
    return existingData;
};


const initialState = {
    dataAccessPermissionRoleAssignee: {
        data: [],
        requestInProgress: false
    },
    dataAccessPermissionUserRole: {
        data: [],
        requestInProgress: false
    },
    states: {
        data: [],
        requestInProgress: false
    },
    districts: {
        data: [],
        requestInProgress: false
    },
    corporationMunicipalityPanchayath: {
        data: [],
        requestInProgress: false
    },
    districtPanchayath: {
        data: [],
        requestInProgress: false
    },
    blockPanchayath: {
        data: [],
        requestInProgress: false
    },
    lsgi: {
        data: [],
        requestInProgress: false
    },
    ward: {
        data: [],
        requestInProgress: false
    },
    residenceCategory: {
        data: [],
        requestInProgress: false
    }
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_ROLE_ASSIGNEE_DATA_ACCESS_PERMISSION_REQUEST:
            return Object.assign({}, state, {
                dataAccessPermissionRoleAssignee: {
                    ...initialState.dataAccessPermissionRoleAssignee,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ROLE_ASSIGNEE_DATA_ACCESS_PERMISSION_SUCCESS:
            return Object.assign({}, state, {
                dataAccessPermissionRoleAssignee: {
                    ...state.dataAccessPermissionRoleAssignee,
                    requestInProgress: false
                }
            });
        case ActionTypes.FETCH_ROLE_ASSIGNEE_DATA_ACCESS_PERMISSION_FAILURE:
            return Object.assign({}, state, {
                dataAccessPermissionRoleAssignee: initialState.dataAccessPermissionRoleAssignee
            });
        case ActionTypes.SET_ROLE_ASSIGNEE_DATA_ACCESS_PERMISSION:
            return Object.assign({}, state, {
                dataAccessPermissionRoleAssignee: {
                    ...initialState.dataAccessPermissionRoleAssignee,
                    data: action.payload.data
                }
            });

        case ActionTypes.REMOVE_ROLE_ASSIGNEE_DATA_ACCESS_PERMISSION_ITEM:
            return Object.assign({}, state, {
                dataAccessPermissionRoleAssignee: {
                    ...state.dataAccessPermissionRoleAssignee,
                    data: removeDataAccessPermissionItem(state.dataAccessPermissionRoleAssignee.data, action.payload.data)
                }
            });

        case ActionTypes.ADD_ROLE_ASSIGNEE_DATA_ACCESS_PERMISSION_ITEM:
            return Object.assign({}, state, {
                dataAccessPermissionRoleAssignee: {
                    ...state.dataAccessPermissionRoleAssignee,
                    data: addDataAccessPermissionItem(state.dataAccessPermissionRoleAssignee.data, action.payload.data)
                }
            });

        case ActionTypes.REMOVE_USER_ROLE_DATA_ACCESS_PERMISSION_ITEM:
            return Object.assign({}, state, {
                dataAccessPermissionUserRole: {
                    ...state.dataAccessPermissionUserRole,
                    data: removeDataAccessPermissionItem(state.dataAccessPermissionUserRole.data, action.payload.data)
                }
            });

        case ActionTypes.ADD_USER_ROLE_DATA_ACCESS_PERMISSION_ITEM:
            return Object.assign({}, state, {
                dataAccessPermissionUserRole: {
                    ...state.dataAccessPermissionUserRole,
                    data: addDataAccessPermissionItem(state.dataAccessPermissionUserRole.data, action.payload.data)
                }
            });

        case ActionTypes.SET_USER_ROLE_DATA_ACCESS_PERMISSION:
            return Object.assign({}, state, {
                dataAccessPermissionUserRole: {
                    ...initialState.dataAccessPermissionUserRole,
                    data: action.payload.data
                }
            });

        case `${API_IDENTIFIER}/${keys.COMMON_STATE}_REQUEST`:
            return Object.assign({}, state, {
                states: {
                    ...initialState.states,
                    requestInProgress: true
                }
            });
        case `${API_IDENTIFIER}/${keys.COMMON_STATE}_SUCCESS`:
            return Object.assign({}, state, {
                states: {
                    ...initialState.states,
                    data: getPayloadData(action.payload, [])
                }
            });
        case `${API_IDENTIFIER}/${keys.COMMON_STATE}_FAILURE`:
            return Object.assign({}, state, {
                states: initialState.states
            });

        case `${API_IDENTIFIER}/${keys.COMMON_DISTRICT}_REQUEST`:
            return Object.assign({}, state, {
                districts: {
                    ...initialState.districts,
                    requestInProgress: true
                }
            });
        case `${API_IDENTIFIER}/${keys.COMMON_DISTRICT}_SUCCESS`:
            return Object.assign({}, state, {
                districts: {
                    ...initialState.districts,
                    data: getPayloadData(action.payload, [])
                }
            });
        case `${API_IDENTIFIER}/${keys.COMMON_DISTRICT}_FAILURE`:
            return Object.assign({}, state, {
                districts: initialState.districts
            });

        case `${API_IDENTIFIER}/${keys.COMMON_LSGI}_REQUEST`:
            return Object.assign({}, state, {
                corporationMunicipalityPanchayath: {
                    ...initialState.corporationMunicipalityPanchayath,
                    requestInProgress: true
                }
            });
        case `${API_IDENTIFIER}/${keys.COMMON_LSGI}_SUCCESS`:
            return Object.assign({}, state, {
                corporationMunicipalityPanchayath: {
                    ...initialState.corporationMunicipalityPanchayath,
                    data: getPayloadData(action.payload, [])
                }
            });
        case `${API_IDENTIFIER}/${keys.COMMON_LSGI}_FAILURE`:
            return Object.assign({}, state, {
                corporationMunicipalityPanchayath: initialState.corporationMunicipalityPanchayath
            });

        case `${API_IDENTIFIER}/${keys.COMMON_DISTRICT_PANCHAYATH}_REQUEST`:
            return Object.assign({}, state, {
                districtPanchayath: {
                    ...initialState.districtPanchayath,
                    requestInProgress: true
                }
            });
        case `${API_IDENTIFIER}/${keys.COMMON_DISTRICT_PANCHAYATH}_SUCCESS`:
            return Object.assign({}, state, {
                districtPanchayath: {
                    ...initialState.districtPanchayath,
                    data: getPayloadData(action.payload, [])
                }
            });
        case `${API_IDENTIFIER}/${keys.COMMON_DISTRICT_PANCHAYATH}_FAILURE`:
            return Object.assign({}, state, {
                districtPanchayath: initialState.districtPanchayath
            });
        case `${API_IDENTIFIER}/${keys.COMMON_BLOCK_PANCHAYATH}_REQUEST`:
            return Object.assign({}, state, {
                blockPanchayath: {
                    ...initialState.blockPanchayath,
                    requestInProgress: true
                }
            });
        case `${API_IDENTIFIER}/${keys.COMMON_BLOCK_PANCHAYATH}_SUCCESS`:
            return Object.assign({}, state, {
                blockPanchayath: {
                    ...initialState.blockPanchayath,
                    data: getPayloadData(action.payload, [])
                }
            });
        case `${API_IDENTIFIER}/${keys.COMMON_BLOCK_PANCHAYATH}_FAILURE`:
            return Object.assign({}, state, {
                blockPanchayath: initialState.blockPanchayath
            });

        case ActionTypes.FETCH_ALL_LOCAL_BODIES_REQUEST:
            return Object.assign({}, state, {
                lsgi: {
                    ...initialState.lsgi,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ALL_LOCAL_BODIES_SUCCESS:
            return Object.assign({}, state, {
                lsgi: {
                    ...initialState.lsgi,
                    data: getPayloadData(action.payload, [])
                }
            });
        case ActionTypes.FETCH_ALL_LOCAL_BODIES_FAILURE:
            return Object.assign({}, state, {
                lsgi: initialState.lsgi
            });

        case ActionTypes.FETCH_ALL_WARDS_REQUEST:
            return Object.assign({}, state, {
                ward: {
                    ...initialState.ward,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ALL_WARDS_SUCCESS:
            return Object.assign({}, state, {
                ward: {
                    ...initialState.ward,
                    data: getPayloadData(action.payload, [])
                }
            });
        case ActionTypes.FETCH_ALL_WARDS_FAILURE:
            return Object.assign({}, state, {
                ward: initialState.ward
            });

        case ActionTypes.FETCH_ALL_RESIDENCE_CATEGORY_REQUEST:
            return Object.assign({}, state, {
                residenceCategory: {
                    ...initialState.residenceCategory,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ALL_RESIDENCE_CATEGORY_SUCCESS:
            return Object.assign({}, state, {
                residenceCategory: {
                    ...initialState.residenceCategory,
                    data: getPayloadData(action.payload, [])
                }
            });
        case ActionTypes.FETCH_ALL_RESIDENCE_CATEGORY_FAILURE:
            return Object.assign({}, state, {
                residenceCategory: initialState.residenceCategory
            });

        default:
            return state;
    }
};
export default reducer;

