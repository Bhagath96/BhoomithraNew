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


function* listBuildingType() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;

    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_BUILDING_TYPE);
    let { passedColumns } = additionalProps;

    let types = [ActionTypes.LIST_BUILDING_TYPE_REQUEST, ActionTypes.LIST_BUILDING_TYPE_SUCCESS, ActionTypes.LIST_BUILDING_TYPE_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_BUILDING_TYPE);
    yield fork(saga.handleAPIRequest, API.listBuildingType, { params: { ...tableProps, langId }, types });
    const buildTypeAction = yield take([ActionTypes.LIST_BUILDING_TYPE_SUCCESS, ActionTypes.LIST_BUILDING_TYPE_FAILURE]);

    let buildingTypeTableData = getPayloadData(buildTypeAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, buildingTypeTableData.content || []);


    if (buildTypeAction.type === ActionTypes.LIST_BUILDING_TYPE_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_BUILDING_TYPE, getPayloadData(buildTypeAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_BUILDING_TYPE, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_BUILDING_TYPE, filterOptionsList: allFilterValues }));

    }
}

function* sentBuildingType(action) {
    yield fork(saga.handleAPIRequest, API.sentBuildingType, action.payload.data);
    yield take(ActionTypes.SENT_BUILDING_TYPE_SUCCESS);
    yield call(successNotify, 'Building Type created successfully');
    yield call(history.push, '/admin/index/Building-type');

}

function* editBuildingType(action) {
    yield fork(saga.handleAPIRequest, API.editBuildingType, action.payload.id, action.payload.data);
    yield take(ActionTypes.EDIT_BUILDING_TYPE_SUCCESS);
    yield call(successNotify, 'Building type updated successfully');
    yield call(history.push, '/admin/index/building-type');

}
function* getServiceCatById(action) {
    yield call(saga.handleAPIRequest, API.getBuildingTypeById, action.payload.id);

}

function* loadResidentialCategory() {
    const type = 'dropdown';
    yield call(saga.handleAPIRequest, API.loadResidentialCategory, type);

}

function* deleteBuildingType(action) {
    yield fork(saga.handleAPIRequest, API.deleteBuildingType, action.payload.data);
    yield take(ActionTypes.DELETE_BUILDING_TYPE_SUCCESS);
    yield call(successNotify, 'BuildingType deleted successfully.');
    yield delay(500);
    yield call(listBuildingType);
}

export default function* BuildingTypeSaga() {
    yield all([
        takeLatest(ActionTypes.LIST_BUILDING_TYPE, listBuildingType),
        takeLatest(ActionTypes.SENT_BUILDING_TYPE, sentBuildingType),
        takeLatest(ActionTypes.EDIT_BUILDING_TYPE, editBuildingType),
        takeLatest(ActionTypes.GET_BUILDING_TYPE_BY_ID, getServiceCatById),
        takeLatest(ActionTypes.DELETE_BUILDING_TYPE, deleteBuildingType),
        takeLatest(ActionTypes.LOAD_RESIDENTIAL_CATEGORY, loadResidentialCategory)
    ]);
}
