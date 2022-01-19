import _ from 'lodash';
import { takeLatest, fork, all, take, call, select, put } from 'redux-saga/effects';

import { saga } from '../../common';
import { I18n } from '../../common/components';
import { getDefaultLanguage, getTableProps } from '../common/selectors';
import { errorNotify } from '../../utils/ReactReduxNotifyUtils';
import { getPayloadData } from '../../utils/ApiUtils';
import * as API from './api';
import * as ActionsObj from './actions';

const { types: ActionTypes, ...Actions } = ActionsObj;

function* fetchRoleAssigneeDataAccessPermission(action) {
    let { roleId, tableId, viewId } = action.payload.data;
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield fork(saga.handleAPIRequest, API.fetchRoleAssigneeDataAccessPermission, { roleId, langId });
    const dataAccessPermissionAction = yield take([ActionTypes.FETCH_ROLE_ASSIGNEE_DATA_ACCESS_PERMISSION_SUCCESS, ActionTypes.FETCH_ROLE_ASSIGNEE_DATA_ACCESS_PERMISSION_FAILURE]);
    if (dataAccessPermissionAction.type === ActionTypes.FETCH_ROLE_ASSIGNEE_DATA_ACCESS_PERMISSION_SUCCESS) {
        // const selectedIds = yield select(getSelectedIds);
        const tableProps = yield select(getTableProps);
        let { selectedDetails = [] } = _.get(tableProps, `${tableId}`, {});
        let idIndex = 0, nameIndex = 1; // Colum index for id and Name for the selected details
        const dataAccessPermissionResponse = getPayloadData(dataAccessPermissionAction.payload, []);
        let filteredResponse = _.filter(dataAccessPermissionResponse, { roleDataAccessResponse: { dataCaptureView: { id: viewId } } });
        let response = [];
        if (!_.isEmpty(selectedDetails)) {
            _.forEach(selectedDetails, (detail) => {
                let responseData = {};
                let userId = _.get(detail, `data[${idIndex}]`, null);
                responseData.details = { id: userId, name: _.capitalize(_.get(detail, `data[${nameIndex}]`, '')) };
                let userWiseDetails = _.filter(filteredResponse, { userDataResponses: [{ user: { id: userId } }] });
                let userDataAccess = [];

                if (_.isEmpty(userWiseDetails)) {
                    // if user details not exists in API response assign all Components with Empty data
                    _.forEach(filteredResponse, accessDetails => {
                        let basicAccessDetails = _.get(accessDetails, 'roleDataAccessResponse', {});
                        let basicUserDataAccessDetails = {
                            ..._.get(basicAccessDetails, 'dataAccess', {}),
                            roleDataAccessId: _.get(basicAccessDetails, 'id', null),
                            multiData: _.get(basicAccessDetails, 'multiData', false),
                            noOfData: _.get(basicAccessDetails, 'noOfData', 1),
                            data: []
                        };
                        userDataAccess.push(basicUserDataAccessDetails);
                    });

                } else {
                    _.forEach(filteredResponse, accessDetails => {
                        let dataAccessId = _.get(accessDetails, 'roleDataAccessResponse.dataAccess.id', 0);
                        let userDataAccessDetails = {};
                        let exists = false;
                        _.forEach(userWiseDetails, user => {
                            if (dataAccessId === _.get(user, 'roleDataAccessResponse.dataAccess.id', -1)) {
                                userDataAccessDetails = {
                                    ..._.get(user, 'roleDataAccessResponse.dataAccess', {}),
                                    roleDataAccessId: _.get(user, 'roleDataAccessResponse.id', null),
                                    multiData: _.get(user, 'roleDataAccessResponse.multiData', false),
                                    noOfData: _.get(user, 'roleDataAccessResponse.noOfData', 1),
                                    data: _.find(_.get(user, 'userDataResponses', []), { user: { id: userId } })
                                };
                                exists = true;
                            }
                        });
                        if (!exists) {
                            userDataAccessDetails = {
                                ..._.get(accessDetails, 'roleDataAccessResponse.dataAccess', {}),
                                roleDataAccessId: _.get(accessDetails, 'roleDataAccessResponse.id', null),
                                multiData: _.get(accessDetails, 'roleDataAccessResponse.multiData', false),
                                noOfData: _.get(accessDetails, 'roleDataAccessResponse.noOfData', 1),
                                data: []
                            };
                        }
                        userDataAccess.push(userDataAccessDetails);
                    });
                }
                responseData.componentDetails = userDataAccess;
                response.push(responseData);
            });
        } else {
            // Empty selection from table
            yield call(errorNotify, I18n.t('no_records_selected'), 3000);
        }
        let sortedResponse = _.orderBy(response, 'details.name');
        yield put(Actions.setRoleAssigneeDataAccessPermissionResponse(sortedResponse));
    }
}

function* fetchUserRoleDataAccessPermission(action) {
    let { userId, tableId, viewId } = action.payload.data;
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield fork(saga.handleAPIRequest, API.fetchUserRoleDataAccessPermission, { userId, langId });
    const dataAccessPermissionAction = yield take([ActionTypes.FETCH_USER_ROLE_DATA_ACCESS_PERMISSION_SUCCESS, ActionTypes.FETCH_USER_ROLE_DATA_ACCESS_PERMISSION_FAILURE]);
    if (dataAccessPermissionAction.type === ActionTypes.FETCH_USER_ROLE_DATA_ACCESS_PERMISSION_SUCCESS) {
        const tableProps = yield select(getTableProps);
        let { selectedDetails = [] } = _.get(tableProps, `${tableId}`, {});
        let idIndex = 0, nameIndex = 1; // Colum index for id and Name for the selected details
        const dataAccessPermissionResponses = getPayloadData(dataAccessPermissionAction.payload, []);
        let filteredViewResponse = _.filter(dataAccessPermissionResponses, { roleDataAccessResponses: [{ dataCaptureView: { id: viewId } }] });
        let response = [];
        if (!_.isEmpty(selectedDetails)) {
            _.forEach(selectedDetails, (detail) => {
                let roleId = _.get(detail, `data[${idIndex}]`, null);
                let details = { id: roleId, name: _.get(detail, `data[${nameIndex}]`, '') };
                let componentDetails = [];
                let roleWiseDetails = _.find(filteredViewResponse, { id: roleId });
                let { roleDataAccessResponses = [] } = roleWiseDetails || {};

                _.forEach(roleDataAccessResponses, roleData => {
                    let { dataAccess = {}, id: roleDataAccessId, multiData = false, noOfData = 1, data = [] } = roleData;
                    componentDetails.push(
                        {
                            ...dataAccess,
                            roleDataAccessId,
                            multiData,
                            noOfData,
                            data: { data } // for matching with other response
                        }
                    );
                });
                response.push({ details, componentDetails });
            });
        } else {
            yield call(errorNotify, I18n.t('no_records_selected'), 3000);
        }
        yield put(Actions.setUserRoleDataAccessPermissionResponse(response));
    }
}

function* fetchAllLsgis(action) {
    let { districtId } = action.payload.data;
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchAllLsgi, { type: 'dropdown', districtId, langId });
}

function* fetchAllWards(action) {
    let { lsgiId } = action.payload.data;
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.listWards, { type: 'dropdown', lsgiId, langId });
}

function* fetchAllResidenceCategories() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchAllResidenceCategories, { type: 'dropdown', langId });
}

export default function* roleSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_ROLE_ASSIGNEE_DATA_ACCESS_PERMISSION, fetchRoleAssigneeDataAccessPermission),
        takeLatest(ActionTypes.FETCH_USER_ROLE_DATA_ACCESS_PERMISSION, fetchUserRoleDataAccessPermission),
        takeLatest(ActionTypes.FETCH_ALL_LOCAL_BODIES, fetchAllLsgis),
        takeLatest(ActionTypes.FETCH_ALL_WARDS, fetchAllWards),
        takeLatest(ActionTypes.FETCH_ALL_RESIDENCE_CATEGORY, fetchAllResidenceCategories)
    ]);
}
