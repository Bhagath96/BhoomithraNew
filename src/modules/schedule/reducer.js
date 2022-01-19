import { DEFAULT_TABLE_PROPS } from '../../common/constants';
import utils from '../../utils';
import { types as ActionTypes, serviceTypes as ServiceActionTypes } from './actions';
import { REQUEST_STATUS } from '../common/constants';
const { apiUtils: { getPayloadData } } = utils;
import _ from '../../utils/LodashUtils';
import { formatFilterSearchKeys } from '../../utils/ApiUtils';
import { convertToLocal } from '../../utils/DateUtils';
import { formatServiceIntervalForCron } from './utils';

const initialState = {
    listCustomers: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {},
        ...DEFAULT_TABLE_PROPS
    },
    listSchedule: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {},
        ...DEFAULT_TABLE_PROPS
    },
    schedule: {},
    organizations: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    serviceProviders: {
        data: {},
        requestInProgress: false,
        error: {}
    },
    wards: {
        data: {},
        requestInProgress: false,
        error: {}
    },
    serviceWorkers: {
        data: {},
        requestInProgress: false,
        error: {}
    },
    services: {
        data: {},
        requestInProgress: false,
        error: {}
    },
    residenceCategory: {
        data: [],
        requestInProgress: false,
        error: {}
    },
    residenceType: {
        data: {},
        requestInProgress: false,
        error: {}
    },
    tradingType: {
        data: {},
        requestInProgress: false,
        error: {}
    },
    serviceIntervals: {
        data: {},
        requestInProgress: false,
        error: {}
    },
    customerListByScheduleID: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        pageSize: 10,
        searchKeys: [],
        totalCount: 0,
        pageNo: 0,
        error: {},
        ...DEFAULT_TABLE_PROPS
    },
    history: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    specialService: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {},
        pageProps: {
            ...DEFAULT_TABLE_PROPS
        }
    },
    specialServiceSchedule: {
        requestInProgress: false,
        data: {},
        error: {}
    },
    processSchedule: {
        requestInProgress: false,
        error: {}
    },
    specialServiceChips: {}
};

let listCustomerResponse = {}, scheduleResponse = {}, listScheduleResponse = {},
    listCustomerResponseByID = {}, historyResponse = {}, specialServiceResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_ALL_CUSTOMERS_REQUEST:
            return Object.assign({}, state, {
                listCustomers: {
                    ...state.listCustomers,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ALL_CUSTOMERS_SUCCESS:
            listCustomerResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listCustomers: {
                    ...state.listCustomers,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listCustomerResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_ALL_CUSTOMERS_FAILURE:
            return Object.assign({}, state, {
                listCustomers: {
                    ...state.listCustomers,
                    requestStatus: REQUEST_STATUS.FAILED,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_SCHEDULE_BY_ID_REQUEST:
            return Object.assign({}, state, {
                schedule: {
                    ...state.schedule,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_SCHEDULE_BY_ID_SUCCESS:
            scheduleResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                schedule: {
                    ...state.schedule,
                    data: {
                        ...scheduleResponse,
                        serviceInterval: formatServiceIntervalForCron([scheduleResponse.serviceInterval], scheduleResponse.cronExpression)[0],
                        lastExecutionDate: convertToLocal(scheduleResponse.lastExecutionDate || null),
                        nextExecutionDate: convertToLocal(scheduleResponse.nextExecutionDate || null)
                    },

                    requestInProgress: false
                }
            });
        case ActionTypes.FETCH_SCHEDULE_BY_ID_FAILURE:
            return Object.assign({}, state, {
                schedule: {
                    ...state.schedule,
                    requestStatus: REQUEST_STATUS.FAILED,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.CLEAR_SCHEDULE_BY_ID:
            return Object.assign({}, state, {
                schedule: {
                    ...initialState.schedule
                },
                listSchedule: {
                    ...initialState.listSchedule
                }
            });
        case ActionTypes.FETCH_ALL_SCHEDULE_REQUEST:
            return Object.assign({}, state, {
                listSchedule: {
                    ...state.listSchedule,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ALL_SCHEDULE_SUCCESS:
            listScheduleResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listSchedule: {
                    ...state.listSchedule,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listScheduleResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_ALL_SCHEDULE_FAILURE:
            return Object.assign({}, state, {
                listSchedule: {
                    ...state.listSchedule,
                    requestStatus: REQUEST_STATUS.FAILED,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_ALL_ORGANIZATIONS_SUCCESS:
            return Object.assign({}, state, {
                organizations: {
                    ...state.organizations,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_SERVICE_PROVIDERS_REQUEST:
            return Object.assign({}, state, {
                serviceProviders: {
                    ...state.serviceProviders,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_SERVICE_PROVIDERS_SUCCESS:
            return Object.assign({}, state, {
                serviceProviders: {
                    ...state.serviceProviders,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                    //data:  Handling in Saga (Dependent DropDown)
                }
            });
        case ActionTypes.FETCH_SERVICE_PROVIDERS_FAILURE:
            return Object.assign({}, state, {
                serviceProviders: {
                    ...state.serviceProviders,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.FETCH_WARDS_REQUEST:
            return Object.assign({}, state, {
                wards: {
                    ...state.wards,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_WARDS_SUCCESS:
            return Object.assign({}, state, {
                wards: {
                    ...state.wards,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                    //data:  Handling in Saga (Dependent DropDown)
                }
            });
        case ActionTypes.FETCH_WARDS_FAILURE:
            return Object.assign({}, state, {
                wards: {
                    ...state.wards,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_ALL_RESIDENCE_CATEGORIES_REQUEST:
            return Object.assign({}, state, {
                residenceCategory: {
                    ...state.residenceCategory,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ALL_RESIDENCE_CATEGORIES_SUCCESS:
            return Object.assign({}, state, {
                residenceCategory: {
                    ...state.residenceCategory,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_ALL_RESIDENCE_CATEGORIES_FAILURE:
            return Object.assign({}, state, {
                residenceCategory: {
                    ...state.residenceCategory,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_RESIDENTIAL_ASSOCIATION_REQUEST:
            return Object.assign({}, state, {
                residenceType: {
                    ...state.residenceType,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_RESIDENTIAL_ASSOCIATION_SUCCESS:
            // ActionTypes.SET_RESIDENTIAL_ASSOCIATIONS for value setting
            return Object.assign({}, state, {
                residenceType: {
                    ...state.residenceType,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_RESIDENTIAL_ASSOCIATION_FAILURE:
            return Object.assign({}, state, {
                residenceType: {
                    ...state.residenceType,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.SET_RESIDENTIAL_ASSOCIATIONS:
            return Object.assign({}, state, {
                residenceType: {
                    ...state.residenceType,
                    data: {
                        ...state.serviceProviders.data,
                        ...action.payload.data
                    }
                }
            });
        case ActionTypes.FETCH_TRADING_TYPE_REQUEST:
            return Object.assign({}, state, {
                tradingType: {
                    ...state.tradingType,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_TRADING_TYPE_SUCCESS:
            return Object.assign({}, state, {
                tradingType: {
                    ...state.tradingType,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    // 2 => Primary key of ResidentialCategory = Non-Residential
                    data: { 2: getPayloadData(action.payload, []) }
                }
            });
        case ActionTypes.FETCH_TRADING_TYPE_FAILURE:
            return Object.assign({}, state, {
                tradingType: {
                    ...state.tradingType,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.SET_SERVICE_PROVIDER:
            return Object.assign({}, state, {
                serviceProviders: {
                    ...state.serviceProviders,
                    data: {
                        ...state.serviceProviders.data,
                        ...action.payload.data
                    }
                }
            });
        case ActionTypes.SET_WARDS:
            return Object.assign({}, state, {
                wards: {
                    ...state.wards,
                    data: {
                        ...state.wards.data,
                        ...action.payload.data
                    }
                }
            });
        case ActionTypes.SET_SERVICE_WORKERS:
            return Object.assign({}, state, {
                serviceWorkers: {
                    ...state.serviceWorkers,
                    data: {
                        ...state.serviceWorkers.data,
                        ...action.payload.data
                    }
                }
            });
        case ActionTypes.SET_SERVICES:
            return Object.assign({}, state, {
                services: {
                    ...state.services,
                    data: {
                        ...state.services.data,
                        ...action.payload.data
                    }
                }
            });
        case ActionTypes.SET_SERVICE_INTERVALS:
            return Object.assign({}, state, {
                serviceIntervals: {
                    ...state.serviceIntervals,
                    data: {
                        ...state.serviceIntervals.data,
                        ...action.payload.data
                    }
                }
            });
        case ActionTypes.FETCH_CUSTOMERS_BY_SCHEDULE_ID_REQUEST:
            return Object.assign({}, state, {
                customerListByScheduleID: {
                    ...state.customerListByScheduleID,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_CUSTOMERS_BY_SCHEDULE_ID_SUCCESS:
            listCustomerResponseByID = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                customerListByScheduleID: {
                    ...state.customerListByScheduleID,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listCustomerResponseByID, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS

                }
            });
        case ActionTypes.FETCH_CUSTOMERS_BY_SCHEDULE_ID_FAILURE:
            return Object.assign({}, state, {
                customerListByScheduleID: {
                    ...state.customerListByScheduleID,
                    requestStatus: REQUEST_STATUS.FAILED,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_SCHEDULE_HISTORY_REQUEST:
            return Object.assign({}, state, {
                history: {
                    ...state.history,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_SCHEDULE_HISTORY_SUCCESS:
            historyResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                history: {
                    ...state.history,
                    data: historyResponse,
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(historyResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    pageSize: historyResponse.pageable.pageSize,
                    totalCount: historyResponse.totalElements,
                    pageNo: historyResponse.pageable.pageNumber
                }
            });
        case ActionTypes.FETCH_SCHEDULE_HISTORY_FAILURE:
            return Object.assign({}, state, {
                history: {
                    ...state.history,
                    requestStatus: REQUEST_STATUS.FAILED,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ServiceActionTypes.FETCH_SPECIAL_SERVICE_SCHEDULE_DATA_REQUEST:
            return Object.assign({}, state, {
                specialServiceSchedule: {
                    ...initialState.specialServiceSchedule,
                    requestInProgress: true
                }
            });
        case ServiceActionTypes.FETCH_SPECIAL_SERVICE_SCHEDULE_DATA_SUCCESS:
            return Object.assign({}, state, {
                specialServiceSchedule: {
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ServiceActionTypes.FETCH_SPECIAL_SERVICE_SCHEDULE_DATA_FAILURE:
            return Object.assign({}, state, {
                specialServiceSchedule: {
                    ...initialState.specialServiceSchedule,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ServiceActionTypes.FETCH_SPECIAL_SERVICE_LIST_REQUEST:
            return Object.assign({}, state, {
                specialService: {
                    ...initialState.specialService,
                    requestInProgress: true
                }
            });
        case ServiceActionTypes.FETCH_SPECIAL_SERVICE_LIST_SUCCESS:
            specialServiceResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                specialService: {
                    ...initialState.specialService,
                    data: specialServiceResponse,
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(specialServiceResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ServiceActionTypes.FETCH_SPECIAL_SERVICE_LIST_FAILURE:
            return Object.assign({}, state, {
                specialService: {
                    ...initialState.specialService,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ServiceActionTypes.PROCESS_SPECIAL_SERVICE_SCHEDULE_REQUEST:
            return Object.assign({}, state, {
                processSchedule: {
                    requestInProgress: true
                }
            });
        case ServiceActionTypes.PROCESS_SPECIAL_SERVICE_SCHEDULE_SUCCESS:
            return Object.assign({}, state, {
                processSchedule: {
                    requestInProgress: false
                }
            });
        case ServiceActionTypes.PROCESS_SPECIAL_SERVICE_SCHEDULE_FAILURE:
            return Object.assign({}, state, {
                processSchedule: {
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ServiceActionTypes.SET_CHIPS:
            return Object.assign({}, state, {
                specialServiceChips: action.payload.data || {}
            });
        case ServiceActionTypes.SET_PAGE_PROPS:
            return Object.assign({}, state, {
                specialService: {
                    ...state.specialService,
                    pageProps: {
                        ...state.specialService.pageProps,
                        ...action.payload.data
                    }
                }
            });
        case ActionTypes.SET_USER_ROLE_EDIT_TAB_INDEX:
            return Object.assign({}, state, {
                commonEditTemplate: {
                    selected: action.payload.data
                }
            });
        default: return state;
    }
};

export default reducer;
