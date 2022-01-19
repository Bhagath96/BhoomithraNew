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

function* listAdministrationType() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let types = [ActionTypes.LIST_ADMINISTRATION_TYPE_REQUEST, ActionTypes.LIST_ADMINISTRATION_TYPE_SUCCESS, ActionTypes.LIST_ADMINISTRATION_TYPE_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_ADMINISTRATION_TYPE);

    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_ADMINISTRATION_TYPE);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.listAdministrationType, { params: { ...tableProps, langId }, types });

    const action = yield take([ActionTypes.LIST_ADMINISTRATION_TYPE_SUCCESS, ActionTypes.LIST_ADMINISTRATION_TYPE_FAILURE]);
    let stateTableData = getPayloadData(action.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

    if (action.type === ActionTypes.LIST_ADMINISTRATION_TYPE_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_ADMINISTRATION_TYPE, getPayloadData(action.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_ADMINISTRATION_TYPE, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_ADMINISTRATION_TYPE, filterOptionsList: allFilterValues }));
    }
}

function* sentAdministrationType(action) {
    yield fork(saga.handleAPIRequest, API.sentAdministrationType, action.payload.data);
    yield take(ActionTypes.SENT_ADMINISTRATION_TYPE_SUCCESS);
    yield call(successNotify, 'Administration Type created successfully');
    yield call(history.push, '/admin/index/administration-type');

}

function* editAdministrationType(action) {
    yield fork(saga.handleAPIRequest, API.editAdministrationType, action.payload.id, action.payload.data);
    yield take(ActionTypes.EDIT_ADMINISTRATION_TYPE_SUCCESS);
    yield call(successNotify, 'Administration type updated successfully');
    yield call(history.push, '/admin/index/administration-type');

}
function* getServiceCatById(action) {
    yield call(saga.handleAPIRequest, API.getAdministrationTypeById, action.payload.id);

}

function* deleteAdministrationType(action) {
    yield fork(saga.handleAPIRequest, API.deleteAdministrationType, action.payload.data);
    yield take(ActionTypes.DELETE_ADMINISTRATION_TYPE_SUCCESS);
    yield call(successNotify, 'Administration Type deleted successfully.');
    yield delay(500);
    yield call(listAdministrationType);
}

export default function* AdministrationTypeSaga() {
    yield all([
        takeLatest(ActionTypes.LIST_ADMINISTRATION_TYPE, listAdministrationType),
        takeLatest(ActionTypes.SENT_ADMINISTRATION_TYPE, sentAdministrationType),
        takeLatest(ActionTypes.EDIT_ADMINISTRATION_TYPE, editAdministrationType),
        takeLatest(ActionTypes.GET_ADMINISTRATION_TYPE_BY_ID, getServiceCatById),
        takeLatest(ActionTypes.DELETE_ADMINISTRATION_TYPE, deleteAdministrationType)
    ]);
}
