import { DEFAULT_TABLE_PROPS } from '../../common/constants';
import utils from '../../utils';
import { types as ActionTypes } from './actions';
import { REQUEST_STATUS } from './constant';
const { apiUtils: { getPayloadData } } = utils;
import _ from '../../utils/LodashUtils';

import { formatFilterSearchKeys } from '../../utils/ApiUtils';


const initialState = {

    listMCF: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {},
        ...DEFAULT_TABLE_PROPS
    },
    fetchLSGIList: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    },
    fetchStateById: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    },
    fetchDistrictById: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    },
    fetchWardById: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    },
    fetchMCFById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    },

    listFilterDataForStateFilter: {},
    currentFilterState: {}

};
let listMCFResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_MCF_REQUEST:
            return Object.assign({}, state, {
                listMCF: {
                    ...initialState.listMCF,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_MCF_SUCCESS:
            listMCFResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listMCF: {
                    ...state.listMCF,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listMCFResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS

                }
            });
        case ActionTypes.FETCH_MCF_FAILURE:
            return Object.assign({}, state, {
                listMCF: {
                    ...initialState.listMCF,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.LIST_LSGI_REQUEST:
            return Object.assign({}, state, {
                fetchLSGIList: {
                    ...state.fetchLSGIList,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.LIST_LSGI_SUCCESS:
            return Object.assign({}, state, {
                fetchLSGIList: {
                    ...state.fetchLSGIList,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.LIST_LSGI_FAILURE:
            return Object.assign({}, state, {
                fetchLSGIList: {
                    ...state.fetchLSGIList,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.LIST_DISTRICT_REQUEST:
            return Object.assign({}, state, {
                fetchDistrictById: {
                    ...state.fetchDistrictById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.LIST_DISTRICT_SUCCESS:
            return Object.assign({}, state, {
                fetchDistrictById: {
                    ...state.fetchDistrictById,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.LIST_DISTRICT_FAILURE:
            return Object.assign({}, state, {
                fetchDistrictById: {
                    ...state.fetchDistrictById,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.LIST_STATE_REQUEST:
            return Object.assign({}, state, {
                fetchStateById: {
                    ...state.fetchStateById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.LIST_STATE_SUCCESS:
            return Object.assign({}, state, {
                fetchStateById: {
                    ...state.fetchStateById,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.LIST_STATE_FAILURE:
            return Object.assign({}, state, {
                fetchStateById: {
                    ...state.fetchStateById,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.LIST_WARD_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchWardById: {
                    ...state.fetchWardById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.LIST_WARD_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                fetchWardById: {
                    ...state.fetchWardById,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.LIST_WARD_BY_ID_FAILURE:
            return Object.assign({}, state, {
                fetchWardById: {
                    ...state.fetchWardById,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.FETCH_MCF_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchMCFById: {
                    ...state.fetchMCFById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_MCF_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                fetchMCFById: {
                    ...state.fetchMCFById,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_MCF_BY_ID_FAILURE:
            return Object.assign({}, state, {
                fetchMCFById: {
                    ...state.fetchMCFById,
                    requestInProgress: false,
                    data: []
                }
            });

        case ActionTypes.CLEAR_MCF_DETAILS_REDUCER:
            return Object.assign({}, state, {
                fetchMCFById: {}
            });
        case ActionTypes.STORE_JSON_DATA_FOR_MCF:
            return Object.assign({}, state, {
                listFilterDataForStateFilter: {
                    ...state.listFilterDataForStateFilter,
                    ...action.payload.data
                }
            });
        case ActionTypes.SET_FILTER_VALUES:
            return Object.assign({}, state, {
                currentFilterState: {
                    ...state.currentFilterState,
                    ...action.payload.data
                }
            });
        case ActionTypes.RESET_FILTER_VALUES:
            return Object.assign({}, state, {
                currentFilterState: initialState.currentFilterState
            });

        default:
            return state;

    }
};
export default reducer;
