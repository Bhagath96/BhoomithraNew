import { types as ActionTypes } from './actions';

import _ from '../../utils/LodashUtils';
import { formatFilterSearchKeys, getPayloadData } from '../../utils/ApiUtils';

const initialState = {
    listPublicGatheringMethod: {
        // code to be removed
        data: {},
        requestInProgress: false,
        searchKeys: [],
        requestStatus: '',
        error: {}
    },
    getAssociationTypeById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    }

};
let listPublicGatheringMethodResponce = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.RESET_SERVICE_FORM:
            return Object.assign({}, state, {
                getPublicGatheringMethodById: {
                }
            });
        case ActionTypes.LIST_PUBLIC_GATHERING_METHOD_REQUEST:
            return Object.assign({}, state, {
                listPublicGatheringMethod: {
                    ...state.listPublicGatheringMethod,
                    data: {},
                    requestInProgress: true
                }
            });

        case ActionTypes.LIST_PUBLIC_GATHERING_METHOD_SUCCESS:
            listPublicGatheringMethodResponce = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listPublicGatheringMethod: {
                    data: listPublicGatheringMethodResponce,
                    searchKeys: formatFilterSearchKeys(_.get(listPublicGatheringMethodResponce, 'searchKeys', [])),
                    requestInProgress: false,
                    requestStatus: ''
                }
            });

        case ActionTypes.LIST_PUBLIC_GATHERING_METHOD_FAILURE:
            return Object.assign({}, state, {
                listPublicGatheringMethod: {
                    ...state.listPublicGatheringMethod,
                    data: {},
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_PUBLIC_GATHERING_METHOD_BY_ID_REQUEST:
            return Object.assign({}, state, {
                getPublicGatheringMethodById: {
                    ...state.getPublicGatheringMethodById,
                    data: {},
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_PUBLIC_GATHERING_METHOD_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                getPublicGatheringMethodById: {
                    ...state.getPublicGatheringMethodById,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_PUBLIC_GATHERING_METHOD_BY_ID_FAILURE:
            return Object.assign({}, state, {
                getPublicGatheringMethodById: {
                    ...state.getPublicGatheringMethodById,
                    data: {},
                    requestInProgress: false
                }
            });
        default:
            return state;

    }
};

export default reducer;
