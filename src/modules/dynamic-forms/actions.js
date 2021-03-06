import { action } from '../../common';

export const types = {
    LOAD_QUESTION_LANGUAGES: 'DynamicForm/LOAD_QUESTION_LANGUAGES',
    LOAD_QUESTION_LANGUAGES_REQUEST: 'DynamicForm/LOAD_QUESTION_LANGUAGES_REQUEST',
    LOAD_QUESTION_LANGUAGES_SUCCESS: 'DynamicForm/LOAD_QUESTION_LANGUAGES_SUCCESS',
    LOAD_QUESTION_LANGUAGES_FAILURE: 'DynamicForm/LOAD_QUESTION_LANGUAGES_FAILURE',

    FETCH_QUESTIONS: 'DynamicForm/FETCH_QUESTIONS',
    FETCH_QUESTIONS_REQUEST: 'DynamicForm/FETCH_QUESTIONS_REQUEST',
    FETCH_QUESTIONS_SUCCESS: 'DynamicForm/FETCH_QUESTIONS_SUCCESS',
    FETCH_QUESTIONS_FAILURE: 'DynamicForm/FETCH_QUESTIONS_FAILURE',

    FETCH_QUESTION_VALIDATION_TYPES: 'DynamicForm/FETCH_QUESTION_VALIDATION_TYPES',
    FETCH_QUESTION_VALIDATION_TYPES_REQUEST: 'DynamicForm/FETCH_QUESTION_VALIDATION_TYPES_REQUEST',
    FETCH_QUESTION_VALIDATION_TYPES_SUCCESS: 'DynamicForm/FETCH_QUESTION_VALIDATION_TYPES_SUCCESS',
    FETCH_QUESTION_VALIDATION_TYPES_FAILURE: 'DynamicForm/FETCH_QUESTION_VALIDATION_TYPES_FAILURE',

    SAVE_QUESTION: 'DynamicForm/SAVE_QUESTION',
    SAVE_QUESTION_REQUEST: 'DynamicForm/SAVE_QUESTION_REQUEST',
    SAVE_QUESTION_SUCCESS: 'DynamicForm/SAVE_QUESTION_SUCCESS',
    SAVE_QUESTION_FAILURE: 'DynamicForm/SAVE_QUESTION_FAILURE',

    UPDATE_QUESTION: 'DynamicForm/UPDATE_QUESTION',
    UPDATE_QUESTION_REQUEST: 'DynamicForm/UPDATE_QUESTION_REQUEST',
    UPDATE_QUESTION_SUCCESS: 'DynamicForm/UPDATE_QUESTION_SUCCESS',
    UPDATE_QUESTION_FAILURE: 'DynamicForm/UPDATE_QUESTION_FAILURE',

    DELETE_QUESTION: 'DynamicForm/DELETE_QUESTION',
    DELETE_QUESTION_REQUEST: 'DynamicForm/DELETE_QUESTION_REQUEST',
    DELETE_QUESTION_SUCCESS: 'DynamicForm/DELETE_QUESTION_SUCCESS',
    DELETE_QUESTION_FAILURE: 'DynamicForm/DELETE_QUESTION_FAILURE',

    FETCH_QUESTION_BY_ID: 'DynamicForm/FETCH_QUESTION_BY_ID',
    FETCH_QUESTION_BY_ID_REQUEST: 'DynamicForm/FETCH_QUESTION_BY_ID_REQUEST',
    FETCH_QUESTION_BY_ID_SUCCESS: 'DynamicForm/FETCH_QUESTION_BY_ID_SUCCESS',
    FETCH_QUESTION_BY_ID_FAILURE: 'DynamicForm/FETCH_QUESTION_BY_ID_FAILURE',

    FETCH_QUESTION_TYPES: 'DynamicForm/FETCH_QUESTION_TYPES',
    FETCH_QUESTION_TYPES_REQUEST: 'FETCH_QUESTION_TYPES_REQUEST',
    FETCH_QUESTION_TYPES_SUCCESS: 'DynamicForm/FETCH_QUESTION_TYPES_SUCCESS',
    FETCH_QUESTION_TYPES_FAILURE: 'DynamicForm/FETCH_QUESTION_TYPES_FAILURE',

    RESET_GENERATE_QUESTION_OBJECT: 'DynamicForm/RESET_GENERATE_QUESTION_OBJECT',
    RESET_GENERATE_QUESTION_OBJECT_REQUEST: 'DynamicForm/RESET_GENERATE_QUESTION_OBJECT_REQUEST',
    RESET_GENERATE_QUESTION_OBJECT_SUCCESS: 'DynamicForm/RESET_GENERATE_QUESTION_OBJECT_SUCCESS',
    RESET_GENERATE_QUESTION_OBJECT_FAILURE: 'DynamicForm/RESET_GENERATE_QUESTION_OBJECT_FAILURE',

    FETCH_QUESTION_KEYS: 'DynamicForm/FETCH_QUESTION_KEYS',
    FETCH_QUESTION_KEYS_REQUEST: 'FETCH_QUESTION_KEYS_REQUEST',
    FETCH_QUESTION_KEYS_SUCCESS: 'DynamicForm/FETCH_QUESTION_KEYS_SUCCESS',
    FETCH_QUESTION_KEYS_FAILURE: 'DynamicForm/FETCH_QUESTION_KEYS_FAILURE',

    FETCH_QUESTION_CURRENT_ASSOCIATION: 'DynamicForm/FETCH_QUESTION_CURRENT_ASSOCIATION',
    FETCH_QUESTION_CURRENT_ASSOCIATION_REQUEST: 'DynamicForm/FETCH_QUESTION_CURRENT_ASSOCIATION_REQUEST',
    FETCH_QUESTION_CURRENT_ASSOCIATION_SUCCESS: 'DynamicForm/FETCH_QUESTION_CURRENT_ASSOCIATION_SUCCESS',
    FETCH_QUESTION_CURRENT_ASSOCIATION_FAILURE: 'DynamicForm/FETCH_QUESTION_CURRENT_ASSOCIATION_FAILURE',

    FETCH_DATA_SOURCE: 'DynamicForm/FETCH_DATA_SOURCE',
    FETCH_DATA_SOURCE_REQUEST: 'DynamicForm/FETCH_DATA_SOURCE_REQUEST',
    FETCH_DATA_SOURCE_SUCCESS: 'DynamicForm/FETCH_DATA_SOURCE_SUCCESS',
    FETCH_DATA_SOURCE_FAILURE: 'DynamicForm/FETCH_DATA_SOURCE_FAILURE',

    FETCH_DATA_SOURCE_BY_ID: 'DynamicForm/FETCH_DATA_SOURCE_BY_ID',
    FETCH_DATA_SOURCE_BY_ID_REQUEST: 'DynamicForm/FETCH_DATA_SOURCE_BY_ID_REQUEST',
    FETCH_DATA_SOURCE_BY_ID_SUCCESS: 'DynamicForm/FETCH_DATA_SOURCE_BY_ID_SUCCESS',
    FETCH_DATA_SOURCE_BY_ID_FAILURE: 'DynamicForm/FETCH_DATA_SOURCE_BY_ID_FAILURE',

    FETCH_DATA_SOURCE_BY_ID_CREATE: 'DynamicForm/FETCH_DATA_SOURCE_BY_ID_CREATE',
    FETCH_DATA_SOURCE_BY_ID_CREATE_REQUEST: 'DynamicForm/FETCH_DATA_SOURCE_BY_ID_CREATE_REQUEST',
    FETCH_DATA_SOURCE_BY_ID_CREATE_SUCCESS: 'DynamicForm/FETCH_DATA_SOURCE_BY_ID_CREATE_SUCCESS',
    FETCH_DATA_SOURCE_BY_ID_CREATE_FAILURE: 'DynamicForm/FETCH_DATA_SOURCE_BY_ID_CREATE_FAILURE',

    SET_DATA_SOURCE: 'DynamicForm/SET_DATA_SOURCE',

    CLEAR_QUESTION_DETAILS_REDUCER: 'DynamicForm/CLEAR_QUESTION_DETAILS_REDUCER',

    LIST_JSON_DATA_FOR_QUESTION_FILTER: 'DynamicForm/LIST_JSON_DATA_FOR_QUESTION_FILTER',
    LIST_JSON_DATA_FOR_QUESTION_FILTER_REQUEST: 'DynamicForm/LIST_JSON_DATA_FOR_QUESTION_FILTER_REQUEST',
    LIST_JSON_DATA_FOR_QUESTION_FILTER_SUCCESS: 'DynamicForm/LIST_JSON_DATA_FOR_QUESTION_FILTER_SUCCESS',
    LIST_JSON_DATA_FOR_QUESTION_FILTER_FAILURE: 'DynamicForm/LIST_JSON_DATA_FOR_QUESTION_FILTER_FAILURE',
    SET_QUESTION_TAB_INDEX: 'DynamicForm/SET_QUESTION_TAB_INDEX'


};

export const fetchQuestionValidationTypes = () => action(types.FETCH_QUESTION_VALIDATION_TYPES);
export const fetchLanguagesForQuestions = () => action(types.LOAD_QUESTION_LANGUAGES);
export const saveQuestion = (data) => action(types.SAVE_QUESTION, { data });
export const updateQuestion = (id, data) => action(types.UPDATE_QUESTION, { id, data });

export const fetchQuestions = (data) => action(types.FETCH_QUESTIONS, { data });
export const deleteQuestion = (data, size, page) => action(types.DELETE_QUESTION, { data, size, page });
export const fetchQuestionById = (data) => action(types.FETCH_QUESTION_BY_ID, { data });
export const fetchQuestionTypes = () => action(types.FETCH_QUESTION_TYPES);
export const resetEditGenerateQuestions = () => action(types.RESET_GENERATE_QUESTION_OBJECT);
export const fetchQuestionKeys = () => action(types.FETCH_QUESTION_KEYS);
export const fetchCurrentAssociationQuestion = (id) => action(types.FETCH_QUESTION_CURRENT_ASSOCIATION, { id });
export const fetchDataSource = () => action(types.FETCH_DATA_SOURCE);
export const fetchDataSourceByID = (id) => action(types.FETCH_DATA_SOURCE_BY_ID, { id });
export const fetchDataSourceByIDInCreate = (id) => action(types.FETCH_DATA_SOURCE_BY_ID_CREATE, { id });
export const setDataSource = (data) => action(types.SET_DATA_SOURCE, { data });

export const clearStateReducer = () => action(types.CLEAR_QUESTION_DETAILS_REDUCER);

export const setTabIndex = (data) => action(types.SET_QUESTION_TAB_INDEX, { data });

