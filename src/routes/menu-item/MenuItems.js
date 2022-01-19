import React from 'react';
import { store } from '../../redux/store';
import { Icons, I18n } from '../../common/components';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../common/Permissions';
import { menuAccessPermissions } from '../../utils/PermissionUtils';
import { PATH } from '..';
import { getDashboardSubmenu, getUsersAndOrgSubmenu, getTemplatesQuestionsSubmenu, getReportsSubmenu, getBasicConfigSubMenu, getMCFSubMenu, getRRFSubMenu, getCKCSubMenu, getMapSubmenu } from './SubMenuItems';
import { BugReportTwoTone, ForumTwoTone } from '@material-ui/icons';
import { Icon } from '@material-ui/core';

const {
    DashboardTwoTone, ImportantDevicesTwoTone, PeopleAltTwoTone, LiveHelpTwoTone, SettingsApplicationsTwoTone,
    ScheduleTwoTone, CropFree, Subscriptions, LineWeightTwoTone, BuildTwoTone,
    SubtitlesTwoTone, PaymentTwoTone, AnnouncementTwoTone, AddShoppingCart,
    AcUnitTwoTone, AllOutTwoTone, AssessmentTwoTone, AirportShuttle, AccountBoxTwoTone
} = Icons;

export const getMenuItems = () => {
    let userDetails = store.getState();
    let menu = [];
    let
        usersAndOrganizations = {
            name: I18n.t('users_and_organizations'),
            Icon: <PeopleAltTwoTone />,
            items: []
        },
        dynamicQuestionGeneration = {
            name: I18n.t('templates_and_questions'),
            Icon: <LiveHelpTwoTone />,
            items: []
        },
        basicConfig = {
            name: I18n.t('basicConfig'),
            Icon: <SettingsApplicationsTwoTone />,
            items: []
        },
        RRF = {
            name: I18n.t('rrff'),
            Icon: <AcUnitTwoTone />,
            items: []
        },
        CKC = {
            name: I18n.t('ckc'),
            Icon: <AllOutTwoTone />,
            items: []
        },
        mcf = {
            name: I18n.t('mcf'),
            Icon: <AddShoppingCart />,
            items: []
        },
        dashboard = {
            name: I18n.t('dashboard'),
            Icon: <DashboardTwoTone />,
            items: []
        },
        reports = {
            name: I18n.t('reports'),
            Icon: <AssessmentTwoTone />,
            items: []
        },
        map = {
            name: I18n.t('vehicle_tracking_system'),
            Icon: <AirportShuttle />,
            items: []
        };

    //Dashboard
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD, ACTION_MAPPING.DASHBOARD.ACCESS_IN_WEB_NAV)) {
        dashboard.items = getDashboardSubmenu(userDetails);
        (dashboard.items) && menu.push(dashboard);
    }
    //Customers
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.CUSTOMER, ACTION_MAPPING.CUSTOMER.ACCESS_CUSTOMER_IN_NAV)) {
        menu.push({
            name: I18n.t('customers'),
            Icon: <AccountBoxTwoTone />,
            link: PATH.CUSTOMER_DATA
        });
    }
    //Schedule
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SCHEDULE, ACTION_MAPPING.SCHEDULE.ACCESS_IN_WEB_NAV)) {
        menu.push({
            name: I18n.t('side_bar_schedule'),
            Icon: <ScheduleTwoTone />,
            link: PATH.SCHEDULE
        });
    }
    //services
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SERVICE, ACTION_MAPPING.SERVICE.ACCESS_SERVICE_IN_WEB_NAV)) {
        menu.push({
            name: I18n.t('services'),
            Icon: <BuildTwoTone />,
            link: PATH.SERVICE
        });
    }
    //service History
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SERVICE, ACTION_MAPPING.SERVICE.ACCESS_SERVICE_HISTORY_IN_WEB_NAV)) {
        menu.push({
            name: I18n.t('service_history'),
            Icon: <LineWeightTwoTone />,
            link: PATH.SERVICE_HISTORY
        });
    }
    //Subscriptions
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SUBSCRIPTION, ACTION_MAPPING.SUBSCRIPTION.ACCESS_SUBSCRIPTION_IN_WEB_NAV)) {
        menu.push({
            name: I18n.t('subscription'),
            Icon: <SubtitlesTwoTone />,
            link: PATH.SUBSCRIPTION
        });
    }
    //payments
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.PAYMENT, ACTION_MAPPING.PAYMENT.ACCESS_PAYMENT_IN_NAV)) {
        menu.push({
            name: I18n.t('side_bar_payments'),
            Icon: <PaymentTwoTone />,
            link: PATH.PAYMENT
        });
    }
    //complaints
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.COMPLAINT, ACTION_MAPPING.COMPLAINT.ACCESS_COMPLAINT_IN_WEB_NAV)) {
        menu.push({
            name: I18n.t('complaints'),
            Icon: <ForumTwoTone />,
            link: PATH.COMPLAINT
        });
    }
    //incidents
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.INCIDENTS, ACTION_MAPPING.INCIDENTS.ACCESS_INCIDENT_IN_WEB_NAV)) {
        menu.push({
            name: I18n.t('incidents'),
            Icon: <AnnouncementTwoTone />,
            link: PATH.INCIDENTS
        });
    }
    //special service request
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SPECIAL_SERVICE, ACTION_MAPPING.SPECIAL_SERVICE.ACCESS_SPECIAL_SERVICE_IN_NAV)) {
        menu.push({
            name: I18n.t('special_service_request'),
            Icon: <ImportantDevicesTwoTone />,
            link: PATH.SPECIAL_SERVICE_REQUEST
        });
    }
    //subscription request
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SUBSCRIPTION_REQUEST, ACTION_MAPPING.SUBSCRIPTION_REQUEST.ACCESS_SUBSCRIPTION_REQUEST_IN_WEB_NAV)) {
        menu.push({
            name: I18n.t('subscription_request'),
            Icon: <Subscriptions />,
            link: PATH.SUBSCRIPTION_REQUEST
        });
    }
    //Generate QR Codes
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.QRCODE, ACTION_MAPPING.QRCODE.ACCESS_QRCODE_IN_NAV)) {
        menu.push({
            name: I18n.t('generate_QR_code'),
            Icon: <CropFree />,
            link: PATH.GENERATE_QR_CODE
        });
    }
    //MCF
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.MCF, ACTION_MAPPING.MCF.ACCESS_IN_WEB_NAV)) {
        mcf.items = getMCFSubMenu(userDetails);
        (mcf.items) && menu.push(mcf);
    }

    //RRF
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.RRF, ACTION_MAPPING.RRF.ACCESS_IN_WEB_NAV)) {
        RRF.items = getRRFSubMenu(userDetails);
        (RRF.items) && menu.push(RRF);
    }
    //CKC
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.CKC, ACTION_MAPPING.CKC.ACCESS_IN_WEB_NAV)) {
        CKC.items = getCKCSubMenu(userDetails);
        (CKC.items) && menu.push(CKC);
    }
    //Users and Organizations
    if (
        menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION, ACTION_MAPPING.ORGANIZATION.ACCESS_IN_WEB_NAV) ||
        menuAccessPermissions(userDetails, RESOURCE_MAPPING.USER_GROUP, ACTION_MAPPING.USER_GROUP.ACCESS_IN_WEB_NAV) ||
        menuAccessPermissions(userDetails, RESOURCE_MAPPING.ROLES, ACTION_MAPPING.ROLES.ACCESS_IN_WEB_NAV) ||
        menuAccessPermissions(userDetails, RESOURCE_MAPPING.USER, ACTION_MAPPING.USER.ACCESS_IN_WEB_NAV)
    ) {
        usersAndOrganizations.items = getUsersAndOrgSubmenu(userDetails);
        (usersAndOrganizations.items) && menu.push(usersAndOrganizations);
    }
    //Vehicle Tracking
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.VEHICLE_TRACKING, ACTION_MAPPING.VEHICLE_TRACKING.ACCESS_IN_WEB_NAV)) {
        map.items = getMapSubmenu(userDetails);
        (map.items) && menu.push(map);
    }
    //Templates and Questions
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.QUESTION, ACTION_MAPPING.QUESTION.ACCESS_IN_WEB_NAV) ||
        menuAccessPermissions(userDetails, RESOURCE_MAPPING.TITLE, ACTION_MAPPING.TITLE.ACCESS_IN_WEB_NAV) ||
        menuAccessPermissions(userDetails, RESOURCE_MAPPING.FRAGMENT, ACTION_MAPPING.FRAGMENT.ACCESS_IN_WEB_NAV) ||
        menuAccessPermissions(userDetails, RESOURCE_MAPPING.TEMPLATE, ACTION_MAPPING.TEMPLATE.ACCESS_IN_WEB_NAV)) {
        dynamicQuestionGeneration.items = getTemplatesQuestionsSubmenu(userDetails);
        (dynamicQuestionGeneration.items) && menu.push(dynamicQuestionGeneration);
    }
    //Basic Config
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.BASIC_CONFIG, ACTION_MAPPING.BASIC_CONFIG.ACCESS_IN_WEB_NAV)) {
        basicConfig.items = getBasicConfigSubMenu(userDetails);
        (basicConfig.items) && menu.push(basicConfig);
    }
    //Customer data correction
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.CUSTOMER, ACTION_MAPPING.CUSTOMER.ACCESS_CUSTOMER_DATA_CORRECTION_IN_WEB_NAV)) {
        menu.push({
            name: I18n.t('customer_data_correction'),
            Icon: <Icon className='mdi mdi-account-question' />,
            link: PATH.CUSTOMER_DATA_CORRECTION
        });
    }
    //Reported Bugs
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORTED_BUGS, ACTION_MAPPING.REPORTED_BUGS.ACCESS_IN_WEB_NAV)) {
        menu.push({
            name: I18n.t('reported_bugs'),
            Icon: <BugReportTwoTone />,
            link: PATH.REPORTED_BUGS
        });
    }
    //Reports
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT, ACTION_MAPPING.REPORT.ACCESS_IN_WEB_NAV)) {
        reports.items = getReportsSubmenu(userDetails);
        (reports.items) && menu.push(reports);
    }

    return menu;
};
