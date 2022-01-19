import utils from '../../utils';
import { types as ActionTypes } from './actions';
import { REQUEST_STATUS } from './constant';
const { apiUtils: { getPayloadData } } = utils;
import _ from '../../utils/LodashUtils';

import { formatFilterSearchKeys } from '../../utils/ApiUtils';


const initialState = {

    listSubscriptionDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: ''
    }

};
let listSubscriptionResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_SUBSCRIPTION_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listSubscriptionDetails: {
                    ...initialState.listSubscriptionDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_SUBSCRIPTION_DETAILS_SUCCESS:
            listSubscriptionResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listSubscriptionDetails: {
                    ...state.listSubscriptionDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listSubscriptionResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_SUBSCRIPTION_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listSubscriptionDetails: {
                    ...initialState.listSubscriptionDetails,
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
