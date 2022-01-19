import { takeLatest, all, call, fork, take, select, delay, put } from 'redux-saga/effects';
import { types as ActionTypes } from './actions';
import { saga, history } from '../../common';
import * as API from './api';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { TABLE_IDS } from './constants';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';

function* listResidenceCategory() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let types = [ActionTypes.LIST_RESIDENCE_CATEGORY_REQUEST, ActionTypes.LIST_RESIDENCE_CATEGORY_SUCCESS, ActionTypes.LIST_RESIDENCE_CATEGORY_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_RESIDENCE_CATEGORY);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_RESIDENCE_CATEGORY);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.listResidenceCategory, { params: { ...tableProps, langId }, types });
    const action = yield take([ActionTypes.LIST_RESIDENCE_CATEGORY_SUCCESS, ActionTypes.LIST_RESIDENCE_CATEGORY_FAILURE]);
    let tableData = getPayloadData(action.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, tableData.content || []);

    if (action.type === ActionTypes.LIST_RESIDENCE_CATEGORY_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_RESIDENCE_CATEGORY, getPayloadData(action.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_RESIDENCE_CATEGORY, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_RESIDENCE_CATEGORY, filterOptionsList: allFilterValues }));
    }
}

function* sentResidenceCategory(action) {
    yield fork(saga.handleAPIRequest, API.sentResidenceCategory, action.payload.data);
    yield take(ActionTypes.SENT_RESIDENCE_CATEGORY_SUCCESS);
    yield call(successNotify, 'Residence Category created successfully');
    yield call(history.push, '/admin/index/residence-category');

}

function* editResidenceCategory(action) {
    yield fork(saga.handleAPIRequest, API.editResidenceCategory, action.payload.id, action.payload.data);
    yield take(ActionTypes.EDIT_RESIDENCE_CATEGORY_SUCCESS);
    yield call(successNotify, 'Residence Category created successfully');
    yield call(history.push, '/admin/index/residence-category');

}
function* getResidenceCatById(action) {
    yield call(saga.handleAPIRequest, API.getResidenceCatById, action.payload.id);

}

function* deleteResidenceCategory(action) {
    yield fork(saga.handleAPIRequest, API.deleteResidenceCategory, action.payload.data);
    yield take(ActionTypes.DELETE_RESIDENCE_CATEGORY_SUCCESS);
    yield call(successNotify, 'Residence Category deleted successfully.');
    yield delay(500);
    yield call(listResidenceCategory);
}

export default function* residenceCategorySaga() {
    yield all([
        takeLatest(ActionTypes.LIST_RESIDENCE_CATEGORY, listResidenceCategory),
        takeLatest(ActionTypes.SENT_RESIDENCE_CATEGORY, sentResidenceCategory),
        takeLatest(ActionTypes.EDIT_RESIDENCE_CATEGORY, editResidenceCategory),
        takeLatest(ActionTypes.GET_RESIDENCE_CATEGORY_BY_ID, getResidenceCatById),
        takeLatest(ActionTypes.DELETE_RESIDENCE_CATEGORY, deleteResidenceCategory)
    ]);
}
