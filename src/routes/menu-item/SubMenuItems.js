import React from 'react';
import { menuAccessPermissions } from '../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../common/Permissions';
import { I18n, Icons } from '../../common/components';
import { PATH } from '..';
import { Icon } from '@material-ui/core';

const {
    BusinessTwoTone, GroupTwoTone, PersonOutlineTwoTone, SupervisedUserCircleTwoTone, ViewQuilt, AssignmentTwoTone,
    NatureOutlined, LiveHelpTwoTone, PinDropOutlined, SettingsApplicationsTwoTone,
    ContactSupportTwoTone, MenuBookTwoTone, AccountBoxTwoTone, CropFree, EmojiFlags,
    ViewAgendaOutlined, AccountTreeOutlined, HomeWorkOutlined, NaturePeopleOutlined, TrendingUpOutlined,
    ApartmentOutlined, ShoppingCartOutlined, ShareOutlined, LocalAtmOutlined, GamepadOutlined, SpaOutlined, PeopleOutlineOutlined,
    PersonOutlineOutlined, SettingsOutlined, LayersOutlined, BuildTwoTone,
    PaymentTwoTone, Gesture, WhereToVoteTwoTone, ReportProblemOutlined,
    AllInbox, MonetizationOn, TransferWithinAStation, AirlineSeatFlatAngledTwoTone,
    PollTwoTone, PanoramaVerticalTwoTone, DeleteSweep, LoyaltyTwoTone, ReceiptTwoTone,
    LibraryBooksTwoTone, ForumTwoTone, FlightTakeoff, Commute, BugReportTwoTone, CalendarViewDayTwoTone
} = Icons;

//Dashboard Sub Menu
export const getDashboardSubmenu = (userDetails) => {
    let subMenu = [];
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD_SURVEY, ACTION_MAPPING.DASHBOARD_SURVEY.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('dashboard_survey'),
            Icon: <AccountBoxTwoTone />,
            link: PATH.DASHBOARD_SURVEY
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD_SERVICE, ACTION_MAPPING.DASHBOARD_SERVICE.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('dashboard_service'),
            Icon: <BuildTwoTone />,
            link: PATH.DASHBOARD_SERVICES
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD_COMPLAINT, ACTION_MAPPING.DASHBOARD_COMPLAINT.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('dashboard_complaint'),
            Icon: <ForumTwoTone />,
            link: PATH.DASHBOARD_COMPLAINTS
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD_PAYMENT, ACTION_MAPPING.DASHBOARD_PAYMENT.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('dashboard_payment'),
            Icon: <PaymentTwoTone />,
            link: PATH.DASHBOARD_PAYMENT
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD_SERVICE_PROVIDER, ACTION_MAPPING.DASHBOARD_SERVICE_PROVIDER.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('dashboard_service_provider'),
            Icon: <SettingsApplicationsTwoTone />,
            link: PATH.DASHBOARD_SERVICE_PROVIDER
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD_WASTE_COLLECTED, ACTION_MAPPING.DASHBOARD_WASTE_COLLECTED.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('dashboard_waste_collected'),
            Icon: <DeleteSweep />,
            link: PATH.DASHBOARD_WASTE
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD_RRF_STOCK, ACTION_MAPPING.DASHBOARD_RRF_STOCK.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('dashboard_rrf_stock'),
            Icon: <Icon className='mdi mdi-store' />,
            link: PATH.DASHBOARD_STOCK_RRF
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD_RRF_SALE, ACTION_MAPPING.DASHBOARD_RRF_SALE.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('dashboard_rrf_sale'),
            Icon: <LoyaltyTwoTone />,
            link: PATH.DASHBOARD_SALE_RRF
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD_MCF_STOCK, ACTION_MAPPING.DASHBOARD_MCF_STOCK.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('dashboard_mcf_stock'),
            Icon: <LibraryBooksTwoTone />,
            link: PATH.DASHBOARD_STOCK_MCF
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD_MCF_SALE, ACTION_MAPPING.DASHBOARD_MCF_SALE.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('dashboard_mcf_sale'),
            Icon: <ReceiptTwoTone />,
            link: PATH.DASHBOARD_SALE_MCF
        });
    }

    return subMenu;
};

//Users and Organizations Sub Menu
export const getUsersAndOrgSubmenu = (userDetails) => {
    let subMenu = [];
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION, ACTION_MAPPING.ORGANIZATION.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('organizations'),
            Icon: <BusinessTwoTone />,
            link: PATH.ORGANIZATION
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.USER, ACTION_MAPPING.USER.ACCESS_IN_WEB_NAV)) {
        subMenu.push(
            {
                name: I18n.t('users'),
                Icon: <PersonOutlineTwoTone />,
                link: PATH.USER
            }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.USER_GROUP, ACTION_MAPPING.USER_GROUP.ACCESS_IN_WEB_NAV)) {
        subMenu.push(
            {
                name: I18n.t('user_groups'),
                Icon: <GroupTwoTone />,
                link: PATH.USER_GROUP
            }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ROLES, ACTION_MAPPING.ROLES.ACCESS_IN_WEB_NAV)) {
        subMenu.push(
            {
                name: I18n.t('roles'),
                Icon: <SupervisedUserCircleTwoTone />,
                link: PATH.REG_ROLE
            }
        );
    }
    return subMenu;
};

//Templates and Questions Sub Menu
export const getTemplatesQuestionsSubmenu = (userDetails) => {
    let subMenu = [];
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.QUESTION, ACTION_MAPPING.QUESTION.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('questions'),
            Icon: <ContactSupportTwoTone />,
            link: PATH.DYNAMIC_QUESTION
        });
    }

    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TITLE, ACTION_MAPPING.TITLE.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('titles'),
            Icon: <AssignmentTwoTone />,
            link: PATH.DYNAMIC_TITLE
        });
    }

    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.FRAGMENT, ACTION_MAPPING.FRAGMENT.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('fragments'),
            Icon: <AssignmentTwoTone />,
            link: PATH.DYNAMIC_FRAGMENT
        });
    }

    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TEMPLATE, ACTION_MAPPING.TEMPLATE.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('templates'),
            Icon: <MenuBookTwoTone />,
            link: PATH.DYNAMIC_TEMPLATE
        });
    }
    return subMenu;

};

//Reports Sub Menu
export const getReportsSubmenu = (userDetails) => {
    let subMenu = [];
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_DOOR_STATUS, ACTION_MAPPING.REPORT_DOOR_STATUS.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('door_status'),
            Icon: <EmojiFlags />,
            link: PATH.DOOR_STATUS
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_SURVEY_COUNT, ACTION_MAPPING.REPORT_SURVEY_COUNT.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('survey_count'),
            Icon: <CropFree />,
            link: PATH.SURVEY_COUNT
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_ADVANCE_STATUS, ACTION_MAPPING.REPORT_ADVANCE_STATUS.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('advance_status'),
            Icon: <LiveHelpTwoTone />,
            link: PATH.ADVANCE_STATUS
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_SERVICE_COMPLETION_RESIDENTIAL, ACTION_MAPPING.REPORT_SERVICE_COMPLETION_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('service_completion_residential'),
            Icon: <NatureOutlined />,
            link: PATH.SERVICE_COMPLETION_R
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_SERVICE_COMPLETION_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_SERVICE_COMPLETION_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('service_completion_non_residential'),
            Icon: <PinDropOutlined />,
            link: PATH.SERVICE_COMPLETION_NR
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_SERVICE_COUNT_ESCALATED_RESIDENTIAL, ACTION_MAPPING.REPORT_SERVICE_COUNT_ESCALATED_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('service_count_escalated_residential'),
            Icon: <ViewQuilt />,
            link: PATH.SERVICE_COUNT_ESCALATED_R
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_SERVICE_COUNT_ESCALATED_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_SERVICE_COUNT_ESCALATED_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('service_count_escalated_non_residential'),
            Icon: <ViewAgendaOutlined />,
            link: PATH.SERVICE_COUNT_ESCALATED_NR
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_SERVICE_PENDING_RESIDENTIAL, ACTION_MAPPING.REPORT_SERVICE_PENDING_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('service_pending_residential'),
            Icon: <HomeWorkOutlined />,
            link: PATH.SERVICE_PENDING_R
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_SERVICE_PENDING_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_SERVICE_PENDING_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('service_pending_non_residential'),
            Icon: <AccountTreeOutlined />,
            link: PATH.SERVICE_PENDING_NR
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_PLAN_ENABLED_RESIDENTIAL, ACTION_MAPPING.REPORT_PLAN_ENABLED_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('plan_enabled_residential'),
            Icon: <NaturePeopleOutlined />,
            link: PATH.PLAN_ENABLED_RESIDENTAIL
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_PLAN_DISABLED_RESIDENTIAL, ACTION_MAPPING.REPORT_PLAN_DISABLED_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('plan_disabled_residential'),
            Icon: <TrendingUpOutlined />,
            link: PATH.PLAN_DISABLED_RESIDENTAIL
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_PLAN_ENABLED_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_PLAN_ENABLED_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('plan_enabled_non_residential'),
            Icon: <ApartmentOutlined />,
            link: PATH.PLAN_ENABLED_NON_RESIDENTAIL
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_PLAN_DISABLED_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_PLAN_DISABLED_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('plan_disabled_non_residential'),
            Icon: <ShoppingCartOutlined />,
            link: PATH.PLAN_DISABLED_NON_RESIDENTAIL
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_PAYMENT_COLLECTED_RESIDENTIAL, ACTION_MAPPING.REPORT_PAYMENT_COLLECTED_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('payment_collected_residential'),
            Icon: <ShareOutlined />,
            link: PATH.PAYMENT_COLLECTED_RESIDENTAIL
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_PAYMENT_DUE_RESIDENTIAL, ACTION_MAPPING.REPORT_PAYMENT_DUE_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('payment_due_residential'),
            Icon: <LocalAtmOutlined />,
            link: PATH.PAYMENT_DUE_RESIDENTAIL
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_PAYMENT_COLLECTED_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_PAYMENT_COLLECTED_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('payment_collected_non_residential'),
            Icon: <GamepadOutlined />,
            link: PATH.PAYMENT_COLLECTED_NON_RESIDENTAIL
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_PAYMENT_DUE_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_PAYMENT_DUE_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('payment_due_non_residential'),
            Icon: <LocalAtmOutlined />,
            link: PATH.PAYMENT_DUE_NON_RESIDENTAIL
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_ITEM_WISE_MCF, ACTION_MAPPING.REPORT_ITEM_WISE_MCF.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('mcf_item_wise'),
            Icon: <SpaOutlined />,
            link: PATH.WASTE_QUANTITY_MCF
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_ITEM_WISE_RRF, ACTION_MAPPING.REPORT_ITEM_WISE_RRF.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('rrf_item_wise'),
            Icon: <PeopleOutlineOutlined />,
            link: PATH.WASTE_QUANTITY_RRF
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_PLASTIC_RESIDENTIAL, ACTION_MAPPING.REPORT_PLASTIC_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('residential_plastic'),
            Icon: <PersonOutlineOutlined />,
            link: PATH.WASTE_QUANTITY_RESIDENTIAL_PLASTIC
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_GLASS_RESIDENTIAL, ACTION_MAPPING.REPORT_GLASS_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('residential_glass'),
            Icon: <LayersOutlined />,
            link: PATH.WASTE_QUANTITY_RESIDENTIAL_GLASS
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_LEATHER_RESIDENTIAL, ACTION_MAPPING.REPORT_LEATHER_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('residential_leather'),
            Icon: <SettingsOutlined />,
            link: PATH.WASTE_QUANTITY_RESIDENTIAL_LEATHER
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_E_WASTE_RESIDENTIAL, ACTION_MAPPING.REPORT_E_WASTE_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('residential_e_waste'),
            Icon: <Icon className='mdi mdi-delete-variant' />,
            link: PATH.WASTE_QUANTITY_RESIDENTIAL_EWASTE
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_PLASTIC_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_PLASTIC_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('non_residential_plastic'),
            Icon: <Icon className='mdi mdi-bottle-soda' />,
            link: PATH.WASTE_QUANTITY_NON_RESIDENTIAL_PLASTIC
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_GLASS_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_GLASS_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('non_residential_glass'),
            Icon: <Icon className='mdi mdi-cup-outline' />,
            link: PATH.WASTE_QUANTITY_NON_RESIDENTIAL_GLASS
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_LEATHER_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_LEATHER_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('non_residential_leather'),
            Icon: <Icon className='mdi mdi-blood-bag' />,
            link: PATH.WASTE_QUANTITY_NON_RESIDENTIAL_LEATHER
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_E_WASTE_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_E_WASTE_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('non_residential_e_waste'),
            Icon: <Icon className='mdi mdi-delete-restore' />,
            link: PATH.WASTE_QUANTITY_NON_RESIDENTIAL_EWASTE
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_POULTRY_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_POULTRY_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('non_residential_poultry'),
            Icon: <Icon className='mdi mdi-mailbox-up-outline' />,
            link: PATH.WASTE_QUANTITY_NON_RESIDENTIAL_POULTRY
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_COMPLAINT_COMPLETION_RESIDENTIAL, ACTION_MAPPING.REPORT_COMPLAINT_COMPLETION_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('complaint_completion_residential'),
            Icon: <Icon className='mdi mdi-chart-donut' />,
            link: PATH.COMPLAINT_COMPLETION_R
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_COMPLAINT_COMPLETION_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_COMPLAINT_COMPLETION_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('complaint_completion_non_residential'),
            Icon: <BugReportTwoTone />,
            link: PATH.COMPLAINT_COMPLETION_NR
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_COMPLAINT_COUNT_ESCALATED_RESIDENTIAL, ACTION_MAPPING.REPORT_COMPLAINT_COUNT_ESCALATED_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('complaint_count_residential'),
            Icon: <Icon className='mdi mdi-poll' />,
            link: PATH.COMPLAINT_COUNT_ESCALATED_R
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_COMPLAINT_COUNT_ESCALATED_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_COMPLAINT_COUNT_ESCALATED_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('complaint_count_non_residential'),
            Icon: <Icon className='mdi mdi-file-chart-outline' />,
            link: PATH.COMPLAINT_COUNT_ESCALATED_NR
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_COMPLAINT_PENDING_RESIDENTIAL, ACTION_MAPPING.REPORT_COMPLAINT_PENDING_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('complaint_pending_residential'),
            Icon: <Icon className='mdi mdi-chart-bell-curve-cumulative' />,
            link: PATH.COMPLAINT_PENDING_R
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_COMPLAINT_PENDING_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_COMPLAINT_PENDING_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('complaint_pending_non_residential'),
            Icon: <Icon className='mdi mdi-chart-histogram' />,
            link: PATH.COMPLAINT_PENDING_NR
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_ITEM_WISE_SALE, ACTION_MAPPING.REPORT_ITEM_WISE_SALE.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('item_wise_sale'),
            Icon: <Icon className='mdi mdi-bus-alert' />,
            link: PATH.ITEM_WISE_SALE
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_REVENUE, ACTION_MAPPING.REPORT_REVENUE.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('revenue_report'),
            Icon: <Icon className='mdi mdi-note-text-outline' />,
            link: PATH.REVENUE_REPORT
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_ITEM_WISE_STOCK, ACTION_MAPPING.REPORT_ITEM_WISE_STOCK.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('item_wise_stock'),
            Icon: <Icon className='mdi mdi-sitemap' />,
            link: PATH.ITEM_WISE_STOCK
        });
    }
    return subMenu;
};

//Basic Config Sub Menus
export const getBasicConfigSubMenu = (userDetails) => {
    let subMenu = [];

    //Administration Type
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ADMINISTRATION_TYPE, ACTION_MAPPING.ADMINISTRATION_TYPE.ACCESS_ADMINISTRATION_TYPE_IN_NAV)) {
        subMenu.push(
            {
                name: I18n.t('administration_type'),
                Icon: <PersonOutlineOutlined />,
                link: PATH.ADMINISTRATION_TYPE
            }
        );
    }
    //Association Type
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ASSOCIATION_TYPE, ACTION_MAPPING.ASSOCIATION_TYPE.ACCESS_ASSOCIATION_TYPE_IN_NAV)) {
        subMenu.push(
            {
                name: I18n.t('association_type'),
                Icon: <ShareOutlined />,
                link: PATH.ASSOCIATION_TYPE
            }
        );
    }
    //Block Panchayath
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.BLOCK_PANCHAYATH, ACTION_MAPPING.BLOCK_PANCHAYATH.ACCESS_BLOCK_PANCHAYATH_IN_NAV)) {
        subMenu.push(
            {
                name: I18n.t('block_panchayath'),
                Icon: <ViewAgendaOutlined />,
                link: PATH.BASIC_CONFIG_BLOCK_PANCHAYATH
            }
        );
    }
    //Building Type
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.BUILDING_TYPE, ACTION_MAPPING.BUILDING_TYPE.ACCESS_BUILDING_TYPE_IN_NAV)) {
        subMenu.push(
            {
                name: I18n.t('building_type'),
                Icon: <ApartmentOutlined />,
                link: PATH.BUILDING_TYPE
            }
        );
    }
    //Bundled Service Config
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.BUNDLED_SERVICE_CONFIG, ACTION_MAPPING.BUNDLED_SERVICE_CONFIG.ACCESS_BUNDLED_SERVICE_CONFIG_IN_NAV)) {
        subMenu.push(
            {
                name: I18n.t('bundled_service_config'),
                Icon: <LayersOutlined />,
                link: PATH.BUNDLED_SERVICE_CONFIG
            }
        );
    }
    //Complaint Config
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.COMPLAINT_CONFIG, ACTION_MAPPING.COMPLAINT_CONFIG.ACCESS_COMPLAINT_IN_WEB_NAV)) {
        subMenu.push(
            {
                name: I18n.t('complaint_config'),
                Icon: <ReportProblemOutlined />,
                link: PATH.COMPLAINT_CONFIG
            }
        );
    }
    //District
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DISTRICT, ACTION_MAPPING.DISTRICT.ACCESS_DISTRICT_IN_NAV)) {
        subMenu.push(
            {
                name: I18n.t('district'),
                Icon: <PinDropOutlined />,
                link: PATH.BASIC_CONFIG_DISTRICT
            }
        );
    }
    //District Panchayath
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DISTRICT_PANCHAYATH, ACTION_MAPPING.DISTRICT_PANCHAYATH.ACCESS_DISTRICT_PANCHAYATH_IN_NAV)) {
        subMenu.push(
            {
                name: I18n.t('district_panchayath'),
                Icon: <AccountTreeOutlined />,
                link: PATH.BASIC_CONFIG_DISTRICT_PANCHAYATH
            }
        );
    }
    //Incident Config
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.INCIDENT_CONFIG, ACTION_MAPPING.INCIDENTS.ACCESS_INCIDENT_CONFIG_IN_WEB_NAV)) {
        subMenu.push(
            {
                name: I18n.t('incident_config'),
                Icon: <WhereToVoteTwoTone />,
                link: PATH.INCIDENT_CONFIG
            }
        );
    }
    //Item Config
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ITEM, ACTION_MAPPING.ITEM.ACCESS_ITEM_CONFIG_IN_WEB_NAV)) {
        subMenu.push(
            {
                name: I18n.t('side_menu_item'),
                Icon: <Gesture />,
                link: PATH.BASIC_CONFIG_ITEM
            }
        );
    }
    //Item sub category
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ITEM_SUB_CATEGORY, ACTION_MAPPING.ITEM_SUB_CATEGORY.ACCESS_IN_WEB_NAV)) {
        subMenu.push(
            {
                name: I18n.t('item_subcategory'),
                Icon: <CalendarViewDayTwoTone />,
                link: PATH.BASIC_CONFIG_ITEM_SUBCATEGORY
            }
        );
    }
    //Lsgi
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.LSGI, ACTION_MAPPING.LSGI.ACCESS_LSGI_IN_NAV)) {
        subMenu.push(
            {
                name: I18n.t('lsgi'),
                Icon: <NatureOutlined />,
                link: PATH.BASIC_CONFIG_LSGI
            }
        );
    }
    //Organization Type
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_TYPE, ACTION_MAPPING.ORGANIZATION_TYPE.ACCESS_ORGANIZATION_TYPE_IN_NAV)) {
        subMenu.push(
            {
                name: I18n.t('organization_type'),
                Icon: <PeopleOutlineOutlined />,
                link: PATH.ORGANIZATION_TYPE
            }
        );
    }
    //Public Gathering Method
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.PUBLIC_GATHERING_METHOD, ACTION_MAPPING.PUBLIC_GATHERING_METHOD.ACCESS_PUBLIC_GATHERING_METHOD_IN_NAV)) {
        subMenu.push(
            {
                name: I18n.t('public_gathering_method'),
                Icon: <GamepadOutlined />,
                link: PATH.PUBLIC_GATHERING_METHOD
            }
        );
    }
    //Residence Category
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.RESIDENCE_CATEGORY, ACTION_MAPPING.RESIDENCE_CATEGORY.ACCESS_RESIDENCE_CATEGORY_IN_NAV)) {
        subMenu.push(
            {
                name: I18n.t('residence_category'),
                Icon: <HomeWorkOutlined />,
                link: PATH.BASIC_CONFIG_RESIDENCE_CATEGORY
            }
        );
    }
    //Service Charge Slab
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SERVICE_CHARGE_SLAB, ACTION_MAPPING.SERVICE_CHARGE_SLAB.ACCESS_SERVICE_CHARGE_SLAB_IN_NAV)) {
        subMenu.push(
            {
                name: I18n.t('service_charge_slab'),
                Icon: <LocalAtmOutlined />,
                link: PATH.SERVICE_CHARGE_SLAB
            }
        );
    }
    //Service Config
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SERVICE_CONFIG, ACTION_MAPPING.SERVICE_CONFIG.ACCESS_SERVICE_CONFIG_IN_NAV)) {
        subMenu.push(
            {
                name: I18n.t('service_config'),
                Icon: <SettingsOutlined />,
                link: PATH.SERVICE_CONFIG
            }
        );
    }
    //Shop Type
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SHOP_TYPE, ACTION_MAPPING.SHOP_TYPE.ACCESS_SHOP_TYPE_IN_NAV)) {
        subMenu.push(
            {
                name: I18n.t('shop_type'),
                Icon: <ShoppingCartOutlined />,
                link: PATH.SHOP_TYPE
            }
        );
    }
    //State
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.STATE, ACTION_MAPPING.STATE.ACCESS_STATE_IN_NAV)) {
        subMenu.push(
            {
                name: I18n.t('state'),
                Icon: <EmojiFlags />,
                link: PATH.BASIC_CONFIG_STATE
            }
        );
    }
    //Terrace Farming TYpe
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TERRACE_FARMING, ACTION_MAPPING.TERRACE_FARMING.ACCESS_TERRACE_FARMING_HELP_TYPE_IN_NAV)) {
        subMenu.push(
            {
                name: I18n.t('terrace_farming_type'),
                Icon: <SpaOutlined />,
                link: PATH.TERRACE_FARMING
            }
        );
    }
    //Trading Type
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TRADING_TYPE, ACTION_MAPPING.TRADING_TYPE.ACCESS_TRADING_TYPE_IN_NAV)) {
        subMenu.push(
            {
                name: I18n.t('trading_type'),
                Icon: <TrendingUpOutlined />,
                link: PATH.TRADING_TYPE
            }
        );
    }
    //Ward
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.WARD, ACTION_MAPPING.WARD.ACCESS_WARD_IN_NAV)) {
        subMenu.push(
            {
                name: I18n.t('ward'),
                Icon: <NaturePeopleOutlined />,
                link: PATH.BASIC_CONFIG_WARD
            }
        );
    }

    return subMenu;
};

//MCF Sub menus
export const getMCFSubMenu = (userDetails) => {
    let subMenu = [];
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.MCF_SEGGREGATION, ACTION_MAPPING.MCF_SEGREGATION.ACCESS_IN_WEB_NAV)) {
        subMenu.push(
            {
                name: I18n.t('mcf_seggregation'),
                Icon: <AllInbox />,
                link: PATH.MCF_SEGGREGATION
            }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.MCF_STOCK_IN, ACTION_MAPPING.MCF.ACCESS_MCF_STOCK_IN_IN_WEB_NAV)) {
        subMenu.push(
            {
                name: I18n.t('stock_in'),
                Icon: <AllInbox />,
                link: PATH.MCF_STOCK_IN
            }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.MCF_STOCK_TRANSFER, ACTION_MAPPING.MCF.ACCESS_MCF_STOCK_TRANSFER_IN_WEB_NAV)) {

        subMenu.push(
            {
                name: I18n.t('stock_transfer'),
                Icon: <TransferWithinAStation />,
                link: PATH.MCF_STOCK_TRANSFER
            }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.MCF_STOCK_SALE, ACTION_MAPPING.MCF.ACCESS_MCF_SALE_IN_WEB_NAV)) {

        subMenu.push(
            {
                name: I18n.t('stock_sale'),
                Icon: <MonetizationOn />,
                link: PATH.MCF_STOCK_SALE
            }
        );

    }
    return subMenu;
};

//RRF Sub menus
export const getRRFSubMenu = (userDetails) => {
    let subMenu = [];
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.RRF_STOCK_IN, ACTION_MAPPING.RRF_STOCK_IN.ACCESS_RRF_STOCK_IN_NAV)) {
        subMenu.push({
            name: I18n.t('rrff_stockIn'),
            Icon: <PanoramaVerticalTwoTone />,
            link: PATH.RRF_STOCK_IN
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.RRF_SALES, ACTION_MAPPING.RRF_SALES.ACCESS_RRF_SALES_IN_NAV)) {
        subMenu.push({
            name: I18n.t('rrff_sales'),
            Icon: <PollTwoTone />,
            link: PATH.RRF_SALES
        });
    }

    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.RRF_SHREDDED, ACTION_MAPPING.RRF_PLASTIC_SHREDDED.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('rrf_shredded'),
            Icon: <PollTwoTone />,
            link: PATH.RRF_SHREDDED
        });
    }
    return subMenu;
};

//CKC Sub menus
export const getCKCSubMenu = (userDetails) => {
    let subMenu = [];
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.CKC_PICKUP, ACTION_MAPPING.CKC_PICKUP.ACCESS_CKC_PICKUP_IN_NAV)) {
        subMenu.push({
            name: I18n.t('ckc_pickup'),
            Icon: <AirlineSeatFlatAngledTwoTone />,
            link: PATH.CKC_PICKUP
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.CKC_SALES, ACTION_MAPPING.CKC_SALES.ACCESS_CKC_SALE_IN_NAV)) {
        subMenu.push({
            name: I18n.t('ckc_sales'),
            Icon: <PollTwoTone />,
            link: PATH.CKC_SALES
        });
    }
    return subMenu;
};

//Vehicle Tracking
export const getMapSubmenu = (userDetails) => {
    let subMenu = [];
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.VEHICLE_TRACKING_TRIP_PLANNER, ACTION_MAPPING.VEHICLE_TRACKING_TRIP_PLANNER.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('trip_planner'),
            Icon: <FlightTakeoff />,
            link: PATH.MAP_ROUTING
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.VEHICLE_TRACKING_LIVE_TRACKING, ACTION_MAPPING.VEHICLE_TRACKING_LIVE_TRACKING.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('live_tracker'),
            Icon: <Commute />,
            link: PATH.MAP_LIVE_TRACING
        });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.VEHICLE_TRACKING_GEO_FENCE, ACTION_MAPPING.VEHICLE_TRACKING_GEO_FENCE.ACCESS_IN_WEB_NAV)) {
        subMenu.push({
            name: I18n.t('geo_fence'),
            Icon: <Commute />,
            link: PATH.MAP_GEO_FENCE_TRACKING
        });
    }
    return subMenu;
};
