import { takeLatest, all, call, select, fork, take, put } from 'redux-saga/effects';
import { getPayloadData, getAllFilterOptionValues } from '../../utils/ApiUtils';
import { saga } from '../../common';
import { getDefaultLanguage, getUserSelectedOrganisation } from '../../modules/common/selectors';
import { DEFAULT_TABLE_PROPS } from '../../common/constants';
import utils from '../../utils';
import { residentialAssociationTemalateLoadFlag, types as ActionTypes } from './actions';
import * as API from './api';
import { history } from '../../common';
import * as Routes from '../../routes';
import { I18n } from '../../common/components';
import { TABLE_IDS } from './constants';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../../modules/common/saga';
import { setInitialFilterList, setTableDropdownFilterList } from '../../modules/common/actions';
import { initializeDynamicForm, setResumeModalVisibility, syncInprogressData, toggleDownloadingSurveyDataModalVisibility } from '../../modules/dfg/actions';
import * as dfgSaga from '../../modules/dfg/saga-web';
import { ORGANIZATION_SURVEY_TEMPLATE_ACTIVE_VERSION } from '../../modules/dfg/constants';
import Swal from 'sweetalert2';
import { errorNotify } from '../../utils/ReactReduxNotifyUtils';
import { SurveyDataRepository } from '../../common/pouchDB/repositories';
import { types as DFGActionTypes } from '../../modules/dfg/actions';


const { lodashUtils: _, notifyUtils: { successNotify } } = utils;

function* fetchAllWards() {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_WARD);
  let { passedColumns } = additionalProps;
  const organisation = yield select(getUserSelectedOrganisation);
  const orgId = _.get(organisation, 'id', null); // undefined in ui_admin, etc..
  let wardRequest = {};
  if (orgId !== null) {
    wardRequest.orgId = orgId;
  }
  let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_WARD);
  yield fork(saga.handleAPIRequest, API.fetchAllWards, { params: { ...tableProps, langId, ...wardRequest } });
  const wardAction = yield take([ActionTypes.FETCH_ALL_WARDS_SUCCESS, ActionTypes.FETCH_ALL_WARDS_FAILURE]);
  let wardTableData = getPayloadData(wardAction.payload, {});
  let allFilterValues = getAllFilterOptionValues(passedColumns, wardTableData.content || []);

  if (wardAction.type === ActionTypes.FETCH_ALL_WARDS_SUCCESS) {
    yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_WARD, getPayloadData(wardAction.payload, {}));
    yield put(setInitialFilterList({ key: TABLE_IDS.LIST_WARD, initialfilterOptions: allFilterValues }));
    yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_WARD, filterOptionsList: allFilterValues }));

  }
}

function* fetchAllRA(action) {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;

  let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_RESIDENTIAL_ASSOCIATION);
  yield fork(saga.handleAPIRequest, API.fetchAllRA, { params: { ...tableProps, langId, ...action.payload.data } });
  const raAction = yield take([ActionTypes.FETCH_ALL_RESIDENTIAL_ASSOCIATIONS_SUCCESS, ActionTypes.FETCH_ALL_RESIDENTIAL_ASSOCIATIONS_FAILURE]);
  if (raAction.type === ActionTypes.FETCH_ALL_RESIDENTIAL_ASSOCIATIONS_SUCCESS) {
    yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_RESIDENTIAL_ASSOCIATION, getPayloadData(raAction.payload, {}));
  }
}
function* fetchAllAssociationType() {
  yield call(saga.handleAPIRequest, API.fetchAllAssociationType);
}
function* fetchAllLsgi(action) {
  yield call(saga.handleAPIRequest, API.fetchAllLsgi, {
    districtId: action.payload.districtId
  });
}

function* fetchAllState() {
  yield call(saga.handleAPIRequest, API.fetchAllState);
}

function* fetchAllDistrict(action) {
  yield call(saga.handleAPIRequest, API.fetchAllDistrict, {
    stateId: action.payload.stateId
  });
}

function* fetchWardById(action) {
  yield call(saga.handleAPIRequest, API.fetchWardById, {
    wardId: action.payload.wardId
  });
}

function* fetchRAById(action) {
  yield call(saga.handleAPIRequest, API.fetchRAById, {
    raId: action.payload.raId
  });

}
function* updateWardData(action) {
  yield fork(
    saga.handleAPIRequest,
    API.updateWardData,
    action.payload.data,
    action.payload.id
  );
  yield take(ActionTypes.UPDATE_WARD_SUCCESS);
  yield call(successNotify, I18n.t('update_success', { type: I18n.t('ward') }));
  yield call(history.push, Routes.PATH.BASIC_CONFIG_WARD);
}
function* addWardData(action) {
  yield fork(saga.handleAPIRequest, API.addWardData, action.payload.data);
  const response = yield take(ActionTypes.ADD_WARD_SUCCESS);
  const { payload: { data: { data: { id } } } } = response;
  yield call(successNotify, I18n.t('save_success', { type: I18n.t('ward') }));
  yield call(history.push, `${Routes.PATH.BASIC_CONFIG_WARD}/${id}/details`);
}
function* deleteWardData(action) {
  let page = DEFAULT_TABLE_PROPS.pageNo;
  let size = DEFAULT_TABLE_PROPS.pageSize;
  const tableData = {
    payload: {
      data: {
        page: page,
        size: size
      }
    }
  };
  yield fork(saga.handleAPIRequest, API.deleteWardData, action.payload.id);
  yield take(ActionTypes.DELETE_WARD_SUCCESS);
  yield call(successNotify, I18n.t('delete_success', { type: I18n.t('ward') }));
  yield call(fetchAllWards, tableData);

}

function* updateRAData(action) {
  yield fork(
    saga.handleAPIRequest,
    API.updateRAData,
    action.payload.data,
    action.payload.id
  );
  yield take(ActionTypes.UPDATE_RESIDENTIAL_ASSOCIATION_SUCCESS);
  yield call(
    successNotify,
    I18n.t('update_success', { type: I18n.t('residential_association') })
  );
}
function* addRAData(action) {
  yield fork(saga.handleAPIRequest, API.addRAData, action.payload.data);
  yield call(
    successNotify,
    I18n.t('update_success', { type: I18n.t('residential_association') })
  );
  yield take(ActionTypes.ADD_RESIDENTIAL_ASSOCIATION_SUCCESS);
  yield call(fetchAllRA, {
    payload: {
      data: {
        wardId: action.payload.data.wardId
      }
    }
  });
}
function* deleteRAData(action) {
  let wardId = Number(action.payload.wardId);
  let id = action.payload.id;
  let answerId = action.payload.answerId;
  yield fork(saga.handleAPIRequest, API.deleteRADataStatic, id);
  if (answerId !== undefined) {
    yield fork(saga.handleAPIRequest, API.deleteRADataDFG, answerId);
  }
  yield take(ActionTypes.DELETE_RESIDENTIAL_ASSOCIATION_SUCCESS);
  yield call(
    successNotify,
    I18n.t('delete_success', { type: I18n.t('residential_association') })
  );

  yield call(fetchAllRA, {
    payload: {
      data: {
        wardId
      }
    }
  });
  yield call(history.push, `${Routes.PATH.BASIC_CONFIG_WARD}/${wardId}/residentialAssociation`);
}


function* fetchResidentialAssociationTemplate(action) {
  const { surveyId, templateTypeId, organizationId, residentialAssociationId, wardId } = action.payload.data;
  const payload = {
    data: {
      surveyId,
      residentialAssociationId,
      toggleModalVisibility: (data) => toggleDownloadingSurveyDataModalVisibility(data)
    }
  };
  const initializer = {
    templateTypeId,
    surveyDataKey: surveyId,
    surveyFinishedAction: function* surveyFinishedAction() {
      yield put(syncInprogressData());
      const syncAction = yield take([DFGActionTypes.SYNC_INPROGRESS_SURVEY_API_SUCCESS, DFGActionTypes.SYNC_INPROGRESS_SURVEY_API_FAILED]);
      if (syncAction.type === DFGActionTypes.SYNC_INPROGRESS_SURVEY_API_SUCCESS) {
        yield call([SurveyDataRepository, 'deleteSyncedData'], true, { descriptor: 'templateTypeId' });
      }
      yield call(history.push, `${Routes.PATH.BASIC_CONFIG_WARD}/${wardId}/residentialAssociation`);
    },
    setResumeModalVisibility: (data) => setResumeModalVisibility(data)
  };
  let status = undefined;
  yield put(residentialAssociationTemalateLoadFlag(false));

  if (surveyId) {
    status = yield call([dfgSaga, 'editSyncedSurvey'], { payload });
  } else {
    if (templateTypeId) {
      status = yield call([dfgSaga, 'fetchLatestTemplate'], { payload: { data: { templateTypeId, organizationId, residentialAssociationId } } });
    } else {
      yield call([Swal, 'fire'], {
        title: 'Missing',
        html: `${(organizationId ? templateTypeId ? I18n.t('customer_enrollment_id') : I18n.t('template_type_id') : I18n.t('organization_id'))} ${I18n.t('missing')}`,
        icon: 'error'
      });
    }
  }

  if (status) {
    if (!surveyId) {
      let activeTemplates = yield call([localStorage, 'getItem'], ORGANIZATION_SURVEY_TEMPLATE_ACTIVE_VERSION);
      activeTemplates = activeTemplates ? JSON.parse(activeTemplates) : {};
      initializer.version = activeTemplates[organizationId][templateTypeId] || undefined;
      initializer.additionalInfo = {
        residentialAssociationId: Number(residentialAssociationId)
      };
    }
    yield put(initializeDynamicForm(initializer));
    yield put(residentialAssociationTemalateLoadFlag(true));
  }
}

function* showConfigIssueNotification() {
  yield call(
    errorNotify,
    I18n.t('org_config_issue')
  );
}
export default function* dynamicFormsSaga() {
  yield all([
    takeLatest(ActionTypes.FETCH_ALL_STATE, fetchAllState),
    takeLatest(ActionTypes.FETCH_ALL_DISTRICT, fetchAllDistrict),
    takeLatest(ActionTypes.FETCH_ALL_LSGI, fetchAllLsgi),

    takeLatest(ActionTypes.FETCH_ALL_WARDS, fetchAllWards),
    takeLatest(ActionTypes.FETCH_ALL_RESIDENTIAL_ASSOCIATIONS, fetchAllRA),
    takeLatest(ActionTypes.FETCH_ALL_ASSOCIATION_TYPE, fetchAllAssociationType),
    takeLatest(ActionTypes.FETCH_WARD_BY_ID, fetchWardById),
    takeLatest(ActionTypes.FETCH_RA_BY_ID, fetchRAById),

    takeLatest(ActionTypes.UPDATE_WARD, updateWardData),
    takeLatest(ActionTypes.ADD_WARD, addWardData),
    takeLatest(ActionTypes.DELETE_WARD, deleteWardData),

    takeLatest(ActionTypes.UPDATE_RESIDENTIAL_ASSOCIATION, updateRAData),
    takeLatest(ActionTypes.ADD_RESIDENTIAL_ASSOCIATION, addRAData),
    takeLatest(ActionTypes.DELETE_RESIDENTIAL_ASSOCIATION, deleteRAData),
    takeLatest(ActionTypes.FETCH_RESIDENTIAL_ASSOCIATION_TEMPLATE, fetchResidentialAssociationTemplate),
    takeLatest(ActionTypes.CONFIG_ISSUE_IN_ORG, showConfigIssueNotification)
  ]);
}
