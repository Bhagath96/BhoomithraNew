import { CardContent } from '@material-ui/core';
import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { renderSelect } from '../../../../utils/FormUtils';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css';
import { carIcon, bikeIcon, truckIcon } from './Icons';
import { Components } from '../../../../common/components';
import { makeStyles, Paper } from '@material-ui/core';
import { Field, Form, reduxForm } from 'redux-form';
import { LsgiArray, LsgitTypeArray, districtArray, wardArray } from '../../../dashboard/ApiConstants';
import MapLiveRoutingMachine from './LiveRouting';
import { STATE_REDUCER_KEY } from '../../constant';
const { Grid } = Components;
const useStyles = makeStyles((theme) => ({
    pickyContainer: {
        marginBottom: '10px'
    },
    datePicker: {
        backgroundColor: 'white',
        color: 'black !important'
    },
    item: {
        padding: theme.spacing(1)
    }
}));
const DEFAULT_LAG = 10.8505;
const DEFAULT_LAT = 76.2711;
const latLng = [{ lat: 10.853972457196383, lng: 76.26974552171627 }, { lat: 10.853898698884302, lng: 76.26975088926379 }, { lat: 10.85383547745946, lng: 76.26975088926379 }, { lat: 10.853735376842764, lng: 76.26973478662126 }, { lat: 10.853666886927815, lng: 76.26973478662126 }, { lat: 10.85352463859275, lng: 76.26971868397874 }, { lat: 10.853424537871936, lng: 76.26968647869367 }, { lat: 10.853182188619524, lng: 76.2695683926485 }, { lat: 10.852934570702114, lng: 76.26949861453087 }, { lat: 10.85271856341513, lng: 76.26946640924585 }, { lat: 10.852381380996558, lng: 76.26942883641328 }, { lat: 10.852128493932971, lng: 76.2693858960332 }, { lat: 10.851859801193463, lng: 76.26941273377075 }, { lat: 10.851638524638386, lng: 76.26940199867573 }, { lat: 10.851338220480182, lng: 76.26942346886575 }];
const vehicles = [{ id: 'car', name: 'car' }, { id: 'bike', name: 'bike' }, { id: 'truck', name: 'truck' }];
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
function MapLiveTRacking() {
    const [position, setPosition] = useState([10.853972457196383, 26974552171627]);
    const [markerIcon, setMarkerIcon] = useState(carIcon);
    setInterval(() => {
        for (let i = 1; i < latLng.length; i++) {
            let item = latLng[i];
            setPosition([item.lat, item.lng]);
        }
    }, 15000);
    const classes = useStyles();
    const { wayPoints: { startAndEndPoint: waypoints = [] } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);

    return (
        <div>
            <Paper elevation={3} style={{ marginBottom: 15 }}>
                <Form>
                    <Grid container className={classes.item}>
                        <Grid item lg={4} xs={3} sm={6} md={6} className={classes.item}>
                            <Field name="District" label='District' component={renderSelect}>
                                {districtArray}
                            </Field>
                        </Grid>
                        <Grid item lg={4} xs={3} sm={6} md={6} className={classes.item}>
                            <Field name="LsgitType" label='LsgitType' component={renderSelect}>
                                {LsgitTypeArray}
                            </Field>
                        </Grid>
                        <Grid item lg={4} xs={3} sm={6} md={6} className={classes.item}>
                            <Field name="Lsgi" label='Lsgi' component={renderSelect}>
                                {LsgiArray}
                            </Field>
                        </Grid>
                        <Grid item lg={4} xs={3} sm={6} md={6} className={classes.item}>
                            <Field name="Ward" label='Ward' component={renderSelect}>
                                {wardArray}
                            </Field>
                        </Grid>
                        <Grid item lg={4} xs={3} sm={6} md={6} className={classes.item}>
                            <Field name="vehile" label='Vehicle' component={renderSelect}
                                onChange={(resourceItem) => {
                                    if (resourceItem.name === 'car') {
                                        setMarkerIcon(carIcon);
                                    }
                                    if (resourceItem.name === 'truck') {
                                        setMarkerIcon(truckIcon);
                                    }
                                    if (resourceItem.name === 'bike') {
                                        setMarkerIcon(bikeIcon);
                                    }
                                }}
                            >
                                {vehicles}
                            </Field>
                        </Grid>
                    </Grid>
                </Form>
            </Paper>
            <CardContent>
                <MapContainer
                    scrollWheelZoom={false}
                    className="markercluster-map"
                    center={[DEFAULT_LAG, DEFAULT_LAT]}
                    zoom={13}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position} icon={markerIcon}>
                        <Popup>
                            <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                        </Popup>
                    </Marker>
                    <GenerateMarker waypoints={waypoints} />
                    <MapLiveRoutingMachine
                    />
                </MapContainer>
            </CardContent>
        </div>
    );
}
export default connect()(reduxForm({
    form: 'MapLiveTRacking'
})(MapLiveTRacking));
