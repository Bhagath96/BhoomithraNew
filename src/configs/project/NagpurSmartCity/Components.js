import React from 'react';

import Avatar from '../../../common/components/custom/Avatar';
import CustomLogin from '../../../components/login/Bhoomitra';

const LoginLogo = (props) => (<Avatar alt={props.alt} src={props.src} variant='square' height='10' width='18' />);
const MenuLogo = (props) => (<Avatar alt={props.alt} src={props.src} variant='square' height='5' width='8' />);

const defaultValues = { LoginLogo, MenuLogo, CustomLogin };

const components = {
    local: {
        ...defaultValues
    },
    dev: {
        ...defaultValues
    },
    stage: {
        ...defaultValues
    },
    test: {
        ...defaultValues
    },
    prod: {
        ...defaultValues
    }
};

export default components;
