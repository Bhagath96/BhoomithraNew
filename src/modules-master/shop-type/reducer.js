import { types as ActionTypes } from './actions';

import _ from '../../utils/LodashUtils';
import { formatFilterSearchKeys, getPayloadData } from '../../utils/ApiUtils';

const initialState = {
    listShopType: {
        // code to be removed
        data: {},
        requestInProgress: false,
        searchKeys: [],
        requestStatus: '',
        error: {}

    },
    getShopTypeById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    }

};
let listShopTypeResponce = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.RESET_SERVICE_FORM:
            return Object.assign({}, state, {
                getShopTypeById: {
                }
            });

        case ActionTypes.LIST_SHOP_TYPE_REQUEST:
            return Object.assign({}, state, {
                listShopType: {
                    ...state.listShopType,
                    data: {},
                    requestInProgress: true
                }
            });

        case ActionTypes.LIST_SHOP_TYPE_SUCCESS:
            listShopTypeResponce = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listShopType: {
                    data: listShopTypeResponce,
                    searchKeys: formatFilterSearchKeys(_.get(listShopTypeResponce, 'searchKeys', [])),
                    requestInProgress: false,
                    requestStatus: ''

                }
            });

        case ActionTypes.LIST_SHOP_TYPE_FAILURE:
            return Object.assign({}, state, {
                listShopType: {
                    ...state.listShopType,
                    data: {},
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_SHOP_TYPE_BY_ID_REQUEST:
            return Object.assign({}, state, {
                getShopTypeById: {
                    ...state.getShopTypeById,
                    data: {},
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_SHOP_TYPE_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                getShopTypeById: {
                    ...state.getShopTypeById,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_SHOP_TYPE_BY_ID_FAILURE:
            return Object.assign({}, state, {
                getShopTypeById: {
                    ...state.getShopTypeById,
                    data: {},
                    requestInProgress: false
                }
            });
        default:
            return state;

    }
};

export default reducer;
