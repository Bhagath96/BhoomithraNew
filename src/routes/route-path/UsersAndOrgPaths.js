import { PATH } from '..';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../common/Permissions';
import { listOrganisationView } from '../../modules/organization/components';
import AddComplaintEscalation from '../../modules/organization/components/AddComplaintEscalation';
import AddServiceProvider from '../../modules/organization/components/ServiceProvider/addServiceProvider';
import CommonServiceProviderEdit from '../../modules/organization/components/ServiceProvider/CommonServiceProviderEdit';
import CreateService from '../../modules/organization/components/ServiceProvider/CreateService';
import CreateAssignVendor from '../../modules/organization/components/vendors/CreateAssignVendor';
import { AddOrganization, OrganizationMainPage } from '../../modules/organization/containers';
import { CommonEditView, CommonView, CreateRoleView } from '../../modules/roles/components';
import { AddUserView, CommonAddPage, ListUserView } from '../../modules/user-management/components';
import { UserGroupMainPageViews } from '../../modules/userGroup/components';
import { AddUserGroup, ListUserGroup } from '../../modules/userGroup/containers';
import { menuAccessPermissions } from '../../utils/PermissionUtils';


export const getOrgPaths = (userDetails) => {
    let orgRoutes = [];
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION, ACTION_MAPPING.ORGANIZATION.LIST)) {
        orgRoutes.push({ path: PATH.ORGANIZATION, component: listOrganisationView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION, ACTION_MAPPING.ORGANIZATION.ADD)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/create`, component: AddOrganization });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_DETAILS, ACTION_MAPPING.ORGANIZATION_DETAILS.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/basic`, component: OrganizationMainPage });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_ASSIGN_ROLE, ACTION_MAPPING.ORGANIZATION_ASSIGN_ROLE.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/assignRole`, component: OrganizationMainPage });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_ASSIGN_USER, ACTION_MAPPING.ORGANIZATION_ASSIGN_USER.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/assignUser`, component: OrganizationMainPage });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_ASSIGN_MODULE, ACTION_MAPPING.ORGANIZATION_ASSIGN_MODULE.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/assignModule`, component: OrganizationMainPage });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_ASSIGN_VENDOR_ITEM, ACTION_MAPPING.ORGANIZATION_ASSIGN_VENDOR_ITEM.LIST)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/assignVendorItem`, component: OrganizationMainPage });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_ASSIGN_VENDOR_ITEM, ACTION_MAPPING.ORGANIZATION_ASSIGN_VENDOR_ITEM.ADD)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/assignVendorItem/create`, component: CreateAssignVendor });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_ASSIGN_VENDOR_ITEM, ACTION_MAPPING.ORGANIZATION_ASSIGN_VENDOR_ITEM.EDIT_IN_ACTION)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/assignVendorItem/:vendorId`, component: CreateAssignVendor });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_ASSIGN_MODULE, ACTION_MAPPING.ORGANIZATION_ASSIGN_MODULE.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/assignOrganization`, component: OrganizationMainPage });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_ADDITIONAL_DETAILS, ACTION_MAPPING.ORGANIZATION_ADDITIONAL_DETAILS.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/additionalBasicDetails`, component: OrganizationMainPage });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_ASSIGN_CUSTOMER_TO_SERVICE_WORKER, ACTION_MAPPING.ORGANIZATION_ASSIGN_CUSTOMER_TO_SERVICE_WORKER.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/assignCustomerToServiceWorker`, component: OrganizationMainPage });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/serviceprovider`, component: OrganizationMainPage });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_DETAILS, ACTION_MAPPING.ORGANIZATION_DETAILS.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id`, component: OrganizationMainPage });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER.ADD)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/serviceprovider/create`, component: AddServiceProvider });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_DETAILS, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_DETAILS.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/serviceprovider/:providerId/details`, component: CommonServiceProviderEdit });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_LOCATION, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_LOCATION.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/serviceprovider/:providerId/assignedLocation`, component: CommonServiceProviderEdit });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/serviceprovider/:providerId/assignWorker`, component: CommonServiceProviderEdit });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER_LOCATION, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER_LOCATION.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/serviceprovider/:providerId/assignedWorkerLocation`, component: CommonServiceProviderEdit });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER_TO_SUPERVISOR, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER_TO_SUPERVISOR.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/serviceprovider/:providerId/assignedWorkerToSuperVisor`, component: CommonServiceProviderEdit });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_SERVICE, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_SERVICE.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/serviceprovider/:providerId/service`, component: CommonServiceProviderEdit });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_CONTACT, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_CONTACT.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/serviceprovider/:providerId/contactDetail`, component: CommonServiceProviderEdit });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_REASSIGN_SUPERVISOR, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_REASSIGN_SUPERVISOR.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/serviceprovider/:providerId/reassignSuperVisor`, component: CommonServiceProviderEdit });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_REASSIGN_WORKER, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_REASSIGN_WORKER.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/serviceprovider/:providerId/reAssignworker`, component: CommonServiceProviderEdit });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_SERVICE, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_SERVICE.ADD)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/serviceprovider/:providerId/service/create`, component: CreateService });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_SERVICE, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_SERVICE.EDIT_IN_ACTION)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/serviceprovider/:providerId/service/:serviceId`, component: CreateService });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_API_PROVIDER, ACTION_MAPPING.ORGANIZATION_API_PROVIDER.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/apiProvider`, component: OrganizationMainPage });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_ASSIGN_TEMPLATE, ACTION_MAPPING.ORGANIZATION_ASSIGN_TEMPLATE.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/assignTemplate`, component: OrganizationMainPage });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_COMPLAINT_ESCALATION_MATRIX, ACTION_MAPPING.ORGANIZATION_COMPLAINT_ESCALATION_MATRIX.ACCESS_IN_TAB)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/ComplaintEscalationMatrix`, component: OrganizationMainPage });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_COMPLAINT_ESCALATION_MATRIX, ACTION_MAPPING.ORGANIZATION_COMPLAINT_ESCALATION_MATRIX.ADD)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/ComplaintEscalationMatrix/create`, component: AddComplaintEscalation });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_COMPLAINT_ESCALATION_MATRIX, ACTION_MAPPING.ORGANIZATION_COMPLAINT_ESCALATION_MATRIX.EDIT_IN_ACTION)) {
        orgRoutes.push({ path: `${PATH.ORGANIZATION}/:id/ComplaintEscalationMatrix/:complaintEscalationId`, component: AddComplaintEscalation });
    }
    return orgRoutes;
};


export const getUsersPaths = (userDetails) => {
    let userRoutes = [];
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.USER, ACTION_MAPPING.USER.LIST)) {
        userRoutes.push({ path: PATH.USER, component: ListUserView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.USER, ACTION_MAPPING.USER.ADD)) {
        userRoutes.push({ path: `${PATH.USER}/create`, component: AddUserView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.USER_DETAILS, ACTION_MAPPING.USER_DETAILS.ACCESS_IN_TAB)) {
        userRoutes.push({ path: `${PATH.USER}/:id/details`, component: CommonAddPage });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.USER_CONTACT, ACTION_MAPPING.USER_CONTACT.ACCESS_IN_TAB)) {
        userRoutes.push({ path: `${PATH.USER}/:id/addContact`, component: CommonAddPage });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.USER_CHANGE_PASSWORD, ACTION_MAPPING.USER_CHANGE_PASSWORD.ACCESS_IN_TAB)) {
        userRoutes.push({ path: `${PATH.USER}/:id/addPassword`, component: CommonAddPage });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.USER_UPDATE_ADDRESS, ACTION_MAPPING.USER_UPDATE_ADDRESS.ACCESS_IN_TAB)) {
        userRoutes.push({ path: `${PATH.USER}/:id/updateAddress`, component: CommonAddPage });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.USER_ASSIGN_ORGANIZATION, ACTION_MAPPING.USER_ASSIGN_ORGANIZATION.ACCESS_IN_TAB)) {
        userRoutes.push({ path: `${PATH.USER}/:id/assignOrganizations`, component: CommonAddPage });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.USER_ASSIGN_ROLES, ACTION_MAPPING.USER_ASSIGN_ROLES.ACCESS_IN_TAB)) {
        userRoutes.push({ path: `${PATH.USER}/:id/assignRolesView`, component: CommonAddPage });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.USER_ASSIGN_USER_GROUPS, ACTION_MAPPING.USER_ASSIGN_USER_GROUPS.ACCESS_IN_TAB)) {
        userRoutes.push({ path: `${PATH.USER}/:id/assignUserGroupView`, component: CommonAddPage });
    }
    return userRoutes;
};

export const getUserGroupPaths = (userDetails) => {
    let userGroupPath = [];
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.USER_GROUP, ACTION_MAPPING.USER_GROUP.LIST)) {
        userGroupPath.push({ path: PATH.USER_GROUP, component: ListUserGroup });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.USER_GROUP, ACTION_MAPPING.USER_GROUP.LIST)) {
        userGroupPath.push({ path: `${PATH.USER_GROUP}/create`, component: AddUserGroup });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.USER_GROUP_DETAILS, ACTION_MAPPING.USER_GROUP_DETAILS.ACCESS_IN_TAB)) {
        userGroupPath.push({ path: `${PATH.USER_GROUP}/:id/details`, component: UserGroupMainPageViews });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.USER_GROUP_ASSIGN_USER, ACTION_MAPPING.USER_GROUP_ASSIGN_USER.ACCESS_IN_TAB)) {
        userGroupPath.push({ path: `${PATH.USER_GROUP}/:id/assignUser`, component: UserGroupMainPageViews });
    }
    return userGroupPath;
};

export const getRolesPaths = (userDetails) => {
    let rolesRoutes = [];
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ROLES, ACTION_MAPPING.ROLES.ACCESS_IN_WEB_NAV)) {
        rolesRoutes.push({ path: PATH.ROLE, component: CommonView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ROLES_REGULAR, ACTION_MAPPING.ROLES_REGULAR.ACCESS_IN_TAB)) {
        rolesRoutes.push({ path: PATH.REG_ROLE, component: CommonView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ROLES_ORGANIZATIONAL, ACTION_MAPPING.ROLES_ORGANIZATIONAL.ACCESS_IN_TAB)) {
        rolesRoutes.push({ path: PATH.ORG_ROLE, component: CommonView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ROLES_REGULAR, ACTION_MAPPING.ROLES_REGULAR.ADD)) {
        rolesRoutes.push({ path: `${PATH.REG_ROLE}/:roleType/create`, component: CreateRoleView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ROLES_ORGANIZATIONAL, ACTION_MAPPING.ROLES_ORGANIZATIONAL.ADD)) {
        rolesRoutes.push({ path: `${PATH.ORG_ROLE}/:roleType/create`, component: CreateRoleView });
    }

    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ROLES_REGULAR_DETAILS, ACTION_MAPPING.ROLES_REGULAR_DETAILS.ACCESS_IN_TAB)) {
        rolesRoutes.push({ path: `${PATH.REG_ROLE}/:roleType/:id/roles`, component: CommonEditView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ROLES_REGULAR_PERMISSION, ACTION_MAPPING.ROLES_REGULAR_PERMISSION.ACCESS_IN_TAB)) {
        rolesRoutes.push({ path: `${PATH.REG_ROLE}/:roleType/:id/permissions`, component: CommonEditView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ROLES_REGULAR_ASSIGNEE, ACTION_MAPPING.ROLES_REGULAR_ASSIGNEE.ACCESS_IN_TAB)) {
        rolesRoutes.push({ path: `${PATH.REG_ROLE}/:roleType/:id/assignees`, component: CommonEditView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ROLES_REGULAR_ASSIGNEE, ACTION_MAPPING.ROLES_REGULAR_ASSIGNEE.ACCESS_IN_TAB)) {
        rolesRoutes.push({ path: `${PATH.REG_ROLE}/:roleType/:id/dataAccess`, component: CommonEditView });
    }

    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ROLES_ORGANIZATIONAL_DETAILS, ACTION_MAPPING.ROLES_ORGANIZATIONAL_DETAILS.ACCESS_IN_TAB)) {
        rolesRoutes.push({ path: `${PATH.ORG_ROLE}/:roleType/:id/roles`, component: CommonEditView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ROLES_ORGANIZATIONAL_PERMISSION, ACTION_MAPPING.ROLES_ORGANIZATIONAL_PERMISSION.ACCESS_IN_TAB)) {
        rolesRoutes.push({ path: `${PATH.ORG_ROLE}/:roleType/:id/permissions`, component: CommonEditView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ROLES_ORGANIZATIONAL_ASSIGNEE, ACTION_MAPPING.ROLES_ORGANIZATIONAL_ASSIGNEE.ACCESS_IN_TAB)) {
        rolesRoutes.push({ path: `${PATH.ORG_ROLE}/:roleType/:id/assignees`, component: CommonEditView });
    }

    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ROLES_ORGANIZATIONAL_ASSIGNEE, ACTION_MAPPING.ROLES_ORGANIZATIONAL_ASSIGNEE.ACCESS_IN_TAB)) {
        rolesRoutes.push({ path: `${PATH.ORG_ROLE}/:roleType/:id/dataAccess`, component: CommonEditView });
    }
    return rolesRoutes;
};
