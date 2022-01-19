import { PATH } from '..';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../common/Permissions';
import { menuAccessPermissions } from '../../utils/PermissionUtils';
import { CreateOrEditSchedule, ScheduledCustomers, ScheduleHistory, CommonScheduleView } from '../../modules/schedule/components';

export const getSchedule = (userDetails) => {
    let routes = [];
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SCHEDULE, ACTION_MAPPING.SCHEDULE.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.SCHEDULE, component: CommonScheduleView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SCHEDULE_CREATE_SCHEDULE, ACTION_MAPPING.SCHEDULE_CREATE_SCHEDULE.ACCESS_IN_TAB)) {
        routes.push({ path: `${PATH.SCHEDULE}/create`, component: CommonScheduleView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE.LIST)) {
        routes.push({ path: `${PATH.SCHEDULE}/list`, component: CommonScheduleView });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE.EDIT_IN_ACTION)) {
        routes.push({ path: `${PATH.SCHEDULE}/:id`, component: CreateOrEditSchedule });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE.SHOW_HISTORY_IN_ACTION)) {
        routes.push({ path: `${PATH.SCHEDULE}/:id/history`, component: ScheduleHistory });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE.ADD_CUSTOMER_IN_ACTION) || menuAccessPermissions(userDetails, RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE.REMOVE_CUSTOMER_IN_ACTION)) {
        routes.push({ path: `${PATH.SCHEDULE}/:id/:type`, component: ScheduledCustomers });
    }
    return routes;
};
