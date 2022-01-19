import { ADMIN_ROLES, ROLE_TYPES } from '../common/constants';

export function getDefaultOrganization(userInfo = {}) {
    const { defaultOrganization } = userInfo;
    if (defaultOrganization) {
        return defaultOrganization;
    }
    return undefined;
}

export const isSuperAdmin = (roles = []) => {
    let response = false;
    roles.forEach(role => {
        if (ADMIN_ROLES.includes(role.key)) {
            response = true;
            return;
        }
    });
    return response;
};

export const hasGtRole = (userInfo = {}) => {
    if (userInfo.roles) {
        return userInfo.roles.some(role => role.key === ROLE_TYPES.ROLE_GT);
    }
};
