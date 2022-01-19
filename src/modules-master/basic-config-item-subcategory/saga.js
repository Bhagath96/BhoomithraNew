import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { saga } from '../../common';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { history } from '../../common';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { I18n } from '../../common/components';
import * as Routes from '../../routes';
import { TABLE_IDS } from './constant';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';

function* fetchItemCategory() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_ITEM_CATEGORY);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_ITEM_CATEGORY);
    let { passedColumns } = additionalProps;
    yield fork(saga.handleAPIRequest, API.fetchItemCategoryDetails, { params: { ...tableProps, langId } });

    const stateAction = yield take([ActionTypes.FETCH_ITEM_SUBCATEGORY_SUCCESS, ActionTypes.FETCH_ITEM_SUBCATEGORY_FAILURE]);
    let stateTableData = getPayloadData(stateAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

    if (stateAction.type === ActionTypes.FETCH_ITEM_SUBCATEGORY_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_ITEM_CATEGORY, getPayloadData(stateAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_ITEM_CATEGORY, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_ITEM_CATEGORY, filterOptionsList: allFilterValues }));
    }
}
function* saveItemCategory(action) {
    yield fork(saga.handleAPIRequest, API.saveItemCategory, action.payload.data);
    const stateAction = yield take([ActionTypes.SAVE_ITEM_SUBCATEGORY_SUCCESS, ActionTypes.SAVE_ITEM_SUBCATEGORY_FAILURE]);
    if (stateAction.type === ActionTypes.SAVE_ITEM_SUBCATEGORY_SUCCESS) {
        yield call(successNotify, I18n.t('save_success', { type: I18n.t('item_category') }));
        yield call(history.push, Routes.PATH.BASIC_CONFIG_ITEM_SUBCATEGORY);
    }

}
function* deleteItemCategory(action) {
    yield fork(saga.handleAPIRequest, API.deleteItemCategory, action.payload.data);
    const stateAction = yield take([ActionTypes.DELETE_ITEM_SUBCATEGORY_SUCCESS, ActionTypes.DELETE_ITEM_SUBCATEGORY_FAILURE]);
    if (stateAction.type === ActionTypes.DELETE_ITEM_SUBCATEGORY_SUCCESS) {
        yield call(successNotify, I18n.t('delete_success', { type: I18n.t('item_category') }));
        yield call(fetchItemCategory);
    }

}
function* fetchItemCategoryById(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchItemCategoryById, { langId, stateID: action.payload.data });
}
function* updateItemCategory(action) {
    yield fork(saga.handleAPIRequest, API.updateItemCategory, action.payload.data, action.payload.id);
    const stateAction = yield take([ActionTypes.UPDATE_ITEM_SUBCATEGORY_SUCCESS, ActionTypes.UPDATE_ITEM_SUBCATEGORY_FAILURE]);
    if (stateAction.type === ActionTypes.UPDATE_ITEM_SUBCATEGORY_SUCCESS) {
        yield call(successNotify, I18n.t('update_success', { type: I18n.t('item_category') }));
        yield call(history.push, Routes.PATH.BASIC_CONFIG_ITEM_SUBCATEGORY);
    }

}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_ITEM_SUBCATEGORY, fetchItemCategory),
        takeLatest(ActionTypes.SAVE_ITEM_SUBCATEGORY, saveItemCategory),
        takeLatest(ActionTypes.DELETE_ITEM_SUBCATEGORY, deleteItemCategory),
        takeLatest(ActionTypes.FETCH_ITEM_SUBCATEGORY_BY_ID, fetchItemCategoryById),
        takeLatest(ActionTypes.UPDATE_ITEM_SUBCATEGORY, updateItemCategory)
    ]);
}

