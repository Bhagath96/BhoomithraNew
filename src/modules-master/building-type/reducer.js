import { types as ActionTypes } from './actions';

import _ from '../../utils/LodashUtils';
import { formatFilterSearchKeys, getPayloadData } from '../../utils/ApiUtils';

const initialState = {
    listBuildingType: {
        // code to be removed
        data: {},
        requestInProgress: false,
        searchKeys: [],
        requestStatus: '',
        error: {}
    },
    getBuildingTypeById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    },
    getResidentialCategory: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    }

};
let listBuildingTypeResponce = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.RESET_SERVICE_FORM:
            return Object.assign({}, state, {
                getBuildingTypeById: {
                }
            });
        case ActionTypes.LIST_BUILDING_TYPE_REQUEST:
            return Object.assign({}, state, {
                listBuildingType: {
                    ...state.listBuildingType,
                    data: {},
                    requestInProgress: true
                }
            });

        case ActionTypes.LIST_BUILDING_TYPE_SUCCESS:
            listBuildingTypeResponce = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listBuildingType: {
                    data: listBuildingTypeResponce,
                    searchKeys: formatFilterSearchKeys(_.get(listBuildingTypeResponce, 'searchKeys', [])),
                    requestInProgress: false,
                    requestStatus: ''
                }
            });

        case ActionTypes.LIST_BUILDING_TYPE_FAILURE:
            return Object.assign({}, state, {
                listBuildingType: {
                    ...state.listBuildingType,
                    data: {},
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_BUILDING_TYPE_BY_ID_REQUEST:
            return Object.assign({}, state, {
                getBuildingTypeById: {
                    ...state.getBuildingTypeById,
                    data: {},
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_BUILDING_TYPE_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                getBuildingTypeById: {
                    ...state.getBuildingTypeById,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_BUILDING_TYPE_BY_ID_FAILURE:
            return Object.assign({}, state, {
                getBuildingTypeById: {
                    ...state.getBuildingTypeById,
                    data: {},
                    requestInProgress: false
                }
            });

        case ActionTypes.LOAD_RESIDENTIAL_CATEGORY_REQUEST:
            return Object.assign({}, state, {
                getResidentialCategory: {
                    ...state.getResidentialCategory,
                    data: {},
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_RESIDENTIAL_CATEGORY_SUCCESS:
            return Object.assign({}, state, {
                getResidentialCategory: {
                    ...state.getResidentialCategory,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });

        case ActionTypes.LOAD_RESIDENTIAL_CATEGORY_FAILURE:
            return Object.assign({}, state, {
                getResidentialCategory: {
                    ...state.getResidentialCategory,
                    data: {},
                    requestInProgress: false
                }
            });
        default:
            return state;

    }
};

export default reducer;
