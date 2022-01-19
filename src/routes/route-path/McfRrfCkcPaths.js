import { PATH } from '..';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../common/Permissions';
import { ListStockIn, ListStockSale, ListStockTransfer, ViewStockIn, ViewStockSale, ViewStockTransfer } from '../../modules/mcf/components';
import { menuAccessPermissions } from '../../utils/PermissionUtils';
import RRFSale from '../../modules/RRF/component/ListSales';
import ListRrfShredded from '../../modules/RRF/component/ListRrfShredded';

import RRFListStockIn from '../../modules/RRF/component/ListStockIn';
import CKCSale from '../../modules/CKC/component/ListSales';
import CKCPickup from '../../modules/CKC/component/ListPickup';

import { ViewRrfSales, ViewRrfStockIn } from '../../modules/RRF/component';
import ViewCkcPickup from '../../modules/CKC/component/ViewCkcPickup';
import ViewCkcSales from '../../modules/CKC/component/ViewCkcSales';
import ListMcfSeggregation from '../../modules/mcf/components/ListMcfSeggregation';

export const getMcgRrfCkcRoutes = (userDetails) => {
    let routes = [];
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.MCF_SEGGREGATION, ACTION_MAPPING.MCF_SEGREGATION.ACCESS_IN_WEB_NAV)) {
        routes.push(
            { path: `${PATH.MCF_SEGGREGATION}`, component: ListMcfSeggregation }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.MCF_STOCK_IN, ACTION_MAPPING.MCF.ACCESS_MCF_STOCK_IN_IN_WEB_NAV)) {
        routes.push(
            { path: `${PATH.MCF_STOCK_IN}`, component: ListStockIn },
            { path: `${PATH.MCF_STOCK_IN}/:id/view`, component: ViewStockIn }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.MCF_STOCK_TRANSFER, ACTION_MAPPING.MCF.ACCESS_MCF_STOCK_TRANSFER_IN_WEB_NAV)) {
        routes.push(
            { path: `${PATH.MCF_STOCK_TRANSFER}`, component: ListStockTransfer },
            { path: `${PATH.MCF_STOCK_TRANSFER}/:id/view`, component: ViewStockTransfer }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.MCF_STOCK_SALE, ACTION_MAPPING.MCF.ACCESS_MCF_SALE_IN_WEB_NAV)) {
        routes.push(
            { path: `${PATH.MCF_STOCK_SALE}`, component: ListStockSale },
            { path: `${PATH.MCF_STOCK_SALE}/:id/view`, component: ViewStockSale }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.RRF_SALES, ACTION_MAPPING.RRF_SALES.ACCESS_RRF_SALES_IN_NAV)) {
        routes.push(
            { path: PATH.RRF_SALES, component: RRFSale },
            { path: `${PATH.RRF_SALES}/:id/view`, component: ViewRrfSales }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.RRF_STOCK_IN, ACTION_MAPPING.RRF_STOCK_IN.ACCESS_RRF_STOCK_IN_NAV)) {
        routes.push(
            { path: PATH.RRF_STOCK_IN, component: RRFListStockIn },
            { path: `${PATH.RRF_STOCK_IN}/:id/view`, component: ViewRrfStockIn }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.CKC_SALES, ACTION_MAPPING.CKC_SALES.ACCESS_CKC_SALE_IN_NAV)) {
        routes.push(
            { path: PATH.CKC_SALES, component: CKCSale },
            { path: `${PATH.CKC_SALES}/:id/view`, component: ViewCkcSales }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.CKC_PICKUP, ACTION_MAPPING.CKC_PICKUP.ACCESS_CKC_PICKUP_IN_NAV)) {
        routes.push(
            { path: PATH.CKC_PICKUP, component: CKCPickup },
            { path: `${PATH.CKC_PICKUP}/:id/view`, component: ViewCkcPickup }
        );
    }

    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.RRF_SHREDDED, ACTION_MAPPING.RRF_PLASTIC_SHREDDED.ACCESS_IN_WEB_NAV)) {
        routes.push(
            { path: PATH.RRF_SHREDDED, component: ListRrfShredded }
        );
    }

    return routes;
};
