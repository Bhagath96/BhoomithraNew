export const URL = {

    MOBILE: {
        FETCH_TEMPLATE: 'dfg/templates/answers/:answerId/template-json'
    },
    SURVEY: {
        GET_SURVEY_DETAILS_BY_SURVEY_ID: 'dfg/templates/answers',
        FETCH_SURVEY_TEMPLATE_FOR_ANSWER: 'dfg/templates/answers/:answerId/template-json',
        FETCH_SURVEY_DATA: 'dfg/templates/answers',
        FETCH_TEMPLATE: 'dfg/templates/combined',
        GET_SURVEY_TEMPLATE_VERSION: 'admin/organizations/:organizationId/templates/version-checker',
        GET_SINGLE_SURVEY_TEMPLATE: 'dfg/templates/:templateId/template-json'
    },

    USER: {
        AUTHENTICATE: 'auth/realms/bhoomitra/protocol/openid-connect/token',
        FETCH_USER_INFO: 'user/profile',
        CHANGE_PASSWORD: 'user/profile/password',
        SENT_USER_INFO: 'user/users/:userId',

        LOGOUT: 'logout'
    },
    COMMON: {
        LOAD_STATES: 'admin/states',
        LOAD_DISTRICTS: 'admin/districts',
        LOAD_BLOCK_PANCHAYATHS: 'admin/block-panchayaths',
        LOAD_DISTRICT_PANCHAYATHS: 'admin/district-panchayaths',
        LOAD_LSGI: 'admin/lsgis',
        LOAD_LSGI_TYPES: 'admin/organization-types/lsgi',
        QUESTION_VALIDATION_TYPES: 'admin/question-validation-types',
        LOAD_LANGUAGES: 'admin/languages',
        LIST_STATE: 'admin/states?type=dropdown',
        QR_REGEX: 'qrcode/organizations/:organizationId/regexes',
        QR_EXISTS: 'user/qrCodes/:qrCode'
    },
    ORGANIZATION: {
        ORGANIZATIONS_TYPES: 'admin/organization-types',
        ORGANIZATIONS_ROLE_TYPES: 'user/roles/role-types/:roleTypeId',
        CHK_LOAD_USER_GROUP_ASSIGN_LIST: 'admin/organizations/:organizationId/roles/:roleId/users',
        PARENT_ORGANIZATIONS: 'admin/organizations',
        LOAD_PROVIDERS: 'admin/api-providers',
        SAVE_ORGANIZATION: 'admin/organizations',
        FETCH_ORGANIZATION: 'admin/organizations/:organizationId',
        FETCH_USER_ORGANIZATION_MAPPING: 'admin/organizations/:organizationId/users',
        FETCH_ASSIGN_ORGANIZATION_MAPPING: 'admin/organizations/:organizationId/rrf-organizations',
        FETCH_ASSIGN_ROLE: 'admin/organizations/:orgId/roles/:roleId/users',
        GET_ALL_SERVICE_PROVIDERS: 'admin/organizations/:organizationId/service-providers',
        GET_ALL_SERVICE_PROVIDERS_FOR_COMPLAINTS: 'admin/organizations/:orgId/locations/:wardId/service-providers',

        UPDATE_USER_ORGANIZATION_MAPPING: 'admin/organizations/:organizationId/users',
        UPDATE_UASSIGN_ORGANIZATION_MAPPING: 'admin/organizations/:organizationId/rrf-organizations',

        UPDATE_ORGANIZATION: 'admin/organizations',
        LIST_ORGANISATION: 'admin/organizations',
        DELETE_ORGANISATION: 'admin/organizations/:id',
        LOAD_ORGANIZATION_API_PROVIDERS: 'admin/organizations/:organizationId/api-key-providers',
        SAVE_ORGANIZATION_API_PROVIDERS: 'admin/organizations/:organizationId/api-key-providers',
        UPDATE_ORGANIZATION_API_PROVIDERS: 'admin/organizations/:organizationId/api-key-providers/:apiKeyProviderId',
        GET_EMAIL_PROVIDER: 'admin/organizations/:organizationId/api-key-providers/:apiProviderType',
        GET_SMS_PROVIDER: 'admin/organizations/:organizationId/api-key-providers/:apiProviderType',
        GET_NOTIFICATION_PROVIDER: 'admin/organizations/:organizationId/api-key-providers/:apiProviderType',
        UPDATE_API_PROVIDER: 'admin/organizations/:organizationId/api-key-providers/:apiProviderType',
        POST_API_PROVIDER: 'admin/organizations/:organizationId/api-key-providers',
        LIST_TEMPLATE_TYPES: 'admin/template-types',
        LIST_TEMPLATE_BY_TYPE_ID: 'dfg/templates/template-types/:templateTypeId',
        DELETE_SERVICE_PROVIDER: 'admin/organizations/:organizationId/service-providers/:serviceProviderId',
        TOGGLE_STATUS: 'admin/service-providers/service-configs/:sId/active/:active',
        LIST_ALL_ORGANIZATION_NAME: 'admin/organizations',
        LOAD_TEMPLATES: 'admin/organizations/:orgId/modules/:mId/templates',
        LOAD_SERVICES: 'admin/service-providers/bundled-service-configs/service-configs',
        GET_SW_SUPER_VISOR_FROM_WARD: 'admin/organizations/:orgId/service-providers/:serviceProviderId/roles/40/users',
        SUBMIT_RE_ASSIGN_SUPERVISOR: 'admin/organizations/:organizationId/service-providers/:serviceProviderId/wards/:wardId/reassign-supervisors/from/:oldSupervisorId/to/:newSupervisorId',
        GET_SERVICE_WORKER_FROM_SUPERVISOR: 'admin/organizations/:organizationId/service-providers/:serviceProviderId/wards/:wardId/supervisors/:supervisorId/gts',
        SUBMIT_RE_ASSIGN_WORKER: 'admin/organizations/:organizationId/service-providers/:serviceProviderId/wards/:wardId/supervisors/:supervisorId/reassign-service-workers/from/:oldServiceWrokerId/to/:newServiceWorkerId',
        GET_DATAS_FOR_CUSTOMER_TO_SERVICE_WORKER: 'admin/organizations/:organizationId/service-providers/:serviceProviderId/wards/:wardId/supervisors/:supervisorId/assign-gt/:gtId/customers',
        SUBMIT_CUSTOMER_NUMBERS_FOR_ASSIGN_CUSTOMER_TO_SERVICE_WORKER: 'admin/organizations/:organizationId/service-providers/:serviceProviderId/wards/:wardId/supervisors/:supervisorId/assign-gt/:gtId/customers',
        ASSIGN_VENDORS_LIST: 'admin/organizations/:organizationId/items',
        SAVE_ASSIGN_VENDOR_ITEM: 'admin/organizations/:organizationId/items',
        FETCH_ASSIGN_VENDORS_BY_ID: 'admin/organizations/:organizationId/items/:organizationVendorItemPriceId',
        UPDATE_ASSIGN_VENDORS: 'admin/organizations/:organizationId/items/:organizationVendorItemPriceId',
        DELETE_ASSIGN_VENDORS: 'admin/organizations/:organizationId/items/:organizationVendorItemPriceId',
        GET_ALL_ITEM: 'admin/items',
        GET_ALL_ITEM_TYPE: 'admin/item-types',
        ADDITIONAL_DETAILS: {
            WARDS: 'admin/organizations/:organizationId/wards',
            DETAILS_BY_ORG_ID: 'admin/organizations/:organizationId/mcf-details',
            UPDATE: 'admin/organizations/:organizationId/mcf-details/:organizationMcfId',
            SAVE: 'admin/organizations/:organizationId/mcf-details'
        },
        COMPLAINT_ESCALATION_MATRIX: 'admin/organizations/:organizationId/escalation-matrix',
        COMPLAINT_ESCALATION_MATRIX_BY_ID: 'admin/organizations/:organizationId/escalation-matrix/:escalationMatrixMappingId',
        LIST_COMPLAINTS: 'admin/complaint-configs',
        LIST_ROLE: 'user/roles',
        LIST_TEMPLATE: 'dfg/templates',
        LIST_TEMPLATE_TYPE: 'admin/template-types'
    },
    MCF: {
        GET_ALL_MCF_STOCKS_IN: 'admin/organizations/mcf-stock-ins',
        GET_ALL_MCF_SEGGREGATION: 'admin/mcf-segregation',
        GET_ALL_MCF_STOCKS_TRANSFER: 'admin/organizations/mcf-stock-transfers',
        GET_ALL_MCF_STOCKS_SALE: 'admin/organizations/mcf-sales'


    },
    CUSTOMER_DATA_CURRECTION: {
        LIST_CUSTOMER_DATA_CURRECTION: 'dfg/customer-data-correction'
    },
    USER_GROUP: {
        SAVE_USER_GROUP: 'user/user-groups',
        UPDATE_USER_GROUP: 'user/user-groups',
        DELETE_USER_GROUP: 'user/user-groups/:id',
        LIST_USER_GROUP: 'user/user-groups',
        GET_USER_GROUP_BY_ID: 'user/user-groups/:id',
        FETCH_USERS_BY_USER_GROUP: 'user/user-groups/:userGroupId/users',
        UPDATE_USERS_BY_USER_GROUP: 'user/user-groups/:userGroupId/users',
        LIST_ALL_NAMES: 'user/user-groups',
        FETCH_ASSIGN_USERS: 'user/user-groups/:userGroupId/users'
    },
    //please check the currect apis dummy values added
    USER_MANAGEMENT: {
        ADD_USER: 'user/users',
        ADD_PASSWORD: 'addPassword',
        GET_COUNTRY_CODE: 'admin/countries',
        GET_USER_BY_ID: 'user/users/:userId',
        EDIT_USER_BASIC_DETAILS: 'user/users/:userId',
        UPDATE_USER: 'updateUser',
        UPDATE_USER_ORGANISATION: 'updateUserOrganisation',
        UPDATE_USER_PASSWORD: 'user/users/:userId/password',
        SEARCH_USER: 'user?',
        DELETE_USER: 'user/users/:id',
        LIST_USER: 'user/users',
        GET_USER: 'user/users/:userId/addresses',
        UPDATE_USER_ADDRESS: 'user/users/:userId/addresses',
        LOAD_ORGANISATION_FOR_USERS: 'user/users/:userId/organizations',
        LOAD_ORG_LIST: 'admin/organizations',
        EDIT_ORGANISATION_FOR_USERS: 'user/users/:userId/organizations/:defaultOrganizationId',
        LOAD_ROLE_FOR_USERS: 'user/users/:userId/roles',
        EDIT_ROLE_FOR_USERS: 'user/users/:userId/roles',
        LIST_USER_GROUP_FOR_USERS: 'user/users/:userId/user-groups',
        UPDATE_USER_GROUP_FOR_USERS: 'user/users/:userId/user-groups',
        GET_USER_CONTACT_DETAILS: 'user/users/:userId/contact',
        EDIT_USER_CONTACT_DETAILS: 'user/users/:userId/contact',
        GET_USER_TYPE: 'admin/user-types',
        LIST_ALL_USER_NAME: 'user/users',
        FETCH_ASSIGN_ORGANIZATION: 'user/users/:userId/organizations',
        UPDATE_ASSIGN_ORGANIZATION: 'user/users/:userId/organizations',
        FETCH_ASSIGN_ROLES: 'user/users/:userId/roles',
        UPDATE_ASSIGN_ROLES: 'user/users/:userId/roles',
        FETCH_ASSIGN_USER_GROUP: 'user/users/:userId/user-groups',
        LIST_GENDER: 'admin/genders',
        SAVE_USER_ROLE_DATA_ACCESS_PERMISSION: 'user/users/:userId/user-data-access'
    },
    SERVICE_CATEGORY: {
        LIST_SERVICE_CATEGORY: 'admin/service-categories',
        EDIT_SERVICE_CATEGORY: 'admin/service-categories/:ServiceCategoryId',
        GET_SERVICE_CAT_BY_ID: 'admin/service-categories/:ServiceCategoryId'
    },
    SERVICE_CONFIG: {
        LIST_SERVICE_CONFIG: 'admin/service-configs',
        EDIT_SERVICE_CONFIG: 'admin/service-configs/:serviceConfigId',
        GET_SERVICE_CONFIG_BY_ID: 'admin/service-configs/:serviceConfigId'
    },
    SERVICE_TYPE: {
        LIST_SERVICE_TYPE: 'admin/service-types',
        EDIT_SERVICE_TYPE: 'admin/service-types/:serviceConfigId',
        GET_SERVICE_TYPE_BY_ID: 'admin/service-types/:serviceConfigId'
    },
    SERVICE_INTERVEL: {
        LIST_SERVICE_INTERVEL: 'admin/service-intervals',
        EDIT_SERVICE_INTERVEL: 'admin/service-intervel/:serviceIntervelId',
        GET_SERVICE_INTERVEL_BY_ID: 'admin/service-intervel/:serviceIntervelId'
    },
    PAYMENT_COLLECTION: {
        LIST_PAYMENT_COLLECTION: 'admin/service-charge-collection-types',
        EDIT_PAYMENT_COLLECTION: 'admin/payment-collection/:paymentCollectionId',
        GET_PAYMENT_COLLECTION: 'admin/payment-collection/:paymentCollectionId'
    },
    PAYMENT_INTERVAL: {
        LIST_PAYMENT_INTERVAL: 'admin/invoice-intervals'
    },
    RATE_TYPE: {
        LIST_RATE_TYPE: 'admin/service-rate-types',
        EDIT_RATE_TYPE: 'admin/rate-type/:rateTypeId',
        GET_RATE_TYPE: 'admin/rate-type/:rateTypeId'
    },
    BUNDLED_SERVICE_CONFIG: {
        LIST_BUNDLED_SERVICE_CONFIG: 'admin/bundled-service-configs',
        EDIT_BUNDLED_SERVICE_CONFIG: 'admin/bundled-service-configs/:bundledServiceConfigId',
        GET_BUNDLED_SERVICE_CONFIG_BY_ID: 'admin/bundled-service-configs/:bundledServiceConfigId',
        BUNDLE_SERVICE_CONFIG_ASSOCIATION: 'admin/bundled-service-configs/:bundledServiceConfigId/service-configs'

    },
    RESIDENCE_CATEGORY: {
        LIST_RESIDENCE_CATEGORY: 'admin/residence-categories',
        EDIT_RESIDENCE_CATEGORY: 'admin/residence-categories/:ResidenceCategoryId',
        GET_RESIDENCE_CAT_BY_ID: 'admin/residence-categories/:ResidenceCategoryId'
    },
    TRADING_TYPE: {
        LIST_TRADING_TYPE: 'admin/trading-types',
        EDIT_TRADING_TYPE: 'admin/trading-types/:TradingTypeId',
        GET_TRADING_TYPE_BY_ID: 'admin/trading-types/:TradingTypeId'
    },
    SHOP_TYPE: {
        LIST_SHOP_TYPE: 'admin/shop-types',
        EDIT_SHOP_TYPE: 'admin/shop-types/:ShopTypeId',
        GET_SHOP_TYPE_BY_ID: 'admin/shop-types/:ShopTypeId'
    },
    SERVICE_CHARGE_SLAB: {
        LIST_SERVICE_CHARGE_SLAB: 'admin/service-charge-slabs',
        EDIT_SERVICE_CHARGE_SLAB: 'admin/service-charge-slabs/:serviceChargeSlabId',
        GET_SERVICE_CHARGE_SLAB_BY_ID: 'admin/service-charge-slabs/:serviceChargeSlabId'
    },
    ASSOCIATION_TYPE: {
        LIST_ASSOCIATION_TYPE: 'admin/association-types',
        EDIT_ASSOCIATION_TYPE: 'admin/association-types/:associationTypeId',
        GET_ASSOCIATION_TYPE_BY_ID: 'admin/association-types/:associationTypeId'
    },
    SERVICE: {
        LIST_SERVICE_BY_ID: 'admin/service-providers/service-configs/:serviceConfigId',
        SENT_SERVICE: 'admin/service-providers/service-configs',
        LIST_SERVICE: 'admin/service-providers/service-configs'
    },
    ADMINISTRATION_TYPE: {
        LIST_ADMINISTRATION_TYPE: 'admin/administration-types',
        EDIT_ADMINISTRATION_TYPE: 'admin/administration-types/:administrationTypeId',
        GET_ADMINISTRATION_TYPE_BY_ID: 'admin/administration-types/:administrationTypeId'
    },
    BUILDING_TYPE: {
        LIST_BUILDING_TYPE: 'admin/building-types',
        EDIT_BUILDING_TYPE: 'admin/building-types/:BuildingTypeId',
        GET_BUILDING_TYPE_BY_ID: 'admin/building-types/:BuildingTypeId',
        GET_RESIDENTIAL_CATEGORY: 'admin/residence-categories'

    },
    TERRACE_FARMING: {
        LIST_TERRACE_FARMING: 'admin/terrace-farming-help-types',
        EDIT_TERRACE_FARMING: 'admin/terrace-farming-help-types/:terraceFarmingHelpTypeId',
        GET_TERRACE_FARMING_BY_ID: 'admin/terrace-farming-help-types/:terraceFarmingHelpTypeId'
    },
    ORGANIZATION_TYPE: {
        LIST_ORGANIZATION_TYPE: 'admin/organization-types',
        EDIT_ORGANIZATION_TYPE: 'admin/organization-types/:organizationTypeId',
        GET_ORGANIZATION_TYPE_BY_ID: 'admin/organization-types/:organizationTypeId'
    },
    PUBLIC_GATHERING_METHOD: {
        LIST_PUBLIC_GATHERING_METHOD: 'admin/public-gathering-methods',
        EDIT_PUBLIC_GATHERING_METHOD: 'admin/public-gathering-methods/:publicGatheringMethodId',
        GET_PUBLIC_GATHERING_METHOD_BY_ID: 'admin/public-gathering-methods/:publicGatheringMethodId'
    },
    REASSIGNGT: {
        GET_ALL_WARDS_BY_PROVIDER_ID: 'admin/organizations/:organizationId/service-providers/:serviceProviderId/locations',
        GET_GT_BASED_ON_WARD_ID: 'admin/organizations/service-providers/:serviceProviderId/wards/:wardId/users',
        GET_CUSTOMERS_BASED_ON_GT_ID: 'schedule/customers/:surveyorId',
        GET_SUPER_VISOR: 'admin/organizations/:organizationId/service-providers/:serviceProviderId/roles/:roleId/users',
        GET_TO_GT: 'admin/organizations/:organizationId/service-providers/:serviceProviderId/supervisors/:supervisorId/gts',
        POST_RE_ASSIGN_GT: 'schedule/customers/reassign-gt/from/:currentSurveyorId/to/:newSurveyorId',
        POST_RE_ASSIGN_SUPER_VISOR: 'admin/organizations/:organizationId/service-providers/:organizationServiceProviderId/re-assign/supervisors/from/:currentSupervisorId/to/:newSupervisorId'
    },
    //api need to be changed
    ROLE: {
        UPDATE_USER_IN_ROLE: 'user/roles/:roleId/users',
        FETCH_RESOURCE_ACTIONS: 'user/resource-permissions/resources/:resourceId/roles/:roleId',
        SAVE_RESOURCE_ACTIONS: 'user/resource-permissions',
        UPDATE_RESOURCE_ACTIONS: 'user/resource-permissions/:resourcePermissionId',
        LIST_REGULAR_ROLE: 'user/roles/role-types/:roleTypeId',
        LIST_ORGANISATION_ROLE: 'user/roles/role-types/:roleTypeId',
        DELETE_ORGANISATIONAL_ROLE: 'user/roles/:roleId',
        DELETE_REGULAR_ROLE: 'user/roles/:roleId',
        ADD_ROLE: 'user/roles',
        GET_ROLE_BY_ID: 'user/roles/:roleId',
        UPDATE_ROLE: 'user/roles/:roleId',
        GET_CONTROLLER_PERMISSIONS: 'user/resources',
        GET_CONTROLLER_PERMISSIONS_BY_ID: 'user/resource-actions/resources/:resourceId',
        SEND_ACTION_IDS: 'user/resource-permissions',
        SEND_PERMISSIONS_FOR_EDIT: 'user/resource-permissions/:resourcePermissionId',
        GET_USERS_BASED_ON_ROLE_ID: 'user/roles/:roleId/users',
        LIST_ALL_NAME_FOR_ROLE: 'user/roles/role-types/1',
        LIST_ALL_NAME_FOR_ORG_ROLE: 'user/roles/role-types/2',
        FETCH_ASSIGN_ROLE_TO_USER: 'user/roles/:roleId/users',
        SAVE_ROLE_ASSIGNEE_DATA_ACCESS_PERMISSION: 'user/roles/:roleId/users-data-access',
        FETCH_VIEWS: 'admin/data-capture-view',
        FETCH_LEVELS: 'admin/data-access',
        SUBMIT_DATA_ACCESS: 'user/role-data-access',
        GET_DATA_ACCESS_BY_ID: 'user/role-data-access/role/:roleId/data-access'
    },
    ORG_MODULES: {
        LIST_MODULES: 'admin/organizations/:organizationId/modules',
        LIST_ROLES: 'user/​roles​/role-types​/:roleTypeId',
        LIST_ASSIGNED_MODULES: 'admin/organizations/:orgID/modules:roleId',
        SAVE_MODULES: 'admin/organizations/:orgId/modules',
        SAVE_ASSIGNED_MODULES: 'admin/organizations/:orgId/roles/:roleId/modules '

    },
    MODULES: {
        LIST_MODULES: 'admin/modules',
        GET_MODULE_BY_ID: 'admin/modules/:moduleId',
        GET_MODULE_PERMISSION_LIST: 'admin/modules/:moduleId',
        GET_CONTROLLER_PERMISSIONS_BY_ID: 'admin/resource-actions/resources/:resourceId',
        LOAD_ORGANISATION_FOR_MODULE: 'admin/resource-actions/resources/:moduleId',
        UPDATE_MODULE_DETAIL_VIEW: 'admin/modules/:moduleId'

    },
    DYNAMIC_FORM: {
        LIST_LANGUAGES: 'admin/languages',
        SAVE_QUESTION: 'dfg/questions',
        UPDATE_QUESTION: 'dfg/questions/:questionId',
        LIST_QUESTIONS: 'dfg/questions',
        SENT_LABEL_FOR_TITLE: 'dfg/titles',
        SENT_QUESTIONS_AND_SORT_ORDER: 'dfg/titles/:titleId/questions',
        DELETE_QUESTION: 'dfg/questions/:questionId',
        FETCH_QUESTION_BY_ID: 'dfg/questions/:questionId',
        LIST_TITLE: 'dfg/titles',
        DELETE_TITLE: 'dfg/titles/:titleId',
        GET_TITILE_BY_ID: 'dfg/titles/:titleId/labels',
        EDIT_LABELS_WITH_ID: 'dfg/titles/:titleId',
        GET_QUESTIONS_FOR_TITLE_WITH_ID: 'dfg/titles/:titleId/questions',
        GET_QUESTIONS_VALIDATION_TYPE: 'admin/title-validation-types',
        UPDATE_VALIDATION_OBJECT: 'dfg/titles/:titleId/question-validations',
        GET_QUESTION_VALIDATION: 'dfg/titles/:titleId/question-validations',
        GET_OPTION_WITH_QUESTION_ID: 'dfg/question-option/:questionId',
        GET_QUESTION_OPTION_VALIDATION: 'dfg/titles/:titleId/question-option-validations',
        UPDATE_QUESTION_OPTION_VALIDATION: 'dfg/titles/:titleId/question-option-validations',
        LIST_FRAGMENT: 'dfg/fragments',
        GET_BASIC_DETAILS_OF_FRAGMENT: 'dfg/fragments/:fragmentId/labels',
        SENT_FRAGMENT_BASIC_DETAIL: 'dfg/fragments',
        GET_TITLES_FOR_FRAGMENTS: 'dfg/fragments/:fragmentId/titles',
        EDIT_TITLE_FRAGMENT_ASSOCIATION: 'dfg/fragments/:fragmentId/titles',
        EDIT_FRAGMENT_BASIC_DETAILS: 'dfg/fragments/:fragmentId',
        GET_TITLE_FRAGMENT_ASSOCIATION: 'dfg/fragments/:fragmentId/titles',
        DELETE_FRAGMENT: 'dfg/fragments/:fragmentId',
        FETCH_QUESTION_TYPES: 'admin/question-types',
        LIST_OPTION_QUESTIONS: 'dfg/titles/:titleId/questions',
        FETCH_QUESTION_KEYS: 'admin/question-ui-keys',
        FETCH_TITLE_BASED_ON_FRAGMENT_ID: 'dfg/fragments/:fragmentId/titles',
        FETCH_QUESTIONS_BASED_ON_TITLE_ID: 'dfg/titles/:titleId/questions',
        GET_ALL_FRAGMENTS_FOR_DROPDOWN: 'dfg/fragments',
        GET_FRAGMENT_QUESTION_LOOP: 'dfg/fragments/:fragmentId/question-loop',
        UPDATE_FRAGMENT_QUESTION_LOOP: 'dfg/fragments/:fragmentId/question-loop',
        GET_ALL_TITLE_QUESTIONS: 'dfg/titles/:titleId/questions',
        GET_TITLE_CURRENT_ASSOCIATION: 'dfg/titles/:titleId/title-association',
        FETCH_FRAGMENT_CURRENT_ASSOCIATION: 'dfg/fragments/:fragmentId/fragment-association',
        FETCH_QUESTION_CURRENT_ASSOCIATION: 'dfg/questions/:questionId/question-association',
        FETCH_DATA_SOURCE: 'admin/datasources',
        FETCH_DATA_SOURCE_BY_ID: 'admin/datasources/:dataSourceID/data'
    },
    FORGOT_PASSWORD: {
        SENT_MOBILE_NUMBER_FOR_OTP: 'user/otp',
        OPT_VERIFY: 'user/otp/verify',
        RESET_PASSWORD: 'user/reset-password'
    },
    ORG_TEMPLATE: {
        LIST_SELECTED_TEMPLATE: 'admin/organizations/:organizationId/templates',
        LIST_TEMPLATE: 'dfg/templates?type=dropdown',
        SAVE_TEMPLATE: 'admin/organizations/:organizationId/template-types/:templateTypeId/templates/:templateId',
        GET_SERVICE_PROVIDER: 'admin/service-provider-types',
        POST_SERVICE_PROVIDER: 'admin/organizations/:organizationId/service-providers',
        LIST_ALL_SERVICE_PROVIDERS: 'admin/organizations/:organizationId/service-providers',
        GET_SERVICE_PROVIDER_BY_ID: 'admin/organizations/:organizationId/service-providers/:serviceProviderId',
        EDIT_SERVICE_PROVIDER: 'admin/organizations/:organizationId/service-providers/:serviceProviderId',
        LIST_ALL_ASSIGNED_LOCATIONS: 'admin/organizations/:organizationId/service-providers/:serviceProviderId/locations',
        SAVE_LOCATION: 'admin/organizations/:organizationId/service-providers/:serviceProviderId/locations',
        GET_ALL_USERS: 'user/roles',
        GET_ALL_USERS_BASED_ON_ROLE_ID: 'admin/organizations/:organizationId/roles/:roleId/users',
        GET_ALL_ASSIGNED_SERVICE_ADMIN: 'admin/organizations/:organizationId/service-providers/:serviceProviderId/roles/:roleId/users',
        GET_ASSIGNED_SUPER_ADMIN: '',
        GET_ASSIGNED_WORKER: '',
        GET_ASSIGNED_WORKER_ONLY: '',
        GET_LOCATION_BASED_ON_WORKER: '',
        GET_OLD_SUPER_VISOR: '',
        GET_NEW_SUPER_VISOR: '',
        UPDATE_ASSIGNED_SERVICE_ADMIN: 'admin/organizations/:organizationId/service-providers/:serviceProviderId/roles/:roleId/users ',
        GET_LOCATION_BASED_ON_USER: 'admin/organizations/:organizationId/service-providers/:serviceProviderId/roles/:roleId/users/:userId/locations',
        UPDATE_WORKER_LOCATIONS: 'admin/organizations/:organizationId/service-providers/:serviceProviderId/roles/:roleId/users/:userId/locations',
        GET_ALL_USER_UNDER_ORGANISATION_FOR_SP: 'admin/organizations/:organizationId/service-providers/:serviceProviderId/roles/:roleId/users/:userId/users',
        UPDATE_USER_UNDER_ORG: 'admin/organizations/:organizationId/service-providers/:serviceProviderId/roles/:roleId/users/:userId/users'
    },
    DYNAMIC_FORM_TEMPLATE: {
        SAVE: 'dfg/templates',
        LIST_ALL_TEMPLATES: 'dfg/templates',
        DELETE_TEMPLATE: 'dfg/templates/:templateId',
        LIST_TEMPLATE_TYPE: 'admin/template-types',
        FETCH_TEMPLATE_DETAILS: 'dfg/templates/:templateId',
        UPDATE: 'dfg/templates/:templateId',
        FETCH_FRAGMENTS_BY_TEMPLATE: 'dfg/templates/:templateId/fragments',
        FETCH_ALL_FRAGMENTS: 'dfg/fragments',
        ASSIGN_FRAGMENT_TEMPLATE: 'dfg/templates/:templateId/fragments',
        SAVE_TEMPLATE_ROUTE: 'dfg/templates/:templateId/fragments/:fragmentId/mapping',
        DELETE_FRAGMENT: 'dfg/templates/:templateId/fragments/:fragmentId',
        DELETE_ROUTE: 'dfg/templates/:templateId/fragments/:fragmentId',
        FETCH_FRAGMENT_JSON: 'dfg/fragments/:fragmentId',
        FETCH_TEMPLATE_ROUTE: 'dfg/templates/:templateId/fragments/:fragmentId/mapping',
        FETCH_ASSIGNED_FRAGMENT: 'dfg/templates/:templateId/fragments/:fragmentId',
        UPDATE_ASSIGNED_FRAGMENT: 'dfg/templates/:templateId/fragments/:fragmentId',
        FETCH_CURRENT_ASSOCIATION: 'dfg/templates/:templateId/template-association'

    },
    CUSTOMER: {
        LIST_DETAILS: 'dfg/templates/answers',
        DETAILS_SURVEY: 'dfg/templates/answers',
        LIST_FILTER: 'dfg/templates/answers',
        DELETE_SURVEY: 'dfg/templates/answers/:surveyId'
    },
    BASIC_CONFIG: {
        LIST_STATE: 'admin/states',
        SAVE_STATE: 'admin/states',
        DELETE_STATE: 'admin/states/:stateId',
        UPDATE_STATE: 'admin/states/:stateId',
        FETCH_STATE_BY_ID: 'admin/states/:stateId',
        DETAILS_SURVEY: 'dfg/templates/answers',
        DELETE_SURVEY: 'dfg/templates/answers/:surveyId',
        LIST_FILTER: 'dfg/templates/answers',

        LIST_DISTRICT: 'admin/districts',
        SAVE_DISTRICT: 'admin/districts',
        DELETE_DISTRICT: 'admin/districts/:districtId',
        UPDATE_DISTRICT: 'admin/districts/:districtId',
        FETCH_DISTRICT_BY_ID: 'admin/districts/:districtId',

        LIST_ITEM: 'admin/items',
        SAVE_ITEM: 'admin/items',
        UPDATE_ITEM: 'admin/items/:itemId',
        DELETE_ITEM: 'admin/items/:itemId',
        FETCH_ITEM_BY_ID: 'admin/items/:itemId',

        LIST_ITEM_SUBCATEGORIES: 'admin/item-sub-categories',
        SAVE_ITEM_SUBCATEGORIES: 'admin/item-sub-categories',
        UPDATE_ITEM_SUBCATEGORIES: 'admin/item-sub-categories/:itemId',
        DELETE_ITEM_SUBCATEGORIES: 'admin/item-sub-categories/:itemId',
        FETCH_ITEM_SUBCATEGORIES_BY_ID: 'admin/item-sub-categories/:itemId',

        SAVE_ITEM_SUB_CATEGORY: 'admin/items/:id/item-subcategories',
        FETCH_ITEM_SUB_CATEGORY_BY_ID: 'admin/items/:id/item-subcategories',
        DELETE_ITEM_SUB_CATEGORY_BY_ID: 'admin/items/:id/item-subcategories/:itemSubCategoryId',

        LIST_LSGI: 'admin/lsgis',
        SAVE_LSGI: 'admin/lsgis',
        DELETE_LSGI: 'admin/lsgis/:lsgisId',
        UPDATE_LSGI: 'admin/lsgis/:lsgisId',
        FETCH_LSGI_BY_ID: 'admin/lsgis/:lsgisId',

        LIST_DISTRICT_PANCHAYATH: 'admin/district-panchayaths',
        SAVE_DISTRICT_PANCHAYATH: 'admin/district-panchayaths',
        DELETE_DISTRICT_PANCHAYATH: 'admin/district-panchayaths/:districtPanchayathId',
        UPDATE_DISTRICT_PANCHAYATH: 'admin/district-panchayaths/:districtPanchayathId',
        FETCH_DISTRICT_PANCHAYATH_BY_ID: 'admin/district-panchayaths/:districtPanchayathId',

        LIST_BLOCK_PANCHAYATH: 'admin/block-panchayaths',
        SAVE_BLOCK_PANCHAYATH: 'admin/block-panchayaths',
        DELETE_BLOCK_PANCHAYATH: 'admin/block-panchayaths/:blockPanchayathId',
        UPDATE_BLOCK_PANCHAYATH: 'admin/block-panchayaths/:blockPanchayathId',
        FETCH_BLOCK_PANCHAYATH_BY_ID: 'admin/block-panchayaths/:blockPanchayathId',

        LIST_MCF: 'admin/mcfs',
        SAVE_MCF: 'admin/mcfs',
        DELETE_MCF: 'admin/mcfs/:mcfId',
        UPDATE_MCF: 'admin/mcfs/:mcfId'

    },
    WARD: {
        LIST_LSGI: 'admin/lsgis',
        LIST_STATE: 'admin/states',
        LIST_DISTRICTS: 'admin/districts',
        LIST_ALL_STATE: 'admin/states',
        LIST_ALL_ASSOCIATION_TYPE: 'admin/association-types',
        LIST_WARDS: 'admin/wards',
        FETCH_WARD_BY_ID: 'admin/wards/:id',
        FETCH_RA_BY_ID: 'admin/residential-associations/:id',
        ADD_WARD: 'admin/wards',
        LIST_RESIDENTIAL_ASSOCIATIONS: 'admin/residential-associations',
        LIST_FILTER: 'dfg/templates/answers',
        LIST_RA_DETAILS: 'dfg/templates/answers',
        FETCH_RESIDENTIAL_ASSOCIATION_BY_ID: 'admin/residential-associations/:id',
        FETCH_RESIDENTIAL_ASSOCIATION_DFG_BY_ID: 'dfg/templates/answers/:id',
        ADD_RESIDENTIAL_ASSOCIATION: 'admin/residential-associations'
    },
    QRCODE: {
        GENERATE_QR_CODE: 'qrcode/organizations/:organizationId'
    },
    SCHEDULE: {
        FETCH_CUSTOMERS: 'schedule/customers',
        FETCH_SCHEDULE_BY_ID: 'schedule/schedules/:id',
        FETCH_SCHEDULE: 'schedule/schedules',
        FETCH_ORGANIZATIONS: 'admin/organizations',
        FETCH_SERVICE_PROVIDERS: 'admin/organizations/:organizationId/service-providers',
        FETCH_WARDS: 'admin/organizations/:organizationId/service-providers/:serviceProviderId/locations',
        FETCH_SERVICE_WORKERS: 'admin/organizations/service-providers/:serviceProviderId/wards/:wardId/users',
        FETCH_SERVICES: 'admin/service-providers/:serviceProviderId/residenceCategories/:residenceCategoryId/service-configs',
        FETCH_SERVICE_INTERVALS: 'admin/service-providers/:serviceProviderId/residenceCategories/:residenceCategoryId/service-configs/:serviceConfigId/service-intervals',
        FETCH_TRADING_TYPES: 'admin/trading-types',
        FETCH_RESIDENCE_ASSOCIATIONS: 'admin/organizations/:organizationId/service-providers/:serviceProviderId/locations',
        SUBMIT_SCHEDULED_CUSTOMER: 'schedule/schedules/:scheduleId/customers',
        FETCH_RESIDENCE_TYPES: 'admin/residential-associations',
        POST_SCHEDULE: 'schedule/schedules',
        UPDATE_SCHEDULE: 'schedule/schedules/:id',
        FETCH_CUSTOMERS_BY_SCHEDULE_ID: 'schedule/schedules/:id/customers/:type',
        FETCH_HISTORY: 'schedule/schedules/:scheduleId/history',
        DELETE_SCHEDULE: 'schedule/schedules/:id',
        RESIDENCE_CATEGORIES: 'admin/residence-categories'
    },
    SPECIAL_SERVICE: {
        FETCH_SERVICES: 'schedule/special-service-requests',
        FETCH_SCHEDULE_DETAILS_BY_ID: 'schedule/special-service-requests/:specialServiceRequestId',
        PROCESS_SERVICE: 'schedule/special-service-requests/:specialServiceRequestId',
        PROCESS_SCHEDULE: 'schedule/special-service-requests/:specialServiceRequestId/schedule',
        ASSIGN_SERVICE_WORKER: 'schedule/special-service-requests/:specialServiceRequestId/supervisors/:supervisorId/service-workers/:serviceWorkerId'
    },
    SUBSCRIPTION_REQUEST: {
        LIST_SUBSCRIPTIONS: 'schedule/subscription-requests',
        PROCESS_SUBSCRIPTION: 'schedule/subscription-requests/:subscriptionId',
        ASSIGN_SERVICE_WORKER_IN_SUBSCRIPTION: 'schedule/subscription-requests/:subscriptionRequestId/supervisors/:supervisorId/service-workers/:serviceWorkerId'
    },
    LIST_PAYMENT: {
        LIST_PAYMENT: 'payment/payments'
    },
    LIST_SUBSCRIPTION: {
        LIST_SUBSCRIPTION: 'schedule/subscriptions'
    },
    LIST_SERVICE: {
        LIST_SERVICE: 'schedule/services',
        LIST_SERVICE_HISTORY_BY_ID: 'dfg/templates/answers'
    },
    DASHBOARD: {
        GET_CUSTOMER_COUNT: 'admin/dashboard/customer-count',
        GET_SERVICE_COUNT: 'admin/dashboard/service-count',
        TOTAL_CUSTOMERS_VS_PLAN_ENABLED_CUSTOMERS: 'admin/dashboard/chart/total-customers-vs-plan-enabled-customers',
        SERVICE_CREATED_VS_SERVICE_EXECUTED: 'admin/dashboard/chart/services-created-vs-services-executed',
        CHART_PIE_CUSTOMERS_REGISTERED: 'admin/dashboard/chart/customers-registered',
        TOTAL_WASTE_PER_CATEGORY: 'admin/dashboard/chart/total-waste-per-service',
        TIME_TAKEN_TO_SERVICE: 'admin/dashboard/chart/time-taken-to-service',
        TIME_TAKEN_TO_SERVICE_PER_CUSTOMER: 'admin/dashboard/chart/time-taken-to-service-per-customer'
    },
    COMPLAINT: {
        LIST_COMPLAINT: 'schedule/complaints',
        ASSIGN_SERVICE_WORKER: 'schedule/complaints/:complaintId/service-providers/:serviceProviderId/supervisors/:supervisorId/service-workers/:serviceWorkerId'
    },
    LIST_REPORTED_BUGS: {
        LIST_REPORTED_BUGS: 'user/report-a-bug'
    },
    LIST_INCIDENTS: 'user/incidents',
    RRF: {
        LIST_SALES: 'admin/organizations/rrf-sales',
        LIST_STOCK_IN: 'admin/organizations/rrf-stock-ins',
        LIST_RRF_SHREDDED: 'admin/rrf-shredding'

    },
    CKC: {
        LIST_SALES: 'admin/organizations/ckc-sales',
        LIST_PICKUP: 'admin/organizations/ckc-pickups'
    },
    COMPLAINT_CONFIG: {
        COMPLAINT_CONFIG: 'admin/complaint-configs',
        COMPLAINT_CONFIG_BYID: 'admin/complaint-configs/:complaintConfigId',
        COMPLAINT_CONFIG_SERVICE_CONFIG: 'admin/complaint-configs/:complaintConfigId/service-configs'
    },
    INCIDENT: {
        LIST_INCIDENT_CONFIG: 'admin/incident-configs',
        INCIDENT_CONFIG_BY_ID: 'admin/incident-configs/:incidentConfigId'
    },
    FACILITY: {
        LIST_ITEMS: 'admin/facility/:id/items'
    },
    DATA_ACCESS_PERMISSION: {
        ROLE_ASSIGNEE: 'user/roles/:roleId/users-data-access',
        USER_ROLE: 'user/users/:userId/users-data-access'
    }
};
