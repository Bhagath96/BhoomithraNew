import utils from '../../utils';
import { types as ActionTypes } from './actions';
import { REQUEST_STATUS, EMPTY_VALUE } from './constant';
const { apiUtils: { getPayloadData } } = utils;
import _ from '../../utils/LodashUtils';

import { formatFilterSearchKeys } from '../../utils/ApiUtils';


const initialState = {

    listCustomerDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {}
    },
    listFilterDataForCustomerFilter: {},
    currentFilterState: {},
    customerIds: {},
    customerEnrollmentDetails: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {},
        noDifferenceMessage: ''
    },
    customerConflictDetails: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {},
        noDifferenceMessage: ''

    }

};

const formatQuestionAnswerObject = (answerArray) => {
    let formattedQAnswerObject = {};
    answerArray?.map((item) => {
        if (item.type === 'TEXT' || item.type === 'TEXTAREA') {
            formattedQAnswerObject[item.question] = item.answer;
        }
        if (item.type === 'OPTION' || item.type === 'OPTION_WITH_ICON' || item.type === 'WARD') {
            formattedQAnswerObject[item.question] = item.answer.name;
        }
    });
    return formattedQAnswerObject;
};

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
    let formattedAnswerObject = formatQuestionAnswerObject(response[0].answers);
    response.push(formattedAnswerObject);
    return response;
};
let listCustomerResponse = {};
let customerEnrollmentDetailsObject = {};
let customerConflictDetailsObject = {};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CUSTOMER_IDS_TO_REDUCER:
            return Object.assign({}, state, {
                customerIds: action.payload.data
            });

        case ActionTypes.VIEW_CUSTOMER_ENROLLMENT_DETAILS_REQUEST:
            return Object.assign({}, state, {
                customerEnrollmentDetails: {
                    ...initialState.customerEnrollmentDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.VIEW_CUSTOMER_ENROLLMENT_DETAILS_SUCESS:
            customerEnrollmentDetailsObject = getPayloadData(action.payload, []);
            return Object.assign({}, state, {
                customerEnrollmentDetails: {
                    ...state.customerEnrollmentDetails,
                    data: formatDetailsResponse(customerEnrollmentDetailsObject || []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    noDifferenceMessage: 'nothing_to_compare_both_datas_are_similar'
                }
            });
        case ActionTypes.VIEW_CUSTOMER_ENROLLMENT_DETAILS_FAILURE:
            return Object.assign({}, state, {
                customerEnrollmentDetails: {
                    ...initialState.customerEnrollmentDetails,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.VIEW_CUSTOMER_CONFLICT_DETAILS_REQUEST:
            return Object.assign({}, state, {
                customerConflictDetails: {
                    ...initialState.customerConflictDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.VIEW_CUSTOMER_CONFLICT_DETAILS_SUCESS:
            customerConflictDetailsObject = getPayloadData(action.payload, []);
            return Object.assign({}, state, {
                customerConflictDetails: {
                    ...state.customerConflictDetails,
                    data: formatDetailsResponse(customerConflictDetailsObject || []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.VIEW_CUSTOMER_CONFLICT_DETAILS_FAILURE:
            return Object.assign({}, state, {
                customerConflictDetails: {
                    ...initialState.customerConflictDetails,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.FETCH_CUSTOMER_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listCustomerDetails: {
                    ...initialState.listCustomerDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_CUSTOMER_DETAILS_SUCCESS:
            listCustomerResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listCustomerDetails: {
                    ...state.listCustomerDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listCustomerResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_CUSTOMER_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listCustomerDetails: {
                    ...initialState.listCustomerDetails,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.STORE_JSON_DATA_FOR_CUSTOMER:
            return Object.assign({}, state, {
                listFilterDataForCustomerFilter: {
                    ...state.listFilterDataForCustomerFilter,
                    ...action.payload.data
                }
            });
        case ActionTypes.SET_FILTER_VALUES:
            return Object.assign({}, state, {
                currentFilterState: {
                    ...state.currentFilterState,
                    ...action.payload.data
                }
            });
        case ActionTypes.RESET_FILTER_VALUES:
            return Object.assign({}, state, {
                currentFilterState: initialState.currentFilterState
            });

        default:
            return state;

    }
};
export default reducer;
