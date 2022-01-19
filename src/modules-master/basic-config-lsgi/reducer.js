import { DEFAULT_TABLE_PROPS } from '../../common/constants';
import utils from '../../utils';
import { types as ActionTypes } from './actions';
import { types as CommonActionTypes } from '../../modules/common/actions';
import { REQUEST_STATUS } from './constant';
const { apiUtils: { getPayloadData } } = utils;
import { formatFilterSearchKeys } from '../../utils/ApiUtils';
import _ from '../../utils/LodashUtils';

const initialState = {

    listLSGIDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {},
        ...DEFAULT_TABLE_PROPS
    },
    fetchLSGIsById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    },
    fetchStateList: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    }, fetchDistrictList: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    }, fetchLSGItypeList: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    },
    fetchBlockPanchayathList: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    },
    fetchDistrictPanchayathList: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    }

};
let listLSGIResponse = {};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_LSGI_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listLSGIDetails: {
                    ...initialState.listLSGIDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_LSGI_DETAILS_SUCCESS:
            listLSGIResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listLSGIDetails: {
                    ...state.listLSGIDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listLSGIResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_LSGI_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listLSGIDetails: {
                    ...initialState.listLSGIDetails,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.FETCH_LSGI_DETAILS_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchLSGIsById: {
                    ...state.fetchLSGIsById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_LSGI_DETAILS_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                fetchLSGIsById: {
                    ...state.fetchLSGIsById,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_LSGI_DETAILS_BY_ID_FAILURE:
            return Object.assign({}, state, {
                fetchLSGIsById: {
                    ...state.fetchLSGIsById,
                    requestInProgress: false,
                    data: []
                }
            });
        case CommonActionTypes.LIST_STATES_REQUEST:
            return Object.assign({}, state, {
                fetchStateList: {
                    ...state.fetchStateList,
                    requestInProgress: true,
                    data: []
                }
            });
        case CommonActionTypes.LIST_STATES_SUCCESS:
            return Object.assign({}, state, {
                fetchStateList: {
                    ...state.fetchStateList,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case CommonActionTypes.LIST_STATES_FAILURE:
            return Object.assign({}, state, {
                fetchStateList: {
                    ...state.fetchStateList,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.CLEAR_LSGI_DETAILS_REDUCER:
            return Object.assign({}, state, {
                fetchLSGIsById: {
                }
            });
        case ActionTypes.LIST_DISTRICT_REQUEST:
            return Object.assign({}, state, {
                fetchDistrictList: {
                    ...state.fetchDistrictList,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.LIST_DISTRICT_SUCCESS:
            return Object.assign({}, state, {
                fetchDistrictList: {
                    ...state.fetchDistrictList,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.LIST_DISTRICT_FAILURE:
            return Object.assign({}, state, {
                fetchDistrictList: {
                    ...state.fetchDistrictList,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.LOAD_LSGI_TYPES_REQUEST:
            return Object.assign({}, state, {
                fetchLSGItypeList: {
                    ...state.fetchLSGItypeList,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.LOAD_LSGI_TYPES_SUCCESS:
            return Object.assign({}, state, {
                fetchLSGItypeList: {
                    ...state.fetchLSGItypeList,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.LOAD_LSGI_TYPES_FAILURE:
            return Object.assign({}, state, {
                fetchLSGItypeList: {
                    ...state.fetchLSGItypeList,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.LOAD_BLOCK_PANCHAYATH_REQUEST:
            return Object.assign({}, state, {
                fetchBlockPanchayathList: {
                    ...state.fetchBlockPanchayathList,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.LOAD_BLOCK_PANCHAYATH_SUCCESS:
            return Object.assign({}, state, {
                fetchBlockPanchayathList: {
                    ...state.fetchBlockPanchayathList,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.LOAD_BLOCK_PANCHAYATH_FAILURE:
            return Object.assign({}, state, {
                fetchBlockPanchayathList: {
                    ...state.fetchBlockPanchayathList,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.LOAD_DISTRICT_PANCHAYATH_REQUEST:
            return Object.assign({}, state, {
                fetchDistrictPanchayathList: {
                    ...state.fetchDistrictPanchayathList,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.LOAD_DISTRICT_PANCHAYATH_SUCCESS:
            return Object.assign({}, state, {
                fetchDistrictPanchayathList: {
                    ...state.fetchDistrictPanchayathList,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.LOAD_DISTRICT_PANCHAYATH_FAILURE:
            return Object.assign({}, state, {
                fetchDistrictPanchayathList: {
                    ...state.fetchDistrictPanchayathList,
                    requestInProgress: false,
                    data: []
                }
            });

        default:
            return state;

    }
};
export default reducer;
