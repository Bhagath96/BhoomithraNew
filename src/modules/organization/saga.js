import {
  takeLatest,
  all,
  call,
  fork,
  take,
  delay,
  select,
  put
} from 'redux-saga/effects';
import { types as ActionTypes } from './actions';
import { saga, history } from '../../common';
import * as API from './api';
import _ from '../../utils/LodashUtils';
import { errorNotify, successNotify } from '../../utils/ReactReduxNotifyUtils';
import { getSelectedOrgInfo, getOrganization } from './selectors';

import {
  getSelectId,
  formatCheckBoxesForAPI,
  getPayloadData,
  formatMemberTureArray,
  getAllFilterOptionValues
} from '../../utils/ApiUtils';
import { PATH } from '../../routes';
import { getDefaultLanguage } from '../common/selectors';
import { DEFAULT_TABLE_PROPS, FILTER_API_PROPS } from '../../common/constants';
import * as Actions from './actions';
import { TEMPLATE_TYPES, TEMPLATE_TYPE_IDS, ORGANIZATION_SURVEY_TEMPLATE_ACTIVE_VERSION } from '../dfg/constants';
import { I18n } from '../../common/components';
import { setInitialFilterList, resetTableDropdownFilterList, setSelectedIds, setTableDropdownFilterList, types as commonActionTypes } from '../common/actions';
import { action as CommonAction } from '../../common';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../common/saga';
import { TABLE_IDS } from './constants';
import { initializeDynamicForm, setResumeModalVisibility, syncInprogressData, toggleDownloadingSurveyDataModalVisibility } from '../dfg/actions';
import { types as DFGActionTypes } from '../dfg/actions';

import * as dfgSaga from '../dfg/saga-web';
import Swal from 'sweetalert2';
import { SurveyDataRepository } from '../../common/pouchDB/repositories';


function formatOrganizationRequest(action) {
  let request = {};
  let { payload: { data: { sort, labels } = {} } = {} } = action;

  if (sort) {
    request.sort = parseInt(sort || '0');
  }

  if (labels || [].length > 0) {
    request.labels = labels;
  }
  _.set(
    request,
    'parentOrganizationId',
    getSelectId(_.get(action, 'payload.data.parentOrganization', null))
  );
  _.set(request, 'name', _.get(action, 'payload.data.name', null));
  _.set(request, 'code', _.get(action, 'payload.data.code', null));
  _.set(
    request,
    'organizationTypeId',
    getSelectId(_.get(action, 'payload.data.organizationType', null))
  );
  _.set(
    request,
    'stateId',
    getSelectId(_.get(action, 'payload.data.state', null))
  );
  _.set(
    request,
    'districtId',
    getSelectId(_.get(action, 'payload.data.district', null))
  );
  _.set(
    request,
    'lsgiId',
    getSelectId(_.get(action, 'payload.data.lsgi', null))
  );
  return request;
}

function* listOrganization() {

  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  let types = [
    ActionTypes.LIST_ORGANISATION_REQUEST,
    ActionTypes.LIST_ORGANISATION_SUCCESS,
    ActionTypes.LIST_ORGANISATION_FAILURE
  ];
  let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_ORGANIZATION);
  let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_ORGANIZATION);

  let { passedColumns } = additionalProps;
  yield fork(saga.handleAPIRequest, API.listOrganization, { params: { ...tableProps, langId }, types });
  const organizationAction = yield take([ActionTypes.LIST_ORGANISATION_SUCCESS, ActionTypes.LIST_ORGANISATION_FAILURE]);
  let orgTableData = getPayloadData(organizationAction.payload, {});

  let allFilterValues = getAllFilterOptionValues(passedColumns, _.get(orgTableData, 'content', []));
  if (organizationAction.type === ActionTypes.LIST_ORGANISATION_SUCCESS) {
    yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_ORGANIZATION, getPayloadData(organizationAction.payload, {}));
    yield put(setInitialFilterList({ key: TABLE_IDS.LIST_ORGANIZATION, initialfilterOptions: allFilterValues }));
    yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_ORGANIZATION, filterOptionsList: allFilterValues }));

  }
}
function* listService(action) {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;

  let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_SERVICE);
  let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_SERVICE);

  let { passedColumns } = additionalProps;
  yield fork(saga.handleAPIRequest, API.listService, { params: { ...tableProps, ...action.payload.data, langId } });

  const serviceAction = yield take([ActionTypes.LIST_SERVICE_SUCCESS, ActionTypes.LIST_SERVICE_FAILURE]);
  let tableData = getPayloadData(serviceAction.payload, {});
  let allFilterValues = getAllFilterOptionValues(passedColumns, _.get(tableData, 'content', []));

  if (serviceAction.type === ActionTypes.LIST_SERVICE_SUCCESS) {
    yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_SERVICE, getPayloadData(serviceAction.payload, {}));
    yield put(setInitialFilterList({ key: TABLE_IDS.LIST_SERVICE, initialfilterOptions: allFilterValues }));
    yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_SERVICE, filterOptionsList: allFilterValues }));
  }
}

function* fetchInitialOrganization() {
  let data = {
    page: DEFAULT_TABLE_PROPS.pageNo,
    size: DEFAULT_TABLE_PROPS.pageSize
  };
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  const types = [
    ActionTypes.FETCH_INITIAL_ORGANIZATIONS_REQUEST,
    ActionTypes.FETCH_INITIAL_ORGANIZATIONS_SUCCESS,
    ActionTypes.FETCH_INITIAL_ORGANIZATIONS_FAILURE
  ];
  yield call(saga.handleAPIRequest, API.listOrganization, {
    data: { ...data, langId },
    types
  });
}

function* fetchOrganizationDetails(action) {
  yield fork(saga.handleAPIRequest, API.fetchOrganizationDetails, {
    organizationId: action.payload.data
  });
  let fetchnOrganizationAction = yield take([ActionTypes.FETCH_ORGANIZATION_DETAILS_SUCCESS, ActionTypes.FETCH_ORGANIZATION_DETAILS_FAILURE]);
  fetchnOrganizationAction = getPayloadData(fetchnOrganizationAction.payload, {}).organizationType?.name || {};
  localStorage.setItem('typeOfOrganization', fetchnOrganizationAction);
}

function* loadUsersOrganizationListForServiceWorker(action) {
  yield call(saga.handleAPIRequest, API.loadUsersOrganizationListForServiceWorker, action.payload.orgId);
}
function* loadUsersOrganizationList(action) {
  yield call(saga.handleAPIRequest, API.loadUsersOrganizationList, {
    ...action.payload.data
  });
}

function* updateUserOrganizationMapping(action) {
  let { organizationId, users } = action.payload.data;
  yield fork(saga.handleAPIRequest, API.updateUserOrganizationMapping, {
    organizationId,
    requestBody: users
  });
  const updateAssignUserAction = yield take([ActionTypes.UPDATE_CHK_USER_ORGANIZATION_SUCCESS, ActionTypes.UPDATE_CHK_USER_ORGANIZATION_FAILURE]);
  if (updateAssignUserAction.type === ActionTypes.UPDATE_CHK_USER_ORGANIZATION_SUCCESS) {
    yield put(setSelectedIds({ key: TABLE_IDS.ASSIGN_ORG_USERS, selectedIds: [] }));
    yield put(Actions.fetchOrganizationAssignUsers());
    yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('user') }));
  }
}

function* updateAssignOrganizationMapping(action) {
  let { id: organizationId, assignOrgObj } = action.payload.data;
  yield fork(saga.handleAPIRequest, API.updateAssignOrganizationMapping, {
    organizationId,
    requestBody: assignOrgObj
  });
  const updateAssignOrganizationAction = yield take([ActionTypes.UPDATE_CHK_ASSIGN_ORGANIZATION_SUCCESS, ActionTypes.UPDATE_CHK_ASSIGN_ORGANIZATION_FAILURE]);
  if (updateAssignOrganizationAction.type === ActionTypes.UPDATE_CHK_ASSIGN_ORGANIZATION_SUCCESS) {
    yield put(setSelectedIds({ key: TABLE_IDS.ASSIGN_ORGANIZATION, selectedIds: [] }));
    yield put(Actions.fetchAssignOrganization());
    yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('organization') }));
  }
}

function* updateUserOrganizationRole(action) {
  let { formData } = action.payload.data;
  let orgId = action.payload.id;
  let roleId = action.payload.roleId;

  let organizationList = yield select(getOrganization);
  let {
    loadUserGroupAssignUsers: { data: apiResponse }
  } = organizationList;
  let requestBody = formatCheckBoxesForAPI(formData, apiResponse);
  yield fork(saga.handleAPIRequest, API.updateUserOrganizationRole, {
    orgId,
    roleId,
    requestBody
  });
  yield take(ActionTypes.UPDATE_CHK_USER_ORGANIZATION_ROLE_SUCCESS);
  yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('user') }));
}

function* saveOrganization(action) {
  yield fork(
    saga.handleAPIRequest,
    API.saveOrganization,
    formatOrganizationRequest(action)
  );
  const saveAction = yield take([ActionTypes.SAVE_ORGANIZATION_SUCCESS, ActionTypes.SAVE_ORGANIZATION_FAILED]);
  if (saveAction.type === ActionTypes.SAVE_ORGANIZATION_SUCCESS) {
    yield put(Actions.clearReducer());
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('organization') }));
    yield call(history.push, `${PATH.ORGANIZATION}`);
  }
}

function* updateOrganization(action) {
  let organizationId = Number(_.get(action, 'payload.data.organizationId', ''));
  yield fork(saga.handleAPIRequest, API.updateOrganization, {
    organizationId,
    data: formatOrganizationRequest(action)
  });
  const updateAction = yield take([ActionTypes.UPDATE_ORGANIZATION_SUCCESS, ActionTypes.UPDATE_ORGANIZATION_FAILED]);
  if (updateAction.type === ActionTypes.UPDATE_ORGANIZATION_SUCCESS) {
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('organization') }));
  }
}

function* deleteOrganization(action) {
  yield fork(
    saga.handleAPIRequest,
    API.deleteOrganization,
    action.payload.data
  );
  yield take(ActionTypes.DELETE_ORGANISATION_SUCCESS);
  yield call(successNotify, I18n.t('delete_success', { type: I18n.t('organization') }));
  yield delay(200);
  yield call(listOrganization, {
    payload: {
      data: {
        size: action.payload.size,
        page: action.payload.page,
        count: action.payload.count
      }
    }
  });
}

function* deleteService(action) {
  yield fork(saga.handleAPIRequest, API.deleteService, action.payload.data);
  yield take(ActionTypes.DELETE_SERVICE_SUCCESS);
  yield call(successNotify, I18n.t('delete_success', { type: I18n.t('service') }));
  yield delay(200);
  yield call(listService, {
    payload: {
      data: {
        size: action.payload.size,
        page: action.payload.page,
        count: action.payload.count,
        serviceProviderId: action.payload.providerId
      }
    }
  });
}

function* loadAPIProviders() {
  yield call(saga.handleAPIRequest, API.loadAPIProviders);
}

function* loadParentOrganizations() {
  yield call(saga.handleAPIRequest, API.loadParentOrganizations);
}

function* loadOrganizationTypes() {
  yield call(saga.handleAPIRequest, API.loadOrganizationTypes);
}
function* loadOrganizationRoleTypes(action) {
  const { type } = action.payload.data;
  yield fork(saga.handleAPIRequest, API.loadOrganizationRoleTypes);
  if (type === 'dropdown') {
    const response = yield take(ActionTypes.LOAD_ORGANIZATION_ROLE_TYPES_SUCCESS);
    yield put(Actions.setOrgRoleType(response.payload?.data));
  }

}
function* updateCurrentOrganizationDetails(action) {
  yield call(
    saga.handleAPIRequest,
    API.updateCurrentOrganizationDetails,
    action.payload.data
  );
}

function* loadUserGroupAssignUsersList(action) {
  yield call(
    saga.handleAPIRequest,
    API.loadUserGroupAssignUsersList,
    action.payload.roleId,
    action.payload.orgId
  );
}

function* loadOrganizationAPIProviders(action) {
  yield call(
    saga.handleAPIRequest,
    API.loadOrganizationAPIProviders,
    action.payload.id
  );
}

function* getEmailProviders(action) {
  yield call(
    saga.handleAPIRequest,
    API.loadEmailProviders,
    action.payload.id,
    action.payload.emailApiType
  );
}

function* getSmsProviders(action) {
  yield call(
    saga.handleAPIRequest,
    API.loadSmsProviders,
    action.payload.id,
    action.payload.smsApiType
  );
}

function* getNotificationProviders(action) {
  yield call(
    saga.handleAPIRequest,
    API.loadNotificationProviders,
    action.payload.id,
    action.payload.notificationApiType
  );
}

function* getPaymentApiProvider(action) {
  yield call(
    saga.handleAPIRequest,
    API.loadPaymentGatewayApiProviders,
    action.payload.id,
    action.payload.paymentApiType
  );
}

function* updateApiProvider(action) {
  yield fork(
    saga.handleAPIRequest,
    API.updateApiProviders,
    action.payload.id,
    action.payload.data
  );
  yield take(ActionTypes.UPDATE_API_PROVIDER_SUCCESS);
  yield call(successNotify, I18n.t('update_success', { type: I18n.t('api_provider') }));
}

function* postApiProvider(action) {
  yield fork(
    saga.handleAPIRequest,
    API.postApiProviders,
    action.payload.id,
    action.payload.data
  );
  yield take(ActionTypes.POST_API_PROVIDER_SUCCESS);
  yield call(successNotify, I18n.t('save_success', { type: I18n.t('api_provider') }));
}
function* saveOrganizationAPIProviders(action) {
  const selectedOrgInfo = yield select(getSelectedOrgInfo);
  const { id: organizationId } = selectedOrgInfo;
  const body = { ...action.payload.data };
  _.set(body, 'apiProviderId', getSelectId(_.get(body, 'apiProvider', null)));
  delete body.apiProvider;
  if (_.has(body, 'id')) {
    let apiKeyProviderId = _.get(body, 'id', null);
    delete body.id;
    yield fork(saga.handleAPIRequest, API.updateOrganizationAPIProviders, {
      organizationId,
      apiKeyProviderId,
      body
    });
    yield take(ActionTypes.UPDATE_ORGANIZATION_API_PROVIDERS_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('api_provider') }));
  } else {
    yield fork(saga.handleAPIRequest, API.saveOrganizationAPIProviders, {
      organizationId,
      body
    });
    yield take(ActionTypes.SAVE_ORGANIZATION_API_PROVIDERS_SUCCESS);
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('api_provider') }));
  }
  yield delay(1200);
  yield call(loadOrganizationAPIProviders);
}
function* fetchModulesForChk(action) {
  yield fork(
    saga.handleAPIRequest,
    API.fetchModulesForChk,
    action.payload.data
  );
}
function* fetchRolesForListBox(action) {
  yield fork(saga.handleAPIRequest, API.fetchRolesList, action.payload.data);
  // const { type } = action.payload.data;
  // yield fork(saga.handleAPIRequest, API.loadOrganizationRoleTypes);
  // if (type === 'dropdown') {
  //   const response = yield take(ActionTypes.LOAD_ORGANIZATION_ROLE_TYPES_SUCCESS);
  //   yield put(Actions.setOrgRoleType(response.payload.data));
  // }
}
function* fetchRoleAssignedModulesForCHK(action) {
  yield fork(
    saga.handleAPIRequest,
    API.fetchAssignedModuleForCHK,
    action.payload.data
  );
}
function* saveModuleInCHK(action) {
  let data = _.get(action, 'payload.data', {});
  let { organizationId, formData: assignModulesView } = data;
  let organizationDetails = yield select(getOrganization);
  let { assignModuleList } = organizationDetails;
  let requestBody = formatCheckBoxesForAPI(
    assignModulesView || [],
    assignModuleList.data || []
  );
  yield fork(
    saga.handleAPIRequest,
    API.saveModules,
    organizationId,
    requestBody
  );
  yield take(ActionTypes.SAVE_MODULES_FOR_CHK_SUCCESS);
  yield call(successNotify, I18n.t('update_success', { type: I18n.t('module') }));
}
function* saveModuleInCHKInLocation(action) {
  let data = _.get(action, 'payload.data', {});
  let { organizationId, providerId, formData: assignLocation } = data;
  let organizationDetails = yield select(getOrganization);
  let { assignedLocation } = organizationDetails;
  let requestBody = formatCheckBoxesForAPI(
    assignLocation || [],
    assignedLocation.data || []
  );
  yield fork(
    saga.handleAPIRequest,
    API.saveAssignedLocation,
    organizationId,
    requestBody,
    providerId
  );
  yield take(ActionTypes.SAVE_MODULES_FOR_CHK_SUCCESS_IN_LOCATION);
  yield call(successNotify, I18n.t('update_success', { type: I18n.t('location') }));
}

function* RoleAssignedModuleSave(action) {
  let data = _.get(action, 'payload.data', {});
  let { organizationId, Roles, moduleMapping } = data;
  let organizationDetails = yield select(getOrganization);
  let { roleAssignModuleList } = organizationDetails;
  let requestBody = formatCheckBoxesForAPI(
    moduleMapping || [],
    roleAssignModuleList.data || []
  );
  yield fork(
    saga.handleAPIRequest,
    API.saveAssignedModules,
    organizationId,
    Roles,
    requestBody
  );
  yield take(ActionTypes.SAVE_ASSIGNED_MODULES_SUCCESS);
  yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('module') }));
}
function* fetchTemplatesForList(action) {
  yield fork(
    saga.handleAPIRequest,
    API.fetchTemplatesforLST,
    action.payload.data
  );
}
function* fetchSelectedTemplatesForList(action) {
  let orgId = _.get(action, 'payload.data', {});
  // const language = yield select(getDefaultLanguage);
  // const { id: langId } = language;
  let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.ASSIGN_TEMPLATE);
  let { passedColumns } = additionalProps;
  let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.ASSIGN_TEMPLATE);

  yield fork(saga.handleAPIRequest, API.fetchSelectedTemplatesforLST, { params: { ...tableProps }, orgId });
  const TemplateAction = yield take([ActionTypes.FETCH_SELECTED_TEMPLATE_FOR_LST_SUCCESS, ActionTypes.FETCH_SELECTED_TEMPLATE_FOR_LST_FAILURE]);

  let templateTableData = getPayloadData(TemplateAction.payload, {});
  let allFilterValues = getAllFilterOptionValues(passedColumns, templateTableData.content || []);

  if (TemplateAction.type === ActionTypes.FETCH_SELECTED_TEMPLATE_FOR_LST_SUCCESS) {
    yield call(setPaginationInCommonTableProps, TABLE_IDS.ASSIGN_TEMPLATE, getPayloadData(TemplateAction.payload, {}));

    yield put(setInitialFilterList({ key: TABLE_IDS.ASSIGN_TEMPLATE, initialfilterOptions: allFilterValues }));
    yield put(setTableDropdownFilterList({ key: TABLE_IDS.ASSIGN_TEMPLATE, filterOptionsList: allFilterValues }));

  }
}
function* getTemplateForOrg() {
  yield call(saga.handleAPIRequest, API.getTemplateForOrgamisation);
}
function* getTemplateforTypeId(action) {
  yield call(saga.handleAPIRequest, API.getTemplateByTypeId, action.payload.id);
}
function* getServiceProvider() {
  yield call(saga.handleAPIRequest, API.listServiceProvider);
}
function* postSeviceProvider(action) {
  yield fork(
    saga.handleAPIRequest,
    API.postServiceProvider,
    action.payload.data,
    action.payload.id
  );
  yield take(ActionTypes.POST_SERVICE_PROVIDERS_SUCCESS);
  yield call(successNotify, I18n.t('save_success', { type: I18n.t('service_provider') }));
  yield call(
    history.push,
    `${PATH.ORGANIZATION}/${action.payload.id}/serviceprovider`
  );
}

function* getAllServiceProviders(action) {
  yield call(
    saga.handleAPIRequest,
    API.listAllServiceProviders,
    action.payload.data,
    action.payload.id
  );
}

function* getServiceProviderById(action) {
  yield call(
    saga.handleAPIRequest,
    API.getServiceProvidersById,
    action.payload.id,
    action.payload.orgId
  );
}

function* editServiceProvier(action) {
  yield fork(
    saga.handleAPIRequest,
    API.editServiceProvider,
    action.payload.data,
    action.payload.id,
    action.payload.providerId
  );
  yield take(ActionTypes.SERVICE_PROVIDER_EDIT_SUCCESS);
  yield call(successNotify, I18n.t('update_success', { type: I18n.t('service_provider') }));
}

function* getAssignedLocations(action) {
  yield call(
    saga.handleAPIRequest,
    API.listAssignedLocations,
    action.payload.orgId,
    action.payload.providerId
  );
}
const getServiceTypeName = () => {
  let commonDetails = JSON.parse(localStorage.getItem('persist:root'));
  let providerTypeData = JSON.parse(commonDetails.common);
  let provider = providerTypeData?.serviceProviderTypeData?.serviceProviderTypeName || '';
  return provider;
};

function* getAllRolesForOrg() {
  let provider = getServiceTypeName();
  yield call(saga.handleAPIRequest, API.getAllRolesForOrg, provider);
}

function* getUserBasedOnRoleIds(action) {
  yield call(
    saga.handleAPIRequest,
    API.getUserBasedOnRoleIds,
    action.payload.roleId,
    action.payload.orgId
  );
}

function* updateAssignServiceAdmins(action) {
  let data = _.get(action, 'payload.data', {});
  let { formData: assignedServiceAdminView } = data;
  let organizationDetails = yield select(getOrganization);
  let { getAssignedServiceAdmin } = organizationDetails;
  let requestBody = formatCheckBoxesForAPI(
    assignedServiceAdminView || [],
    getAssignedServiceAdmin.data || []
  );
  yield fork(
    saga.handleAPIRequest,
    API.updateAssignServiceAdmins,
    requestBody,
    action.payload.id,
    action.payload.providerId,
    action.payload.roleId
  );
  yield take(ActionTypes.UPDATE_ASSIGN_SERVICE_ADMIN_SUCCESS);
  yield call(successNotify, I18n.t('update_success', { type: I18n.t('service_worker') }));
}

function* updateAssignedWorkerLocation(action) {
  let data = _.get(action, 'payload.data', {});
  let { formData: getLocationUnderUserRequestView } = data;
  let organizationDetails = yield select(getOrganization);
  let { getLocationUnderUserRequest } = organizationDetails;
  let requestBody = formatCheckBoxesForAPI(
    getLocationUnderUserRequestView || [],
    getLocationUnderUserRequest.data || []
  );
  yield fork(
    saga.handleAPIRequest,
    API.updateAssignedWorkerLocation,
    requestBody,
    action.payload.orgId,
    action.payload.providerId,
    action.payload.roleId,
    action.payload.userId
  );
  yield take(ActionTypes.UPDATE_ASSIGNED_WORKER_LOCATION_SUCCESS);
  yield call(successNotify, I18n.t('update_success', { type: I18n.t('workers_location') }));
}

function* getAssignedServiceAdmins(action) {
  yield fork(
    saga.handleAPIRequest,
    API.getAssignedServiceAdmin,
    action.payload.id,
    action.payload.providerId,
    action.payload.roleId
  );
}

function* getAssignedServiceAdminDropDown(action) {
  yield fork(
    saga.handleAPIRequest,
    API.getAssignedServiceAdminDropDown,
    action.payload.type,
    action.payload.id,
    action.payload.providerId,
    action.payload.roleId
  );
}

function* getAssignedSuperVisor(action) {
  yield fork(
    saga.handleAPIRequest,
    API.getAssignedSuperVisor,
    action.payload.id
  );
}

function* getAssignedWorkers(action) {
  yield fork(saga.handleAPIRequest, API.getAssignedWorkers, action.payload.id);
}

function* getAssignedWorkersOnly(action) {
  yield call(
    saga.handleAPIRequest,
    API.getAssignedWorkersOnly,
    action.payload.id
  );
}

function* getLocationBasedOnWorkers(action) {
  yield call(
    saga.handleAPIRequest,
    API.getLocationBasedOnWorkers,
    action.payload.id
  );
}

function* getOldSuperVisor() {
  yield call(saga.handleAPIRequest, API.getOldSuperVisor);
}
function* getNewSuperVisor() {
  yield call(saga.handleAPIRequest, API.getNewSuperVisor);
}

function* getUserBYRoleId(action) {
  yield call(
    saga.handleAPIRequest,
    API.getUserBYRoleId,
    action.payload.orgId,
    action.payload.providerId,
    action.payload.roleId
  );
}

function* updateAssignedLocation(action) {
  let data = _.get(action, 'payload.data', {});
  let { formData: assignedLocationView } = data;
  let organizationDetails = yield select(getOrganization);
  let { assignedLocation } = organizationDetails;
  let requestBody = formatCheckBoxesForAPI(
    assignedLocationView || [],
    assignedLocation.data || []
  );
  yield fork(
    saga.handleAPIRequest,
    API.updateAssignedLocation,
    requestBody,
    action.payload.orgId,
    action.payload.providerId
  );
  yield take(ActionTypes.UPDATE_ASSIGNED_LOCATIONS_SUCCESS);
  yield call(successNotify, I18n.t('update_success', { type: I18n.t('location') }));
}

function* updateAllUserUnderOrg(action) {
  let data = _.get(action, 'payload', {});
  let { id, providerId, roleId, userId, data: currentWorkers } = data;
  let organizationDetails = yield select(getOrganization);
  let { getAllUserUnderorganization: { data: existingWorkers = [] } } = organizationDetails;
  let requestBody = formatCheckBoxesForAPI(currentWorkers, existingWorkers);
  yield fork(saga.handleAPIRequest, API.updateAllUserUnderOrg,
    requestBody,
    id,
    providerId,
    roleId,
    userId
  );
  const responseAction = yield take([ActionTypes.UPDATE_ALL_USER_UNDER_ORG_SUCCESS, ActionTypes.UPDATE_ALL_USER_UNDER_ORG_FAILURE]);
  if (responseAction.type === ActionTypes.UPDATE_ALL_USER_UNDER_ORG_SUCCESS) {
    yield put(CommonAction(commonActionTypes.RESET_FORM_CHANGE));
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('worker') }));
  }
}

function* getLocationUnderUser(action) {
  yield call(
    saga.handleAPIRequest,
    API.getLocationUnderUser,
    action.payload.id,
    action.payload.providerId,
    action.payload.userId,
    action.payload.roleId
  );
}

function* getAllUsersUnderOrganizations(action) {
  yield call(
    saga.handleAPIRequest,
    API.getAllUsersUnderOrganizations,
    action.payload.id,
    action.payload.providerId,
    action.payload.userId,
    action.payload.roleId
  );
}

function* deleteServiceProvider(action) {
  yield fork(
    saga.handleAPIRequest,
    API.deleteServiceProvider,
    action.payload.orgId,
    action.payload.id
  );
  yield take(ActionTypes.DELETE_SERVICE_PROVIDER_SUCCESS);
  yield call(successNotify, I18n.t('delete_success', { type: I18n.t('service_provider') }));
  let actionToPass = {
    payload: {
      data: {
        size: 10,
        page: 0
      },
      id: action.payload.orgId
    }
  };

  yield call(getAllServiceProviders, actionToPass);
}

function* saveTemplateInList(action) {
  let data = _.get(action, 'payload.data', {});
  const { organizationId } = data;
  let actionToPass = {
    payload: {
      data: organizationId
    }
  };
  yield fork(saga.handleAPIRequest, API.saveTemplatesInList, data);
  yield take(ActionTypes.SAVE_TEMPLATE_IN_LIST_SUCCESS);
  yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('templates') }));
  yield delay(500);
  yield call(fetchSelectedTemplatesForList, actionToPass);
}

function* listJsonDataForOrgs(action) {
  const { payload: { searchValue, searchKey, columnName } = {} } = action;
  yield fork(saga.handleAPIRequest, API.listJsonDataForOrgs, {
    ...FILTER_API_PROPS,
    searchValue,
    searchKey
  });
  const filterResponse = yield take(
    ActionTypes.LIST_JSON_DATA_FOR_ORG_FILTER_SUCCESS
  );
  yield put(
    Actions.storeJsonDataForOrgs({
      [columnName]: getPayloadData(filterResponse.payload)
    })
  );
}

function* listServiceProviderDetail() {
  // let page = _.get(action, 'payload.data.page', DEFAULT_TABLE_PROPS.pageNo);
  // let size = _.get(action, 'payload.data.size', DEFAULT_TABLE_PROPS.pageSize);
  // const language = yield select(getDefaultLanguage);
  // const { id: langId } = language;
  let preData = {
    templateTypeIds: TEMPLATE_TYPE_IDS[TEMPLATE_TYPES.SERVICE_PROVIDER],
    uiKeys: 'DUMMY',
    type: 'card'
  };
  yield call(saga.handleAPIRequest, API.fetchServiceProviderDetails, {
    ...preData
  });
}
function* listJsonDataForService(action) {
  const { payload: { searchValue, searchKey, columnName } = {} } = action;
  yield fork(saga.handleAPIRequest, API.listJsonDataForService, {
    ...FILTER_API_PROPS,
    searchValue,
    searchKey
  });
  const filterResponse = yield take(
    ActionTypes.LIST_JSON_DATA_FOR_SERVICE_FILTER_SUCCESS
  );
  yield put(
    Actions.storeJsonDataForService({
      [columnName]: getPayloadData(filterResponse.payload)
    })
  );
}

function* listResidenceCategory() {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  yield call(saga.handleAPIRequest, API.listResidenceCategory, langId);
}

function* listServiceCategory() {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  yield call(saga.handleAPIRequest, API.listServiceCategory, langId);
}

function* listServiceType() {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  yield call(saga.handleAPIRequest, API.listServiceType, langId);
}

function* listPaymentCollection() {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  yield call(saga.handleAPIRequest, API.listPaymentCollection, langId);
}

function* listPaymentInterval() {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  yield call(saga.handleAPIRequest, API.listPaymentInterval, { langId });
}

function* listRateType() {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  yield call(saga.handleAPIRequest, API.listRateType, langId);
}

function* listServiceInterval() {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  yield call(saga.handleAPIRequest, API.listServiceInterval, langId);
}

function* listServiceChargeSlab() {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  yield call(saga.handleAPIRequest, API.listServiceChargeSlab, langId);
}
function* sentObjectForService(action) {
  let id = action.payload.id;
  let providerId = action.payload.providerId;
  yield fork(
    saga.handleAPIRequest,
    API.sentObjectForService,
    action.payload.data
  );
  yield take(ActionTypes.SENT_OBJECT_FOR_SERVICE_SUCCESS);
  yield call(successNotify, I18n.t('save_success', { type: I18n.t('service') }));
  yield call(
    history.push,
    `${PATH.ORGANIZATION}/${id}/serviceprovider/${providerId}/service`
  );
}

function* editObjectForService(action) {
  let id = action.payload.id;
  let providerId = action.payload.providerId;
  // const language = yield select(getDefaultLanguage);
  // const { id: langId } = language;
  yield fork(
    saga.handleAPIRequest,
    API.editObjectForService,
    action.payload.data,
    action.payload.serviceId
  );
  yield take(ActionTypes.EDIT_OBJECT_FOR_SERVICE_SUCCESS);
  yield call(successNotify, I18n.t('update_success', { type: I18n.t('service') }));
  yield call(
    history.push,
    `${PATH.ORGANIZATION}/${id}/serviceprovider/${providerId}/service`
  );
}

function* listBundledOrServiceConfig(action) {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  if (action.payload.data === 2) {
    yield call(saga.handleAPIRequest, API.listBundledSeriveConfig, langId);
  } else if (action.payload.data === 1) {
    yield call(saga.handleAPIRequest, API.listSeriveConfig, langId);
  }
}
function* getWardsUnderProviderId(action) {
  yield call(saga.handleAPIRequest, API.getWardsUnderProvider, action.payload.orgId, action.payload.providerId);
}

function* getSuperVisors(action) {
  yield call(saga.handleAPIRequest, API.getSuperVisor, action.payload.orgId, action.payload.providerId);
}
function* getToGtWithSuperVisorId(action) {
  const { orgId, providerId, superVisorId } = action.payload;
  yield fork(saga.handleAPIRequest, API.getToGtWithSuperVisorId, orgId, providerId, superVisorId);
  let currentAction = yield take([ActionTypes.GET_TO_GT_WITH_SUPER_VISOR_ID_SUCCESS]);
  let response = formatMemberTureArray(getPayloadData(currentAction.payload, []));
  yield put(Actions.setToGT({ [superVisorId]: response }));

}

function* getGtBasedOnWardId(action) {
  const { wardId, providerId } = action.payload;
  yield fork(saga.handleAPIRequest, API.getGtBasedOnWard, providerId, wardId);
  let currentAction = yield take([ActionTypes.GET_GT_BASED_ON_WARD_ID_SUCCESS]);
  let response = getPayloadData(currentAction.payload, []);
  yield put(Actions.setFromGT({ [wardId]: response }));

}
function* postReAssignGt(action) {
  const data = action.payload.data;
  if (data?.allSelected === true || data?.customerEnrollmentIds.length > 0) {
    yield fork(saga.handleAPIRequest, API.postReAssignGt, action.payload.data, action.payload.fromGtId, action.payload.toGtId);
    yield take(ActionTypes.POST_RE_ASSIGN_GT_SUCCESS);
    yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('gt') }));
    yield put(Actions.resetReAssignGt());
  } else {
    let message = I18n.t('missing_customer_data');
    yield call(errorNotify, message, 5000);
  }

}


function* getCustomersBasedOnGT(action) {
  yield call(saga.handleAPIRequest, API.getCustomerBasedOnGt, { data: action.payload.data });
}


function* updateReAssignGt(action) {
  yield fork(saga.handleAPIRequest, API.updateReAssignSuperVisor, action.payload.data, action.payload.currentSuperVisorId, action.payload.newSupervisorId, action.payload.id, action.payload.providerId);
  yield take(ActionTypes.UPDATE_RE_ASSIGN_SUPER_VISOR_SUCCESS);
  yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('supervisor') }));
  yield call(window.location.reload());

}

function* listServiceById(action) {
  yield call(
    saga.handleAPIRequest,
    API.listServiceById,
    action.payload.serviceId
  );
}
function* toggleStatus(action) {
  let id = _.get(action, 'payload.data.val.1', null);
  let status = !_.get(action, 'payload.data.val.0', false);
  yield fork(
    saga.handleAPIRequest,
    API.toggleStatus,
    { id, status }
  );
  yield take(ActionTypes.TOGGLE_STATUS_SUCCESS);
  yield call(successNotify, I18n.t('update_success', { type: I18n.t('service') }));
  yield call(saga.handleAPIRequest, API.listService, {
    data: { ...action.payload.data, size: 10, page: 0 }
  });
}

function* loadTemplates(action) {
  let id = _.get(action, 'payload.data', null);
  yield call(saga.handleAPIRequest, API.loadTemplates, { id });
}
function* loadServices(action) {
  let id = _.get(action, 'payload.data', null);
  yield call(saga.handleAPIRequest, API.loadServices, { id });
}

function* fetchOrganizationAssignUsers() {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.ASSIGN_ORG_USERS);
  let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.ASSIGN_ORG_USERS);

  let { additionalFilters, passedColumns } = additionalProps;
  let { organizationId, ...restAdditionalInfo } = additionalFilters;
  yield fork(saga.handleAPIRequest, API.fetchOrganizationAssignUsers, { params: { ...tableProps, ...restAdditionalInfo, langId }, organizationId });
  const usersListAction = yield take([ActionTypes.FETCH_ORGANIZATION_ASSIGN_USERS_SUCCESS, ActionTypes.FETCH_ORGANIZATION_ASSIGN_USERS_FAILURE]);
  let userTableData = getPayloadData(usersListAction.payload, {});
  let allFilterValues = getAllFilterOptionValues(passedColumns, _.get(userTableData, 'content', []));

  if (usersListAction.type === ActionTypes.FETCH_ORGANIZATION_ASSIGN_USERS_SUCCESS) {
    yield call(setPaginationInCommonTableProps, TABLE_IDS.ASSIGN_ORG_USERS, getPayloadData(usersListAction.payload, {}));
    yield put(setInitialFilterList({ key: TABLE_IDS.ASSIGN_ORG_USERS, initialfilterOptions: allFilterValues }));
    yield put(setTableDropdownFilterList({ key: TABLE_IDS.ASSIGN_ORG_USERS, filterOptionsList: allFilterValues }));
  }
}

function* getSwSuperVisorForWard(action) {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  const { wardId, orgId, providerId } = action.payload.data;
  yield call(saga.handleAPIRequest, API.getSwSuperVisorFromWard, { langId, wardId, orgId, providerId });
}

function* getServiceWorkerFromSwSuperVisor(action) {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  const { swSuperVisorId, wardId, orgId, providerId } = action.payload.data;
  yield call(saga.handleAPIRequest, API.getServiceWorkerFromSwSuperVisor, { swSuperVisorId, langId, wardId, orgId, providerId });
}
function* submitReAssignSupervisorDatas(action) {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  const { wardId, oldSuperVisorId, newSupervisorId, organizationid, providerId } = action.payload.data;
  yield fork(saga.handleAPIRequest, API.updateReAssignSupervisorData, { oldSuperVisorId, langId, wardId, newSupervisorId, organizationid, providerId });
  yield take(ActionTypes.SUBMIT_RE_ASSIGN_SUPERVISOR_DATA_SUCCESS);
  yield call(successNotify, I18n.t('re_assigned_success', { type: I18n.t('supervisor') }));
}
function* submitReAssignWorkerDatas(action) {
  const { wardId, oldServiceWorkerId, newServiceWorkerId, organizationid, providerId, superVisorId } = action.payload.data;
  yield fork(saga.handleAPIRequest, API.updateReAssignWorkerData, { oldServiceWorkerId, wardId, newServiceWorkerId, organizationid, providerId, superVisorId });
  yield take(ActionTypes.SUBMIT_RE_ASSIGN_WORKER_DATA_SUCCESS);
  yield call(successNotify, I18n.t('re_assigned_success', { type: I18n.t('worker') }));


}
function* fetchAssignCustomerToServiceWorker() {
  let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER);
  let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER);

  const { additionalFilters, passedColumns } = additionalProps;
  const { supervisorId, organizationId, wardId, serviceProviderId, gtId, member, ...restAdditionalInfo } = additionalFilters;
  yield fork(saga.handleAPIRequest, API.getCustomerToServiceWorkerData, { supervisorId, organizationId, wardId, serviceProviderId, gtId, params: { ...tableProps, ...restAdditionalInfo, member } });

  const organizationAssignCustomerToServiceWorkerAction = yield take([ActionTypes.FETCH_ORGANIZATION_ASSIGN_CUSTOMER_TO_SERVICE_WORKER_SUCCESS, ActionTypes.FETCH_ORGANIZATION_ASSIGN_CUSTOMER_TO_SERVICE_WORKER_FAILURE]);
  let orgTableData = getPayloadData(organizationAssignCustomerToServiceWorkerAction.payload, {});
  orgTableData = _.get(orgTableData, 'content', []);
  orgTableData?.map((item) => {
    item.mobile = JSON.stringify(item.mobile);
  });
  let allFilterValues = getAllFilterOptionValues(passedColumns, orgTableData);
  if (organizationAssignCustomerToServiceWorkerAction.type === ActionTypes.FETCH_ORGANIZATION_ASSIGN_CUSTOMER_TO_SERVICE_WORKER_SUCCESS) {
    yield call(setPaginationInCommonTableProps, TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER, getPayloadData(organizationAssignCustomerToServiceWorkerAction.payload, {}));
    yield put(setInitialFilterList({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER, initialfilterOptions: allFilterValues }));
    yield put(setTableDropdownFilterList({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER, filterOptionsList: allFilterValues }));

  }

}
function* submitCustomerNumberForCustomerToServiceWorker(action) {
  const { customerToServiceWorkerObj, organizationId, serviceProviderId, supervisorId, gtId, allSelected, wardId } = action.payload.data;
  yield fork(saga.handleAPIRequest, API.submitCustomerNumberForAssignCustomerToServiceWorker, { customerToServiceWorkerObj, organizationId, serviceProviderId, supervisorId, gtId, allSelected, wardId });
  yield take(ActionTypes.SUBMIT_CUSTOMER_NUMBER_FOR_CUSTOMER_TO_SERVICE_WORKER_SUCCESS);
  yield put(resetTableDropdownFilterList({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER }));
  yield put(setSelectedIds({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER, selectedIds: [] }));
  yield put(Actions.fetchOrganizationAssignGT());
  yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('service_worker') }));

}

function* serviceProviderContactForm(action) {
  const { surveyId, templateTypeId, id: organizationId, providerId } = action.payload.data;
  const payload = {
    data: {
      serviceProviderId: providerId,
      surveyId,
      templateTypeId,
      organizationId,
      toggleModalVisibility: (data) => toggleDownloadingSurveyDataModalVisibility(data)
    }
  };
  const initializer = {
    templateTypeId,
    surveyDataKey: surveyId,
    surveyFinishedAction: function* surveyFinishedAction() {
      // yield call([dfgSaga, 'syncInprogressData']);
      yield put(syncInprogressData());
      const syncAction = yield take([DFGActionTypes.SYNC_INPROGRESS_SURVEY_API_SUCCESS, DFGActionTypes.SYNC_INPROGRESS_SURVEY_API_FAILED]);
      if (syncAction.type === DFGActionTypes.SYNC_INPROGRESS_SURVEY_API_SUCCESS) {
        yield call([SurveyDataRepository, 'deleteSyncedData'], true, { descriptor: 'templateTypeId' });
      }
      // navigate after DFG
      yield call(successNotify, I18n.t('update_success', { type: I18n.t('contact_details') }));
      yield call(history.push, `${PATH.ORGANIZATION}/${organizationId}/serviceProvider`);
    },
    setResumeModalVisibility: (data) => setResumeModalVisibility(data)
  };
  let status = undefined;
  // loader flag
  yield put(Actions.serviceProviderContactDetailsTemplateLoadFlag(false));

  if (surveyId) {
    status = yield call([dfgSaga, 'editSyncedSurvey'], { payload });
  } else {
    if (organizationId && templateTypeId && providerId) {
      status = yield call([dfgSaga, 'fetchLatestTemplate'], { payload: { data: { organizationId, templateTypeId } } });
    } else {
      yield call([Swal, 'fire'], {
        title: 'Missing',
        html: `${(organizationId ? templateTypeId ? I18n.t('customer_enrollment_id') : I18n.t('template_type_id') : I18n.t('organization_id'))} ${I18n.t('missing')}`,
        icon: 'error'
      });
    }
  }
  if (status) {
    let activeTemplates = yield call([localStorage, 'getItem'], ORGANIZATION_SURVEY_TEMPLATE_ACTIVE_VERSION);
    activeTemplates = activeTemplates ? JSON.parse(activeTemplates) : {};
    initializer.version = _.get(activeTemplates, `${organizationId}.${templateTypeId}`, undefined);

    initializer.additionalInfo = {
      serviceProviderId: Number(providerId)
    };
    yield put(initializeDynamicForm(initializer));
    yield put(Actions.serviceProviderContactDetailsTemplateLoadFlag(true));
  }
}

function* fetchVendorDetails(action) {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;

  const { organizationId } = action.payload.data;
  let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_VENDOR);
  let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_VENDOR);
  let { passedColumns } = additionalProps;

  yield fork(saga.handleAPIRequest, API.fetchVendorDetails, { params: { ...tableProps, langId }, organizationId });

  const stateAction = yield take([ActionTypes.FETCH_VENDOR_DETAILS_SUCCESS, ActionTypes.FETCH_VENDOR_DETAILS_FAILURE]);
  let stateTableData = getPayloadData(stateAction.payload, {});
  let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

  if (stateAction.type === ActionTypes.FETCH_VENDOR_DETAILS_SUCCESS) {
    yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_VENDOR, getPayloadData(stateAction.payload, {}));
    yield put(setInitialFilterList({ key: TABLE_IDS.LIST_VENDOR, initialfilterOptions: allFilterValues }));
    yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_VENDOR, filterOptionsList: allFilterValues }));
  }
}
function* saveVendor(action) {
  const { id, assignVendorData } = action.payload.data;
  yield fork(saga.handleAPIRequest, API.saveVendor, { id, assignVendorData });
  yield take(ActionTypes.SAVE_VENDOR_DETAILS_SUCCESS);
  yield call(successNotify, I18n.t('save_success', { type: I18n.t('assign_item') }));
  yield call(history.push, `${PATH.ORGANIZATION}/${id}/assignVendorItem`);
}
function* deleteVendor(action) {
  const { id, orgId: organizationId } = action.payload.data;
  yield fork(saga.handleAPIRequest, API.deleteVendor, { id, organizationId });
  yield take(ActionTypes.DELETE_VENDOR_DETAILS_SUCCESS);
  yield call(successNotify, I18n.t('delete_success', { type: I18n.t('assign_item') }));
  yield call(fetchVendorDetails, {
    payload: {
      data: {
        size: action.payload.size,
        page: action.payload.page,
        count: action.payload.count,
        organizationId: organizationId
      }
    }
  });
}
function* fetchVendorById(action) {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  const { id, vendorId } = action.payload.data;
  yield call(saga.handleAPIRequest, API.fetchVendorById, { langId, id, vendorId });
}
function* updateVendorData(action) {
  const { id, vendorId, assignVendorData } = action.payload.data;

  yield fork(saga.handleAPIRequest, API.updateVendor, { id, vendorId, assignVendorData });
  yield take(ActionTypes.UPDATE_VENDOR_DETAILS_SUCCESS);
  yield call(successNotify, I18n.t('update_success', { type: I18n.t('assign_item') }));
  yield call(history.push, `${PATH.ORGANIZATION}/${id}/assignVendorItem`);
}
function* getAllItems() {
  yield call(saga.handleAPIRequest, API.getAllItem);

}
function* getAllItemType() {
  yield call(saga.handleAPIRequest, API.getAllItemType);

}
function* getAllWardsUnderOrg() {
  // const { id } = action.payload.id;
  // yield call(saga.handleAPIRequest, API.getAllWards, { id });

}

function* fetchAssignOrganization() {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.ASSIGN_ORGANIZATION);
  let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.ASSIGN_ORGANIZATION);

  let { additionalFilters, passedColumns } = additionalProps;
  let { organizationId, ...restAdditionalInfo } = additionalFilters;
  yield fork(saga.handleAPIRequest, API.fetchAssignOrganization, { params: { ...tableProps, ...restAdditionalInfo, langId }, organizationId });
  const usersListAction = yield take([ActionTypes.FETCH_ASSIGN_ORGANIZATION_SUCCESS, ActionTypes.FETCH_ASSIGN_ORGANIZATION_FAILURE]);
  let userTableData = usersListAction?.payload?.data?.data?.content || [];
  let allFilterValues = getAllFilterOptionValues(passedColumns, userTableData);

  if (usersListAction.type === ActionTypes.FETCH_ASSIGN_ORGANIZATION_SUCCESS) {
    yield call(setPaginationInCommonTableProps, TABLE_IDS.ASSIGN_ORGANIZATION, getPayloadData(usersListAction.payload, {}));
    yield put(setInitialFilterList({ key: TABLE_IDS.ASSIGN_ORGANIZATION, initialfilterOptions: allFilterValues }));
    yield put(setTableDropdownFilterList({ key: TABLE_IDS.ASSIGN_ORGANIZATION, filterOptionsList: allFilterValues }));
  }

}

function* fetchAdditionalBasicDetailsById(action) {
  const { organizationId } = action.payload.data;
  yield call(saga.handleAPIRequest, API.fetchAdditionalBasicDetailsById, { organizationId });
}

function* fetchAdditionalBasicDetailsWards(action) {
  const { organizationId } = action.payload.data;
  yield call(saga.handleAPIRequest, API.fetchAdditionalBasicDetailsWards, { organizationId });
}

function* submitAdditionalBasicDetails(action) {
  const { id, organizationId, ward, ...data } = action.payload.data;
  let request = { ...data, wardId: ward.id };
  if (id) {
    request.id = id;
    yield fork(saga.handleAPIRequest, API.updateAdditionalBasicDetails, { organizationId, id, ...request });
    const updateAction = yield take([ActionTypes.SAVE_ADDITIONAL_BASIC_DETAILS_SUCCESS, ActionTypes.SAVE_ADDITIONAL_BASIC_DETAILS_FAILURE]);
    if (updateAction.type === ActionTypes.SAVE_ADDITIONAL_BASIC_DETAILS_SUCCESS) {
      yield call(successNotify, I18n.t('update_success', { type: `${I18n.t('mcf')} ${I18n.t('details')}` }));
    }
  } else {
    yield fork(saga.handleAPIRequest, API.saveAdditionalBasicDetails, { organizationId, ...request });
    const saveAction = yield take([ActionTypes.SAVE_ADDITIONAL_BASIC_DETAILS_SUCCESS, ActionTypes.SAVE_ADDITIONAL_BASIC_DETAILS_FAILURE]);
    if (saveAction.type === ActionTypes.SAVE_ADDITIONAL_BASIC_DETAILS_SUCCESS) {
      yield call(successNotify, I18n.t('save_success', { type: `${I18n.t('mcf')} ${I18n.t('details')}` }));
    }
  }
}
function* fetchComplaintEscalationMatrix(action) {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  const orgId = action.payload.data;

  let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.COMPLAINT_EM);
  let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.COMPLAINT_EM);
  let { passedColumns } = additionalProps;
  yield fork(saga.handleAPIRequest, API.fetchComplaintEscalation, { params: { ...tableProps, langId }, orgId: orgId });
  const stateAction = yield take([ActionTypes.COMPLAINT_EM_LIST_SUCCESS, ActionTypes.COMPLAINT_EM_LIST_FAILED]);
  let stateTableData = getPayloadData(stateAction.payload, {});
  let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

  if (stateAction.type === ActionTypes.COMPLAINT_EM_LIST_SUCCESS) {
    yield call(setPaginationInCommonTableProps, TABLE_IDS.COMPLAINT_EM, getPayloadData(stateAction.payload, {}));
    yield put(setInitialFilterList({ key: TABLE_IDS.COMPLAINT_EM, initialfilterOptions: allFilterValues }));
    yield put(setTableDropdownFilterList({ key: TABLE_IDS.COMPLAINT_EM, filterOptionsList: allFilterValues }));
  }
}
function* deleteComplaintEscalation(action) {
  const { id, cemId } = action?.payload;
  yield fork(saga.handleAPIRequest, API.deleteComplaintEscalation, { orgId: id, cemId });
  const currentActionType = yield take([ActionTypes.COMPLAINT_EM_DELETE_SUCCESS, ActionTypes.COMPLAINT_EM_DELETE_FAILED]);
  if (currentActionType.type === ActionTypes.COMPLAINT_EM_DELETE_SUCCESS) {
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('complaint_escalation_matrix') }));
    yield delay(200);
    yield call(fetchComplaintEscalationMatrix, {
      payload: {
        data: id
      }
    });
  }
}
function* fetchComplaintEscalationMatrixById(action) {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  const { orgId, cemId } = action?.payload;
  yield call(saga.handleAPIRequest, API.fetchComplaintEscalationById, { params: { langId }, orgId, cemId });
}
function* updateComplaintEscalationMatrix(action) {
  const { orgId, cemId, data } = action.payload;
  yield fork(saga.handleAPIRequest, API.updateComplaintEscalationById, { orgId, cemId, data });

  const currentActionType = yield take([ActionTypes.COMPLAINT_EM_UPDATE_SUCCESS, ActionTypes.COMPLAINT_EM_UPDATE_FAILED]);
  if (currentActionType.type === ActionTypes.COMPLAINT_EM_UPDATE_SUCCESS) {
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('complaint_escalation_matrix') }));
    yield call(history.push, `${PATH.ORGANIZATION}/${orgId}/ComplaintEscalationMatrix`);
  }
}
function* saveComplaintEscalationMatrix(action) {
  const { orgId, data } = action.payload;
  yield fork(saga.handleAPIRequest, API.saveComplaintEscalation, { orgId, data });

  const currentActionType = yield take([ActionTypes.COMPLAINT_EM_SAVE_SUCCESS, ActionTypes.COMPLAINT_EM_SAVE_FAILED]);
  if (currentActionType.type === ActionTypes.COMPLAINT_EM_SAVE_SUCCESS) {
    yield call(successNotify, I18n.t('save_success', { type: I18n.t('complaint_escalation_matrix') }));
    yield call(history.push, `${PATH.ORGANIZATION}/${orgId}/ComplaintEscalationMatrix`);
  }

}
function* listComplaints() {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  const type = 'dropdown';
  yield call(saga.handleAPIRequest, API.listComplaints, { params: { langId, type } });
}
function* listRoles() {
  yield call(saga.handleAPIRequest, API.listRoles);
}
function* listTemplate() {
  yield call(saga.handleAPIRequest, API.listTemplate);
}
function* listTemplateType() {
  yield call(saga.handleAPIRequest, API.listTemplateType);
}

function* fetchassignRole() {
  const language = yield select(getDefaultLanguage);
  const { id: langId } = language;
  let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.ASSIGN_ROLE);
  let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.ASSIGN_ROLE);

  let { additionalFilters, passedColumns } = additionalProps;
  let { organizationId, roleId, ...restAdditionalInfo } = additionalFilters;
  yield fork(saga.handleAPIRequest, API.fetchAssignRole, { params: { ...tableProps, ...restAdditionalInfo, langId }, organizationId, roleId });
  const usersListAction = yield take([ActionTypes.FETCH_ASSIGN_ROLE_IN_ORG_SUCCESS, ActionTypes.FETCH_ASSIGN_ROLE_IN_ORG_FAILURE]);
  let userTableData = getPayloadData(usersListAction.payload, {});
  let allFilterValues = getAllFilterOptionValues(passedColumns, _.get(userTableData, 'content', []));

  if (usersListAction.type === ActionTypes.FETCH_ASSIGN_ROLE_IN_ORG_SUCCESS) {
    yield call(setPaginationInCommonTableProps, TABLE_IDS.ASSIGN_ROLE, getPayloadData(usersListAction.payload, {}));
    yield put(setInitialFilterList({ key: TABLE_IDS.ASSIGN_ROLE, initialfilterOptions: allFilterValues }));
    yield put(setTableDropdownFilterList({ key: TABLE_IDS.ASSIGN_ROLE, filterOptionsList: allFilterValues }));
  }
}

function* submitAssignRole(action) {
  let { organizationId, roleId, assignRoleObj } = action.payload.data;
  yield fork(saga.handleAPIRequest, API.submitAssignRoles, {
    roleId,
    requestBody: assignRoleObj,
    organizationId
  });
  const updateAssignOrganizationAction = yield take([ActionTypes.SUBMIT_FETCH_ASSIGN_ROLE_IN_ORG_SUCCESS, ActionTypes.SUBMIT_FETCH_ASSIGN_ROLE_IN_ORG_FAILURE]);
  if (updateAssignOrganizationAction.type === ActionTypes.SUBMIT_FETCH_ASSIGN_ROLE_IN_ORG_SUCCESS) {
    // yield put(setSelectedIds({ key: TABLE_IDS.ASSIGN_ROLE, selectedIds: [] }));
    yield put(Actions.fetchAssignRoleInOrg());
    yield call(successNotify, I18n.t(_.get(assignRoleObj, 'member', false) ? 'un_assigned_success' : 'assigned_success', { type: I18n.t('role') }));
  }
}

function* getAllServiceProvidersDropdown(action) {
  let { organizationId } = action.payload.data;
  yield call(saga.handleAPIRequest, API.getAllServiceProviders, { organizationId });
}

export default function* organizationSaga() {
  yield all([
    takeLatest(ActionTypes.FETCH_SERVICE_PROVIDER_LIST, listServiceProviderDetail),
    takeLatest(ActionTypes.LIST_ORGANISATION, listOrganization),
    takeLatest(ActionTypes.SAVE_ORGANIZATION, saveOrganization),
    takeLatest(ActionTypes.UPDATE_ORGANIZATION, updateOrganization),
    takeLatest(ActionTypes.DELETE_ORGANISATION, deleteOrganization),
    takeLatest(ActionTypes.LOAD_API_PROVIDERS, loadAPIProviders),
    takeLatest(ActionTypes.LOAD_PARENT_ORGANIZATIONS, loadParentOrganizations),
    takeLatest(ActionTypes.FETCH_VENDOR_DETAILS, fetchVendorDetails),
    takeLatest(ActionTypes.SAVE_VENDOR_DETAILS, saveVendor),
    takeLatest(ActionTypes.DELETE_VENDOR_DETAILS, deleteVendor),
    takeLatest(ActionTypes.FETCH_VENDOR_DETAILS_BY_ID, fetchVendorById),
    takeLatest(ActionTypes.UPDATE_VENDOR_DETAILS, updateVendorData),
    takeLatest(ActionTypes.GET_ALL_ITEM_FOR_ASSIGN_VENDOR, getAllItems),
    takeLatest(ActionTypes.GET_ALL_ITEM_TYPE_FOR_ASSIGN_VENDOR, getAllItemType),
    takeLatest(ActionTypes.FETCH_ADDITIONAL_BASIC_DETAILS_WARDS, getAllWardsUnderOrg),
    takeLatest(ActionTypes.UPDATE_CURRENT_ORGANIZATION, updateCurrentOrganizationDetails),
    takeLatest(ActionTypes.LOAD_ORGANIZATION_TYPES, loadOrganizationTypes),
    takeLatest(ActionTypes.LOAD_ORGANIZATION_ROLE_TYPES, loadOrganizationRoleTypes),
    takeLatest(ActionTypes.LOAD_ORGANIZATION_API_PROVIDERS, loadOrganizationAPIProviders),
    takeLatest(ActionTypes.SAVE_ORGANIZATION_API_PROVIDERS, saveOrganizationAPIProviders),
    takeLatest(ActionTypes.FETCH_ORGANIZATION_DETAILS, fetchOrganizationDetails),
    takeLatest(ActionTypes.FETCH_CHK_USER_ORGANIZATION, loadUsersOrganizationList),
    takeLatest(ActionTypes.LOAD_ORG_FOR_SERVICE_WORKER, loadUsersOrganizationListForServiceWorker),
    takeLatest(ActionTypes.UPDATE_CHK_USER_ORGANIZATION, updateUserOrganizationMapping),
    takeLatest(ActionTypes.UPDATE_RE_ASSIGN_SUPER_VISOR, updateReAssignGt),
    takeLatest(ActionTypes.CHK_LOAD_USER_GROUP_ASSIGN_LIST, loadUserGroupAssignUsersList),
    takeLatest(ActionTypes.UPDATE_CHK_USER_ORGANIZATION_ROLE, updateUserOrganizationRole),
    takeLatest(ActionTypes.GET_EMAIL_API_PROVIDER, getEmailProviders),
    takeLatest(ActionTypes.GET_SMS_API_PROVIDER, getSmsProviders),
    takeLatest(ActionTypes.GET_NOTIFICATION_API_PROVIDER, getNotificationProviders),
    takeLatest(ActionTypes.GET_PAYMENT_API_PROVIDER, getPaymentApiProvider),
    takeLatest(ActionTypes.UPDATE_API_PROVIDER, updateApiProvider),
    takeLatest(ActionTypes.POST_API_PROVIDER, postApiProvider),
    takeLatest(ActionTypes.FETCH_MODULES_FOR_CHK, fetchModulesForChk),
    takeLatest(ActionTypes.FETCH_ROLESLIST_FOR_MODULE, fetchRolesForListBox),
    takeLatest(ActionTypes.FETCH_ASSIGNED_MODULES_FOR_CHK, fetchRoleAssignedModulesForCHK),
    takeLatest(ActionTypes.SAVE_MODULES_FOR_CHK, saveModuleInCHK),
    takeLatest(ActionTypes.SAVE_MODULES_FOR_CHK_IN_LOCATION, saveModuleInCHKInLocation),
    takeLatest(ActionTypes.SAVE_ASSIGNED_MODULES, RoleAssignedModuleSave),
    takeLatest(ActionTypes.FETCH_TEMPLATE_FOR_LST, fetchTemplatesForList),
    takeLatest(ActionTypes.FETCH_SELECTED_TEMPLATE_FOR_LST, fetchSelectedTemplatesForList),
    takeLatest(ActionTypes.SAVE_TEMPLATE_IN_LIST, saveTemplateInList),
    takeLatest(ActionTypes.GET_TEMPLATE_TYPES_FOR_ORG, getTemplateForOrg),
    takeLatest(ActionTypes.GET_TEMPLATE_BY_TEMP_TYPE_ID, getTemplateforTypeId),
    takeLatest(ActionTypes.GET_SERVICE_PROVIDER, getServiceProvider),
    takeLatest(ActionTypes.POST_SERVICE_PROVIDERS, postSeviceProvider),
    takeLatest(ActionTypes.LIST_SERVICE_PROVIDER, getAllServiceProviders),
    takeLatest(ActionTypes.GET_SERVICE_PROVIDERS_BY_ID, getServiceProviderById),
    takeLatest(ActionTypes.SERVICE_PROVIDER_EDIT, editServiceProvier),
    takeLatest(ActionTypes.GET_ASSIGNED_LOCATIONS, getAssignedLocations),
    takeLatest(ActionTypes.GET_ALL_ROLES, getAllRolesForOrg),
    takeLatest(ActionTypes.GET_USER_BASED_ON_ROLE_ID, getUserBasedOnRoleIds),
    takeLatest(ActionTypes.UPDATE_ASSIGN_SERVICE_ADMIN, updateAssignServiceAdmins),
    takeLatest(ActionTypes.GET_ASSIGNED_SERVICE_ADMIN, getAssignedServiceAdmins),
    takeLatest(ActionTypes.GET_ASSIGNED_SUPER_VISOR, getAssignedSuperVisor),
    takeLatest(ActionTypes.GET_ASSIGNED_WORKERS, getAssignedWorkers),
    takeLatest(ActionTypes.GET_ASSIGNED_WORKERS_ONLY, getAssignedWorkersOnly),
    takeLatest(ActionTypes.GET_LOCATION_BASED_ON_WORKER, getLocationBasedOnWorkers),
    takeLatest(ActionTypes.GET_OLD_SUPER_VISOR, getOldSuperVisor),
    takeLatest(ActionTypes.GET_NEW_SUPER_VISOR, getNewSuperVisor),
    takeLatest(ActionTypes.UPDATE_ASSIGNED_LOCATIONS, updateAssignedLocation),
    takeLatest(ActionTypes.GET_USER_BY_ROLE_ID, getUserBYRoleId),
    takeLatest(ActionTypes.GET_ASSIGNED_SERVICE_ADMIN_DROP_DOWN, getAssignedServiceAdminDropDown),
    takeLatest(ActionTypes.GET_LOCATIONS_UNDER_USER, getLocationUnderUser),
    takeLatest(ActionTypes.GET_ASSIGNED_LOCATION, getAssignedLocations),
    takeLatest(ActionTypes.UPDATE_ASSIGNED_WORKER_LOCATION, updateAssignedWorkerLocation),
    takeLatest(ActionTypes.GET_ALL_USER_UNDER_ORG_FOR_SP, getAllUsersUnderOrganizations),
    takeLatest(ActionTypes.UPDATE_ALL_USER_UNDER_ORG, updateAllUserUnderOrg),
    takeLatest(ActionTypes.FETCH_INITIAL_ORGANIZATIONS, fetchInitialOrganization),
    takeLatest(ActionTypes.DELETE_SERVICE_PROVIDER, deleteServiceProvider),
    takeLatest(ActionTypes.LIST_JSON_DATA_FOR_ORG_FILTER, listJsonDataForOrgs),
    takeLatest(ActionTypes.LIST_JSON_DATA_FOR_SERVICE_FILTER, listJsonDataForService),
    takeLatest(ActionTypes.LIST_RESIDENCE_CATEGORY, listResidenceCategory),
    takeLatest(ActionTypes.LIST_SERVICE_CATEGORY, listServiceCategory),
    takeLatest(ActionTypes.LIST_SERVICE_TYPE, listServiceType),
    takeLatest(ActionTypes.LIST_RATE_TYPE, listRateType),
    takeLatest(ActionTypes.LIST_PAYMENT_COLLECTION, listPaymentCollection),
    takeLatest(ActionTypes.LIST_PAYMENT_INTERVAL, listPaymentInterval),
    takeLatest(ActionTypes.LIST_SERVICE_INTERVEL, listServiceInterval),
    takeLatest(ActionTypes.LIST_BUNDLED_OR_SERVICE_CONFIG, listBundledOrServiceConfig),
    takeLatest(ActionTypes.LIST_SERVICE_CHARGE_SLAB, listServiceChargeSlab),
    takeLatest(ActionTypes.SENT_OBJECT_FOR_SERVICE, sentObjectForService),
    takeLatest(ActionTypes.LIST_SERVICE, listService),
    takeLatest(ActionTypes.LIST_SERVICE_BY_ID, listServiceById),
    takeLatest(ActionTypes.EDIT_OBJECT_FOR_SERVICE, editObjectForService),
    takeLatest(ActionTypes.DELETE_SERVICE, deleteService),
    takeLatest(ActionTypes.GET_WARDS_UNDER_SERVICE_PROVIDER_ID, getWardsUnderProviderId),
    takeLatest(ActionTypes.GET_GT_BASED_ON_WARD_ID, getGtBasedOnWardId),
    takeLatest(ActionTypes.GET_CUSTOMERS_BASED_ON_GT_ID, getCustomersBasedOnGT),
    takeLatest(ActionTypes.GET_SUPER_VISORS, getSuperVisors),
    takeLatest(ActionTypes.GET_TO_GT_WITH_SUPER_VISOR_ID, getToGtWithSuperVisorId),
    takeLatest(ActionTypes.POST_RE_ASSIGN_GT, postReAssignGt),
    takeLatest(ActionTypes.TOGGLE_STATUS, toggleStatus),
    takeLatest(ActionTypes.LOAD_TEMPLATES, loadTemplates),
    takeLatest(ActionTypes.LOAD_SERVICES, loadServices),
    takeLatest(ActionTypes.FETCH_ORGANIZATION_ASSIGN_USERS, fetchOrganizationAssignUsers),
    takeLatest(ActionTypes.GET_SW_SUPERVISOR_FOR_WARD, getSwSuperVisorForWard),
    takeLatest(ActionTypes.GET_SERVICE_WORKER_FROM_SW_SUPERVISOR, getServiceWorkerFromSwSuperVisor),
    takeLatest(ActionTypes.SUBMIT_RE_ASSIGN_SUPERVISOR_DATA, submitReAssignSupervisorDatas),
    takeLatest(ActionTypes.SUBMIT_RE_ASSIGN_WORKER_DATA, submitReAssignWorkerDatas),
    takeLatest(ActionTypes.FETCH_ORGANIZATION_ASSIGN_CUSTOMER_TO_SERVICE_WORKER, fetchAssignCustomerToServiceWorker),
    takeLatest(ActionTypes.SUBMIT_CUSTOMER_NUMBER_FOR_CUSTOMER_TO_SERVICE_WORKER, submitCustomerNumberForCustomerToServiceWorker),
    takeLatest(ActionTypes.SERVICE_PROVIDER_CONTACT_FORM, serviceProviderContactForm),
    takeLatest(ActionTypes.FETCH_ASSIGN_ORGANIZATION, fetchAssignOrganization),
    takeLatest(ActionTypes.UPDATE_CHK_ASSIGN_ORGANIZATION, updateAssignOrganizationMapping),
    takeLatest(ActionTypes.SAVE_ADDITIONAL_BASIC_DETAILS, submitAdditionalBasicDetails),
    takeLatest(ActionTypes.FETCH_ADDITIONAL_BASIC_DETAILS, fetchAdditionalBasicDetailsById),
    takeLatest(ActionTypes.FETCH_ADDITIONAL_BASIC_DETAILS_WARDS, fetchAdditionalBasicDetailsWards),
    takeLatest(ActionTypes.FETCH_ASSIGN_ROLE_IN_ORG, fetchassignRole),
    takeLatest(ActionTypes.SUBMIT_FETCH_ASSIGN_ROLE_IN_ORG, submitAssignRole),
    takeLatest(ActionTypes.COMPLAINT_EM_LIST, fetchComplaintEscalationMatrix),
    takeLatest(ActionTypes.COMPLAINT_EM_DELETE, deleteComplaintEscalation),
    takeLatest(ActionTypes.COMPLAINT_EM_UPDATE, updateComplaintEscalationMatrix),
    takeLatest(ActionTypes.COMPLAINT_EM_GET_BY_ID, fetchComplaintEscalationMatrixById),
    takeLatest(ActionTypes.COMPLAINT_EM_SAVE, saveComplaintEscalationMatrix),
    takeLatest(ActionTypes.COMPLAINT_LIST, listComplaints),
    takeLatest(ActionTypes.ROLE_LIST, listRoles),
    takeLatest(ActionTypes.TEMPLATE_LIST, listTemplate),
    takeLatest(ActionTypes.TEMPLATE_TYPE_LIST, listTemplateType),
    takeLatest(ActionTypes.ALL_SERVICE_PROVIDER_DROPDOWN, getAllServiceProvidersDropdown)


  ]);
}
