import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { saga } from '../../common';
import { getDefaultLanguage } from '../common/selectors';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { TABLE_IDS } from './constant';
import { getPayloadData, getAllFilterOptionValues } from '../../utils/ApiUtils';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../common/actions';

function* fetchReportedBugsDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_REPORTED_BUGS);
    let { passedColumns } = additionalProps;
    // yield call(saga.handleAPIRequest, API.fetchStateDetails, { data: { ...action.payload.data, langId } });
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_REPORTED_BUGS);
    yield fork(saga.handleAPIRequest, API.fetchReportedBugsDetails, { params: { ...tableProps, langId } });
    const action = yield take([ActionTypes.FETCH_REPORTED_BUGS_DETAILS_SUCCESS, ActionTypes.FETCH_REPORTED_BUGS_DETAILS_FAILURE]);
    let tableData = getPayloadData(action.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, tableData.content || []);

    if (action.type === ActionTypes.FETCH_REPORTED_BUGS_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_REPORTED_BUGS, getPayloadData(action.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_REPORTED_BUGS, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_REPORTED_BUGS, filterOptionsList: allFilterValues }));

    }
}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_REPORTED_BUGS_DETAILS, fetchReportedBugsDetails)
    ]);
}

