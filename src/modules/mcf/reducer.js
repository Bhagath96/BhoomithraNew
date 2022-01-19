import utils from '../../utils';
import { types as ActionTypes } from './actions';
import { REQUEST_STATUS } from './constant';
const { apiUtils: { getPayloadData } } = utils;
import _ from '../../utils/LodashUtils';

import { formatFilterSearchKeys } from '../../utils/ApiUtils';


const initialState = {

    listStockInDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {}
    },
    listMcfSeggregationDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {}
    },
    listStockTransferDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {}
    },
    listStockSaleDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {}
    },
    listStockItems: {
        data: []
    }

};
let listStockInResponse = {};
let listMcfSeggregationResponse = {};

let listStockTransferResponse = {}, listStockItemsResponse = {};


const reducer = (state = initialState, action) => {
    switch (action.type) {


        case ActionTypes.FETCH_MCF_SEGGRATION_REQUEST:
            return Object.assign({}, state, {
                listMcfSeggregationDetails: {
                    ...initialState.listMcfSeggregationDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_MCF_SEGGRATION_SUCCESS:
            listMcfSeggregationResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listMcfSeggregationDetails: {
                    ...state.listMcfSeggregationDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listMcfSeggregationResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_MCF_SEGGRATION_FAILURE:
            return Object.assign({}, state, {
                listMcfSeggregationDetails: {
                    ...initialState.listMcfSeggregationDetails,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });


        case ActionTypes.FETCH_STOCK_SALE_REQUEST:
            return Object.assign({}, state, {
                listStockSaleDetails: {
                    ...initialState.listStockSaleDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_STOCK_SALE_SUCCESS:
            listStockTransferResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listStockSaleDetails: {
                    ...state.listStockSaleDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listStockTransferResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_STOCK_SALE_FAILURE:
            return Object.assign({}, state, {
                listStockSaleDetails: {
                    ...initialState.listStockSaleDetails,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.FETCH_STOCK_TRANSFER_REQUEST:
            return Object.assign({}, state, {
                listStockTransferDetails: {
                    ...initialState.listStockTransferDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_STOCK_TRANSFER_SUCCESS:
            listStockTransferResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listStockTransferDetails: {
                    ...state.listStockTransferDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listStockTransferResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_STOCK_TRANSFER_FAILURE:
            return Object.assign({}, state, {
                listStockTransferDetails: {
                    ...initialState.listStockTransferDetails,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.FETCH_STOCK_IN_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listStockInDetails: {
                    ...initialState.listStockInDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_STOCK_IN_DETAILS_SUCCESS:
            listStockInResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listStockInDetails: {
                    ...state.listStockInDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listStockInResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_STOCK_IN_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listStockInDetails: {
                    ...initialState.listStockInDetails,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_STOCK_ITEMS_REQUEST:
            return Object.assign({}, state, {
                listStockItems: {
                    ...initialState.listStockItems,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_STOCK_ITEMS_SUCCESS:
            listStockItemsResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listStockItems: {
                    ...state.listStockItems,
                    data: listStockItemsResponse,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_STOCK_ITEMS_FAILURE:
            return Object.assign({}, state, {
                listStockItems: {
                    ...initialState.listStockItems,
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
