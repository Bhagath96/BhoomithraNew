import { types as ActionTypes } from './actions';
import { REQUEST_STATUS } from './constants';
import { getPayloadData, formatFilterSearchKeys } from '../../utils/ApiUtils';
import _ from '../../utils/LodashUtils';
import { DEFAULT_TABLE_PROPS } from '../../common/constants';
import { getEmptyPicky } from '../../utils/CommonUtils';

const generateRoutesFormDetails = (details) => {
    let fragmentList = [], titles = {}, questions = {}, options = {}, routes = {}, connect = {};

    _.forEach(details, (fragment) => {
        // let fragmentId = fragment.id;
        let localTitles = [];
        fragmentList.push({ id: fragment.id, name: fragment.name });
        _.forEach(fragment.titles, (title) => {
            let titleId = title.id;
            let localQuestions = [];
            localTitles.push({ id: title.id, name: title.title });
            let connectedKey = null, connectedOptions = [];

            _.forEach(title.questions, (question) => {
                let questionId = question.id;
                let localOptions = [];
                let { id, isConnectedQuestion = false, type, linkToFragment } = question;
                if (isConnectedQuestion) {
                    connectedOptions.push(question.id);
                }
                localQuestions.push({ id, name: question.question, isConnectedQuestion, type, linkToFragment });
                _.forEach(question.options, (option) => {
                    if (option.hasConnectedQuestion || false) {
                        connectedKey = option.id;
                        connect[connectedKey] = { connect: _.get(option, 'dependantQuestionGid', []) };
                    }
                    localOptions.push({ id: option.id, name: option.name });
                });

                options[questionId] = localOptions;
            });
            if (connectedKey !== null) {
                routes[connectedKey] = { connect: connectedOptions };
            }
            questions[titleId] = localQuestions;
        });
        titles = localTitles;
    });

    return { fragmentList, titles, questions, options, routes, connect };
};


const initialState = {
    languages: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    fragments: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    listTemplates: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {},
        searchKeys: []
    },
    listFragments: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {},
        ...DEFAULT_TABLE_PROPS
    },
    addTemplate: {
        data: {},
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    fetchRoutesFromTemplate: {
        data: {
            fragmentJson: {
                fragment: {},
                formData: {}
            },
            linkJson: {}
        },
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    routes: {},
    routesGenerationDetails: [{}],
    fragmentJSON: {
        data: {},
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    commonTemplate: {
        selected: 0
    },
    AssignLabelMappings: {},
    questionsList: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    labelList: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    assignFragment: {
        fragment: [getEmptyPicky()],
        sort: null
    },
    fetchAssignedFragment: {
        data: {},
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    setFragmentValueToAssignRoute: {

        fragment: {}
    },
    fetchCurrentAssociation: {
        data: {},
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    templateUpdateSuccessNotifyFlag: {
        flagForSuccess: false
    },
    listRoutesByTemplate: {
        data: {}
    }
};

let listFragmentsResponse = {}, listRoutesResponse = {}, listTemplatesResponse = {}, fragmentJSONResponse = {}, fetchRoutesWithFragmentsResponse = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.UPDATE_TEMPLATE_SUCCESS:
            return Object.assign({}, state, {
                templateUpdateSuccessNotifyFlag: {
                    flagForSuccess: true
                }
            });

        case ActionTypes.FETCH_RESET_PAGEBLE_TEMPLATE_REQUEST:
            return Object.assign({}, state, {
                listTemplates: {
                    ...state.listTemplates,
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.FETCH_RESET_PAGEBLE_TEMPLATE_SUCCESS:
            listTemplatesResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listTemplates: {
                    ...state.listTemplates,
                    data: listTemplatesResponse,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    searchKeys: formatFilterSearchKeys(_.get(listTemplatesResponse, 'searchKeys', []))
                }
            });
        case ActionTypes.FETCH_RESET_PAGEBLE_TEMPLATE_FAILURE:
            return Object.assign({}, state, {
                listTemplates: {
                    ...state.listTemplates,
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.SET_FRAGMENT_TO_ASSIGN_ROUTE:
            return Object.assign({}, state, {
                setFragmentValueToAssignRoute: {
                    fragment: _.find(_.get(state, 'fragments.data', []), ['id', _.get(action, 'payload.data', '')])
                }
            });
        case ActionTypes.SET_TAB_INDEX:
            return Object.assign({}, state, {
                commonTemplate: {
                    selected: action.payload.data
                }
            });
        case ActionTypes.RESET_ASSIGN_FRAGMENT_FORM:
            return Object.assign({}, state, {
                assignFragment: {
                    ...initialState.assignFragment
                }
            });
        case ActionTypes.RESET_ADD_TEMPLATE_FORM:
            return Object.assign({}, state, {
                addTemplate: {
                    ...initialState.addTemplate
                }
            });
        case ActionTypes.RESET_ADD_ROUTE_FORM:
            return Object.assign({}, state, {
                fetchRoutesFromTemplate: {
                    ...initialState.fetchRoutesFromTemplate
                },
                fragmentJSON: {
                    ...initialState.fragmentJSON
                },
                routesGenerationDetails: {
                    ...initialState.routesGenerationDetails
                }
            });
        case ActionTypes.FETCH_TEMPLATE_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                addTemplate: {
                    ...state.addTemplate,
                    data: {
                        ...getPayloadData(action.payload, {}), templateTypeId: _.get(getPayloadData(action.payload, {}), 'templateType', null)
                    },
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });

        case ActionTypes.FETCH_ALL_FRAGMENTS_DROPDOWN_REQUEST:
            return Object.assign({}, state, {
                fragments: {
                    ...state.fragments,
                    data: [],
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.FETCH_ALL_FRAGMENTS_DROPDOWN_SUCCESS:
            return Object.assign({}, state, {
                fragments: {
                    ...state.fragments,
                    data: [...getPayloadData(action.payload, [])],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });

        case ActionTypes.FETCH_ALL_FRAGMENTS_DROPDOWN_FAILURE:
            return Object.assign({}, state, {
                fragments: {
                    ...state.fragments,
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.FETCH_TEMPLATES_REQUEST:
            return Object.assign({}, state, {
                listTemplates: {
                    ...state.listTemplates,
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.FETCH_TEMPLATES_SUCCESS:
            listTemplatesResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listTemplates: {
                    ...state.listTemplates,
                    data: listTemplatesResponse,
                    requestInProgress: false,

                    requestStatus: REQUEST_STATUS.SUCCESS,
                    searchKeys: formatFilterSearchKeys(_.get(listTemplatesResponse, 'searchKeys', []))

                }
            });
        case ActionTypes.FETCH_TEMPLATES_FAILURE:
            return Object.assign({}, state, {
                listTemplates: {
                    ...state.listTemplates,
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.FETCH_FRAGMENTS_BY_TEMPLATE_DROPDOWN_REQUEST:
            return Object.assign({}, state, {
                fragments: {
                    ...state.fragments,
                    data: [],
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.FETCH_FRAGMENTS_BY_TEMPLATE_DROPDOWN_SUCCESS:
            return Object.assign({}, state, {
                fragments: {
                    ...state.fragments,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });

        case ActionTypes.FETCH_FRAGMENTS_BY_TEMPLATE_DROPDOWN_FAILURE:
            return Object.assign({}, state, {
                fragments: {
                    ...state.fragments,
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.FETCH_FRAGMENTS_BY_TEMPLATE_REQUEST:
            return Object.assign({}, state, {
                listFragments: {
                    ...state.listFragments,
                    data: [],
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.FETCH_FRAGMENTS_BY_TEMPLATE_SUCCESS:
            listFragmentsResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listFragments: {
                    ...state.listFragments,
                    data: listFragmentsResponse,
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listFragmentsResponse, 'searchKeys', [])),

                    requestStatus: REQUEST_STATUS.SUCCESS
                }
                // fragments: {
                //     data: Array.isArray(listFragmentsResponse) ? listFragmentsResponse : [getEmptyPicky()],
                //     requestInProgress: false,
                //     requestStatus: REQUEST_STATUS.SUCCESS
                // }
            });

        case ActionTypes.FETCH_FRAGMENTS_BY_TEMPLATE_FAILURE:
            return Object.assign({}, state, {
                listFragments: {
                    ...state.listFragments,
                    data: {},
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_TEMPLATE_TYPE_REQUEST:
            return Object.assign({}, state, {
                templateTypes: {
                    ...state.templateTypes,
                    data: [],
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.FETCH_TEMPLATE_TYPE_SUCCESS:
            return Object.assign({}, state, {
                templateTypes: {
                    ...state.templateTypes,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_TEMPLATE_TYPE_FAILURE:
            return Object.assign({}, state, {
                templateTypes: {
                    ...state.templateTypes,
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.FETCH_ROUTES_FROM_TEMPLATE_REQUEST:
            return Object.assign({}, state, {
                fetchRoutesFromTemplate: {
                    ...initialState.fetchRoutesFromTemplate,
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.FETCH_ROUTES_FROM_TEMPLATE_SUCCESS:
            fetchRoutesWithFragmentsResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                fetchRoutesFromTemplate: {
                    ...state.fetchRoutesFromTemplate,
                    data: fetchRoutesWithFragmentsResponse,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                },
                fragmentJSON: {
                    ...state.fragmentJSON,
                    data: _.get(fetchRoutesWithFragmentsResponse, 'fragmentJson.fragment', {})
                },
                routesGenerationDetails: generateRoutesFormDetails([_.get(fetchRoutesWithFragmentsResponse, 'fragmentJson.fragment', {})])
            });
        case ActionTypes.FETCH_ROUTES_FROM_TEMPLATE_FAILURE:
            return Object.assign({}, state, {
                fetchRoutesFromTemplate: {
                    ...initialState.fetchRoutesFromTemplate,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.FETCH_FRAGMENTS_BY_FRAGMENT_ID_REQUEST:
            return Object.assign({}, state, {
                fragmentJSON: {
                    ...state.fragmentJSON,
                    data: {},
                    requestInProgress: true,
                    requestStatus: ''
                },
                routesGenerationDetails: [{}]
            });
        case ActionTypes.FETCH_FRAGMENTS_BY_FRAGMENT_ID_SUCCESS:
            fragmentJSONResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                fragmentJSON: {
                    ...state.fragmentJSON,
                    data: fragmentJSONResponse,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                },
                routesGenerationDetails: generateRoutesFormDetails([fragmentJSONResponse])
            });
        case ActionTypes.FETCH_FRAGMENTS_BY_FRAGMENT_ID_FAILURE:
            return Object.assign({}, state, {
                fragmentJSON: {
                    ...state.fragmentJSON,
                    data: {},
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                },
                routesGenerationDetails: [{}]
            });

        case ActionTypes.FETCH_ASSIGNED_FRAGMENT_REQUEST:
            return Object.assign({}, state, {
                assignFragment: {
                    ...initialState.assignFragment
                },
                fetchAssignedFragment: {
                    ...initialState.fetchAssignedFragment,
                    requestInProgress: true,
                    requestStatus: ''
                }
            });

        case ActionTypes.FETCH_ASSIGNED_FRAGMENT_SUCCESS:
            return Object.assign({}, state, {
                assignFragment: getPayloadData(action.payload, {}),
                fetchAssignedFragment: {
                    ...state.fetchAssignedFragment,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });

        case ActionTypes.FETCH_ASSIGNED_FRAGMENT_FAILURE:
            return Object.assign({}, state, {
                assignFragment: {
                    ...initialState.assignFragment
                },
                fetchAssignedFragment: {
                    ...initialState.fetchAssignedFragment,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });


        case ActionTypes.FETCH_CURRENT_ASSOCIATION_REQUEST:
            return Object.assign({}, state, {
                fetchCurrentAssociation: {
                    ...initialState.fetchCurrentAssociation,
                    requestInProgress: true
                }
            });

        case ActionTypes.FETCH_CURRENT_ASSOCIATION_SUCCESS:
            return Object.assign({}, state, {
                fetchCurrentAssociation: {
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });

        case ActionTypes.FETCH_CURRENT_ASSOCIATION_FAILURE:
            return Object.assign({}, state, {
                fetchCurrentAssociation: {
                    ...state.fetchCurrentAssociation,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.CLEAR_TEMPLATE_DETAILS_REDUCER:
            return Object.assign({}, state, {
                listTemplates: {}
            });

        case ActionTypes.FETCH_ROUTES_BY_TEMPLATE_REQUEST:
            return Object.assign({}, state, {
                listRoutesByTemplate: {
                    ...state.listRoutesByTemplate,
                    data: {},
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.FETCH_ROUTES_BY_TEMPLATE_SUCCESS:
            listRoutesResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listRoutesByTemplate: {
                    ...state.listRoutesByTemplate,
                    data: listRoutesResponse,
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listRoutesResponse, 'searchKeys', [])),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });

        case ActionTypes.FETCH_ROUTES_BY_TEMPLATE_FAILURE:
            return Object.assign({}, state, {
                listRoutesByTemplate: {
                    ...state.listRoutesByTemplate,
                    data: {},
                    requestInProgress: false,
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
