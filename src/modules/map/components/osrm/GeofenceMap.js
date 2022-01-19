import React from 'react';
import { connect } from 'react-redux';
import './Map.css';
import { reduxForm } from 'redux-form';
import EditControlLeaflet from './EditControlLeaflet';


function Geofence() {


    return (
        <div>
            <EditControlLeaflet />

        </div>
    );
}
export default connect()(reduxForm({
    form: 'Geofence'
})(Geofence));
