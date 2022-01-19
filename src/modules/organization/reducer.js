import { types as ActionTypes, hierarchyTypes as HierarchyTypes } from './actions';
import { REQUEST_STATUS, API_TYPES } from './constants';
import { formatCheckBoxesFromAPI, getPayloadData, formatFilterSearchKeys } from '../../utils/ApiUtils';
import _ from '../../utils/LodashUtils';


const formatAPIPrividersList = (data = []) => {
    let response = {};
    _.forEach(API_TYPES, function (value) {
        response[value] = _.filter(data, { type: value });
    });
    return response;
};

const formatOrganizationsAPIPrividers = (data = []) => {
    let response = {};
    _.forEach(API_TYPES, function (value) {
        let currentItem = _.find(data, (item) => item.apiProvider.type === value);
        response[value] = (typeof currentItem !== 'undefined') ? currentItem : {};
    });
    return response;
};

const formatData = (values) => {
    let invoiceGenerationDay = _.get(values, 'invoiceGenerationDay', null);
    let invoiceDueDay = _.get(values, 'invoiceDueDay', null);

    if (invoiceGenerationDay) {
        _.set(values, 'invoiceGenerationDay', { id: invoiceGenerationDay, name: invoiceGenerationDay });
    }
    if (invoiceDueDay) {
        _.set(values, 'invoiceDueDay', { id: invoiceDueDay, name: invoiceDueDay });
    }

    return values;
};

const initialState = {
    parentOrganizations: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    organizationTypes: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    organizationRoleTypes: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    apiProviders: {
        data: {},
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    filters: {
        selectedTab: 0,
        horizontalTabIndex: 0,
        verticalTabIndex: 0
    },
    commonHierarchy: {
        state: {
            data: [],
            requestInProgress: false,
            requestStatus: '',
            error: {}
        },
        district: {
            data: [],
            requestInProgress: false,
            requestStatus: '',
            error: {}
        },
        blockPanchayath: {
            data: [],
            requestInProgress: false,
            requestStatus: '',
            error: {}
        }, districtPanchayath: {
            data: [],
            requestInProgress: false,
            requestStatus: '',
            error: {}
        },
        lsgi: {
            data: [],
            requestInProgress: false,
            requestStatus: '',
            error: {}
        }

    },
    addNew: {
        isUpdate: false,
        organization: {},
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    addOrUpdateOrganization: {
        isUpdate: false,
        requestInProgress: false
    },
    listOrganisation: {
        data: [],
        searchKeys: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    listService: {
        data: [],
        searchKeys: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    deleteOrganization: {
        data: {},
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    assignUsers: {
        users: {},
        state: null,
        district: [],
        assignedUsers: false
    },
    assignUsersList: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    updateAssignUsers: {
        data: {},
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    organizationAssignedUsers: {
        data: {},
        requestInProgress: false
    },
    loadUserGroupAssignUsers: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    emailApiProvider: {
        formData: [],
        requestInProgress: false,
        error: {}
    },
    smsApiProvider: {
        formData: [],
        requestInProgress: false,
        error: {}
    },
    notificationApiProvider: {
        formData: [],
        requestInProgress: false,
        error: {}
    },
    paymentGatewayApiProvider: {
        formData: [],
        requestInProgress: false,
        error: {}
    },
    updateApiProvider: {
        formData: [],
        requestInProgress: false,
        error: {}
    },
    postApiProvider: {
        formData: [],
        requestInProgress: false,
        error: {}
    },
    assignModuleList: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    assignModulesView: {

    },
    roleAssignModulesView: {
        Roles: {}
    },
    roleList: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    roleAssignModuleList: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    saveRoleAssignModuleList: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    saveModuleList: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    // templates
    listTemplates: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    listSelectedTemplated: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    saveTemplatesInList: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {},
        isSaved: false
    },
    templateTypes: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    templateByTypeId: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    serviceProvider: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        error: {}
    },
    commonTemplate: {
        selected: 0
    },
    commonTemplateForServiceProvider: {
        selected: 0
    },
    listServiceProvidsers: {
        data: [],
        pageSize: 10,
        pageNo: 0,
        totalCount: 0,
        requestStatus: '',
        requestInProgress: false,
        errors: {}
    },
    serviceProviderById: {
        data: {},
        requestInProgress: false,
        requestStatus: '',
        error: {},
        serviceProviderTypeName: ''

    },
    assignedLocation: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        errors: {}
    },
    assignLocationView: {

    },
    allRolesForOrg: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        errors: {}
    },
    usersByRoleId: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        errors: {}
    },
    getAssignedServiceAdmin: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        errors: {}
    },
    assignedServiceAdminView: {
        formData: {}
    },
    getAssignedSuperVisorAdmin: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        errors: {}
    },
    getAssignedWokers: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        errors: {}
    },
    assignedWorkersOnly: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        errors: {}
    },
    locationBasedOnWorker: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        errors: {}
    },
    oldSuperVisor: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        errors: {}
    },
    newSuperVisor: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        errors: {}
    },
    getAssignedServiceAdminForDropDown: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        errors: {}
    },
    getLocationUnderUserRequest: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        errors: {}
    },
    getLocationUnderUserRequestView: {
        formData: {}

    },
    getAllUserUnderorganization: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        errors: {}
    },
    getAllUserUnderorganizationView: {

    },
    assignOrgRoleView: {
        formData: {}
    },
    serviceProviderListId: {
        data: [],
        requestInProgress: false
    },
    wardsByProviderId: {
        data: [],
        requestStatus: false
    },
    getGtBasedOnWardId: {
        data: {},
        requestInProgress: false
    },
    customersBasedOnGt: {
        data: [],
        requestInProgress: false
    },
    getAllSuperVisors: {
        data: [],
        requestInProgress: false
    },
    getToGtWithProviderId: {
        data: [],
        requestInProgress: false,
        formateDataForGT: []
    },
    currentFilterState: {},
    currentFilterStateForService: {},
    currentFilterStateForOrgs: {},
    listFilterDataForOrgs: {},
    listResidenceCategory: {
        data: [],
        requestInProgress: false
    },
    listServiceCategory: {
        data: [],
        requestInProgress: false
    },
    listServiceType: {
        data: [],
        requestInProgress: false
    },
    listPaymentCollection: {
        data: [],
        requestInProgress: false
    },
    listPaymentIntervalDetails: {
        data: [],
        requestInProgress: false
    },
    listRateType: {
        data: [],
        requestInProgress: false
    },
    listServiceIntervel: {
        data: [],
        requestInProgress: false

    },
    listBundledOrServiceConfig: {
        data: [],
        requestInProgress: false
    },
    listServiceChargeSlab: {
        data: [],
        requestInProgress: false
    },
    listServiceById: {
        data: {},
        requestInProgress: false
    },
    getUuids: {
        uuids: []
    },
    reAssignSuperVisor: {
        TosuperVisor: null,
        toGt: null,
        superVisor: null
    },
    reAssignGT: {
        wards: null,
        gt: null,
        superVisor: null,
        toGt: null,
        allSelected: false,
        customersList: []
    },
    isSuperVisorSaved: {
        isSaved: false
    },
    isReAssignGTSaved: {
        isSaved: true
    },
    assignSuperVisorToWorkerForm: {
        role: null,
        user: null,
        formData: {}
    },
    swSuperVisorForWard: {
        data: [],
        requestInProgress: false
    },
    serviceWorkerFromSwSuperVisor: {
        data: [],
        requestInProgress: false
    },
    assignCustomerToServiceWorker: {
        requestInProgress: false,
        data: [],
        searchKeys: []
    },
    listVendorDetails: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: []
    },
    fetchVendorById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    },
    listItems: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    },
    listItemType: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    },
    assignOrganization: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    },
    additionalBasicDetails: {
        requestInProgress: false,
        data: {}
    },
    contactFormDfgLoaded: false,
    additionalBasicDetailsWards: {
        data: [],
        requestInProgress: false
    },
    assignRole: {
        data: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: []
    },

    listComplaintEscalation: {
        data: [],
        fullData: [],
        requestInProgress: false,
        requestStatus: '',
        searchKeys: [],
        error: {}
    },
    fetchComplaintEscalationById: {
        data: {},
        requestInProgress: false,
        requestStatus: ''
    },
    listComplaints: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    },
    listRoles: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    },
    listTemplate: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    },
    listTemplateType: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    },
    listAllServiceProviders: {
        data: [],
        requestInProgress: false,
        requestStatus: ''
    }
};
//to get the selectedUUids
const getSelectedUuids = (uuidArray, customerArray) => {
    let arrayIndex = uuidArray.map((item) => Number(item));
    let selectedCustomers = _.filter(customerArray, (row, index) => {
        return arrayIndex.includes(index);
    });
    let customerUuidArray = selectedCustomers?.map((item) => {
        return item.id;
    });
    return customerUuidArray;
};

const filterSuperVisorArray = (data = []) => {
    let assignedSuperVisors = data?.filter((item) => {
        return item.member === true;
    });
    return assignedSuperVisors;
};

let listVendorResponse = {};
let listOrganizationResponse = {};
let listComplaintEscalationResponse = {};
let listServiceProviders = {};
let listTemplateResponse = {};
let RoleUserPayload = {}, AssignUserPayload = {};
let listAssignCustomerToServiceWorker = {};
const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.ALL_SERVICE_PROVIDER_DROPDOWN_REQUEST:
            return Object.assign({}, state, {
                listAllServiceProviders: {
                    ...state.listAllServiceProviders,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.RESET_ORG_TAB_INDEX:
            return Object.assign({}, state, {
                commonTemplate: {
                    selected: 0
                }
            });

        case ActionTypes.ALL_SERVICE_PROVIDER_DROPDOWN_SUCCESS:
            return Object.assign({}, state, {
                listAllServiceProviders: {
                    ...state.listAllServiceProviders,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.ALL_SERVICE_PROVIDER_DROPDOWN_FAILURE:
            return Object.assign({}, state, {
                listAllServiceProviders: {
                    ...state.listAllServiceProviders,
                    requestInProgress: false,
                    data: []
                }
            });

        case ActionTypes.GET_ALL_ITEM_TYPE_FOR_ASSIGN_VENDOR_REQUEST:
            return Object.assign({}, state, {
                listItemType: {
                    ...state.listItemType,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.GET_ALL_ITEM_TYPE_FOR_ASSIGN_VENDOR_SUCCESS:
            return Object.assign({}, state, {
                listItemType: {
                    ...state.listItemType,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.GET_ALL_ITEM_TYPE_FOR_ASSIGN_VENDOR_FAILURE:
            return Object.assign({}, state, {
                listItemType: {
                    ...state.listItemType,
                    requestInProgress: false,
                    data: []
                }
            });

        case ActionTypes.GET_ALL_ITEM_FOR_ASSIGN_VENDOR_REQUEST:
            return Object.assign({}, state, {
                listItems: {
                    ...state.listItems,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.GET_ALL_ITEM_FOR_ASSIGN_VENDOR_SUCCESS:
            return Object.assign({}, state, {
                listItems: {
                    ...state.listItems,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.GET_ALL_ITEM_FOR_ASSIGN_VENDOR_FAILURE:
            return Object.assign({}, state, {
                listItems: {
                    ...state.listItems,
                    requestInProgress: false,
                    data: []
                }
            });

        case ActionTypes.FETCH_VENDOR_DETAILS_REQUEST:
            return Object.assign({}, state, {
                listVendorDetails: {
                    ...initialState.listVendorDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_VENDOR_DETAILS_SUCCESS:
            listVendorResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listVendorDetails: {
                    ...state.listVendorDetails,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listVendorResponse, 'searchKeys', [])),

                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_VENDOR_DETAILS_FAILURE:
            return Object.assign({}, state, {
                listVendorDetails: {
                    ...initialState.listVendorDetails,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_VENDOR_DETAILS_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchVendorById: {
                    ...state.fetchVendorById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_VENDOR_DETAILS_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                fetchVendorById: {
                    ...state.fetchVendorById,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_VENDOR_DETAILS_BY_ID_FAILURE:
            return Object.assign({}, state, {
                fetchVendorById: {
                    ...state.fetchVendorById,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.CLEAR_VENDOR_DETAILS_REDUCER:
            return Object.assign({}, state, {
                fetchVendorById: {}
            });

        case ActionTypes.CLEAN_ASSIGN_CUSTOMER_TO_SERVICE_WORKER:
            return Object.assign({}, state, {
                assignCustomerToServiceWorker: {}
            });

        case ActionTypes.FETCH_ORGANIZATION_ASSIGN_CUSTOMER_TO_SERVICE_WORKER_REQUEST:
            return Object.assign({}, state, {
                assignCustomerToServiceWorker: {
                    data: [],
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.FETCH_ORGANIZATION_ASSIGN_CUSTOMER_TO_SERVICE_WORKER_SUCCESS:
            listAssignCustomerToServiceWorker = getPayloadData(action.payload, []);
            return Object.assign({}, state, {
                assignCustomerToServiceWorker: {
                    data: _.get(listAssignCustomerToServiceWorker, 'content', []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_ORGANIZATION_ASSIGN_CUSTOMER_TO_SERVICE_WORKER_FAILURE:
            return Object.assign({}, state, {
                assignCustomerToServiceWorker: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.LIST_RESET_BUNDLED_SERVICE_CONFIG:
            return Object.assign({}, state, {
                listBundledOrServiceConfig: {
                }
            });
        case ActionTypes.GET_SW_SUPERVISOR_FOR_WARD_REQUEST:
            return Object.assign({}, state, {
                swSuperVisorForWard: {
                    data: [],
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_SW_SUPERVISOR_FOR_WARD_SUCCESS:
            return Object.assign({}, state, {
                swSuperVisorForWard: {
                    data: filterSuperVisorArray(getPayloadData(action.payload, [])),
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_SW_SUPERVISOR_FOR_WARD_FAILURE:
            return Object.assign({}, state, {
                swSuperVisorForWard: {
                    data: [],
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_SERVICE_WORKER_FROM_SW_SUPERVISOR_REQUEST:
            return Object.assign({}, state, {
                serviceWorkerFromSwSuperVisor: {
                    data: [],
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_SERVICE_WORKER_FROM_SW_SUPERVISOR_SUCCESS:
            return Object.assign({}, state, {
                serviceWorkerFromSwSuperVisor: {
                    // that set in SET_TO_GT
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                    // formateDataForGT: formaGTArray(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.GET_SERVICE_WORKER_FROM_SW_SUPERVISOR_FAILURE:
            return Object.assign({}, state, {
                serviceWorkerFromSwSuperVisor: {
                    data: [],
                    requestInProgress: false
                }
            });

        case ActionTypes.RESET_ORG_USER:
            return Object.assign({}, state, {
                assignUsersList: {
                },
                assignUsers: {

                }
            });

        case ActionTypes.GET_SUPER_VISORS_REQUEST:
            return Object.assign({}, state, {
                getAllSuperVisors: {
                    data: [],
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_SUPER_VISORS_SUCCESS:
            return Object.assign({}, state, {
                getAllSuperVisors: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_SUPER_VISORS_FAILURE:
            return Object.assign({}, state, {
                getAllSuperVisors: {
                    data: [],
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_TO_GT_WITH_SUPER_VISOR_ID_REQUEST:
            return Object.assign({}, state, {
                getToGtWithProviderId: {
                    data: [],
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_TO_GT_WITH_SUPER_VISOR_ID_SUCCESS:
            return Object.assign({}, state, {
                getToGtWithProviderId: {
                    // that set in SET_TO_GT
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                    // formateDataForGT: formaGTArray(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.GET_TO_GT_WITH_SUPER_VISOR_ID_FAILURE:
            return Object.assign({}, state, {
                getToGtWithProviderId: {
                    data: [],
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_UUID_OF_CUSTOMERS:
            return Object.assign({}, state, {
                getUuid: {
                    uuids: getSelectedUuids(action.payload.uuidArray, action.payload.customerArray)
                }
            });
        //to get wards based on provider id
        case ActionTypes.GET_WARDS_UNDER_SERVICE_PROVIDER_ID_REQUEST:
            return Object.assign({}, state, {
                wardsByProviderId: {
                    data: [],
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_WARDS_UNDER_SERVICE_PROVIDER_ID_SUCCESS:
            return Object.assign({}, state, {
                wardsByProviderId: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_WARDS_UNDER_SERVICE_PROVIDER_ID_FAILURE:
            return Object.assign({}, state, {
                wardsByProviderId: {
                    data: [],
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_GT_BASED_ON_WARD_ID_REQUEST:
            return Object.assign({}, state, {
                getGtBasedOnWardId: {
                    data: [],
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_GT_BASED_ON_WARD_ID_SUCCESS:
            return Object.assign({}, state, {
                getGtBasedOnWardId: {
                    //setting data in SET_FROM_GT
                    // data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_GT_BASED_ON_WARD_ID_FAILURE:
            return Object.assign({}, state, {
                getGtBasedOnWardId: {
                    data: [],
                    requestInProgress: false
                }
            });


        case ActionTypes.GET_CUSTOMERS_BASED_ON_GT_ID_REQUEST:
            return Object.assign({}, state, {
                customersBasedOnGt: {
                    data: [],
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_CUSTOMERS_BASED_ON_GT_ID_SUCCESS:
            return Object.assign({}, state, {
                customersBasedOnGt: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_CUSTOMERS_BASED_ON_GT_ID_FAILURE:
            return Object.assign({}, state, {
                customersBasedOnGt: {
                    data: [],
                    requestInProgress: false
                }
            });
        case ActionTypes.RESET_SERVICE:
            return Object.assign({}, state, {
                listServiceById: {
                }
            });
        case ActionTypes.EMPTY_SLAB_ARRAY:
            return Object.assign({}, state, {
                listServiceChargeSlab: {
                }
            });

        case ActionTypes.SET_FILTER:
            return Object.assign({}, state, {
                filters: {
                    ...state.filters,
                    ...action.payload.data
                }
            });
        case ActionTypes.FETCH_SERVICE_PROVIDER_LIST_REQUEST:
            return Object.assign({}, state, {
                serviceProviderListId: {
                    ...state.serviceProviderListId,
                    data: [],
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_SERVICE_PROVIDER_LIST_SUCCESS:
            return Object.assign({}, state, {
                serviceProviderListId: {
                    ...state.serviceProviderListId,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case ActionTypes.FETCH_SERVICE_PROVIDER_LIST_FAILURE:
            return Object.assign({}, state, {
                serviceProviderListId: {
                    ...state.serviceProviderListId,
                    data: [],
                    requestInProgress: true
                }
            });
        case ActionTypes.STORE_JSON_DATA_FOR_ORGS:
            return Object.assign({}, state, {
                listFilterDataForOrgs: {
                    ...state.listFilterDataForOrgs,
                    ...action.payload.data
                }
            });

        case ActionTypes.STORE_JSON_DATA_FOR_SERVICE:
            return Object.assign({}, state, {
                listFilterDataForService: {
                    ...state.listFilterDataForOrgs,
                    ...action.payload.data
                }
            });

        case ActionTypes.RESET_ORGANIZATION_ROLE_FORM_ASSIGN:
            return Object.assign({}, state, {
                assignOrgRoleView: {
                    ...initialState.assignOrgRoleView,
                    formData: {}
                },
                loadUserGroupAssignUsers: {
                    data: []
                }
            });
        case ActionTypes.RESET_CHECKBOX_WORKER_LOCATION_ARRAY:
            return Object.assign({}, state, {
                getLocationUnderUserRequest: {
                    data: [],
                    requestInProgress: false
                }
            });
        case ActionTypes.RESET_CHECKBOX_SUPERVISOR_TO_WORKER_LOCATION_ARRAY:
            return Object.assign({}, state, {
                getAllUserUnderorganization: {
                    data: [],
                    requestInProgress: false
                }

            });
        case ActionTypes.RESET_SERVICE_ADMIN_FORM:
            return Object.assign({}, state, {
                assignedServiceAdminView: {
                    ...initialState.assignedServiceAdminView
                },
                getAssignedServiceAdmin: {
                    ...initialState.getAssignedServiceAdmin

                },
                getAllUserUnderorganizationView: {
                    ...initialState.getAllUserUnderorganizationView
                },
                getAllUserUnderorganization: {
                    ...initialState.getAllUserUnderorganization

                },
                getLocationUnderUserRequestView: {
                    ...initialState.getLocationUnderUserRequestView
                },
                getLocationUnderUserRequest: {
                    ...initialState.getLocationUnderUserRequest

                }
            });

        case ActionTypes.RESET_SUPER_VISOR_TO_WORKER_FORM:
            return Object.assign({}, state, {
                assignSuperVisorToWorkerForm: {
                    ...initialState.assignSuperVisorToWorkerForm
                }
            });


        case ActionTypes.GET_ALL_USER_UNDER_ORG_FOR_SP_REQUEST:
            return Object.assign({}, state, {
                getAllUserUnderorganization: {
                    data: [],
                    requestInProgress: true
                }
            });

        case ActionTypes.GET_ALL_USER_UNDER_ORG_FOR_SP_SUCCESS:
            return Object.assign({}, state, {
                getAllUserUnderorganization: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                },
                assignSuperVisorToWorkerForm: {
                    ...state.assignSuperVisorToWorkerForm,
                    formData: formatCheckBoxesFromAPI(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.SET_WORKER_SUPERWISER:
            return Object.assign({}, state, {
                assignSuperVisorToWorkerForm: {
                    ...state.assignSuperVisorToWorkerForm,
                    ...action.payload.data
                }
            });
        case ActionTypes.GET_ALL_USER_UNDER_ORG_FOR_SP_FAILURE:
            return Object.assign({}, state, {
                getAllUserUnderorganization: {
                    data: [],
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_LOCATIONS_UNDER_USER_REQUEST:
            return Object.assign({}, state, {
                getLocationUnderUserRequest: {
                    data: [],
                    requestInProgress: true
                }
            });

        case ActionTypes.GET_LOCATIONS_UNDER_USER_SUCCESS:
            return Object.assign({}, state, {
                getLocationUnderUserRequest: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                },
                getLocationUnderUserRequestView: {
                    ...state.getLocationUnderUserRequestView,
                    ...state.assignedLocationView,
                    formData: formatCheckBoxesFromAPI(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.SET_ROLE_USER: {
            RoleUserPayload = action?.payload?.data;
            return Object.assign({}, state, {
                getLocationUnderUserRequestView: {
                    ...state.getLocationUnderUserRequestView,
                    [_.get(RoleUserPayload, 'type', '')]: getPayloadData(action.payload, {})
                },
                assignedServiceAdminView: {
                    ...state.assignedServiceAdminView,
                    [_.get(RoleUserPayload, 'type', '')]: getPayloadData(action.payload, {})
                },
                roleAssignModulesView: {
                    ...state.roleAssignModulesView,
                    [_.get(RoleUserPayload, 'type', '')]: getPayloadData(action.payload, {})
                },
                assignOrgRoleView: {
                    ...state.assignOrgRoleView,
                    [_.get(RoleUserPayload, 'type', '')]: getPayloadData(action.payload, {})
                }
            });
        }
        case ActionTypes.GET_LOCATIONS_UNDER_USER_FAILURE:
            return Object.assign({}, state, {
                getLocationUnderUserRequest: {
                    data: [],
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_ASSIGNED_SERVICE_ADMIN_REQUEST_DROP_DOWN:
            return Object.assign({}, state, {
                getAssignedServiceAdminForDropDown: {
                    data: [],
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_ASSIGNED_SERVICE_ADMIN_SUCCESS_DROP_DOWN:
            return Object.assign({}, state, {
                getAssignedServiceAdminForDropDown: {
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_ASSIGNED_SERVICE_ADMIN_FAILURE_DROP_DOWN:
            return Object.assign({}, state, {
                getAssignedServiceAdminForDropDown: {
                    data: [],
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_ASSIGNED_LOCATIONS_REQUEST:
            return Object.assign({}, state, {
                assignedLocation: {
                    data: [],
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_ASSIGNED_LOCATIONS_SUCCESS:
            return Object.assign({}, state, {
                assignedLocation: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                },
                assignedLocationView: {
                    ...state.assignedLocationView,
                    formData: formatCheckBoxesFromAPI(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.GET_ASSIGNED_LOCATIONS_FAILURE:
            return Object.assign({}, state, {
                assignedLocation: {
                    data: [],
                    requestInProgress: false
                }
            });


        case ActionTypes.GET_LOCATION_BASED_ON_WORKER_REQUEST:
            return Object.assign({}, state, {
                locationBasedOnWorker: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.GET_LOCATION_BASED_ON_WORKER_SUCCESS:
            return Object.assign({}, state, {
                locationBasedOnWorker: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                },
                assignLocationViewBasedOnWorker: {
                    ...state.assignLocationViewBasedOnWorker,
                    formData: formatCheckBoxesFromAPI(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.GET_LOCATION_BASED_ON_WORKER_FAILURE:
            return Object.assign({}, state, {
                locationBasedOnWorker: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });

        case ActionTypes.GET_ALL_ROLES_REQUEST:
            return Object.assign({}, state, {
                allRolesForOrg: {
                    ...initialState.allRolesForOrg,
                    requestInProgress: true
                }
            });
        case ActionTypes.GET_ALL_ROLES_SUCCESS:
            return Object.assign({}, state, {
                allRolesForOrg: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case ActionTypes.GET_ALL_ROLES_FAILURE:
            return Object.assign({}, state, {
                allRolesForOrg: {
                    ...initialState.allRolesForOrg
                }
            });


        case ActionTypes.LIST_RESIDENCE_CATEGORY_REQUEST:
            return Object.assign({}, state, {
                listResidenceCategory: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.LIST_RESIDENCE_CATEGORY_SUCCESS:
            return Object.assign({}, state, {
                listResidenceCategory: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.LIST_RESIDENCE_CATEGORY_FAILURE:
            return Object.assign({}, state, {
                listResidenceCategory: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });

        case ActionTypes.LIST_SERVICE_BY_ID_REQUEST:
            return Object.assign({}, state, {
                listServiceById: {
                    data: [],
                    requestInProgress: true,
                    requestStatus: '',
                    errors: {}
                }
            });
        case ActionTypes.LIST_SERVICE_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                listServiceById: {
                    data: formatData(getPayloadData(action.payload, [])),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    errors: {}
                }
            });
        case ActionTypes.LIST_SERVICE_BY_ID_FAILURE:
            return Object.assign({}, state, {
                listServiceById: {
                    data: {},
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });

        case ActionTypes.LIST_SERVICE_CHARGE_SLAB_REQUEST:
            return Object.assign({}, state, {
                listServiceChargeSlab: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.LIST_SERVICE_CHARGE_SLAB_SUCCESS:
            return Object.assign({}, state, {
                listServiceChargeSlab: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.LIST_SERVICE_CHARGE_SLAB_FAILURE:
            return Object.assign({}, state, {
                listServiceChargeSlab: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });

        case ActionTypes.LIST_RATE_TYPE_REQUEST:
            return Object.assign({}, state, {
                listRateType: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.LIST_RATE_TYPE_SUCCESS:
            return Object.assign({}, state, {
                listRateType: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.LIST_RATE_TYPE_FAILURE:
            return Object.assign({}, state, {
                listRateType: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });

        case ActionTypes.LIST_SERVICE_INTERVEL_REQUEST:
            return Object.assign({}, state, {
                listServiceIntervel: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.LIST_SERVICE_INTERVEL_SUCCESS:
            return Object.assign({}, state, {
                listServiceIntervel: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.LIST_SERVICE_INTERVEL_FAILURE:
            return Object.assign({}, state, {
                listServiceIntervel: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });

        case ActionTypes.LIST_SERVICE_CATEGORY_REQUEST:
            return Object.assign({}, state, {
                listServiceeCategory: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.LIST_SERVICE_CATEGORY_SUCCESS:
            return Object.assign({}, state, {
                listServiceCategory: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.LIST_SERVICE_CATEGORY_FAILURE:
            return Object.assign({}, state, {
                listServiceCategory: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });

        case ActionTypes.LIST_SERVICE_TYPE_REQUEST:
            return Object.assign({}, state, {
                listServiceType: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.LIST_SERVICE_TYPE_SUCCESS:
            return Object.assign({}, state, {
                listServiceType: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    errors: {}
                }
            });
        case ActionTypes.LIST_SERVICE_TYPE_FAILURE:
            return Object.assign({}, state, {
                listServiceType: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });

        case ActionTypes.LIST_BUNDLED__SERVICE_CONFIG_REQUEST:
            return Object.assign({}, state, {
                listBundledOrServiceConfig: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.LIST_BUNDLED__SERVICE_CONFIG_SUCCESS:
            return Object.assign({}, state, {
                listBundledOrServiceConfig: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    errors: {}
                }
            });
        case ActionTypes.LIST_BUNDLED__SERVICE_CONFIG_FAILURE:
            return Object.assign({}, state, {
                listBundledOrServiceConfig: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });


        case ActionTypes.LIST__SERVICE_CONFIG_REQUEST:
            return Object.assign({}, state, {
                listBundledOrServiceConfig: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.LIST__SERVICE_CONFIG_SUCCESS:
            return Object.assign({}, state, {
                listBundledOrServiceConfig: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    errors: {}
                }
            });
        case ActionTypes.LIST__SERVICE_CONFIG_FAILURE:
            return Object.assign({}, state, {
                listBundledOrServiceConfig: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });


        case ActionTypes.LIST_PAYMENT_COLLECTION_REQUEST:
            return Object.assign({}, state, {
                listPaymentCollection: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.LIST_PAYMENT_COLLECTION_SUCCESS:
            return Object.assign({}, state, {
                listPaymentCollection: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    errors: {}
                }
            });
        case ActionTypes.LIST_PAYMENT_COLLECTION_FAILURE:
            return Object.assign({}, state, {
                listPaymentCollection: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });

        case ActionTypes.LIST_PAYMENT_INTERVAL_REQUEST:
            return Object.assign({}, state, {
                listPaymentIntervalDetails: {
                    data: [],
                    requestInProgress: false

                }
            });
        case ActionTypes.LIST_PAYMENT_INTERVAL_SUCCESS:
            return Object.assign({}, state, {
                listPaymentIntervalDetails: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false

                }
            });
        case ActionTypes.LIST_PAYMENT_INTERVAL_FAILURE:
            return Object.assign({}, state, {
                listPaymentIntervalDetails: {
                    data: [],
                    requestInProgress: false

                }
            });

        case ActionTypes.GET_OLD_SUPER_VISOR_REQUEST:
            return Object.assign({}, state, {
                oldSuperVisor: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.GET_OLD_SUPER_VISOR_SUCCESS:
            return Object.assign({}, state, {
                oldSuperVisor: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    errors: {}
                }
            });
        case ActionTypes.GET_OLD_SUPER_VISOR_FAILURE:
            return Object.assign({}, state, {
                oldSuperVisor: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });

        case ActionTypes.GET_NEW_SUPER_VISOR_REQUEST:
            return Object.assign({}, state, {
                oldSuperVisor: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.GET_NEW_SUPER_VISOR_SUCCESS:
            return Object.assign({}, state, {
                oldSuperVisor: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.GETNEW_SUPER_VISOR_FAILURE:
            return Object.assign({}, state, {
                oldSuperVisor: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });

        case ActionTypes.GET_ASSIGNED_WORKERS_ONLY_REQUEST:
            return Object.assign({}, state, {
                assignedWorkersOnly: {
                    data: [],
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.GET_ASSIGNED_WORKERS_ONLY_SUCCESS:
            return Object.assign({}, state, {
                assignedWorkersOnly: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    errors: {}
                }
            });
        case ActionTypes.GET_ASSIGNED_WORKERS_ONLY_FAILURE:
            return Object.assign({}, state, {
                assignedWorkersOnly: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });


        case ActionTypes.GET_USER_BASED_ON_ROLE_ID_REQUEST:
            return Object.assign({}, state, {
                usersByRoleId: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.GET_USER_BASED_ON_ROLE_ID_SUCCESS:
            return Object.assign({}, state, {
                usersByRoleId: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.GET_USER_BASED_ON_ROLE_ID_FAILURE:
            return Object.assign({}, state, {
                usersByRoleId: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });


        case ActionTypes.GET_ASSIGNED_SERVICE_ADMIN_REQUEST:
            return Object.assign({}, state, {
                getAssignedServiceAdmin: {
                    data: [],
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.GET_ASSIGNED_SERVICE_ADMIN_SUCCESS:
            return Object.assign({}, state, {
                getAssignedServiceAdmin: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                },
                assignedServiceAdminView: {
                    ...state.assignedServiceAdminView,
                    formData: formatCheckBoxesFromAPI(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.GET_ASSIGNED_SERVICE_ADMIN_FAILURE:
            return Object.assign({}, state, {
                getAssignedServiceAdmin: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });

        case ActionTypes.GET_ASSIGNED_SUPER_VISOR_REQUEST:
            return Object.assign({}, state, {
                getAssignedSuperVisorAdmin: {
                    data: [],
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.GET_ASSIGNED_SUPER_VISOR_SUCCESS:
            return Object.assign({}, state, {
                getAssignedSuperVisorAdmin: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    errors: {}
                }
            });
        case ActionTypes.GET_ASSIGNED_SUPER_VISOR_FAILURE:
            return Object.assign({}, state, {
                getAssignedSuperVisorAdmin: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });

        case ActionTypes.GET_ASSIGNED_WORKERS_REQUEST:
            return Object.assign({}, state, {
                getAssignedWokers: {
                    data: [],
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });
        case ActionTypes.GET_ASSIGNED_WORKERS_SUCCESS:
            return Object.assign({}, state, {
                getAssignedWokers: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    errors: {}
                }
            });
        case ActionTypes.GET_ASSIGNED_WORKERS_FAILURE:
            return Object.assign({}, state, {
                getAssignedWokers: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    errors: {}
                }
            });

        case ActionTypes.GET_SERVICE_PROVIDERS_BY_ID_REQUEST:
            return Object.assign({}, state, {
                serviceProviderById: {
                    data: {},
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED,
                    serviceProviderTypeName: ''

                }
            });
        case ActionTypes.GET_SERVICE_PROVIDERS_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                serviceProviderById: {
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    serviceProviderTypeName: getPayloadData(action.payload, {})?.serviceProviderType?.name
                }
            });

        case ActionTypes.GET_ASSIGNED_LOCATION_REQUEST:
            return Object.assign({}, state, {
                assignedLocation: {
                    data: [],
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.GET_ASSIGNED_LOCATION_SUCCESS:
            return Object.assign({}, state, {
                assignedLocation: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                },
                assignLocationView: {
                    ...state.assignLocationView,
                    formData: formatCheckBoxesFromAPI(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.GET_ASSIGNED_LOCATION_FAILURE:
            return Object.assign({}, state, {
                assignedLocation: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }

            });


        case ActionTypes.GET_SERVICE_PROVIDERS_BY_ID_FAILURE:
            return Object.assign({}, state, {
                serviceProviderById: {
                    data: {},
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.LIST_SERVICE_PROVIDER_REQUEST:
            return Object.assign({}, state, {
                listServiceProvidsers: {
                    data: [],
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.LIST_SERVICE_PROVIDER_SUCCESS:
            listServiceProviders = getPayloadData(action.payload, []);
            return Object.assign({}, state, {
                listServiceProvidsers: {
                    data: _.get(listServiceProviders, 'content', []),
                    pageSize: _.get(listServiceProviders, 'pageable.pageSize', 0),
                    pageNo: _.get(listServiceProviders, 'pageable.pageNumber', 0),
                    totalCount: _.get(listServiceProviders, 'totalElements', 0),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.LIST_SERVICE_PROVIDER_FAILURE:
            return Object.assign({}, state, {
                listServiceProvidsers: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        // case ActionTypes.SET_ORGANIZATION_DETAILS:
        //     return Object.assign({}, state, {
        //         addNew: {
        //             ...state.addNew,
        //             organization: {
        //                 ...action.payload.data
        //             }
        //         }
        //     });
        case ActionTypes.SET_TAB_INDEX_FOR_SERVICE_PROVIDER:
            return Object.assign({}, state, {
                commonTemplateForServiceProvider: {
                    selected: action.payload.data
                }
            });
        case ActionTypes.SET_TAB_INDEX:
            return Object.assign({}, state, {
                commonTemplate: {
                    selected: action.payload.data
                }
            });
        case ActionTypes.FETCH_ORGANIZATION_DETAILS_REQUEST:
            return Object.assign({}, state, {
                addNew: {
                    ...initialState.addNew,
                    requestInProgress: true
                },
                addOrUpdateOrganization: {
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ORGANIZATION_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                addNew: {
                    ...state.addNew,
                    organization: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                },
                addOrUpdateOrganization: {
                    isUpdate: false,
                    requestInProgress: false
                }
            });
        case ActionTypes.FETCH_ORGANIZATION_DETAILS_FAILURE:
            return Object.assign({}, state, {
                addNew: {
                    ...state.addNew,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.FETCH_CHK_USER_ORGANIZATION_REQUEST:
            return Object.assign({}, state, {
                assignUsersList: {
                    ...initialState.assignUsersList,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_CHK_USER_ORGANIZATION_SUCCESS:
            return Object.assign({}, state, {
                assignUsersList: {
                    ...state.assignUsersList,
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                },
                assignUsers: {
                    ...state.assignUsers,
                    users: formatCheckBoxesFromAPI(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.SET_STATE_OR_DISTRICT:
            AssignUserPayload = action.payload?.data;
            return Object.assign({}, state, {
                assignUsers: {
                    ...state.assignUsers,
                    district: _.get(AssignUserPayload, 'type', '') === 'state' ? [] : state.assignUsers.district,
                    [_.get(AssignUserPayload, 'type', '')]: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.FETCH_CHK_USER_ORGANIZATION_FAILURE:
            return Object.assign({}, state, {
                assignUsersList: {
                    ...state.assignUsersList,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.UPDATE_CHK_USER_ORGANIZATION_REQUEST:
            return Object.assign({}, state, {
                updateAssignUsers: {
                    ...initialState.updateAssignUsers,
                    requestInProgress: true
                }
            });
        case ActionTypes.UPDATE_CHK_USER_ORGANIZATION_SUCCESS:
            return Object.assign({}, state, {
                updateAssignUsers: {
                    ...initialState.updateAssignUsers,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.UPDATE_CHK_USER_ORGANIZATION_FAILURE:
            return Object.assign({}, state, {
                updateAssignUsers: {
                    ...state.updateAssignUsers,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.SAVE_ORGANIZATION_REQUEST:
            return Object.assign({}, state, {
                addNew: {
                    requestInProgress: true
                }
            });
        case ActionTypes.SAVE_ORGANIZATION_SUCCESS:
            return Object.assign({}, state, {
                addNew: {
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.SAVE_ORGANIZATION_FAILED:
            return Object.assign({}, state, {
                addNew: {
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });


        case ActionTypes.FETCH_INITIAL_ORGANIZATIONS_REQUEST:
            return Object.assign({}, state, {
                listOrganisation: {
                    ...initialState.listOrganisation,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_INITIAL_ORGANIZATIONS_SUCCESS:
            listOrganizationResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listOrganisation: {
                    ...state.listOrganisation,
                    data: _.get(listOrganizationResponse, 'content', []),
                    searchKeys: _.get(listOrganizationResponse, 'searchKeys', []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.FETCH_INITIAL_ORGANIZATIONS_FAILURE:
            return Object.assign({}, state, {
                listOrganisation: {
                    ...state.listOrganisation,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.LIST_ORGANISATION_REQUEST:
            return Object.assign({}, state, {
                listOrganisation: {
                    ...initialState.listOrganisation,
                    requestInProgress: true
                }
            });
        case ActionTypes.LIST_ORGANISATION_SUCCESS:
            listOrganizationResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listOrganisation: {
                    ...state.listOrganisation,
                    data: _.get(listOrganizationResponse, 'content', []),
                    searchKeys: formatFilterSearchKeys(_.get(listOrganizationResponse, 'searchKeys', [])),
                    pageSize: _.get(listOrganizationResponse, 'pageable.pageSize', 0),
                    pageNo: _.get(listOrganizationResponse, 'pageable.pageNumber', 0),
                    totalCount: _.get(listOrganizationResponse, 'totalElements', 0),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.LIST_ORGANISATION_FAILURE:
            return Object.assign({}, state, {
                listOrganisation: {
                    ...state.listOrganisation,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });


        case ActionTypes.LIST_SERVICE_REQUEST:
            return Object.assign({}, state, {
                listService: {
                    ...initialState.listService,
                    requestInProgress: true
                }
            });
        case ActionTypes.LIST_SERVICE_SUCCESS:
            listOrganizationResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listService: {
                    ...state.listService,
                    data: _.get(listOrganizationResponse, 'content', []),
                    searchKeys: formatFilterSearchKeys(_.get(listOrganizationResponse, 'searchKeys', [])),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.LIST_SERVICE_FAILURE:
            return Object.assign({}, state, {
                listService: {
                    ...state.listService,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.DELETE_ORGANISATION_REQUEST:
            return Object.assign({}, state, {
                deleteOrganization: {
                    ...initialState.deleteOrganization,
                    requestInProgress: true
                }
            });
        case ActionTypes.DELETE_ORGANISATION_SUCCESS:
            return Object.assign({}, state, {
                deleteOrganization: {
                    ...state.deleteOrganization,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.DELETE_ORGANISATION_FAILURE:
            return Object.assign({}, state, {
                deleteOrganization: {
                    ...state.deleteOrganization,
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.LOAD_API_PROVIDERS_REQUEST:
            return Object.assign({}, state, {
                apiProviders: {
                    ...initialState.apiProviders,
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_API_PROVIDERS_SUCCESS:
            return Object.assign({}, state, {
                apiProviders: {
                    ...state.apiProviders,
                    data: formatAPIPrividersList(getPayloadData(action.payload, {})),
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    requestInProgress: false
                }
            });
        case ActionTypes.LOAD_API_PROVIDERS_FAILED:
            return Object.assign({}, state, {
                apiProviders: {
                    ...initialState.apiProviders,
                    requestStatus: REQUEST_STATUS.FAILED,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.CHK_LOAD_USER_GROUP_ASSIGN_LIST_REQUEST:
            return Object.assign({}, state, {
                loadUserGroupAssignUsers: {
                    ...initialState.loadUserGroupAssignUsers,
                    requestInProgress: true
                }
            });
        case ActionTypes.CHK_LOAD_USER_GROUP_ASSIGN_LIST_SUCCESS:
            return Object.assign({}, state, {
                loadUserGroupAssignUsers: {
                    data: getPayloadData(action.payload, []),
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    requestInProgress: false
                },
                assignOrgRoleView: {
                    ...state.assignOrgRoleView,
                    formData: formatCheckBoxesFromAPI(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.CHK_LOAD_USER_GROUP_ASSIGN_LIST_FAILED:
            return Object.assign({}, state, {
                loadUserGroupAssignUsers: {
                    ...initialState.loadUserGroupAssignUsers,
                    requestStatus: REQUEST_STATUS.FAILED,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.LOAD_PARENT_ORGANIZATIONS_REQUEST:
            return Object.assign({}, state, {
                parentOrganizations: {
                    ...initialState.parentOrganizations,
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_PARENT_ORGANIZATIONS_SUCCESS:
            return Object.assign({}, state, {
                parentOrganizations: {
                    ...state.parentOrganizations,
                    data: getPayloadData(action.payload, []),
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    requestInProgress: false
                }
            });
        case ActionTypes.LOAD_PARENT_ORGANIZATIONS_FAILED:
            return Object.assign({}, state, {
                parentOrganizations: {
                    ...initialState.parentOrganizations,
                    requestStatus: REQUEST_STATUS.FAILED,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.LOAD_ORGANIZATION_TYPES_REQUEST:
            return Object.assign({}, state, {
                organizationTypes: {
                    ...initialState.organizationTypes,
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_ORGANIZATION_TYPES_SUCCESS:
            return Object.assign({}, state, {
                organizationTypes: {
                    ...state.organizationTypes,
                    data: getPayloadData(action.payload, []),
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    requestInProgress: false
                }
            });
        case ActionTypes.LOAD_ORGANIZATION_TYPES_FAILED:
            return Object.assign({}, state, {
                organizationTypes: {
                    ...initialState.organizationTypes,
                    requestStatus: REQUEST_STATUS.FAILED,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.LOAD_ORGANIZATION_ROLE_TYPES_REQUEST:
            return Object.assign({}, state, {
                organizationRoleTypes: {
                    ...initialState.organizationRoleTypes,
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_ORGANIZATION_ROLE_TYPES_SUCCESS:
            return Object.assign({}, state, {
                organizationRoleTypes: {
                    ...state.organizationRoleTypes,
                    data: _.get(getPayloadData(action.payload, {}), 'content', []),
                    dropdown: getPayloadData(action.payload, []),
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    requestInProgress: false
                }
            });
        case ActionTypes.SET_ORGANIZATION_ROLE_TYPES:
            return Object.assign({}, state, {
                organizationRoleTypes: {
                    ...state.organizationRoleTypes,
                    data: getPayloadData(action.payload, []),
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    requestInProgress: false
                }
            });
        case ActionTypes.LOAD_ORGANIZATION_ROLE_TYPES_FAILED:
            return Object.assign({}, state, {
                organizationRoleTypes: {
                    ...initialState.organizationRoleTypes,
                    requestStatus: REQUEST_STATUS.FAILED,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case HierarchyTypes.ORGANIZATION_COMMON_STATE_REQUEST:
            return Object.assign({}, state, {
                commonHierarchy: {
                    ...state.commonHierarchy,
                    state: {
                        ...initialState.commonHierarchy.state,
                        requestInProgress: true
                    }
                }
            });
        case HierarchyTypes.ORGANIZATION_COMMON_STATE_SUCCESS:
            return Object.assign({}, state, {
                commonHierarchy: {
                    ...state.commonHierarchy,
                    state: {
                        ...state.commonHierarchy.state,
                        data: getPayloadData(action.payload, []),
                        requestStatus: REQUEST_STATUS.SUCCESS,
                        requestInProgress: false
                    }
                }
            });
        case HierarchyTypes.ORGANIZATION_COMMON_STATE_FAILED:
            return Object.assign({}, state, {
                commonHierarchy: {
                    ...state.commonHierarchy,
                    state: {
                        ...initialState.commonHierarchy.state,
                        requestStatus: REQUEST_STATUS.FAILED,
                        requestInProgress: false,
                        error: {
                            ...action.payload.error
                        }
                    }
                }
            });

        case HierarchyTypes.ORGANIZATION_COMMON_DISTRICT_REQUEST:
            return Object.assign({}, state, {
                commonHierarchy: {
                    ...state.commonHierarchy,
                    district: {
                        ...initialState.commonHierarchy.district,
                        requestInProgress: true
                    }
                }
            });
        case HierarchyTypes.ORGANIZATION_COMMON_DISTRICT_SUCCESS:
            return Object.assign({}, state, {
                commonHierarchy: {
                    ...state.commonHierarchy,
                    district: {
                        ...state.commonHierarchy.district,
                        data: getPayloadData(action.payload, []),
                        requestStatus: REQUEST_STATUS.SUCCESS,
                        requestInProgress: false
                    }
                }
            });
        case HierarchyTypes.ORGANIZATION_COMMON_DISTRICT_FAILED:
            return Object.assign({}, state, {
                commonHierarchy: {
                    ...state.commonHierarchy,
                    district: {
                        ...initialState.commonHierarchy.district,
                        requestInProgress: false,
                        requestStatus: REQUEST_STATUS.FAILED,
                        error: {
                            ...action.payload.error
                        }
                    }
                }
            });

        case HierarchyTypes.ORGANIZATION_COMMON_DISTRICT_PANCHAYATH_REQUEST:
            return Object.assign({}, state, {
                commonHierarchy: {
                    ...state.commonHierarchy,
                    districtPanchayath: {
                        ...initialState.commonHierarchy.districtPanchayath,
                        requestInProgress: true
                    }
                }
            });
        case HierarchyTypes.ORGANIZATION_COMMON_DISTRICT_PANCHAYATH_SUCCESS:
            return Object.assign({}, state, {
                commonHierarchy: {
                    ...state.commonHierarchy,
                    districtPanchayath: {
                        ...state.commonHierarchy.districtPanchayath,
                        data: getPayloadData(action.payload, []),
                        requestStatus: REQUEST_STATUS.SUCCESS,
                        requestInProgress: false
                    }
                }
            });
        case HierarchyTypes.ORGANIZATION_COMMON_DISTRICT_PANCHAYATH_FAILED:
            return Object.assign({}, state, {
                commonHierarchy: {
                    ...state.commonHierarchy,
                    districtPanchayath: {
                        ...initialState.commonHierarchy.districtPanchayath,
                        requestStatus: REQUEST_STATUS.FAILED,
                        requestInProgress: false,
                        error: {
                            ...action.payload.error
                        }
                    }
                }
            });

        case HierarchyTypes.ORGANIZATION_COMMON_BLOCK_PANCHAYATH_REQUEST:
            return Object.assign({}, state, {
                commonHierarchy: {
                    ...state.commonHierarchy,
                    blockPanchayath: {
                        ...initialState.commonHierarchy.blockPanchayath,
                        requestInProgress: true
                    }
                }
            });
        case HierarchyTypes.ORGANIZATION_COMMON_BLOCK_PANCHAYATH_SUCCESS:
            return Object.assign({}, state, {
                commonHierarchy: {
                    ...state.commonHierarchy,
                    blockPanchayath: {
                        ...state.commonHierarchy.blockPanchayath,
                        data: getPayloadData(action.payload, []),
                        requestStatus: REQUEST_STATUS.SUCCESS,
                        requestInProgress: false
                    }
                }
            });
        case HierarchyTypes.ORGANIZATION_COMMON_BLOCK_PANCHAYATH_FAILED:
            return Object.assign({}, state, {
                commonHierarchy: {
                    ...state.commonHierarchy,
                    blockPanchayath: {
                        ...initialState.commonHierarchy.blockPanchayath,
                        requestStatus: REQUEST_STATUS.FAILED,
                        requestInProgress: false,
                        error: {
                            ...action.payload.error
                        }
                    }
                }
            });

        case HierarchyTypes.ORGANIZATION_COMMON_LSGI_REQUEST:
            return Object.assign({}, state, {
                commonHierarchy: {
                    ...state.commonHierarchy,
                    lsgi: {
                        ...initialState.commonHierarchy.lsgi,
                        requestInProgress: true
                    }
                }
            });
        case HierarchyTypes.ORGANIZATION_COMMON_LSGI_SUCCESS:
            return Object.assign({}, state, {
                commonHierarchy: {
                    ...state.commonHierarchy,
                    lsgi: {
                        ...state.commonHierarchy.lsgi,
                        data: getPayloadData(action.payload, []),
                        requestStatus: REQUEST_STATUS.SUCCESS,
                        requestInProgress: false
                    }
                }
            });
        case ActionTypes.GET_EMAIL_API_PROVIDER_REQUEST:
            return Object.assign({}, state, {
                emailApiProvider: {
                    formData: [],
                    requestInProgress: true,
                    error: {}
                }
            });

        case ActionTypes.GET_EMAIL_API_PROVIDER_SUCCESS:
            return Object.assign({}, state, {
                emailApiProvider: {
                    formData: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    error: {}
                }
            });

        case ActionTypes.GET_EMAIL_API_PROVIDER_FAILURE:
            return Object.assign({}, state, {
                emailApiProvider: {
                    formData: [],
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.GET_SMS_API_PROVIDER_REQUEST:
            return Object.assign({}, state, {
                smsApiProvider: {
                    formData: [],
                    requestInProgress: true,
                    error: {}
                }
            });

        case ActionTypes.GET_SMS_API_PROVIDER_SUCCESS:
            return Object.assign({}, state, {
                smsApiProvider: {
                    formData: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    error: {}
                }
            });

        case ActionTypes.GET_SMS_API_PROVIDER_FAILURE:
            return Object.assign({}, state, {
                smsApiProvider: {
                    formData: [],
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.GET_NOTIFICATION_API_PROVIDER_REQUEST:
            return Object.assign({}, state, {
                notificationApiProvider: {
                    formData: [],
                    requestInProgress: true,
                    error: {}
                }
            });

        case ActionTypes.GET_NOTIFICATION_API_PROVIDER_SUCCESS:
            return Object.assign({}, state, {
                notificationApiProvider: {
                    formData: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    error: {}
                }
            });

        case ActionTypes.GET_NOTIFICATION_API_PROVIDER_FAILURE:
            return Object.assign({}, state, {
                notificationApiProvider: {
                    formData: [],
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.GET_PAYMENT_API_PROVIDER_REQUEST:
            return Object.assign({}, state, {
                paymentGatewayApiProvider: {
                    formData: [],
                    requestInProgress: true,
                    error: {}
                }
            });

        case ActionTypes.GET_PAYMENT_API_PROVIDER_SUCCESS:
            return Object.assign({}, state, {
                paymentGatewayApiProvider: {
                    formData: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    error: {}
                }
            });

        case ActionTypes.GET_PAYMENT_API_PROVIDER_FAILURE:
            return Object.assign({}, state, {
                paymentGatewayApiProvider: {
                    formData: [],
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.UPDATE_API_PROVIDER_REQUEST:
            return Object.assign({}, state, {
                updateApiProvider: {
                    requestInProgress: true,
                    error: {}
                }
            });

        case ActionTypes.UPDATE_API_PROVIDER_SUCCESS:
            return Object.assign({}, state, {
                updateApiProvider: {
                    requestInProgress: false,
                    error: {}
                }
            });

        case ActionTypes.UPDATE_API_PROVIDER_FAILURE:
            return Object.assign({}, state, {
                updateApiProvider: {
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });

        case ActionTypes.POST_API_PROVIDER_REQUEST:
            return Object.assign({}, state, {
                postApiProvider: {
                    requestInProgress: true,
                    error: {}
                }
            });

        case ActionTypes.POST_API_PROVIDER_SUCCESS:
            return Object.assign({}, state, {
                postApiProvider: {
                    requestInProgress: false,
                    error: {}
                }
            });

        case ActionTypes.POST_API_PROVIDER_FAILURE:
            return Object.assign({}, state, {
                postApiProvider: {
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });


        case ActionTypes.LOAD_ORGANIZATION_API_PROVIDERS_SUCCESS:
            return Object.assign({}, state, {
                ...formatOrganizationsAPIPrividers(getPayloadData(action.payload, []))
            });

        case ActionTypes.FETCH_MODULES_FOR_CHK_REQUEST:
            return Object.assign({}, state, {
                assignModuleList: {
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_MODULES_FOR_CHK_SUCCESS:
            return Object.assign({}, state, {
                assignModuleList: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                },
                assignModulesView: {
                    ...state.assignModulesView,
                    formData: formatCheckBoxesFromAPI(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.FETCH_MODULES_FOR_CHK_FAILURE:
            return Object.assign({}, state, {
                assignModuleList: {
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });


        case HierarchyTypes.UPDATE_ORGANIZATION_REQUEST:
            return Object.assign({}, state, {
                addOrUpdateOrganization: {
                    isUpdate: false,
                    requestInProgress: true
                }
            });
        case HierarchyTypes.UPDATE_ORGANIZATION_SUCCESS:
            return Object.assign({}, state, {
                addOrUpdateOrganization: {
                    isUpdate: true,
                    requestInProgress: false
                }
            });
        case HierarchyTypes.UPDATE_ORGANIZATION_FAILED:
            return Object.assign({}, state, {
                isUpdate: false,
                requestInProgress: false
            });

        case HierarchyTypes.SAVE_ORGANIZATION_REQUEST:
            return Object.assign({}, state, {
                addOrUpdateOrganization: {
                    isUpdate: false,
                    requestInProgress: true
                }
            });
        case HierarchyTypes.SAVE_ORGANIZATION_SUCCESS:
            return Object.assign({}, state, {
                addOrUpdateOrganization: {
                    isUpdate: false,
                    requestInProgress: false
                }
            });
        case HierarchyTypes.SAVE_ORGANIZATION_FAILED:
            return Object.assign({}, state, {
                addOrUpdateOrganization: {
                    isUpdate: false,
                    requestInProgress: false
                }
            });

        case ActionTypes.FETCH_ROLESLIST_FOR_MODULE_REQUEST:
            return Object.assign({}, state, {
                roleList: {
                    ...initialState.roleList,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ROLESLIST_FOR_MODULE_SUCCESS:
            return Object.assign({}, state, {
                roleList: {
                    ...state.roleList,
                    data: _.get(action, 'payload.data.data', []),
                    requestInProgress: false
                }
            });
        case ActionTypes.FETCH_ROLESLIST_FOR_MODULE_FAILURE:
            return Object.assign({}, state, {
                roleList: {
                    ...state.roleList,
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.FETCH_ASSIGNED_MODULES_FOR_CHK_REQUEST:
            return Object.assign({}, state, {
                roleAssignModuleList: {
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ASSIGNED_MODULES_FOR_CHK_SUCCESS:
            return Object.assign({}, state, {
                roleAssignModuleList: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                },
                roleAssignModulesView: {
                    ...state.roleAssignModulesView,
                    moduleMapping: formatCheckBoxesFromAPI(getPayloadData(action.payload, []))
                }
            });
        case ActionTypes.FETCH_ASSIGNED_MODULES_FOR_CHK_FAILURE:
            return Object.assign({}, state, {
                roleAssignModuleList: {
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        // module save
        case ActionTypes.SAVE_MODULES_FOR_CHK_REQUEST:
            return Object.assign({}, state, {
                saveModuleList: {
                    requestInProgress: true
                }
            });
        case ActionTypes.SAVE_MODULES_FOR_CHK_FAILURE:
            return Object.assign({}, state, {
                saveModuleList: {
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.SAVE_MODULES_FOR_CHK_SUCCESS:
            return Object.assign({}, state, {
                saveModuleList: {
                    requestInProgress: false
                }
            });

        case ActionTypes.SAVE_ASSIGNED_MODULES_REQUEST:
            return Object.assign({}, state, {
                saveRoleAssignModuleList: {
                    requestInProgress: true
                }
            });
        case ActionTypes.SAVE_ASSIGNED_MODULES_FAILURE:
            return Object.assign({}, state, {
                saveRoleAssignModuleList: {
                    requestInProgress: false,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.SAVE_ASSIGNED_MODULES_SUCCESS:
            return Object.assign({}, state, {
                saveRoleAssignModuleList: {
                    requestInProgress: false
                }
            });
        case ActionTypes.CLEAR_ASSIGNED_CHECKED_LIST:
            return Object.assign({}, state, {
                roleAssignModuleList: {
                    ...state.roleAssignModuleList,
                    data: []
                }
            });
        // template
        case ActionTypes.FETCH_TEMPLATE_FOR_LST_REQUEST:
            return Object.assign({}, state, {
                listTemplates: {
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_TEMPLATE_FOR_LST_SUCCESS:
            return Object.assign({}, state, {
                listTemplates: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }

            });
        case ActionTypes.FETCH_TEMPLATE_FOR_LST_FAILURE:
            return Object.assign({}, state, {
                listTemplates: {
                    requestInProgress: false
                }
            });

        case ActionTypes.FETCH_SELECTED_TEMPLATE_FOR_LST_REQUEST:
            return Object.assign({}, state, {
                listSelectedTemplated: {
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.FETCH_SELECTED_TEMPLATE_FOR_LST_SUCCESS:
            listTemplateResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listSelectedTemplated: {
                    ...state.listOrganisation,
                    data: _.get(listTemplateResponse, 'content', []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS,
                    searchKeys: formatFilterSearchKeys(_.get(listTemplateResponse, 'searchKeys', []))

                }

            });
        case ActionTypes.FETCH_SELECTED_TEMPLATE_FOR_LST_FAILURE:
            return Object.assign({}, state, {
                listSelectedTemplated: {
                    requestInProgress: false
                }
            });
        case ActionTypes.SAVE_TEMPLATE_IN_LIST_REQUEST:
            return Object.assign({}, state, {
                saveTemplatesInList: {
                    requestInProgress: true

                }
            });
        case ActionTypes.SAVE_TEMPLATE_IN_LIST_SUCCESS:
            return Object.assign({}, state, {
                saveTemplatesInList: {
                    requestInProgress: false,
                    isSaved: true
                }

            });
        case ActionTypes.SAVE_TEMPLATE_IN_LIST_FAILURE:
            return Object.assign({}, state, {
                saveTemplatesInList: {
                    requestInProgress: false
                }
            });

        case ActionTypes.GET_TEMPLATE_TYPES_FOR_ORG_REQUEST:
            return Object.assign({}, state, {
                templateTypes: {
                    data: [],
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.GET_TEMPLATE_TYPES_FOR_ORG_SUCCESS:
            return Object.assign({}, state, {
                templateTypes: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.GET_TEMPLATE_TYPES_FOR_ORG_FAILURE:
            return Object.assign({}, state, {
                templateTypes: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.GET_TEMPLATE_BY_TEMP_TYPE_ID_REQUEST:
            return Object.assign({}, state, {
                templateByTypeId: {
                    data: [],
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.GET_TEMPLATE_BY_TEMP_TYPE_ID_SUCCESS:
            return Object.assign({}, state, {
                templateByTypeId: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });

        case ActionTypes.GET_TEMPLATE_BY_TEMP_TYPE_ID_FAILURE:
            return Object.assign({}, state, {
                templateByTypeId: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });

        case ActionTypes.GET_SERVICE_PROVIDER_REQUEST:
            return Object.assign({}, state, {
                serviceProvider: {
                    data: [],
                    requestInProgress: true,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.GET_SERVICE_PROVIDER_SUCCESS:
            return Object.assign({}, state, {
                serviceProvider: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.GET_SERVICE_PROVIDER_FAILURE:
            return Object.assign({}, state, {
                serviceProvider: {
                    data: [],
                    requestInProgress: false,
                    requestStatus: REQUEST_STATUS.FAILED
                }
            });
        case ActionTypes.SET_FILTER_VALUES_FOR_ORGS:
            return Object.assign({}, state, {
                currentFilterState: {
                    ...state.currentFilterState,
                    ...action.payload.data
                }
            });

        case ActionTypes.SET_FILTER_VALUES_FOR_SERVICE:
            return Object.assign({}, state, {
                currentFilterStateForService: {
                    ...state.currentFilterStateForService,
                    ...action.payload.data
                }
            });
        case ActionTypes.RESET_FILTER_VALUES_FOR_ORGS:
            return Object.assign({}, state, {
                currentFilterState: initialState.currentFilterState,
                currentFilterStateForService: initialState.currentFilterStateForService
            });
        case ActionTypes.CLEAR_ORGANIZATION_REDUCER:
            return Object.assign({}, state, {
                addNew: {},
                addOrUpdateOrganization: {}
            });
        case ActionTypes.RESET_RE_ASSIGN_GT:
            return Object.assign({}, state, {
                customersBasedOnGt: {
                    ...initialState.customersBasedOnGt
                },
                reAssignGT: {
                    ...initialState.reAssignGT,
                    customersList: null
                }
            });
        case ActionTypes.SET_FROM_GT:
            return Object.assign({}, state, {
                getGtBasedOnWardId: {
                    ...state.getGtBasedOnWardId,
                    data: {
                        ...state.getGtBasedOnWardId.data,
                        ...action.payload.data
                    }
                }
            });
        case ActionTypes.SET_TO_GT:
            return Object.assign({}, state, {
                getToGtWithProviderId: {
                    ...state.getToGtWithProviderId,
                    formateDataForGT: {
                        ...state.getToGtWithProviderId.data,
                        ...action.payload.data
                    }
                }
            });
        case ActionTypes.UPDATE_RE_ASSIGN_SUPER_VISOR_REQUEST:
            return Object.assign({}, state, {
            });
        case ActionTypes.UPDATE_RE_ASSIGN_SUPER_VISOR_SUCCESS:
            return Object.assign({}, state, {
                reAssignSupervisor: {
                    ...initialState.reAssignSupervisor
                }
            });
        case ActionTypes.UPDATE_RE_ASSIGN_SUPER_VISOR_FAILURE:
            return Object.assign({}, state, {
                reAssignSupervisor: {
                    ...initialState.reAssignSupervisor
                }
            });
        case ActionTypes.POST_RE_ASSIGN_GT_REQUEST:
            return Object.assign({}, state, {
                isReAssignGTSaved: {
                    isSaved: false
                }
            });
        case ActionTypes.POST_RE_ASSIGN_GT_SUCCESS:
            return Object.assign({}, state, {
                isReAssignGTSaved: {
                    isSaved: true
                }
            });
        case ActionTypes.POST_RE_ASSIGN_GT_FAILURE:
            return Object.assign({}, state, {
                isReAssignGTSaved: {}
            }
            );
        case ActionTypes.TOGGLE_STATUS_REQUEST:
            return Object.assign({}, state, {
                changeStatus: {
                    requestInProgress: true
                }
            });
        case ActionTypes.TOGGLE_STATUS_SUCCESS:
            return Object.assign({}, state, {
                changeStatus: {
                    requestInProgress: false
                }
            });
        case ActionTypes.TOGGLE_STATUS_FAILURE:
            return Object.assign({}, state, {
                changeStatus: {
                    requestInProgress: false
                }
            }
            );
        case ActionTypes.LOAD_TEMPLATES_REQUEST:
            return Object.assign({}, state, {
                templates: {
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.LOAD_TEMPLATES_SUCCESS:
            return Object.assign({}, state, {
                templates: {
                    requestInProgress: false,
                    data: getPayloadData(action.payload, []),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.LOAD_TEMPLATES_FAILURE:
            return Object.assign({}, state, {
                templates: {
                    requestInProgress: false,
                    data: [],
                    requestStatus: REQUEST_STATUS.FAILED
                }
            }
            );
        case ActionTypes.LOAD_SERVICES_REQUEST:
            return Object.assign({}, state, {
                services: {
                    requestInProgress: true
                }
            });
        case ActionTypes.LOAD_SERVICES_SUCCESS:
            return Object.assign({}, state, {
                services: {
                    requestInProgress: false,
                    data: getPayloadData(action.payload, []),
                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.LOAD_SERVICES_FAILURE:
            return Object.assign({}, state, {
                services: {
                    requestInProgress: false,
                    data: [],
                    requestStatus: REQUEST_STATUS.FAILED
                }
            }
            );
        case ActionTypes.FETCH_ORGANIZATION_ASSIGN_USERS_REQUEST:
            return Object.assign({}, state, {
                organizationAssignedUsers: {
                    ...initialState.organizationAssignedUsers,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ORGANIZATION_ASSIGN_USERS_SUCCESS: {
            let assignUsersResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                organizationAssignedUsers: {
                    requestInProgress: false,
                    data: assignUsersResponse,
                    searchKeys: formatFilterSearchKeys(_.get(assignUsersResponse, 'searchKeys', []))
                }
            });
        }
        case ActionTypes.FETCH_ORGANIZATION_ASSIGN_USERS_FAILURE:
            return Object.assign({}, state, {
                organizationAssignedUsers: {
                    ...state.organizationAssignedUsers,
                    requestInProgress: false
                }
            });
        case ActionTypes.SERVICE_PROVIDER_CONTACT_FORM_LOAD_FLAG:
            return Object.assign({}, state, {
                contactFormDfgLoaded: action.payload.data
            });
        case ActionTypes.FETCH_ASSIGN_ORGANIZATION_REQUEST:
            return Object.assign({}, state, {
                assignOrganization: {
                    ...initialState.assignOrganization,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ASSIGN_ORGANIZATION_SUCCESS: {
            let assignUsersResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                assignOrganization: {
                    requestInProgress: false,
                    data: assignUsersResponse,
                    searchKeys: formatFilterSearchKeys(_.get(assignUsersResponse, 'searchKeys', []))
                }
            });
        }
        case ActionTypes.FETCH_ASSIGN_ORGANIZATION_FAILURE: {
            return Object.assign({}, state, {
                assignOrganization: {
                    ...state.assignOrganization
                }
            });
        }
        case ActionTypes.FETCH_ADDITIONAL_BASIC_DETAILS_WARDS_REQUEST:
            return Object.assign({}, state, {
                additionalBasicDetailsWards: {
                    ...initialState.additionalBasicDetailsWards,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ADDITIONAL_BASIC_DETAILS_WARDS_SUCCESS: {
            return Object.assign({}, state, {
                additionalBasicDetailsWards: {
                    requestInProgress: false,
                    data: getPayloadData(action.payload, [])
                }
            });
        }
        case ActionTypes.FETCH_ADDITIONAL_BASIC_DETAILS_WARDS_FAILURE:
            return Object.assign({}, state, {
                additionalBasicDetailsWards: {
                    ...initialState.additionalBasicDetailsWards
                }
            });

        case ActionTypes.FETCH_ADDITIONAL_BASIC_DETAILS_REQUEST:
            return Object.assign({}, state, {
                additionalBasicDetails: {
                    ...initialState.additionalBasicDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ADDITIONAL_BASIC_DETAILS_SUCCESS: {
            return Object.assign({}, state, {
                additionalBasicDetails: {
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        }
        case ActionTypes.FETCH_ADDITIONAL_BASIC_DETAILS_FAILURE:
            return Object.assign({}, state, {
                additionalBasicDetails: {
                    ...initialState.additionalBasicDetails
                }
            });
        case ActionTypes.SAVE_ADDITIONAL_BASIC_DETAILS_REQUEST:
            return Object.assign({}, state, {
                additionalBasicDetails: {
                    ...state.additionalBasicDetails,
                    requestInProgress: true
                }
            });
        case ActionTypes.SAVE_ADDITIONAL_BASIC_DETAILS_SUCCESS:
        case ActionTypes.SAVE_ADDITIONAL_BASIC_DETAILS_FAILURE:
            return Object.assign({}, state, {
                additionalBasicDetails: {
                    ...state.additionalBasicDetails,
                    requestInProgress: false
                }
            });

        case ActionTypes.FETCH_ASSIGN_ROLE_IN_ORG_REQUEST:
            return Object.assign({}, state, {
                assignRole: {
                    ...initialState.assignRole,
                    requestInProgress: true
                }
            });
        case ActionTypes.FETCH_ASSIGN_ROLE_IN_ORG_SUCCESS: {
            let assignUsersResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                assignRole: {
                    requestInProgress: false,
                    data: assignUsersResponse,
                    searchKeys: formatFilterSearchKeys(_.get(assignUsersResponse, 'searchKeys', []))
                }
            });
        }
        case ActionTypes.FETCH_ASSIGN_ROLE_IN_ORG_FAILURE: {
            return Object.assign({}, state, {
                assignRole: {
                    ...state.assignRole
                }
            });
        }
        case ActionTypes.COMPLAINT_EM_LIST_REQUEST:
            return Object.assign({}, state, {
                listComplaintEscalation: {
                    ...initialState.listComplaintEscalation,
                    requestInProgress: true
                }
            });
        case ActionTypes.COMPLAINT_EM_LIST_SUCCESS:
            listComplaintEscalationResponse = getPayloadData(action.payload, {});
            return Object.assign({}, state, {
                listComplaintEscalation: {
                    ...state.listComplaintEscalation,
                    data: getPayloadData(action.payload, {}),
                    requestInProgress: false,
                    searchKeys: formatFilterSearchKeys(_.get(listComplaintEscalationResponse, 'searchKeys', [])),

                    requestStatus: REQUEST_STATUS.SUCCESS
                }
            });
        case ActionTypes.COMPLAINT_EM_LIST_FAILED:
            return Object.assign({}, state, {
                listComplaintEscalation: {
                    ...initialState.listComplaintEscalation,
                    requestStatus: REQUEST_STATUS.FAILED,
                    error: {
                        ...action.payload.error
                    }
                }
            });
        case ActionTypes.COMPLAINT_EM_GET_BY_ID_REQUEST:
            return Object.assign({}, state, {
                fetchComplaintEscalationById: {
                    ...state.fetchComplaintEscalationById,
                    requestInProgress: true,
                    data: []
                }
            });
        case ActionTypes.COMPLAINT_EM_GET_BY_ID_SUCCESS:
            return Object.assign({}, state, {
                fetchComplaintEscalationById: {
                    ...state.fetchComplaintEscalationById,
                    requestInProgress: false,
                    data: getPayloadData(action.payload, {})
                }
            });
        case ActionTypes.COMPLAINT_EM_GET_BY_ID_FAILED:
            return Object.assign({}, state, {
                fetchComplaintEscalationById: {
                    ...state.fetchComplaintEscalationById,
                    requestInProgress: false,
                    data: []
                }
            });
        case ActionTypes.RESET_COMPLAINT_ESCALATION_FORM:
            return Object.assign({}, state, {
                fetchComplaintEscalationById: {}
            });
        //
        case ActionTypes.COMPLAINT_LIST_REQUEST:
            return Object.assign({}, state, {
                listComplaints: {
                    ...initialState.listComplaints,
                    requestInProgress: true
                }
            });
        case ActionTypes.COMPLAINT_LIST_SUCCESS: {
            return Object.assign({}, state, {
                listComplaints: {
                    requestInProgress: false,
                    data: getPayloadData(action.payload, [])
                }
            });
        }
        case ActionTypes.COMPLAINT_LIST_FAILED:
            return Object.assign({}, state, {
                listComplaints: {
                    ...initialState.listComplaints,
                    requestInProgress: false

                }
            });
        case ActionTypes.ROLE_LIST_REQUEST:
            return Object.assign({}, state, {
                listRoles: {
                    ...initialState.listRoles,
                    requestInProgress: true
                }
            });
        case ActionTypes.ROLE_LIST_SUCCESS: {
            return Object.assign({}, state, {
                listRoles: {
                    requestInProgress: false,
                    data: getPayloadData(action.payload, [])
                }
            });
        }
        case ActionTypes.ROLE_LIST_FAILED:
            return Object.assign({}, state, {
                listRoles: {
                    ...initialState.listRoles,
                    requestInProgress: true
                }
            });
        case ActionTypes.TEMPLATE_LIST_REQUEST:
            return Object.assign({}, state, {
                listTemplate: {
                    ...initialState.listTemplate,
                    requestInProgress: true
                }
            });
        case ActionTypes.TEMPLATE_LIST_SUCCESS: {
            return Object.assign({}, state, {
                listTemplate: {
                    requestInProgress: false,
                    data: getPayloadData(action.payload, [])
                }
            });
        }
        case ActionTypes.TEMPLATE_LIST_FAILED:
            return Object.assign({}, state, {
                listTemplate: {
                    ...initialState.listTemplate,
                    requestInProgress: true
                }
            });

        case ActionTypes.TEMPLATE_TYPE_LIST_REQUEST:
            return Object.assign({}, state, {
                listTemplateType: {
                    ...initialState.listTemplate,
                    requestInProgress: true
                }
            });
        case ActionTypes.TEMPLATE_TYPE_LIST_SUCCESS: {
            return Object.assign({}, state, {
                listTemplateType: {
                    requestInProgress: false,
                    data: getPayloadData(action.payload, [])
                }
            });
        }
        case ActionTypes.TEMPLATE_TYPE_LIST_FAILED:
            return Object.assign({}, state, {
                listTemplateType: {
                    ...initialState.listTemplateType,
                    requestInProgress: true
                }
            });

        default:
            return state;
    }
};

export default reducer;
