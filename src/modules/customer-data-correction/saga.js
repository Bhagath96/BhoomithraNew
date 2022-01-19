import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { saga } from '../../common';
import { getDefaultLanguage } from '../common/selectors';
import { types as ActionTypes } from './actions';
import * as API from './api';
import { getPayloadData, getAllFilterOptionValues } from '../../utils/ApiUtils';
import { TABLE_IDS } from './constant';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';

function* fetchCustomerDetails() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_CUSTOMER);
    let { passedColumns } = additionalProps;
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_CUSTOMER);
    yield fork(saga.handleAPIRequest, API.fetchCustomerDetails, { params: { ...tableProps, langId } });
    const customerAction = yield take([ActionTypes.FETCH_CUSTOMER_DETAILS_SUCCESS, ActionTypes.FETCH_CUSTOMER_DETAILS_FAILURE]);
    let customerTableData = getPayloadData(customerAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, customerTableData.content || []);

    if (customerAction.type === ActionTypes.FETCH_CUSTOMER_DETAILS_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_CUSTOMER, getPayloadData(customerAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_CUSTOMER, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_CUSTOMER, filterOptionsList: allFilterValues }));

    }
}

function* viewCustomerEnrollmetDetails(action) {
    const { customerId, templateTypeId } = action.payload.data;
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let preData = {
        templateTypeIds: templateTypeId,
        surveyIds: [customerId],
        type: 'list'
    };
    yield call(saga.handleAPIRequest, API.fetchCustomerEnrollmentDetailsByEnrollmentId, { ...preData, langId });
}

function* viewCustomerConflictDetails(action) {
    const { customerId, templateTypeId } = action.payload.data;
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let preData = {
        templateTypeIds: templateTypeId,
        surveyIds: [customerId],
        type: 'list'
    };
    yield call(saga.handleAPIRequest, API.fetchCustomerConflictDetailsByConflictId, { ...preData, langId });
}

export default function* dynamicFormsSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_CUSTOMER_DETAILS, fetchCustomerDetails),
        takeLatest(ActionTypes.VIEW_CUSTOMER_ENROLLMENT_DETAILS, viewCustomerEnrollmetDetails),
        takeLatest(ActionTypes.VIEW_CUSTOMER_CONFLICT_DETAILS, viewCustomerConflictDetails)
    ]);
}

