/* eslint-disable no-undef */
import _ from 'lodash';
import configs from '../configs';

export const getProjectProps = (type) => {
    return _.get(configs, `${ENV_MODE.PROJECT}.${type}.${ENV_MODE.MODE}`, {});
};

export const getPortal = (type) => {
    let portals = getProjectProps(type);
    return {
        key: ENV_MODE.PORTAL,
        value: _.find(portals, ENV_MODE.PORTAL) || {}
    };
};
