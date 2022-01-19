import { DEFAULT_TABLE_PROPS } from '../../common/constants';
import utils from '../../utils';
import { types as ActionTypes } from './actions';
import { types as CommonActionTypes } from '../../modules/common/actions';
import { REQUEST_STATUS } from './constant';
const { apiUtils: { getPayloadData } } = utils;
import { formatFilterSearchKeys } from '../../utils/ApiUtils';
import _ from '../../utils/LodashUtils';

const initialState = {

    listBlockPanchayathDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        error: {},
        searchKeys: [],
        ...DEFAULT_TABLE_PROPS
    },
    fetchBlockPanchayathById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    },
    fetchStateList: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    },
    fetchDistrictList: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    }
};
let listBlockPanchayathResponse = {};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listBlockPanchayathDetails: {
                    ...initialState.listBlockPanchayathDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_SUCCESS:
            listBlockPanchayathResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listBlockPanchayathDetails: {
                    ...state.listBlockPanchayathDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listBlockPanchayathResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listBlockPanchayathDetails: {
                    ...initialState.listBlockPanchayathDetails,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchBlockPanchayathById: {
                    ...state.fetchBlockPanchayathById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                fetchBlockPanchayathById: {
                    ...state.fetchBlockPanchayathById,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_BLOCK_PANCHAYATH_DETAILS_BY_ID_FAILURE:
            return Object.assign({}, state, {
                fetchBlockPanchayathById: {
                    ...state.fetchBlockPanchayathById,
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
        case ActionTypes.LIST_DISTRICT_LIST_BY_STATE_REQUEST:
            return Object.assign({}, state, {
                fetchDistrictList: {
                    ...state.fetchDistrictList,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.LIST_DISTRICT_LIST_BY_STATE_SUCCESS:
            return Object.assign({}, state, {
                fetchDistrictList: {
                    ...state.fetchDistrictList,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.LIST_DISTRICT_LIST_BY_STATE_FAILURE:
            return Object.assign({}, state, {
                fetchDistrictList: {
                    ...state.fetchDistrictList,
                    requestInProgress: false,
                    data: []
                }
            });

        case ActionTypes.CLEAR_BLOCK_PANCHAYATH_DETAILS_REDUCER:
            return Object.assign({}, state, {
                fetchBlockPanchayathById: {
                }
            });
        default:
            return state;

    }
};
export default reducer;
