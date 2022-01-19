import { takeLatest, all, call, fork, take, select, put } from 'redux-saga/effects';
import { types as ActionTypes } from './actions';
import { saga, history } from '../../common';
import * as API from './api';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { getDefaultLanguage } from '../common/selectors';
import utils from '../../utils';
import * as Actions from './actions';
import { getDynamicForms } from './selectors';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { I18n } from '../../common/components';
import { PATH } from '../../routes';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../common/saga';
import { TABLE_IDS } from './constants';
import { setInitialFilterList, setTableDropdownFilterList } from '../common/actions';
const { lodashUtils: _ } = utils;

function* fetchLanguagesForQuestions() {
    yield call(saga.handleAPIRequest, API.fetchLanguagesForQuestions);
}

function* saveQuestion(action) {
    yield fork(saga.handleAPIRequest, API.saveQuestion, action.payload.data);
    yield take(ActionTypes.SAVE_QUESTION_SUCCESS);
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('questions') }));
    yield call(history.push, `${PATH.DYNAMIC_QUESTION}`);
}

function* updateQuestion(action) {
    yield fork(saga.handleAPIRequest, API.updateQuestion, action.payload.data, action.payload.id);
    yield take(ActionTypes.UPDATE_QUESTION_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('questions') }));
    yield call(history.push, `${PATH.DYNAMIC_QUESTION}`);
}

function* fetchQuestions() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let types = [ActionTypes.FETCH_QUESTIONS_REQUEST, ActionTypes.FETCH_QUESTIONS_SUCCESS, ActionTypes.FETCH_QUESTIONS_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_QUESTIONS);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_QUESTIONS);
    yield fork(saga.handleAPIRequest, API.fetchQuestions, { params: { ...tableProps, langId }, types });
    const questionAction = yield take([ActionTypes.FETCH_QUESTIONS_SUCCESS, ActionTypes.FETCH_QUESTIONS_FAILURE]);
    let { passedColumns } = additionalProps;
    let questionTableData = questionAction.payload.data.data.content || [];
    let allFilterValues = getAllFilterOptionValues(passedColumns, questionTableData);
    if (questionAction.type === ActionTypes.FETCH_QUESTIONS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_QUESTIONS, getPayloadData(questionAction.payload, {}));
        // if (_.isEmpty(initialfilterOptions)) {
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_QUESTIONS, initialfilterOptions: allFilterValues }));
        // }
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_QUESTIONS, filterOptionsList: allFilterValues }));

    }
}

function* fetchQuestionValidationTypes() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchQuestionValidationTypes, { langId });
}
function* fetchQuestionTypes() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchQuestionTypes, { langId });
}

function* deleteQuestion(action) {
    yield fork(saga.handleAPIRequest, API.deleteQuestion, action.payload.data);
    yield take(ActionTypes.DELETE_QUESTION_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('questions') }));
    let data = {
        payload: {
            size: action.payload.size,
            page: action.payload.page
        }
    };
    yield call(fetchQuestions, data);
}

function* fetchQuestionById(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchQuestionById, { langId, questionId: action.payload.data });
    // yield take(ActionTypes.FETCH_QUESTION_BY_ID_SUCCESS);
    // yield call(successNotify, 'Question details fetched successfully.');
}

function* fetchCurrentAssociationQuestion(action) {
    yield call(saga.handleAPIRequest, API.fetchCurrentAssociationQuestion, action.payload.id);
}

function* fetchQuestionKeys() {
    yield call(saga.handleAPIRequest, API.fetchQuestionKeys);
}
function* fetchDataSource() {
    yield call(saga.handleAPIRequest, API.fetchDataSource);
}
function* fetchDataSourceByID(action) {
    yield fork(saga.handleAPIRequest, API.fetchDataSourceByID, action.payload.id);

    const responseAction = yield take([ActionTypes.FETCH_DATA_SOURCE_BY_ID_SUCCESS, ActionTypes.FETCH_DATA_SOURCE_BY_ID_FAILURE]);
    if (responseAction.type === ActionTypes.FETCH_DATA_SOURCE_BY_ID_SUCCESS) {
        const { ListDataSourceByID: { data: list = [] }, generateQuestion: { data = {} } } = yield select(getDynamicForms);
        const currentObj = _.find(list, (item) => item.id === data.dataSourceDataId);
        data.dataSourceDataId = currentObj === undefined ? null : currentObj;
        let optionArray = _.get(data, 'option', []);
        _.forEach(optionArray, (option) => {
            let curObj = _.find(list, (item) => item.id === option.dataSourceDataId);
            option.dataSourceDataId = curObj;
        });
        yield put(Actions.setDataSource(data));
    }
}
function* fetchDataSourceByIDForCreate(action) {
    yield fork(saga.handleAPIRequest, API.fetchDataSourceByIDForCreate, action.payload.id);
}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_QUESTION_VALIDATION_TYPES, fetchQuestionValidationTypes),
        takeLatest(ActionTypes.LOAD_QUESTION_LANGUAGES, fetchLanguagesForQuestions),
        takeLatest(ActionTypes.SAVE_QUESTION, saveQuestion),
        takeLatest(ActionTypes.UPDATE_QUESTION, updateQuestion),
        takeLatest(ActionTypes.FETCH_QUESTIONS, fetchQuestions),
        takeLatest(ActionTypes.DELETE_QUESTION, deleteQuestion),
        takeLatest(ActionTypes.FETCH_QUESTION_BY_ID, fetchQuestionById),
        takeLatest(ActionTypes.FETCH_QUESTION_TYPES, fetchQuestionTypes),
        takeLatest(ActionTypes.FETCH_QUESTION_KEYS, fetchQuestionKeys),
        takeLatest(ActionTypes.FETCH_QUESTION_CURRENT_ASSOCIATION, fetchCurrentAssociationQuestion),
        takeLatest(ActionTypes.FETCH_DATA_SOURCE, fetchDataSource),
        takeLatest(ActionTypes.FETCH_DATA_SOURCE_BY_ID, fetchDataSourceByID),
        takeLatest(ActionTypes.FETCH_DATA_SOURCE_BY_ID_CREATE, fetchDataSourceByIDForCreate)
    ]);
}
