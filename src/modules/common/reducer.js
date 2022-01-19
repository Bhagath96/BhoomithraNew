import { commonTypes as CommonActionTypes, types } from './actions';
import { REQUEST_STATUS, DEFAULT_LANGUAGE } from './constants';
import { types as ActionTypes } from '../organization/actions';
import { getPayloadData } from '../../utils/ApiUtils';
import _ from 'lodash';

const initialState = {
    allLanguages: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    defaultLanguage: DEFAULT_LANGUAGE,
    developerOptions: {
        validations: true
    },
    lsgiTypes: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    setBreadCrump: {
        breadCrumpArray: []
    },
    currentBreadCrumb: {},
    renderMenu: 0,
    formChange: {
        count: 0
    },
    tableProps: {},
    serviceProviderTypeData: {},
    organizationTypeData: {},
    selectedWard: {
        templateAvailable: false
    },
    assignServiceWorker: {
        wards: {
            data: {},
            requestInProgress: false
        },
        serviceProviders: {
            data: {},
            requestInProgress: false
        },
        swSupervisors: {
            data: {},
            requestInProgress: false
        },
        serviceWorkers: {
            data: {},
            requestInProgress: false
        }
    }
};
let wardResponse = {};
const getFullFilterOption = (existing = {}, newFilterOptions = {}) => {
    let filterArray = [];
    let response = {};
    // let sameValueFlag = false;

    if (existing && Object.keys(existing).length > 0) {
        Object.keys(existing).map((item) => {
            let newFilterArray = _.get(newFilterOptions, item, null);
            if (newFilterArray) {
                existing[item]?.map((existingItem) => {
                    filterArray = newFilterArray?.map((newFilterItem) => {
                        if (existingItem?.id === newFilterItem?.id) {
                            // sameValueFlag = true;
                        }
                        return { id: newFilterItem?.id, name: newFilterItem?.name };
                    });
                });
                // if (!sameValueFlag) {
                existing[item] = [...existing[item], ...filterArray];
                // response[item] = [...existing[item]];
                // }
                existing[item] = _.uniqBy(existing[item], 'name');
            }

        });
        response = { ...response, ...existing };
        return response;
    } else {
        response = { ...newFilterOptions };
        return response;

    }
};


const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'persist/REHYDRATE':
            return Object.assign({}, state, {
                renderMenu: Math.random()
            });
        case ActionTypes.CLEAR_ORGANIZATION_TYPE:
            return Object.assign({}, state, {
                organizationTypeData: {
                    ...initialState.organizationTypeData
                }
            });
        case ActionTypes.FETCH_WARD_BY_ID_SUCCESS:
            wardResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                selectedWard: {
                    templateAvailable: wardResponse?.templateAvailable
                }
            });
        case ActionTypes.FETCH_ORGANIZATION_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                organizationTypeData: {
                    ...initialState.organizationTypeData,
                    organizationId: getPayloadData(action.payload, {})?.id,
                    organizationType: getPayloadData(action.payload, {})?.organizationType?.name
                }
            });
        case ActionTypes.GET_SERVICE_PROVIDERS_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                serviceProviderTypeData: {
                    ...initialState.serviceProviderTypeData,
                    serviceProviderTypeName: getPayloadData(action.payload, {})?.serviceProviderType?.name
                }
            });

        case CommonActionTypes.LOAD_LSGI_TYPES_REQUEST:
            return Object.assign({}, state, {
                lsgiTypes: {
                    ...initialState.lsgiTypes,
                    requestInProgress: true
                }
            });
        case types.SET_FORM_CHANGE:
            return Object.assign({}, state, {
                formChange: {
                    ...state.formChange,
                    ...action.payload.data
                }
            });
        case types.RESET_FORM_CHANGE: {
            return Object.assign({}, state, {
                formChange: {
                    count: 0,
                    isDirty: false
                }
            });
        }
        case types.SET_BREAD_CRUMP_OBJECT:
            return Object.assign({}, state, {
                setBreadCrump: {
                    ...state.setBreadCrump
                },
                currentBreadCrumb: action.payload.data || {}
            });
        case types.SET_BREAD_CRUMB_WITH_PATH:
            return Object.assign({}, state, {
                setBreadCrump: {
                    ...state.setBreadCrump,
                    breadCrumpArray: action.payload.data || []
                }
            });
        case types.SET_BREAD_CRUMP_FROM_LOCAL_STORAGE:
            return Object.assign({}, state, {
                setBreadCrump: {
                    ...action.payload.data
                }
            });
        case CommonActionTypes.LOAD_LSGI_TYPES_SUCCESS:
            return Object.assign({}, state, {
                lsgiTypes: {
                    data: getPayloadData(action.payload, []),
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    requestInProgress: false
                }
            });
        case CommonActionTypes.LOAD_LSGI_TYPES_FAILED:
            return Object.assign({}, state, {
                lsgiTypes: {
                    ...initialState.lsgiTypes,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });


        case types.GET_ALL_LANGUAGES_REQUEST:
            return Object.assign({}, state, {
                allLanguages: {
                    ...initialState.allLanguages,
                    requestInProgress: true
                }
            });
        case types.GET_ALL_LANGUAGES_SUCCESS:
            return Object.assign({}, state, {
                allLanguages: {
                    data: getPayloadData(action.payload, []),
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    requestInProgress: false
                }
            });
        case types.GET_ALL_LANGUAGES_FAILED:
            return Object.assign({}, state, {
                allLanguages: {
                    ...initialState.allLanguages,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case types.CHANGE_LANGUAGE:
            return Object.assign({}, state, {
                defaultLanguage: action.payload.lang
            });
        case types.SET_TABLE_PAGINATION: {
            let { key, pagination } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ..._.get(state, `tableProps.${key}`, {}),
                        pagination: {
                            ..._.get(state, `tableProps.${key}.pagination`, {}),
                            ...pagination
                        }
                    }
                }
            });
        }
        case types.SET_TABLE_FILTER_CHIPS: {
            let { key, chips } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ...state.tableProps[key] || {},
                        chips
                    }
                }
            });
        }
        case types.SET_ADDITIONAL_TABLE_FILTERS: {
            let { key, additionalFilters } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ...state.tableProps[key] || {},
                        additionalFilters
                    }
                }
            });
        }

        case types.SET_ADDITIONAL_DROPDOWN_FILTER_DATA: {
            let { key, additionalDropdownFilters } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ...state.tableProps[key] || {},
                        additionalDropdownFilters
                    }
                }
            });
        }
        case types.SET_TABLE_FILTER_OPTIONS_LIST: {
            let { key, filterOptionsList } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ..._.get(state, `tableProps.${key}`, {}),
                        filterOptions: getFullFilterOption(_.get(state, `tableProps.${key}.filterOptions`, {}), filterOptionsList)

                    }
                }
            });
        }

        case types.RESET_TABLE_FILTER_OPTIONS_LIST: {
            let { key } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ..._.get(state, `tableProps.${key}`, {}),
                        filterOptions: {}
                    }
                }
            });
        }

        case types.RESET_FILTER_BASED_ON_KEY: {
            let { key } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ..._.get(state, `tableProps.${key}`, {}),
                        filterState: {
                        }
                    }
                }
            });
        }


        case types.SET_TABLE_SELECTED_IDS: {
            let { key, selectedIds = [], selectedDetails = [] } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ..._.get(state, `tableProps.${key}`, {}),
                        selectedIds,
                        selectedDetails
                    }
                }
            });
        }
        case types.SET_TABLE_FILTER_STATE: {
            let { key, filterState } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ..._.get(state, `tableProps.${key}`, {}),
                        filterState: {
                            ..._.get(state, `tableProps.${key}.filterState`, {}),
                            ...filterState
                        }
                    }
                }
            });
        }

        case types.SET_PASSED_COLUMNS: {
            let { key, passedColumns = [] } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ..._.get(state, `tableProps.${key}`, {}),
                        passedColumns
                    }
                }
            });
        }

        case types.SET_FILTERS_TO_INITIAL_DROPDOWN_LIST: {
            let { key, initialfilterOptions } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ..._.get(state, `tableProps.${key}`, {}),
                        initialfilterOptions: initialfilterOptions
                    }
                }
            });
        }
        case types.SET_FILTER_VALUES_FROM_INITIAL_STATE: {
            let { key } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ..._.get(state, `tableProps.${key}`, {}),
                        filterOptions: _.get(state, `tableProps.${key}.initialfilterOptions`, {})
                    }
                }
            });
        }
        case types.SET_DROPDOWN_FILTER_OPTIONS: {
            let { key, dropdownFilterOptions = {} } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ..._.get(state, `tableProps.${key}`, {}),
                        dropdownFilterOptions
                    }
                }
            });
        }

        case types.ALL_SERVICE_PROVIDER_DROPDOWN_REQUEST:
        case types.ALL_SERVICE_PROVIDER_DROPDOWN_FAILURE:
            return Object.assign({}, state, {
                assignServiceWorker: {
                    ...state.assignServiceWorker,
                    serviceProviders: {
                        ...initialState.assignServiceWorker.serviceProviders
                    }
                }
            });

        case types.SET_ALL_SERVICE_PROVIDER_DROPDOWN:
            return Object.assign({}, state, {
                assignServiceWorker: {
                    ...state.assignServiceWorker,
                    serviceProviders: {
                        ...state.assignServiceWorker.serviceProviders,
                        data: {
                            ...state.assignServiceWorker.serviceProviders.data,
                            ...action.payload.data
                        },
                        requestInProgress: false
                    }
                }
            });


        case types.ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN_REQUEST:
        case types.ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN_FAILURE:
            return Object.assign({}, state, {
                assignServiceWorker: {
                    ...state.assignServiceWorker,
                    wards: {
                        ...initialState.assignServiceWorker.wards
                    }
                }
            });

        case types.SET_ALL_WARDS_BY_SERVICE_PROVIDER_DROPDOWN:
            return Object.assign({}, state, {
                assignServiceWorker: {
                    ...state.assignServiceWorker,
                    wards: {
                        ...state.assignServiceWorker.wards,
                        data: {
                            ...state.assignServiceWorker.wards.data,
                            ...action.payload.data
                        },
                        requestInProgress: false
                    }
                }
            });

        case types.ALL_SW_SP_BY_WARD_DROPDOWN_REQUEST:
        case types.ALL_SW_SP_BY_WARD_DROPDOWN_FAILURE:
            return Object.assign({}, state, {
                assignServiceWorker: {
                    ...state.assignServiceWorker,
                    swSupervisors: {
                        ...initialState.assignServiceWorker.swSupervisors
                    }
                }
            });

        case types.SET_ALL_SW_SP_BY_WARD_DROPDOWN:
            return Object.assign({}, state, {
                assignServiceWorker: {
                    ...state.assignServiceWorker,
                    swSupervisors: {
                        ...state.assignServiceWorker.swSupervisors,
                        data: {
                            ...state.assignServiceWorker.swSupervisors.data,
                            ...action.payload.data
                        },
                        requestInProgress: false
                    }
                }
            });

        case types.ALL_SW_BY_SP_DROPDOWN_REQUEST:
        case types.ALL_SW_BY_SP_DROPDOWN_FAILURE:
            return Object.assign({}, state, {
                assignServiceWorker: {
                    ...state.assignServiceWorker,
                    serviceWorkers: {
                        ...initialState.assignServiceWorker.serviceWorkers
                    }
                }
            });

        case types.SET_ALL_SW_BY_SP_DROPDOWN:
            return Object.assign({}, state, {
                assignServiceWorker: {
                    ...state.assignServiceWorker,
                    serviceWorkers: {
                        ...state.assignServiceWorker.serviceWorkers,
                        data: {
                            ...state.assignServiceWorker.serviceWorkers.data,
                            ...action.payload.data
                        },
                        requestInProgress: false
                    }
                }
            });

        default:
            return state;
    }
};

export default commonReducer;
