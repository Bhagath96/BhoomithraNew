import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { saga } from '../../common';
import { getDefaultLanguage } from '../common/selectors';
import utils from '../../utils';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { TABLE_IDS } from './constant';
import { getPayloadData, getAllFilterOptionValues } from '../../utils/ApiUtils';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../common/actions';

const { notifyUtils: { errorNotify } } = utils;

function* showErrorNotification(action) {
    let message = action.payload.error ? action.payload.error.message : 'Technical error.';
    yield call(errorNotify, message, 3000);
}
function* fetchIncidents() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_INCIDENTS);
    let { passedColumns } = additionalProps;

    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_INCIDENTS);
    yield fork(saga.handleAPIRequest, API.fetchIncidents, { params: { ...tableProps, langId } });
    const action = yield take([ActionTypes.FETCH_INCIDENTS_SUCCESS, ActionTypes.FETCH_INCIDENTS_FAILURE]);
    let tableData = getPayloadData(action.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, tableData.content || []);

    if (action.type === ActionTypes.FETCH_INCIDENTS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_INCIDENTS, getPayloadData(action.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_INCIDENTS, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_INCIDENTS, filterOptionsList: allFilterValues }));

    }
}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_INCIDENTS, fetchIncidents),

        takeLatest([
            ActionTypes.FETCH_INCIDENTS_FAILURE
        ], showErrorNotification)
    ]);
}

