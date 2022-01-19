const surveyDataDictionaryKeys = {
    dataSources: null,
    questionsHavingDependentQuestion: null,
    trackers: null,
    answers: null,
    dynamicTemplate: null
};

export const SurveyDataSchema = {
    name: 'SurveyData',
    properties: {
        id: null,
        templateId: null,
        templateTypeId: null,
        version: null,
        surveyor: null,
        serviceWorker: null,
        surveyorId: null,
        serviceWorkerId: null,
        organizationId: null,
        additionalInfo: [],
        surveyStartedAt: null,
        surveyFinishedAt: null,
        completed: false,
        online: null,
        lastVisitedFragment: null,
        currentDynamicQuestionFragment: null,
        connectedQuestionsToShow: [],
        retainInactiveOptions: null,
        waitingForSync: false,
        synced: false,
        createdBy: null,
        createdAt: null,
        lastModifiedBy: null,
        lastModifiedAt: null,
        ...surveyDataDictionaryKeys
    }
};
