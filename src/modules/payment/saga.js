import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { saga } from '../../common';
import { getDefaultLanguage } from '../common/selectors';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { TABLE_IDS } from './constant';
import { getPayloadData, getAllFilterOptionValues } from '../../utils/ApiUtils';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';

function* fetchPaymentDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_PAYMENT);
    let { passedColumns } = additionalProps;
    // yield call(saga.handleAPIRequest, API.fetchStateDetails, { data: { ...action.payload.data, langId } });
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_PAYMENT);
    yield fork(saga.handleAPIRequest, API.fetchPaymentDetails, { params: { ...tableProps, langId } });
    const paymentAction = yield take([ActionTypes.FETCH_PAYMENT_DETAILS_SUCCESS, ActionTypes.FETCH_PAYMENT_DETAILS_FAILURE]);
    let paymentTableData = getPayloadData(paymentAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, paymentTableData.content || []);

    if (paymentAction.type === ActionTypes.FETCH_PAYMENT_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_PAYMENT, getPayloadData(paymentAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_PAYMENT, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_PAYMENT, filterOptionsList: allFilterValues }));

    }
}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_PAYMENT_DETAILS, fetchPaymentDetails)
    ]);
}

