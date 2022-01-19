import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { saga } from '../../common';
import { getDefaultLanguage } from '../common/selectors';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { TABLE_IDS } from './constant';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../common/actions';

function* fetchStockInDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_RRF_STOCK_IN);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_RRF_STOCK_IN);
    let { passedColumns } = additionalProps;
    yield fork(saga.handleAPIRequest, API.fetchStockInDetails, { params: { ...tableProps, langId } });
    const stateAction = yield take([ActionTypes.FETCH_RRF_STOCK_IN_DETAILS_SUCCESS, ActionTypes.FETCH_RRF_STOCK_IN_DETAILS_FAILURE]);
    let stateTableData = getPayloadData(stateAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

    if (stateAction.type === ActionTypes.FETCH_RRF_STOCK_IN_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_RRF_STOCK_IN, getPayloadData(stateAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_RRF_STOCK_IN, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_RRF_STOCK_IN, filterOptionsList: allFilterValues }));
    }
}

function* fetchRRFShredded() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_RRF_SHREDDED);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_RRF_SHREDDED);
    let { passedColumns } = additionalProps;
    yield fork(saga.handleAPIRequest, API.fetchRRFShredded, { params: { ...tableProps, langId } });
    const stateAction = yield take([ActionTypes.FETCH_RRF_SHREDDED_SUCCESS, ActionTypes.FETCH_RRF_SHREDDED_FAILURE]);
    let stateTableData = getPayloadData(stateAction.payload, {});

    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

    if (stateAction.type === ActionTypes.FETCH_RRF_SHREDDED_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_RRF_SHREDDED, getPayloadData(stateAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_RRF_SHREDDED, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_RRF_SHREDDED, filterOptionsList: allFilterValues }));
    }
}


function* fetchSalesDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_RRF_SALES);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_RRF_SALES);
    let { passedColumns } = additionalProps;
    yield fork(saga.handleAPIRequest, API.fetchRRFSalesDetails, { params: { ...tableProps, langId } });
    const stateAction = yield take([ActionTypes.FETCH_RRF_SALES_DETAILS_SUCCESS, ActionTypes.FETCH_RRF_SALES_DETAILS_FAILURE]);
    let stateTableData = getPayloadData(stateAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

    if (stateAction.type === ActionTypes.FETCH_RRF_SALES_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_RRF_SALES, getPayloadData(stateAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_RRF_SALES, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_RRF_SALES, filterOptionsList: allFilterValues }));
    }
}
function* fetchRRFItems(action) {
    const language = yield select(getDefaultLanguage);
    const { id, type } = action.payload.data;
    const { id: langId } = language;
    yield fork(saga.handleAPIRequest, API.fetchRRFItems, { params: { type, langId }, id });

}
export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_RRF_STOCK_IN_DETAILS, fetchStockInDetails),
        takeLatest(ActionTypes.FETCH_RRF_SALES_DETAILS, fetchSalesDetails),
        takeLatest(ActionTypes.FETCH_RRF_ITEMS, fetchRRFItems),
        takeLatest(ActionTypes.FETCH_RRF_SHREDDED, fetchRRFShredded)


    ]);
}

