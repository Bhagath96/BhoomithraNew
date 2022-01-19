import { STATE_REDUCER_KEY } from './constants';
import { STATE_REDUCER_KEY as USER_STATE_REDUCER_KEY } from '../user/constants';
import _ from '../../utils/LodashUtils';

export const getCommon = state => state[STATE_REDUCER_KEY];
export const getUserData = state => state[USER_STATE_REDUCER_KEY];

const language = (common) => common.defaultLanguage;
export const getDefaultLanguage = _.flow(getCommon, language);

const userSelectedOrganization = (user) => user.organizationSelectedValue;
export const getUserSelectedOrganisation = _.flow(getUserData, userSelectedOrganization);

const developerOptions = (common) => common.developerOptions;
export const getDeveloperOptions = _.flow(getCommon, developerOptions);

const tableProps = common => common.tableProps;
export const getTableProps = _.flow(getCommon, tableProps);

const serviceProviderTypeName = common => common.serviceProviderTypeData;
export const getserviceProviderTypeName = _.flow(getCommon, serviceProviderTypeName);

const assignServiceWorker = common => common.assignServiceWorker;
export const getAssignServiceWorker = _.flow(getCommon, assignServiceWorker);
