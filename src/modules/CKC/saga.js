import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { saga } from '../../common';
import { getDefaultLanguage } from '../common/selectors';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { TABLE_IDS } from './constant';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../common/actions';

function* fetchPickupDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_CKC_PICKUP);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_CKC_PICKUP);
    let { passedColumns } = additionalProps;
    yield fork(saga.handleAPIRequest, API.fetchPickupDetails, { params: { ...tableProps, langId } });
    const stateAction = yield take([ActionTypes.FETCH_CKC_PICKUP_DETAILS_SUCCESS, ActionTypes.FETCH_CKC_PICKUP_DETAILS_FAILURE]);
    let stateTableData = getPayloadData(stateAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

    if (stateAction.type === ActionTypes.FETCH_CKC_PICKUP_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_CKC_PICKUP, getPayloadData(stateAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_CKC_PICKUP, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_CKC_PICKUP, filterOptionsList: allFilterValues }));
    }
}
function* fetchSalesDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_CKC_SALES);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_CKC_SALES);
    let { passedColumns } = additionalProps;
    yield fork(saga.handleAPIRequest, API.fetchCKCSalesDetails, { params: { ...tableProps, langId } });
    const stateAction = yield take([ActionTypes.FETCH_CKC_SALES_DETAILS_SUCCESS, ActionTypes.FETCH_CKC_SALES_DETAILS_FAILURE]);
    let stateTableData = getPayloadData(stateAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

    if (stateAction.type === ActionTypes.FETCH_CKC_SALES_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_CKC_SALES, getPayloadData(stateAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_CKC_SALES, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_CKC_SALES, filterOptionsList: allFilterValues }));
    }
}

function* fetchCKCItems(action) {
    const language = yield select(getDefaultLanguage);
    const { id, type } = action.payload.data;
    const { id: langId } = language;
    yield fork(saga.handleAPIRequest, API.fetchCKCItems, { params: { type, langId }, id });

}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_CKC_PICKUP_DETAILS, fetchPickupDetails),
        takeLatest(ActionTypes.FETCH_CKC_SALES_DETAILS, fetchSalesDetails),
        takeLatest(ActionTypes.FETCH_CKC_ITEMS, fetchCKCItems)
    ]);
}

