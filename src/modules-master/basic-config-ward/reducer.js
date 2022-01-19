import { DEFAULT_TABLE_PROPS } from '../../common/constants';
import utils from '../../utils';
import { types as ActionTypes } from './actions';
import { formatFilterSearchKeys } from '../../utils/ApiUtils';
import { REQUEST_STATUS } from '../../modules/common/constants';


const { apiUtils: { getPayloadData }, lodashUtils: _ } = utils;

// const getHeader = (detail) => {
//     let label = _.get(detail, 'label', null);
//     let key = _.get(detail, 'key', null);
//     return label === null ? DISPLAY_NULL_VALUES ? key : null : label;
// };

// const returnEmptyIfNull = (value) => value === null ? EMPTY_VALUE : value;


// const formatListResponse = (data) => {
//     let response = [], headers = {};
//     _.forEach(data, (item) => {
//         let currentItem = {};
//         _.set(currentItem, 'id', _.get(item, 'id', ''));
//         _.forEach(_.get(item, 'details', []), (detail) => {
//             let existingHeader = _.get(headers, `${detail.key}` ? `${detail.key}` : null, null);
//             let value = DROPDOWN_TYPES.includes(detail.type || '') ? returnEmptyIfNull(_.get(detail, 'value.name', null)) : (detail.type === QUESTION_TYPES.LOCATION) ? returnEmptyIfNull(_.get(detail, 'value.formattedAddress', null)) : returnEmptyIfNull(_.get(detail, 'value', null));
//             if (existingHeader === null || existingHeader === detail.key) {
//                 let currentHeader = getHeader(detail);
//                 if (currentHeader !== existingHeader) {
//                     _.set(headers, `${detail.key}` ? `${detail.key}` : null, currentHeader);
//                 }
//             }
//             _.set(currentItem, `${detail.key}`, value);
//         });
//         response.push(currentItem);
//     });
//     return { response, headers };
// };


// const formatListResponse = (data) => {
//     let response = [], headers = {}, additionalInfoData = {}, dataSourcesData = {};
//     _.forEach(data, (item) => {
//         let currentItem = {};
//         _.set(currentItem, 'id', _.get(item, 'id', ''));
//         _.set(currentItem, 'additionalInfo', _.get(item, 'additionalInfo', null));
//         dataSourcesData = [_.get(item, 'dataSources', null)];
//         _.set(currentItem, 'dataSources', dataSourcesData);
//         _.forEach(_.get(item, 'details', []), (detail) => {
//             let existingHeader = _.get(headers, `${detail.key}` ? `${detail.key}` : null, null);
//             let value = DROPDOWN_TYPES.includes(detail.type || '') ? returnEmptyIfNull(_.get(detail, 'value.name', null)) : (detail.type === QUESTION_TYPES.LOCATION) ? returnEmptyIfNull(_.get(detail, 'value.formattedAddress', null)) : returnEmptyIfNull(_.get(detail, 'value', null));
//             if (existingHeader === null || existingHeader === detail.key) {
//                 let currentHeader = getHeader(detail);
//                 if (currentHeader !== existingHeader) {
//                     _.set(headers, `${detail.key}` ? `${detail.key}` : null, currentHeader);
//                 }
//             }
//             _.set(currentItem, `${detail.key}`, value);
//         });
//         response.push(currentItem);
//     });
//     return { response, headers };
// };

// const formatDetailsResponse = (data) => {
//     let response = [];
//     _.forEach(data, (item) => {
//         let currentItem = {}, currentAnswers = [];
//         _.forEach(_.get(item, 'details', []), (detail) => {
//             currentAnswers.push({ type: detail.type, question: _.get(detail, 'label', EMPTY_VALUE), answer: _.get(detail, 'value', {}) });
//         });
//         _.set(currentItem, 'id', _.get(item, 'id', ''));
//         _.set(currentItem, 'answers', currentAnswers);
//         _.set(currentItem, 'dynamicAnswers', _.get(item, 'dynamicAnswers', []));
//         response.push(currentItem);
//     });
//     return response;
// };

const initialState = {
    listAllWards: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {},
        ...DEFAULT_TABLE_PROPS
    },
    listAllLsgi: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    listAllState: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    listAllDistrict: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    selectedWard: {
        data: {},
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    selectedRA: {
        data: {},
        requestInProgress: false,
        requestStatus: '',
        error: {},
        raId: null
    },
    listAllResidentialAssociations: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        error: {},
        ...DEFAULT_TABLE_PROPS
    },
    listAllAssociationType: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    listFilterDataForStateFilter: {},
    currentFilterState: {},
    filterResponse: {},
    commonTemplate: {
        selected: 0
    },
    commonTemplateRA: {
        selected: 0
    }
};

let listWardResponse = {}, listLsgiResponse = {}, listStateResponse = {}, listDistrictResponse = {}, wardResponse = {};
let listRAResponse = {}, listRATypeResponse = {}, getRAIdResponse = {}, RAResponse = {};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_ALL_WARDS_REQUEST:
            return Object.assign({}, state, {
                listAllWards: {
                    ...initialState.listAllWards,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ALL_WARDS_SUCCESS:
            listWardResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listAllWards: {
                    ...state.listAllWards,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listWardResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_ALL_WARDS_FAILURE:
            return Object.assign({}, state, {
                listAllWards: {
                    ...initialState.listAllWards,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.LIST_ALL_WARDS_REQUEST:
            return Object.assign({}, state, {
                listAllWards: {
                    ...initialState.listAllWards,
                    requestInProgress: true
                }
            });
        case ActionTypes.LIST_ALL_WARDS_SUCCESS:
            listWardResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listAllWards: {
                    ...state.listAllWards,
                    data: listWardResponse,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.LIST_ALL_WARDS_FAILURE:
            return Object.assign({}, state, {
                listAllWards: {
                    ...initialState.listAllWards,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_ALL_RESIDENTIAL_ASSOCIATIONS_REQUEST:
            return Object.assign({}, state, {
                listAllResidentialAssociations: {
                    ...initialState.listAllResidentialAssociations,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ALL_RESIDENTIAL_ASSOCIATIONS_SUCCESS:
            listRAResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listAllResidentialAssociations: {
                    ...state.listAllResidentialAssociations,
                    data: listRAResponse,
                    fullData: listRAResponse.content,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,

                    searchKeys: formatFilterSearchKeys(_.get(listRAResponse, 'searchKeys', []))

                }
            });
        case ActionTypes.FETCH_ALL_RESIDENTIAL_ASSOCIATIONS_FAILURE:
            return Object.assign({}, state, {
                listAllResidentialAssociations: {
                    ...initialState.listAllResidentialAssociations,
                    requestStatus: REQUEST_STATUS.FAILED,
                    requestInProgress: false,
                    data: [],
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_ALL_LSGI_REQUEST:
            return Object.assign({}, state, {
                listAllLsgi: {
                    ...initialState.listAllLsgi,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ALL_LSGI_SUCCESS:
            listLsgiResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listAllLsgi: {
                    ...state.listAllLsgi,
                    data: listLsgiResponse,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_ALL_LSGI_FAILURE:
            return Object.assign({}, state, {
                listAllLsgi: {
                    ...initialState.listAllLsgi,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_ALL_STATE_REQUEST:
            return Object.assign({}, state, {
                listAllState: {
                    ...state.listAllState,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ALL_STATE_SUCCESS:
            listStateResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listAllState: {
                    ...state.listAllState,
                    data: listStateResponse,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_ALL_STATE_FAILURE:
            return Object.assign({}, state, {
                listAllState: {
                    ...state.listAllState,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_ALL_DISTRICT_REQUEST:
            return Object.assign({}, state, {
                listAllDistrict: {
                    ...initialState.listAllDistrict,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ALL_DISTRICT_SUCCESS:
            listDistrictResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listAllDistrict: {
                    ...initialState.listAllDistrict,
                    data: listDistrictResponse,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_ALL_DISTRICT_FAILURE:
            return Object.assign({}, state, {
                listAllDistrict: {
                    ...state.listAllDistrict,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_WARD_BY_ID_REQUEST:
            return Object.assign({}, state, {
                selectedWard: {
                    ...state.selectedWard,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_WARD_BY_ID_SUCCESS:
            wardResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                selectedWard: {
                    ...state.selectedWard,
                    data: wardResponse,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_WARD_BY_ID_FAILURE:
            return Object.assign({}, state, {
                selectedWard: {
                    ...state.selectedWard,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_RA_BY_ID_REQUEST:
            return Object.assign({}, state, {
                selectedRA: {
                    ...state.selectedRA,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_RA_BY_ID_SUCCESS:
            RAResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                selectedRA: {
                    ...state.selectedRA,
                    data: RAResponse,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_RA_BY_ID_FAILURE:
            return Object.assign({}, state, {
                selectedRA: {
                    ...state.selectedRA,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_ALL_ASSOCIATION_TYPE_REQUEST:
            return Object.assign({}, state, {
                listAllAssociationType: {
                    ...state.listAllAssociationType,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ALL_ASSOCIATION_TYPE_SUCCESS:
            listRATypeResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listAllAssociationType: {
                    ...state.listAllAssociationType,
                    data: listRATypeResponse,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_ALL_ASSOCIATION_TYPE_FAILURE:
            return Object.assign({}, state, {
                listAllAssociationType: {
                    ...state.listAllAssociationType,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.CLEAR_WARD_DETAILS_REDUCER:
            return Object.assign({}, state, {
                selectedWard: initialState.selectedWard
            });
        case ActionTypes.CLEAR_RA_DETAILS_REDUCER:
            return Object.assign({}, state, {
                selectedRA: initialState.selectedRA
            });
        case ActionTypes.STORE_JSON_DATA_FOR_WARD:
            return Object.assign({}, state, {
                listFilterDataForWardFilter: {
                    ...state.listFilterDataForWardFilter,
                    ...action.payload.data
                }
            });
        case ActionTypes.STORE_JSON_DATA_FOR_RA:
            return Object.assign({}, state, {
                filterResponse: {
                    ...state.filterResponse,
                    ...action.payload.data
                },
                listFilterDataForRAFilter: {
                    ...state.listFilterDataForRAFilter,
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
        case ActionTypes.ADD_RESIDENTIAL_ASSOCIATION_SUCCESS:
            getRAIdResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                selectedRA: {
                    ...state.selectedRA,
                    data: {
                        ...state.selectedRA.data,
                        id: getRAIdResponse.id
                    }
                }
            });
        case ActionTypes.SET_SELECTED_RA:
            return Object.assign({}, state, {
                selectedRA: {
                    ...state.selectedRA,
                    data: {
                        ...state.selectedRA.data,
                        ...action.payload.data,
                        id: getRAIdResponse.id
                    }
                }
            });
        case ActionTypes.SET_WARD_TAB_INDEX:
            return Object.assign({}, state, {
                commonTemplate: {
                    selected: action.payload.data
                }
            });
        case ActionTypes.SET_RA_TAB_INDEX:
            return Object.assign({}, state, {
                commonTemplateRA: {
                    selected: action.payload.data
                }
            });
        case ActionTypes.RESIDENTIAL_ASSOCIATION_TEMPLATE_LOADING_FLAG:
            return Object.assign({}, state, {
                templateLoaded: action.payload.data
            });
        default:
            return state;
    }
};

export default reducer;
