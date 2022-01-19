// import { DEFAULT_TABLE_PROPS } from '../../common/constants';
import utils from '../../utils';
import { types as ActionTypes } from './actions';
import { REQUEST_STATUS } from './constant';
const { apiUtils: { getPayloadData } } = utils;
import _ from '../../utils/LodashUtils';

import { formatFilterSearchKeys } from '../../utils/ApiUtils';


const initialState = {

    listServiceDetails: {
        data: {},
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {}
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_SERVICE_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listServiceDetails: {
                    ...initialState.listServiceDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_SERVICE_DETAILS_SUCCESS:
            {
                let listServiceResponse = getPayloadData(action.payload, {});
                return Object.assign({}, state, {
                    listServiceDetails: {
                        ...state.listServiceDetails,
                        data: getPayloadData(action.payload, {}),
                        // data: { content: [] },
                        requestInProgress: false,
                        searchKeys: formatFilterSearchKeys(_.get(listServiceResponse, 'searchKeys', [])),
                        requestStatus: REQUEST_STATUS.SUCCESS
                        // pageSize: listServiceResponse?.pageable?.pageSize,
                        // totalCount: listServiceResponse?.totalElements,
                        // pageNo: listServiceResponse?.pageable?.pageNumber
                    }
                });
            }
        case ActionTypes.FETCH_SERVICE_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listServiceDetails: {
                    ...initialState.listServiceDetails,
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
