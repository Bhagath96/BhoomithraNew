import { types as ActionTypes } from './actions';

import _ from '../../utils/LodashUtils';
import { formatFilterSearchKeys, getPayloadData } from '../../utils/ApiUtils';

const initialState = {
    listAssocationType: {
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
let listAssocationTypeResponce = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.RESET_SERVICE_FORM:
            return Object.assign({}, state, {
                getAssocationTypeById: {
                }
            });
        case ActionTypes.LIST_ASSOCIATION_TYPE_REQUEST:
            return Object.assign({}, state, {
                listAssocationType: {
                    ...state.listAssocationType,
                    data: {},
                    requestInProgress: true
                }
            });

        case ActionTypes.LIST_ASSOCIATION_TYPE_SUCCESS:
            listAssocationTypeResponce = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listAssocationType: {
                    data: listAssocationTypeResponce,
                    searchKeys: formatFilterSearchKeys(_.get(listAssocationTypeResponce, 'searchKeys', [])),
                    requestInProgress: false,
                    requestStatus: ''
                }
            });

        case ActionTypes.LIST_ASSOCIATION_TYPE_FAILURE:
            return Object.assign({}, state, {
                listAssocationType: {
                    ...state.listAssocationType,
                    data: {},
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_ASSOCIATION_TYPE_BY_ID_REQUEST:
            return Object.assign({}, state, {
                getAssociationTypeById: {
                    ...state.getAssociationTypeById,
                    data: {},
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_ASSOCIATION_TYPE_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                getAssociationTypeById: {
                    ...state.getAssociationTypeById,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_ASSOCIATION_TYPE_BY_ID_FAILURE:
            return Object.assign({}, state, {
                getAssociationTypeById: {
                    ...state.getAssociationTypeById,
                    data: {},
                    requestInProgress: false
                }
            });
        default:
            return state;

    }
};

export default reducer;
