// import { DEFAULT_TABLE_PROPS } from '../../common/constants';
import utils from '../../utils';
import { types as ActionTypes } from './actions';
import { REQUEST_STATUS, EMPTY_VALUE } from './constant';
const { apiUtils: { getPayloadData } } = utils;
import _ from '../../utils/LodashUtils';


import { formatFilterSearchKeys } from '../../utils/ApiUtils';

const formatDetailsResponse = (data) => {
    let response = [];
    _.forEach(data, (item) => {
        let currentItem = {}, currentAnswers = [];
        _.forEach(_.get(item, 'details', []), (detail) => {
            currentAnswers.push({ type: detail.type, question: _.get(detail, 'label', EMPTY_VALUE), answer: _.get(detail, 'value', {}) });
        });
        _.set(currentItem, 'id', _.get(item, 'id', ''));
        _.set(currentItem, 'answers', currentAnswers);
        _.set(currentItem, 'dynamicAnswers', _.get(item, 'dynamicAnswers', []));
        response.push(currentItem);
    });
    return response;
};
const initialState = {

    listServiceHistoryDetails: {
        data: {},
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {}
    },
    listServiceHistoryById: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    }

};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_SERVICE_HISTORY_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listServiceHistoryDetails: {
                    ...initialState.listServiceHistoryDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_SERVICE_HISTORY_DETAILS_SUCCESS:
            {
                let listServiceHistoryResponse = getPayloadData(action.payload, {});
                return Object.assign({}, state, {
                    listServiceHistoryDetails: {
                        ...state.listServiceHistoryDetails,
                        data: getPayloadData(action.payload, {}),
                        // data: { content: [] },
                        requestInProgress: false,
                        searchKeys: formatFilterSearchKeys(_.get(listServiceHistoryResponse, 'searchKeys', [])),
                        requestStatus: REQUEST_STATUS.SUCCESS

                    }
                });
            }
        case ActionTypes.FETCH_SERVICE_HISTORY_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listServiceHistoryDetails: {
                    ...initialState.listServiceHistoryDetails,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_SERVICE_HISTORY_DETAILS_BY_ID_REQUEST:
            return Object.assign({}, state, {
                listServiceHistoryById: {
                    ...initialState.listServiceHistoryById,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_SERVICE_HISTORY_DETAILS_BY_ID_SUCCESS:
            {
                let ResponseData = getPayloadData(action.payload, {});
                return Object.assign({}, state, {
                    listServiceHistoryById: {
                        ...state.listServiceHistoryById,
                        data: formatDetailsResponse(ResponseData || []),
                        requestInProgress: false,
                        requestStatus: REQUEST_STATUS.SUCCESS,
                        error: {}
                    }
                });
            }
        case ActionTypes.FETCH_SERVICE_HISTORY_DETAILS_BY_ID_FAILURE:
            return Object.assign({}, state, {
                listServiceHistoryById: {
                    ...initialState.listServiceHistoryById,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    },
                    requestInProgress: false
                }
            });

        default:
            return state;

    }
};
export default reducer;
