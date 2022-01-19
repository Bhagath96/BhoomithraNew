import { types as ActionTypes } from './actions';

import _ from '../../utils/LodashUtils';
import { formatFilterSearchKeys, getPayloadData } from '../../utils/ApiUtils';

const initialState = {
    listTerraceFarming: {
        // code to be removed
        data: {},
        requestInProgress: false,
        searchKeys: [],
        requestStatus: '',
        error: {}
    },
    getTerraceFarmingById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    }

};
let listTerraceFarmingResponce = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.RESET_SERVICE_FORM:
            return Object.assign({}, state, {
                getTerraceFarmingById: {
                }
            });

        case ActionTypes.LIST_TERRACE_FARMING_REQUEST:
            return Object.assign({}, state, {
                listTerraceFarming: {
                    ...state.listTerraceFarming,
                    data: {},
                    requestInProgress: true
                }
            });

        case ActionTypes.LIST_TERRACE_FARMING_SUCCESS:
            listTerraceFarmingResponce = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listTerraceFarming: {
                    data: listTerraceFarmingResponce,
                    searchKeys: formatFilterSearchKeys(_.get(listTerraceFarmingResponce, 'searchKeys', [])),
                    requestInProgress: false,
                    requestStatus: ''


                }
            });

        case ActionTypes.LIST_TERRACE_FARMING_FAILURE:
            return Object.assign({}, state, {
                listTerraceFarming: {
                    ...state.listTerraceFarming,
                    data: {},
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_TERRACE_FARMING_BY_ID_REQUEST:
            return Object.assign({}, state, {
                getTerraceFarmingById: {
                    ...state.getTerraceFarmingById,
                    data: {},
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_TERRACE_FARMING_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                getTerraceFarmingById: {
                    ...state.getTerraceFarmingById,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_TERRACE_FARMING_BY_ID_FAILURE:
            return Object.assign({}, state, {
                getTerraceFarmingById: {
                    ...state.getTerraceFarmingById,
                    data: {},
                    requestInProgress: false
                }
            });
        default:
            return state;

    }
};

export default reducer;
