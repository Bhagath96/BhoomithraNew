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

function* listServiceChargeSlab() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_SERVICE_CHARGE_SLAB);
    let { passedColumns } = additionalProps;
    let types = [ActionTypes.LIST_SERVICE_CHARGE_SLAB_REQUEST, ActionTypes.LIST_SERVICE_CHARGE_SLAB_SUCCESS, ActionTypes.LIST_SERVICE_CHARGE_SLAB_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_SERVICE_CHARGE_SLAB);
    yield fork(saga.handleAPIRequest, API.listServiceChargeSlab, { params: { ...tableProps, langId }, types });
    const action = yield take([ActionTypes.LIST_SERVICE_CHARGE_SLAB_SUCCESS, ActionTypes.LIST_SERVICE_CHARGE_SLAB_FAILURE]);
    let serviceChargeSlabTableData = getPayloadData(action.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, serviceChargeSlabTableData.content || []);

    if (action.type === ActionTypes.LIST_SERVICE_CHARGE_SLAB_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_SERVICE_CHARGE_SLAB, getPayloadData(action.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_SERVICE_CHARGE_SLAB, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_SERVICE_CHARGE_SLAB, filterOptionsList: allFilterValues }));

    }
}

function* sentServiceChargeSlab(action) {
    yield fork(saga.handleAPIRequest, API.sentServiceChargeSlab, action.payload.data);
    yield take(ActionTypes.SENT_SERVICE_CHARGE_SLAB_SUCCESS);
    yield call(successNotify, 'Service Charge Slab created successfully');
    yield call(history.push, '/admin/index/service-charge-slab');

}

function* editServiceChargeSlab(action) {
    yield fork(saga.handleAPIRequest, API.editServiceChargeSlab, action.payload.id, action.payload.data);
    yield take(ActionTypes.EDIT_SERVICE_CHARGE_SLAB_SUCCESS);
    yield call(successNotify, 'Service Charge Slab updated successfully');
    yield call(history.push, '/admin/index/service-charge-slab');

}
function* getServiceCatById(action) {
    yield call(saga.handleAPIRequest, API.getServiceChargeSlabById, action.payload.id);

}

function* deleteServiceChargeSlab(action) {
    yield fork(saga.handleAPIRequest, API.deleteServiceChargeSlab, action.payload.data);
    yield take(ActionTypes.DELETE_SERVICE_CHARGE_SLAB_SUCCESS);
    yield call(successNotify, 'Service Charge Slab deleted successfully.');
    yield delay(500);
    yield call(listServiceChargeSlab, {
        payload: {
            size: action.payload.size,
            page: action.payload.page,
            count: action.payload.count
        }
    });
}

export default function* ServiceChargeSlabSaga() {
    yield all([
        takeLatest(ActionTypes.LIST_SERVICE_CHARGE_SLAB, listServiceChargeSlab),
        takeLatest(ActionTypes.SENT_SERVICE_CHARGE_SLAB, sentServiceChargeSlab),
        takeLatest(ActionTypes.EDIT_SERVICE_CHARGE_SLAB, editServiceChargeSlab),
        takeLatest(ActionTypes.GET_SERVICE_CHARGE_SLAB_BY_ID, getServiceCatById),
        takeLatest(ActionTypes.DELETE_SERVICE_CHARGE_SLAB, deleteServiceChargeSlab)
    ]);
}
