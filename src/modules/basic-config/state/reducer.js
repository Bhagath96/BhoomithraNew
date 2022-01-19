import { DEFAULT_TABLE_PROPS } from '../../common/constants';
import utils from '../../utils';
import { types as ActionTypes } from './actions';
import { REQUEST_STATUS } from './constant';
const { apiUtils: { getPayloadData } } = utils;


const initialState = {

    listStateDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        pageSize: 10,
        totalCount: 0,
        pageNo: 0,
        error: {},
        ...DEFAULT_TABLE_PROPS
    },
    fetchStateById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    }
};
let listStateResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_STATE_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listStateDetails: {
                    ...initialState.listStateDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_STATE_DETAILS_SUCCESS:
            listStateResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listStateDetails: {
                    ...state.listStateDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    pageSize: listStateResponse.pageable.pageSize,
                    totalCount: listStateResponse.totalElements,
                    pageNo: listStateResponse.pageable.pageNumber
                }
            });
        case ActionTypes.FETCH_STATE_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listStateDetails: {
                    ...initialState.listStateDetails,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_STATE_DETAILS_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchStateById: {
                    ...state.fetchStateById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_STATE_DETAILS_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                fetchStateById: {
                    ...state.fetchStateById,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_STATE_DETAILS_BY_ID_FAILURE:
            return Object.assign({}, state, {
                fetchStateById: {
                    ...state.fetchStateById,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.CLEAR_STATE_DETAILS_REDUCER:
            return Object.assign({}, state, {
                fetchStateById: {}
            });


        default:
            return state;

    }
};
export default reducer;
