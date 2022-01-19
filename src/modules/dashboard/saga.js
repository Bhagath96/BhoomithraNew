import { takeLatest, all, call, fork, take, put, select } from 'redux-saga/effects';
import { setChartData, types as ActionTypes } from './actions';
import { saga } from '../../common';
import * as API from './api';
import { getPayloadData } from '../../utils/ApiUtils';
import { getDefaultLanguage } from '../common/selectors';
import { getDashboardFilters } from './selectors';
import { CHART_IDS, ISO_DATE, ORDER_BY_REQUEST } from './constants';
import _ from 'lodash';
import moment from 'moment';

function* getCommonFilters() {
    let response = {};
    const commonFilter = yield select(getDashboardFilters);
    const { common: { startDate: momentStartDate, endDate: momentEndDate } = {} } = commonFilter;
    if (momentStartDate) {
        response.startDate = moment(momentStartDate).format(ISO_DATE);
    }
    if (momentEndDate) {
        response.endDate = moment(momentEndDate).format(ISO_DATE);
    }
    return response;
}
function* getChartFilters(chartId) {
    const dashboardFilters = yield select(getDashboardFilters);
    const { [chartId]: filters = {} } = dashboardFilters;
    let response = {};
    const groupBy = _.get(filters, 'groupBy.id', null);
    if (groupBy) {
        response.groupBy = groupBy;
    }
    const sortWithLimit = _.get(filters, 'sortWithLimit.id', null);
    let sortParams = {};
    if (sortWithLimit) {
        sortParams = ORDER_BY_REQUEST[sortWithLimit];
    }
    return { ...response, ...sortParams };
}

function* getDashboardCustomerCount() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const common = yield* getCommonFilters();
    const apiRequest = { langId, ...common };
    yield call(saga.handleAPIRequest, API.loadCustomerCount, apiRequest);
}
function* getDashboardServiceCount() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const common = yield* getCommonFilters();
    const apiRequest = { langId, ...common };
    yield call(saga.handleAPIRequest, API.loadServiceCount, apiRequest);
}

function* getTotalAndPlanEnabledCustomers(action) {
    const { chart } = action.payload.data;
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const common = yield* getCommonFilters();
    const chartFilters = yield* getChartFilters(CHART_IDS.CHART_1);
    const apiRequest = { langId, ...common, ...chartFilters };
    yield fork(saga.handleAPIRequest, API.getTotalAndPlanEnabledCustomers, apiRequest);
    const responseAction = yield take([ActionTypes.TOTAL_CUSTOMERS_VS_PLAN_ENABLED_CUSTOMERS_SUCCESS, ActionTypes.TOTAL_CUSTOMERS_VS_PLAN_ENABLED_CUSTOMERS_FAILURE]);
    if (responseAction.type === ActionTypes.TOTAL_CUSTOMERS_VS_PLAN_ENABLED_CUSTOMERS_SUCCESS) {
        yield put(setChartData({ chart, data: getPayloadData(responseAction.payload, {}) }));
    }
}

function* getServiceCreatedAndRegistered(action) {
    const { chart } = action.payload.data;
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const common = yield* getCommonFilters();
    const chartFilters = yield* getChartFilters(CHART_IDS.CHART_2);
    const apiRequest = { langId, ...common, ...chartFilters };
    yield fork(saga.handleAPIRequest, API.getServiceCreatedAndRegistered, apiRequest);
    const responseAction = yield take([ActionTypes.SERVICE_CREATED_VS_SERVICE_EXECUTED_SUCCESS, ActionTypes.SERVICE_CREATED_VS_SERVICE_EXECUTED_FAILURE]);
    if (responseAction.type === ActionTypes.SERVICE_CREATED_VS_SERVICE_EXECUTED_SUCCESS) {
        yield put(setChartData({ chart, data: getPayloadData(responseAction.payload, {}) }));
    }
}

function* getCustomersRegistered(action) {
    const { chart } = action.payload.data;
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const common = yield* getCommonFilters();
    const chartFilters = yield* getChartFilters(CHART_IDS.CHART_3);
    const apiRequest = { langId, ...common, ...chartFilters };
    yield fork(saga.handleAPIRequest, API.getCustomersRegistered, apiRequest);
    const responseAction = yield take([ActionTypes.CHART_PIE_CUSTOMERS_REGISTERED_SUCCESS, ActionTypes.CHART_PIE_CUSTOMERS_REGISTERED_FAILURE]);
    if (responseAction.type === ActionTypes.CHART_PIE_CUSTOMERS_REGISTERED_SUCCESS) {
        yield put(setChartData({ chart, data: getPayloadData(responseAction.payload, {}) }));
    }
}

function* getTotalWastePerCategory(action) {
    const { chart } = action.payload.data;
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const common = yield* getCommonFilters();
    const chartFilters = yield* getChartFilters(CHART_IDS.CHART_5);
    const apiRequest = { langId, ...common, ...chartFilters };
    yield fork(saga.handleAPIRequest, API.getTotalWastePerCategory, apiRequest);
    const responseAction = yield take([ActionTypes.TOTAL_WASTE_PER_CATEGORY_SUCCESS, ActionTypes.TOTAL_WASTE_PER_CATEGORY_FAILURE]);
    if (responseAction.type === ActionTypes.TOTAL_WASTE_PER_CATEGORY_SUCCESS) {
        yield put(setChartData({ chart, data: getPayloadData(responseAction.payload, {}) }));
    }
}

function* getTimeTakenToService(action) {
    const { chart } = action.payload.data;
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const common = yield* getCommonFilters();
    const chartFilters = yield* getChartFilters(CHART_IDS.CHART_6);
    const apiRequest = { langId, ...common, ...chartFilters };
    yield fork(saga.handleAPIRequest, API.getTimeTakenToService, apiRequest);
    const responseAction = yield take([ActionTypes.TIME_TAKEN_TO_SERVICE_SUCCESS, ActionTypes.TIME_TAKEN_TO_SERVICE_FAILURE]);
    if (responseAction.type === ActionTypes.TIME_TAKEN_TO_SERVICE_SUCCESS) {
        yield put(setChartData({ chart, data: getPayloadData(responseAction.payload, {}) }));
    }
}

function* getTimeTakenToServicePerCustomer(action) {
    const { chart } = action.payload.data;
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const common = yield* getCommonFilters();
    const chartFilters = yield* getChartFilters(CHART_IDS.CHART_7);
    const apiRequest = { langId, ...common, ...chartFilters };
    yield fork(saga.handleAPIRequest, API.getTimeTakenToServicePerCustomer, apiRequest);
    const responseAction = yield take([ActionTypes.TIME_TAKEN_TO_SERVICE_PER_CUSTOMER_SUCCESS, ActionTypes.TIME_TAKEN_TO_SERVICE_PER_CUSTOMER_FAILURE]);
    if (responseAction.type === ActionTypes.TIME_TAKEN_TO_SERVICE_PER_CUSTOMER_SUCCESS) {
        yield put(setChartData({ chart, data: getPayloadData(responseAction.payload, {}) }));
    }
}

export default function* dashboardSaga() {
    yield all([
        takeLatest(ActionTypes.CUSTOMER_CARD_COUNT, getDashboardCustomerCount),
        takeLatest(ActionTypes.SERVICE_CARD_COUNT, getDashboardServiceCount),
        takeLatest(ActionTypes.TOTAL_CUSTOMERS_VS_PLAN_ENABLED_CUSTOMERS, getTotalAndPlanEnabledCustomers),
        takeLatest(ActionTypes.SERVICE_CREATED_VS_SERVICE_EXECUTED, getServiceCreatedAndRegistered),
        takeLatest(ActionTypes.CHART_PIE_CUSTOMERS_REGISTERED, getCustomersRegistered),
        takeLatest(ActionTypes.TOTAL_WASTE_PER_CATEGORY, getTotalWastePerCategory),
        takeLatest(ActionTypes.TIME_TAKEN_TO_SERVICE, getTimeTakenToService),
        takeLatest(ActionTypes.TIME_TAKEN_TO_SERVICE_PER_CUSTOMER, getTimeTakenToServicePerCustomer)
    ]);
}
