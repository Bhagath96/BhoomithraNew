import { PATH } from '..';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../common/Permissions';
import { menuAccessPermissions } from '../../utils/PermissionUtils';
import { DashboardComplaints, DashboardPayment, DashboardSaleMCF, DashboardSaleRRF, DashboardServiceProvider, DashboardServices, DashboardStockMCF, DashboardStockRRF, DashboardSurvey, DashboardWaste } from '../../modules/dashboard/components';

export const getDashboard = (userDetails) => {
    let dashBoardRoutes = [];
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD_SURVEY, ACTION_MAPPING.DASHBOARD_SURVEY.ACCESS_IN_WEB_NAV)) {
        dashBoardRoutes.push({ path: PATH.DASHBOARD_SURVEY, component: DashboardSurvey });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD_SERVICE, ACTION_MAPPING.DASHBOARD_SERVICE.ACCESS_IN_WEB_NAV)) {
        dashBoardRoutes.push({ path: PATH.DASHBOARD_SERVICES, component: DashboardServices });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD_COMPLAINT, ACTION_MAPPING.DASHBOARD_COMPLAINT.ACCESS_IN_WEB_NAV)) {
        dashBoardRoutes.push({ path: PATH.DASHBOARD_COMPLAINTS, component: DashboardComplaints });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD_PAYMENT, ACTION_MAPPING.DASHBOARD_PAYMENT.ACCESS_IN_WEB_NAV)) {
        dashBoardRoutes.push({ path: PATH.DASHBOARD_PAYMENT, component: DashboardPayment });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD_SERVICE_PROVIDER, ACTION_MAPPING.DASHBOARD_SERVICE_PROVIDER.ACCESS_IN_WEB_NAV)) {
        dashBoardRoutes.push({ path: PATH.DASHBOARD_SERVICE_PROVIDER, component: DashboardServiceProvider });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD_WASTE_COLLECTED, ACTION_MAPPING.DASHBOARD_WASTE_COLLECTED.ACCESS_IN_WEB_NAV)) {
        dashBoardRoutes.push({ path: PATH.DASHBOARD_WASTE, component: DashboardWaste });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD_RRF_STOCK, ACTION_MAPPING.DASHBOARD_RRF_STOCK.ACCESS_IN_WEB_NAV)) {
        dashBoardRoutes.push({ path: PATH.DASHBOARD_STOCK_RRF, component: DashboardStockRRF });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD_RRF_SALE, ACTION_MAPPING.DASHBOARD_RRF_SALE.ACCESS_IN_WEB_NAV)) {
        dashBoardRoutes.push({ path: PATH.DASHBOARD_SALE_RRF, component: DashboardSaleRRF });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD_MCF_STOCK, ACTION_MAPPING.DASHBOARD_MCF_STOCK.ACCESS_IN_WEB_NAV)) {
        dashBoardRoutes.push({ path: PATH.DASHBOARD_STOCK_MCF, component: DashboardStockMCF });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DASHBOARD_MCF_SALE, ACTION_MAPPING.DASHBOARD_MCF_SALE.ACCESS_IN_WEB_NAV)) {
        dashBoardRoutes.push({ path: PATH.DASHBOARD_SALE_MCF, component: DashboardSaleMCF });
    }

    return dashBoardRoutes;
};
