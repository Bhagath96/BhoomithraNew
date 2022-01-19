import { takeLatest, all, call, fork, take, select, delay, put } from 'redux-saga/effects';
import { types as ActionTypes } from './actions';
import { saga, history } from '../../common';
import * as API from './api';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { getPayloadData, getAllFilterOptionValues } from '../../utils/ApiUtils';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { TABLE_IDS } from './constants';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';


function* listPublicGatheringMethod() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_PUBLIC_GATHERING_METHOD);
    let { passedColumns } = additionalProps;
    let types = [ActionTypes.LIST_PUBLIC_GATHERING_METHOD_REQUEST, ActionTypes.LIST_PUBLIC_GATHERING_METHOD_SUCCESS, ActionTypes.LIST_PUBLIC_GATHERING_METHOD_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_PUBLIC_GATHERING_METHOD);
    yield fork(saga.handleAPIRequest, API.listPublicGatheringMethod, { params: { ...tableProps, langId }, types });
    const action = yield take([ActionTypes.LIST_PUBLIC_GATHERING_METHOD_SUCCESS, ActionTypes.LIST_PUBLIC_GATHERING_METHOD_FAILURE]);

    let districtTableData = getPayloadData(action.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, districtTableData.content || []);

    if (action.type === ActionTypes.LIST_PUBLIC_GATHERING_METHOD_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_PUBLIC_GATHERING_METHOD, getPayloadData(action.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_PUBLIC_GATHERING_METHOD, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_PUBLIC_GATHERING_METHOD, filterOptionsList: allFilterValues }));

    }
}

function* sentPublicGatheringMethod(action) {
    yield fork(saga.handleAPIRequest, API.sentPublicGatheringMethod, action.payload.data);
    yield take(ActionTypes.SENT_PUBLIC_GATHERING_METHOD_SUCCESS);
    yield call(successNotify, 'APublic gathering method created successfully');
    yield call(history.push, '/admin/index/public-gathering-method');

}

function* editPublicGatheringMethod(action) {
    yield fork(saga.handleAPIRequest, API.editPublicGatheringMethod, action.payload.id, action.payload.data);
    yield take(ActionTypes.EDIT_PUBLIC_GATHERING_METHOD_SUCCESS);
    yield call(successNotify, 'Public gathering method updated successfully');
    yield call(history.push, '/admin/index/public-gathering-method');

}
function* getServiceCatById(action) {
    yield call(saga.handleAPIRequest, API.getPublicGatheringMethodById, action.payload.id);

}

function* deletePublicGatheringMethod(action) {
    yield fork(saga.handleAPIRequest, API.deletePublicGatheringMethod, action.payload.data);
    yield take(ActionTypes.DELETE_PUBLIC_GATHERING_METHOD_SUCCESS);
    yield call(successNotify, 'PublicGatheringMethod deleted successfully.');
    yield delay(500);
    yield call(listPublicGatheringMethod);
}

export default function* PublicGatheringMethodSaga() {
    yield all([
        takeLatest(ActionTypes.LIST_PUBLIC_GATHERING_METHOD, listPublicGatheringMethod),
        takeLatest(ActionTypes.SENT_PUBLIC_GATHERING_METHOD, sentPublicGatheringMethod),
        takeLatest(ActionTypes.EDIT_PUBLIC_GATHERING_METHOD, editPublicGatheringMethod),
        takeLatest(ActionTypes.GET_PUBLIC_GATHERING_METHOD_BY_ID, getServiceCatById),
        takeLatest(ActionTypes.DELETE_PUBLIC_GATHERING_METHOD, deletePublicGatheringMethod)
    ]);
}
