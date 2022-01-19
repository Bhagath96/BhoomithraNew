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


function* listShopType() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_SHOP_TYPE);
    let { passedColumns } = additionalProps;
    let types = [ActionTypes.LIST_SHOP_TYPE_REQUEST, ActionTypes.LIST_SHOP_TYPE_SUCCESS, ActionTypes.LIST_SHOP_TYPE_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_SHOP_TYPE);
    yield fork(saga.handleAPIRequest, API.listShopType, { params: { ...tableProps, langId }, types });
    const action = yield take([ActionTypes.LIST_SHOP_TYPE_SUCCESS, ActionTypes.LIST_SHOP_TYPE_FAILURE]);
    let districtTableData = getPayloadData(action.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, districtTableData.content || []);

    if (action.type === ActionTypes.LIST_SHOP_TYPE_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_SHOP_TYPE, getPayloadData(action.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_SHOP_TYPE, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_SHOP_TYPE, filterOptionsList: allFilterValues }));

    }
}

function* sentShopType(action) {
    yield fork(saga.handleAPIRequest, API.sentShopType, action.payload.data);
    yield take(ActionTypes.SENT_SHOP_TYPE_SUCCESS);
    yield call(successNotify, 'Shop Type created successfully');
    yield call(history.push, '/admin/index/Shop-type');

}

function* editShopType(action) {
    yield fork(saga.handleAPIRequest, API.editShopType, action.payload.id, action.payload.data);
    yield take(ActionTypes.EDIT_SHOP_TYPE_SUCCESS);
    yield call(successNotify, 'Shop type updated successfully');
    yield call(history.push, '/admin/index/Shop-type');

}
function* getServiceCatById(action) {
    yield call(saga.handleAPIRequest, API.getShopTypeById, action.payload.id);

}

function* deleteShopType(action) {
    yield fork(saga.handleAPIRequest, API.deleteShopType, action.payload.data);
    yield take(ActionTypes.DELETE_SHOP_TYPE_SUCCESS);
    yield call(successNotify, 'ShopType deleted successfully.');
    yield delay(500);
    yield call(listShopType);
}

export default function* ShopTypeSaga() {
    yield all([
        takeLatest(ActionTypes.LIST_SHOP_TYPE, listShopType),
        takeLatest(ActionTypes.SENT_SHOP_TYPE, sentShopType),
        takeLatest(ActionTypes.EDIT_SHOP_TYPE, editShopType),
        takeLatest(ActionTypes.GET_SHOP_TYPE_BY_ID, getServiceCatById),
        takeLatest(ActionTypes.DELETE_SHOP_TYPE, deleteShopType)
    ]);
}
