// import { api } from '../../common';
// import * as Actions from './actions';
// import dummyTemplate from './template';

import { restAPI, URL } from '../../common';
import { types as ActionTypes, webTypes as WebActionTypes } from './actions';

// const { types: ActionTypes } = Actions;
// const { restAPI } = api;

export function fetchSurveyTemplateMetadata({ organizationId, templateId, templateTypeId, version }) {
    let payload = {
        body: {
            templateId,
            templateTypeId,
            version
        },
        types: [ActionTypes.SURVEY_TEMPLATE_METADATA_API_REQUEST, ActionTypes.SURVEY_TEMPLATE_METADATA_API_SUCCESS, ActionTypes.SURVEY_TEMPLATE_METADATA_API_FAILED]
    };
    return {
        url: `admin/organizations/${organizationId}/templates/version-checker`,
        api: restAPI.post,
        payload
    };
}

export function fetchSurveyTemplate(params, showErrorToast = true) {
    let payload = {
        types: [ActionTypes.SURVEY_TEMPLATE_API_REQUEST, ActionTypes.SURVEY_TEMPLATE_API_SUCCESS, ActionTypes.SURVEY_TEMPLATE_API_FAILED],
        body: params
    };
    return {
        url: URL.SURVEY.FETCH_TEMPLATE,
        api: restAPI.post,
        payload,
        showErrorToast
    };
}

export function syncInProgressSurvey({ userId, orgId, surveyData, uploadMonitor }) {
    let payload = {
        body: surveyData,
        types: [ActionTypes.SYNC_INPROGRESS_SURVEY_API_REQUEST, ActionTypes.SYNC_INPROGRESS_SURVEY_API_SUCCESS, ActionTypes.SYNC_INPROGRESS_SURVEY_API_FAILED]
    };
    return {
        url: `dfg/templates/${surveyData.templateId}/users/${userId}/organizations/${orgId}/answers`,
        api: restAPI.post,
        payload,
        onUploadProgress: (progress) => {
            uploadMonitor(surveyData.id, progress);
        },
        showErrorToast: false
    };
}

export function fetchCompleteSurveyList({ surveyCompleteListData, actionTypes }) {
    let payload = {
        params: surveyCompleteListData,
        types: actionTypes,
        options: {
            encode: false,
            arrayFormat: 'comma'
        }
    };
    return {
        url: URL.SURVEY.GET_SURVEY_DETAILS_BY_SURVEY_ID,
        api: restAPI.get,
        payload
    };
}

export function fetchSurveyData(params) {
    let payload = {
        params,
        types: [ActionTypes.SURVEY_DATA_API_REQUEST, ActionTypes.SURVEY_DATA_API_SUCCESS, ActionTypes.SURVEY_DATA_API_FAILED]
    };
    return {
        url: URL.SURVEY.GET_SURVEY_DETAILS_BY_SURVEY_ID,
        api: restAPI.get,
        payload,
        showErrorToast: false
    };
}

export function fetchSurveyTemplateForAnswer({ answerId, langId }) {
    let payload = {
        types: [ActionTypes.SURVEY_TEMPLATE_API_REQUEST, ActionTypes.SURVEY_TEMPLATE_API_SUCCESS, ActionTypes.SURVEY_TEMPLATE_API_FAILED],
        params: {
            langId
        }
    };
    return {
        url: URL.SURVEY.FETCH_SURVEY_TEMPLATE_FOR_ANSWER.replace(':answerId', answerId),
        // endpoint: `dfg/templates/answers/${answerId}/template-json`,
        api: restAPI.get,
        payload,
        showErrorToast: false
    };
}

export function fetchFilterDropDownData(params) {
    let payload = {
        types: [ActionTypes.FETCH_FILTER_DROPDOWN_DATA_API_REQUEST, ActionTypes.FETCH_FILTER_DROPDOWN_DATA_API_SUCCESS, ActionTypes.FETCH_FILTER_DROPDOWN_DATA_API_FAILED],
        params
    };
    return {
        url: URL.SURVEY.GET_SURVEY_DETAILS_BY_SURVEY_ID,
        // endpoint: `dfg/templates/answers`,
        api: restAPI.get,
        payload
    };
}


export function versionChecker({ templateTypeId, organizationId }) {
    let payload = {
        types: [WebActionTypes.FETCH_SURVEY_TEMPLATE_VERSION_REQUEST, WebActionTypes.FETCH_SURVEY_TEMPLATE_VERSION_SUCCESS, WebActionTypes.FETCH_SURVEY_TEMPLATE_VERSION_FAILURE],
        body: { templateTypeId }
    };
    return {
        url: URL.SURVEY.GET_SURVEY_TEMPLATE_VERSION.replace(':organizationId', organizationId),
        api: restAPI.post,
        payload
    };
}

export function fetchSingleSurveyTemplate({ templateId, ...params }) {
    let payload = {
        types: [WebActionTypes.FETCH_SINGLE_SURVEY_TEMPLATE_REQUEST, WebActionTypes.FETCH_SINGLE_SURVEY_TEMPLATE_SUCCESS, WebActionTypes.FETCH_SINGLE_SURVEY_TEMPLATE_FAILURE],
        params
    };
    return {
        url: URL.SURVEY.GET_SINGLE_SURVEY_TEMPLATE.replace(':templateId', templateId),
        api: restAPI.get,
        payload
    };
}
