import { takeLatest, all, call, fork, take, select, put } from 'redux-saga/effects';
import { types as ActionTypes } from './actions';
import { saga, history } from '../../common';
import * as API from './api';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { getDefaultLanguage } from '../common/selectors';
import { OPTION_QUESTION_ID } from './constants';
import { DEFAULT_TABLE_PROPS } from '../../common/constants';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { I18n } from '../../common/components';
import { PATH } from '../../routes';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../common/saga';
import { TABLE_IDS } from './constants';
import { setInitialFilterList, setTableDropdownFilterList } from '../common/actions';

function* fetchLanguagesForTitle() {
    yield call(saga.handleAPIRequest, API.fetchLanguagesForTitle);
}


function* listTitle() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let types = [ActionTypes.LIST_TITLE_PAGEBALE_REQUEST, ActionTypes.LIST_TITLE_PAGEBALE_SUCCESS, ActionTypes.LIST_TITLE_PAGEBALE_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_TITLE);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_TITLE);
    yield fork(saga.handleAPIRequest, API.listTitle, { params: { ...tableProps, langId }, types });
    const titleAction = yield take([ActionTypes.LIST_TITLE_PAGEBALE_SUCCESS, ActionTypes.LIST_TITLE_PAGEBALE_FAILURE]);
    let { passedColumns } = additionalProps;
    let titleTableData = titleAction.payload.data.data.content || [];
    let allFilterValues = getAllFilterOptionValues(passedColumns, titleTableData);
    if (titleAction.type === ActionTypes.LIST_TITLE_PAGEBALE_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_TITLE, getPayloadData(titleAction.payload, {}));
        // if (_.isEmpty(initialfilterOptions)) {
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_TITLE, initialfilterOptions: allFilterValues }));
        // }
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_TITLE, filterOptionsList: allFilterValues }));

    }
}

function* fetchInitialListTitles() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const types = [ActionTypes.FETCH_TITLE_WITH_RESETTED_PAGINATION_REQUEST, ActionTypes.FETCH_TITLE_WITH_RESETTED_PAGINATION_SUCCESS, ActionTypes.FETCH_TITLE_WITH_RESETTED_PAGINATION_FAILURE];
    let data = {
        page: DEFAULT_TABLE_PROPS.pageNo,
        size: DEFAULT_TABLE_PROPS.pageSize,
        langId
    };
    yield call(saga.handleAPIRequest, API.listTitle, { data, types });
}


function* deleteTitle(action) {
    yield fork(saga.handleAPIRequest, API.deleteTitle, action.payload.id);
    yield take(ActionTypes.DELETE_TITLE_SUCCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('title') }));
    // const { titleModule } = yield select(getCommon);
    let data = {
        payload: {
            size: action.payload.size,
            page: action.payload.page,
            count: action.payload.count
        }
    };
    yield call(listTitle, data);
}

function* getLabelsWithId(action) {
    yield call(saga.handleAPIRequest, API.getLabelsWithId, action.payload.id);
}

function* sentQuestionValidation(action) {
    yield fork(saga.handleAPIRequest, API.sentQuestionValidation, action.payload.id, action.payload.validationObject);
}

function* getQuestionForTitle(action) {
    const language = yield select(getDefaultLanguage);
    const { id: languageId } = language;
    yield call(saga.handleAPIRequest, API.getQuestionForTitle, action.payload.id, languageId);
}

function* getQuestionValidationForTitle() {

    yield call(saga.handleAPIRequest, API.getQuestionValidationForTitle);
}

function* getQuestionValidation(action) {
    const language = yield select(getDefaultLanguage);
    const { id: languageId } = language;
    yield call(saga.handleAPIRequest, API.getQuestionValidation, action.payload.id, languageId);
    yield take(ActionTypes.SENT_QUESTION_VALIDATION_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('question_validation') }));
}

function* sentLabelsForEDit(action) {
    yield fork(saga.handleAPIRequest, API.sentLabelsForEDit, action.payload.id, action.payload.data);
    yield take(ActionTypes.SENT_LABELS_FOR_EDIT_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('label') }));

}

function* sentQuestionOptionForEdit(action) {
    yield fork(saga.handleAPIRequest, API.sentQuestionOptionForEdit, action.payload.id, action.payload.questionOptionObject);
    yield take(ActionTypes.SENT_QUESTION_OPTION_FOR_EDIT_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('question_option') }));

}

function* sentLabelForTitle(action) {
    yield fork(saga.handleAPIRequest, API.sentLabelForTitle, action.payload.data);
    const responce = yield take(ActionTypes.SENT_LABEL_FOR_TITLE_SUCCESS);
    const { payload: { data: { data: { id } } } } = responce;
    yield call(successNotify, I18n.t('added_success', { type: I18n.t('question_option') }));
    yield call(history.push, `${PATH.DYNAMIC_TITLE}/${id}/details`);
}

function* loadQuestionsForTitle(action) {
    const language = yield select(getDefaultLanguage);
    const { id: languageId } = language;
    yield fork(saga.handleAPIRequest, API.listQuestionForTitle, languageId, action.payload.questionType);
}

function* getQuestionOptionValidation(action) {
    const language = yield select(getDefaultLanguage);
    const { id: languageId } = language;
    yield fork(saga.handleAPIRequest, API.getQuestionOptionValidation, action.payload.id, languageId);

}

function* getOptionWithQuestionId(action) {
    const language = yield select(getDefaultLanguage);
    const { id: languageId } = language;
    yield fork(saga.handleAPIRequest, API.getOptionWithQuestionId, action.payload.id, languageId);
}

function* getTitleQuestions(action) {
    const language = yield select(getDefaultLanguage);
    const { id: languageId } = language;
    yield fork(saga.handleAPIRequest, API.getTitleQuestions, languageId, action.payload.id, action.payload.type);

}

function* sentQuestionWithSortOrder(action) {
    const language = yield select(getDefaultLanguage);
    const { id: languageId } = language;
    yield fork(saga.handleAPIRequest, API.sentQuestionAndSortOrder, action.payload.titleId, action.payload.questionArray, languageId);
    yield take(ActionTypes.SENT_QUESTION_WITH_SORT_ORDER_SUCCESS);
    yield call(successNotify, I18n.t('added_success', { type: I18n.t('questions') }));

}

function* getOptionQuestions(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.getOptionQuestions, { langId, type: 'dropdown', typeId: OPTION_QUESTION_ID }, action.payload.id);
}

function* fetchTitleCurrentLocationData(action) {
    yield call(saga.handleAPIRequest, API.fetchCurrentAssociation, action.payload.id);
}


export default function* dynamicFormsTitleSaga() {
    yield all([
        takeLatest(ActionTypes.LOAD_LANGUAGES_FOR_TITLE, fetchLanguagesForTitle),
        takeLatest(ActionTypes.SENT_LABEL_FOR_TITLE, sentLabelForTitle),
        takeLatest(ActionTypes.LIST_QUESTION_TYPE, loadQuestionsForTitle),
        takeLatest(ActionTypes.SENT_QUESTION_WITH_SORT_ORDER, sentQuestionWithSortOrder),
        takeLatest(ActionTypes.LIST_TITLE_PAGEBALE, listTitle),
        takeLatest(ActionTypes.DELETE_TITLE, deleteTitle),
        takeLatest(ActionTypes.GET_LABELS_WITH_ID, getLabelsWithId),
        takeLatest(ActionTypes.SENT_LABELS_FOR_EDIT, sentLabelsForEDit),
        takeLatest(ActionTypes.GET_QUESTIONS_FOR_TITLE, getQuestionForTitle),
        takeLatest(ActionTypes.GET_QUESTION_VALIDATION_TYPE, getQuestionValidationForTitle),
        takeLatest(ActionTypes.SENT_QUESTION_VALIDATION, sentQuestionValidation),
        takeLatest(ActionTypes.GET_QUESTION_VALIDATION, getQuestionValidation),
        takeLatest(ActionTypes.GET_OPTION_WITH_QUESTION_ID, getOptionWithQuestionId),
        takeLatest(ActionTypes.SENT_QUESTION_OPTION_FOR_EDIT, sentQuestionOptionForEdit),
        takeLatest(ActionTypes.GET_QUESTION_OPTION_VALIDATION, getQuestionOptionValidation),
        takeLatest(ActionTypes.GET_OPTION_QUESTIONS, getOptionQuestions),
        takeLatest(ActionTypes.GET_TITLE_QUESTION_ONLY, getTitleQuestions),
        takeLatest(ActionTypes.FETCH_TITLE_WITH_RESETTED_PAGINATION, fetchInitialListTitles),
        takeLatest(ActionTypes.FETCH_TITLE_CURRENT_ASSOCIATION, fetchTitleCurrentLocationData)
    ]);
}
