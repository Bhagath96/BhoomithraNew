
import L from 'leaflet';
import { useSelector } from 'react-redux';
import { STATE_REDUCER_KEY } from '../../constant';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet/dist/leaflet.css';

const CreateRoutineMachineLayer = () => {
    const { routeColor: { color = 'red' } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);


    let instance = L.Routing.control({
        position: 'bottomleft',
        lineOptions: {
            styles: [{ color: color, opacity: 1, weight: 5 }]
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

const MapRoutingMachine = createControlComponent(CreateRoutineMachineLayer);


export default MapRoutingMachine;
