import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';

export function fetchLanguagesForQuestions() {
    let payload = {
        types: [ActionTypes.LOAD_QUESTION_LANGUAGES_REQUEST, ActionTypes.LOAD_QUESTION_LANGUAGES_SUCCESS, ActionTypes.LOAD_QUESTION_LANGUAGES_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM.LIST_LANGUAGES,
        api: restAPI.get,
        payload
    };
}

export function saveQuestion(data) {
    let payload = {
        types: [ActionTypes.SAVE_QUESTION_REQUEST, ActionTypes.SAVE_QUESTION_SUCCESS, ActionTypes.SAVE_QUESTION_FAILURE],
        body: data
    };
    return {
        url: URL.DYNAMIC_FORM.SAVE_QUESTION,
        api: restAPI.post,
        payload
    };
}

export function updateQuestion(data, id) {
    let payload = {
        types: [ActionTypes.UPDATE_QUESTION_REQUEST, ActionTypes.UPDATE_QUESTION_SUCCESS, ActionTypes.UPDATE_QUESTION_FAILURE],
        body: data
    };
    return {
        url: URL.DYNAMIC_FORM.UPDATE_QUESTION.replace(':questionId', id),
        api: restAPI.put,
        payload
    };
}

export function fetchQuestions({ params, types }) {
    let payload = {
        types,
        params
    };
    return {
        url: URL.DYNAMIC_FORM.LIST_QUESTIONS,
        api: restAPI.get,
        payload
    };
}

export function fetchQuestionValidationTypes(data) {
    let payload = {
        types: [ActionTypes.FETCH_QUESTION_VALIDATION_TYPES_REQUEST, ActionTypes.FETCH_QUESTION_VALIDATION_TYPES_SUCCESS, ActionTypes.FETCH_QUESTION_VALIDATION_TYPES_FAILURE],
        params: data
    };
    return {
        url: URL.COMMON.QUESTION_VALIDATION_TYPES,
        api: restAPI.get,
        payload
    };
}

export function deleteQuestion(questionId) {
    let payload = {
        types: [ActionTypes.DELETE_QUESTION_REQUEST, ActionTypes.DELETE_QUESTION_SUCCESS, ActionTypes.DELETE_QUESTION_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM.DELETE_QUESTION.replace(':questionId', questionId),
        api: restAPI.del,
        payload
    };
}

export function fetchQuestionById({ langId, questionId }) {
    let payload = {
        types: [ActionTypes.FETCH_QUESTION_BY_ID_REQUEST, ActionTypes.FETCH_QUESTION_BY_ID_SUCCESS, ActionTypes.FETCH_QUESTION_BY_ID_FAILURE],
        params: { langId }
    };
    return {
        url: URL.DYNAMIC_FORM.FETCH_QUESTION_BY_ID.replace(':questionId', questionId),
        api: restAPI.get,
        payload
    };
}

export function fetchQuestionTypes(data) {
    let payload = {
        types: [ActionTypes.FETCH_QUESTION_TYPES_REQUEST, ActionTypes.FETCH_QUESTION_TYPES_SUCCESS, ActionTypes.FETCH_QUESTION_TYPES_FAILURE],
        params: data
    };
    return {
        url: URL.DYNAMIC_FORM.FETCH_QUESTION_TYPES,
        api: restAPI.get,
        payload
    };
}

export function fetchQuestionKeys() {
    let payload = {
        types: [ActionTypes.FETCH_QUESTION_KEYS_REQUEST, ActionTypes.FETCH_QUESTION_KEYS_SUCCESS, ActionTypes.FETCH_QUESTION_KEYS_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM.FETCH_QUESTION_KEYS,
        api: restAPI.get,
        payload
    };
}
export function fetchCurrentAssociationQuestion(id) {
    let payload = {
        types: [ActionTypes.FETCH_QUESTION_CURRENT_ASSOCIATION_REQUEST, ActionTypes.FETCH_QUESTION_CURRENT_ASSOCIATION_SUCCESS, ActionTypes.FETCH_QUESTION_CURRENT_ASSOCIATION_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM.FETCH_QUESTION_CURRENT_ASSOCIATION.replace(':questionId', id),
        api: restAPI.get,
        payload
    };
}
export function fetchDataSource() {
    let payload = {
        types: [ActionTypes.FETCH_DATA_SOURCE_REQUEST, ActionTypes.FETCH_DATA_SOURCE_SUCCESS, ActionTypes.FETCH_DATA_SOURCE_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM.FETCH_DATA_SOURCE,
        api: restAPI.get,
        payload
    };
}
export function fetchDataSourceByID(id) {
    let payload = {
        types: [ActionTypes.FETCH_DATA_SOURCE_BY_ID_REQUEST, ActionTypes.FETCH_DATA_SOURCE_BY_ID_SUCCESS, ActionTypes.FETCH_DATA_SOURCE_BY_ID_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM.FETCH_DATA_SOURCE_BY_ID.replace(':dataSourceID', id),
        api: restAPI.get,
        payload
    };
}
export function fetchDataSourceByIDForCreate(id) {
    let payload = {
        types: [ActionTypes.FETCH_DATA_SOURCE_BY_ID_CREATE_REQUEST, ActionTypes.FETCH_DATA_SOURCE_BY_ID_CREATE_SUCCESS, ActionTypes.FETCH_DATA_SOURCE_BY_ID_CREATE_FAILURE]
    };
    return {
        url: URL.DYNAMIC_FORM.FETCH_DATA_SOURCE_BY_ID.replace(':dataSourceID', id),
        api: restAPI.get,
        payload
    };
}
export function listJsonDataForTable({ type, searchValue, searchKey }) {
    let payload = {
        types: [ActionTypes.LIST_JSON_DATA_FOR_QUESTION_FILTER_REQUEST, ActionTypes.LIST_JSON_DATA_FOR_QUESTION_FILTER_SUCCESS, ActionTypes.LIST_JSON_DATA_FOR_QUESTION_FILTER_FAILURE],
        params: { type, searchValue, searchKey }
    };
    return {
        url: URL.DYNAMIC_FORM.LIST_QUESTIONS,
        api: restAPI.get,
        payload
    };
}

