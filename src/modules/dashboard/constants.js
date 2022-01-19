import { I18n } from '../../common/components';

export const STATE_REDUCER_KEY = 'dashboard';

export const ISO_DATE = 'YYYY-MM-DD';
export const DATE_FORMAT = 'dd-MM-yyyy';

export const CHART_ID_DESC = {
    TOTAL_NO_CUSTOMERS_VS_PLAN_ENABLED_CUSTOMERS: 'TOTAL_NO_CUSTOMERS_VS_PLAN_ENABLED_CUSTOMERS',
    SERVICES_CREATED_VS_SERVICES_EXECUTED: 'SERVICES_CREATED_VS_SERVICES_EXECUTED',
    PIE_CHART: 'PIE_CHART',
    BUBBLE_CHART: 'BUBBLE_CHART',
    TOTAL_WASTE_PER_CATEGORY: 'TOTAL_WASTE_PER_CATEGORY',
    TIME_TAKEN_TO_SERVICE: 'TIME_TAKEN_TO_SERVICE',
    TIME_TAKEN_TO_SERVICE_PER_PERSON: 'TIME_TAKEN_TO_SERVICE_PER_PERSON'
};

export const CHART_IDS = {
    CHART_1: CHART_ID_DESC.TOTAL_NO_CUSTOMERS_VS_PLAN_ENABLED_CUSTOMERS,
    CHART_2: CHART_ID_DESC.SERVICES_CREATED_VS_SERVICES_EXECUTED,
    CHART_3: CHART_ID_DESC.PIE_CHART,
    CHART_4: CHART_ID_DESC.BUBBLE_CHART,
    CHART_5: CHART_ID_DESC.TOTAL_WASTE_PER_CATEGORY,
    CHART_6: CHART_ID_DESC.TIME_TAKEN_TO_SERVICE,
    CHART_7: CHART_ID_DESC.TIME_TAKEN_TO_SERVICE_PER_PERSON
};

export const CHART_TITLES = {
    [CHART_IDS.CHART_1]: 'total_plan_enabled',
    [CHART_IDS.CHART_2]: 'service_created_service_executed',
    [CHART_IDS.CHART_3]: 'customers_registered',
    [CHART_IDS.CHART_4]: 'total_waste_per_category',
    [CHART_IDS.CHART_5]: 'total_waste_per_category',
    [CHART_IDS.CHART_6]: 'time_taken_to_service',
    [CHART_IDS.CHART_7]: 'time_taken_to_service_per_person'
};

export const CHART_TYPES = {
    LINE_CHART: 'LINE_CHART',
    H_BAR_CHART: 'H_BAR_CHART',
    V_BAR_CHART: 'V_BAR_CHART',
    BUBBLE_CHART: 'BUBBLE_CHART',
    PIE_CHART: 'PIE_CHART',
    V_STACKED_BAR: 'V_STACKED_BAR'
};

const CHART_TYPES_LABEL = {
    [CHART_TYPES.LINE_CHART]: 'line',
    [CHART_TYPES.H_BAR_CHART]: 'horizontal_bar',
    [CHART_TYPES.V_BAR_CHART]: 'vertical_bar',
    [CHART_TYPES.BUBBLE_CHART]: 'bubble',
    [CHART_TYPES.PIE_CHART]: 'pie',
    [CHART_TYPES.V_STACKED_BAR]: 'stacked_vertical_bar'
};

export const SORT_AND_LIMIT = {
    RECENT_20: 'RECENT_20',
    RECENT_10: 'RECENT_10',
    OLDEST_20: 'OLDEST_20',
    OLDEST_10: 'OLDEST_10'
};

export const SORT = {
    ASC: 'ASC',
    DESC: 'DESC'
};

export const ORDER_BY = {
    [SORT_AND_LIMIT.RECENT_20]: 'recent_20',
    [SORT_AND_LIMIT.RECENT_10]: 'recent_10',
    [SORT_AND_LIMIT.OLDEST_20]: 'oldest_20',
    [SORT_AND_LIMIT.OLDEST_10]: 'oldest_10'
};

export const ORDER_BY_REQUEST = {
    [SORT_AND_LIMIT.RECENT_10]: { sortOrder: SORT.DESC, limit: 10 },
    [SORT_AND_LIMIT.OLDEST_10]: { sortOrder: SORT.ASC, limit: 10 },
    [SORT_AND_LIMIT.RECENT_20]: { sortOrder: SORT.DESC, limit: 20 },
    [SORT_AND_LIMIT.OLDEST_20]: { sortOrder: SORT.ASC, limit: 20 }
};

export const GROUP_BY_INTERVAL = {
    DAILY: 'DAILY',
    MONTHLY: 'MONTHLY'
};

export const GROUP_BY = {
    [GROUP_BY_INTERVAL.DAILY]: 'daily',
    [GROUP_BY_INTERVAL.MONTHLY]: 'monthly'
};

export const getChartDropdownOption = (chartType) => ({ id: chartType, name: I18n.t(CHART_TYPES_LABEL[chartType]) });

export const getI18nDropdown = (data) => {
    let response = [];
    for (const key in data) {
        response.push({ id: key, name: I18n.t(data[key]) });
    }
    return response;
};

export const getI18nDropdownSelected = (object = {}, key = null) => {
    let response = null;
    if (key) {
        response = { id: key, name: I18n.t(object[key]) };
    }
    return response;
};
