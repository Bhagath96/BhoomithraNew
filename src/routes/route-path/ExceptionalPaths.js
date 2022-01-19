/**
 *
 * Paths Without Restrictions
 *
 */

import { PATH } from '..';
import { DashboardSurvey } from '../../modules/dashboard/components';
import HomePage from '../../modules/landing-page/HomePage';
import CommonProfileView from '../../modules/user/components/CommonProfileView';

export const getExceptionalPaths = () => {
    return [
        { path: PATH.DASHBOARD_SURVEY, component: DashboardSurvey },
        { path: PATH.PROFILE, component: CommonProfileView },
        { path: `${PATH.PROFILE}/details`, component: CommonProfileView },
        { path: `${PATH.PROFILE}/change_password`, component: CommonProfileView },
        { path: `${PATH.LANDING_PAGE}`, component: HomePage }

    ];
};
