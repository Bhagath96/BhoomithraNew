import { PATH } from '..';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../common/Permissions';
import { menuAccessPermissions } from '../../utils/PermissionUtils';
import BasicConfigState from '../../modules-master/basic-config-state/components/ListState';
import BasicConfigStateCreation from '../../modules-master/basic-config-state/components/CreateState';
import BasicConfigDistrict from '../../modules-master/basic-config-district/components/ListDistrict';
import BasicConfigDistrictCreation from '../../modules-master/basic-config-district/components/CreateDistrict';
import BasicConfigLSGI from '../../modules-master/basic-config-lsgi/components/ListLSGI';
import BasicConfigLSGICreation from '../../modules-master/basic-config-lsgi/components/CreateLSGI';
import BasicConfigBlockPanchayath from '../../modules-master/basic-config-block-panchayath/components/ListBlockPanchayath';
import BasicConfigBlockPanchayathCreation from '../../modules-master/basic-config-block-panchayath/components/CreateBlockPanchayath';
import BasicConfigDistrictPanchayath from '../../modules-master/basic-config-district-panchayath/components/ListDistrictPanchayath';
import BasicConfigDistrictPanchayathCreation from '../../modules-master/basic-config-district-panchayath/components/CreateDistrictPanchayath';

import ListWards from '../../modules-master/basic-config-ward/components/ListWards';
import { CommonWardView } from '../../modules-master/basic-config-ward/components';
import CommonRAView from '../../modules-master/basic-config-ward/components/CommonRAView';
import BasicDetailsWard from '../../modules-master/basic-config-ward/components/BasicDetailsWard';

import BuildingTypeList from '../../modules-master/building-type/components/BuildingTypeList';
import CreateBuildingType from '../../modules-master/building-type/components/CreateBuildingType';
import TradingTypeList from '../../modules-master/trading-type/components/TradingTypeList';
import CreateTradingType from '../../modules-master/trading-type/components/CreateTradingType';
import ShopTypeList from '../../modules-master/shop-type/components/ShopTypeList';
import CreateShopType from '../../modules-master/shop-type/components/CreateShopType';
import ResidenceCategoryList from '../../modules-master/residence-category/components/ResidenceCategoryList';
import { CreateResidenceCategory } from '../../modules-master/residence-category/components';
import AssociationTypeList from '../../modules-master/association-type/components/AssociationTypeList';
import CreateAssociationType from '../../modules-master/association-type/components/CreateAssociationType';
import ServiceChargeSlabList from '../../modules-master/service-charge-slab/components/ServiceChargeSlabList';
import { CreateServiceChargeSlab } from '../../modules-master/service-charge-slab/components';
import { PublicGatheringMethodList } from '../../modules-master/public-gathering-method/components';
import CreatePublicGatheringMethod from '../../modules-master/public-gathering-method/components/CreatePublicGatheringMethod';
import { TerraceFarmingList } from '../../modules-master/terrace-farming/components';
import CreateTerraceFarming from '../../modules-master/terrace-farming/components/CreateTerraceFarming';
import { OrganizationTypeList } from '../../modules-master/organization-types/components';
import CreateOrganizationType from '../../modules-master/organization-types/components/CreateOrganizationType';
import CreateServiceConfig from '../../modules-master/service-config/components/CreateServiceConfig';
import { ServiceConfigList } from '../../modules-master/service-config/components';
import { BundledServiceConfigList } from '../../modules-master/bundled-service-config/components';
import CreateBundledServiceConfig from '../../modules-master/bundled-service-config/components/CreateBundledServiceConfig';
import CommonBundledServiceEdit from '../../modules-master/bundled-service-config/components/CommonBundledServiceConfigEdit';
import BasicConfigMCF from '../../modules-master/basic-mcf/components/ListMCF';
import BasicConfigMCFCreation from '../../modules-master/basic-mcf/components/CreateMCF';
import AdministrationTypeList from '../../modules-master/administration-type/components/AdministrationType';
import CreateAdministrationType from '../../modules-master/administration-type/components/CreateAdministrationType';
import BasicConfigItem from '../../modules-master/basic-config-item/components/ListItem';
import BasicConfigCreateItem from '../../modules-master/basic-config-item/components/CreateItem';
import BasicConfigIncident from '../../modules-master/incident_config/components/IncidentList';
import BasicConfigIncidentAdd from '../../modules-master/incident_config/components/CreateIncident';
import ComplaintConfigList from '../../modules-master/complaint-config/components/ComplaintConfigList';
import CommonComplaintConfigEdit from '../../modules-master/complaint-config/components/CommonComplaintConfigEdit';
import CreateComplaintConfig from '../../modules-master/complaint-config/components/CreateComplaintConfig';
import BasicConfigItemSubcategory from '../../modules-master/basic-config-item-subcategory/components/ListItemSubcategory';
import BasicConfigCreateItemSubcategory from '../../modules-master/basic-config-item-subcategory/components/CreateItemSubcategory';
import AssignSubCategory from '../../modules-master/basic-config-item/components/AssignSubCategory';

export const getBasicConfigRoutes = (userDetails) => {
    let routes = [];
    //if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.MCF, ACTION_MAPPING.MCF.ACCESS_MCF_IN_NAV)) {
    routes.push(
        { path: PATH.BASIC_CONFIG_MCF, component: BasicConfigMCF },
        {
            path: `${PATH.BASIC_CONFIG_MCF}/create`, component: BasicConfigMCFCreation
        },
        { path: `${PATH.BASIC_CONFIG_MCF}/:id`, component: BasicConfigMCFCreation }
    );
    //}
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.COMPLAINT_CONFIG, ACTION_MAPPING.COMPLAINT_CONFIG.ACCESS_COMPLAINT_IN_WEB_NAV)) {
        routes.push(
            { path: PATH.COMPLAINT_CONFIG, component: ComplaintConfigList },
            { path: `${PATH.COMPLAINT_CONFIG}/create`, component: CreateComplaintConfig },
            { path: `${PATH.COMPLAINT_CONFIG}/:id`, component: CommonComplaintConfigEdit }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.INCIDENT_CONFIG, ACTION_MAPPING.INCIDENTS.ACCESS_INCIDENT_CONFIG_IN_WEB_NAV)) {
        routes.push(
            { path: PATH.INCIDENT_CONFIG, component: BasicConfigIncident },
            { path: `${PATH.INCIDENT_CONFIG}/create`, component: BasicConfigIncidentAdd },
            { path: `${PATH.INCIDENT_CONFIG}/:id`, component: BasicConfigIncidentAdd }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.STATE, ACTION_MAPPING.STATE.ACCESS_STATE_IN_NAV)) {
        routes.push(
            { path: PATH.BASIC_CONFIG_STATE, component: BasicConfigState },
            { path: `${PATH.BASIC_CONFIG_STATE}/create`, component: BasicConfigStateCreation },
            { path: `${PATH.BASIC_CONFIG_STATE}/:id`, component: BasicConfigStateCreation }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ITEM, ACTION_MAPPING.ITEM.ACCESS_ITEM_CONFIG_IN_WEB_NAV)) {
        routes.push(
            { path: PATH.BASIC_CONFIG_ITEM, component: BasicConfigItem },
            { path: `${PATH.BASIC_CONFIG_ITEM}/create`, component: BasicConfigCreateItem },
            { path: `${PATH.BASIC_CONFIG_ITEM}/:id`, component: BasicConfigCreateItem },
            { path: `${PATH.BASIC_CONFIG_ITEM}/:id/sub-category`, component: AssignSubCategory }
        );
    }
    //Item sub category listing
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ITEM_SUB_CATEGORY, ACTION_MAPPING.ITEM_SUB_CATEGORY.LIST)) {
        routes.push({ path: PATH.BASIC_CONFIG_ITEM_SUBCATEGORY, component: BasicConfigItemSubcategory });
    }
    //Item sub category create
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ITEM_SUB_CATEGORY, ACTION_MAPPING.ITEM_SUB_CATEGORY.ADD)) {

        routes.push({ path: `${PATH.BASIC_CONFIG_ITEM_SUBCATEGORY}/create`, component: BasicConfigCreateItemSubcategory });
    }
    //Item sub category edit
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ITEM_SUB_CATEGORY, ACTION_MAPPING.ITEM_SUB_CATEGORY.EDIT_IN_ACTION)) {

        routes.push({ path: `${PATH.BASIC_CONFIG_ITEM_SUBCATEGORY}/:id`, component: BasicConfigCreateItemSubcategory });
    }

    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.WARD, ACTION_MAPPING.WARD.ACCESS_WARD_IN_NAV)) {
        routes.push(
            { path: PATH.BASIC_CONFIG_WARD, component: ListWards },
            { path: `${PATH.BASIC_CONFIG_WARD}/create`, component: BasicDetailsWard },
            { path: `${PATH.BASIC_CONFIG_WARD}/:id/details`, component: CommonWardView },
            { path: `${PATH.BASIC_CONFIG_WARD}/:id/residentialAssociation`, component: CommonWardView },
            { path: `${PATH.BASIC_CONFIG_WARD}/:wardId/residentialAssociation/create`, component: CommonRAView },
            { path: `${PATH.BASIC_CONFIG_WARD}/:wardId/residentialAssociation/:id/details`, component: CommonRAView },
            { path: `${PATH.BASIC_CONFIG_WARD}/:wardId/residentialAssociation/:id/contact`, component: CommonRAView }

        );
    }

    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DISTRICT, ACTION_MAPPING.DISTRICT.ACCESS_DISTRICT_IN_NAV)) {
        routes.push(
            { path: PATH.BASIC_CONFIG_DISTRICT, component: BasicConfigDistrict },
            { path: `${PATH.BASIC_CONFIG_DISTRICT}/create`, component: BasicConfigDistrictCreation },
            { path: `${PATH.BASIC_CONFIG_DISTRICT}/:id`, component: BasicConfigDistrictCreation }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.LSGI, ACTION_MAPPING.LSGI.ACCESS_LSGI_IN_NAV)) {
        routes.push(
            { path: PATH.BASIC_CONFIG_LSGI, component: BasicConfigLSGI },
            { path: `${PATH.BASIC_CONFIG_LSGI}/create`, component: BasicConfigLSGICreation },
            { path: `${PATH.BASIC_CONFIG_LSGI}/:id`, component: BasicConfigLSGICreation }
        );
    }

    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.RESIDENCE_CATEGORY, ACTION_MAPPING.RESIDENCE_CATEGORY.ACCESS_RESIDENCE_CATEGORY_IN_NAV)) {
        routes.push(
            { path: PATH.BASIC_CONFIG_RESIDENCE_CATEGORY, component: ResidenceCategoryList },
            { path: `${PATH.BASIC_CONFIG_RESIDENCE_CATEGORY}/create`, component: CreateResidenceCategory },
            { path: `${PATH.BASIC_CONFIG_RESIDENCE_CATEGORY}/:id`, component: CreateResidenceCategory }
        );
    }

    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TRADING_TYPE, ACTION_MAPPING.TRADING_TYPE.ACCESS_TRADING_TYPE_IN_NAV)) {
        routes.push(
            { path: PATH.TRADING_TYPE, component: TradingTypeList },
            { path: `${PATH.TRADING_TYPE}/create`, component: CreateTradingType },
            { path: `${PATH.TRADING_TYPE}/:id`, component: CreateTradingType }
        );
    }

    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.BUILDING_TYPE, ACTION_MAPPING.BUILDING_TYPE.ACCESS_BUILDING_TYPE_IN_NAV)) {
        routes.push(
            { path: PATH.BUILDING_TYPE, component: BuildingTypeList },
            { path: `${PATH.BUILDING_TYPE}/create`, component: CreateBuildingType },
            { path: `${PATH.BUILDING_TYPE}/:id`, component: CreateBuildingType }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.DISTRICT_PANCHAYATH, ACTION_MAPPING.DISTRICT_PANCHAYATH.ACCESS_DISTRICT_PANCHAYATH_IN_NAV)) {
        routes.push(
            { path: PATH.BASIC_CONFIG_DISTRICT_PANCHAYATH, component: BasicConfigDistrictPanchayath },
            { path: `${PATH.BASIC_CONFIG_DISTRICT_PANCHAYATH}/create`, component: BasicConfigDistrictPanchayathCreation },
            { path: `${PATH.BASIC_CONFIG_DISTRICT_PANCHAYATH}/:id`, component: BasicConfigDistrictPanchayathCreation }
        );
    }

    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SHOP_TYPE, ACTION_MAPPING.SHOP_TYPE.ACCESS_SHOP_TYPE_IN_NAV)) {
        routes.push(
            { path: PATH.SHOP_TYPE, component: ShopTypeList },
            { path: `${PATH.SHOP_TYPE}/create`, component: CreateShopType },
            { path: `${PATH.SHOP_TYPE}/:id`, component: CreateShopType }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ASSOCIATION_TYPE, ACTION_MAPPING.ASSOCIATION_TYPE.ACCESS_ASSOCIATION_TYPE_IN_NAV)) {
        routes.push(
            { path: PATH.ASSOCIATION_TYPE, component: AssociationTypeList },
            { path: `${PATH.ASSOCIATION_TYPE}/create`, component: CreateAssociationType },
            { path: `${PATH.ASSOCIATION_TYPE}/:id`, component: CreateAssociationType }
        );
    }

    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SERVICE_CHARGE_SLAB, ACTION_MAPPING.SERVICE_CHARGE_SLAB.ACCESS_SERVICE_CHARGE_SLAB_IN_NAV)) {
        routes.push(
            { path: PATH.SERVICE_CHARGE_SLAB, component: ServiceChargeSlabList },
            { path: `${PATH.SERVICE_CHARGE_SLAB}/create`, component: CreateServiceChargeSlab },
            { path: `${PATH.SERVICE_CHARGE_SLAB}/:id`, component: CreateServiceChargeSlab }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.PUBLIC_GATHERING_METHOD, ACTION_MAPPING.PUBLIC_GATHERING_METHOD.ACCESS_PUBLIC_GATHERING_METHOD_IN_NAV)) {
        routes.push(
            { path: PATH.PUBLIC_GATHERING_METHOD, component: PublicGatheringMethodList },
            { path: `${PATH.PUBLIC_GATHERING_METHOD}/create`, component: CreatePublicGatheringMethod },
            { path: `${PATH.PUBLIC_GATHERING_METHOD}/:id`, component: CreatePublicGatheringMethod }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ORGANIZATION_TYPE, ACTION_MAPPING.ORGANIZATION_TYPE.ACCESS_ORGANIZATION_TYPE_IN_NAV)) {
        routes.push(
            { path: PATH.ORGANIZATION_TYPE, component: OrganizationTypeList },
            { path: `${PATH.ORGANIZATION_TYPE}/create`, component: CreateOrganizationType },
            { path: `${PATH.ORGANIZATION_TYPE}/:id`, component: CreateOrganizationType }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.TERRACE_FARMING, ACTION_MAPPING.TERRACE_FARMING.ACCESS_TERRACE_FARMING_HELP_TYPE_IN_NAV)) {
        routes.push(
            { path: PATH.TERRACE_FARMING, component: TerraceFarmingList },
            { path: `${PATH.TERRACE_FARMING}/create`, component: CreateTerraceFarming },
            { path: `${PATH.TERRACE_FARMING}/:id`, component: CreateTerraceFarming }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.ADMINISTRATION_TYPE, ACTION_MAPPING.ADMINISTRATION_TYPE.ACCESS_ADMINISTRATION_TYPE_IN_NAV)) {
        routes.push(
            { path: PATH.ADMINISTRATION_TYPE, component: AdministrationTypeList },
            { path: `${PATH.ADMINISTRATION_TYPE}/create`, component: CreateAdministrationType },
            { path: `${PATH.ADMINISTRATION_TYPE}/:id`, component: CreateAdministrationType }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.SERVICE_CONFIG, ACTION_MAPPING.SERVICE_CONFIG.ACCESS_SERVICE_CONFIG_IN_NAV)) {
        routes.push(
            { path: PATH.SERVICE_CONFIG, component: ServiceConfigList },
            { path: `${PATH.SERVICE_CONFIG}/create`, component: CreateServiceConfig },
            { path: `${PATH.SERVICE_CONFIG}/:id`, component: CreateServiceConfig }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.BLOCK_PANCHAYATH, ACTION_MAPPING.BLOCK_PANCHAYATH.ACCESS_BLOCK_PANCHAYATH_IN_NAV)) {
        routes.push(
            { path: PATH.BASIC_CONFIG_BLOCK_PANCHAYATH, component: BasicConfigBlockPanchayath },
            { path: `${PATH.BASIC_CONFIG_BLOCK_PANCHAYATH}/create`, component: BasicConfigBlockPanchayathCreation },
            { path: `${PATH.BASIC_CONFIG_BLOCK_PANCHAYATH}/:id`, component: BasicConfigBlockPanchayathCreation }
        );
    }
    if (menuAccessPermissions(userDetails, RESOURCE_MAPPING.BUNDLED_SERVICE_CONFIG, ACTION_MAPPING.BUNDLED_SERVICE_CONFIG.ACCESS_BUNDLED_SERVICE_CONFIG_IN_NAV)) {
        routes.push(
            { path: PATH.BUNDLED_SERVICE_CONFIG, component: BundledServiceConfigList },
            { path: `${PATH.BUNDLED_SERVICE_CONFIG}/create`, component: CreateBundledServiceConfig },
            { path: `${PATH.BUNDLED_SERVICE_CONFIG}/:id`, component: CommonBundledServiceEdit }
        );
    }
    return routes;
};
