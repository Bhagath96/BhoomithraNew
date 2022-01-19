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

function* listServiceConfig() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let types = [ActionTypes.LIST_SERVICE_CONFIG_REQUEST, ActionTypes.LIST_SERVICE_CONFIG_SUCCESS, ActionTypes.LIST_SERVICE_CONFIG_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_SERVICE_CONFIG);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_SERVICE_CONFIG);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.listServiceConfig, { params: { ...tableProps, langId }, types });

    const action = yield take([ActionTypes.LIST_SERVICE_CONFIG_SUCCESS, ActionTypes.LIST_SERVICE_CONFIG_FAILURE]);
    let tableData = getPayloadData(action.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, tableData.content || []);

    if (action.type === ActionTypes.LIST_SERVICE_CONFIG_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_SERVICE_CONFIG, getPayloadData(action.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_SERVICE_CONFIG, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_SERVICE_CONFIG, filterOptionsList: allFilterValues }));
    }
}

function* sentServiceConfig(action) {
    yield fork(saga.handleAPIRequest, API.sentServiceConfig, action.payload.data);
    yield take(ActionTypes.SENT_SERVICE_CONFIG_SUCCESS);
    yield call(successNotify, 'ServiceConfig Type created successfully');
    yield call(history.push, '/admin/index/service-config');

}

function* editServiceConfig(action) {
    yield fork(saga.handleAPIRequest, API.editServiceConfig, action.payload.id, action.payload.data);
    yield take(ActionTypes.EDIT_SERVICE_CONFIG_SUCCESS);
    yield call(successNotify, 'ServiceConfig updated successfully');
    yield call(history.push, '/admin/index/service-config');

}
function* getServiceCatById(action) {
    yield call(saga.handleAPIRequest, API.getServiceConfigById, action.payload.id);

}

function* deleteServiceConfig(action) {
    yield fork(saga.handleAPIRequest, API.deleteServiceConfig, action.payload.data);
    yield take(ActionTypes.DELETE_SERVICE_CONFIG_SUCCESS);
    yield call(successNotify, 'ServiceConfig deleted successfully.');
    yield delay(500);
    yield call(listServiceConfig);
}

export default function* ServiceConfigSaga() {
    yield all([
        takeLatest(ActionTypes.LIST_SERVICE_CONFIG, listServiceConfig),
        takeLatest(ActionTypes.SENT_SERVICE_CONFIG, sentServiceConfig),
        takeLatest(ActionTypes.EDIT_SERVICE_CONFIG, editServiceConfig),
        takeLatest(ActionTypes.GET_SERVICE_CONFIG_BY_ID, getServiceCatById),
        takeLatest(ActionTypes.DELETE_SERVICE_CONFIG, deleteServiceConfig)
    ]);
}
