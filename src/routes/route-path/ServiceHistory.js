import { PATH } from '..';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../common/Permissions';
import { menuAccessPermissions } from '../../utils/PermissionUtils';
import ListServiceHistory from '../../modules/service-history/components/ListServicesHistory';
import ServiceHistoryById from '../../modules/service-history/components/ServiceHistory';
import { DynamicForm } from '../../modules/dfg/containers/index';

export const getServiceHistory = (userDetails) => {
    let routes = [];
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SERVICE, ACTION_MAPPING.SERVICE.ACCESS_SERVICE_HISTORY_IN_WEB_NAV)) {
        routes.push({ path: PATH.SERVICE_HISTORY, component: ListServiceHistory });
        routes.push({ path: `${PATH.SERVICE_HISTORY}/:surveyIds/:templateTypeId/view`, component: ServiceHistoryById });
        routes.push({ path: `${PATH.SERVICE_HISTORY}/edit`, component: DynamicForm });
    }
    return routes;
};
