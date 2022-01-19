import { DEFAULT_TABLE_PROPS } from '../../common/constants';
import utils from '../../utils';
import { types as ActionTypes } from './actions';
import { REQUEST_STATUS } from './constant';
const { apiUtils: { getPayloadData } } = utils;
import _ from '../../utils/LodashUtils';

import { formatFilterSearchKeys } from '../../utils/ApiUtils';


const initialState = {

    listReportedBugs: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {},
        ...DEFAULT_TABLE_PROPS
    }

};
let listReportedBugsResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_REPORTED_BUGS_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listReportedBugs: {
                    ...initialState.listReportedBugs,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_REPORTED_BUGS_DETAILS_SUCCESS:
            listReportedBugsResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listReportedBugs: {
                    ...state.listReportedBugs,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listReportedBugsResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_REPORTED_BUGS_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listReportedBugs: {
                    ...initialState.listReportedBugs,
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
