import { takeLatest, all, call, fork, take, select, delay, put } from 'redux-saga/effects';
import { types as ActionTypes } from './actions';
import { saga, history } from '../../common';
import * as API from './api';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { getPayloadData, formatCheckBoxesForAPI, getAllFilterOptionValues } from '../../utils/ApiUtils';
import { getDefaultLanguage } from '../../modules/common/selectors';
import { getBundleServiceConfog } from './selectors';
import _ from '../../utils/LodashUtils';
import { PATH } from '../../routes';
import { TABLE_IDS } from './constants';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';

function* listBundledServiceConfig() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let types = [ActionTypes.LIST_BUNDLED_SERVICE_CONFIG_REQUEST, ActionTypes.LIST_BUNDLED_SERVICE_CONFIG_SUCCESS, ActionTypes.LIST_BUNDLED_SERVICE_CONFIG_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_BUNDLED_SERVICE_CONFIG);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_BUNDLED_SERVICE_CONFIG);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.listBundledServiceConfig, { params: { ...tableProps, langId }, types });

    const action = yield take([ActionTypes.LIST_BUNDLED_SERVICE_CONFIG_SUCCESS, ActionTypes.LIST_BUNDLED_SERVICE_CONFIG_FAILURE]);
    let tableData = getPayloadData(action.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, tableData.content || []);

    if (action.type === ActionTypes.LIST_BUNDLED_SERVICE_CONFIG_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_BUNDLED_SERVICE_CONFIG, getPayloadData(action.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_BUNDLED_SERVICE_CONFIG, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_BUNDLED_SERVICE_CONFIG, filterOptionsList: allFilterValues }));
    }
}

function* sentBundledServiceConfig(action) {
    yield fork(saga.handleAPIRequest, API.sentBundledServiceConfig, action.payload.data);
    yield take(ActionTypes.SENT_BUNDLED_SERVICE_CONFIG_SUCCESS);
    yield call(successNotify, 'BundledServiceConfig Type created successfully');
    yield call(history.push, `${PATH.BUNDLED_SERVICE_CONFIG}`);

}

function* editBundledServiceConfig(action) {
    yield fork(saga.handleAPIRequest, API.editBundledServiceConfig, action.payload.id, action.payload.data);
    yield take(ActionTypes.EDIT_BUNDLED_SERVICE_CONFIG_SUCCESS);
    yield call(successNotify, 'BundledServiceConfig updated successfully');
    yield call(history.push, `${PATH.BUNDLED_SERVICE_CONFIG}`);

}
function* getServiceCatById(action) {
    yield call(saga.handleAPIRequest, API.getBundledServiceConfigById, action.payload.id);

}

function* deleteBundledServiceConfig(action) {
    yield fork(saga.handleAPIRequest, API.deleteBundledServiceConfig, action.payload.data);
    yield take(ActionTypes.DELETE_BUNDLED_SERVICE_CONFIG_SUCCESS);
    yield call(successNotify, 'BundledServiceConfig deleted successfully.');
    yield delay(500);
    yield call(listBundledServiceConfig);
}

function* savebundleServiceConfig(action) {
    let data = _.get(action, 'payload.data', {});
    let { organizationId, formData: assignModulesView } = data;
    let bundledServiceConfigDetails = yield select(getBundleServiceConfog);
    let { assignBundledServiceConfigList } = bundledServiceConfigDetails;
    let requestBody = formatCheckBoxesForAPI(assignModulesView || [], assignBundledServiceConfigList.data || []);
    yield fork(saga.handleAPIRequest, API.saveBundledServiceConfig, organizationId, requestBody);
    yield take(ActionTypes.SAVE_BUNDLED_SERVICE_CONFIG_FOR_CHK_SUCCESS);
    yield call(successNotify, 'Bundled Service Confog updated  successfully.');

}

function* fetchBundledServiceConfig(action) {
    yield fork(saga.handleAPIRequest, API.fetchBundledServiceConfig, action.payload.data);
}
export default function* BundledServiceConfigSaga() {
    yield all([
        takeLatest(ActionTypes.LIST_BUNDLED_SERVICE_CONFIG, listBundledServiceConfig),
        takeLatest(ActionTypes.SENT_BUNDLED_SERVICE_CONFIG, sentBundledServiceConfig),
        takeLatest(ActionTypes.EDIT_BUNDLED_SERVICE_CONFIG, editBundledServiceConfig),
        takeLatest(ActionTypes.GET_BUNDLED_SERVICE_CONFIG_BY_ID, getServiceCatById),
        takeLatest(ActionTypes.DELETE_BUNDLED_SERVICE_CONFIG, deleteBundledServiceConfig),
        takeLatest(ActionTypes.FETCH_BUNDLED_SERVICE_CONFIG_FOR_CHK, fetchBundledServiceConfig),
        takeLatest(ActionTypes.SAVE_BUNDLED_SERVICE_CONFIG_FOR_CHK, savebundleServiceConfig)
    ]);
}
