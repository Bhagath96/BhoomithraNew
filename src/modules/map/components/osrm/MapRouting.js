import CardContent from '@mui/material/CardContent';
import React, { useRef, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { renderSelect } from '../../../../utils/FormUtils';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import './Map.css';
import MapRoutingMachine from './MaproutingMachine';
import L from 'leaflet';
import _ from 'lodash';
import { bikeIcon, truckIcon } from './Icons';
import { pickPoints } from '../../../../assets/pickPoint.svg';
// import socketIOClient from 'socket.io-client';
import * as Actions from '../../actions';
import { Components } from '../../../../common/components';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { Field, Form, reduxForm } from 'redux-form';
import { LsgiArray, LsgitTypeArray, districtArray, wardArray } from '../../../dashboard/ApiConstants';
import Header from './Header';
import 'leaflet/dist/leaflet.css';
import TimePicker from '@mui/lab/TimePicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useSelector } from 'react-redux';
import { STATE_REDUCER_KEY } from '../../constant';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
let DefaultIcon = L.icon({
    ...L.Icon.Default.prototype.options,
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;
const { Grid, Button } = Components;
const useStyles = makeStyles(() => ({
    pickyContainer: {
        marginBottom: '10px'
    },
    datePicker: {
        backgroundColor: 'white',
        color: 'black !important'
    },
    item: {
        padding: useTheme().spacing(1)
    }
}));

const DEFAULT_LAG = 10.8505;
const DEFAULT_LAT = 76.2711;

function MapRouting() {
    const { routeColor: { color = 'red' } = {}, wayPoints: { data: wayPointData = [] } = [] } = useSelector(state => state[STATE_REDUCER_KEY]);

    const classes = useStyles();
    const dispatch = useDispatch();
    const rMachine = useRef();
    const timePickerRef = useRef();
    const timePickerInputRef = useRef();
    const inputRef = useRef();
    const [waypoints, setCurrentWaypoints] = React.useState([]);
    const [routesArray, setRoutesArray] = React.useState([]);
    const [pickPoint, setPickPoint] = React.useState(false);


    //marker generation
    const GenerateMarker = () => {
        let timeVal = 'Mon Aug 18 2014 21:11:54 GMT+0530 (India Standard Time)';
        const handleDelayAndtime = (index, routesArrays, route) => {
            setPickPoint(false);
            let arr = _.cloneDeep(routesArrays);
            arr.splice(index, 1, { lat: route.lat, lng: route.lng, time: timePickerRef?.current.value, delay: inputRef.current.value, icon: truckIcon });
            setRoutesArray(arr);

        };


        useMapEvents({
            click(e) {
                setPickPoint(false);
                const { latlng: { lat, lng } } = e;
                fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`).then((res) => res.json())
                    .then((res) => {
                        setRoutesArray([...routesArray, { lat, lng, name: res.name }]);

                    });
            }
        });
        return routesArray.map((route, index) => {
            let prop = {};
            if (index === 0) {
                route.endFlag = false;

                route.startFlag = true;
                prop.icon = bikeIcon;
            }
            if (index === routesArray.length - 1) {
                // route.endFlag = true;
                prop.icon = bikeIcon;
            }
            if (route.icon) {
                prop.icon = route.icon;
            }
            return <Marker key={index} position={[route.lat, route.lng]} {...prop}
            >
                <Popup autoClose={false} closeOnClick={false}>
                    <Button onClick={
                        () => {
                            let arr = _.cloneDeep(routesArray);
                            let arrindex = _.findIndex(arr, { lat: route.lat, lng: route.lng });
                            arr.splice(arrindex, 1, { lat: route.lat, lng: route.lng, icon: truckIcon });

                            setRoutesArray(arr);
                            setPickPoint(true);
                        }}>Change to Pickup</Button>
                    <Button onClick={
                        () => {
                            let array = _.cloneDeep(routesArray);
                            _.remove(array, { lat: route.lat, lng: route.lng });
                            setRoutesArray(array);
                        }}>Remove Marker</Button>
                    <div style={{ margin: '8px' }}> </div>
                    {
                        pickPoint && (<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker
                                    ref={timePickerRef}
                                    onClose={false}
                                    label="Time"
                                    value={timeVal}
                                    onChange={(val) => {
                                        timeVal = val;
                                        timePickerRef.current.value = val;

                                    }}

                                    renderInput={(params) => <TextField value={timeVal} ref={timePickerInputRef} {...params} />}
                                />
                            </LocalizationProvider>
                            <TextField label='delay' type='number' ref={inputRef} />
                            <Button onClick={() => handleDelayAndtime(index, routesArray, route)}>SubmitTime</Button>
                        </div>)

                    }
                </Popup>
            </Marker>;
        });
    };


    useEffect(() => {

        let points = routesArray.map(route => L.latLng(route.lat, route.lng));
        dispatch(Actions.addWayPointsForRouting({ points }));
        setCurrentWaypoints(points);
        if (rMachine.current) {
            rMachine.current.setWaypoints(waypoints);
            rMachine.current.options.lineOptions.styles[0].color = color;
        }
        // eslint-disable-next-line no-use-before-define
    }, [routesArray, rMachine, color]);

    useEffect(() => {
        rMachine.current?.setWaypoints(wayPointData);

    }, [wayPointData]);


    const hendleChange = () => {

        if (rMachine.current) {
            rMachine.current.setWaypoints(waypoints);

        }
    };

    return (
        <div>
            <img src={pickPoints} alt='' />
            <Paper elevation={3} style={{ marginBottom: 15 }}>
                <Form>
                    <Grid container className={classes.item}>
                        <Grid item lg={3} xs={6} sm={6} md={6} className={classes.item}>
                            <Field name="District" label='District' component={renderSelect}>
                                {districtArray}
                            </Field>
                        </Grid>
                        <Grid item lg={3} xs={6} sm={6} md={6} className={classes.item}>
                            <Field name="LsgitType" label='LsgitType' component={renderSelect}>
                                {LsgitTypeArray}
                            </Field>
                        </Grid>
                        <Grid item lg={3} xs={6} sm={6} md={6} className={classes.item}>
                            <Field name="Lsgi" label='Lsgi' component={renderSelect}>
                                {LsgiArray}
                            </Field>
                        </Grid>

                        <Grid item lg={3} xs={6} sm={6} md={6} className={classes.item}>
                            <Field name="Ward" label='Ward' component={renderSelect}>
                                {wardArray}
                            </Field>
                        </Grid>
                    </Grid>
                </Form>
            </Paper>
            <Grid container >

                <Grid item xs={1} >
                    <Header routesArray={routesArray} />
                </Grid>
                <Grid item xs={11} >
                    <CardContent>
                        <MapContainer
                            closePopupOnClick={false}
                            scrollWheelZoom={false}
                            className="markercluster-map"
                            center={[DEFAULT_LAG, DEFAULT_LAT]}
                            zoom={13}
                            eventHandlers={
                                hendleChange()
                            }
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[DEFAULT_LAG, DEFAULT_LAT]}>
                                <Popup >
                                    <span>A pretty CSS3 popup. <br /> Easily customizable.</span>

                                </Popup>
                            </Marker>
                            <GenerateMarker />
                            <MapRoutingMachine ref={rMachine} data={{
                                waypoints,
                                color: 'red'
                            }} />
                        </MapContainer>
                    </CardContent>
                </Grid>
            </Grid>
        </div >
    );
}


export default connect()(reduxForm({
    form: 'MapRouting'
})(MapRouting));
