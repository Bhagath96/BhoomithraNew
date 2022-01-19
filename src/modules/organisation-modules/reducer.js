import { types as ActionTypes } from './actions';
import { REQUEST_STATUS } from './constants';
import _ from '../../utils/LodashUtils';
import { getPayloadData, formatCheckBoxesFromAPI } from '../../utils/ApiUtils';

const formatResourceActionsCheckBox = (data) => {
    let response = {};
    let actions = data;
    let { actionIds, resource } = actions;
    _.forEach(_.get(resource, 'resourceActions', []), (action) => {
        response[action.bitwiseValue] = (action.bitwiseValue & actionIds) > 0;
    });
    return response;
};

const initialState = {
    listModules: {
        data: [],
        requestInProgress: false,
        errors: {},
        pageSize: 10,
        pageNo: 0,
        totalCount: 0
    },
    getModuleById: {
        data: {},
        requestInProgress: false,
        errors: {}
    },
    listFullPermission: {
        data: [],
        requestInProgress: false,
        errors: {}
    },
    resourceActionsList: {
        data: [],
        requestInProgress: false
    },
    resourceActions: {
        actions: []
    },
    assignOrganisation: {
        users: {}
    },
    assignOrganisationList: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    updateModule: {
        requestInProgress: false,
        error: {}
    },
    updateModuleMapping: {
        requestInProgress: false,
        error: {}
    },
    addModulePermission: {
        data: [],
        requestInProgress: false
    }
};

let organizationModuleResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LIST_MODULE_REQUEST:
            return Object.assign({}, state, {
                listModules: {
                    data: [],
                    requestInProgress: true,
                    errors: {}
                }
            });
        case ActionTypes.LIST_MODULE_SUCCESS:
            organizationModuleResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listModules: {
                    requestInProgress: false,
                    errors: {},
                    data: _.get(organizationModuleResponse, 'content', []),
                    pageSize: _.get(organizationModuleResponse, 'pageable.pageSize', 10),
                    pageNo: _.get(organizationModuleResponse, 'pageable.pageNumber', 0),
                    totalCount: _.get(organizationModuleResponse, 'totalElements', 0)
                }
            });
        case ActionTypes.LIST_MODULE_FAILURE:
            return Object.assign({}, state, {
                listModules: {
                    data: [],
                    requestInProgress: false,
                    errors: 'An error has been occurred'
                }
            });

        case ActionTypes.GET_MODULE_BY_ID_REQUEST:
            return Object.assign({}, state, {
                getModuleById: {
                    data: [],
                    requestInProgress: true,
                    errors: {}
                }
            });
        case ActionTypes.GET_MODULE_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                getModuleById: {
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    errors: {}
                }
            });
        case ActionTypes.GET_MODULE_BY_ID_FAILURE:
            return Object.assign({}, state, {
                getModuleById: {
                    data: [],
                    requestInProgress: false,
                    errors: 'An error has been occurred'
                }
            });

        case ActionTypes.LIST_PERMISSIONS_REQUEST:
            return Object.assign({}, state, {
                listFullPermission: {
                    data: [],
                    requestInProgress: true,
                    errors: {}
                }
            });
        case ActionTypes.LIST_PERMISSIONS_SUCCESS:
            return Object.assign({}, state, {
                listFullPermission: {
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    errors: {}
                }
            });
        case ActionTypes.LIST_PERMISSIONS_FAILURE:
            return Object.assign({}, state, {
                listFullPermission: {
                    data: [],
                    requestInProgress: false,
                    errors: 'An error has been occurred'
                }
            });

        case ActionTypes.GET_RESOURCE_ARRAY_REQUEST:
            return Object.assign({}, state, {
                resourceActionsList: {
                    ...initialState.resourceActionsList,
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_RESOURCE_ARRAY_SUCCESS:
            return Object.assign({}, state, {
                resourceActionsList: {
                    ...initialState.resourceActionsList,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                },
                resourceActions: {
                    ...initialState.resourceActions,
                    actions: formatResourceActionsCheckBox(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.GET_RESOURCE_ARRAY_FAILURE:
            return Object.assign({}, state, {
                resourceActionsList: {
                    ...state.resourceActionsList,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });


        case ActionTypes.LOAD_ORGANISATION_FOR_MODULE_REQUEST:
            return Object.assign({}, state, {
                assignOrganisationList: {
                    ...initialState.assignOrganisationList,
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_ORGANISATION_FOR_MODULE_SUCCESS:
            return Object.assign({}, state, {
                assignOrganisationList: {
                    ...state.assignOrganisationList,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                },
                assignOrganisation: {
                    ...state.assignOrganisation,
                    users: formatCheckBoxesFromAPI(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.LOAD_ORGANISATION_FOR_MODULE_FAILURE:
            return Object.assign({}, state, {
                assignOrganisationList: {
                    ...state.assignOrganisationList,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.UPDATE_MODULE_DETAIL_VIEW_REQUEST:
            return Object.assign({}, state, {
                updateModule: {
                    ...state.assignOrganisationList,
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {}
                }
            });
        case ActionTypes.UPDATE_MODULE_DETAIL_VIEW_SUCCESS:
            return Object.assign({}, state, {
                updateModule: {
                    ...state.assignOrganisationList,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    error: {}
                }
            });
        case ActionTypes.UPDATE_MODULE_DETAIL_VIEW_FAILURE:
            return Object.assign({}, state, {
                updateModule: {
                    ...state.assignOrganisationList,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    error: 'An error has been occured'
                }
            });
        case ActionTypes.UPDATE_ORGANISATION_MAPPING_REQUEST:
            return Object.assign({}, state, {
                updateModuleMapping: {
                    ...state.assignOrganisationList,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    error: 'An error has been occured'
                }
            });
        case ActionTypes.UPDATE_ORGANISATION_MAPPING_SUCCESS:
            return Object.assign({}, state, {
                updateModuleMapping: {
                    ...state.assignOrganisationList,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    error: 'An error has been occured'
                }
            });
        case ActionTypes.UPDATE_ORGANISATION_MAPPING_FAILURE:
            return Object.assign({}, state, {
                updateModuleMapping: {
                    ...state.assignOrganisationList,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    error: 'An error has been occured'
                }
            });

        case ActionTypes.SAVE_RESOURCE_ACTION_REQUEST:
            return Object.assign({}, state, {
                addModulePermission: {
                    data: [],
                    requestInProgress: true
                }
            });
        case ActionTypes.SAVE_RESOURCE_ACTION_SUCCESS:
            return Object.assign({}, state, {
                addModulePermission: {
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });
        case ActionTypes.SAVE_RESOURCE_ACTION_FAILURE:
            return Object.assign({}, state, {
                addModulePermission: {
                    data: [],
                    requestInProgress: false
                }
            });


        default:
            return state;
    }
};
export default reducer;
