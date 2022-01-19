import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { saga } from '../../common';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { getPayloadData } from '../../utils/ApiUtils';
import { TABLE_IDS } from './constant';
import { getAllFilterOptionValues } from '../../utils/ApiUtils';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';

function* fetchServiceDetails(action) {
    const language = yield select(getDefaultLanguage);
    const excludeSkippedOrCancelled = action?.payload?.data || false;
    const { id: langId } = language;
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_SERVICE);
    let { passedColumns } = additionalProps;
    // yield call(saga.handleAPIRequest, API.fetchStateDetails, { data: { ...action.payload.data, langId } });
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_SERVICE);
    yield fork(saga.handleAPIRequest, API.fetchServiceDetails, { params: { ...tableProps, langId, excludeSkippedOrCancelled } });
    const serviceAction = yield take([ActionTypes.FETCH_SERVICE_DETAILS_SUCCESS, ActionTypes.FETCH_SERVICE_DETAILS_FAILURE]);
    let serviceTableData = getPayloadData(serviceAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, serviceTableData.content || []);
    if (serviceAction.type === ActionTypes.FETCH_SERVICE_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_SERVICE, getPayloadData(serviceAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_SERVICE, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_SERVICE, filterOptionsList: allFilterValues }));
    }
}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_SERVICE_DETAILS, fetchServiceDetails)
    ]);
}

