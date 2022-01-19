import { takeLatest, all, call, fork, take, select, delay, put } from 'redux-saga/effects';
import { types as ActionTypes } from './actions';
import { saga, history } from '../../common';
import * as API from './api';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { getPayloadData, getAllFilterOptionValues } from '../../utils/ApiUtils';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { TABLE_IDS } from './constants';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';

function* listTerraceFarming() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_TERRACE_FARMING);
    let { passedColumns } = additionalProps;

    let types = [ActionTypes.LIST_TERRACE_FARMING_REQUEST, ActionTypes.LIST_TERRACE_FARMING_SUCCESS, ActionTypes.LIST_TERRACE_FARMING_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_TERRACE_FARMING);
    yield fork(saga.handleAPIRequest, API.listTerraceFarming, { params: { ...tableProps, langId }, types });
    const action = yield take([ActionTypes.LIST_TERRACE_FARMING_SUCCESS, ActionTypes.LIST_TERRACE_FARMING_FAILURE]);
    let terraceFarmingTableData = getPayloadData(action.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, terraceFarmingTableData.content || []);

    if (action.type === ActionTypes.LIST_TERRACE_FARMING_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_TERRACE_FARMING, getPayloadData(action.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_TERRACE_FARMING, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_TERRACE_FARMING, filterOptionsList: allFilterValues }));

    }
}

function* sentTerraceFarming(action) {
    yield fork(saga.handleAPIRequest, API.sentTerraceFarming, action.payload.data);
    yield take(ActionTypes.SENT_TERRACE_FARMING_SUCCESS);
    yield call(successNotify, 'Terrace farming Type created successfully');
    yield call(history.push, '/admin/index/terrace-farming');

}

function* editTerraceFarming(action) {
    yield fork(saga.handleAPIRequest, API.editTerraceFarming, action.payload.id, action.payload.data);
    yield take(ActionTypes.EDIT_TERRACE_FARMING_SUCCESS);
    yield call(successNotify, 'Terrace Farming type updated successfully');
    yield call(history.push, '/admin/index/terrace-farming');

}
function* getServiceCatById(action) {
    yield call(saga.handleAPIRequest, API.getTerraceFarmingById, action.payload.id);

}

function* deleteTerraceFarming(action) {
    yield fork(saga.handleAPIRequest, API.deleteTerraceFarming, action.payload.data);
    yield take(ActionTypes.DELETE_TERRACE_FARMING_SUCCESS);
    yield call(successNotify, 'Terrace Farming deleted successfully.');
    yield delay(500);
    yield call(listTerraceFarming);
}

export default function* TerraceFarmingSaga() {
    yield all([
        takeLatest(ActionTypes.LIST_TERRACE_FARMING, listTerraceFarming),
        takeLatest(ActionTypes.SENT_TERRACE_FARMING, sentTerraceFarming),
        takeLatest(ActionTypes.EDIT_TERRACE_FARMING, editTerraceFarming),
        takeLatest(ActionTypes.GET_TERRACE_FARMING_BY_ID, getServiceCatById),
        takeLatest(ActionTypes.DELETE_TERRACE_FARMING, deleteTerraceFarming)
    ]);
}
