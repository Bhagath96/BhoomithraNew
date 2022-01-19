import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';
export function fetchLanguagesForTitle() {
    let payload = {
        types: [ActionTypes.LOAD_LANGUAGES_FOR_TITLE_REQUEST, ActionTypes.LOAD_LANGUAGES_FOR_TITLE_SUCCESS, ActionTypes.LOAD_LANGUAGES_FOR_TITLE_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM.LIST_LANGUAGES,
        api: restAPI.get,
        payload
    };
}

export function sentLabelForTitle(data) {
    let payload = {
        types: [ActionTypes.SENT_LABEL_FOR_TITLE_REQUEST, ActionTypes.SENT_LABEL_FOR_TITLE_SUCCESS, ActionTypes.SENT_LABEL_FOR_TITLE_FAILURE],
        body: data
    };
    return {
        url: URL.DYNAMIC_FORM.SENT_LABEL_FOR_TITLE,
        api: restAPI.post,
        payload
    };
}

export function listQuestionForTitle(langId, type) {
    let payload = {
        types: [ActionTypes.LIST_QUESTION_TYPE_REQUEST, ActionTypes.LIST_QUESTION_TYPE_SUCCESS, ActionTypes.LIST_QUESTION_TYPE_FAILURE],
        params: { langId, type }
    };
    return {
        url: URL.DYNAMIC_FORM.LIST_QUESTIONS,
        api: restAPI.get,
        payload
    };
}

export function sentQuestionAndSortOrder(titleId, data) {
    let payload = {
        types: [ActionTypes.SENT_QUESTION_WITH_SORT_ORDER_REQUEST, ActionTypes.SENT_QUESTION_WITH_SORT_ORDER_SUCCESS, ActionTypes.SENT_QUESTION_WITH_SORT_ORDER_FAILURE],
        body: data
    };
    return {
        url: URL.DYNAMIC_FORM.SENT_QUESTIONS_AND_SORT_ORDER.replace(':titleId', titleId),
        api: restAPI.put,
        payload
    };
}

export function listTitle({ params, types }) {
    let payload = {
        types,
        params
    };
    return {
        url: URL.DYNAMIC_FORM.LIST_TITLE,
        api: restAPI.get,
        payload
    };
}

export function deleteTitle(id) {
    let payload = {
        types: [ActionTypes.DELETE_TITLE_REQUEST, ActionTypes.DELETE_TITLE_SUCCCESS, ActionTypes.DELETE_TITLE_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM.DELETE_TITLE.replace(':titleId', id),
        api: restAPI.del,
        payload
    };
}


export function getLabelsWithId(id) {
    let payload = {
        types: [ActionTypes.GET_LABELS_WITH_ID_REQUEST, ActionTypes.GET_LABELS_WITH_ID_SUCCESS, ActionTypes.GET_LABELS_WITH_ID_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM.GET_TITILE_BY_ID.replace(':titleId', id),
        api: restAPI.get,
        payload
    };
}

export function sentLabelsForEDit(id, data) {
    let payload = {
        types: [ActionTypes.SENT_LABELS_FOR_EDIT_REQUEST, ActionTypes.SENT_LABELS_FOR_EDIT_SUCCESS, ActionTypes.SENT_LABEL_FOR_TITLE_FAILURE],
        body: data
    };
    return {
        url: URL.DYNAMIC_FORM.EDIT_LABELS_WITH_ID.replace(':titleId', id),
        api: restAPI.put,
        payload
    };
}

export function getQuestionForTitle(id, langId) {
    let payload = {
        types: [ActionTypes.GET_QUESTIONS_FOR_TITLE_REQUEST, ActionTypes.GET_QUESTIONS_FOR_TITLE_SUCCESS, ActionTypes.GET_QUESTIONS_FOR_TITLE_FAILURE],
        params: { langId }
    };
    return {
        url: URL.DYNAMIC_FORM.GET_QUESTIONS_FOR_TITLE_WITH_ID.replace(':titleId', id),
        api: restAPI.get,
        payload
    };
}

export function getQuestionValidationForTitle() {
    let payload = {
        types: [ActionTypes.GET_QUESTION_VALIDATION_TYPE_REQUEST, ActionTypes.GET_QUESTION_VALIDATION_TYPE_SUCCESS, ActionTypes.GET_QUESTION_VALIDATION_TYPE_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM.GET_QUESTIONS_VALIDATION_TYPE,
        api: restAPI.get,
        payload
    };
}

export function sentQuestionValidation(id, validationObject) {
    let payload = {
        types: [ActionTypes.SENT_QUESTION_VALIDATION_REQUEST, ActionTypes.SENT_QUESTION_VALIDATION_SUCCESS, ActionTypes.SENT_QUESTION_WITH_SORT_ORDER_FAILURE],
        body: validationObject
    };
    return {
        url: URL.DYNAMIC_FORM.UPDATE_VALIDATION_OBJECT.replace(':titleId', id),
        api: restAPI.put,
        payload
    };
}

export function getQuestionValidation(id, langId) {
    let payload = {
        types: [ActionTypes.GET_QUESTION_VALIDATION_REQUEST, ActionTypes.GET_QUESTION_VALIDATION_SUCCESS, ActionTypes.GET_QUESTION_VALIDATION_TYPE_FAILURE],
        params: { langId }
    };
    return {
        url: URL.DYNAMIC_FORM.GET_QUESTION_VALIDATION.replace(':titleId', id),
        api: restAPI.get,
        payload
    };
}

export function getOptionWithQuestionId(id, langId) {
    let payload = {
        types: [ActionTypes.GET_OPTION_WITH_QUESTION_ID_REQUEST, ActionTypes.GET_OPTION_WITH_QUESTION_ID_SUCCESS, ActionTypes.GET_OPTION_WITH_QUESTION_ID_FAILURE],
        params: { langId }
    };
    return {
        url: URL.DYNAMIC_FORM.GET_OPTION_WITH_QUESTION_ID.replace(':questionId', id),
        api: restAPI.get,
        payload
    };
}


export function getQuestionOptionValidation(id, langId) {
    let payload = {
        types: [ActionTypes.GET_QUESTION_OPTION_VALIDATION_REQUEST, ActionTypes.GET_QUESTION_OPTION_VALIDATION_SUCCESS, ActionTypes.GET_QUESTION_OPTION_VALIDATION_FAILURE],
        params: { langId }
    };
    return {
        url: URL.DYNAMIC_FORM.GET_QUESTION_OPTION_VALIDATION.replace(':titleId', id),
        api: restAPI.get,
        payload
    };
}

export function sentQuestionOptionForEdit(id, validationObject) {
    let payload = {
        types: [ActionTypes.SENT_QUESTION_OPTION_FOR_EDIT_REQUEST, ActionTypes.SENT_QUESTION_OPTION_FOR_EDIT_SUCCESS, ActionTypes.SENT_QUESTION_OPTION_FOR_EDIT_FAILURE],
        body: validationObject
    };
    return {
        url: URL.DYNAMIC_FORM.UPDATE_QUESTION_OPTION_VALIDATION.replace(':titleId', id),
        api: restAPI.put,
        payload
    };
}

export function getOptionQuestions(params, titleId) {
    let payload = {
        types: [ActionTypes.GET_OPTION_QUESTIONS_REQUEST, ActionTypes.GET_OPTION_QUESTIONS_SUCCESS, ActionTypes.GET_OPTION_QUESTIONS_FAILURE],
        params
    };
    return {
        url: URL.DYNAMIC_FORM.LIST_OPTION_QUESTIONS.replace(':titleId', titleId),
        api: restAPI.get,
        payload
    };
}

export function getTitleQuestions(langId, titleId, type) {
    let payload = {
        types: [ActionTypes.GET_TITLE_QUESTION_ONLY_REQUEST, ActionTypes.GET_TITLE_QUESTION_ONLY_SUCCESS, ActionTypes.GET_TITLE_QUESTION_ONLY_FAILURE],
        params: { langId, type }
    };
    return {
        url: URL.DYNAMIC_FORM.GET_ALL_TITLE_QUESTIONS.replace(':titleId', titleId),
        api: restAPI.get,
        payload
    };
}

export function fetchCurrentAssociation(id) {
    let payload = {
        types: [ActionTypes.FETCH_TITLE_CURRENT_ASSOCIATION_REQUEST, ActionTypes.FETCH_TITLE_CURRENT_ASSOCIATION_SUCCESS, ActionTypes.FETCH_TITLE_CURRENT_ASSOCIATION_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM.GET_TITLE_CURRENT_ASSOCIATION.replace(':titleId', id),
        api: restAPI.get,
        payload
    };
}
export function listJsonDataForTable({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_TITLE_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_TITLE_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_TITLE_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.DYNAMIC_FORM.LIST_TITLE,
        api: restAPI.get,
        payload
    };
}
