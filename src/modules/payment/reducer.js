import { DEFAULT_TABLE_PROPS } from '../../common/constants';
import utils from '../../utils';
import { types as ActionTypes } from './actions';
import { REQUEST_STATUS } from './constant';
const { apiUtils: { getPayloadData } } = utils;
import _ from '../../utils/LodashUtils';

import { formatFilterSearchKeys } from '../../utils/ApiUtils';


const initialState = {

    listPaymentDetails: {
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
let listPaymentResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_PAYMENT_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listPaymentDetails: {
                    ...initialState.listPaymentDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_PAYMENT_DETAILS_SUCCESS:
            listPaymentResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listPaymentDetails: {
                    ...state.listPaymentDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listPaymentResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    pageSize: listPaymentResponse.pageable.pageSize,
                    totalCount: listPaymentResponse.totalElements,
                    pageNo: listPaymentResponse.pageable.pageNumber
                }
            });
        case ActionTypes.FETCH_PAYMENT_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listPaymentDetails: {
                    ...initialState.listPaymentDetails,
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
