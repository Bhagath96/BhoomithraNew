import utils from '../../utils';
import { types as ActionTypes } from './actions';
import { REQUEST_STATUS } from './constant';
const { apiUtils: { getPayloadData } } = utils;
import _ from '../../utils/LodashUtils';

import { formatFilterSearchKeys } from '../../utils/ApiUtils';


const initialState = {
    listRRFStockIn: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {}
    },

    listRRFShreddedDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {}
    },


    listRRFSales: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {}
    },
    listRRFItems: {
        data: []
    }
};
let listRRFStockInResponse = {};
let listRRFShreddedResponse = {};

let listRRFSalesResponse = {}, listRRFItemsResponse = {};


const reducer = (state = initialState, action) => {
    switch (action.type) {


        case ActionTypes.FETCH_RRF_SHREDDED_REQUEST:
            return Object.assign({}, state, {
                listRRFShreddedDetails: {
                    ...initialState.listRRFShreddedDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_RRF_SHREDDED_SUCCESS:
            listRRFShreddedResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listRRFShreddedDetails: {
                    ...state.listRRFShreddedDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listRRFShreddedResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_RRF_SHREDDED_FAILURE:
            return Object.assign({}, state, {
                listRRFShreddedDetails: {
                    ...initialState.listRRFShreddedDetails,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.FETCH_RRF_STOCK_IN_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listRRFStockIn: {
                    ...initialState.listRRFStockIn,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_RRF_STOCK_IN_DETAILS_SUCCESS:
            listRRFStockInResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listRRFStockIn: {
                    ...state.listRRFStockIn,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listRRFStockInResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_RRF_STOCK_IN_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listRRFStockIn: {
                    ...initialState.listRRFStockIn,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.FETCH_RRF_SALES_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listRRFSales: {
                    ...initialState.listRRFSales,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_RRF_SALES_DETAILS_SUCCESS:
            listRRFSalesResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listRRFSales: {
                    ...state.listRRFSales,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listRRFSalesResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_RRF_SALES_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listRRFSales: {
                    ...initialState.listRRFSales,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_RRF_ITEMS_REQUEST:
            return Object.assign({}, state, {
                listRRFItems: {
                    ...initialState.listRRFItems,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_RRF_ITEMS_SUCCESS:
            listRRFItemsResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listRRFItems: {
                    ...state.listRRFItems,
                    data: listRRFItemsResponse,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_RRF_ITEMS_FAILURE:
            return Object.assign({}, state, {
                listRRFItems: {
                    ...initialState.listRRFItems,
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
