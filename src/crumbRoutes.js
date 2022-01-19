import { PATH } from './routes';

export const getBreadCrumbRoutes = () => ({
    [PATH.DASHBOARD]: {
        label: 'dashboard'
    },
    [PATH.DASHBOARD_SURVEY]: {
        label: 'dashboard_survey'
    },
    [PATH.DASHBOARD_SERVICES]: {
        label: 'dashboard_service'
    },
    [PATH.DASHBOARD_COMPLAINTS]: {
        label: 'dashboard_complaint'
    },
    [PATH.DASHBOARD_PAYMENT]: {
        label: 'dashboard_payment'
    },
    [PATH.DASHBOARD_SERVICE_PROVIDER]: {
        label: 'dashboard_service_provider'
    },
    [PATH.DASHBOARD_WASTE]: {
        label: 'dashboard_waste_collected'
    },
    [PATH.DASHBOARD_STOCK_MCF]: {
        label: 'dashboard_mcf_stock'
    },
    [PATH.DASHBOARD_SALE_MCF]: {
        label: 'dashboard_mcf_sale'
    },
    [PATH.DASHBOARD_STOCK_RRF]: {
        label: 'dashboard_rrf_stock'
    },
    [PATH.DASHBOARD_SALE_RRF]: {
        label: 'dashboard_rrf_sale'
    },
    //REPORTS - START
    [PATH.DOOR_STATUS]: {
        label: 'door_status'
    },
    [PATH.SURVEY_COUNT]: {
        label: 'survey_count'
    },
    [PATH.ADVANCE_STATUS]: {
        label: 'advance_status'
    },
    [PATH.SERVICE_COMPLETION_R]: {
        label: 'service_completion_residential'
    },
    [PATH.SERVICE_COMPLETION_NR]: {
        label: 'service_completion_non_residential'
    },
    [PATH.SERVICE_PENDING_R]: {
        label: 'service_pending_residential'
    },
    [PATH.SERVICE_PENDING_NR]: {
        label: 'service_pending_non_residential'
    },
    [PATH.SERVICE_COUNT_ESCALATED_R]: {
        label: 'service_count_escalated_residential'
    },
    [PATH.SERVICE_COUNT_ESCALATED_NR]: {
        label: 'service_count_escalated_non_residential'
    },
    [PATH.PLAN_ENABLED_RESIDENTAIL]: {
        label: 'plan_enabled_residential'
    },
    [PATH.PLAN_DISABLED_RESIDENTAIL]: {
        label: 'plan_disabled_residential'
    },
    [PATH.PLAN_ENABLED_NON_RESIDENTAIL]: {
        label: 'plan_enabled_non_residential'
    },
    [PATH.PLAN_DISABLED_NON_RESIDENTAIL]: {
        label: 'plan_disabled_non_residential'
    },
    [PATH.PAYMENT_COLLECTED_RESIDENTAIL]: {
        label: 'payment_collected_residential'
    },
    [PATH.PAYMENT_DUE_RESIDENTAIL]: {
        label: 'payment_due_residential'
    },
    [PATH.PAYMENT_COLLECTED_NON_RESIDENTAIL]: {
        label: 'payment_collected_non_residential'
    },
    [PATH.PAYMENT_DUE_NON_RESIDENTAIL]: {
        label: 'payment_due_non_residential'
    },
    [PATH.WASTE_QUANTITY_MCF]: {
        label: 'mcf_item_wise'
    },
    [PATH.WASTE_QUANTITY_RRF]: {
        label: 'rrf_item_wise'
    },
    [PATH.WASTE_QUANTITY_RESIDENTIAL_PLASTIC]: {
        label: 'residential_plastic'
    },
    [PATH.WASTE_QUANTITY_RESIDENTIAL_GLASS]: {
        label: 'residential_glass'
    },
    [PATH.WASTE_QUANTITY_RESIDENTIAL_LEATHER]: {
        label: 'residential_leather'
    },
    [PATH.WASTE_QUANTITY_RESIDENTIAL_EWASTE]: {
        label: 'residential_e_waste'
    },
    [PATH.WASTE_QUANTITY_NON_RESIDENTIAL_PLASTIC]: {
        label: 'non_residential_plastic'
    },
    [PATH.WASTE_QUANTITY_NON_RESIDENTIAL_GLASS]: {
        label: 'non_residential_glass'
    },
    [PATH.WASTE_QUANTITY_NON_RESIDENTIAL_LEATHER]: {
        label: 'non_residential_leather'
    },
    [PATH.WASTE_QUANTITY_NON_RESIDENTIAL_EWASTE]: {
        label: 'non_residential_e_waste'
    },
    [PATH.WASTE_QUANTITY_NON_RESIDENTIAL_POULTRY]: {
        label: 'non_residential_poultry'
    },

    [PATH.COMPLAINT_COMPLETION_R]: {
        label: 'complaint_completion_residential'
    },
    [PATH.COMPLAINT_COMPLETION_NR]: {
        label: 'complaint_completion_non_residential'
    },
    [PATH.COMPLAINT_COUNT_ESCALATED_R]: {
        label: 'complaint_count_residential'
    },
    [PATH.COMPLAINT_COUNT_ESCALATED_NR]: {
        label: 'complaint_count_non_residential'
    },
    [PATH.COMPLAINT_PENDING_R]: {
        label: 'complaint_pending_residential'
    },
    [PATH.COMPLAINT_PENDING_NR]: {
        label: 'complaint_pending_non_residential'
    },
    [PATH.ITEM_WISE_SALE]: {
        label: 'item_wise_sale'
    },
    [PATH.REVENUE_REPORT]: {
        label: 'revenue_report'
    },
    [PATH.ITEM_WISE_STOCK]: {
        label: 'item_wise_stock'
    },
    //REPORTS - END
    [PATH.ORGANIZATION]: {
        label: 'organization'
    },
    [`${PATH.ORGANIZATION}/create`]: {
        label: 'create'
    },
    [`${PATH.ORGANIZATION}/:id/basic`]: {
        label: 'basic'
    },
    [`${PATH.ORGANIZATION}/:id/assignRole`]: {
        label: 'assign_roles'
    },
    [`${PATH.ORGANIZATION}/:id/assignUser`]: {
        label: 'assign_user'
    },
    // [`${PATH.ORGANIZATION}/:id/assignVendors`]: {
    //     label: 'assign_item'
    // },
    [`${PATH.ORGANIZATION}/:id/assignVendorItem`]: {
        label: 'assign_item'
    },
    [`${PATH.ORGANIZATION}/:id/assignVendorItem/create`]: {
        label: 'create'
    },
    [`${PATH.ORGANIZATION}/:id/assignVendorItem/:vendorId`]: {
        label: 'edit'
    },
    [`${PATH.ORGANIZATION}/:id/assignModule`]: {
        label: 'assign_module'
    },
    [`${PATH.ORGANIZATION}/:id/apiProvider`]: {
        label: 'api_provider'
    },
    [`${PATH.ORGANIZATION}/:id/assignTemplate`]: {
        label: 'assign_template'
    },
    [`${PATH.ORGANIZATION}/:id/additionalBasicDetails`]: {
        label: 'additional_basic_details'
    },
    [`${PATH.ORGANIZATION}/:id/assignOrganization`]: {
        label: 'associate_organization'
    },
    [`${PATH.ORGANIZATION}/:id/serviceProvider`]: {
        label: 'service_provider'
    },
    [`${PATH.ORGANIZATION}/:id/serviceProvider/create`]: {
        label: 'create'
    },
    [`${PATH.ORGANIZATION}/:id/serviceProvider/:providerId/details`]: {
        label: 'details'
    },
    [`${PATH.ORGANIZATION}/:id/serviceProvider/:providerId/assigedLocation`]: {
        label: 'assigned_location'
    },
    [`${PATH.ORGANIZATION}/:id/serviceProvider/:providerId/assignWorker`]: {
        label: 'assign_worker'
    },
    [`${PATH.ORGANIZATION}/:id/serviceProvider/:providerId/assignedWorkerLocation`]: {
        label: 'assign_worker_location'
    },
    [`${PATH.ORGANIZATION}/:id/serviceProvider/:providerId/assignedWorkerToSuperVisor`]: {
        label: 'assign_worker_to_super_visor'
    },
    [`${PATH.ORGANIZATION}/:id/serviceProvider/:providerId/contactDetail`]: {
        label: 'contact_details'
    },
    [`${PATH.ORGANIZATION}/:id/serviceProvider/:providerId/service`]: {
        label: 'services'
    },
    [`${PATH.ORGANIZATION}/:id/assignCustomerToServiceWorker`]: {
        label: 'assign_customer_to_serviceworker'
    },
    [`${PATH.ORGANIZATION}/:id/serviceProvider/:providerId/reAssignWorker`]: {
        label: 'reassign_worker'
    },
    [`${PATH.ORGANIZATION}/:id/serviceProvider/:providerId/reassignSuperVisor`]: {
        label: 'reassign_supervisor'
    },
    [`${PATH.ORGANIZATION}/:id/serviceProvider/:providerId/service/:serviceId`]: {
        label: 'edit'
    },
    [`${PATH.ORGANIZATION}/:id/serviceProvider/:providerId/service/create`]: {
        label: 'create'
    },
    [`${PATH.ORGANIZATION}/:id/ComplaintEscalationMatrix`]: {
        label: 'complaint_escalation_matrix'
    },
    [`${PATH.ORGANIZATION}/:id/ComplaintEscalationMatrix/create`]: {
        label: 'create'
    },
    [`${PATH.ORGANIZATION}/:id/ComplaintEscalationMatrix/:complaintEscalationId`]: {
        label: 'edit'
    },

    [PATH.USER]: {
        label: 'users'
    },
    [`${PATH.USER}/create`]: {
        label: 'create'
    },
    [`${PATH.USER}/:id/details`]: {
        label: 'details'
    },
    // userDetail: {
    //     label: 'details'
    // },
    [`${PATH.USER}/:id/addContact`]: {
        label: 'contact'
    },
    [`${PATH.USER}/:id/addPassword`]: {
        label: 'password'
    },
    [`${PATH.USER}/:id/updateAddress`]: {
        label: 'address'
    },
    [`${PATH.USER}/:id/assignOrganizations`]: {
        label: 'assign_organization'
    },
    [`${PATH.USER}/:id/assignRolesView`]: {
        label: 'assign_roles'
    },
    [`${PATH.USER}/:id/assignUserGroupView`]: {
        label: 'assign_user_group'
    },
    [PATH.USER_GROUP]:
    {
        label: 'user_groups'
    },
    [`${PATH.USER_GROUP}/create`]: {
        label: 'create'
    },
    [`${PATH.USER_GROUP}/:id/details`]: {
        label: 'details'
    },
    [`${PATH.USER_GROUP}/:id/assignUser`]: {
        label: 'assign_user'
    },
    [PATH.ROLE]: {
        label: 'roles'
    },
    [PATH.REG_ROLE]: {
        label: 'regular_roles'
    },
    [PATH.ORG_ROLE]: {
        label: 'organization_roles'
    },
    [`${PATH.REG_ROLE}/create`]: {
        label: 'regularrole',
        excluded: true
    },

    [`${PATH.ORG_ROLE}/create/`]: {
        label: 'organizationrole',
        excluded: true

    },
    //EDIT
    [`${PATH.REG_ROLE}/Regular/:id/roles`]: {
        label: 'roles'
        // excluded: true

    },
    [`${PATH.REG_ROLE}/:id/Regular/permissions`]: {
        label: 'permissions'
        // excluded: true

    },
    [`${PATH.REG_ROLE}/:id/:regular/dataAccess`]: {
        label: 'data_access'

    },
    [`${PATH.REG_ROLE}/:id/Regular/assignees`]: {
        label: 'assignees'

    },
    [`${PATH.ORG_ROLE}/Regular/:id/roles`]: {
        label: 'roles'
    },
    [`${PATH.ORG_ROLE}/:id/Regular/permissions`]: {
        label: 'permissions'
    },
    [`${PATH.ORG_ROLE}/:id/Regular/assignees`]: {
        label: 'assignees'
    },
    [`${PATH.ORG_ROLE}/:id/:regular/dataAccess`]: {
        label: 'data_access'
    },
    //
    rolePermission: {
        label: 'permission'
    },
    roleAssignee: {
        label: 'assignee'

    },
    [PATH.DYNAMIC_QUESTION]: {
        label: 'questions'
    },
    [`${PATH.DYNAMIC_QUESTION}/create`]: {
        label: 'create'
    },
    [`${PATH.DYNAMIC_QUESTION}/:id/details`]: {
        label: 'details'
    },
    [`${PATH.DYNAMIC_QUESTION}/:id/currentAssociation`]: {
        label: 'current_association'
    },

    [PATH.DYNAMIC_FRAGMENT]: {
        label: 'fragments'
    },
    [`${PATH.DYNAMIC_FRAGMENT}/create`]: {
        label: 'create'
    },
    [`${PATH.DYNAMIC_FRAGMENT}/:id/details`]: {
        label: 'details'
    }, [`${PATH.DYNAMIC_FRAGMENT}/:id/assignTitle`]: {
        label: 'assign_title'
    }, [`${PATH.DYNAMIC_FRAGMENT}/:id/fragmentQuestionLoop`]: {
        label: 'fragment_question_loop'
    }, [`${PATH.DYNAMIC_FRAGMENT}/:id/currentAssociation`]: {
        label: 'current_association'
    },

    //
    [PATH.DYNAMIC_TITLE]: {
        label: 'titles'
    },
    [`${PATH.DYNAMIC_TITLE}/create`]: {
        label: 'create'
    },
    [`${PATH.DYNAMIC_TITLE}/:id/details`]: {
        label: 'details'
    },
    [`${PATH.DYNAMIC_TITLE}/:id/questions`]: {
        label: 'questions'
    },
    [`${PATH.DYNAMIC_TITLE}/:id/questionsValidation`]: {
        label: 'questions_validation'
    },
    [`${PATH.DYNAMIC_TITLE}/:id/questionOptionAssociation`]: {
        label: 'question_option_association'
    },
    [`${PATH.DYNAMIC_TITLE}/:id/currentAssociation`]: {
        label: 'current_association'
    },
    //
    [PATH.DYNAMIC_TEMPLATE]: {
        label: 'templates'
    },
    [`${PATH.DYNAMIC_TEMPLATE}/create`]: {
        label: 'create'
    },
    [`${PATH.DYNAMIC_TEMPLATE}/:id/basic`]: {
        label: 'details'
    },
    [`${PATH.DYNAMIC_TEMPLATE}/:id/fragment`]: {
        label: 'fragments'
    },
    [`${PATH.DYNAMIC_TEMPLATE}/:id/fragment/create`]: {
        label: 'create'
    },
    [`${PATH.DYNAMIC_TEMPLATE}/:id/fragment/:fragmentId`]: {
        label: 'details'
    },
    [`${PATH.DYNAMIC_TEMPLATE}/:id/routes`]: {
        label: 'routes'
    },
    [`${PATH.DYNAMIC_TEMPLATE}/:id/routes/:fragmentId`]: {
        label: 'details'
    },
    [`${PATH.DYNAMIC_TEMPLATE}/:id/currentAssociation`]: {
        label: 'association'
    },
    [PATH.BASIC_CONFIG_STATE]: {
        label: 'state'
    },
    [`${PATH.BASIC_CONFIG_STATE}/create`]: {
        label: 'create'
    },
    [`${PATH.BASIC_CONFIG_STATE}/:id`]: {
        label: 'edit'
    },
    [PATH.BASIC_CONFIG_ITEM]: {
        label: 'item'
    },
    [`${PATH.BASIC_CONFIG_ITEM}/create`]: {
        label: 'create'
    },
    [`${PATH.BASIC_CONFIG_ITEM}/:id`]: {
        label: 'edit'
    }, [`${PATH.BASIC_CONFIG_ITEM}/:id/sub-category`]: {
        label: 'sub_category'
    },
    [PATH.BASIC_CONFIG_DISTRICT]: {
        label: 'district'
    },
    [`${PATH.BASIC_CONFIG_DISTRICT}/create`]: {
        label: 'create'
    },
    [`${PATH.BASIC_CONFIG_DISTRICT}/:id`]: {
        label: 'edit'
    },
    [PATH.BASIC_CONFIG_LSGI]: {
        label: 'lsgi'
    },
    [`${PATH.BASIC_CONFIG_LSGI}/create`]: {
        label: 'create'
    },
    [`${PATH.BASIC_CONFIG_LSGI}/:id`]: {
        label: 'edit'
    },
    [PATH.BASIC_CONFIG_BLOCK_PANCHAYATH]: {
        label: 'block_panchayath'
    },
    [`${PATH.BASIC_CONFIG_BLOCK_PANCHAYATH}/create`]: {
        label: 'create'
    },
    [`${PATH.BASIC_CONFIG_BLOCK_PANCHAYATH}/:id`]: {
        label: 'edit'
    },
    [PATH.BASIC_CONFIG_DISTRICT_PANCHAYATH]: {
        label: 'district_panchayath'
    },
    [`${PATH.BASIC_CONFIG_DISTRICT_PANCHAYATH}/create`]: {
        label: 'create'
    },
    [`${PATH.BASIC_CONFIG_DISTRICT_PANCHAYATH}/:id`]: {
        label: 'edit'
    },
    [PATH.BASIC_CONFIG_SERVICE_CATEGORY]: {
        label: 'service_category'
    },
    [`${PATH.BASIC_CONFIG_SERVICE_CATEGORY}/create`]: {
        label: 'create'
    },
    [`${PATH.BASIC_CONFIG_SERVICE_CATEGORY}/:id`]: {
        label: 'edit'
    },
    [PATH.BASIC_CONFIG_RESIDENCE_CATEGORY]: {
        label: 'residence_category'
    },
    [`${PATH.BASIC_CONFIG_RESIDENCE_CATEGORY}/create`]: {
        label: 'create'
    },
    [`${PATH.BASIC_CONFIG_RESIDENCE_CATEGORY}/:id`]: {
        label: 'edit'
    },
    [PATH.TRADING_TYPE]: {
        label: 'trading_type'
    },
    [`${PATH.TRADING_TYPE}/create`]: {
        label: 'create'
    },
    [`${PATH.TRADING_TYPE}/:id`]: {
        label: 'edit'
    },
    [PATH.BUILDING_TYPE]: {
        label: 'building_type'
    },
    [`${PATH.BUILDING_TYPE}/create`]: {
        label: 'create'
    },
    [`${PATH.BUILDING_TYPE}/:id`]: {
        label: 'edit'
    },
    [PATH.SHOP_TYPE]: {
        label: 'shop_type'
    },
    [`${PATH.SHOP_TYPE}/create`]: {
        label: 'create'
    },
    [`${PATH.SHOP_TYPE}/:id`]: {
        label: 'edit'
    },
    [PATH.ASSOCIATION_TYPE]: {
        label: 'association_type'
    },
    [`${PATH.ASSOCIATION_TYPE}/create`]: {
        label: 'create'
    },
    [`${PATH.ASSOCIATION_TYPE}/:id`]: {
        label: 'edit'
    },
    [PATH.SERVICE_CHARGE_SLAB]: {
        label: 'service_charge_slab'
    },
    [`${PATH.SERVICE_CHARGE_SLAB}/create`]: {
        label: 'create'
    },
    [`${PATH.SERVICE_CHARGE_SLAB}/:id`]: {
        label: 'edit'
    },
    [PATH.PUBLIC_GATHERING_METHOD]: {
        label: 'public_gathering_method'
    },
    [`${PATH.PUBLIC_GATHERING_METHOD}/create`]: {
        label: 'create'
    },
    [`${PATH.PUBLIC_GATHERING_METHOD}/:id`]: {
        label: 'edit'
    },
    [PATH.TERRACE_FARMING]: {
        label: 'terrace_farming_type'
    },
    [`${PATH.TERRACE_FARMING}/create`]: {
        label: 'create'
    },
    [`${PATH.TERRACE_FARMING}/:id`]: {
        label: 'edit'
    },
    [PATH.ORGANIZATION_TYPE]: {
        label: 'organization_type'
    },
    [`${PATH.ORGANIZATION_TYPE}/create`]: {
        label: 'create'
    },
    [`${PATH.ORGANIZATION_TYPE}/:id`]: {
        label: 'edit'
    },
    [PATH.ADMINISTRATION_TYPE]: {
        label: 'administration_type'
    },
    [`${PATH.ADMINISTRATION_TYPE}/create`]: {
        label: 'create'
    },
    [`${PATH.ADMINISTRATION_TYPE}/:id`]: {
        label: 'edit'
    },
    [PATH.SERVICE_CONFIG]: {
        label: 'service_config'
    },
    [`${PATH.SERVICE_CONFIG}/create`]: {
        label: 'create'
    },
    [`${PATH.SERVICE_CONFIG}/:id`]: {
        label: 'edit'
    },
    [PATH.BUNDLED_SERVICE_CONFIG]: {
        label: 'bundled_service_config'
    },
    [`${PATH.BUNDLED_SERVICE_CONFIG}/create`]: {
        label: 'create'
    },
    [`${PATH.BUNDLED_SERVICE_CONFIG}/:id`]: {
        label: 'details'
    },
    [`${PATH.BUNDLED_SERVICE_CONFIG}/:id`]: {
        label: 'details'
    },
    [PATH.CUSTOMER_DATA]: {
        label: 'customers'
    },
    [`${PATH.CUSTOMER_DATA}/:id/view`]: {
        label: 'view'
    },
    [`${PATH.CUSTOMER_DATA}/:id`]: {
        label: 'edit'
    },
    [`${PATH.CUSTOMER_DATA}/service_enrollment`]: {
        label: 'service_enrollment'
    },
    [PATH.BASIC_CONFIG_WARD]: {
        label: 'ward'
    },
    [`${PATH.BASIC_CONFIG_WARD}/create`]: {
        label: 'create'
    },
    [`${PATH.BASIC_CONFIG_WARD}/:id/details`]: {
        label: 'details'
    },
    [`${PATH.BASIC_CONFIG_WARD}/:id/residentialAssociation`]: {
        label: 'residential_association'
    },

    [`${PATH.BASIC_CONFIG_WARD}/:wardId/residentialAssociation/:id/details`]: {
        label: 'basic_details'
    },
    [`${PATH.BASIC_CONFIG_WARD}/:wardId/residentialAssociation/:id/contact`]: {
        label: 'contact_details'
    },
    [`${PATH.BASIC_CONFIG_WARD}/residentialAssociation/create`]: {
        label: 'residential_association'
    },
    [PATH.GENERATE_QR_CODE]: {
        label: 'generate_QR_code'
    },
    [PATH.SCHEDULE]: {
        label: 'schedule'
    },
    [`${PATH.SCHEDULE}/list`]: {
        label: 'list'
    },
    [`${PATH.SCHEDULE}/create`]: {
        label: 'create'
    },
    [`${PATH.SCHEDULE}/:id`]: {
        label: 'edit'
    },
    [`${PATH.SCHEDULE}/history/:id`]: {
        label: 'history'
    },
    [`${PATH.SCHEDULE}/new/:id`]: {
        label: 'add_customer'
    },
    [`${PATH.SCHEDULE}/existing/:id`]: {
        label: 'remove_customer'
    },
    [PATH.SPECIAL_SERVICE_REQUEST]: {
        label: 'special_service_request'
    },
    [PATH.SUBSCRIPTION_REQUEST]: {
        label: 'subscription_request'
    },
    [PATH.REPORTED_BUGS]: {
        label: 'reported_bugs'
    },
    [PATH.MCF_STOCK_IN]: {
        label: 'stock_in'
    },
    [PATH.MCF_STOCK_TRANSFER]: {
        label: 'stock_transfer'
    },
    [PATH.MCF_STOCK_SALE]: {
        label: 'stock_sale'
    },
    [PATH.BASIC_CONFIG_MCF]: {
        label: 'mcf'
    },
    [`${PATH.BASIC_CONFIG_MCF}/create`]: {
        label: 'create'
    },
    [`${PATH.BASIC_CONFIG_MCF}/:id`]: {
        label: 'edit'
    },
    [`${PATH.PROFILE}`]: {
        label: 'profile'
    },
    [`${PATH.PROFILE}/details`]: {
        label: 'details'
    },
    [`${PATH.PROFILE}/change_password`]: {
        label: 'change_password'
    },
    [`${PATH.CUSTOMER_DATA_CORRECTION}`]: {
        label: 'customer_data_correction'
    },
    [`${PATH.VIEW_CUSTOMER_DATA_CORRECTION}`]: {
        label: 'view'
    },
    [`${PATH.SUBSCRIPTION}`]: {
        label: 'subscription'
    },
    [PATH.SERVICE_HISTORY]: {
        label: 'service_history'
    },
    [`${PATH.SERVICE_HISTORY}/:surveyIds/:templateTypeId/view`]: {
        label: 'view'
    },
    [`${PATH.SERVICE_HISTORY}/edit`]: {
        label: 'edit'
    },
    [PATH.SERVICE]: {
        label: 'service'
    },
    [PATH.PAYMENT]: {
        label: 'payment'
    },
    [PATH.COMPLAINT]: {
        label: 'complaints'
    },
    [PATH.INCIDENTS]: {
        label: 'incidents'
    },
    [PATH.MAP_ROUTING]: {
        label: 'trip_planner'
    },
    [PATH.MAP_LIVE_TRACING]: {
        label: 'live_tracker'
    },
    [PATH.MAP_GEO_FENCE_TRACKING]: {
        label: 'geo_fence'
    },
    [PATH.COMPLAINT_CONFIG]: {
        label: 'complaint_config'
    },
    [`${PATH.COMPLAINT_CONFIG}/create`]: {
        label: 'create'
    },
    [`${PATH.COMPLAINT_CONFIG}/:id`]: {
        label: 'edit'
    },
    [PATH.INCIDENT_CONFIG]: {
        label: 'incident_config'
    }, [PATH.RRF_SALES]: {
        label: 'rrf_sales'
    }, [PATH.RRF_STOCK_IN]: {
        label: 'rrf_stockIn'
    }, [PATH.CKC_SALES]: {
        label: 'ckc_sale'
    }, [PATH.CKC_PICKUP]: {
        label: 'ckc_pickups'
    },
    [PATH.MCF_SEGGREGATION]: {
        label: 'mcf_seggregation'
    },
    [PATH.RRF_SHREDDED]: {
        label: 'rrf_shredded'
    },
    [PATH.BASIC_CONFIG_ITEM_SUBCATEGORY]: {
        label: 'item_subcategory'
    },
    [`${PATH.BASIC_CONFIG_ITEM_SUBCATEGORY}/create`]: {
        label: 'create'
    },
    [`${PATH.BASIC_CONFIG_ITEM_SUBCATEGORY}/:id`]: {
        label: 'edit'
    }


});
