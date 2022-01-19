import { takeLatest, all, call, fork, take, select, delay, put } from 'redux-saga/effects';
import { types as ActionTypes } from './actions';
import { saga, history } from '../../common';
import * as API from './api';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { getPayloadData, getAllFilterOptionValues } from '../../utils/ApiUtils';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { TABLE_IDS } from './constants';
import { PATH } from '../../routes';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';
import { I18n } from '../../common/components';


function* listIncident() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_INCIDENT);
    let { passedColumns } = additionalProps;
    let types = [ActionTypes.LIST_INCIDENT_REQUEST, ActionTypes.LIST_INCIDENT_SUCCESS, ActionTypes.LIST_INCIDENT_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_INCIDENT);
    yield fork(saga.handleAPIRequest, API.listIncident, { params: { ...tableProps, langId }, types });
    const action = yield take([ActionTypes.LIST_INCIDENT_SUCCESS, ActionTypes.LIST_INCIDENT_FAILURE]);
    let districtTableData = getPayloadData(action.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, districtTableData.content || []);

    if (action.type === ActionTypes.LIST_INCIDENT_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_INCIDENT, getPayloadData(action.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_INCIDENT, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_INCIDENT, filterOptionsList: allFilterValues }));

    }
}

function* saveIncident(action) {
    yield fork(saga.handleAPIRequest, API.SaveIncident, action.payload.data);
    yield take(ActionTypes.SAVE_INCIDENT_SUCCESS);
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('incident_config') }));
    yield call(history.push, PATH.INCIDENT_CONFIG);

}

function* editIncident(action) {
    yield fork(saga.handleAPIRequest, API.editIncident, action.payload.id, action.payload.data);
    yield take(ActionTypes.EDIT_INCIDENT_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('incident_config') }));
    yield call(history.push, PATH.INCIDENT_CONFIG);

}
function* getServiceCatById(action) {
    yield call(saga.handleAPIRequest, API.getIncidentById, action.payload.id);

}

function* deleteIncident(action) {
    yield fork(saga.handleAPIRequest, API.deleteIncident, action.payload.data);
    yield take(ActionTypes.DELETE_INCIDENT_SUCCESS);
    yield call(successNotify, 'Incident deleted successfully.');
    yield delay(500);
    yield call(listIncident);
}

export default function* IncidentSaga() {
    yield all([
        takeLatest(ActionTypes.LIST_INCIDENT, listIncident),
        takeLatest(ActionTypes.SAVE_INCIDENT, saveIncident),
        takeLatest(ActionTypes.EDIT_INCIDENT, editIncident),
        takeLatest(ActionTypes.GET_INCIDENT_BY_ID, getServiceCatById),
        takeLatest(ActionTypes.DELETE_INCIDENT, deleteIncident)
    ]);
}
