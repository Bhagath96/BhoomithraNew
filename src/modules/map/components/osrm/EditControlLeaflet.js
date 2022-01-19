import React from 'react';
import { EditControl } from 'react-leaflet-draw';
import { useSelector } from 'react-redux';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from 'react-leaflet';
import { STATE_REDUCER_KEY } from '../../constant';

import 'leaflet-draw/dist/leaflet.draw.css';
import MapGeoFenceLiveRoutingMachine from './GeoFenceTracker';

const DEFAULT_LAG = 10.8505;
const DEFAULT_LAT = 76.2711;
function EditControlLeaflet() {
    const { wayPoints: { data: waypoints = [] } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);


    // eslint-disable-next-line no-shadow
    const GenerateMarker = ({ waypoints = [] }) => {
        return waypoints?.map((route, index) => {
            let prop = {};
            if (route.icon) {
                prop.icon = route.icon;
            }
            return <Marker key={index} position={[route.lat, route.lng]} {...prop}
                eventHandlers={{
                }}
            >
                <Popup>
                    <span>A pretty CSS3 popup.Hey <br /> Easily customizable.</span>
                </Popup>
            </Marker>;
        });
    };

    const onCreated = () => {

    };
    const onEdited = () => {

    };
    const onDeleted = () => {


    };
    return (
        <div>
            <MapContainer
                scrollWheelZoom={false}
                className="markercluster-map"
                center={[DEFAULT_LAG, DEFAULT_LAT]}
                zoom={13}
            >
                <FeatureGroup>
                    <EditControl position='topright' onEdited={onEdited}
                        onCreated={onCreated}
                        onDeleted={onDeleted}
                        draw={{
                            rectangle: true,
                            polyline: true,
                            circlemarker: true,
                            polygon: true,
                            marker: true,
                            circle: true

                        }}
                    />
                </FeatureGroup>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* <Marker position={position} icon={markerIcon}>
                    <Popup>
                        <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                    </Popup>
                </Marker> */}
                <GenerateMarker waypoints={waypoints} />
                <MapGeoFenceLiveRoutingMachine
                />
            </MapContainer>
        </div>
    );
}

export default EditControlLeaflet;
