const RESOURCE_MAPPING = {
    DASHBOARD: 'in.trois.common.model.entity.Dashboard',
    DASHBOARD_SURVEY: 'in.trois.common.model.entity.Dashboard.surveyDetails',
    DASHBOARD_SERVICE: 'in.trois.common.model.entity.Dashboard.serviceDetails',
    DASHBOARD_COMPLAINT: 'in.trois.common.model.entity.Dashboard.complaintDetails',
    DASHBOARD_PAYMENT: 'in.trois.common.model.entity.Dashboard.paymentDetails',
    DASHBOARD_SERVICE_PROVIDER: 'in.trois.common.model.entity.Dashboard.serviceProviderDetails',
    DASHBOARD_WASTE_COLLECTED: 'in.trois.common.model.entity.Dashboard.wasteCollected',
    DASHBOARD_RRF_SALE: 'in.trois.common.model.entity.Dashboard.rrfSale',
    DASHBOARD_RRF_STOCK: 'in.trois.common.model.entity.Dashboard.rrfStock',
    DASHBOARD_MCF_SALE: 'in.trois.common.model.entity.Dashboard.mcfSale',
    DASHBOARD_MCF_STOCK: 'in.trois.common.model.entity.Dashboard.mcfStock'
};

const ACTION_MAPPING = {
    DASHBOARD: {
        ACCESS_IN_WEB_NAV: 'DASHBOARD_ACCESS_IN_WEB_NAV'
    },
    DASHBOARD_SURVEY: {
        ACCESS_IN_WEB_NAV: 'DASHBOARD_SURVEY_ACCESS_IN_WEB_NAV'
    },
    DASHBOARD_SERVICE: {
        ACCESS_IN_WEB_NAV: 'DASHBOARD_SERVICE_ACCESS_IN_WEB_NAV'
    },
    DASHBOARD_COMPLAINT: {
        ACCESS_IN_WEB_NAV: 'DASHBOARD_COMPLAINT_ACCESS_IN_WEB_NAV'
    },
    DASHBOARD_PAYMENT: {
        ACCESS_IN_WEB_NAV: 'DASHBOARD_PAYMENT_ACCESS_IN_WEB_NAV'
    },
    DASHBOARD_SERVICE_PROVIDER: {
        ACCESS_IN_WEB_NAV: 'DASHBOARD_SERVICE_PROVIDER_ACCESS_IN_WEB_NAV'
    },
    DASHBOARD_WASTE_COLLECTED: {
        ACCESS_IN_WEB_NAV: 'DASHBOARD_WASTE_COLLECTED_ACCESS_IN_WEB_NAV'
    },
    DASHBOARD_RRF_SALE: {
        ACCESS_IN_WEB_NAV: 'DASHBOARD_RRF_SALE_ACCESS_IN_WEB_NAV'
    },
    DASHBOARD_RRF_STOCK: {
        ACCESS_IN_WEB_NAV: 'DASHBOARD_RRF_STOCK_ACCESS_IN_WEB_NAV'
    },
    DASHBOARD_MCF_SALE: {
        ACCESS_IN_WEB_NAV: 'DASHBOARD_MCF_SALE_ACCESS_IN_WEB_NAV'
    },
    DASHBOARD_MCF_STOCK: {
        ACCESS_IN_WEB_NAV: 'DASHBOARD_MCF_STOCK_ACCESS_IN_WEB_NAV'
    }
};

export default { RESOURCE_MAPPING, ACTION_MAPPING };

