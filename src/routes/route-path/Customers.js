import { PATH } from '..';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../common/Permissions';
import { menuAccessPermissions } from '../../utils/PermissionUtils';
import { ListCustomerDetails, ViewCustomerDetails } from '../../modules/customers/components';
import { DynamicForm } from '../../modules/dfg/containers/index';

export const getCustomer = (userDetails) => {
    let routes = [];
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.CUSTOMER, ACTION_MAPPING.CUSTOMER.ACCESS_CUSTOMER_IN_NAV)) {
        routes.push({ path: PATH.CUSTOMER_DATA, component: ListCustomerDetails });
        routes.push({ path: `${PATH.CUSTOMER_DATA}/:id/view`, component: ViewCustomerDetails });
        routes.push({ path: `${PATH.CUSTOMER_DATA}/edit`, component: DynamicForm });
        routes.push({ path: `${PATH.CUSTOMER_DATA}/service_enrollment`, component: DynamicForm });
        routes.push({ path: `${PATH.CUSTOMER_DATA}/qr-enrollment`, component: DynamicForm });
    }
    return routes;
};
