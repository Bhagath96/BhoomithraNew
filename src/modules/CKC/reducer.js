import utils from '../../utils';
import { types as ActionTypes } from './actions';
import { REQUEST_STATUS } from './constant';
const { apiUtils: { getPayloadData } } = utils;
import _ from '../../utils/LodashUtils';

import { formatFilterSearchKeys } from '../../utils/ApiUtils';


const initialState = {
    listCKCPickup: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {}
    },
    listCKCSales: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {}
    },
    listCKCItems: {
        data: []
    }
};
let listCKCPickupResponse = {};
let listCKCSalesResponse = {},
    listCKCItemsResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CKC_PICKUP_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listCKCPickup: {
                    ...initialState.listCKCPickup,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_CKC_PICKUP_DETAILS_SUCCESS:
            listCKCPickupResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listCKCPickup: {
                    ...state.listCKCPickup,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listCKCPickupResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_CKC_PICKUP_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listCKCPickup: {
                    ...initialState.listCKCPickup,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.FETCH_CKC_SALES_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listCKCSales: {
                    ...initialState.listCKCSales,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_CKC_SALES_DETAILS_SUCCESS:
            listCKCSalesResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listCKCSales: {
                    ...state.listCKCSales,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listCKCSalesResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_CKC_SALES_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listCKCSales: {
                    ...initialState.listCKCSales,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_CKC_ITEMS_REQUEST:
            return Object.assign({}, state, {
                listCKCItems: {
                    ...initialState.listCKCItems,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_CKC_ITEMS_SUCCESS:
            listCKCItemsResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listCKCItems: {
                    ...state.listCKCItems,
                    data: listCKCItemsResponse,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_CKC_ITEMS_FAILURE:
            return Object.assign({}, state, {
                listCKCItems: {
                    ...initialState.listCKCItems,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        default:
            return state;

    }
};
export default reducer;
