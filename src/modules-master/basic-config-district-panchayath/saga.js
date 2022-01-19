import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { saga } from '../../common';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { history } from '../../../src/common';
import * as Routes from '../../routes';
import { I18n } from '../../common/components';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { TABLE_IDS } from './constant';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';

function* fetchDistrictPanchayathDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_DISTRICT_PANCHAYATH);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_DISTRICT_PANCHAYATH);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.fetchDistrictPanchayathDetailsAPI, { params: { ...tableProps, langId } });

    const action = yield take([ActionTypes.FETCH_DISTRICT_PANCHAYATH_DETAILS_SUCCESS, ActionTypes.FETCH_DISTRICT_PANCHAYATH_DETAILS_FAILURE]);
    let lsgiTableData = getPayloadData(action.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, lsgiTableData.content || []);

    if (action.type === ActionTypes.FETCH_DISTRICT_PANCHAYATH_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_DISTRICT_PANCHAYATH, getPayloadData(action.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_DISTRICT_PANCHAYATH, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_DISTRICT_PANCHAYATH, filterOptionsList: allFilterValues }));
    }
}
function* saveDistrictPanchayath(action) {
    yield fork(saga.handleAPIRequest, API.saveDistrictPanchayath, action.payload.data);
    yield take(ActionTypes.SAVE_DISTRICT_PANCHAYATH_SUCCESS);
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('district_Panchayath') }));
    yield call(history.push, Routes.PATH.BASIC_CONFIG_DISTRICT_PANCHAYATH);
}
function* deleteDistrictPanchayath(action) {
    yield fork(saga.handleAPIRequest, API.deleteDistrictPanchayath, action.payload.data);
    yield take(ActionTypes.DELETE_DISTRICT_PANCHAYATH_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('district_Panchayath') }));
    yield call(fetchDistrictPanchayathDetails);
}
function* fetchDistrictPanchayathById(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchDistrictPanchayathDataById, { langId, distId: action.payload.data });
}
function* updateDistrictPanchayathData(action) {
    yield fork(saga.handleAPIRequest, API.updateDistrictPanchayath, action.payload.data, action.payload.id);
    yield take(ActionTypes.UPDATE_DISTRICT_PANCHAYATH_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('district_Panchayath') }));
    yield call(history.push, Routes.PATH.BASIC_CONFIG_DISTRICT_PANCHAYATH);
}
function* fetchDistrict(action) {
    // const stateID = data.payload.data;
    yield call(saga.handleAPIRequest, API.fetchDistrict, action.payload.data);
}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_DISTRICT_PANCHAYATH_DETAILS, fetchDistrictPanchayathDetails),
        takeLatest(ActionTypes.SAVE_DISTRICT_PANCHAYATH, saveDistrictPanchayath),
        takeLatest(ActionTypes.DELETE_DISTRICT_PANCHAYATH, deleteDistrictPanchayath),
        takeLatest(ActionTypes.FETCH_DISTRICT_PANCHAYATH_BY_ID, fetchDistrictPanchayathById),
        takeLatest(ActionTypes.UPDATE_DISTRICT_PANCHAYATH, updateDistrictPanchayathData),
        takeLatest(ActionTypes.LIST_DISTRICT_PANCHAYATH_DISTRICT, fetchDistrict)
    ]);
}
