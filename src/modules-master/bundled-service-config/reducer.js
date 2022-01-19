import { types as ActionTypes } from './actions';

import _ from '../../utils/LodashUtils';
import { formatFilterSearchKeys, getPayloadData, formatCheckBoxesFromAPI } from '../../utils/ApiUtils';

const initialState = {
    listBundledServiceConfig: {
        // code to be removed
        data: {},
        requestInProgress: false,
        searchKeys: [],
        requestStatus: '',
        error: {}
    },
    getBundledServiceConfigById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    },
    assignBundledServiceConfigsView: {

    }
    // roleAssignBundledServiceConfigsView: {

    // },

};
let listBundledServiceConfigResponce = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.RESET_SERVICE_FORM:
            return Object.assign({}, state, {
                getBundledServiceConfigById: {
                }
            });
        case ActionTypes.LIST_BUNDLED_SERVICE_CONFIG_REQUEST:
            return Object.assign({}, state, {
                listBundledServiceConfig: {
                    ...state.listBundledServiceConfig,
                    data: {},
                    requestInProgress: true
                }
            });

        case ActionTypes.LIST_BUNDLED_SERVICE_CONFIG_SUCCESS:
            listBundledServiceConfigResponce = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listBundledServiceConfig: {
                    data: listBundledServiceConfigResponce,
                    searchKeys: formatFilterSearchKeys(_.get(listBundledServiceConfigResponce, 'searchKeys', [])),
                    requestInProgress: false,
                    requestStatus: ''
                }
            });

        case ActionTypes.LIST_BUNDLED_SERVICE_CONFIG_FAILURE:
            return Object.assign({}, state, {
                listBundledServiceConfig: {
                    ...state.listBundledServiceConfig,
                    data: {},
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_BUNDLED_SERVICE_CONFIG_BY_ID_REQUEST:
            return Object.assign({}, state, {
                getBundledServiceConfigById: {
                    ...state.getBundledServiceConfigById,
                    data: {},
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_BUNDLED_SERVICE_CONFIG_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                getBundledServiceConfigById: {
                    ...state.getBundledServiceConfigById,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_BUNDLED_SERVICE_CONFIG_BY_ID_FAILURE:
            return Object.assign({}, state, {
                getBundledServiceConfigById: {
                    ...state.getBundledServiceConfigById,
                    data: {},
                    requestInProgress: false
                }
            });

        case ActionTypes.FETCH_BUNDLED_SERVICE_CONFIG_FOR_CHK_REQUEST:
            return Object.assign({}, state, {
                assignBundledServiceConfigList: {
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_BUNDLED_SERVICE_CONFIG_FOR_CHK_SUCCESS:
            return Object.assign({}, state, {
                assignBundledServiceConfigList: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                },
                assignBundledServiceConfigsView: {
                    ...state.assignBundledServiceConfigsView,
                    formData: formatCheckBoxesFromAPI(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.FETCH_BUNDLED_SERVICE_CONFIG_FOR_CHK_FAILURE:
            return Object.assign({}, state, {
                assignBundledServiceConfigList: {
                    requestInProgress: false,
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
