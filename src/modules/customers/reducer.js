import { DEFAULT_TABLE_PROPS } from '../../common/constants';
import utils from '../../utils';
import { formatFilterSearchKeys } from '../../utils/ApiUtils';
import { types as ActionTypes } from './actions';
import { REQUEST_STATUS, EMPTY_VALUE, DROPDOWN_TYPES, QUESTION_TYPES, DISPLAY_NULL_VALUES } from './constants';
const { apiUtils: { getPayloadData }, lodashUtils: _, dateUtils: { convertToLocal } } = utils;
const getHeader = (detail) => {
    let label = _.get(detail, 'label', null);
    let key = _.get(detail, 'key', null);
    return label === null ? DISPLAY_NULL_VALUES ? key : null : label;
};
const returnEmptyIfNull = (value) => value === null ? EMPTY_VALUE : value;
const convertDateTimeFormat = (value) => {
    return convertToLocal(value);
};
const formatListResponse = (data) => {
    let response = [], headers = {}, dataSourcesData = {};
    _.forEach(data, (item) => {
        let currentItem = {};
        _.set(currentItem, 'id', _.get(item, 'id', ''));
        _.set(currentItem, 'additionalInfo', _.get(item, 'additionalInfo', null));
        dataSourcesData = [_.get(item, 'dataSources', null), { key: 'DataSource' }];
        _.set(currentItem, 'dataSources', dataSourcesData);
        // _.set(additionalInfoData, _.get(item, 'additionalInfo', {}));
        // _.set(dataSourcesData, _.get(item, 'dataSources', {}));
        // if (!additionalInfoData === {}) {
        //     _.set(currentItem, 'additionalInfo', additionalInfoData);
        // }
        // if (!dataSourcesData === {}) {
        //     _.set(currentItem, 'dataSources', dataSourcesData);
        // }
        _.forEach(_.get(item, 'details', []), (detail) => {
            let existingHeader = _.get(headers, `${detail.key}` ? `${detail.key}` : null, null);
            let value = EMPTY_VALUE;
            if (DROPDOWN_TYPES.includes(detail.type || '')) {
                value = returnEmptyIfNull(_.get(detail, 'value.name', null));
            } else if (detail.type === QUESTION_TYPES.LOCATION) {
                returnEmptyIfNull(_.get(detail, 'value.formattedAddress', null));
            } else if (detail.type === QUESTION_TYPES.DATE_TIME) {
                value = returnEmptyIfNull(convertDateTimeFormat(_.get(detail, 'value', null)));
            } else {
                value = returnEmptyIfNull(_.get(detail, 'value', null));
            }
            if (existingHeader === null || existingHeader === detail.key) {
                let currentHeader = getHeader(detail);
                if (currentHeader !== existingHeader) {
                    _.set(headers, `${detail.key}` ? `${detail.key}` : null, currentHeader);
                }
            }
            _.set(currentItem, `${detail.key}`, value);
        });
        response.push(currentItem);
    });
    let newHeader;
    if (Object.keys(headers).length > 0) {
        newHeader = headers;
    }
    if (Object.keys(headers).length > 0) {
        return { response, newHeader };
    }
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
    return response;
};
const formatResponseForFilter = (data, existingResponse = {}) => {
    let KEYS = Object.keys(_.get(data, 'newHeader', {}));
    let tableData = _.get(data, 'response', {});
    let response = {};
    _.forEach(KEYS, key => {
        let valuesArray = tableData.map(item => item[key] && item[key] !== '-' && ({ id: item[key], name: item[key] }));
        let uniqueValues = _.uniqBy(valuesArray, 'id');
        response[key] = _.compact(uniqueValues);
    });
    return { ...response, ...existingResponse };
};
const initialState = {
    listCustomerDetails: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        error: {},
        ...DEFAULT_TABLE_PROPS
    },
    customerDetails: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    currentFilterState: {},
    filterResponse: {},
    initialFilterResponse: {},
    subscriptions: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {},
        ...DEFAULT_TABLE_PROPS
    },
    listFilterDataForSubscriptionFilter: {},
    currentFilterStateForSubscription: {}
};
let listCustomerResponse = {}, customerResponse = [], subscriptionResponse = {};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_CUSTOMER_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listCustomerDetails: {
                    ...state.listCustomerDetails,
                    requestInProgress: true
                }
            });

        case ActionTypes.RESET_FILTER_DROP_DOWN:
            return Object.assign({}, state, {
                listCustomerDetails: {
                    ...state.listCustomerDetails,
                    requestInProgress: true
                },
                filterResponse: {}
            });

        case ActionTypes.FETCH_CUSTOMER_DETAILS_SUCCESS: {
            listCustomerResponse = getPayloadData(action.payload, {});
            let formatedResponse = formatListResponse(listCustomerResponse.content);
            return Object.assign({}, state, {
                listCustomerDetails: {
                    ...state.listCustomerDetails,
                    data: formatedResponse,
                    fullData: listCustomerResponse.content,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    pageSize: listCustomerResponse.pageable.pageSize,
                    totalCount: listCustomerResponse.totalElements,
                    pageNo: listCustomerResponse.pageable.pageNumber
                },
                filterResponse: formatResponseForFilter(formatedResponse, _.get(state, 'filterResponse', {})),
                initialFilterResponse: formatResponseForFilter(formatedResponse)
            });
        }
        case ActionTypes.FETCH_CUSTOMER_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listCustomerDetails: {
                    ...state.listCustomerDetails,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_CUSTOMER_DETAILS_BY_SURVEY_ID_REQUEST:
            return Object.assign({}, state, {
                customerDetails: {
                    ...initialState.customerDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_CUSTOMER_DETAILS_BY_SURVEY_ID_SUCCESS: {
            customerResponse = getPayloadData(action.payload, []);
            return Object.assign({}, state, {
                customerDetails: {
                    ...state.customerDetails,
                    data: formatDetailsResponse(customerResponse || []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        }
        case ActionTypes.FETCH_CUSTOMER_DETAILS_BY_SURVEY_ID_FAILURE:
            return Object.assign({}, state, {
                customerDetails: {
                    ...initialState.customerDetails,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.SET_FILTER:
            return Object.assign({}, state, {
                currentFilterState: {
                    ...state.currentFilterState,
                    ...action.payload.data
                }
            });
        case ActionTypes.RESET_FILTER:
            return Object.assign({}, state, {
                currentFilterState: initialState.currentFilterState
            });
        case ActionTypes.STORE_JSON_DATA:
            return Object.assign({}, state, {
                filterResponse: {
                    ...state.filterResponse,
                    ...action.payload.data
                }
            });
        case ActionTypes.FETCH_ALL_SUBSCRIPTIONS_REQUEST:
            return Object.assign({}, state, {
                subscriptions: {
                    ...state.subscriptions,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ALL_SUBSCRIPTIONS_SUCCESS:
            subscriptionResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                subscriptions: {
                    ...initialState.subscriptions,
                    data: subscriptionResponse,
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(subscriptionResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_ALL_SUBSCRIPTIONS_FAILURE:
            return Object.assign({}, state, {
                subscriptions: {
                    ...initialState.subscriptions,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.STORE_JSON_DATA_FOR_SUBSCRIPTION:
            return Object.assign({}, state, {
                listFilterDataForSubscriptionFilter: {
                    ...state.listFilterDataForSubscriptionFilter,
                    ...action.payload.data
                }
            });
        case ActionTypes.SET_FILTER_FOR_SUBSCRIPTION:
            return Object.assign({}, state, {
                currentFilterStateForSubscription: {
                    ...state.currentFilterStateForSubscription,
                    ...action.payload.data
                }
            });
        case ActionTypes.RESET_FILTER_FOR_SUBSCRIPTION:
            return Object.assign({}, state, {
                currentFilterStateForSubscription: initialState.currentFilterStateForSubscription
            });
        default:
            return state;
    }
};
export default reducer;
