import { DEFAULT_TABLE_PROPS } from '../../common/constants';
import utils from '../../utils';
import { types as ActionTypes } from './actions';
import { REQUEST_STATUS } from './constant';
const { apiUtils: { getPayloadData } } = utils;
import _ from '../../utils/LodashUtils';

import { formatFilterSearchKeys } from '../../utils/ApiUtils';
import { convertToLocal } from '../../utils/DateUtils';


const initialState = {

    listComplaintDetails: {
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
let listComplaintResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_COMPLAINT_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listComplaintDetails: {
                    ...initialState.listComplaintDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_COMPLAINT_DETAILS_SUCCESS:
            listComplaintResponse = getPayloadData(action.payload, {});
            _.forEach(listComplaintResponse.content || [], (item) => {
                if (_.has(item, 'reportedDate')) {
                    let reportedDate = _.get(item, 'reportedDate', '');
                    _.set(item, 'reportedDate', { id: reportedDate, name: convertToLocal(reportedDate) });
                }
                if (_.has(item, 'lastEscalatedAt')) {
                    let lastEscalatedAt = _.get(item, 'lastEscalatedAt', '');
                    _.set(item, 'lastEscalatedAt', { id: lastEscalatedAt, name: convertToLocal(lastEscalatedAt) });
                }
            });
            return Object.assign({}, state, {
                listComplaintDetails: {
                    ...state.listComplaintDetails,
                    data: listComplaintResponse,
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listComplaintResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS

                }
            });
        case ActionTypes.FETCH_COMPLAINT_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listComplaintDetails: {
                    ...initialState.listComplaintDetails,
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
