import React from 'react';

export const DEFAULT_TABLE_PROPS = { page: 0, count: 0, size: 10 };

export const API_PROPS = { DROP_DOWN: 'dropdown', TABLE: 'table' };

export const RESPONSE_TYPE = {
    DROP_DOWN: { type: 'dropdown' },
    TABLE: { type: 'Table' }
};

export const FILTER_API_PROPS = { type: 'filterDropdownData', filter: true };

export const ERROR_CODES = {
    JWT_EXPIRED: 4401
};

export const API_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss[Z]';

export const VALIDATION_RULES = {
    PHONE_REG_EXP: /^[6-9]\d{9}$/,
    DECIMAL_REG_EXP: /^\d*\.{1}\d*$/,
    DIGIT_REG_EXP: /[0-9]/,
    EMAIL_REG_EXP: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
};

export const MUI_COMMON_OPTIONS = {
    searchPlaceholder: 'search',
    print: false,
    download: false,
    filterType: 'dropdown',
    responsive: 'vertical',
    serverSide: true,
    enableNestedDataAccess: '.',
    selectableRows: 'none',
    count: 0,
    page: 0,
    search: false,
    customActions: [],
    customToolbarSelect: () => (<></>),
    textLabels: {
        pagination: {
            next: 'next_page',
            previous: 'previous_page',
            rowsPerPage: 'rows_per_page',
            displayRows: 'of'
        },
        filter: {
            title: 'filter',
            reset: 'reset',
            all: 'all'
        },
        viewColumns: {
            title: 'view_columns',
            titleArea: ''
        },
        toolbar: {
            filterTable: 'filter_table',
            search: 'search',
            viewColumns: 'view_columns'
        },
        body: {
            toolTip: 'sort',
            noMatch: 'no_matching_records_found'
        }
    }
};

export const TABLE_STICKY_ACTIONS = {
    setCellProps: () => ({
        style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            right: '0',
            background: 'white',
            zIndex: '90 !important'
        }
    }),
    setCellHeaderProps: () => ({
        style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            right: 0,
            background: 'white',
            zIndex: '101 !important'
        }
    })
};

export const PROJECT_CONFIG_PROPS = {
    API: 'Api',
    DETAILS: 'Details',
    THEME: 'Theme',
    I18N: 'Language',
    COMPONENTS: 'Components',
    PORTAL: 'Portals'
};

export const ADMIN_ROLES = [
    'ROLE_SYS_ADMIN'
];

export const ROLE_TYPES = {
    ROLE_GT: 'ROLE_GT',
    ROLE_DEVELOPER: 'ROLE_DEVELOPER',
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_CUSTOMER: 'ROLE_CUSTOMER',
    ROLE_SURVEYOR: 'ROLE_SURVEYOR',
    ROLE_SW_SUPERVISOR: 'ROLE_SW_SUPERVISOR',
    ROLE_SURVEYOR_SUPERVISOR: 'ROLE_SURVEYOR_SUPERVISOR'
};

