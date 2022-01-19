import React from 'react';

import Avatar from '../../../common/components/custom/Avatar';
import CustomLogin from '../../../components/login/Harithamithram';

const LoginLogo = (props) => (<Avatar alt={props.alt} src={props.src} height={props.height} width={props.width} />);
const MenuLogo = (props) => (<Avatar alt={props.alt} src={props.src} />);

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
