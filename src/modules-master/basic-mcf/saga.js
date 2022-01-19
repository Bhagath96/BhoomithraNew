import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { saga } from '../../common';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { history } from '../../../src/common';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { I18n } from '../../common/components';
import * as Routes from '../../routes';
import { TABLE_IDS } from './constant';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';

function* fetchMCF() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_MCF);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_MCF);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.fetchMCF, { params: { ...tableProps, langId } });

    const action = yield take([ActionTypes.FETCH_MCF_SUCCESS, ActionTypes.FETCH_MCF_FAILURE]);
    let tableData = getPayloadData(action.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, tableData.content || []);

    if (action.type === ActionTypes.FETCH_MCF_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_MCF, getPayloadData(action.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_MCF, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_MCF, filterOptionsList: allFilterValues }));
    }
}
function* fetchAllState() {
    yield call(saga.handleAPIRequest, API.fetchAllState);
}
function* fetchAllDistrict(action) {
    yield call(saga.handleAPIRequest, API.fetchAllDistrict, {
        stateId: action.payload.data
    });
}
function* fetchAllLsgi(action) {
    yield call(saga.handleAPIRequest, API.listAllLsgi, {
        districtId: action.payload.data
    });
}
function* fetchAllWard(action) {
    yield call(saga.handleAPIRequest, API.listAllWard, {
        lsgiId: action.payload.data
    });
}
function* fetchMCFById(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchMCFById, { langId, mcfId: action.payload.data });
}

function* saveMCF(action) {
    yield fork(saga.handleAPIRequest, API.saveMCF, action.payload.data);
    yield take(ActionTypes.SAVE_MCF_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('mcf') }));
    yield call(history.push, Routes.PATH.BASIC_CONFIG_MCF);
}
function* deleteMCF(action) {
    yield fork(saga.handleAPIRequest, API.deleteMCF, action.payload.data);
    yield take(ActionTypes.DELETE_MCF_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('mcf') }));
    yield call(fetchMCF);
}
function* updateMCFData(action) {
    yield fork(saga.handleAPIRequest, API.updateMCF, action.payload.data, action.payload.id);
    yield take(ActionTypes.UPDATE_MCF_DETAILS_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('mcf') }));
    yield call(history.push, Routes.PATH.BASIC_CONFIG_MCF);
}

export default function* dynamicFormsSaga() {
    yield all([
        //============================= MCF SAGA ========================
        takeLatest(ActionTypes.FETCH_MCF, fetchMCF),
        takeLatest(ActionTypes.LIST_LSGI, fetchAllLsgi),
        takeLatest(ActionTypes.LIST_WARD_BY_ID, fetchAllWard),
        takeLatest(ActionTypes.LIST_DISTRICT, fetchAllDistrict),
        takeLatest(ActionTypes.LIST_STATE, fetchAllState),
        takeLatest(ActionTypes.FETCH_MCF_BY_ID, fetchMCFById),
        takeLatest(ActionTypes.SAVE_MCF_DETAILS, saveMCF),
        takeLatest(ActionTypes.DELETE_MCF_DETAILS, deleteMCF),
        takeLatest(ActionTypes.UPDATE_MCF_DETAILS, updateMCFData)
    ]);
}

