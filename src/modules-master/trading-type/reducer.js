import { types as ActionTypes } from './actions';

import _ from '../../utils/LodashUtils';
import { formatFilterSearchKeys, getPayloadData } from '../../utils/ApiUtils';

const initialState = {
    listTradingType: {
        // code to be removed
        data: {},
        requestInProgress: false,
        searchKeys: [],
        requestStatus: '',
        error: {}
    },
    currentFilterState: {},
    filterStateForTradingType: {},
    getTradingTypeById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    }

};
let listTradingTypeResponce = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.RESET_SERVICE_FORM:
            return Object.assign({}, state, {
                getTradingTypeById: {
                }
            });

        case ActionTypes.STORE_JSON_DATA_FOR_TRADING_TYPE:
            return Object.assign({}, state, {
                filterStateForTradingType: {
                    ...state.filterStateForTradingType,
                    ...action.payload.data
                }
            });
        case ActionTypes.LIST_TRADING_TYPE_REQUEST:
            return Object.assign({}, state, {
                listTradingType: {
                    ...state.listTradingType,
                    data: {},
                    requestInProgress: true
                }
            });

        case ActionTypes.LIST_TRADING_TYPE_SUCCESS:
            listTradingTypeResponce = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listTradingType: {
                    data: listTradingTypeResponce,
                    searchKeys: formatFilterSearchKeys(_.get(listTradingTypeResponce, 'searchKeys', [])),
                    requestInProgress: false,
                    requestStatus: ''

                }
            });

        case ActionTypes.LIST_TRADING_TYPE_FAILURE:
            return Object.assign({}, state, {
                listTradingType: {
                    ...state.listTradingType,
                    data: {},
                    requestInProgress: false
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

        case ActionTypes.GET_TRADING_TYPE_BY_ID_REQUEST:
            return Object.assign({}, state, {
                getTradingTypeById: {
                    ...state.getTradingTypeById,
                    data: {},
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_TRADING_TYPE_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                getTradingTypeById: {
                    ...state.getTradingTypeById,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_TRADING_TYPE_BY_ID_FAILURE:
            return Object.assign({}, state, {
                getTradingTypeById: {
                    ...state.getTradingTypeById,
                    data: {},
                    requestInProgress: false
                }
            });
        default:
            return state;

    }
};

export default reducer;
