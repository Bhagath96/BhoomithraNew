import { takeLatest, all, call, select, take, fork, put } from 'redux-saga/effects';
import { types as ActionTypes } from './actions';
import { saga, history } from '../../common';
import * as API from './api';
import _ from '../../utils/LodashUtils';
import { successNotify } from '../../utils/ReactReduxNotifyUtils';
import { getDynamicFormTemplate } from './selectors';
import { getDefaultLanguage, getCommon } from '../common/selectors';
import { API_PROPS } from '../../common/constants';
import { PATH } from '../../routes';
import { DEFAULT_TABLE_PROPS } from '../../common/constants';
import { getAllFilterOptionValues, getPayloadData } from '../../utils/ApiUtils';
import { I18n } from '../../common/components';
import { getTableAdditionalPropertiesFromCommonStore, getTableFiltersFromCommonStore, setPaginationInCommonTableProps } from '../common/saga';
import { TABLE_IDS } from './constants';
import { setInitialFilterList, setTableDropdownFilterList } from '../common/actions';

const generateRoutes = (data) => {
    let response = {};
    let key = _.get(data, 'fragment.gid', null);
    let next = 0, prev = 0, isOptionHasNext = false;
    let { option = [] } = data;
    if (option.length > 0) {
        let filteredArray = _.filter(option, (item) => _.has(item, 'next'));
        if (filteredArray.length > 0) {
            isOptionHasNext = true;
        }
        _.forEach(filteredArray, (item) => {
            response[_.get(item, 'optionId.id', '')] = { next: _.get(item, 'next.gid', '') };
        });
    }
    next = (isOptionHasNext) ? -1 : _.get(data, 'next.gid', 0);
    prev = _.get(data, 'prev.gid', 0);
    response[key] = {
        next, prev
    };
    return response;
};

const updateFragmentJSON = (values, fragment) => {
    let response = fragment;
    if (_.get(values, 'next.id', 0) === -1) {
        let key = _.get(values, 'question.id', '');
        _.forEach(_.get(response, 'titles', []), (title) => {
            _.forEach(_.get(title, 'questions', []), (question) => {
                if (key === _.get(question, 'id', ' ')) {
                    _.set(question, 'linkToFragment', true);
                }
            });
        });
    }
    return response;
};

function* saveTemplateRoutes(action) {
    const details = yield select(getDynamicFormTemplate);
    let { routesGenerationDetails: { routes = {}, connect = {} } = {}, fragmentJSON: { data: currentFragmentJSON = {} } = {} } = details;
    let values = action.payload.data;
    let { templateId = null, fragmentId = null } = values;
    let request = generateRoutes(values);
    let formattedFragmentJSON = updateFragmentJSON(values, currentFragmentJSON);
    yield fork(saga.handleAPIRequest, API.updateTemplateRoute, { templateId, fragmentId, fragmentJson: { fragment: formattedFragmentJSON, formData: values }, linkJson: { ...routes, ...request, ...connect } });
    yield take(ActionTypes.UPDATE_TEMPLATE_ROUTE_SUCCESS);
    yield call(successNotify, I18n.t('update_success', { type: I18n.t('routes') }));
    yield call(history.push, `${PATH.DYNAMIC_TEMPLATE}/${templateId}/routes`);

}

function* assignFragmentsToTemplate(action) {
    let request = action.payload.data;
    let { templateId = null, fragmentId = null } = request;
    _.set(request, 'id', _.get(request, 'fragment.id', null));
    delete request.templateId;
    delete request.fragment;
    let apiRequest = { formData: request, templateId };
    if (fragmentId === null) {
        yield fork(saga.handleAPIRequest, API.assignFragmentsToTemplate, apiRequest);
        yield take(ActionTypes.ASSIGN_FRAGMENT_TEMPLATE_SUCCESS);
        yield call(successNotify, I18n.t('assigned_success', { type: I18n.t('fragment') }));
    } else {
        yield fork(saga.handleAPIRequest, API.updateAssignedFragment, { fragmentId, ...apiRequest });
        yield take(ActionTypes.UPDATE_ASSIGNED_FRAGMENT_SUCCESS);
        yield call(successNotify, I18n.t('update_success', { type: I18n.t('fragment') }));
    }
    yield call(history.push, `${PATH.DYNAMIC_TEMPLATE}/${templateId}/fragment`);
}


function* fetchTemplates() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let types = [ActionTypes.FETCH_TEMPLATES_REQUEST, ActionTypes.FETCH_TEMPLATES_SUCCESS, ActionTypes.FETCH_TEMPLATES_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_TEMPLATE);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_TEMPLATE);
    let { passedColumns } = additionalProps;
    yield fork(saga.handleAPIRequest, API.fetchTemplates, { params: { ...tableProps, langId }, types });
    const templateAction = yield take([ActionTypes.FETCH_TEMPLATES_SUCCESS, ActionTypes.FETCH_TEMPLATES_FAILURE]);
    let templateTableData = getPayloadData(templateAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, templateTableData.content || []);
    if (templateAction.type === ActionTypes.FETCH_TEMPLATES_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_TEMPLATE, getPayloadData(templateAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_TEMPLATE, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_TEMPLATE, filterOptionsList: allFilterValues }));
    }
}

function* fetchInitialTemplates() {
    let data = {
        page: DEFAULT_TABLE_PROPS.pageNo,
        size: DEFAULT_TABLE_PROPS.pageSize
    };
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    const types = [ActionTypes.FETCH_RESET_PAGEBLE_TEMPLATE_REQUEST, ActionTypes.FETCH_RESET_PAGEBLE_TEMPLATE_SUCCESS, ActionTypes.FETCH_RESET_PAGEBLE_TEMPLATE_FAILURE];
    yield call(saga.handleAPIRequest, API.fetchTemplates, { data: { ...data, langId }, types });
}

function* fetchTemplateDetailsById(action) {
    yield call(saga.handleAPIRequest, API.fetchTemplateDetailsById, { templateId: action.payload.data });
}
function* fetchTemplateTypes() {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    yield call(saga.handleAPIRequest, API.fetchTemplateTypes, { langId });
}

function* saveTemplate(action) {
    let request = _.cloneDeep(action.payload.data);
    let templateId = _.get(request, 'templateId', null);
    if (_.has(request, 'templateTypeId')) {
        delete request.templateId;
    }
    _.set(request, 'templateTypeId', _.get(request, 'templateTypeId.id', null));
    if (templateId !== null) {
        yield fork(saga.handleAPIRequest, API.updateTemplate, { data: request, templateId });
        yield take(ActionTypes.UPDATE_TEMPLATE_SUCCESS);
        yield call(successNotify, I18n.t('update_success', { type: I18n.t('templates') }));
    } else {
        yield fork(saga.handleAPIRequest, API.saveTemplate, request);
        let responce = yield take(ActionTypes.SAVE_TEMPLATE_SUCCESS);
        let templateIdFromResponce = responce.payload.data.data.id;
        yield call(successNotify, I18n.t('save_success', { type: I18n.t('templates') }));
        yield call(history.push, `${PATH.DYNAMIC_TEMPLATE}/${templateIdFromResponce}`);

    }
}

function* deleteTemplate(action) {
    yield fork(saga.handleAPIRequest, API.deleteTemplates, action.payload.data);
    yield take(ActionTypes.DELETE_TEMPLATE_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('templates') }));
    // const { templatePagination } = yield select(getCommon);
    yield call(fetchTemplates, {
        payload: {
            size: action.payload.size,
            page: action.payload.page,
            count: action.payload.count
        }
    });
}

function* fetchFragmentsByTemplate(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let { templateId = null, type = API_PROPS.TABLE } = action.payload.data;
    let types = [ActionTypes.FETCH_FRAGMENTS_BY_TEMPLATE_REQUEST, ActionTypes.FETCH_FRAGMENTS_BY_TEMPLATE_SUCCESS, ActionTypes.FETCH_FRAGMENTS_BY_TEMPLATE_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_TEMPLATE_FRAGMENT);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_TEMPLATE_FRAGMENT);
    let { passedColumns } = additionalProps;

    yield fork(saga.handleAPIRequest, API.fetchFragmentsByTemplate, { templateId, params: { ...tableProps, langId, type }, types });
    const templateAction = yield take([ActionTypes.FETCH_FRAGMENTS_BY_TEMPLATE_SUCCESS, ActionTypes.FETCH_FRAGMENTS_BY_TEMPLATE_FAILURE]);

    let stateTableData = getPayloadData(templateAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

    if (templateAction.type === ActionTypes.FETCH_FRAGMENTS_BY_TEMPLATE_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_TEMPLATE_FRAGMENT, getPayloadData(templateAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_TEMPLATE_FRAGMENT, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_TEMPLATE_FRAGMENT, filterOptionsList: allFilterValues }));
    }
}

function* fetchRoutesByTemplate(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;
    let { templateId = null, type = API_PROPS.TABLE } = action.payload.data;
    let types = [ActionTypes.FETCH_ROUTES_BY_TEMPLATE_REQUEST, ActionTypes.FETCH_ROUTES_BY_TEMPLATE_SUCCESS, ActionTypes.FETCH_ROUTES_BY_TEMPLATE_FAILURE];
    let tableProps = yield* getTableFiltersFromCommonStore(TABLE_IDS.LIST_TEMPLATE_ROUTE);
    let additionalProps = yield* getTableAdditionalPropertiesFromCommonStore(TABLE_IDS.LIST_TEMPLATE_ROUTE);
    let { passedColumns } = additionalProps;
    yield fork(saga.handleAPIRequest, API.fetchFragmentsByTemplate, { templateId, params: { ...tableProps, langId, type }, types });
    const templateAction = yield take([ActionTypes.FETCH_ROUTES_BY_TEMPLATE_SUCCESS, ActionTypes.FETCH_ROUTES_BY_TEMPLATE_FAILURE]);

    let stateTableData = getPayloadData(templateAction.payload, {});
    let allFilterValues = getAllFilterOptionValues(passedColumns, stateTableData.content || []);

    if (templateAction.type === ActionTypes.FETCH_ROUTES_BY_TEMPLATE_SUCCESS) {
        yield call(setPaginationInCommonTableProps, TABLE_IDS.LIST_TEMPLATE_ROUTE, getPayloadData(templateAction.payload, {}));
        yield put(setInitialFilterList({ key: TABLE_IDS.LIST_TEMPLATE_ROUTE, initialfilterOptions: allFilterValues }));
        yield put(setTableDropdownFilterList({ key: TABLE_IDS.LIST_TEMPLATE_ROUTE, filterOptionsList: allFilterValues }));
    }
}

function* deleteAssignedFragment(action) {
    // let { id, templateId } = action.payload.data;
    yield fork(saga.handleAPIRequest, API.deleteAssignedFragment, action.payload.id.id, action.payload.id.templateId);
    yield take(ActionTypes.DELETE_ASSIGNED_FRAGMENT_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('fagment_association') }));
    const { templateFragmentsPagination } = yield select(getCommon);
    let data = {
        payload: {
            data: {
                ...templateFragmentsPagination,
                templateId: action.payload.id.templateId
            }
        }
    };
    yield call(fetchFragmentsByTemplate, data);
    // yield call(history.push, `${PATH.DYNAMIC_TEMPLATE}/${action.payload.id.templateId}`);
}

function* fetchRoutesFromTemplate(action) {
    yield fork(saga.handleAPIRequest, API.fetchRoutesFromTemplate, action.payload.id, action.payload.fragmentId);
    yield take(ActionTypes.DELETE_TEMPLATE_SUCCESS);
    yield call(successNotify, I18n.t('delete_success', { type: I18n.t('templates') }));
    const { templatePagination } = yield select(getCommon);
    yield call(fetchTemplates, templatePagination);
}


function* fetchAllFragments(action) {
    const language = yield select(getDefaultLanguage);
    const { id: langId } = language;

    let types = (_.get(action, 'payload.data.type', '') !== API_PROPS.DROP_DOWN) ?
        [ActionTypes.FETCH_ALL_FRAGMENTS_REQUEST, ActionTypes.FETCH_ALL_FRAGMENTS_SUCCESS, ActionTypes.FETCH_ALL_FRAGMENTS_FAILURE]
        :
        [ActionTypes.FETCH_ALL_FRAGMENTS_DROPDOWN_REQUEST, ActionTypes.FETCH_ALL_FRAGMENTS_DROPDOWN_SUCCESS, ActionTypes.FETCH_ALL_FRAGMENTS_DROPDOWN_FAILURE];

    yield call(saga.handleAPIRequest, API.fetchAllFragments, { params: { ...action.payload.data, langId }, types });
}

function* fetchFragmentJSONByFragmentId(action) {
    yield call(saga.handleAPIRequest, API.fetchFragmentJSON, { fragmentId: action.payload.data });
}

function* fetchAssignedFragment(action) {
    yield call(saga.handleAPIRequest, API.fetchAssignedFragment, action.payload.data);
}

function* fetchCurrentAssociation(action) {
    yield call(saga.handleAPIRequest, API.fetchCurrentAssociationList, { templateId: action.payload.data });
}

export default function* dynamicFormsTitleSaga() {
    yield all([
        takeLatest(ActionTypes.FETCH_TEMPLATES, fetchTemplates),
        takeLatest(ActionTypes.SAVE_TEMPLATE_ROUTES, saveTemplateRoutes),
        takeLatest(ActionTypes.DELETE_TEMPLATE, deleteTemplate),
        takeLatest(ActionTypes.FETCH_FRAGMENTS_BY_TEMPLATE, fetchFragmentsByTemplate),
        takeLatest(ActionTypes.FETCH_TEMPLATE_TYPE, fetchTemplateTypes),
        takeLatest(ActionTypes.SAVE_TEMPLATE, saveTemplate),
        takeLatest(ActionTypes.FETCH_TEMPLATE_BY_ID, fetchTemplateDetailsById),
        takeLatest(ActionTypes.FETCH_ALL_FRAGMENTS, fetchAllFragments),
        takeLatest(ActionTypes.ASSIGN_FRAGMENT_TEMPLATE, assignFragmentsToTemplate),
        takeLatest(ActionTypes.DELETE_ASSIGNED_FRAGMENT, deleteAssignedFragment),
        takeLatest(ActionTypes.FETCH_ROUTES_FROM_TEMPLATE, fetchRoutesFromTemplate),
        takeLatest(ActionTypes.FETCH_FRAGMENTS_BY_FRAGMENT_ID, fetchFragmentJSONByFragmentId),
        takeLatest(ActionTypes.FETCH_ASSIGNED_FRAGMENT, fetchAssignedFragment),
        takeLatest(ActionTypes.FETCH_RESET_PAGEBLE_TEMPLATE, fetchInitialTemplates),
        takeLatest(ActionTypes.FETCH_CURRENT_ASSOCIATION, fetchCurrentAssociation),
        takeLatest(ActionTypes.FETCH_ROUTES_BY_TEMPLATE, fetchRoutesByTemplate)

    ]);
}
