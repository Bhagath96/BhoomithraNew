import { PATH } from '..';
//import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../common/Permissions';
import { MapLiveTRacking, MapRouting, Geofence } from '../../modules/map/components/osrm';
//import { menuAccessPermissions } from '../../utils/PermissionUtils';

export const getVehicleTracking = () => {
    let routes = [];
    //if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SCHEDULE, ACTION_MAPPING.SCHEDULE.ACCESS_IN_WEB_NAV)) {
    routes.push({ path: PATH.MAP_ROUTING, component: MapRouting });
    //}
    //if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SCHEDULE, ACTION_MAPPING.SCHEDULE.ACCESS_IN_WEB_NAV)) {
    routes.push({ path: PATH.MAP_LIVE_TRACING, component: MapLiveTRacking });
    //}
    routes.push({ path: PATH.MAP_GEO_FENCE_TRACKING, component: Geofence });

    return routes;
};
