import React, { Component } from 'react';
import PermissionDenied from '../../assets/image/PermissionDenied.jpg';

export default class AccessDenied extends Component {
    render() {
        return (
            <img height="40%" width="40%" src={PermissionDenied}></img>
        );
    }
}
