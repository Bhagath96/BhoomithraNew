import utils from '../../utils';
import { types as ActionTypes } from './actions';
const { apiUtils: { getPayloadData } } = utils;
import _ from '../../utils/LodashUtils';

import { formatFilterSearchKeys } from '../../utils/ApiUtils';


const initialState = {

    listItemCategoryDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {}
    },
    fetchItemCategoryById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    }

};
let listItemResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_ITEM_SUBCATEGORY_REQUEST:
            return Object.assign({}, state, {
                listItemCategoryDetails: {
                    ...initialState.listItemCategoryDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ITEM_SUBCATEGORY_SUCCESS:
            listItemResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listItemCategoryDetails: {
                    ...state.listItemCategoryDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listItemResponse, 'searchKeys', []))

                }
            });
        case ActionTypes.FETCH_ITEM_SUBCATEGORY_FAILURE:
            return Object.assign({}, state, {
                listItemCategoryDetails: {
                    ...initialState.listItemCategoryDetails,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_ITEM_SUBCATEGORY_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchItemCategoryById: {
                    ...state.fetchItemCategoryById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_ITEM_SUBCATEGORY_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                fetchItemCategoryById: {
                    ...state.fetchItemCategoryById,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_ITEM_SUBCATEGORY_BY_ID_FAILURE:
            return Object.assign({}, state, {
                fetchItemCategoryById: {
                    ...state.fetchItemCategoryById,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.CLEAR_ITEM_SUBCATEGORY_REDUCER:
            return Object.assign({}, state, {
                fetchItemCategoryById: {}
            });
        default:
            return state;

    }
};
export default reducer;
