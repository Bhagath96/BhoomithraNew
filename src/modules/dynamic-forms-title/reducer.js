import { types as ActionTypes } from './actions';
import { REQUEST_STATUS } from './constants';
import { getPayloadData, formatFilterSearchKeys } from '../../utils/ApiUtils';
import _ from '../../utils/LodashUtils';

const changeFormatForQuestionValidation = (validationArray = []) => {
    validationArray?.map((item) => {
        let dependentQuestionArray = _.get(item, 'dependentQuestion', []);
        let modifiedDepQuestionArray = dependentQuestionArray?.map((newItem) => {
            return newItem.dependantQuestion;
        });
        item.dependentQuestion = modifiedDepQuestionArray;
    });

    return validationArray;
};
const findQuestionIds = (options) => {
    let questionIdArray = [];
    options?.map((item) => {
        questionIdArray.push(item.question.id);
    });
    return questionIdArray;

};

const initialState = {
    languages: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    question: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    title: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {},
        searchKeys: []
    },
    singleTitleById: {
        data: {
        },
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    titleTab: {
        name: '',
        key: '',
        label: [],
        requestInProgress: false
    },
    singleQuestionByIdForTitle: {
        data: {},
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    questionTab: {
        question: []
    },
    titleQuestionValidation: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: ''
    },
    titleQuestionValidationById: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: ''
    },
    titleQuestionValidationTab: {
        questionValidation: []
    },
    optionTab: {
        option: [],
        questionIds: []
    },
    optionsByQuestionId: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: ''
    },
    optionEditSuccess: {
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    formattedResponse: {},
    getOptionQuestions: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    getTitleQuestionsOnly: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    getTitleCurrentAssociation: {
        data: {},
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    listFilterDataForTitleFilter: {},
    commonTemplate: {
        selected: 0
    }
};

let listTitleResponse = {}, questionOptionsResponse = {};

// const formatQuestionResponse = (data) => {
//     _.forEach(data, (item) => {

//     })
// }

const formatResponse = (id, data) => {
    let response = {};
    response[id] = data;
    return response;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.FETCH_TITLE_WITH_RESETTED_PAGINATION_REQUEST:
            return Object.assign({}, state, {
                title: {
                    ...initialState.title,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_TITLE_WITH_RESETTED_PAGINATION_SUCCESS:
            listTitleResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                title: {
                    ...state.title,
                    data: listTitleResponse,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    searchKeys: formatFilterSearchKeys(_.get(listTitleResponse, 'searchKeys', []))
                },
                flagForResetPagination: false


            });
        case ActionTypes.FETCH_TITLE_WITH_RESETTED_PAGINATION_FAILURE:
            return Object.assign({}, state, {
                title: {
                    ...state.title,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });


        case ActionTypes.GET_TITLE_QUESTION_ONLY_REQUEST:
            return Object.assign({}, state, {
                getTitleQuestionsOnly: {
                    ...initialState.getTitleQuestionsOnly,
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_TITLE_QUESTION_ONLY_SUCCESS:
            return Object.assign({}, state, {
                getTitleQuestionsOnly: {
                    ...initialState.getTitleQuestionsOnly,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    errors: {}
                }
            });
        case ActionTypes.GET_TITLE_QUESTION_ONLY_FAILURE:
            return Object.assign({}, state, {
                getTitleQuestionsOnly: {
                    getTitleQuestionsOnly: {
                        ...initialState.getTitleQuestionsOnly,
                        data: [],
                        requestInProgress: false,
                        errors: {}
                    }
                }
            });

        case ActionTypes.LOAD_LANGUAGES_FOR_TITLE_REQUEST:
            return Object.assign({}, state, {
                languages: {
                    ...initialState.languages,
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_LANGUAGES_FOR_TITLE_SUCCESS:
            return Object.assign({}, state, {
                languages: {
                    ...state.languages,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.LOAD_LANGUAGES_FOR_TITLE_FAILURE:
            return Object.assign({}, state, {
                languages: {
                    ...state.languages,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.LIST_QUESTION_TYPE_REQUEST:
            return Object.assign({}, state, {
                question: {
                    ...state.question,
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.LIST_QUESTION_TYPE_SUCCESS:
            return Object.assign({}, state, {
                question: {
                    ...state.question,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.LIST_QUESTION_TYPE_FAILURE:
            return Object.assign({}, state, {
                question: {
                    ...state.question,
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.LIST_TITLE_PAGEBALE_REQUEST:
            return Object.assign({}, state, {
                title: {
                    ...state.title,
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.LIST_TITLE_PAGEBALE_SUCCESS:
            listTitleResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                title: {
                    ...state.title,
                    data: listTitleResponse,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    searchKeys: formatFilterSearchKeys(_.get(listTitleResponse, 'searchKeys', []))

                }
            });
        case ActionTypes.LIST_TITLE_PAGEBALE_FAILURE:
            return Object.assign({}, state, {
                title: {
                    ...state.title,
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.GET_LABELS_WITH_ID_REQUEST:
            return Object.assign({}, state, {
                singleTitleById: {
                    ...state.singleTitleById,
                    data: [],
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.GET_LABELS_WITH_ID_SUCCESS:
            return Object.assign({}, state, {
                singleTitleById: {
                    ...state.singleTitleById,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                },
                titleTab: {
                    name: action.payload.data.data.name,
                    key: action.payload.data.data.key,
                    label: action.payload.data.data.label,
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_LABELS_WITH_ID_FAILURE:
            return Object.assign({}, state, {
                singleTitleById: {
                    ...state.singleTitleById,
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.GET_QUESTIONS_FOR_TITLE_REQUEST:
            return Object.assign({}, state, {
                singleQuestionByIdForTitle: {
                    ...state.singleQuestionByIdForTitle,
                    data: [],
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.GET_QUESTIONS_FOR_TITLE_SUCCESS:
            return Object.assign({}, state, {
                singleQuestionByIdForTitle: {
                    ...state.singleQuestionByIdForTitle,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                },
                questionTab: {
                    ...state.questionTab,
                    question: action.payload.data.data.question
                }
            });

        case ActionTypes.GET_QUESTIONS_FOR_TITLE_FAILURE:
            return Object.assign({}, state, {
                singleQuestionByIdForTitle: {
                    ...state.singleQuestionByIdForTitle,
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });


        case ActionTypes.GET_QUESTION_VALIDATION_TYPE_REQUEST:
            return Object.assign({}, state, {
                titleQuestionValidation: {
                    ...state.titleQuestionValidation,
                    data: [],
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.GET_QUESTION_VALIDATION_TYPE_SUCCESS:
            return Object.assign({}, state, {
                titleQuestionValidation: {
                    ...state.titleQuestionValidation,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.GET_QUESTION_VALIDATION_TYPE_FAILURE:
            return Object.assign({}, state, {
                titleQuestionValidation: {
                    ...state.titleQuestionValidation,
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.GET_QUESTION_VALIDATION_REQUEST:
            return Object.assign({}, state, {
                titleQuestionValidationById: {
                    ...state.titleQuestionValidationById,
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.GET_QUESTION_VALIDATION_SUCCESS:
            return Object.assign({}, state, {
                titleQuestionValidationById: {
                    ...state.titleQuestionValidationById,
                    data: action.payload.data.data,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                },
                titleQuestionValidationTab: {
                    questionValidation: changeFormatForQuestionValidation(action.payload.data.data.questionValidation)
                }
            });
        case ActionTypes.GET_QUESTION_VALIDATION_FAILURE:
            return Object.assign({}, state, {
                titleQuestionValidationById: {
                    ...state.titleQuestionValidationById,
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.GET_OPTION_WITH_QUESTION_ID:
            return Object.assign({}, state, {
                optionsByQuestionId: {
                    ...state.optionsByQuestionId,
                    questionId: action.payload.id
                }
            });

        case ActionTypes.GET_OPTION_WITH_QUESTION_ID_REQUEST:
            return Object.assign({}, state, {
                optionsByQuestionId: {
                    ...state.optionsByQuestionId,
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.GET_OPTION_WITH_QUESTION_ID_SUCCESS:
            questionOptionsResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                optionsByQuestionId: {
                    ...state.optionsByQuestionId,
                    data: questionOptionsResponse,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                },
                formattedResponse: {
                    ...state.formattedResponse,
                    ...formatResponse(state.optionsByQuestionId.questionId, questionOptionsResponse)
                    //  state.formattedResponse[state.optionsByQuestionId.questionId] = questionOptionsResponse
                }
            });
        case ActionTypes.GET_OPTION_WITH_QUESTION_ID_FAILURE:
            return Object.assign({}, state, {
                optionsByQuestionId: {
                    ...state.optionsByQuestionId,
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.SENT_QUESTION_OPTION_FOR_EDIT_REQUEST:
            return Object.assign({}, state, {
                optionEditSuccess: {
                    ...state.optionEditSuccess,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.SENT_QUESTION_OPTION_FOR_EDIT_SUCCESS:
            return Object.assign({}, state, {
                optionEditSuccess: {
                    ...state.optionEditSuccess,
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.SENT_QUESTION_OPTION_FOR_EDIT_FAILURE:
            return Object.assign({}, state, {
                optionEditSuccess: {
                    ...state.optionEditSuccess,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });


        case ActionTypes.GET_QUESTION_OPTION_VALIDATION_REQUEST:
            return Object.assign({}, state, {
                optionTab: {
                    ...state.optionTab,
                    option: []
                }
            });
        case ActionTypes.GET_QUESTION_OPTION_VALIDATION_SUCCESS:
            return Object.assign({}, state, {
                optionTab: {
                    ...state.optionTab,
                    option: changeFormatForQuestionValidation(action.payload.data.data.questionOption),
                    questionIds: findQuestionIds(action.payload.data.data.questionOption)

                }
            });
        case ActionTypes.GET_QUESTION_OPTION_VALIDATION_FAILURE:
            return Object.assign({}, state, {
                optionTab: {
                    ...state.optionTab,
                    option: []
                }
            });

        case ActionTypes.RESET_QUESTION_LIST:
            return Object.assign({}, state, {
                questionTab: {
                    ...state.questionTab,
                    question: []
                }
            });

        case ActionTypes.GET_OPTION_QUESTIONS_REQUEST:
            return Object.assign({}, state, {
                getOptionQuestions: {
                    ...state.getOptionQuestions,
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.GET_OPTION_QUESTIONS_SUCCESS:
            return Object.assign({}, state, {
                getOptionQuestions: {
                    ...state.getOptionQuestions,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.GET_OPTION_QUESTIONS_FAILURE:
            return Object.assign({}, state, {
                getOptionQuestions: {
                    ...state.getOptionQuestions,
                    data: [],
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.FETCH_TITLE_CURRENT_ASSOCIATION_REQUEST:
            return Object.assign({}, state, {
                getTitleCurrentAssociation: {
                    ...initialState.getTitleCurrentAssociation,
                    requestInProgress: true
                }
            });

        case ActionTypes.FETCH_TITLE_CURRENT_ASSOCIATION_SUCCESS:
            return Object.assign({}, state, {
                getTitleCurrentAssociation: {
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_TITLE_CURRENT_ASSOCIATION_FAILURE:
            return Object.assign({}, state, {
                getTitleCurrentAssociation: {
                    ...state.getTitleCurrentAssociation,
                    data: {},
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.STORE_JSON_DATA_FOR_TITLE:
            return Object.assign({}, state, {
                listFilterDataForTitleFilter: {
                    ...state.listFilterDataForTitleFilter,
                    ...action.payload.data
                }
            });
        case ActionTypes.SET_TITLE_TAB_INDEX:
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
