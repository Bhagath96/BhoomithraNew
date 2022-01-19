import { types as ActionTypes } from './actions';

import _ from '../../utils/LodashUtils';
import { formatFilterSearchKeys, getPayloadData } from '../../utils/ApiUtils';

const initialState = {
    listIncident: {
        // code to be removed
        data: {},
        requestInProgress: false,
        searchKeys: [],
        requestStatus: '',
        error: {},
        pageSize: 10,
        pageNo: 0,
        totalCount: 0
    },
    getIncidentById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    }

};
let listIncidentResponce = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.RESET_SERVICE_FORM:
            return Object.assign({}, state, {
                getIncidentById: {
                }
            });

        case ActionTypes.LIST_INCIDENT_REQUEST:
            return Object.assign({}, state, {
                listIncident: {
                    ...state.listIncident,
                    data: {},
                    requestInProgress: true
                }
            });

        case ActionTypes.LIST_INCIDENT_SUCCESS:
            listIncidentResponce = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listIncident: {
                    data: listIncidentResponce,
                    searchKeys: formatFilterSearchKeys(_.get(listIncidentResponce, 'searchKeys', [])),
                    requestInProgress: false,
                    requestStatus: '',
                    size: listIncidentResponce.pageable.pageSize,
                    count: listIncidentResponce.totalElements,
                    page: listIncidentResponce.pageable.pageNumber
                }
            });

        case ActionTypes.LIST_INCIDENT_FAILURE:
            return Object.assign({}, state, {
                listIncident: {
                    ...state.listIncident,
                    data: {},
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_INCIDENT_BY_ID_REQUEST:
            return Object.assign({}, state, {
                getIncidentById: {
                    ...state.getIncidentById,
                    data: {},
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_INCIDENT_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                getIncidentById: {
                    ...state.getIncidentById,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_INCIDENT_BY_ID_FAILURE:
            return Object.assign({}, state, {
                getIncidentById: {
                    ...state.getIncidentById,
                    data: {},
                    requestInProgress: false
                }
            });
        default:
            return state;

    }
};

export default reducer;
