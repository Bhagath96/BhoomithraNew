import { action } from '../../common';
export const types = {
    ADD_WAY_POINT_FOR_ROUTING: 'Map/ADD_WAY_POINT_FOR_ROUTING',
    SET_ROUTE_COLOR: 'Map/SET_ROUTE_COLOR',
    TOTAL_DISTAINCE_AND_TIME: 'Map/SAVE_TOTAL_DISTANCE_AND_TIME',
    TO_RENDER: 'Map/TO_RENDER',
    SET_TIME_AND_DELAY_TO_ROUTE: 'Map/SET_TIME_AND_DELAY_TO_ROUTE'
};
export const addWayPointsForRouting = (data) => action(types.ADD_WAY_POINT_FOR_ROUTING, { data });
export const setRouteColor = (data) => action(types.SET_ROUTE_COLOR, { data });

export const savetotaldistanceAndTime = (data) => action(types.TOTAL_DISTAINCE_AND_TIME, { data });
export const toRender = () => action(types.TO_RENDER);
export const setTimeAndDelaToRoute = (data) => action(types.SET_TIME_AND_DELAY_TO_ROUTE, { data });
