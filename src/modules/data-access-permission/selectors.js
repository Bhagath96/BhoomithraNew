import _ from 'lodash';
import { STATE_REDUCER_KEY } from './constants';

export const getDataAccessPermission = state => state[STATE_REDUCER_KEY];

const dataAccessPermissionRoleAssignee = (dataAccessPermission) => dataAccessPermission.dataAccessPermissionRoleAssignee;
export const getDataAccessPermissionRoleAssignee = _.flow(getDataAccessPermission, dataAccessPermissionRoleAssignee);


const dataAccessPermissionUserRole = (dataAccessPermission) => dataAccessPermission.dataAccessPermissionUserRole;
export const getDataAccessPermissionUserRole = _.flow(getDataAccessPermission, dataAccessPermissionUserRole);
