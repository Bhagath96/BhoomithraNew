import { types as ActionTypes } from './actions';

import _ from '../../utils/LodashUtils';
import { formatFilterSearchKeys, getPayloadData } from '../../utils/ApiUtils';

const initialState = {
    listServiceChargeSlab: {
        // code to be removed
        data: {},
        requestInProgress: false,
        searchKeys: [],
        requestStatus: '',
        error: {}

    },
    getServiceChargeSlabById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    }

};
let listServiceChargeSlabResponce = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.RESET_SERVICE_FORM:
            return Object.assign({}, state, {
                getServiceChargeSlabById: {
                }
            });

        case ActionTypes.LIST_SERVICE_CHARGE_SLAB_REQUEST:
            return Object.assign({}, state, {
                listServiceChargeSlab: {
                    ...state.listServiceChargeSlab,
                    data: {},
                    requestInProgress: true
                }
            });

        case ActionTypes.LIST_SERVICE_CHARGE_SLAB_SUCCESS:
            listServiceChargeSlabResponce = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listServiceChargeSlab: {
                    data: listServiceChargeSlabResponce,
                    searchKeys: formatFilterSearchKeys(_.get(listServiceChargeSlabResponce, 'searchKeys', [])),
                    requestInProgress: false,
                    requestStatus: ''

                }
            });

        case ActionTypes.LIST_SERVICE_CHARGE_SLAB_FAILURE:
            return Object.assign({}, state, {
                listServiceChargeSlab: {
                    ...state.listServiceChargeSlab,
                    data: {},
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_SERVICE_CHARGE_SLAB_BY_ID_REQUEST:
            return Object.assign({}, state, {
                getServiceChargeSlabById: {
                    ...state.getServiceChargeSlabById,
                    data: {},
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_SERVICE_CHARGE_SLAB_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                getServiceChargeSlabById: {
                    ...state.getServiceChargeSlabById,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_SERVICE_CHARGE_SLAB_BY_ID_FAILURE:
            return Object.assign({}, state, {
                getServiceChargeSlabById: {
                    ...state.getServiceChargeSlabById,
                    data: {},
                    requestInProgress: false
                }
            });
        default:
            return state;

    }
};

export default reducer;
