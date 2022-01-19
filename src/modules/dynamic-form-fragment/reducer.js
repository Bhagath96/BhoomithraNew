import { types as ActionTypes } from './actions';
import { REQUEST_STATUS } from './constants';
import { getPayloadData, formatFilterSearchKeys } from '../../utils/ApiUtils';
import _ from '../../utils/LodashUtils';
import { getEmptyPicky } from '../../utils/CommonUtils';

const initialState = {
    fragment: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {},
        searchKeys: []
    },
    languages: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    title: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    titleUpdate: {
        titleUpdateSuccessfully: false
    },
    basicDetailsOfFragment: {
        name: '',
        key: '',
        label: []
    },
    titleFragmentAssociation: {
        data: [],
        requestInProgress: false

    },
    deleteFragment: {
        deleteFragment: false
    },
    titleBasedOnFragmentId: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        errors: {}
    },
    questionsBasedOnTitleId: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        errors: {}
    },
    getAllFragmentsForDropDown: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        errors: {}
    },
    getFragmentQuestionLoop: {
        data: {
            title: getEmptyPicky(),
            question: getEmptyPicky(),
            fragment: getEmptyPicky()
        },
        requestInProgress: false,
        requestStatus: '',
        errors: {}
    },
    getFragmentCurrentAssociation: {
        data: {},
        requestInProgress: false,
        requestStatus: '',
        errors: {}
    },
    commonTemplate: {
        selected: 0
    }

};

let payloadData = {};
let initialData = {};
let listFragmentResponse = {};
const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.FETCH_CURRENT_ASSOCIATION_FRAGMENT_REQUEST:
            return Object.assign({}, state, {
                getFragmentCurrentAssociation: {
                    ...initialState.getFragmentCurrentAssociation,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_CURRENT_ASSOCIATION_FRAGMENT_SUCCESS:
            return Object.assign({}, state, {
                getFragmentCurrentAssociation: {
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });

        case ActionTypes.FETCH_CURRENT_ASSOCIATION_FRAGMENT_FAILURE:
            return Object.assign({}, state, {
                getFragmentCurrentAssociation: {
                    ...state.getFragmentCurrentAssociation,
                    data: {},
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.GET_FRAGMENT_QUESTION_LOOP_BY_ID_REQUEST:
            return Object.assign({}, state, {
                getFragmentQuestionLoop: {
                    ...initialState.getFragmentQuestionLoop,
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_FRAGMENT_QUESTION_LOOP_BY_ID_SUCCESS: {
            payloadData = getPayloadData(action.payload, {});
            initialData = initialState.getFragmentQuestionLoop.data;
            return Object.assign({}, state, {
                getFragmentQuestionLoop: {
                    ...state.getFragmentQuestionLoop,
                    data: {
                        title: (!_.has(payloadData, 'title') || _.get(payloadData, 'title.id', null) === null) ? initialData.title : payloadData.title,
                        question: (!_.has(payloadData, 'question') || _.get(payloadData, 'question.id', null) === null) ? initialData.question : payloadData.question,
                        fragment: (!_.has(payloadData, 'fragment') || _.get(payloadData, 'fragment.id', null) === null) ? initialData.fragment : payloadData.fragment
                    },
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        }
        case ActionTypes.GET_FRAGMENT_QUESTION_LOOP_BY_ID_FAILURE:
            return Object.assign({}, state, {
                getFragmentQuestionLoop: {
                    ...initialState.getFragmentQuestionLoop,
                    data: [],
                    requestInProgress: false
                }
            });


        case ActionTypes.GET_ALL_FRAGMENTS_FOR_DROPDOWN_REQUEST:
            return Object.assign({}, state, {
                getAllFragmentsForDropDown: {
                    ...initialState.getAllFragmentsForDropDown,
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_ALL_FRAGMENTS_FOR_DROPDOWN_SUCCESS:
            return Object.assign({}, state, {
                getAllFragmentsForDropDown: {
                    ...state.getAllFragmentsForDropDown,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.GET_ALL_FRAGMENTS_FOR_DROPDOWN_FAILURE:
            return Object.assign({}, state, {
                getAllFragmentsForDropDown: {
                    ...initialState.getAllFragmentsForDropDown,
                    data: [],
                    requestInProgress: false
                }
            });


        case ActionTypes.GET_TITLE_BASED_ON_FRAGMENT_ID_REQUEST:
            return Object.assign({}, state, {
                titleBasedOnFragmentId: {
                    ...initialState.titleBasedOnFragmentId,
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_TITLE_BASED_ON_FRAGMENT_ID_SUCCESS:
            return Object.assign({}, state, {
                titleBasedOnFragmentId: {
                    ...state.titleBasedOnFragmentId,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.GET_TITLE_BASED_ON_FRAGMENT_ID_FAILURE:
            return Object.assign({}, state, {
                titleBasedOnFragmentId: {
                    ...initialState.titleBasedOnFragmentId,
                    data: [],
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_QUESTIONS_BASED_ON_TITLE_ID_REQUEST:
            return Object.assign({}, state, {
                questionsBasedOnTitleId: {
                    ...initialState.questionsBasedOnTitleId,
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_QUESTIONS_BASED_ON_TITLE_ID_SUCCESS:
            return Object.assign({}, state, {
                questionsBasedOnTitleId: {
                    ...state.questionsBasedOnTitleId,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.GET_QUESTIONS_BASED_ON_TITLE_ID_FAILURE:
            return Object.assign({}, state, {
                questionsBasedOnTitleId: {
                    ...initialState.questionsBasedOnTitleId,
                    data: [],
                    requestInProgress: false
                }
            });

        case ActionTypes.LIST_FRAGMENT_PAGEBALE_REQUEST:
            return Object.assign({}, state, {
                fragment: {
                    ...state.fragment,
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.LIST_FRAGMENT_PAGEBALE_SUCCESS:
            listFragmentResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                fragment: {
                    ...state.fragment,
                    data: listFragmentResponse,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    searchKeys: formatFilterSearchKeys(_.get(listFragmentResponse, 'searchKeys', []))

                }
            });
        case ActionTypes.LIST_FRAGMENT_PAGEBALE_FAILURE:
            return Object.assign({}, state, {
                fragment: {
                    ...state.fragment,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.LOAD_LANGUAGES_FOR_FRAGMENTS_REQUEST:
            return Object.assign({}, state, {
                languages: {
                    ...initialState.languages,
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_LANGUAGES_FOR_FRAGMENTS_SUCCESS:
            return Object.assign({}, state, {
                languages: {
                    ...state.languages,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.LOAD_LANGUAGES_FOR_FRAGMENTS_FAILURE:
            return Object.assign({}, state, {
                languages: {
                    ...state.languages,
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.LOAD_TITLES_FOR_FRAGMENT_REQUEST:
            return Object.assign({}, state, {
                title: {
                    ...state.title,
                    data: [],
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.LOAD_TITLES_FOR_FRAGMENT_SUCCESS:
            return Object.assign({}, state, {
                title: {
                    ...state.title,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.LOAD_TITLE_FOR_FRAGMENTS_FAILURE:
            return Object.assign({}, state, {
                title: {
                    ...state.title,
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.EDIT_FRAGMENT_TITLE_ASSOCIATION_REQUEST:
            return Object.assign({}, state, {
                titleUpdate: {
                    ...state.titleUpdate,
                    titleUpdateSuccessfully: false
                }
            });
        case ActionTypes.EDIT_FRAGMENT_TITLE_ASSOCIATION_SUCCESS:
            return Object.assign({}, state, {
                titleUpdate: {
                    ...state.titleUpdate,
                    titleUpdateSuccessfully: true
                }
            });
        case ActionTypes.EDIT_FRAGMENT_TITLE_ASSOCIATION_FAILURE:
            return Object.assign({}, state, {
                titleUpdate: {
                    ...state.titleUpdate,
                    titleUpdateSuccessfully: false
                }
            });

        case ActionTypes.GET_BASIC_DETAILS_OF_FRAGMENTS_REQUEST:
            return Object.assign({}, state, {
                basicDetailsOfFragment: {
                    ...initialState.basicDetailsOfFragment
                }
            });
        case ActionTypes.GET_BASIC_DETAILS_OF_FRAGMENTS_SUCCESS:
            return Object.assign({}, state, {
                basicDetailsOfFragment: {
                    ...state.basicDetailsOfFragment,
                    ...getPayloadData(action.payload)
                }
            });
        case ActionTypes.GET_BASIC_DETAILS_OF_FRAGMENTS_FAILURE:
            return Object.assign({}, state, {
                basicDetailsOfFragment: {
                    ...initialState.basicDetailsOfFragment
                }
            });

        case ActionTypes.GET_TITLE_FRAGMENT_ASSOCIATION_REQUEST:
            return Object.assign({}, state, {
                titleFragmentAssociation: {
                    ...state.titleFragmentAssociation,
                    data: [],
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_TITLE_FRAGMENT_ASSOCIATION_SUCCESS:
            return Object.assign({}, state, {
                titleFragmentAssociation: {
                    ...state.titleFragmentAssociation,
                    data: action.payload.data.data,
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_TITLE_FRAGMENT_ASSOCIATION_FAILURE:
            return Object.assign({}, state, {
                titleFragmentAssociation: {
                    ...state.titleFragmentAssociation,
                    data: [],
                    requestInProgress: false
                }
            });

        case ActionTypes.DELETE_FRAGMENT_REQUEST:
            return Object.assign({}, state, {
                deleteFragment: {
                    ...state.deleteFragment,
                    deleteFragment: false
                }
            });
        case ActionTypes.DELETE_FRAGMENT_SUCCESS:
            return Object.assign({}, state, {
                deleteFragment: {
                    ...state.deleteFragment,
                    deleteFragment: true
                }
            });
        case ActionTypes.DELETE_FRAGMENT_FAILURE:
            return Object.assign({}, state, {
                deleteFragment: {
                    ...state.deleteFragment,
                    deleteFragment: false
                }
            });

        case ActionTypes.STORE_JSON_DATA_FOR_FRAGMENT:
            return Object.assign({}, state, {
                listFilterDataForFragmentFilter: {
                    ...state.listFilterDataForFragmentFilter,
                    ...action.payload.data
                }
            });
        case ActionTypes.SET_FRAGMENT_TAB_INDEX:
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
