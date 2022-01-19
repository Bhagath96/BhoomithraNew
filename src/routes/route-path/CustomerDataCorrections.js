import { PATH } from '..';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../common/Permissions';
import { menuAccessPermissions } from '../../utils/PermissionUtils';
import customerDetails from '../../modules/customer-data-correction/components/ListCustomerDetails';
import ViewCustomerDataCorrection from '../../modules/customer-data-correction/components/ViewCustomerDataCurrection';

export const getCustomerDataCorrections = (userDetails) => {
    let routes = [];
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.CUSTOMER, ACTION_MAPPING.CUSTOMER.LIST_CUSTOMER_DATA_CORRECTION)) {
        routes.push({ path: PATH.CUSTOMER_DATA_CORRECTION, component: customerDetails });
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.CUSTOMER, ACTION_MAPPING.CUSTOMER.VIEW_CUSTOMER_DATA_CORRECTION)) {
        routes.push({ path: `${PATH.VIEW_CUSTOMER_DATA_CORRECTION}/:customerEnrollmentId/:customerConlictId/:customerTemplateTypeId/:conflictCustomerTemplateTypeId`, component: ViewCustomerDataCorrection });
    }
    return routes;
};
