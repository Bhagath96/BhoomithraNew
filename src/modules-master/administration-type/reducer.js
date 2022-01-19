import { types as ActionTypes } from './actions';

import _ from '../../utils/LodashUtils';
import { formatFilterSearchKeys, getPayloadData } from '../../utils/ApiUtils';

const initialState = {
    listAdministrationType: {
        // code to be removed
        data: {},
        requestInProgress: false,
        searchKeys: [],
        requestStatus: '',
        error: {}
    },
    getAdministrationTypeById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    }

};
let listAdministrationTypeResponce = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.RESET_SERVICE_FORM:
            return Object.assign({}, state, {
                getAdministrationTypeById: {
                }
            });
        case ActionTypes.LIST_ADMINISTRATION_TYPE_REQUEST:
            return Object.assign({}, state, {
                listAdministrationType: {
                    ...state.listAdministrationType,
                    data: {},
                    requestInProgress: true
                }
            });

        case ActionTypes.LIST_ADMINISTRATION_TYPE_SUCCESS:
            listAdministrationTypeResponce = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listAdministrationType: {
                    data: listAdministrationTypeResponce,
                    searchKeys: formatFilterSearchKeys(_.get(listAdministrationTypeResponce, 'searchKeys', [])),
                    requestInProgress: false,
                    requestStatus: ''
                }
            });

        case ActionTypes.LIST_ADMINISTRATION_TYPE_FAILURE:
            return Object.assign({}, state, {
                listAdministrationType: {
                    ...state.listAdministrationType,
                    data: {},
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_ADMINISTRATION_TYPE_BY_ID_REQUEST:
            return Object.assign({}, state, {
                getAdministrationTypeById: {
                    ...state.getAdministrationTypeById,
                    data: {},
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_ADMINISTRATION_TYPE_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                getAdministrationTypeById: {
                    ...state.getAdministrationTypeById,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_ADMINISTRATION_TYPE_BY_ID_FAILURE:
            return Object.assign({}, state, {
                getAdministrationTypeById: {
                    ...state.getAdministrationTypeById,
                    data: {},
                    requestInProgress: false
                }
            });
        default:
            return state;

    }
};

export default reducer;
