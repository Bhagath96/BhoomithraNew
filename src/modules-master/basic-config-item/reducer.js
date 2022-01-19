import utils from '../../utils';
import { types as ActionTypes } from './actions';
import { REQUEST_STATUS } from './constant';
const { apiUtils: { getPayloadData } } = utils;
import _ from '../../utils/LodashUtils';

import { formatFilterSearchKeys } from '../../utils/ApiUtils';


const initialState = {

    listItemDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {}
    },
    fetchItemById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    },
    listSubCategoryItemDetails: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    },
    fetchSubCategoryById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    }

};
let listItemResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_ITEM_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listItemDetails: {
                    ...initialState.listItemDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ITEM_DETAILS_SUCCESS:
            listItemResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listItemDetails: {
                    ...state.listItemDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listItemResponse, 'searchKeys', [])),

                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_ITEM_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listItemDetails: {
                    ...initialState.listItemDetails,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_ITEM_DETAILS_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchItemById: {
                    ...state.fetchItemById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_ITEM_DETAILS_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                fetchItemById: {
                    ...state.fetchItemById,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_ITEM_DETAILS_BY_ID_FAILURE:
            return Object.assign({}, state, {
                fetchItemById: {
                    ...state.fetchItemById,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.CLEAR_ITEM_DETAILS_REDUCER:
            return Object.assign({}, state, {
                fetchItemById: {}
            });
        //fetch sub category item details
        case ActionTypes.FETCH_SUB_CATEGORY_ITEM_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listSubCategoryItemDetails: {
                    ...state.listSubCategoryItemDetails,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_SUB_CATEGORY_ITEM_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                listSubCategoryItemDetails: {
                    ...state.listSubCategoryItemDetails,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {}),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });

        case ActionTypes.FETCH_SUB_CATEGORY_ITEM_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listSubCategoryItemDetails: {
                    ...state.listSubCategoryItemDetails,
                    requestInProgress: false,
                    data: [],
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        //fetch sub category item by id details
        case ActionTypes.FETCH_SUB_CATEGORY_ITEM_BY_ID_DETAILS_REQUEST:
            return Object.assign({}, state, {
                fetchSubCategoryById: {
                    ...state.fetchSubCategoryById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_SUB_CATEGORY_ITEM_BY_ID_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                fetchSubCategoryById: {
                    ...state.fetchSubCategoryById,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_SUB_CATEGORY_ITEM_BY_ID_DETAILS_FAILURE:
            return Object.assign({}, state, {
                fetchSubCategoryById: {
                    ...state.fetchSubCategoryById,
                    requestInProgress: false,
                    data: []
                }
            });
        default:
            return state;

    }
};
export default reducer;
