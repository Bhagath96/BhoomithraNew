import { DEFAULT_TABLE_PROPS } from '../../common/constants';
import utils from '../../utils';
import { types as ActionTypes } from './actions';
import { types as CommonActionTypes } from '../../modules/common/actions';
import { REQUEST_STATUS } from './constant';
const { apiUtils: { getPayloadData } } = utils;
import { formatFilterSearchKeys } from '../../utils/ApiUtils';
import _ from '../../utils/LodashUtils';

const initialState = {

    listDistrictDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        error: {},
        searchKeys: [],
        ...DEFAULT_TABLE_PROPS
    },
    fetchDistrictById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    },
    fetchStateList: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    },
    listFilterDataForDistrictFilter: {},
    currentFilterState: {}
};
let listDistrictResponse = {};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_DISTRICT_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listDistrictDetails: {
                    ...initialState.listDistrictDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_DISTRICT_DETAILS_SUCCESS:
            listDistrictResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listDistrictDetails: {
                    ...state.listDistrictDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listDistrictResponse, 'searchKeys', [])),

                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_DISTRICT_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listDistrictDetails: {
                    ...initialState.listDistrictDetails,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.FETCH_DISTRICT_DETAILS_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchDistrictById: {
                    ...state.fetchDistrictById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_DISTRICT_DETAILS_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                fetchDistrictById: {
                    ...state.fetchDistrictById,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_DISTRICT_DETAILS_BY_ID_FAILURE:
            return Object.assign({}, state, {
                fetchDistrictById: {
                    ...state.fetchDistrictById,
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
        case ActionTypes.CLEAR_DISTRICT_DETAILS_REDUCER:
            return Object.assign({}, state, {
                fetchDistrictById: {
                }
            });

        case ActionTypes.STORE_JSON_DATA_FOR_DISTRICT:
            return Object.assign({}, state, {
                listFilterDataForDistrictFilter: {
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
