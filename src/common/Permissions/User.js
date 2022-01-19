const RESOURCE_MAPPING = {
    USER: 'in.trois.common.model.entity.User',
    USER_DETAILS: 'in.trois.common.model.entity.User.Details',
    USER_CONTACT: 'in.trois.common.model.entity.User.Contact',
    USER_CHANGE_PASSWORD: 'in.trois.common.model.entity.User.ChangePassword',
    USER_UPDATE_ADDRESS: 'in.trois.common.model.entity.User.UpdateAddress',
    USER_ASSIGN_ORGANIZATION: 'in.trois.common.model.entity.User.AssignOrganization',
    USER_ASSIGN_ROLES: 'in.trois.common.model.entity.User.AssignRoles',
    USER_ASSIGN_USER_GROUPS: 'in.trois.common.model.entity.User.AssignUserGroups'
};

const ACTION_MAPPING = {
    USER: {
        ACCESS_IN_WEB_NAV: 'USER_ACCESS_IN_WEB_NAV',
        READ_ONLY: 'USER_READ_ONLY',
        LIST: 'USER_LIST',
        ADD: 'USER_ADD',
        VIEW_IN_ACTION: 'USER_LIST_VIEW_IN_ACTION',
        EDIT_IN_ACTION: 'USER_LIST_EDIT_IN_ACTION',
        DELETE_IN_ACTION: 'USER_LIST_DELETE_IN_ACTION'
    },
    USER_DETAILS: {
        ACCESS_IN_TAB: 'USER_DETAILS_ACCESS_IN_TAB',
        READ_ONLY: 'USER_DETAILS_READ_ONLY'
    },
    USER_CONTACT: {
        ACCESS_IN_TAB: 'USER_CONTACT_ACCESS_IN_TAB',
        READ_ONLY: 'USER_CONTACT_READ_ONLY'
    },
    USER_CHANGE_PASSWORD: {
        ACCESS_IN_TAB: 'USER_CHANGE_PASSWORD_ACCESS_IN_TAB',
        READ_ONLY: 'USER_CHANGE_PASSWORD_READ_ONLY'
    },
    USER_UPDATE_ADDRESS: {
        ACCESS_IN_TAB: 'USER_UPDATE_ADDRESS_ACCESS_IN_TAB',
        READ_ONLY: 'USER_UPDATE_ADDRESS_READ_ONLY'
    },
    USER_ASSIGN_ORGANIZATION: {
        ACCESS_IN_TAB: 'USER_ASSIGN_ORGANIZATION_ACCESS_IN_TAB',
        READ_ONLY: 'USER_ASSIGN_ORGANIZATION_READ_ONLY',
        ORGANIZATIONS_BELONG_TO_CURRENT_USER: 'USER_ASSIGN_ORGANIZATION_ORGANIZATIONS_BELONG_TO_CURRENT_USER',
        ORGANIZATIONS_DONT_HAVE_ANY_USER_ASSOCIATION: 'USER_ASSIGN_ORGANIZATION_ORGANIZATIONS_DONT_HAVE_ANY_USER_ASSOCIATION',
        DEFAULT_ORGANIZATION: 'USER_ASSIGN_ORGANIZATION_DEFAULT_ORGANIZATION'
    },
    USER_ASSIGN_ROLES: {
        ACCESS_IN_TAB: 'USER_ASSIGN_ROLES_ACCESS_IN_TAB',
        READ_ONLY: 'USER_ASSIGN_ROLES_READ_ONLY',
        ROLES_BELONG_TO_CURRENT_USER: 'USER_ASSIGN_ROLES_ROLES_BELONG_TO_CURRENT_USER',
        ROLES_DONT_HAVE_ANY_USER_ASSOCIATION: 'USER_ASSIGN_ROLES_ROLES_DONT_HAVE_ANY_USER_ASSOCIATION'
    },
    USER_ASSIGN_USER_GROUPS: {
        ACCESS_IN_TAB: 'USER_ASSIGN_USER_GROUPS_ACCESS_IN_TAB',
        READ_ONLY: 'USER_ASSIGN_USER_GROUPS_READ_ONLY',
        USER_GROUPS_BELONG_TO_CURRENT_USER: 'USER_ASSIGN_USER_GROUPS_USER_GROUPS_BELONG_TO_CURRENT_USER',
        USER_GROUPS_DONT_HAVE_ANY_USER_ASSOCIATION: 'USER_ASSIGN_USER_GROUPS_USER_GROUPS_DONT_HAVE_ANY_USER_ASSOCIATION'
    }
};

export default { RESOURCE_MAPPING, ACTION_MAPPING };
