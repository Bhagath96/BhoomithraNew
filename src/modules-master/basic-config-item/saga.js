import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { saga } from '../../common';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { history } from '../../../src/common';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { I18n } from '../../common/components';
import * as Routes from '../../routes';
import { TABLE_IDS } from './constant';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';

function* fetchItemDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;

    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_ITEM);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_ITEM);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.fetchItemDetails, { params: { ...tableProps, langId } });

    const stateAction = yield take([ActionTypes.FETCH_ITEM_DETAILS_SUCCESS, ActionTypes.FETCH_ITEM_DETAILS_FAILURE]);
    let stateTableData = getPayloadData(stateAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

    if (stateAction.type === ActionTypes.FETCH_ITEM_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_ITEM, getPayloadData(stateAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_ITEM, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_ITEM, filterOptionsList: allFilterValues }));
    }
}
function* saveItem(action) {
    yield fork(saga.handleAPIRequest, API.saveItem, action.payload.data);
    yield take(ActionTypes.SAVE_ITEM_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('item') }));
    yield call(history.push, Routes.PATH.BASIC_CONFIG_ITEM);
}
function* deleteItem(action) {
    yield fork(saga.handleAPIRequest, API.deleteItem, action.payload.data);
    yield take(ActionTypes.DELETE_ITEM_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('item') }));
    yield call(fetchItemDetails);
}
function* fetchItemById(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchItemById, { langId, stateID: action.payload.data });
}
function* updateItemData(action) {
    yield fork(saga.handleAPIRequest, API.updateItem, action.payload.data, action.payload.id);
    yield take(ActionTypes.UPDATE_ITEM_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('item') }));
    yield call(history.push, Routes.PATH.BASIC_CONFIG_ITEM);
}
//fetch sub category item details
function* fetchSubCategoryItems() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchSubCategoryItems, { langId });
}
//fetch sub category item by id details
function* fetchSubCategoryItemsById(action) {
    yield call(saga.handleAPIRequest, API.fetchSubCategoryItemsById, { id: action.payload.id });
}
//save sub category item details
function* saveSubCategoryItems(action) {
    yield fork(saga.handleAPIRequest, API.saveSubCategoryItems, { id: action.payload.id, itemSubCatId: action.payload.itemSubCatId });
    yield take(ActionTypes.SAVE_SUB_CATEGORY_ITEM_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('sub_category') }));
    yield call(fetchSubCategoryItemsById, action);
}
//delete sub category item details
function* deleteItemSubCategoryById(action) {
    yield fork(saga.handleAPIRequest, API.deleteItemSubCategoryById, { id: action.payload.id, itemSubCategoryId: action.payload.itemSubCategoryId });
    yield take(ActionTypes.DELETE_SUB_CATEGORY_ITEM_BY_ID_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('sub_category') }));
    yield call(fetchSubCategoryItemsById, action);
}


export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_ITEM_DETAILS, fetchItemDetails),
        takeLatest(ActionTypes.SAVE_ITEM_DETAILS, saveItem),
        takeLatest(ActionTypes.DELETE_ITEM_DETAILS, deleteItem),
        takeLatest(ActionTypes.FETCH_ITEM_DETAILS_BY_ID, fetchItemById),
        takeLatest(ActionTypes.UPDATE_ITEM_DETAILS, updateItemData),
        //fetch sub category item details
        takeLatest(ActionTypes.FETCH_SUB_CATEGORY_ITEM_DETAILS, fetchSubCategoryItems),
        //save sub category item details
        takeLatest(ActionTypes.SAVE_SUB_CATEGORY_ITEM_DETAILS, saveSubCategoryItems),
        //fetch sub category item by id details
        takeLatest(ActionTypes.FETCH_SUB_CATEGORY_ITEM_BY_ID_DETAILS, fetchSubCategoryItemsById),
        //delete sub category item by id details
        takeLatest(ActionTypes.DELETE_SUB_CATEGORY_ITEM_BY_ID_DETAILS, deleteItemSubCategoryById)
    ]);
}

