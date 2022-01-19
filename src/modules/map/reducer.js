/* eslint-disable no-case-declarations */
import { types as ActionTypes } from './actions';


const initialState = {

    wayPoints: {
        data: [],
        startAndEndPoint: [],
        routeColor: 'red',
        count: 0
    },
    totalDistanceAndTime: {
        data: []
    },
    routeColor: {
        color: 'red'
    },
    setTimeAndDelay: {
        route: []
    }


};


const getStartAndEndRoute = () => {
    let array = [{ lat: 10.853972457196383, lng: 76.26974552171627 }, { lat: 10.851338220480182, lng: 76.26942346886575 }];

    return array;

};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.SET_TIME_AND_DELAY_TO_ROUTE:
            const { arr } = action.payload.data;
            return Object.assign({}, state, {
                setTimeAndDelay: {
                    route: [...state.setTimeAndDelay.route, ...arr]
                    // startAndEndPoint: getStartAndEndRoute(points),
                    // requestInProgress: true
                }
            });

        case ActionTypes.ADD_WAY_POINT_FOR_ROUTING:
            const { points } = action.payload.data;
            return Object.assign({}, state, {
                wayPoints: {
                    data: points,
                    startAndEndPoint: getStartAndEndRoute(points),
                    requestInProgress: true
                }
            });
        case ActionTypes.SET_ROUTE_COLOR:
            return Object.assign({}, state, {
                routeColor: {
                    ...state.routeColor,
                    color: action.payload.data
                }
            });

        case ActionTypes.TOTAL_DISTAINCE_AND_TIME:
            return Object.assign({}, state, {
                totalDistanceAndTime: {
                    ...state.totalDistanceAndTime,
                    data: action.payload.data
                }
            });
        case ActionTypes.TO_RENDER:
            return Object.assign({}, state, {
                wayPoints: {
                    ...state.wayPoints,
                    count: state.wayPoints.count++
                }
            });
        default:
            return state;

    }
};
export default reducer;
