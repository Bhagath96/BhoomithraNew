import { types as ActionTypes } from './actions';
import { REQUEST_STATUS } from './constants';
import { getPayloadData, formatFilterSearchKeys } from '../../utils/ApiUtils';
import _ from '../../utils/LodashUtils';

const initialState = {
    languages: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    validationList: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    question: {

    },
    listQuestions: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {},
        searchKeys: []
    },
    questionTypes: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    },
    generateQuestion: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    },
    keyList: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    },
    CurrentAssociationQuestion: {
        data: {},
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    ListDataSource: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    ListDataSourceByID: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    ListDataSourceByIDForCreate: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    flagForResetPagination: false,

    commonTemplate: {
        selected: 0
    }
};

let listQuestionsResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {


        case ActionTypes.LOAD_QUESTION_LANGUAGES_REQUEST:
            return Object.assign({}, state, {
                languages: {
                    ...initialState.languages,
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_QUESTION_LANGUAGES_SUCCESS:
            return Object.assign({}, state, {
                languages: {
                    ...state.languages,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.LOAD_QUESTION_LANGUAGES_FAILURE:
            return Object.assign({}, state, {
                languages: {
                    ...state.languages,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.FETCH_QUESTION_VALIDATION_TYPES_REQUEST:
            return Object.assign({}, state, {
                validationList: {
                    ...initialState.validationList,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_QUESTION_VALIDATION_TYPES_SUCCESS:
            return Object.assign({}, state, {
                validationList: {
                    ...state.validationList,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_QUESTION_VALIDATION_TYPES_FAILURE:
            return Object.assign({}, state, {
                validationList: {
                    ...state.validationList,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.FETCH_QUESTIONS_REQUEST:
            return Object.assign({}, state, {
                listQuestions: {
                    ...initialState.listQuestions,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_QUESTIONS_SUCCESS:
            listQuestionsResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listQuestions: {
                    ...state.listQuestions,
                    data: listQuestionsResponse,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    searchKeys: formatFilterSearchKeys(_.get(listQuestionsResponse, 'searchKeys', []))

                }
            });
        case ActionTypes.FETCH_QUESTIONS_FAILURE:
            return Object.assign({}, state, {
                listQuestions: {
                    ...state.listQuestions,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.FETCH_QUESTION_TYPES_REQUEST:
            return Object.assign({}, state, {
                questionTypes: {
                    ...state.questionTypes,
                    requestInProgress: true,
                    data: [],
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.FETCH_QUESTION_TYPES_SUCCESS:
            return Object.assign({}, state, {
                questionTypes: {
                    ...state.questionTypes,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {}),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_QUESTION_TYPES_FAILURE:
            return Object.assign({}, state, {
                questionTypes: {
                    ...state.questionTypes,
                    requestInProgress: false,
                    data: [],
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.FETCH_QUESTION_BY_ID_REQUEST:
            return Object.assign({}, state, {
                generateQuestion: {
                    ...state.generateQuestion,
                    requestInProgress: true,
                    data: [],
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.FETCH_QUESTION_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                generateQuestion: {
                    ...state.generateQuestion,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {}),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_QUESTION_BY_ID_FAILURE:
            return Object.assign({}, state, {
                generateQuestion: {
                    ...state.generateQuestion,
                    requestInProgress: false,
                    data: [],
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.RESET_GENERATE_QUESTION_OBJECT:
            return Object.assign({}, state, {
                generateQuestion: {
                    data: {}
                }
            });

        case ActionTypes.FETCH_QUESTION_KEYS_REQUEST:
            return Object.assign({}, state, {
                keyList: {
                    ...initialState.keyList,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_QUESTION_KEYS_SUCCESS:
            return Object.assign({}, state, {
                keyList: {
                    ...state.keyList,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_QUESTION_KEYS_FAILURE:
            return Object.assign({}, state, {
                keyList: {
                    ...state.keyList,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.FETCH_QUESTION_CURRENT_ASSOCIATION_REQUEST:
            return Object.assign({}, state, {
                CurrentAssociationQuestion: {
                    ...initialState.CurrentAssociationQuestion,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_QUESTION_CURRENT_ASSOCIATION_SUCCESS:
            return Object.assign({}, state, {
                CurrentAssociationQuestion: {
                    ...state.CurrentAssociationQuestion,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_QUESTION_CURRENT_ASSOCIATION_FAILURE:
            return Object.assign({}, state, {
                CurrentAssociationQuestion: {
                    ...state.CurrentAssociationQuestion,
                    data: {},
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_DATA_SOURCE_REQUEST:
            return Object.assign({}, state, {
                ListDataSource: {
                    ...initialState.ListDataSource,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_DATA_SOURCE_SUCCESS:
            return Object.assign({}, state, {
                ListDataSource: {
                    ...state.ListDataSource,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_DATA_SOURCE_FAILURE:
            return Object.assign({}, state, {
                ListDataSource: {
                    ...state.ListDataSource,
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_DATA_SOURCE_BY_ID_REQUEST:
            return Object.assign({}, state, {
                ListDataSourceByID: {
                    ...initialState.ListDataSourceByID,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_DATA_SOURCE_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                ListDataSourceByID: {
                    ...state.ListDataSourceByID,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_DATA_SOURCE_BY_ID_FAILURE:
            return Object.assign({}, state, {
                ListDataSourceByID: {
                    ...state.ListDataSourceByID,
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.FETCH_DATA_SOURCE_BY_ID_CREATE_REQUEST:
            return Object.assign({}, state, {
                ListDataSourceByIDForCreate: {
                    ...initialState.ListDataSourceByIDForCreate,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_DATA_SOURCE_BY_ID_CREATE_SUCCESS:
            return Object.assign({}, state, {
                ListDataSourceByIDForCreate: {
                    ...state.ListDataSourceByIDForCreate,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_DATA_SOURCE_BY_ID_CREATE_FAILURE:
            return Object.assign({}, state, {
                ListDataSourceByIDForCreate: {
                    ...state.ListDataSourceByIDForCreate,
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.SET_DATA_SOURCE:
            return Object.assign({}, state, {
                generateQuestion: {
                    ...state.generateQuestion,
                    data: action.payload.data
                }
            });
        case ActionTypes.SET_QUESTION_TAB_INDEX:
            return Object.assign({}, state, {
                commonTemplate: {
                    selected: action.payload.data
                }
            });


        default:
            return state;
    }
};

export default reducer;
