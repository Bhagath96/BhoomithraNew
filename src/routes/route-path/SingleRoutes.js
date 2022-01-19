import { PATH } from '..';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../common/Permissions';
import { menuAccessPermissions } from '../../utils/PermissionUtils';
import { ListReportedBugs } from '../../modules/reported-bugs/components';
import ListService from '../../modules/service/components/ListServices';
import ListSubscription from '../../modules/subscription/components/ListSubscription';
import ListPayment from '../../modules/payment/components/ListPayment';
import { ListComplaint } from '../../modules/complaint/components';
import { ListIncidents } from '../../modules/incidents/components';
import { SpecialServiceRequest } from '../../modules/schedule/components';
import { SubscriptionRequest } from '../../modules/customers/components';
import generateQRCode from '../../modules/generate-qr-code/components/GenerateQRCode';

export const getSingleRoutes = (userDetails) => {
    let routes = [];
    //Reported Bugs
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.REPORTED_BUGS, ACTION_MAPPING.REPORTED_BUGS.ACCESS_IN_WEB_NAV)) {
        routes.push({ path: PATH.REPORTED_BUGS, component: ListReportedBugs });
    }
    //services
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SERVICE, ACTION_MAPPING.SERVICE.ACCESS_SERVICE_IN_WEB_NAV)) {
        routes.push({ path: PATH.SERVICE, component: ListService });
    }
    //subscription
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SUBSCRIPTION, ACTION_MAPPING.SUBSCRIPTION.ACCESS_SUBSCRIPTION_IN_WEB_NAV)) {
        routes.push({ path: PATH.SUBSCRIPTION, component: ListSubscription });
    }
    //payments
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.PAYMENT, ACTION_MAPPING.PAYMENT.ACCESS_PAYMENT_IN_NAV)) {
        routes.push({ path: PATH.PAYMENT, component: ListPayment });
    }
    //complaints
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.COMPLAINT, ACTION_MAPPING.COMPLAINT.LIST_COMPLAINT)) {
        routes.push({ path: PATH.COMPLAINT, component: ListComplaint });
    }
    //incidents
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.INCIDENTS, ACTION_MAPPING.INCIDENTS.ACCESS_INCIDENT_IN_WEB_NAV)) {
        routes.push({ path: PATH.INCIDENTS, component: ListIncidents });
    }
    //special service request
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SPECIAL_SERVICE, ACTION_MAPPING.SPECIAL_SERVICE.ACCESS_SPECIAL_SERVICE_IN_NAV)) {
        routes.push({ path: PATH.SPECIAL_SERVICE_REQUEST, component: SpecialServiceRequest });
    }
    //subscription request
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SUBSCRIPTION_REQUEST, ACTION_MAPPING.SUBSCRIPTION_REQUEST.ACCESS_SUBSCRIPTION_REQUEST_IN_WEB_NAV)) {
        routes.push({ path: PATH.SUBSCRIPTION_REQUEST, component: SubscriptionRequest });
    }
    //Generate QR code
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.QRCODE, ACTION_MAPPING.QRCODE.ACCESS_QRCODE_IN_NAV)) {
        routes.push({ path: PATH.GENERATE_QR_CODE, component: generateQRCode });
    }
    return routes;
};
