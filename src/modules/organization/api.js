import { restAPI, URL } from '../../common';
import { types as ActionTypes } from './actions';
import { superVisorRoleId } from './constants';

export function fetchServiceProviderDetails(params) {
  let payload = {
    types: [
      ActionTypes.FETCH_SERVICE_PROVIDER_LIST_REQUEST,
      ActionTypes.FETCH_SERVICE_PROVIDER_LIST_SUCCESS,
      ActionTypes.FETCH_SERVICE_PROVIDER_LIST_FAILURE
    ],
    params,
    options: {
      encode: false
    }
  };
  return {
    url: URL.CUSTOMER.LIST_DETAILS,
    api: restAPI.get,
    payload
  };
}

export function saveOrganization(data) {
  let payload = {
    types: [
      ActionTypes.SAVE_ORGANIZATION_REQUEST,
      ActionTypes.SAVE_ORGANIZATION_SUCCESS,
      ActionTypes.SAVE_ORGANIZATION_FAILED
    ],
    body: data
  };
  return {
    url: URL.ORGANIZATION.SAVE_ORGANIZATION,
    api: restAPI.post,
    payload
  };
}

export function updateOrganization({ organizationId, data }) {
  let payload = {
    types: [
      ActionTypes.UPDATE_ORGANIZATION_REQUEST,
      ActionTypes.UPDATE_ORGANIZATION_SUCCESS,
      ActionTypes.UPDATE_ORGANIZATION_FAILED
    ],
    body: data
  };
  return {
    url: `${URL.ORGANIZATION.UPDATE_ORGANIZATION}/${organizationId}`,
    api: restAPI.put,
    payload
  };
}

export function listOrganization({ params, types }) {
  let payload = {
    types,
    params
  };
  return {
    url: URL.ORGANIZATION.LIST_ORGANISATION,
    api: restAPI.get,
    payload
  };
}

export function listService({ params }) {
  let payload = {
    types: [ActionTypes.LIST_SERVICE_REQUEST,
    ActionTypes.LIST_SERVICE_SUCCESS,
    ActionTypes.LIST_SERVICE_FAILURE
    ],
    params
  };
  return {
    url: URL.SERVICE.LIST_SERVICE,
    api: restAPI.get,
    payload
  };
}

export function getTemplateForOrgamisation(data) {
  let payload = {
    types: [
      ActionTypes.GET_TEMPLATE_TYPES_FOR_ORG_REQUEST,
      ActionTypes.GET_TEMPLATE_TYPES_FOR_ORG_SUCCESS,
      ActionTypes.GET_TEMPLATE_TYPES_FOR_ORG_REQUEST
    ],
    params: data
  };
  return {
    url: URL.ORGANIZATION.LIST_TEMPLATE_TYPES,
    api: restAPI.get,
    payload
  };
}

export function getTemplateByTypeId(id) {
  let payload = {
    types: [
      ActionTypes.GET_TEMPLATE_BY_TEMP_TYPE_ID_REQUEST,
      ActionTypes.GET_TEMPLATE_BY_TEMP_TYPE_ID_SUCCESS,
      ActionTypes.GET_TEMPLATE_BY_TEMP_TYPE_ID_FAILURE
    ]
  };
  return {
    url: URL.ORGANIZATION.LIST_TEMPLATE_BY_TYPE_ID.replace(
      ':templateTypeId',
      id
    ),
    api: restAPI.get,
    payload
  };
}

export function loadEmailProviders(id, emailProviders) {
  let payload = {
    types: [
      ActionTypes.GET_EMAIL_API_PROVIDER_REQUEST,
      ActionTypes.GET_EMAIL_API_PROVIDER_SUCCESS,
      ActionTypes.GET_EMAIL_API_PROVIDER_FAILURE
    ]
  };
  return {
    url: URL.ORGANIZATION.GET_EMAIL_PROVIDER.replace(
      ':organizationId',
      id
    ).replace(':apiProviderType', emailProviders),
    api: restAPI.get,
    payload
  };
}

export function loadSmsProviders(id, smsProviders) {
  let payload = {
    types: [
      ActionTypes.GET_SMS_API_PROVIDER_REQUEST,
      ActionTypes.GET_SMS_API_PROVIDER_SUCCESS,
      ActionTypes.GET_SMS_API_PROVIDER_FAILURE
    ]
  };
  return {
    url: URL.ORGANIZATION.GET_SMS_PROVIDER.replace(
      ':organizationId',
      id
    ).replace(':apiProviderType', smsProviders),
    api: restAPI.get,
    payload
  };
}

export function loadNotificationProviders(id, notificationProviders) {
  let payload = {
    types: [
      ActionTypes.GET_NOTIFICATION_API_PROVIDER_REQUEST,
      ActionTypes.GET_NOTIFICATION_API_PROVIDER_SUCCESS,
      ActionTypes.GET_NOTIFICATION_API_PROVIDER_FAILURE
    ]
  };
  return {
    url: URL.ORGANIZATION.GET_NOTIFICATION_PROVIDER.replace(
      ':organizationId',
      id
    ).replace(':apiProviderType', notificationProviders),
    api: restAPI.get,
    payload
  };
}

export function loadPaymentGatewayApiProviders(id, paymentGateWayApiProviders) {
  let payload = {
    types: [
      ActionTypes.GET_PAYMENT_API_PROVIDER_REQUEST,
      ActionTypes.GET_PAYMENT_API_PROVIDER_SUCCESS,
      ActionTypes.GET_PAYMENT_API_PROVIDER_FAILURE
    ]
  };
  return {
    url: URL.ORGANIZATION.GET_NOTIFICATION_PROVIDER.replace(
      ':organizationId',
      id
    ).replace(':apiProviderType', paymentGateWayApiProviders),
    api: restAPI.get,
    payload
  };
}

export function updateApiProviders(
  id = 0,
  data = {}
) {
  let payload = {
    types: [
      ActionTypes.UPDATE_API_PROVIDER_REQUEST,
      ActionTypes.UPDATE_API_PROVIDER_SUCCESS,
      ActionTypes.GET_PAYMENT_API_PROVIDER_FAILURE
    ],
    body: data
  };
  return {
    url: URL.ORGANIZATION.UPDATE_API_PROVIDER.replace(
      ':organizationId',
      id
    ).replace(':apiProviderType', data?.id),
    api: restAPI.put,
    payload
  };
}

export function postApiProviders(id = 0, apiProvider = {}) {
  let payload = {
    types: [
      ActionTypes.POST_API_PROVIDER_REQUEST,
      ActionTypes.POST_API_PROVIDER_SUCCESS,
      ActionTypes.POST_API_PROVIDER_FAILURE
    ],
    body: apiProvider
  };
  return {
    url: URL.ORGANIZATION.POST_API_PROVIDER.replace(':organizationId', id),
    api: restAPI.post,
    payload
  };
}

export function fetchOrganizationDetails({ organizationId = '' }) {
  let payload = {
    types: [
      ActionTypes.FETCH_ORGANIZATION_DETAILS_REQUEST,
      ActionTypes.FETCH_ORGANIZATION_DETAILS_SUCCESS,
      ActionTypes.FETCH_ORGANIZATION_DETAILS_FAILURE
    ]
  };
  return {
    url: URL.ORGANIZATION.FETCH_ORGANIZATION.replace(
      ':organizationId',
      organizationId
    ),
    api: restAPI.get,
    payload
  };
}

export function getAllServiceProviders({ organizationId = '' }) {
  const type = 'dropdown';
  let payload = {
    types: [
      ActionTypes.ALL_SERVICE_PROVIDER_DROPDOWN_REQUEST,
      ActionTypes.ALL_SERVICE_PROVIDER_DROPDOWN_SUCCESS,
      ActionTypes.ALL_SERVICE_PROVIDER_DROPDOWN_FAILURE
    ],
    params: { type }
  };
  return {
    url: URL.ORGANIZATION.GET_ALL_SERVICE_PROVIDERS.replace(
      ':organizationId',
      organizationId
    ),
    api: restAPI.get,
    payload
  };
}


export function loadUsersOrganizationList(data) {
  let payload = {
    types: [
      ActionTypes.FETCH_CHK_USER_ORGANIZATION_REQUEST,
      ActionTypes.FETCH_CHK_USER_ORGANIZATION_SUCCESS,
      ActionTypes.FETCH_CHK_USER_ORGANIZATION_FAILURE
    ],
    params: data
  };
  return {
    url: URL.ORGANIZATION.FETCH_USER_ORGANIZATION_MAPPING.replace(
      ':organizationId',
      data.organizationId
    ),
    api: restAPI.get,
    payload
  };
}
export function loadUsersOrganizationListForServiceWorker(orgId) {
  let payload = {
    types: [
      ActionTypes.LOAD_ORG_FOR_SERVICE_WORKER_REQUEST,
      ActionTypes.LOAD_ORG_FOR_SERVICE_WORKER_SUCCESS,
      ActionTypes.LOAD_ORG_FOR_SERVICE_WORKER_FAILURE
    ]
  };
  return {
    url: URL.ORGANIZATION.FETCH_USER_ORGANIZATION_MAPPING.replace(
      ':organizationId',
      orgId
    ),
    api: restAPI.get,
    payload
  };
}

export function updateUserOrganizationMapping({ organizationId, requestBody }) {
  let payload = {
    types: [
      ActionTypes.UPDATE_CHK_USER_ORGANIZATION_REQUEST,
      ActionTypes.UPDATE_CHK_USER_ORGANIZATION_SUCCESS,
      ActionTypes.UPDATE_CHK_USER_ORGANIZATION_FAILURE
    ],
    body: requestBody
  };
  return {
    url: URL.ORGANIZATION.UPDATE_USER_ORGANIZATION_MAPPING.replace(
      ':organizationId',
      organizationId
    ),
    api: restAPI.put,
    payload
  };
}

export function updateAssignOrganizationMapping({ organizationId, requestBody }) {
  let payload = {
    types: [
      ActionTypes.UPDATE_CHK_ASSIGN_ORGANIZATION_REQUEST,
      ActionTypes.UPDATE_CHK_ASSIGN_ORGANIZATION_SUCCESS,
      ActionTypes.UPDATE_CHK_ASSIGN_ORGANIZATION_FAILURE
    ],
    body: requestBody
  };
  return {
    url: URL.ORGANIZATION.FETCH_ASSIGN_ORGANIZATION_MAPPING.replace(
      ':organizationId',
      organizationId
    ),
    api: restAPI.put,
    payload
  };
}

export function updateUserOrganizationRole({ orgId, roleId, requestBody }) {
  let payload = {
    types: [
      ActionTypes.UPDATE_CHK_USER_ORGANIZATION_ROLE_REQUEST,
      ActionTypes.UPDATE_CHK_USER_ORGANIZATION_ROLE_SUCCESS,
      ActionTypes.UPDATE_CHK_USER_ORGANIZATION_ROLE_FAILURE
    ],
    body: requestBody
  };
  return {
    url: URL.ORGANIZATION.CHK_LOAD_USER_GROUP_ASSIGN_LIST.replace(
      ':organizationId',
      orgId
    ).replace(':roleId', roleId),
    api: restAPI.put,
    payload
  };
}

export function deleteOrganization(id) {
  let payload = {
    types: [
      ActionTypes.DELETE_ORGANISATION_REQUEST,
      ActionTypes.DELETE_ORGANISATION_SUCCESS,
      ActionTypes.DELETE_ORGANISATION_FAILURE
    ]
  };
  return {
    url: URL.ORGANIZATION.DELETE_ORGANISATION.replace(':id', id),
    api: restAPI.del,
    payload
  };
}

export function deleteService(id) {
  let payload = {
    types: [
      ActionTypes.DELETE_SERVICE_REQUEST,
      ActionTypes.DELETE_SERVICE_SUCCESS,
      ActionTypes.DELETE_SERVICE_FAILURE
    ]
  };
  return {
    url: URL.SERVICE.LIST_SERVICE_BY_ID.replace(':serviceConfigId', id),
    api: restAPI.del,
    payload
  };
}

export function updateCurrentOrganizationDetails(data) {
  let payload = {
    types: [
      ActionTypes.UPDATE_CURRENT_ORGANIZATION_REQUEST,
      ActionTypes.UPDATE_CURRENT_ORGANIZATION_SUCCESS,
      ActionTypes.UPDATE_CURRENT_ORGANIZATION_FAILED
    ],
    body: data
  };
  return {
    url: URL.ORGANIZATION.UPDATE_CURRENT_ORGANIZATION,
    api: restAPI.put,
    payload
  };
}
export function loadUserGroupAssignUsersList(roleId, orgId) {
  let payload = {
    types: [
      ActionTypes.CHK_LOAD_USER_GROUP_ASSIGN_LIST_REQUEST,
      ActionTypes.CHK_LOAD_USER_GROUP_ASSIGN_LIST_SUCCESS,
      ActionTypes.CHK_LOAD_USER_GROUP_ASSIGN_LIST_FAILED
    ]
    // body: data
  };
  return {
    url: URL.ORGANIZATION.CHK_LOAD_USER_GROUP_ASSIGN_LIST.replace(
      ':organizationId',
      orgId
    ).replace(':roleId', roleId),
    api: restAPI.get,
    payload
  };
}

export function loadAPIProviders() {
  let payload = {
    types: [
      ActionTypes.LOAD_API_PROVIDERS_REQUEST,
      ActionTypes.LOAD_API_PROVIDERS_SUCCESS,
      ActionTypes.LOAD_API_PROVIDERS_FAILED
    ]
  };
  return {
    url: URL.ORGANIZATION.LOAD_PROVIDERS,
    api: restAPI.get,
    payload
  };
}

export function loadParentOrganizations() {
  let payload = {
    types: [
      ActionTypes.LOAD_PARENT_ORGANIZATIONS_REQUEST,
      ActionTypes.LOAD_PARENT_ORGANIZATIONS_SUCCESS,
      ActionTypes.LOAD_PARENT_ORGANIZATIONS_FAILED
    ],
    params: { type: 'dropdown' }
  };
  return {
    url: URL.ORGANIZATION.PARENT_ORGANIZATIONS,
    api: restAPI.get,
    payload
  };
}

export function loadOrganizationTypes() {
  let payload = {
    types: [
      ActionTypes.LOAD_ORGANIZATION_TYPES_REQUEST,
      ActionTypes.LOAD_ORGANIZATION_TYPES_SUCCESS,
      ActionTypes.LOAD_ORGANIZATION_TYPES_FAILED
    ],
    params: { type: 'dropdown' }
  };
  return {
    url: URL.ORGANIZATION.ORGANIZATIONS_TYPES,
    api: restAPI.get,
    payload
  };
}
export function loadOrganizationRoleTypes(roleTypeId = 2) {
  let params = { type: 'dropdown' };
  let payload = {
    types: [
      ActionTypes.LOAD_ORGANIZATION_ROLE_TYPES_REQUEST,
      ActionTypes.LOAD_ORGANIZATION_ROLE_TYPES_SUCCESS,
      ActionTypes.LOAD_ORGANIZATION_ROLE_TYPES_FAILED
    ],
    params
  };
  return {
    url: URL.ORGANIZATION.ORGANIZATIONS_ROLE_TYPES.replace(
      ':roleTypeId',
      roleTypeId
    ),
    api: restAPI.get,
    payload
  };
}

export function loadOrganizationAPIProviders(organizationId = '') {
  let payload = {
    types: [
      ActionTypes.LOAD_ORGANIZATION_API_PROVIDERS_REQUEST,
      ActionTypes.LOAD_ORGANIZATION_API_PROVIDERS_SUCCESS,
      ActionTypes.LOAD_ORGANIZATION_API_PROVIDERS_FAILED
    ]
  };
  return {
    url: URL.ORGANIZATION.LOAD_ORGANIZATION_API_PROVIDERS.replace(
      ':organizationId',
      organizationId
    ),
    api: restAPI.get,
    payload
  };
}

export function saveOrganizationAPIProviders({ organizationId = '', body }) {
  let payload = {
    types: [
      ActionTypes.SAVE_ORGANIZATION_API_PROVIDERS_REQUEST,
      ActionTypes.SAVE_ORGANIZATION_API_PROVIDERS_SUCCESS,
      ActionTypes.SAVE_ORGANIZATION_API_PROVIDERS_FAILED
    ],
    body
  };
  return {
    url: URL.ORGANIZATION.SAVE_ORGANIZATION_API_PROVIDERS.replace(
      ':organizationId',
      organizationId
    ),
    api: restAPI.post,
    payload
  };
}

export function updateOrganizationAPIProviders({
  organizationId,
  apiKeyProviderId,
  body
}) {
  let payload = {
    types: [
      ActionTypes.UPDATE_ORGANIZATION_API_PROVIDERS_REQUEST,
      ActionTypes.UPDATE_ORGANIZATION_API_PROVIDERS_SUCCESS,
      ActionTypes.UPDATE_ORGANIZATION_API_PROVIDERS_FAILURE
    ],
    body
  };
  return {
    url: URL.ORGANIZATION.UPDATE_ORGANIZATION_API_PROVIDERS.replace(
      ':organizationId',
      organizationId
    ).replace(':apiKeyProviderId', apiKeyProviderId),
    api: restAPI.put,
    payload
  };
}
//modules
export function fetchModulesForChk(orgId) {
  let payload = {
    types: [
      ActionTypes.FETCH_MODULES_FOR_CHK_REQUEST,
      ActionTypes.FETCH_MODULES_FOR_CHK_SUCCESS,
      ActionTypes.FETCH_MODULES_FOR_CHK_FAILURE
    ]
  };
  return {
    url: URL.ORG_MODULES.LIST_MODULES.replace(':organizationId', orgId),
    api: restAPI.get,
    payload
  };
}
export function fetchRolesList(Id = 2) {
  let payload = {
    types: [
      ActionTypes.FETCH_ROLESLIST_FOR_MODULE_REQUEST,
      ActionTypes.FETCH_ROLESLIST_FOR_MODULE_SUCCESS,
      ActionTypes.FETCH_ROLESLIST_FOR_MODULE_FAILURE
    ],
    params: { type: 'dropdown' }
  };
  return {
    url: URL.ROLE.LIST_ORGANISATION_ROLE.replace(':roleTypeId', Id),
    api: restAPI.get,
    payload
  };
}

export function listResidenceCategory() {
  const type = 'dropdown';
  let payload = {
    types: [
      ActionTypes.LIST_RESIDENCE_CATEGORY_REQUEST,
      ActionTypes.LIST_RESIDENCE_CATEGORY_SUCCESS,
      ActionTypes.LIST_RESIDENCE_CATEGORY_FAILURE
    ],
    params: { type }
  };
  return {
    url: URL.RESIDENCE_CATEGORY.LIST_RESIDENCE_CATEGORY,
    api: restAPI.get,
    payload
  };
}
export function listServiceCategory() {
  const type = 'dropdown';
  let payload = {
    types: [
      ActionTypes.LIST_SERVICE_CATEGORY_REQUEST,
      ActionTypes.LIST_SERVICE_CATEGORY_SUCCESS,
      ActionTypes.LIST_SERVICE_CATEGORY_FAILURE
    ],
    params: { type }
  };
  return {
    url: URL.SERVICE_CATEGORY.LIST_SERVICE_CATEGORY,
    api: restAPI.get,
    payload
  };
}
export function listServiceType() {
  const type = 'dropdown';
  let payload = {
    types: [
      ActionTypes.LIST_SERVICE_TYPE_REQUEST,
      ActionTypes.LIST_SERVICE_TYPE_SUCCESS,
      ActionTypes.LIST_SERVICE_TYPE_FAILURE
    ],
    params: { type }
  };
  return {
    url: URL.SERVICE_TYPE.LIST_SERVICE_TYPE,
    api: restAPI.get,
    payload
  };
}

export function listPaymentCollection() {
  const type = 'dropdown';
  let payload = {
    types: [
      ActionTypes.LIST_PAYMENT_COLLECTION_REQUEST,
      ActionTypes.LIST_PAYMENT_COLLECTION_SUCCESS,
      ActionTypes.LIST_PAYMENT_COLLECTION_FAILURE
    ],
    params: { type }
  };
  return {
    url: URL.PAYMENT_COLLECTION.LIST_PAYMENT_COLLECTION,
    api: restAPI.get,
    payload
  };
}

export function listPaymentInterval({ langId }) {
  const type = 'dropdown';
  let payload = {
    types: [
      ActionTypes.LIST_PAYMENT_INTERVAL_REQUEST,
      ActionTypes.LIST_PAYMENT_INTERVAL_SUCCESS,
      ActionTypes.LIST_PAYMENT_INTERVAL_FAILURE
    ],
    params: { type, langId }
  };
  return {
    url: URL.PAYMENT_INTERVAL.LIST_PAYMENT_INTERVAL,
    api: restAPI.get,
    payload
  };
}

export function listRateType() {
  const type = 'dropdown';
  let payload = {
    types: [
      ActionTypes.LIST_RATE_TYPE_REQUEST,
      ActionTypes.LIST_RATE_TYPE_SUCCESS,
      ActionTypes.LIST_RATE_TYPE_FAILURE
    ],
    params: { type }
  };
  return {
    url: URL.RATE_TYPE.LIST_RATE_TYPE,
    api: restAPI.get,
    payload
  };
}

export function listServiceInterval() {
  const type = 'dropdown';
  let payload = {
    types: [
      ActionTypes.LIST_SERVICE_INTERVEL_REQUEST,
      ActionTypes.LIST_SERVICE_INTERVEL_SUCCESS,
      ActionTypes.LIST_SERVICE_INTERVEL_FAILURE
    ],
    params: { type }
  };
  return {
    url: URL.SERVICE_INTERVEL.LIST_SERVICE_INTERVEL,
    api: restAPI.get,
    payload
  };
}

export function listBundledSeriveConfig() {
  const type = 'dropdown';
  let payload = {
    types: [
      ActionTypes.LIST_BUNDLED__SERVICE_CONFIG_REQUEST,
      ActionTypes.LIST_BUNDLED__SERVICE_CONFIG_SUCCESS,
      ActionTypes.LIST_BUNDLED__SERVICE_CONFIG_FAILURE
    ],
    params: { type }
  };
  return {
    url: URL.BUNDLED_SERVICE_CONFIG.LIST_BUNDLED_SERVICE_CONFIG,
    api: restAPI.get,
    payload
  };
}

export function listSeriveConfig() {
  const type = 'dropdown';
  let payload = {
    types: [
      ActionTypes.LIST__SERVICE_CONFIG_REQUEST,
      ActionTypes.LIST__SERVICE_CONFIG_SUCCESS,
      ActionTypes.LIST__SERVICE_CONFIG_FAILURE
    ],
    params: { type }
  };
  return {
    url: URL.SERVICE_CONFIG.LIST_SERVICE_CONFIG,
    api: restAPI.get,
    payload
  };
}

export function listServiceChargeSlab() {
  const type = 'dropdown';
  let payload = {
    types: [
      ActionTypes.LIST_SERVICE_CHARGE_SLAB_REQUEST,
      ActionTypes.LIST_SERVICE_CHARGE_SLAB_SUCCESS,
      ActionTypes.LIST_SERVICE_CHARGE_SLAB_FAILURE
    ],
    params: { type }
  };
  return {
    url: URL.SERVICE_CHARGE_SLAB.LIST_SERVICE_CHARGE_SLAB,
    api: restAPI.get,
    payload
  };
}

export function sentObjectForService(data) {
  // const type = 'dropdown';
  let payload = {
    types: [
      ActionTypes.SENT_OBJECT_FOR_SERVICE_REQUEST,
      ActionTypes.SENT_OBJECT_FOR_SERVICE_SUCCESS,
      ActionTypes.SENT_OBJECT_FOR_SERVICE_FAILURE
    ],
    body: data
  };
  return {
    url: URL.SERVICE.SENT_SERVICE,
    api: restAPI.post,
    payload
  };
}

export function editObjectForService(data, serviceId) {
  // const type = 'dropdown';
  let payload = {
    types: [
      ActionTypes.EDIT_OBJECT_FOR_SERVICE_REQUEST,
      ActionTypes.EDIT_OBJECT_FOR_SERVICE_SUCCESS,
      ActionTypes.EDIT_OBJECT_FOR_SERVICE_FAILURE
    ],
    body: data
  };
  return {
    url: URL.SERVICE.LIST_SERVICE_BY_ID.replace(':serviceConfigId', serviceId),
    api: restAPI.put,
    payload
  };
}

export function fetchAssignedModuleForCHK(data) {
  let payload = {
    types: [
      ActionTypes.FETCH_ASSIGNED_MODULES_FOR_CHK_REQUEST,
      ActionTypes.FETCH_ASSIGNED_MODULES_FOR_CHK_SUCCESS,
      ActionTypes.FETCH_ASSIGNED_MODULES_FOR_CHK_FAILURE
    ]
  };
  return {
    url: URL.ORG_MODULES.LIST_ASSIGNED_MODULES.replace(
      ':orgID',
      data.orgID
    ).replace(':roleId', '?roleId=' + data.roleId),
    api: restAPI.get,
    payload
  };
}
export function saveModules(Id, body) {
  let payload = {
    types: [
      ActionTypes.SAVE_MODULES_FOR_CHK_REQUEST,
      ActionTypes.SAVE_MODULES_FOR_CHK_SUCCESS,
      ActionTypes.SAVE_MODULES_FOR_CHK_FAILURE
    ],
    body
  };
  return {
    url: URL.ORG_MODULES.SAVE_MODULES.replace(':orgId', Id),
    api: restAPI.post,
    payload
  };
}

export function saveAssignedLocation(Id, body, providerId) {
  let payload = {
    types: [
      ActionTypes.SAVE_MODULES_FOR_CHK_REQUEST_IN_LOCATION,
      ActionTypes.SAVE_MODULES_FOR_CHK_SUCCESS_IN_LOCATION,
      ActionTypes.SAVE_MODULES_FOR_CHK_FAILURE_IN_LOCATION
    ],
    body: body
  };
  return {
    url: URL.ORG_TEMPLATE.SAVE_LOCATION.replace(':organizationId', Id).replace(
      ':serviceProviderId',
      providerId
    ),
    api: restAPI.put,
    payload
  };
}
export function saveAssignedModules(orgId, roleId, body) {
  let payload = {
    types: [
      ActionTypes.SAVE_ASSIGNED_MODULES_REQUEST,
      ActionTypes.SAVE_ASSIGNED_MODULES_SUCCESS,
      ActionTypes.SAVE_ASSIGNED_MODULES_FAILURE
    ],
    body
  };
  return {
    url: URL.ORG_MODULES.SAVE_ASSIGNED_MODULES.replace(':orgId', orgId).replace(
      ':roleId',
      roleId
    ),
    api: restAPI.post,
    payload
  };
}
// template
export function fetchTemplatesforLST() {
  let payload = {
    types: [
      ActionTypes.FETCH_TEMPLATE_FOR_LST_REQUEST,
      ActionTypes.FETCH_TEMPLATE_FOR_LST_SUCCESS,
      ActionTypes.FETCH_TEMPLATE_FOR_LST_FAILURE
    ]
  };
  return {
    url: URL.ORG_TEMPLATE.LIST_TEMPLATE,
    api: restAPI.get,
    payload
  };
}
export function fetchSelectedTemplatesforLST(data) {
  let payload = {
    types: [
      ActionTypes.FETCH_SELECTED_TEMPLATE_FOR_LST_REQUEST,
      ActionTypes.FETCH_SELECTED_TEMPLATE_FOR_LST_SUCCESS,
      ActionTypes.FETCH_SELECTED_TEMPLATE_FOR_LST_FAILURE
    ],
    params: data.params
  };
  return {
    url: URL.ORG_TEMPLATE.LIST_SELECTED_TEMPLATE.replace(':organizationId', data.orgId),
    api: restAPI.get,
    payload
  };
}

export function listServiceProvider() {
  let payload = {
    types: [
      ActionTypes.GET_SERVICE_PROVIDER_REQUEST,
      ActionTypes.GET_SERVICE_PROVIDER_SUCCESS,
      ActionTypes.GET_SERVICE_PROVIDER_FAILURE
    ]
  };
  return {
    url: URL.ORG_TEMPLATE.GET_SERVICE_PROVIDER,
    api: restAPI.get,
    payload
  };
}
export function saveTemplatesInList({
  templateTypeId,
  organizationId,
  templateId
}) {
  let payload = {
    types: [
      ActionTypes.SAVE_TEMPLATE_IN_LIST_REQUEST,
      ActionTypes.SAVE_TEMPLATE_IN_LIST_SUCCESS,
      ActionTypes.SAVE_TEMPLATE_IN_LIST_FAILURE
    ]
  };
  return {
    url: URL.ORG_TEMPLATE.SAVE_TEMPLATE.replace(':templateId', templateId)
      .replace(':organizationId', organizationId)
      .replace(':templateTypeId', templateTypeId),
    api: restAPI.put,
    payload
  };
}

export function postServiceProvider(data, id) {
  let payload = {
    types: [
      ActionTypes.POST_SERVICE_PROVIDERS_REQUEST,
      ActionTypes.POST_SERVICE_PROVIDERS_SUCCESS,
      ActionTypes.POST_SERVICE_PROVIDERS_FAILURE
    ],
    body: data
  };
  return {
    url: URL.ORG_TEMPLATE.POST_SERVICE_PROVIDER.replace(':organizationId', id),
    api: restAPI.post,
    payload
  };
}

export function listAllServiceProviders(data, id) {
  let payload = {
    types: [
      ActionTypes.LIST_SERVICE_PROVIDER_REQUEST,
      ActionTypes.LIST_SERVICE_PROVIDER_SUCCESS,
      ActionTypes.LIST_SERVICE_PROVIDER_FAILURE
    ],
    params: data
  };
  return {
    url: URL.ORG_TEMPLATE.LIST_ALL_SERVICE_PROVIDERS.replace(
      ':organizationId',
      id
    ),
    api: restAPI.get,
    payload
  };
}

export function getServiceProvidersById(id, orgId) {
  let payload = {
    types: [
      ActionTypes.GET_SERVICE_PROVIDERS_BY_ID_REQUEST,
      ActionTypes.GET_SERVICE_PROVIDERS_BY_ID_SUCCESS,
      ActionTypes.GET_SERVICE_PROVIDERS_BY_ID_FAILURE
    ]
  };
  return {
    url: URL.ORG_TEMPLATE.GET_SERVICE_PROVIDER_BY_ID.replace(
      ':organizationId',
      orgId
    ).replace(':serviceProviderId', id),
    api: restAPI.get,
    payload
  };
}

// export function listAssignedLocations(orgId, providerId) {
//     let payload = {
//         types: [ActionTypes.GET_ASSIGNED_LOCATION_REQUEST, ActionTypes.GET_ASSIGNED_LOCATION_SUCCESS, ActionTypes.GET_ASSIGNED_LOCATION_FAILURE]
//     };
//     return {
//         url: URL.ORG_TEMPLATE.LIST_ALL_ASSIGNED_LOCATIONS.replace(':organizationId', orgId).replace(':serviceProviderId', providerId),
//         api: restAPI.get,
//         payload
//     };
// }

export function editServiceProvider(data, id, providerId) {
  let payload = {
    types: [
      ActionTypes.SERVICE_PROVIDER_EDIT_REQUEST,
      ActionTypes.SERVICE_PROVIDER_EDIT_SUCCESS,
      ActionTypes.SERVICE_PROVIDER_EDIT_FAILURE
    ],
    body: data
  };
  return {
    url: URL.ORG_TEMPLATE.EDIT_SERVICE_PROVIDER.replace(
      ':organizationId',
      id
    ).replace(':serviceProviderId', providerId),
    api: restAPI.put,
    payload
  };
}

export function getAllRolesForOrg(provider) {
  let payload = {
    types: [
      ActionTypes.GET_ALL_ROLES_REQUEST,
      ActionTypes.GET_ALL_ROLES_SUCCESS,
      ActionTypes.GET_ALL_ROLES_FAILURE
    ],
    params: { provider }
  };
  return {
    url: URL.ORG_TEMPLATE.GET_ALL_USERS,
    api: restAPI.get,
    payload
  };
}

export function getUserBasedOnRoleIds(roleId, orgId) {
  let payload = {
    types: [
      ActionTypes.GET_USER_BASED_ON_ROLE_ID_REQUEST,
      ActionTypes.GET_USER_BASED_ON_ROLE_ID_SUCCESS,
      ActionTypes.GET_USER_BASED_ON_ROLE_ID_FAILURE
    ]
  };
  return {
    url: URL.ORG_TEMPLATE.GET_ALL_USERS_BASED_ON_ROLE_ID.replace(
      ':organizationId',
      roleId
    ).replace(':roleId', orgId),
    api: restAPI.get,
    payload
  };
}

export function updateAssignServiceAdmins(data, orgId, providerId, roleId) {
  let payload = {
    types: [
      ActionTypes.UPDATE_ASSIGN_SERVICE_ADMIN_REQUEST,
      ActionTypes.UPDATE_ASSIGN_SERVICE_ADMIN_SUCCESS,
      ActionTypes.UPDATE_ASSIGN_SERVICE_ADMIN_FAILURE
    ],
    body: data
  };
  return {
    url: URL.ORG_TEMPLATE.UPDATE_ASSIGNED_SERVICE_ADMIN.replace(
      ':organizationId',
      orgId
    )
      .replace(':serviceProviderId', providerId)
      .replace(':roleId', roleId),
    api: restAPI.put,
    payload
  };
}

export function getAssignedServiceAdmin(orgId, providerId, roleId) {
  // let multiTenant = true;
  let payload = {
    types: [
      ActionTypes.GET_ASSIGNED_SERVICE_ADMIN_REQUEST,
      ActionTypes.GET_ASSIGNED_SERVICE_ADMIN_SUCCESS,
      ActionTypes.GET_ASSIGNED_SERVICE_ADMIN_FAILURE
    ]
    // params: { multiTenant }
  };
  return {
    url: URL.ORG_TEMPLATE.GET_ALL_ASSIGNED_SERVICE_ADMIN.replace(
      ':organizationId',
      orgId
    )
      .replace(':serviceProviderId', providerId)
      .replace(':roleId', roleId),
    api: restAPI.get,
    payload
  };
}

export function getAssignedServiceAdminDropDown(
  type,
  orgId,
  providerId,
  roleId
) {
  // let multiTenant = true;
  let payload = {
    types: [
      ActionTypes.GET_ASSIGNED_SERVICE_ADMIN_REQUEST_DROP_DOWN,
      ActionTypes.GET_ASSIGNED_SERVICE_ADMIN_SUCCESS_DROP_DOWN,
      ActionTypes.GET_ASSIGNED_SERVICE_ADMIN_FAILURE_DROP_DOWN
    ],
    params: { type }
  };
  return {
    url: URL.ORG_TEMPLATE.GET_ALL_ASSIGNED_SERVICE_ADMIN.replace(
      ':organizationId',
      orgId
    )
      .replace(':serviceProviderId', providerId)
      .replace(':roleId', roleId),
    api: restAPI.get,
    payload
  };
}

export function getAssignedSuperVisor(roleId, orgId) {
  let payload = {
    types: [
      ActionTypes.GET_ASSIGNED_SUPER_VISOR_REQUEST,
      ActionTypes.GET_ASSIGNED_SUPER_VISOR_SUCCESS,
      ActionTypes.GET_ASSIGNED_SUPER_VISOR_FAILURE
    ]
  };
  return {
    url: URL.ORG_TEMPLATE.GET_ASSIGNED_SUPER_ADMIN.replace(
      ':organizationId',
      roleId
    ).replace(':roleId', orgId),
    api: restAPI.get,
    payload
  };
}
export function getAssignedWorkers(roleId, orgId) {
  let payload = {
    types: [
      ActionTypes.GET_ASSIGNED_WORKERS_REQUEST,
      ActionTypes.GET_ASSIGNED_WORKERS_SUCCESS,
      ActionTypes.GET_ASSIGNED_WORKERS_FAILURE
    ]
  };
  return {
    url: URL.ORG_TEMPLATE.GET_ASSIGNED_WORKER.replace(
      ':organizationId',
      roleId
    ).replace(':roleId', orgId),
    api: restAPI.get,
    payload
  };
}

export function getAssignedWorkersOnly(roleId, orgId) {
  let payload = {
    types: [
      ActionTypes.GET_ASSIGNED_WORKERS_ONLY_REQUEST,
      ActionTypes.GET_ASSIGNED_WORKERS_ONLY_SUCCESS,
      ActionTypes.GET_ASSIGNED_WORKERS_ONLY_FAILURE
    ]
  };
  return {
    url: URL.ORG_TEMPLATE.GET_ASSIGNED_WORKER_ONLY.replace(
      ':organizationId',
      roleId
    ).replace(':roleId', orgId),
    api: restAPI.get,
    payload
  };
}

export function getLocationBasedOnWorkers(roleId, orgId) {
  let payload = {
    types: [
      ActionTypes.GET_LOCATION_BASED_ON_WORKER_REQUEST,
      ActionTypes.GET_LOCATION_BASED_ON_WORKER_SUCCESS,
      ActionTypes.GET_LOCATION_BASED_ON_WORKER_FAILURE
    ]
  };
  return {
    url: URL.ORG_TEMPLATE.GET_LOCATION_BASED_ON_WORKER.replace(
      ':organizationId',
      roleId
    ).replace(':roleId', orgId),
    api: restAPI.get,
    payload
  };
}

export function getOldSuperVisor(roleId, orgId) {
  let payload = {
    types: [
      ActionTypes.GET_OLD_SUPER_VISOR_REQUEST,
      ActionTypes.GET_OLD_SUPER_VISOR_SUCCESS,
      ActionTypes.GET_OLD_SUPER_VISOR_FAILURE
    ]
  };
  return {
    url: URL.ORG_TEMPLATE.GET_OLD_SUPER_VISOR.replace(
      ':organizationId',
      roleId
    ).replace(':roleId', orgId),
    api: restAPI.get,
    payload
  };
}
export function getNewSuperVisor(roleId, orgId) {
  let payload = {
    types: [
      ActionTypes.GET_NEW_SUPER_VISOR_REQUEST,
      ActionTypes.GET_NEW_SUPER_VISOR_SUCCESS,
      ActionTypes.GET_NEW_SUPER_VISOR_FAILURE
    ]
  };
  return {
    url: URL.ORG_TEMPLATE.GET_NEW_SUPER_VISOR.replace(
      ':organizationId',
      roleId
    ).replace(':roleId', orgId),
    api: restAPI.get,
    payload
  };
}
export function listAssignedLocations(orgId, providerId) {
  let payload = {
    types: [
      ActionTypes.GET_ASSIGNED_LOCATIONS_REQUEST,
      ActionTypes.GET_ASSIGNED_LOCATIONS_SUCCESS,
      ActionTypes.GET_ASSIGNED_LOCATIONS_FAILURE
    ]
  };
  return {
    url: URL.ORG_TEMPLATE.LIST_ALL_ASSIGNED_LOCATIONS.replace(
      ':organizationId',
      orgId
    ).replace(':serviceProviderId', providerId),
    api: restAPI.get,
    payload
  };
}

export function updateAssignedLocation(data, orgId, providerId) {
  let payload = {
    types: [
      ActionTypes.UPDATE_ASSIGNED_LOCATIONS_REQUEST,
      ActionTypes.UPDATE_ASSIGNED_LOCATIONS_SUCCESS,
      ActionTypes.UPDATE_ASSIGNED_LOCATIONS_FAILURE
    ],
    body: data
  };
  return {
    url: URL.ORG_TEMPLATE.SAVE_LOCATION.replace(
      ':organizationId',
      orgId
    ).replace(':serviceProviderId', providerId),
    api: restAPI.put,
    payload
  };
}

export function getUserBYRoleId(orgId, providerId, roleId) {
  let payload = {
    types: [
      ActionTypes.GET_USER_BY_ROLE_ID_REQUEST,
      ActionTypes.GET_USER_BY_ROLE_ID_SUCCESS,
      ActionTypes.GET_USER_BY_ROLE_ID_FAILURE
    ]
  };
  return {
    url: URL.ORG_TEMPLATE.GET_ALL_USERS_BASED_ON_ROLE_ID.replace(
      ':organizationId',
      orgId
    ).replace(':roleId', roleId),
    api: restAPI.get,
    payload
  };
}

export function getLocationUnderUser(orgId, providerId, userId, roleId) {
  let payload = {
    types: [
      ActionTypes.GET_LOCATIONS_UNDER_USER_REQUEST,
      ActionTypes.GET_LOCATIONS_UNDER_USER_SUCCESS,
      ActionTypes.GET_LOCATIONS_UNDER_USER_FAILURE
    ]
  };
  return {
    url: URL.ORG_TEMPLATE.GET_LOCATION_BASED_ON_USER.replace(
      ':organizationId',
      orgId
    )
      .replace(':serviceProviderId', providerId)
      .replace(':roleId', roleId)
      .replace(':userId', userId),
    api: restAPI.get,
    payload
  };
}

export function updateAssignedWorkerLocation(
  data,
  orgId,
  providerId,
  roleId,
  useId
) {
  let payload = {
    types: [
      ActionTypes.UPDATE_ASSIGNED_WORKER_LOCATION_REQUEST,
      ActionTypes.UPDATE_ASSIGNED_WORKER_LOCATION_SUCCESS,
      ActionTypes.UPDATE_ASSIGNED_WORKER_LOCATION_FAILURE
    ],
    body: data
  };
  return {
    url: URL.ORG_TEMPLATE.UPDATE_WORKER_LOCATIONS.replace(
      ':organizationId',
      orgId
    )
      .replace(':serviceProviderId', providerId)
      .replace(':roleId', roleId)
      .replace(':userId', useId),
    api: restAPI.put,
    payload
  };
}

export function getAllUsersUnderOrganizations(
  orgId,
  providerId,
  userId,
  roleId
) {
  let payload = {
    types: [
      ActionTypes.GET_ALL_USER_UNDER_ORG_FOR_SP_REQUEST,
      ActionTypes.GET_ALL_USER_UNDER_ORG_FOR_SP_SUCCESS,
      ActionTypes.GET_ALL_USER_UNDER_ORG_FOR_SP_FAILURE
    ]
  };
  return {
    url: URL.ORG_TEMPLATE.GET_ALL_USER_UNDER_ORGANISATION_FOR_SP.replace(
      ':organizationId',
      orgId
    )
      .replace(':serviceProviderId', providerId)
      .replace(':roleId', roleId)
      .replace(':userId', userId),
    api: restAPI.get,
    payload
  };
}

export function updateAllUserUnderOrg(data, orgId, providerId, roleId, userId) {
  let payload = {
    types: [
      ActionTypes.UPDATE_ALL_USER_UNDER_ORG_REQUEST,
      ActionTypes.UPDATE_ALL_USER_UNDER_ORG_SUCCESS,
      ActionTypes.UPDATE_ALL_USER_UNDER_ORG_FAILURE
    ],
    body: data
  };
  return {
    url: URL.ORG_TEMPLATE.UPDATE_USER_UNDER_ORG.replace(
      ':organizationId',
      orgId
    )
      .replace(':serviceProviderId', providerId)
      .replace(':roleId', roleId)
      .replace(':userId', userId),
    api: restAPI.put,
    payload
  };
}

export function deleteServiceProvider(orgId, id) {
  let payload = {
    types: [
      ActionTypes.DELETE_SERVICE_PROVIDER_REQUEST,
      ActionTypes.DELETE_SERVICE_PROVIDER_SUCCESS,
      ActionTypes.DELETE_SERVICE_PROVIDER_FAILURE
    ]
  };
  return {
    url: URL.ORGANIZATION.DELETE_SERVICE_PROVIDER.replace(
      ':organizationId',
      orgId
    ).replace(':serviceProviderId', id),
    api: restAPI.del,
    payload
  };
}

export function listJsonDataForOrgs({ type, searchValue, searchKey }) {
  let payload = {
    types: [
      ActionTypes.LIST_JSON_DATA_FOR_ORG_FILTER_REQUEST,
      ActionTypes.LIST_JSON_DATA_FOR_ORG_FILTER_SUCCESS,
      ActionTypes.LIST_JSON_DATA_FOR_ORG_FILTER_FAILURE
    ],
    params: { type, searchValue, searchKey }
  };
  return {
    url: URL.ORGANIZATION.LIST_ALL_ORGANIZATION_NAME,
    api: restAPI.get,
    payload
  };
}

export function listJsonDataForService({ type, searchValue, searchKey }) {
  let payload = {
    types: [
      ActionTypes.LIST_JSON_DATA_FOR_SERVICE_FILTER_REQUEST,
      ActionTypes.LIST_JSON_DATA_FOR_SERVICE_FILTER_SUCCESS,
      ActionTypes.LIST_JSON_DATA_FOR_SERVICE_FILTER_FAILURE
    ],
    params: { type, searchValue, searchKey }
  };
  return {
    url: URL.SERVICE.LIST_SERVICE,
    api: restAPI.get,
    payload
  };
}

export function listServiceById(serviceId) {
  let payload = {
    types: [
      ActionTypes.LIST_SERVICE_BY_ID_REQUEST,
      ActionTypes.LIST_SERVICE_BY_ID_SUCCESS,
      ActionTypes.LIST_SERVICE_BY_ID_FAILURE
    ]
  };
  return {
    url: URL.SERVICE.LIST_SERVICE_BY_ID.replace(':serviceConfigId', serviceId),
    api: restAPI.get,
    payload
  };
}
export function getWardsUnderProvider(organizationId, provider) {
  let payload = {
    types: [
      ActionTypes.GET_WARDS_UNDER_SERVICE_PROVIDER_ID_REQUEST,
      ActionTypes.GET_WARDS_UNDER_SERVICE_PROVIDER_ID_SUCCESS,
      ActionTypes.GET_WARDS_UNDER_SERVICE_PROVIDER_ID_FAILURE
    ]
  };
  return {
    url: URL.REASSIGNGT.GET_ALL_WARDS_BY_PROVIDER_ID.replace(':organizationId', organizationId).replace(':serviceProviderId', provider),
    api: restAPI.get,
    payload
  };
}

export function getGtBasedOnWard(providerId, wardId) {
  let payload = {
    types: [
      ActionTypes.GET_GT_BASED_ON_WARD_ID_REQUEST,
      ActionTypes.GET_GT_BASED_ON_WARD_ID_SUCCESS,
      ActionTypes.GET_GT_BASED_ON_WARD_ID_FAILURE
    ]
  };
  return {
    url: URL.REASSIGNGT.GET_GT_BASED_ON_WARD_ID.replace(':serviceProviderId', providerId).replace(':wardId', wardId),
    api: restAPI.get,
    payload
  };
}

export function getCustomerBasedOnGt(data) {
  const { data: { gtId, page, size } } = data;
  let payload = {
    types: [
      ActionTypes.GET_CUSTOMERS_BASED_ON_GT_ID_REQUEST,
      ActionTypes.GET_CUSTOMERS_BASED_ON_GT_ID_SUCCESS,
      ActionTypes.GET_CUSTOMERS_BASED_ON_GT_ID_FAILURE
    ],
    params: { page, size }
  };
  return {
    url: URL.REASSIGNGT.GET_CUSTOMERS_BASED_ON_GT_ID.replace(':surveyorId', gtId),
    api: restAPI.get,
    payload
  };
}

export function getSuperVisor(orgId, providerId) {
  const multiTenant = true;
  let payload = {
    types: [
      ActionTypes.GET_SUPER_VISORS_REQUEST,
      ActionTypes.GET_SUPER_VISORS_SUCCESS,
      ActionTypes.GET_SUPER_VISORS_FAILURE
    ],
    params: { multiTenant }
  };
  return {
    url: URL.REASSIGNGT.GET_SUPER_VISOR.replace(':organizationId', orgId).replace(':serviceProviderId', providerId).replace(':roleId', superVisorRoleId),
    api: restAPI.get,
    payload
  };
}

export function getToGtWithSuperVisorId(orgId, providerId, superVisorId) {
  let payload = {
    types: [
      ActionTypes.GET_TO_GT_WITH_SUPER_VISOR_ID_REQUEST,
      ActionTypes.GET_TO_GT_WITH_SUPER_VISOR_ID_SUCCESS,
      ActionTypes.GET_TO_GT_WITH_SUPER_VISOR_ID_FAILURE
    ]
  };
  return {
    url: URL.REASSIGNGT.GET_TO_GT.replace(':organizationId', orgId).replace(':serviceProviderId', providerId).replace(':supervisorId', superVisorId),
    api: restAPI.get,
    payload
  };
}

export function postReAssignGt(data, fromGtId, toGtId) {
  let payload = {
    types: [
      ActionTypes.POST_RE_ASSIGN_GT_REQUEST,
      ActionTypes.POST_RE_ASSIGN_GT_SUCCESS,
      ActionTypes.POST_RE_ASSIGN_GT_FAILURE
    ],
    body: data
  };
  return {
    url: URL.REASSIGNGT.POST_RE_ASSIGN_GT.replace(':currentSurveyorId', fromGtId).replace(':newSurveyorId', toGtId),
    api: restAPI.put,
    payload
  };
}


export function updateReAssignSuperVisor(data, fromSuperVisorId, toSuperVisorId, orgId, providerId) {
  let payload = {
    types: [
      ActionTypes.UPDATE_RE_ASSIGN_SUPER_VISOR_REQUEST,
      ActionTypes.UPDATE_RE_ASSIGN_SUPER_VISOR_SUCCESS,
      ActionTypes.UPDATE_RE_ASSIGN_SUPER_VISOR_FAILURE
    ],
    body: data
  };
  return {
    url: URL.REASSIGNGT.POST_RE_ASSIGN_SUPER_VISOR.replace(':organizationId', orgId).replace(':organizationServiceProviderId', providerId).replace(':currentSupervisorId', fromSuperVisorId).replace(':newSupervisorId', toSuperVisorId),
    api: restAPI.put,
    payload
  };
}
export function toggleStatus(data) {
  const { id, status } = data;
  let payload = {
    types: [
      ActionTypes.TOGGLE_STATUS_REQUEST,
      ActionTypes.TOGGLE_STATUS_SUCCESS,
      ActionTypes.TOGGLE_STATUS_FAILURE
    ],
    body: data
  };
  return {
    url: URL.ORGANIZATION.TOGGLE_STATUS.replace(':sId', id).replace(':active', status),
    api: restAPI.put,
    payload
  };
}

export function loadTemplates(data) {
  const { id } = data;
  let payload = {
    types: [
      ActionTypes.LOAD_TEMPLATES_REQUEST,
      ActionTypes.LOAD_TEMPLATES_SUCCESS,
      ActionTypes.LOAD_TEMPLATES_FAILURE
    ],
    body: data
  };
  return {
    url: URL.ORGANIZATION.LOAD_TEMPLATES.replace(':orgId', id).replace(':mId', 2),
    api: restAPI.get,
    payload
  };
}

export function loadServices(data) {
  const { id } = data;
  let payload = {
    types: [
      ActionTypes.LOAD_SERVICES_REQUEST,
      ActionTypes.LOAD_SERVICES_SUCCESS,
      ActionTypes.LOAD_SERVICES_FAILURE
    ],
    params: { bundledServiceIds: id }
  };
  return {
    url: URL.ORGANIZATION.LOAD_SERVICES,
    api: restAPI.get,
    payload
  };
}

export function fetchOrganizationAssignUsers({ params, organizationId }) {
  let payload = {
    types: [ActionTypes.FETCH_ORGANIZATION_ASSIGN_USERS_REQUEST, ActionTypes.FETCH_ORGANIZATION_ASSIGN_USERS_SUCCESS, ActionTypes.FETCH_ORGANIZATION_ASSIGN_USERS_FAILURE],
    params
  };
  return {
    url: URL.ORGANIZATION.FETCH_USER_ORGANIZATION_MAPPING.replace(':organizationId', organizationId),
    api: restAPI.get,
    payload
  };
}

export function fetchAssignOrganization({ params, organizationId }) {
  let payload = {
    types: [ActionTypes.FETCH_ASSIGN_ORGANIZATION_REQUEST, ActionTypes.FETCH_ASSIGN_ORGANIZATION_SUCCESS, ActionTypes.FETCH_ASSIGN_ORGANIZATION_FAILURE],
    params
  };
  return {
    url: URL.ORGANIZATION.FETCH_ASSIGN_ORGANIZATION_MAPPING.replace(':organizationId', organizationId),
    api: restAPI.get,
    payload
  };
}

export function fetchAssignRole({ params, organizationId, roleId }) {
  let payload = {
    types: [ActionTypes.FETCH_ASSIGN_ROLE_IN_ORG_REQUEST, ActionTypes.FETCH_ASSIGN_ROLE_IN_ORG_SUCCESS, ActionTypes.FETCH_ASSIGN_ROLE_IN_ORG_FAILURE],
    params
  };
  return {
    url: URL.ORGANIZATION.FETCH_ASSIGN_ROLE.replace(':orgId', organizationId).replace(':roleId', roleId),
    api: restAPI.get,
    payload
  };
}

export function getSwSuperVisorFromWard({ wardId, orgId, providerId }) {
  const multiTenant = true;
  let payload = {
    types: [ActionTypes.GET_SW_SUPERVISOR_FOR_WARD_REQUEST, ActionTypes.GET_SW_SUPERVISOR_FOR_WARD_SUCCESS, ActionTypes.GET_SW_SUPERVISOR_FOR_WARD_FAILURE],
    params: { wardId, multiTenant }
  };
  return {
    url: URL.ORGANIZATION.GET_SW_SUPER_VISOR_FROM_WARD.replace(':orgId', orgId).replace(':serviceProviderId', providerId),
    api: restAPI.get,
    payload
  };
}
export function updateReAssignSupervisorData({ wardId, oldSuperVisorId, newSupervisorId, organizationid, providerId }) {
  let payload = {
    types: [ActionTypes.SUBMIT_RE_ASSIGN_SUPERVISOR_DATA_REQUEST, ActionTypes.SUBMIT_RE_ASSIGN_SUPERVISOR_DATA_SUCCESS, ActionTypes.SUBMIT_RE_ASSIGN_SUPERVISOR_DATA_FAILURE]
  };
  return {
    url: URL.ORGANIZATION.SUBMIT_RE_ASSIGN_SUPERVISOR.replace(':organizationId', organizationid).replace(':serviceProviderId', providerId).replace(':wardId', wardId).replace(':oldSupervisorId', oldSuperVisorId).replace(':newSupervisorId', newSupervisorId),
    api: restAPI.put,
    payload
  };
}

export function getServiceWorkerFromSwSuperVisor({ wardId, orgId, providerId, swSuperVisorId }) {
  let payload = {
    types: [ActionTypes.GET_SERVICE_WORKER_FROM_SW_SUPERVISOR_REQUEST, ActionTypes.GET_SERVICE_WORKER_FROM_SW_SUPERVISOR_SUCCESS, ActionTypes.GET_SERVICE_WORKER_FROM_SW_SUPERVISOR_FAILURE]
  };
  return {
    url: URL.ORGANIZATION.GET_SERVICE_WORKER_FROM_SUPERVISOR.replace(':organizationId', orgId).replace(':serviceProviderId', providerId).replace(':wardId', wardId).replace(':supervisorId', swSuperVisorId),
    api: restAPI.get,
    payload
  };
}

export function updateReAssignWorkerData({ wardId, oldServiceWorkerId, newServiceWorkerId, organizationid, providerId, superVisorId }) {
  let payload = {
    types: [ActionTypes.SUBMIT_RE_ASSIGN_WORKER_DATA_REQUEST, ActionTypes.SUBMIT_RE_ASSIGN_WORKER_DATA_SUCCESS, ActionTypes.SUBMIT_RE_ASSIGN_WORKER_DATA_FAILURE]
  };
  return {
    url: URL.ORGANIZATION.SUBMIT_RE_ASSIGN_WORKER.replace(':organizationId', organizationid).replace(':serviceProviderId', providerId).replace(':wardId', wardId).replace(':oldServiceWrokerId', oldServiceWorkerId).replace(':newServiceWorkerId', newServiceWorkerId).replace(':supervisorId', superVisorId),
    api: restAPI.put,
    payload
  };
}

export function getCustomerToServiceWorkerData({ params, supervisorId, organizationId, wardId, serviceProviderId, gtId }) {
  let payload = {
    types: [ActionTypes.FETCH_ORGANIZATION_ASSIGN_CUSTOMER_TO_SERVICE_WORKER_REQUEST, ActionTypes.FETCH_ORGANIZATION_ASSIGN_CUSTOMER_TO_SERVICE_WORKER_SUCCESS, ActionTypes.FETCH_ORGANIZATION_ASSIGN_CUSTOMER_TO_SERVICE_WORKER_FAILURE],
    params
  };
  return {
    url: URL.ORGANIZATION.GET_DATAS_FOR_CUSTOMER_TO_SERVICE_WORKER.replace(':organizationId', organizationId).replace(':serviceProviderId', serviceProviderId).replace(':wardId', wardId).replace(':supervisorId', supervisorId).replace(':gtId', gtId),
    api: restAPI.get,
    payload
  };
}

export function submitCustomerNumberForAssignCustomerToServiceWorker({ wardId, customerToServiceWorkerObj, organizationId, serviceProviderId, supervisorId, gtId, allSelected }) {
  let payload = {
    types: [ActionTypes.SUBMIT_CUSTOMER_NUMBER_FOR_CUSTOMER_TO_SERVICE_WORKER_REQUEST, ActionTypes.SUBMIT_CUSTOMER_NUMBER_FOR_CUSTOMER_TO_SERVICE_WORKER_SUCCESS, ActionTypes.SUBMIT_CUSTOMER_NUMBER_FOR_CUSTOMER_TO_SERVICE_WORKER_FAILURE],
    params: { allSelected },
    body: customerToServiceWorkerObj
  };
  return {
    url: URL.ORGANIZATION.SUBMIT_CUSTOMER_NUMBERS_FOR_ASSIGN_CUSTOMER_TO_SERVICE_WORKER.replace(':organizationId', organizationId).replace(':serviceProviderId', serviceProviderId).replace(':supervisorId', supervisorId).replace(':gtId', gtId).replace(':wardId', wardId),
    api: restAPI.put,
    payload
  };
}

export function fetchVendorDetails({ params, organizationId }) {
  let payload = {
    types: [ActionTypes.FETCH_VENDOR_DETAILS_REQUEST, ActionTypes.FETCH_VENDOR_DETAILS_SUCCESS, ActionTypes.FETCH_VENDOR_DETAILS_FAILURE],
    params
  };
  return {
    url: URL.ORGANIZATION.ASSIGN_VENDORS_LIST.replace(':organizationId', organizationId),
    api: restAPI.get,
    payload
  };
}
export function saveVendor({ id, assignVendorData }) {
  let payload = {
    types: [ActionTypes.SAVE_VENDOR_DETAILS_REQUEST, ActionTypes.SAVE_VENDOR_DETAILS_SUCCESS, ActionTypes.SAVE_VENDOR_DETAILS_FAILURE],
    body: assignVendorData
  };
  return {
    url: URL.ORGANIZATION.SAVE_ASSIGN_VENDOR_ITEM.replace(':organizationId', id),
    api: restAPI.post,
    payload
  };
}
export function deleteVendor({ id, orgId }) {
  let payload = {
    types: [ActionTypes.DELETE_VENDOR_DETAILS_REQUEST, ActionTypes.DELETE_VENDOR_DETAILS_SUCCESS, ActionTypes.DELETE_VENDOR_DETAILS_FAILURE]
  };
  return {
    url: URL.ORGANIZATION.DELETE_ASSIGN_VENDORS.replace(':organizationId', orgId).replace(':organizationVendorItemPriceId', id),
    api: restAPI.del,
    payload
  };
}
export function updateVendor({ id, vendorId, assignVendorData }) {
  let payload = {
    types: [ActionTypes.UPDATE_VENDOR_DETAILS_REQUEST, ActionTypes.UPDATE_VENDOR_DETAILS_SUCCESS, ActionTypes.UPDATE_VENDOR_DETAILS_FAILURE],
    body: assignVendorData
  };
  return {
    url: URL.ORGANIZATION.FETCH_ASSIGN_VENDORS_BY_ID.replace(':organizationId', id).replace(':organizationVendorItemPriceId', vendorId),
    api: restAPI.put,
    payload
  };
}
export function fetchVendorById({ langId, id, vendorId }) {
  let payload = {
    types: [ActionTypes.FETCH_VENDOR_DETAILS_BY_ID_REQUEST, ActionTypes.FETCH_VENDOR_DETAILS_BY_ID_SUCCESS, ActionTypes.FETCH_VENDOR_DETAILS_BY_ID_FAILURE],
    params: { langId }
  };
  return {
    url: URL.ORGANIZATION.FETCH_ASSIGN_VENDORS_BY_ID.replace(':organizationId', id).replace(':organizationVendorItemPriceId', vendorId),
    api: restAPI.get,
    payload
  };
}
export function getAllItem() {
  const type = 'dropdown';
  let payload = {
    types: [ActionTypes.GET_ALL_ITEM_FOR_ASSIGN_VENDOR_REQUEST, ActionTypes.GET_ALL_ITEM_FOR_ASSIGN_VENDOR_SUCCESS, ActionTypes.GET_ALL_ITEM_FOR_ASSIGN_VENDOR_FAILURE],
    params: { type }
  };
  return {
    url: URL.ORGANIZATION.GET_ALL_ITEM,
    api: restAPI.get,
    payload
  };
}

export function getAllItemType() {
  const type = 'dropdown';

  let payload = {
    types: [ActionTypes.GET_ALL_ITEM_TYPE_FOR_ASSIGN_VENDOR_REQUEST, ActionTypes.GET_ALL_ITEM_TYPE_FOR_ASSIGN_VENDOR_SUCCESS, ActionTypes.GET_ALL_ITEM_TYPE_FOR_ASSIGN_VENDOR_FAILURE],
    params: { type }

  };
  return {
    url: URL.ORGANIZATION.GET_ALL_ITEM_TYPE,
    api: restAPI.get,
    payload
  };
}

export const fetchAdditionalBasicDetailsById = ({ organizationId }) => {
  let payload = {
    types: [ActionTypes.FETCH_ADDITIONAL_BASIC_DETAILS_REQUEST, ActionTypes.FETCH_ADDITIONAL_BASIC_DETAILS_SUCCESS, ActionTypes.FETCH_ADDITIONAL_BASIC_DETAILS_FAILURE]
  };
  return {
    url: URL.ORGANIZATION.ADDITIONAL_DETAILS.DETAILS_BY_ORG_ID.replace(':organizationId', organizationId),
    api: restAPI.get,
    payload
  };
};

export const fetchAdditionalBasicDetailsWards = (data) => {
  const type = 'dropdown';
  const { organizationId } = data;
  let payload = {
    types: [ActionTypes.FETCH_ADDITIONAL_BASIC_DETAILS_WARDS_REQUEST, ActionTypes.FETCH_ADDITIONAL_BASIC_DETAILS_WARDS_SUCCESS, ActionTypes.FETCH_ADDITIONAL_BASIC_DETAILS_WARDS_FAILURE],
    params: { type }
  };
  return {
    url: URL.ORGANIZATION.ADDITIONAL_DETAILS.WARDS.replace(':organizationId', organizationId),
    api: restAPI.get,
    payload
  };
};

export const updateAdditionalBasicDetails = ({ id, organizationId, ...body }) => {
  let payload = {
    types: [ActionTypes.SAVE_ADDITIONAL_BASIC_DETAILS_REQUEST, ActionTypes.SAVE_ADDITIONAL_BASIC_DETAILS_SUCCESS, ActionTypes.SAVE_ADDITIONAL_BASIC_DETAILS_FAILURE],
    body
  };
  return {
    url: URL.ORGANIZATION.ADDITIONAL_DETAILS.UPDATE.replace(':organizationId', organizationId).replace(':organizationMcfId', id),
    api: restAPI.put,
    payload
  };
};

export const saveAdditionalBasicDetails = ({ organizationId, ...body }) => {
  let payload = {
    types: [ActionTypes.SAVE_ADDITIONAL_BASIC_DETAILS_REQUEST, ActionTypes.SAVE_ADDITIONAL_BASIC_DETAILS_SUCCESS, ActionTypes.SAVE_ADDITIONAL_BASIC_DETAILS_FAILURE],
    body
  };
  return {
    url: URL.ORGANIZATION.ADDITIONAL_DETAILS.SAVE.replace(':organizationId', organizationId),
    api: restAPI.post,
    payload
  };
};

export function submitAssignRoles({ organizationId, roleId, requestBody }) {
  let payload = {
    types: [ActionTypes.SUBMIT_FETCH_ASSIGN_ROLE_IN_ORG_REQUEST, ActionTypes.SUBMIT_FETCH_ASSIGN_ROLE_IN_ORG_SUCCESS, ActionTypes.SUBMIT_FETCH_ASSIGN_ROLE_IN_ORG_FAILURE],
    body: requestBody
  };
  return {
    url: URL.ORGANIZATION.FETCH_ASSIGN_ROLE.replace(':orgId', organizationId).replace(':roleId', roleId),
    api: restAPI.put,

    payload
  };
}
export function fetchComplaintEscalation({ params, orgId }) {
  let payload = {
    types: [ActionTypes.COMPLAINT_EM_LIST_REQUEST, ActionTypes.COMPLAINT_EM_LIST_SUCCESS, ActionTypes.COMPLAINT_EM_LIST_FAILED],
    params
  };
  return {
    url: URL.ORGANIZATION.COMPLAINT_ESCALATION_MATRIX.replace(':organizationId', orgId),
    api: restAPI.get,
    payload
  };
}
export function saveComplaintEscalation({ orgId, data }) {
  let payload = {
    types: [ActionTypes.COMPLAINT_EM_SAVE_REQUEST, ActionTypes.COMPLAINT_EM_SAVE_SUCCESS, ActionTypes.COMPLAINT_EM_SAVE_FAILED],
    body: data
  };
  return {
    url: URL.ORGANIZATION.COMPLAINT_ESCALATION_MATRIX.replace(':organizationId', orgId),
    api: restAPI.post,
    payload
  };
}

export function deleteComplaintEscalation(Id) {

  let payload = {
    types: [ActionTypes.COMPLAINT_EM_DELETE_REQUEST, ActionTypes.COMPLAINT_EM_DELETE_SUCCESS, ActionTypes.COMPLAINT_EM_DELETE_FAILED]
  };
  return {
    url: URL.ORGANIZATION.COMPLAINT_ESCALATION_MATRIX_BY_ID.replace(':organizationId', Id?.orgId).replace(':escalationMatrixMappingId', Id?.cemId),
    api: restAPI.del,
    payload
  };
}
export function fetchComplaintEscalationById({ params, orgId, cemId }) {
  let payload = {
    types: [ActionTypes.COMPLAINT_EM_GET_BY_ID_REQUEST, ActionTypes.COMPLAINT_EM_GET_BY_ID_SUCCESS, ActionTypes.COMPLAINT_EM_GET_BY_ID_FAILED],
    params
  };
  return {
    url: URL.ORGANIZATION.COMPLAINT_ESCALATION_MATRIX_BY_ID.replace(':organizationId', orgId).replace(':escalationMatrixMappingId', cemId),
    api: restAPI.get,
    payload
  };
}
export function updateComplaintEscalationById({ orgId, cemId, data }) {
  let payload = {
    types: [ActionTypes.COMPLAINT_EM_UPDATE_REQUEST, ActionTypes.COMPLAINT_EM_UPDATE_SUCCESS, ActionTypes.COMPLAINT_EM_UPDATE_FAILED],
    body: data
  };
  return {
    url: URL.ORGANIZATION.COMPLAINT_ESCALATION_MATRIX_BY_ID.replace(':organizationId', orgId).replace(':escalationMatrixMappingId', cemId),
    api: restAPI.put,
    payload
  };
}
export function listComplaints({ params }) {
  let payload = {
    types: [ActionTypes.COMPLAINT_LIST_REQUEST, ActionTypes.COMPLAINT_LIST_SUCCESS, ActionTypes.COMPLAINT_LIST_FAILED],
    params
  };
  return {
    url: URL.ORGANIZATION.LIST_COMPLAINTS,
    api: restAPI.get,
    payload
  };
}
export function listRoles() {
  let payload = {
    types: [ActionTypes.ROLE_LIST_REQUEST, ActionTypes.ROLE_LIST_SUCCESS, ActionTypes.ROLE_LIST_FAILED]
  };
  return {
    url: URL.ORGANIZATION.LIST_ROLE,
    api: restAPI.get,
    payload
  };
}
export function listTemplate() {
  let payload = {
    types: [ActionTypes.TEMPLATE_LIST_REQUEST, ActionTypes.TEMPLATE_LIST_SUCCESS, ActionTypes.TEMPLATE_LIST_FAILED],
    params: { type: 'dropdown' }
  };
  return {
    url: URL.ORGANIZATION.LIST_TEMPLATE,
    api: restAPI.get,
    payload
  };
}
export function listTemplateType() {
  let payload = {
    types: [ActionTypes.TEMPLATE_TYPE_LIST_REQUEST, ActionTypes.TEMPLATE_TYPE_LIST_SUCCESS, ActionTypes.TEMPLATE_TYPE_LIST_FAILED],
    params: { type: 'dropdown' }
  };
  return {
    url: URL.ORGANIZATION.LIST_TEMPLATE_TYPE,
    api: restAPI.get,
    payload
  };
}
