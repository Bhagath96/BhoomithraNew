import { takeLatest, all, call, fork, take, select, delay, put } from 'redux-saga/effects';
import { types as ActionTypes } from './actions';
import { saga, history } from '../../common';
import * as API from './api';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { TABLE_IDS } from './constants';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';

function* listAssociationType() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let types = [ActionTypes.LIST_ASSOCIATION_TYPE_REQUEST, ActionTypes.LIST_ASSOCIATION_TYPE_SUCCESS, ActionTypes.LIST_ASSOCIATION_TYPE_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_ASSOCIATION_TYPE);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_ASSOCIATION_TYPE);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.listAssociationType, { params: { ...tableProps, langId }, types });

    const action = yield take([ActionTypes.LIST_ASSOCIATION_TYPE_SUCCESS, ActionTypes.LIST_ASSOCIATION_TYPE_FAILURE]);
    let stateTableData = getPayloadData(action.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

    if (action.type === ActionTypes.LIST_ASSOCIATION_TYPE_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_ASSOCIATION_TYPE, getPayloadData(action.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_ASSOCIATION_TYPE, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_ASSOCIATION_TYPE, filterOptionsList: allFilterValues }));
    }

}

function* sentAssociationType(action) {
    yield fork(saga.handleAPIRequest, API.sentAssociationType, action.payload.data);
    yield take(ActionTypes.SENT_ASSOCIATION_TYPE_SUCCESS);
    yield call(successNotify, 'Association Type created successfully');
    yield call(history.push, '/admin/index/association-type');

}

function* editAssociationType(action) {
    yield fork(saga.handleAPIRequest, API.editAssociationType, action.payload.id, action.payload.data);
    yield take(ActionTypes.EDIT_ASSOCIATION_TYPE_SUCCESS);
    yield call(successNotify, 'Associationtype updated successfully');
    yield call(history.push, '/admin/index/association-type');

}
function* getServiceCatById(action) {
    yield call(saga.handleAPIRequest, API.getAssociationTypeById, action.payload.id);

}

function* deleteAssociationType(action) {
    yield fork(saga.handleAPIRequest, API.deleteAssociationType, action.payload.data);
    yield take(ActionTypes.DELETE_ASSOCIATION_TYPE_SUCCESS);
    yield call(successNotify, 'AssociationType deleted successfully.');
    yield delay(500);
    yield call(listAssociationType);
}

export default function* AssociationTypeSaga() {
    yield all([
        takeLatest(ActionTypes.LIST_ASSOCIATION_TYPE, listAssociationType),
        takeLatest(ActionTypes.SENT_ASSOCIATION_TYPE, sentAssociationType),
        takeLatest(ActionTypes.EDIT_ASSOCIATION_TYPE, editAssociationType),
        takeLatest(ActionTypes.GET_ASSOCIATION_TYPE_BY_ID, getServiceCatById),
        takeLatest(ActionTypes.DELETE_ASSOCIATION_TYPE, deleteAssociationType)
    ]);
}
