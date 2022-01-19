const RESOURCE_MAPPING = {
    VEHICLE_TRACKING: 'in.trois.common.model.entity.VehicleTracking',
    VEHICLE_TRACKING_TRIP_PLANNER: 'in.trois.common.model.entity.VehicleTracking.TripPlanner',
    VEHICLE_TRACKING_LIVE_TRACKING: 'in.trois.common.model.entity.VehicleTracking.LiveTracking',
    VEHICLE_TRACKING_GEO_FENCE: 'in.trois.common.model.entity.VehicleTracking.GeoFence'
};

const ACTION_MAPPING = {
    VEHICLE_TRACKING: {
        ACCESS_IN_WEB_NAV: 'VEHICLE_TRACKING_ACCESS_IN_WEB_NAV'
    },
    VEHICLE_TRACKING_TRIP_PLANNER: {
        ACCESS_IN_WEB_NAV: 'VEHICLE_TRACKING_TRIP_PLANNER_ACCESS_IN_WEB_NAV'
    },
    VEHICLE_TRACKING_LIVE_TRACKING: {
        ACCESS_IN_WEB_NAV: 'VEHICLE_TRACKING_LIVE_TRACKING_ACCESS_IN_WEB_NAV'
    },
    VEHICLE_TRACKING_GEO_FENCE: {
        ACCESS_IN_WEB_NAV: 'VEHICLE_TRACKING_GEO_FENCE_ACCESS_IN_WEB_NAV'
    }
};

export default { RESOURCE_MAPPING, ACTION_MAPPING };

