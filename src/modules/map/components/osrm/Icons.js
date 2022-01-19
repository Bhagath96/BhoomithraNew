import L from 'leaflet';
import car from '../../../../assets/image/caricon.png';
import transparentBikeIcon from '../../../../assets/image/marker-icon-2x-red.png';

import startIcon from '../../../../assets/image/start.png';
import icon from 'leaflet/dist/images/layers.png';


const carIcon = L.icon({
    iconUrl: car,
    iconRetinaUrl: car,
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: car,
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

const bikeIcon = L.icon({
    iconUrl: transparentBikeIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]

});

const truckIcon = L.icon({
    iconUrl: icon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]

});

const startAnEndIcon = L.icon({
    iconUrl: startIcon,
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]

});

export { carIcon, bikeIcon, truckIcon, startAnEndIcon };
