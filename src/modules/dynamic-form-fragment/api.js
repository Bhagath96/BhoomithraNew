import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';


export function listPagableFragment({ params, types }) {
    let payload = {
        types,
        params
    };
    return {
        url: URL.DYNAMIC_FORM.LIST_FRAGMENT,
        api: restAPI.get,
        payload
    };
}


export function getTitleBasedOnFragmentId(id) {
    let type = 'dropdown';
    let payload = {
        types: [ActionTypes.GET_TITLE_BASED_ON_FRAGMENT_ID_REQUEST, ActionTypes.GET_TITLE_BASED_ON_FRAGMENT_ID_SUCCESS, ActionTypes.GET_TITLE_BASED_ON_FRAGMENT_ID_FAILURE],
        params: { type }
    };
    return {
        url: URL.DYNAMIC_FORM.FETCH_TITLE_BASED_ON_FRAGMENT_ID.replace(':fragmentId', id),
        api: restAPI.get,
        payload
    };
}

export function getQuestionsBasedOnTitleId(id, langId) {
    let type = 'dropdown';
    let payload = {
        types: [ActionTypes.GET_QUESTIONS_BASED_ON_TITLE_ID_REQUEST, ActionTypes.GET_QUESTIONS_BASED_ON_TITLE_ID_SUCCESS, ActionTypes.GET_QUESTIONS_BASED_ON_TITLE_ID_FAILURE],
        params: { type, langId }
    };
    return {
        url: URL.DYNAMIC_FORM.FETCH_QUESTIONS_BASED_ON_TITLE_ID.replace(':titleId', id),
        api: restAPI.get,
        payload
    };
}


export function getAllFRagmentsForDropDown(langId) {
    let type = 'dropdown';
    let payload = {
        types: [ActionTypes.GET_ALL_FRAGMENTS_FOR_DROPDOWN_REQUEST, ActionTypes.GET_ALL_FRAGMENTS_FOR_DROPDOWN_SUCCESS, ActionTypes.GET_ALL_FRAGMENTS_FOR_DROPDOWN_FAILURE],
        params: { type, langId }
    };
    return {
        url: URL.DYNAMIC_FORM.GET_ALL_FRAGMENTS_FOR_DROPDOWN,
        api: restAPI.get,
        payload
    };
}


export function getFragmentQLoopById(id, langId) {
    let type = 'dropdown';
    let payload = {
        types: [ActionTypes.GET_FRAGMENT_QUESTION_LOOP_BY_ID_REQUEST, ActionTypes.GET_FRAGMENT_QUESTION_LOOP_BY_ID_SUCCESS, ActionTypes.GET_FRAGMENT_QUESTION_LOOP_BY_ID_FAILURE],
        params: { type, langId }
    };
    return {
        url: URL.DYNAMIC_FORM.GET_FRAGMENT_QUESTION_LOOP.replace(':fragmentId', id),
        api: restAPI.get,
        payload
    };
}

export function updateTitleQuestionFragmentLoop(id, data) {
    let payload = {
        types: [ActionTypes.UPDATE_FRAGMENT_QUESTION_TITLE_LOOP_REQUEST, ActionTypes.UPDATE_FRAGMENT_QUESTION_TITLE_LOOP_SUCCESS, ActionTypes.UPDATE_FRAGMENT_QUESTION_TITLE_LOOP_FAILURE],
        body: data
    };
    return {
        url: URL.DYNAMIC_FORM.UPDATE_FRAGMENT_QUESTION_LOOP.replace(':fragmentId', id),
        api: restAPI.put,
        payload
    };
}

export function loadLanguagesForFragments() {
    let payload = {
        types: [ActionTypes.LOAD_LANGUAGES_FOR_FRAGMENTS_REQUEST, ActionTypes.LOAD_LANGUAGES_FOR_FRAGMENTS_SUCCESS, ActionTypes.LOAD_LANGUAGES_FOR_FRAGMENTS_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM.LIST_LANGUAGES,
        api: restAPI.get,
        payload
    };
}

export function loadTitlesForFragments(type) {
    let payload = {
        types: [ActionTypes.LOAD_TITLES_FOR_FRAGMENT_REQUEST, ActionTypes.LOAD_TITLES_FOR_FRAGMENT_SUCCESS, ActionTypes.LOAD_TITLES_FOR_FRAGMENT_FAILURE],
        params: { type }

    };
    return {
        url: URL.DYNAMIC_FORM.LIST_TITLE,
        api: restAPI.get,
        payload
    };
}

export function getBasicDEtailOfFragments(id) {
    let payload = {
        types: [ActionTypes.GET_BASIC_DETAILS_OF_FRAGMENTS_REQUEST, ActionTypes.GET_BASIC_DETAILS_OF_FRAGMENTS_SUCCESS, ActionTypes.GET_BASIC_DETAILS_OF_FRAGMENTS_FAILURE]

    };
    return {
        url: URL.DYNAMIC_FORM.GET_BASIC_DETAILS_OF_FRAGMENT.replace(':fragmentId', id),
        api: restAPI.get,
        payload
    };
}

export function editFragmentBasicDetails(id, fragmentObject) {
    let payload = {
        types: [ActionTypes.EDIT_FRAGMENT_BASIC_DETAILS_REQUEST, ActionTypes.EDIT_FRAGMENT_BASIC_DETAILS_SUCCESS, ActionTypes.EDIT_FRAGMENT_BASIC_DETAILS_FAILURE],
        body: fragmentObject

    };
    return {
        url: URL.DYNAMIC_FORM.EDIT_FRAGMENT_BASIC_DETAILS.replace(':fragmentId', id),
        api: restAPI.put,
        payload
    };
}

export function sentFragmentBasicDetails(fragmentObject) {
    let payload = {
        types: [ActionTypes.SENT_FRAGMENT_FOR_POST_REQUEST, ActionTypes.SENT_FRAGMENT_FOR_POST_SUCCESS, ActionTypes.SENT_FRAGMENT_FOR_POST_FAILURE],
        body: fragmentObject

    };
    return {
        url: URL.DYNAMIC_FORM.SENT_FRAGMENT_BASIC_DETAIL,
        api: restAPI.post,
        payload
    };
}

export function getTitlesForFragment() {
    const type = 'dropdown';
    let payload = {
        types: [ActionTypes.GET_TITLES_FOR_DROP_DOWN_REQUEST, ActionTypes.GET_TITLES_FOR_DROP_DOWN_SUCCESS, ActionTypes.GET_TITLES_FOR_DROP_DOWN_FAILURE],
        params: { type }
    };
    return {
        url: URL.DYNAMIC_FORM.LIST_TITLE,
        api: restAPI.get,
        payload
    };
}

export function editFragmentTitleAssociation(id, data) {
    let payload = {
        types: [ActionTypes.EDIT_FRAGMENT_TITLE_ASSOCIATION_REQUEST, ActionTypes.EDIT_FRAGMENT_TITLE_ASSOCIATION_SUCCESS, ActionTypes.EDIT_FRAGMENT_TITLE_ASSOCIATION_FAILURE],
        body: data
    };
    return {
        url: URL.DYNAMIC_FORM.EDIT_TITLE_FRAGMENT_ASSOCIATION.replace(':fragmentId', id),
        api: restAPI.put,
        payload
    };
}

export function getTitleFragmentAssociation(id, langId) {
    let payload = {
        types: [ActionTypes.GET_TITLE_FRAGMENT_ASSOCIATION_REQUEST, ActionTypes.GET_TITLE_FRAGMENT_ASSOCIATION_SUCCESS, ActionTypes.GET_TITLE_FRAGMENT_ASSOCIATION_FAILURE],
        params: { langId }
    };
    return {
        url: URL.DYNAMIC_FORM.GET_TITLE_FRAGMENT_ASSOCIATION.replace(':fragmentId', id),
        api: restAPI.get,
        payload
    };
}

export function deleteFragment(id) {
    let payload = {
        types: [ActionTypes.DELETE_FRAGMENT_REQUEST, ActionTypes.DELETE_FRAGMENT_SUCCESS, ActionTypes.DELETE_FRAGMENT_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM.DELETE_FRAGMENT.replace(':fragmentId', id),
        api: restAPI.del,
        payload
    };
}
export function fetchCurrentAssociationData(id) {
    let payload = {
        types: [ActionTypes.FETCH_CURRENT_ASSOCIATION_FRAGMENT_REQUEST, ActionTypes.FETCH_CURRENT_ASSOCIATION_FRAGMENT_SUCCESS, ActionTypes.FETCH_CURRENT_ASSOCIATION_FRAGMENT_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM.FETCH_FRAGMENT_CURRENT_ASSOCIATION.replace(':fragmentId', id),
        api: restAPI.get,
        payload
    };
}
export function listJsonDataForTable({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_FRAGMENT_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_FRAGMENT_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_FRAGMENT_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.DYNAMIC_FORM.LIST_FRAGMENT,
        api: restAPI.get,
        payload
    };
}


