import { DEFAULT_TABLE_PROPS } from '../../common/constants';
import utils from '../../utils';
import { types as ActionTypes } from './actions';
import { types as CommonActionTypes } from '../../modules/common/actions';
import { REQUEST_STATUS } from './constant';
const { apiUtils: { getPayloadData } } = utils;
import { formatFilterSearchKeys } from '../../utils/ApiUtils';
import _ from '../../utils/LodashUtils';

const initialState = {

    listDistrictPanchayathDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {},
        ...DEFAULT_TABLE_PROPS
    },
    fetchDistrictPanchayathById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    },
    fetchStateList: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    },
    fetchDistrictListForDistrictPanchayath: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    }
};
let listDistrictPanchayathResponse = {};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_DISTRICT_PANCHAYATH_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listDistrictPanchayathDetails: {
                    ...initialState.listDistrictPanchayathDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_DISTRICT_PANCHAYATH_DETAILS_SUCCESS:
            listDistrictPanchayathResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listDistrictPanchayathDetails: {
                    ...state.listDistrictPanchayathDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listDistrictPanchayathResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_DISTRICT_PANCHAYATH_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listDistrictPanchayathDetails: {
                    ...initialState.listDistrictPanchayathDetails,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.FETCH_DISTRICT_PANCHAYATH_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchDistrictPanchayathById: {
                    ...state.fetchDistrictPanchayathById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_DISTRICT_PANCHAYATH_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                fetchDistrictPanchayathById: {
                    ...state.fetchDistrictPanchayathById,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_DISTRICT_PANCHAYATH_BY_ID_FAILURE:
            return Object.assign({}, state, {
                fetchDistrictPanchayathById: {
                    ...state.fetchDistrictPanchayathById,
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
        case ActionTypes.CLEAR_DISTRICT_PANCHAYATH_DETAILS_REDUCER:
            return Object.assign({}, state, {
                fetchDistrictPanchayathById: {
                }
            });

        case ActionTypes.LIST_DISTRICT_PANCHAYATH_DISTRICT_REQUEST:
            return Object.assign({}, state, {
                fetchDistrictListForDistrictPanchayath: {
                    ...state.fetchDistrictListForDistrictPanchayath,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.LIST_DISTRICT_PANCHAYATH_DISTRICT_SUCCESS:
            return Object.assign({}, state, {
                fetchDistrictListForDistrictPanchayath: {
                    ...state.fetchDistrictListForDistrictPanchayath,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.LIST_DISTRICT_PANCHAYATH_DISTRICT_FAILURE:
            return Object.assign({}, state, {
                fetchDistrictListForDistrictPanchayath: {
                    ...state.fetchDistrictListForDistrictPanchayath,
                    requestInProgress: false,
                    data: []
                }
            });

        default:
            return state;

    }
};
export default reducer;
