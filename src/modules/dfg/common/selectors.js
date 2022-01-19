import {
    getInitializer, getTemplate, getTemplateFragments, getTemplateRoutes, getSurvey,
    getRender, getRenderFragment, getSurveyTemplateFetchStatus, getDeleteSurveysInProgress,
    getQueued, getProgress, getFailed, getProcessed
} from '../selectors';

import { getDefaultLanguage, getDeveloperOptions } from '../../common/selectors';
import { getUserInfo } from '../../user/selectors';

const getLanguage = (state) => {
    const language = getDefaultLanguage(state);
    return { langId: language.id, locale: language.locale };
};

export {
    getInitializer, getTemplate, getTemplateFragments, getTemplateRoutes, getSurvey,
    getRender, getRenderFragment, getSurveyTemplateFetchStatus, getDeveloperOptions,
    getUserInfo, getLanguage, getDeleteSurveysInProgress, getQueued, getProgress, getFailed,
    getProcessed
};
