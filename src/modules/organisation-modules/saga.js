import { takeLatest, all, call } from 'redux-saga/effects';
import { types as ActionTypes } from './actions';
import { saga } from '../../common';
import * as API from './api';

function* listModules(action) {
    yield call(saga.handleAPIRequest, API.listModuleConfiguration, action.payload.data);
}

function* getModuleById(action) {
    yield call(saga.handleAPIRequest, API.getModulesById, action.payload.id);
}

function* listPermission() {
    yield call(saga.handleAPIRequest, API.listPermission);
}

function* getResourceActionArray(action) {
    yield call(saga.handleAPIRequest, API.getResourceArray, action.payload.data);
}

function* loadOrganizationForModule(action) {
    yield call(saga.handleAPIRequest, API.getResourceArray, action.payload.data);
}

function* updateOrganizationMapping(action) {
    yield call(saga.handleAPIRequest, API.updateOrganizationMapping, action.payload);
}

function* updateModuleDetailView(action) {
    yield call(saga.handleAPIRequest, API.updateModuleDetails, action.payload);
}

export default function* moduleSaga() {
    yield all([
        takeLatest(ActionTypes.LIST_MODULES, listModules),
        takeLatest(ActionTypes.GET_MODULE_BY_ID, getModuleById),
        takeLatest(ActionTypes.LIST_PERMISSIONS, listPermission),
        takeLatest(ActionTypes.LIST_PERMISSIONS, getResourceActionArray),
        takeLatest(ActionTypes.LOAD_ORGANISATION_FOR_MODULE, loadOrganizationForModule),
        takeLatest(ActionTypes.UPDATE_ORGANISATION_MAPPING, updateOrganizationMapping),
        takeLatest(ActionTypes.UPDATE_MODULE_DETAIL_VIEW, updateModuleDetailView)
    ]);
}
