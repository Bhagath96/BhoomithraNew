import { PATH } from '..';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../common/Permissions';
import { menuAccessPermissions } from '../../utils/PermissionUtils';
import { AdvanceStatus, ListDoorStatus, SurveyCount } from '../../modules/reports/components';
import { ServiceCompletionNonResidential, ServiceCompletionResidential, ServiceCountEscalatedNonResidential, ServiceCountEscalatedResidential, ServicePendingNonResidential, ServicePendingResidential } from '../../modules/reports/components/service';
import { PlanDisabledNonResidential, PlanDisabledResidential, PlanEnabledNonResidential, PlanEnabledResidential } from '../../modules/reports/components/plans';
import { PaymentCollectedNonResidential, PaymentCollectedResidential, PaymentDueNonResidential, PaymentDueResidential } from '../../modules/reports/components/payment';
import { McfItemWise, NonResidentialEWaste, NonResidentialGlass, NonResidentialLeather, NonResidentialPlastic, NonResidentialPoultry, ResidentialEWaste, ResidentialGlass, ResidentialLeather, ResidentialPlastic, RrfItemWise } from '../../modules/reports/components/waste-quantity';
import { complaintCompletionNonResidential, ComplaintCompletionResidential, ComplaintCountEscalatedNonResidential, ComplaintCountEscalatedResidential, ComplaintPendingNonResidential, ComplaintPendingResidential } from '../../modules/reports/components/complaint';
import { ItemWiseSale, RevenueReport } from '../../modules/reports/components/sale';
import { ItemWiseStock } from '../../modules/reports/components/stock';
export const getReports = (userDetails) => {
    let routes = [];

    //Door Status
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_DOOR_STATUS, ACTION_MAPPING.REPORT_DOOR_STATUS.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.DOOR_STATUS, component: ListDoorStatus });
    }
    //Survey Count
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_SURVEY_COUNT, ACTION_MAPPING.REPORT_SURVEY_COUNT.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.SURVEY_COUNT, component: SurveyCount });
    }
    //Advance Status
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_ADVANCE_STATUS, ACTION_MAPPING.REPORT_ADVANCE_STATUS.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.ADVANCE_STATUS, component: AdvanceStatus });
    }
    //Service Completion Residential
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_SERVICE_COMPLETION_RESIDENTIAL, ACTION_MAPPING.REPORT_SERVICE_COMPLETION_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.SERVICE_COMPLETION_R, component: ServiceCompletionResidential });
    }
    //Service Completion Non Residential
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_SERVICE_COMPLETION_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_SERVICE_COMPLETION_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.SERVICE_COMPLETION_NR, component: ServiceCompletionNonResidential });
    }
    //Service Count Escalated Non Residential
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_SERVICE_COUNT_ESCALATED_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_SERVICE_COUNT_ESCALATED_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.SERVICE_COUNT_ESCALATED_NR, component: ServiceCountEscalatedNonResidential });
    }
    //Service Count Escalated  Residential
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_SERVICE_COUNT_ESCALATED_RESIDENTIAL, ACTION_MAPPING.REPORT_SERVICE_COUNT_ESCALATED_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.SERVICE_COUNT_ESCALATED_R, component: ServiceCountEscalatedResidential });
    }
    //Service Pending Non  Residential
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_SERVICE_PENDING_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_SERVICE_PENDING_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.SERVICE_PENDING_NR, component: ServicePendingNonResidential });
    }
    //Service Pending Residential
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_SERVICE_PENDING_RESIDENTIAL, ACTION_MAPPING.REPORT_SERVICE_PENDING_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.SERVICE_PENDING_R, component: ServicePendingResidential });
    }
    //Plan Enabled Residential
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_PLAN_ENABLED_RESIDENTIAL, ACTION_MAPPING.REPORT_PLAN_ENABLED_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.PLAN_ENABLED_RESIDENTAIL, component: PlanEnabledResidential });
    }
    //Plan Disabled Residential
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_PLAN_DISABLED_RESIDENTIAL, ACTION_MAPPING.REPORT_PLAN_DISABLED_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.PLAN_DISABLED_RESIDENTAIL, component: PlanDisabledResidential });
    }
    //Plan Enabled Non Residential
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_PLAN_ENABLED_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_PLAN_ENABLED_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.PLAN_ENABLED_NON_RESIDENTAIL, component: PlanEnabledNonResidential });
    }
    //Plan Disabled Non Residential
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_PLAN_DISABLED_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_PLAN_DISABLED_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.PLAN_DISABLED_NON_RESIDENTAIL, component: PlanDisabledNonResidential });
    }
    //Payment Collected Residential
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_PAYMENT_COLLECTED_RESIDENTIAL, ACTION_MAPPING.REPORT_PAYMENT_COLLECTED_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.PAYMENT_COLLECTED_RESIDENTAIL, component: PaymentCollectedResidential });
    }
    //Payment Due Residential
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_PAYMENT_DUE_RESIDENTIAL, ACTION_MAPPING.REPORT_PAYMENT_DUE_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.PAYMENT_DUE_RESIDENTAIL, component: PaymentDueResidential });
    }
    //Payment Collected Non Residential
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_PAYMENT_COLLECTED_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_PAYMENT_COLLECTED_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.PAYMENT_COLLECTED_NON_RESIDENTAIL, component: PaymentCollectedNonResidential });
    }
    //Payment Due Non Residential
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_PAYMENT_DUE_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_PAYMENT_DUE_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.PAYMENT_DUE_NON_RESIDENTAIL, component: PaymentDueNonResidential });
    }
    //Mcf Item Wise
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_ITEM_WISE_MCF, ACTION_MAPPING.REPORT_ITEM_WISE_MCF.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.WASTE_QUANTITY_MCF, component: McfItemWise });
    }
    //Rrf Item Wise
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_ITEM_WISE_RRF, ACTION_MAPPING.REPORT_ITEM_WISE_RRF.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.WASTE_QUANTITY_RRF, component: RrfItemWise });
    }
    //Residential E waste
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_E_WASTE_RESIDENTIAL, ACTION_MAPPING.REPORT_E_WASTE_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.WASTE_QUANTITY_RESIDENTIAL_EWASTE, component: ResidentialEWaste });
    }
    //Residential Glass
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_GLASS_RESIDENTIAL, ACTION_MAPPING.REPORT_GLASS_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.WASTE_QUANTITY_RESIDENTIAL_GLASS, component: ResidentialGlass });
    }
    //Residential Plastic
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_PLASTIC_RESIDENTIAL, ACTION_MAPPING.REPORT_PLASTIC_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.WASTE_QUANTITY_RESIDENTIAL_PLASTIC, component: ResidentialPlastic });
    }
    //Residential Leather
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_LEATHER_RESIDENTIAL, ACTION_MAPPING.REPORT_LEATHER_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.WASTE_QUANTITY_RESIDENTIAL_LEATHER, component: ResidentialLeather });
    }
    //Non Residential E waste
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_E_WASTE_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_E_WASTE_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.WASTE_QUANTITY_NON_RESIDENTIAL_EWASTE, component: NonResidentialEWaste });
    }
    //Non Residential Glass
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_GLASS_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_GLASS_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.WASTE_QUANTITY_NON_RESIDENTIAL_GLASS, component: NonResidentialGlass });
    }
    //Non Residential Plastic
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_PLASTIC_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_PLASTIC_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.WASTE_QUANTITY_NON_RESIDENTIAL_PLASTIC, component: NonResidentialPlastic });
    }
    //Non Residential Leather
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_LEATHER_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_LEATHER_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.WASTE_QUANTITY_NON_RESIDENTIAL_LEATHER, component: NonResidentialLeather });
    }
    //Non Residential Poultry
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_POULTRY_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_POULTRY_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.WASTE_QUANTITY_NON_RESIDENTIAL_POULTRY, component: NonResidentialPoultry });
    }
    //Complaint Completion Residential
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_COMPLAINT_COMPLETION_RESIDENTIAL, ACTION_MAPPING.REPORT_COMPLAINT_COMPLETION_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.COMPLAINT_COMPLETION_R, component: ComplaintCompletionResidential });
    }
    //Complaint Completion Non Residential
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_COMPLAINT_COMPLETION_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_COMPLAINT_COMPLETION_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.COMPLAINT_COMPLETION_NR, component: complaintCompletionNonResidential });
    }
    //Complaint Count Escalated Non Residential
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_COMPLAINT_COUNT_ESCALATED_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_COMPLAINT_COUNT_ESCALATED_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.COMPLAINT_COUNT_ESCALATED_NR, component: ComplaintCountEscalatedNonResidential });
    }
    //Complaint Count Escalated  Residential
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_COMPLAINT_COUNT_ESCALATED_RESIDENTIAL, ACTION_MAPPING.REPORT_COMPLAINT_COUNT_ESCALATED_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.COMPLAINT_COUNT_ESCALATED_R, component: ComplaintCountEscalatedResidential });
    }
    //Complaint Pending Non  Residential
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_COMPLAINT_PENDING_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_COMPLAINT_PENDING_NON_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.COMPLAINT_PENDING_NR, component: ComplaintPendingNonResidential });
    }
    //Complaint Pending Residential
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_COMPLAINT_PENDING_RESIDENTIAL, ACTION_MAPPING.REPORT_COMPLAINT_PENDING_RESIDENTIAL.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.COMPLAINT_PENDING_R, component: ComplaintPendingResidential });
    }
    //Item Wise Sale
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_ITEM_WISE_SALE, ACTION_MAPPING.REPORT_ITEM_WISE_SALE.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.ITEM_WISE_SALE, component: ItemWiseSale });
    }
    //Revenue Report
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_REVENUE, ACTION_MAPPING.REPORT_REVENUE.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.REVENUE_REPORT, component: RevenueReport });
    }
    //Item Wise Stock
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORT_ITEM_WISE_STOCK, ACTION_MAPPING.REPORT_ITEM_WISE_STOCK.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.ITEM_WISE_STOCK, component: ItemWiseStock });
    }
    return routes;
};
