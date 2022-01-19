import L from 'leaflet';
import { useSelector } from 'react-redux';
import { STATE_REDUCER_KEY } from '../../constant';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';

const CreateLiveRoutineMachineLayer = () => {
    const { wayPoints: { startAndEndPoint: waypoints = [] } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);

    let instance = L.Routing.control({
        waypoints: waypoints,
        position: 'bottomleft',
        lineOptions: {
            styles: [{ color: 'red', opacity: 1, weight: 5 }]
        },
        createMarker: function () {
            return null;
        },
        show: true,
        addWaypoints: true,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: false,
        showAlternatives: false,
        reverseWaypoints: true
    });
    return instance;
};

const MapLiveRoutingMachine = createControlComponent(CreateLiveRoutineMachineLayer);

export default MapLiveRoutingMachine;
