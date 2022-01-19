import { takeLatest, all, call, fork, take, select, delay, put } from 'redux-saga/effects';
import { types as ActionTypes } from './actions';
import { saga, history } from '../../common';
import * as API from './api';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { FILTER_API_PROPS } from '../../common/constants';
import * as Actions from './actions';
import { TABLE_IDS } from './constants';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';

function* listTradingType() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;

    let types = [ActionTypes.LIST_TRADING_TYPE_REQUEST, ActionTypes.LIST_TRADING_TYPE_SUCCESS, ActionTypes.LIST_TRADING_TYPE_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_TRADING_TYPE);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_TRADING_TYPE);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.listTradingType, { params: { ...tableProps, langId }, types });
    const action = yield take([ActionTypes.LIST_TRADING_TYPE_SUCCESS, ActionTypes.LIST_TRADING_TYPE_FAILURE]);
    let stateTableData = getPayloadData(action.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

    if (action.type === ActionTypes.LIST_TRADING_TYPE_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_TRADING_TYPE, getPayloadData(action.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_TRADING_TYPE, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_TRADING_TYPE, filterOptionsList: allFilterValues }));
    }
}

function* listJsonForTradingTypeFilter(action) {
    const { payload: { searchValue, searchKey, columnName } = {} } = action;
    yield fork(saga.handleAPIRequest, API.listJsonForTradingTypeFilter, { ...FILTER_API_PROPS, searchValue, searchKey });
    const filterResponse = yield take(ActionTypes.LIST_JSON_DATA_FOR_TRADING_TYPE_FILTER_SUCCESS);
    yield put(Actions.storeJsonDataForTradingType({ [columnName]: getPayloadData(filterResponse.payload) }));
}

function* sentTradingType(action) {
    yield fork(saga.handleAPIRequest, API.sentTradingType, action.payload.data);
    yield take(ActionTypes.SENT_TRADING_TYPE_SUCCESS);
    yield call(successNotify, 'Trading Type created successfully');
    yield call(history.push, '/admin/index/trading-type');

}

function* editTradingType(action) {
    yield fork(saga.handleAPIRequest, API.editTradingType, action.payload.id, action.payload.data);
    yield take(ActionTypes.EDIT_TRADING_TYPE_SUCCESS);
    yield call(successNotify, 'Trading type updated successfully');
    yield call(history.push, '/admin/index/trading-type');

}
function* getServiceCatById(action) {
    yield call(saga.handleAPIRequest, API.getTradingTypeById, action.payload.id);

}

function* deleteTradingType(action) {
    yield fork(saga.handleAPIRequest, API.deleteTradingType, action.payload.data);
    yield take(ActionTypes.DELETE_TRADING_TYPE_SUCCESS);
    yield call(successNotify, 'TradingType deleted successfully.');
    yield delay(500);
    yield call(listTradingType);
}

export default function* TradingTypeSaga() {
    yield all([
        takeLatest(ActionTypes.LIST_TRADING_TYPE, listTradingType),
        takeLatest(ActionTypes.LIST_JSON_DATA_FOR_TRADING_TYPE_FILTER, listJsonForTradingTypeFilter),
        takeLatest(ActionTypes.SENT_TRADING_TYPE, sentTradingType),
        takeLatest(ActionTypes.EDIT_TRADING_TYPE, editTradingType),
        takeLatest(ActionTypes.GET_TRADING_TYPE_BY_ID, getServiceCatById),
        takeLatest(ActionTypes.DELETE_TRADING_TYPE, deleteTradingType)
    ]);
}
