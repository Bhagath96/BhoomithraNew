import { all, call, fork, put, select, take } from 'redux-saga/effects';
import _ from 'lodash';
import * as DfgAPI from './api';
import saga from './common/saga';
import Storage from './common/storage';
import Repositories from './common/repositories';
import { Actions } from './common/actions';
import { getPayloadData } from './common/utils';
import { getLanguage, getUserInfo } from './common/selectors';
import { SURVEY_TEMPLATE_STORE_KEY } from './common/constants';
import { postProcessSurveyData } from './saga';
import { ORGANIZATION_SURVEY_TEMPLATE_ACTIVE_VERSION } from './constants';

const { types: ActionTypes, webTypes: WebActionTypes } = Actions;
const { SurveyDataRepository } = Repositories;

function* fetchLatestTemplate(action) {
    const { templateTypeId, organizationId } = action.payload.data;
    // need to get the latest Version of the template
    yield fork(saga.handleAPIRequest, DfgAPI.versionChecker, { templateTypeId, organizationId });
    const versionCheckerAction = yield take([WebActionTypes.FETCH_SURVEY_TEMPLATE_VERSION_SUCCESS, WebActionTypes.FETCH_SURVEY_TEMPLATE_VERSION_FAILURE]);
    let version, currentTemplate, templateId;
    if (versionCheckerAction.type === WebActionTypes.FETCH_SURVEY_TEMPLATE_VERSION_SUCCESS) {
        const versionCheckerActionResponse = getPayloadData(versionCheckerAction.payload.data);
        version = _.get(versionCheckerActionResponse, 'version');
        templateId = _.get(versionCheckerActionResponse, 'templateId');

        let activeTemplates = yield call([Storage, 'getItem'], ORGANIZATION_SURVEY_TEMPLATE_ACTIVE_VERSION);
        activeTemplates = activeTemplates ? JSON.parse(activeTemplates) : {};
        if (!activeTemplates.hasOwnProperty(organizationId)) {
            activeTemplates[organizationId] = {};
        }
        activeTemplates[organizationId][templateTypeId] = version;
        yield call([Storage, 'setItem'], ORGANIZATION_SURVEY_TEMPLATE_ACTIVE_VERSION, JSON.stringify(activeTemplates));
    }

    // Check Version Already Exists if not call API else return true

    let templates = yield call([Storage, 'getItem'], SURVEY_TEMPLATE_STORE_KEY);
    templates = templates ? JSON.parse(templates) : {};
    if (!_.isEmpty(templates) && templateTypeId && version) {
        if (templates.hasOwnProperty(templateTypeId)) {
            currentTemplate = templates[templateTypeId][version] || undefined;
        }
    }


    let userInfo = yield select(getUserInfo);

    if (!currentTemplate) {
        const surveyTemplateApiRequest = {
            templateId,
            langId: (yield select(getLanguage)).langId,
            userId: userInfo.id,
            orgId: organizationId
        };

        yield fork(saga.handleAPIRequest, DfgAPI.fetchSingleSurveyTemplate, surveyTemplateApiRequest);
        const surveyTemplateApiAction = yield take([WebActionTypes.FETCH_SINGLE_SURVEY_TEMPLATE_SUCCESS, WebActionTypes.FETCH_SINGLE_SURVEY_TEMPLATE_FAILURE]);
        if (surveyTemplateApiAction.type === WebActionTypes.FETCH_SINGLE_SURVEY_TEMPLATE_SUCCESS) {
            const surveyTemplateApiResponse = getPayloadData(surveyTemplateApiAction.payload.data);
            if (surveyTemplateApiResponse.version !== version) {
                yield put(Actions.setErrorMessage('invalid_template_version'));
                return false;
            }
            if (!templates.hasOwnProperty(templateTypeId)) {
                templates[templateTypeId] = {};
            }
            templates[templateTypeId][surveyTemplateApiResponse.version] = surveyTemplateApiResponse;
            yield call([Storage, 'setItem'], SURVEY_TEMPLATE_STORE_KEY, JSON.stringify(templates));
        } else {
            return false;
        }
    }
    return true;
}

// function* fetchSurveyDataSingleTemplate(action) {
//     const { templateId, organizationId } = action.payload.data;
//     let langId =;
//     let userId =


//         console.log({ userInfo })


//     if (!currentTemplate) {
//         const surveyTemplateApiRequest = {
//             answerId: surveyId,
//             langId: (yield select(getLanguage)).langId
//         };
//         yield fork(saga.handleAPIRequest, DfgAPI.fetchSurveyTemplateForAnswer, surveyTemplateApiRequest);
//         const surveyTemplateApiAction = yield take([ActionTypes.SURVEY_TEMPLATE_API_SUCCESS, ActionTypes.SURVEY_TEMPLATE_API_FAILED]);
//         if (surveyTemplateApiAction.type === ActionTypes.SURVEY_TEMPLATE_API_SUCCESS) {
//             const surveyTemplateApiResponse = getPayloadData(surveyTemplateApiAction.payload.data);
//             if (surveyTemplateApiResponse.version !== version) {
//                 yield put(Actions.setErrorMessage('invalid_template_version'));
//                 return false;
//             }
//             if (!templates.hasOwnProperty(templateTypeId)) {
//                 templates[templateTypeId] = {};
//             }
//             templates[templateTypeId][surveyTemplateApiResponse.version] = surveyTemplateApiResponse;
//             yield call([Storage, 'setItem'], SURVEY_TEMPLATE_STORE_KEY, JSON.stringify(templates));
//         }
//     }
//     return true;
// }

function* fetchSurveyDataTemplate({ surveyId }) {
    const existingSurvey = yield call([SurveyDataRepository, 'findById'], surveyId);
    let { templateTypeId, version } = existingSurvey;
    let currentTemplate;
    let templates = yield call([Storage, 'getItem'], SURVEY_TEMPLATE_STORE_KEY);
    templates = templates ? JSON.parse(templates) : {};
    if (!_.isEmpty(templates) && templateTypeId && version) {
        if (templates.hasOwnProperty(templateTypeId)) {
            currentTemplate = templates[templateTypeId][version] || undefined;
        }
    }
    if (!currentTemplate) {
        const surveyTemplateApiRequest = {
            answerId: surveyId,
            langId: (yield select(getLanguage)).langId
        };
        yield fork(saga.handleAPIRequest, DfgAPI.fetchSurveyTemplateForAnswer, surveyTemplateApiRequest);
        const surveyTemplateApiAction = yield take([ActionTypes.SURVEY_TEMPLATE_API_SUCCESS, ActionTypes.SURVEY_TEMPLATE_API_FAILED]);
        if (surveyTemplateApiAction.type === ActionTypes.SURVEY_TEMPLATE_API_SUCCESS) {
            const surveyTemplateApiResponse = getPayloadData(surveyTemplateApiAction.payload.data);
            if (surveyTemplateApiResponse.version !== version) {
                yield put(Actions.setErrorMessage('invalid_template_version'));
                return false;
            }
            if (!templates.hasOwnProperty(templateTypeId)) {
                templates[templateTypeId] = {};
            }
            templates[templateTypeId][surveyTemplateApiResponse.version] = surveyTemplateApiResponse;
            yield call([Storage, 'setItem'], SURVEY_TEMPLATE_STORE_KEY, JSON.stringify(templates));
        }
    }
    return true;
}


function* editSyncedSurvey(action) {
    const { surveyId, toggleModalVisibility } = action.payload.data;
    const existingSurveyData = yield call([SurveyDataRepository, 'findBasicDetailsById'], surveyId);
    if (!existingSurveyData || (existingSurveyData.completed && !existingSurveyData.waitingForSync)) {
        yield put(toggleModalVisibility(true));
        const surveyDataApiRequest = {
            langId: (yield select(getLanguage)).langId,
            type: 'edit',
            surveyIds: [surveyId]
        }
        yield fork(saga.handleAPIRequest, DfgAPI.fetchSurveyData, surveyDataApiRequest);
        const surveyDataApiAction = yield take([ActionTypes.SURVEY_DATA_API_SUCCESS, ActionTypes.SURVEY_DATA_API_FAILED]);
        if (surveyDataApiAction.type === ActionTypes.SURVEY_DATA_API_SUCCESS) {
            const surveyData = getPayloadData(surveyDataApiAction.payload.data)[0];
            if (!existingSurveyData || existingSurveyData.lastModifiedAt !== surveyData.lastModifiedAt) {
                // Start post-processing of survey data
                yield call(postProcessSurveyData, surveyData);
            }
            yield put(toggleModalVisibility(false));
            // return true;
        } else {
            yield put(toggleModalVisibility(false));
            return false;
        }
    }
    const status = yield call(fetchSurveyDataTemplate, { surveyId });
    return status;
}

function* removeSyncedSurvey(action) {
    const { surveyId } = action.payload.data;
    if (surveyId && surveyId !== '') {
        yield call([SurveyDataRepository, 'deleteById'], surveyId);
    }
}

export default function* dfgSagaWeb() {
    yield all([]);
}

export { fetchLatestTemplate, fetchSurveyDataTemplate, editSyncedSurvey, removeSyncedSurvey }