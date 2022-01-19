import React from 'react';
import { store } from '../../redux/store';
import { Route } from 'react-router-dom';

import { getExceptionalPaths as getExceptionalPathProps } from './ExceptionalPaths';
import { getDashboard } from './Dashboard';
import { getSchedule } from './Schedule';
import { getSingleRoutes } from './SingleRoutes';
import { getOrgPaths, getRolesPaths, getUserGroupPaths, getUsersPaths } from './UsersAndOrgPaths';
import { getTemplatesQuestions } from './TemplatesQuestions';
import { getReports } from './Reports';
import { getCustomer } from './Customers';
import { getServiceHistory } from './ServiceHistory';
import { getCustomerDataCorrections } from './CustomerDataCorrections';
import { getBasicConfigRoutes } from './BasicConfigPaths';
import { getMcgRrfCkcRoutes } from './McfRrfCkcPaths';
import { getVehicleTracking } from './VehicleTracking';

const generateRoute = (paths = []) => paths.map((item, index) => <Route key={index} path={`${item.path}`} exact component={item.component} />);

let orderedSideMenus = [
    {
        name: 'Dashboard',
        fn: (path) => getDashboard(path),
        order: 1
    },
    {
        name: 'Reports',
        fn: (userDetails) => getReports(userDetails),
        order: 2
    },
    {
        name: 'Organization',
        fn: (userDetails) => getOrgPaths(userDetails),
        order: 3
    },
    {
        name: 'Users',
        fn: (userDetails) => getUsersPaths(userDetails),
        order: 4
    },
    {
        name: 'Roles',
        fn: (userDetails) => getRolesPaths(userDetails),
        order: 5
    },
    {
        name: 'User GRoups',
        fn: (userDetails) => getUserGroupPaths(userDetails),
        order: 6
    },
    {
        name: 'Schedule',
        fn: (userDetails) => getSchedule(userDetails),
        order: 7
    },
    {
        name: 'Template&Questions',
        fn: (userDetails) => getTemplatesQuestions(userDetails),
        order: 8
    },
    {
        name: 'Customers',
        fn: (userDetails) => getCustomer(userDetails),
        order: 9
    },
    {
        name: 'Service History',
        fn: (userDetails) => getServiceHistory(userDetails),
        order: 10
    },
    {
        name: 'CustomerDateCurrection',
        fn: (userDetails) => getCustomerDataCorrections(userDetails),
        order: 11
    },
    {
        name: 'BasicConfigRoutes',
        fn: (userDetails) => getBasicConfigRoutes(userDetails),
        order: 12
    },
    {
        name: 'McfRrfCkcRoutes',
        fn: (userDetails) => getMcgRrfCkcRoutes(userDetails),
        order: 13
    },
    {
        name: 'VehicleTracking',
        fn: (userDetails) => getVehicleTracking(userDetails),
        order: 14
    }
];

export const getCompleteSideMenus = () => {
    let userDetails = store.getState();
    let tempMenus = [];
    orderedSideMenus = orderedSideMenus.sort((a, b) => a.order > b.order);

    orderedSideMenus.map((item) => {
        let data = item.fn(userDetails);
        if (data.length > 0) {
            tempMenus.push(...data);
        }
    });

    return tempMenus || [];

};


export const getRoutePaths = () => {
    let userDetails = store.getState();
    let paths = [
        // getSingleRoutes
        ...getSingleRoutes(userDetails),
        // getGroupedRoutes
        ...getDashboard(userDetails),
        ...getOrgPaths(userDetails),
        ...getUsersPaths(userDetails),
        ...getRolesPaths(userDetails),
        ...getUserGroupPaths(userDetails),
        ...getSchedule(userDetails),
        ...getTemplatesQuestions(userDetails),
        ...getReports(userDetails),
        ...getCustomer(userDetails),
        ...getServiceHistory(userDetails),
        ...getCustomerDataCorrections(userDetails),
        ...getBasicConfigRoutes(userDetails),
        ...getMcgRrfCkcRoutes(userDetails),
        ...getVehicleTracking(userDetails)
    ];
    return generateRoute(paths || []);
};

export const getExceptionalPaths = () => {
    return generateRoute(getExceptionalPathProps() || []);
};
