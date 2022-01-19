import AwaitLock from 'await-lock';

let dfgLock = new AwaitLock();
let deleteSurveysLock = new AwaitLock();
let syncInprogressDataLock = new AwaitLock();
let fetchSurveyTemplateLock = new AwaitLock();
let forceUpdateSurveyTemplateLock = new AwaitLock();
let loadIncompleteServicesLock = new AwaitLock();
let surveyDataLock = {};
let customerProfileLock = {};

export {
    dfgLock, deleteSurveysLock, syncInprogressDataLock,
    fetchSurveyTemplateLock, forceUpdateSurveyTemplateLock,
    loadIncompleteServicesLock, surveyDataLock, customerProfileLock
};
