import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { saga } from '../../common';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';

import { TABLE_IDS } from './constant';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';

function* fetchStockInDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;

    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_STOCK_IN);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_STOCK_IN);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.fetchMcfStocksIn, { params: { ...tableProps, langId } });

    const stockInAction = yield take([ActionTypes.FETCH_STOCK_IN_DETAILS_SUCCESS, ActionTypes.FETCH_STOCK_IN_DETAILS_FAILURE]);
    let stateTableData = getPayloadData(stockInAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

    if (stockInAction.type === ActionTypes.FETCH_STOCK_IN_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_STOCK_IN, getPayloadData(stockInAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_STOCK_IN, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_STOCK_IN, filterOptionsList: allFilterValues }));
    }
}

function* fetchStockTransferDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;

    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_STOCK_TRANSFER);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_STOCK_TRANSFER);
    let { passedColumns } = additionalProps;
    yield fork(saga.handleAPIRequest, API.fetchMcfStocksTransfer, { params: { ...tableProps, langId } });

    const stockTransferAction = yield take([ActionTypes.FETCH_STOCK_TRANSFER_SUCCESS, ActionTypes.FETCH_STOCK_TRANSFER_FAILURE]);
    let stateTableData = getPayloadData(stockTransferAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

    if (stockTransferAction.type === ActionTypes.FETCH_STOCK_TRANSFER_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_STOCK_TRANSFER, getPayloadData(stockTransferAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_STOCK_TRANSFER, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_STOCK_TRANSFER, filterOptionsList: allFilterValues }));
    }
}

function* fetchStockSaleDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;

    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_STOCK_SALE);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_STOCK_SALE);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.fetchStateDetails, { params: { ...tableProps, langId } });

    const stockSaleAction = yield take([ActionTypes.FETCH_STOCK_SALE_SUCCESS, ActionTypes.FETCH_STOCK_SALE_FAILURE]);
    let stateTableData = getPayloadData(stockSaleAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

    if (stockSaleAction.type === ActionTypes.FETCH_STOCK_SALE_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_STOCK_SALE, getPayloadData(stockSaleAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_STOCK_SALE, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_STOCK_SALE, filterOptionsList: allFilterValues }));
    }
}

function* fetchStockItems(action) {
    const language = yield select(getDefaultLanguage);
    const { id, type } = action.payload.data;
    const { id: langId } = language;
    yield fork(saga.handleAPIRequest, API.fetchStockItems, { params: { type, langId }, id });

}

// function* fetchMcfSeggregation(action) {
//     const language = yield select(getDefaultLanguage);
//     const { id, type } = action.payload.data;
//     const { id: langId } = language;
//     yield fork(saga.handleAPIRequest, API.fetchMcfSeggregation, { params: { type, langId }, id });

// }

function* fetchMcfSeggregation() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;

    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_MCF_SEGGREGATION);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_MCF_SEGGREGATION);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.fetchMcfSeggregation, { params: { ...tableProps, langId } });

    const stockInAction = yield take([ActionTypes.FETCH_MCF_SEGGRATION_SUCCESS, ActionTypes.FETCH_MCF_SEGGRATION_FAILURE]);
    let stateTableData = getPayloadData(stockInAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);
    if (stockInAction.type === ActionTypes.FETCH_MCF_SEGGRATION_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_MCF_SEGGREGATION, getPayloadData(stockInAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_MCF_SEGGREGATION, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_MCF_SEGGREGATION, filterOptionsList: allFilterValues }));
    }
}


export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_STOCK_IN_DETAILS, fetchStockInDetails),
        takeLatest(ActionTypes.FETCH_STOCK_TRANSFER_DETAILS, fetchStockTransferDetails),
        takeLatest(ActionTypes.FETCH_STOCK_SALE_DETAILS, fetchStockSaleDetails),
        takeLatest(ActionTypes.FETCH_STOCK_ITEMS, fetchStockItems),
        takeLatest(ActionTypes.FETCH_MCF_SEGGRATION, fetchMcfSeggregation)


    ]);
}

