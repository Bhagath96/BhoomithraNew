import { types as ActionTypes } from './actions';

import _ from '../../utils/LodashUtils';
import { formatFilterSearchKeys, getPayloadData } from '../../utils/ApiUtils';

const initialState = {
    listResidenceCategory: {
        // code to be removed
        data: {},
        requestInProgress: false,
        searchKeys: [],
        requestStatus: '',
        error: {}
    },
    getResidenceCategoryById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    }

};
let listResidenceCategoryResponce = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.RESET_RESIDENCE_FORM:
            return Object.assign({}, state, {
                getResidenceCategoryById: {
                }
            });

        case ActionTypes.STORE_JSON_DATA_FOR_RESIDENCE_CATEGORY:
            return Object.assign({}, state, {
                filterStateForResidenceCategory: {
                    ...state.filterStateForResidenceCategory,
                    ...action.payload.data
                }
            });
        case ActionTypes.LIST_RESIDENCE_CATEGORY_REQUEST:
            return Object.assign({}, state, {
                listResidenceCategory: {
                    ...state.listResidenceCategory,
                    data: {},
                    requestInProgress: true
                }
            });

        case ActionTypes.LIST_RESIDENCE_CATEGORY_SUCCESS:
            listResidenceCategoryResponce = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listResidenceCategory: {
                    data: listResidenceCategoryResponce,
                    searchKeys: formatFilterSearchKeys(_.get(listResidenceCategoryResponce, 'searchKeys', [])),
                    requestInProgress: false,
                    requestStatus: ''
                }
            });

        case ActionTypes.LIST_RESIDENCE_CATEGORY_FAILURE:
            return Object.assign({}, state, {
                listResidenceCategory: {
                    ...state.listResidenceCategory,
                    data: {},
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_RESIDENCE_CATEGORY_BY_ID_REQUEST:
            return Object.assign({}, state, {
                getResidenceCategoryById: {
                    ...state.getResidenceCategoryById,
                    data: {},
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_RESIDENCE_CATEGORY_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                getResidenceCategoryById: {
                    ...state.getResidenceCategoryById,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_RESIDENCE_CATEGORY_BY_ID_FAILURE:
            return Object.assign({}, state, {
                getResidenceCategoryById: {
                    ...state.getResidenceCategoryById,
                    data: {},
                    requestInProgress: false
                }
            });
        default:
            return state;

    }
};

export default reducer;
