import { DEFAULT_TABLE_PROPS } from '../../common/constants';
import utils from '../../utils';
import { types as ActionTypes } from './actions';
import { REQUEST_STATUS } from './constant';
const { apiUtils: { getPayloadData } } = utils;
import _ from '../../utils/LodashUtils';

import { formatFilterSearchKeys } from '../../utils/ApiUtils';


const initialState = {

    listIncidents: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        pageSize: 10,
        searchKeys: [],
        totalCount: 0,
        pageNo: 0,
        error: {},
        ...DEFAULT_TABLE_PROPS
    }

};
let listIncidentsResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_INCIDENTS_REQUEST:
            return Object.assign({}, state, {
                listIncidents: {
                    ...initialState.listIncidents,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_INCIDENTS_SUCCESS:
            listIncidentsResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listIncidents: {
                    ...state.listIncidents,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listIncidentsResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS

                }
            });
        case ActionTypes.FETCH_INCIDENTS_FAILURE:
            return Object.assign({}, state, {
                listIncidents: {
                    ...initialState.listIncidents,
                    requestStatus: REQUEST_STATUS.FAILED,
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
