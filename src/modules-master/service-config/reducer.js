import { types as ActionTypes } from './actions';

import _ from '../../utils/LodashUtils';
import { formatFilterSearchKeys, getPayloadData } from '../../utils/ApiUtils';

const initialState = {
    listServiceConfig: {
        // code to be removed
        data: {},
        requestInProgress: false,
        searchKeys: [],
        requestStatus: '',
        error: {}
    },
    getServiceConfigById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    }

};
let listServiceConfigResponce = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.RESET_SERVICE_FORM:
            return Object.assign({}, state, {
                getServiceConfigById: {
                }
            });
        case ActionTypes.LIST_SERVICE_CONFIG_REQUEST:
            return Object.assign({}, state, {
                listServiceConfig: {
                    ...state.listServiceConfig,
                    data: {},
                    requestInProgress: true
                }
            });

        case ActionTypes.LIST_SERVICE_CONFIG_SUCCESS:
            listServiceConfigResponce = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listServiceConfig: {
                    data: listServiceConfigResponce,
                    searchKeys: formatFilterSearchKeys(_.get(listServiceConfigResponce, 'searchKeys', [])),
                    requestInProgress: false,
                    requestStatus: ''

                }
            });

        case ActionTypes.LIST_SERVICE_CONFIG_FAILURE:
            return Object.assign({}, state, {
                listServiceConfig: {
                    ...state.listServiceConfig,
                    data: {},
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_SERVICE_CONFIG_BY_ID_REQUEST:
            return Object.assign({}, state, {
                getServiceConfigById: {
                    ...state.getServiceConfigById,
                    data: {},
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_SERVICE_CONFIG_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                getServiceConfigById: {
                    ...state.getServiceConfigById,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_SERVICE_CONFIG_BY_ID_FAILURE:
            return Object.assign({}, state, {
                getServiceConfigById: {
                    ...state.getServiceConfigById,
                    data: {},
                    requestInProgress: false
                }
            });
        default:
            return state;

    }
};

export default reducer;
