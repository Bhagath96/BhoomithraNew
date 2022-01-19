import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { saga } from '../../common';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { TABLE_IDS } from './constant';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../common/actions';

function* fetchSubscriptionDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_SUBSCRIPTION);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_SUBSCRIPTION);
    let { passedColumns } = additionalProps;
    yield fork(saga.handleAPIRequest, API.fetchSubscriptionDetails, { params: { ...tableProps, langId } });
    const subscriptionAction = yield take([ActionTypes.FETCH_SUBSCRIPTION_DETAILS_SUCCESS, ActionTypes.FETCH_SUBSCRIPTION_DETAILS_FAILURE]);
    const subscriptionResponse = getPayloadData(subscriptionAction.payload, {});
    let serviceHistoryTableData = subscriptionResponse.content || [];
    let allFilterValues = getAllFilterOptionValues(passedColumns, serviceHistoryTableData);
    if (subscriptionAction.type === ActionTypes.FETCH_SUBSCRIPTION_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_SUBSCRIPTION, subscriptionResponse);
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_SUBSCRIPTION, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_SUBSCRIPTION, filterOptionsList: allFilterValues }));
    }
}


export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_SUBSCRIPTION_DETAILS, fetchSubscriptionDetails)
    ]);
}

