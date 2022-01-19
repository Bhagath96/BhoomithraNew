import { takeLatest, all, call, fork, take, select, put, delay } from 'redux-saga/effects';
import { types as ActionTypes } from './actions';
import { saga, history } from '../../common';
import * as API from './api';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { getDefaultLanguage } from '../common/selectors';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { PATH } from '../../routes';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../common/saga';
import { TABLE_IDS } from './constants';
import { I18n } from '../../common/components';
import { setInitialFilterList, setTableDropdownFilterList } from '../common/actions';

function* listPagableFragment() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let types = [ActionTypes.LIST_FRAGMENT_PAGEBALE_REQUEST, ActionTypes.LIST_FRAGMENT_PAGEBALE_SUCCESS, ActionTypes.LIST_FRAGMENT_PAGEBALE_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_FRAGMENT);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_FRAGMENT);
    yield fork(saga.handleAPIRequest, API.listPagableFragment, { params: { ...tableProps, langId }, types });
    const fragmentAction = yield take([ActionTypes.LIST_FRAGMENT_PAGEBALE_SUCCESS, ActionTypes.LIST_FRAGMENT_PAGEBALE_FAILURE]);
    let { passedColumns } = additionalProps;
    let fragmentTableData = fragmentAction.payload.data.data.content || [];
    let allFilterValues = getAllFilterOptionValues(passedColumns, fragmentTableData);
    if (fragmentAction.type === ActionTypes.LIST_FRAGMENT_PAGEBALE_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_FRAGMENT, getPayloadData(fragmentAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_FRAGMENT, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_FRAGMENT, filterOptionsList: allFilterValues }));

    }
}

function* loadLanguagesForFragments() {
    yield call(saga.handleAPIRequest, API.loadLanguagesForFragments);
}

function* getTitleBasedOnFragmentId(action) {
    yield call(saga.handleAPIRequest, API.getTitleBasedOnFragmentId, action.payload.id);
}
function* getQuestionsBasedOnTitleId(action) {
    const language = yield select(getDefaultLanguage);
    const { id: languageId } = language;
    yield call(saga.handleAPIRequest, API.getQuestionsBasedOnTitleId, action.payload.id, languageId);
}


function* getAllFRagmentsForDropDown() {
    const language = yield select(getDefaultLanguage);
    const { id: languageId } = language;
    yield call(saga.handleAPIRequest, API.getAllFRagmentsForDropDown, languageId);
}

function* loadTitlesForFragments() {
    const titleType = 'dropdown';
    yield call(saga.handleAPIRequest, API.loadTitlesForFragments, titleType);
}

function* editFragmentBasicDetails(action) {
    yield fork(saga.handleAPIRequest, API.editFragmentBasicDetails, action.payload.id, action.payload.fragmentObject);
    yield take(ActionTypes.EDIT_FRAGMENT_BASIC_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('basic_details') }));
}

function* getBasicDetailsOfFragment(action) {

    yield call(saga.handleAPIRequest, API.getBasicDEtailOfFragments, action.payload.id);
}

function* sentFragmentBasicDetails(action) {
    yield fork(saga.handleAPIRequest, API.sentFragmentBasicDetails, action.payload.fragmentArray);
    const responce = yield take(ActionTypes.SENT_FRAGMENT_FOR_POST_SUCCESS);
    const { payload: { data: { data: { fragmentId } } } } = responce;
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('fragment') }));
    yield call(history.push, `${PATH.DYNAMIC_FRAGMENT}/${fragmentId}/details`);
}

function* getTitlesForFragment() {
    yield call(saga.handleAPIRequest, API.getTitlesForFragment);
}

function* getFragmentQLoopById(action) {
    const language = yield select(getDefaultLanguage);
    const { id: languageId } = language;
    yield call(saga.handleAPIRequest, API.getFragmentQLoopById, action.payload.id, languageId);

}

function* deleteFragment(action) {
    yield fork(saga.handleAPIRequest, API.deleteFragment, action.payload.id);
    yield take(ActionTypes.DELETE_FRAGMENT_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('fragment') }));
    yield delay(200);
    let data = {
        payload: {
            size: action.payload.size,
            page: action.payload.page,
            count: action.payload.count
        }
    };
    yield call(listPagableFragment, data);
}

function* getTitleFragmentAssociation(action) {
    const language = yield select(getDefaultLanguage);
    const { id: languageId } = language;
    yield call(saga.handleAPIRequest, API.getTitleFragmentAssociation, action.payload.id, languageId);
}

function* editFragmentTitleAssociation(action) {
    yield fork(saga.handleAPIRequest, API.editFragmentTitleAssociation, action.payload.id, action.payload.titleAssociationObject);
    yield take(ActionTypes.EDIT_FRAGMENT_TITLE_ASSOCIATION_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('title') }));
}
function* updateTitleQuestionFragmentLoop(action) {
    yield fork(saga.handleAPIRequest, API.updateTitleQuestionFragmentLoop, action.payload.id, action.payload.data);
    yield take(ActionTypes.UPDATE_FRAGMENT_QUESTION_TITLE_LOOP_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('fragment_question') }));

}
function* fetchFragmentCurrentAssociation(action) {
    yield call(saga.handleAPIRequest, API.fetchCurrentAssociationData, action.payload.id);
}

export default function* dynamicFormsFragmentSaga() {
    yield all([
        takeLatest(ActionTypes.LIST_FRAGMENT_PAGEBALE, listPagableFragment),
        takeLatest(ActionTypes.LOAD_LANGUAGES_FOR_FRAGMENTS, loadLanguagesForFragments),
        takeLatest(ActionTypes.LOAD_TITLES_FOR_FRAGMENT, loadTitlesForFragments),
        takeLatest(ActionTypes.GET_BASIC_DETAILS_OF_FRAGMENTS, getBasicDetailsOfFragment),
        takeLatest(ActionTypes.EDIT_FRAGMENT_BASIC_DETAILS, editFragmentBasicDetails),
        takeLatest(ActionTypes.SENT_FRAGMENT_FOR_POST, sentFragmentBasicDetails),
        takeLatest(ActionTypes.GET_TITLES_FOR_DROP_DOWN, getTitlesForFragment),
        takeLatest(ActionTypes.EDIT_FRAGMENT_TITLE_ASSOCIATION, editFragmentTitleAssociation),
        takeLatest(ActionTypes.GET_TITLE_FRAGMENT_ASSOCIATION, getTitleFragmentAssociation),
        takeLatest(ActionTypes.DELETE_FRAGMENT, deleteFragment),
        takeLatest(ActionTypes.GET_TITLE_BASED_ON_FRAGMENT_ID, getTitleBasedOnFragmentId),
        takeLatest(ActionTypes.GET_QUESTIONS_BASED_ON_TITLE_ID, getQuestionsBasedOnTitleId),
        takeLatest(ActionTypes.GET_ALL_FRAGMENTS_FOR_DROPDOWN, getAllFRagmentsForDropDown),
        takeLatest(ActionTypes.GET_FRAGMENT_QUESTION_LOOP_BY_ID, getFragmentQLoopById),
        takeLatest(ActionTypes.UPDATE_FRAGMENT_QUESTION_TITLE_LOOP, updateTitleQuestionFragmentLoop),
        takeLatest(ActionTypes.FETCH_CURRENT_ASSOCIATION_FRAGMENT, fetchFragmentCurrentAssociation)
    ]);
}
