import React, { useEffect } from 'react';
import { makeStyles, Components } from '../../../common/components';
import AssignUsers from './AssignUsersView';
import commonTheme from '../../../common/theme';
import ApiProviderNewView from './ApiProviderView';
import AssignModule from './assignModule/AssignModuleMainPage.js';
import AssignTemplate from './assignTemplate/AssignTemplate.js';
import ServiceProvider from './ServiceProvider/ServiceProviderList.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { history } from '../../../common';
import { PATH } from '../../../routes';
import { ORG_TYPE, STATE_REDUCER_KEY } from '../constants';
import { setTabIndex } from '../actions';
import { AddOrganization } from '../containers';
import { resetFormChange } from '../../common/actions';
import AssignVendorItem from './vendors/AssignVendorItem';
import AssignOrganization from './AssignOrganization';
import AdditionalBasicDetails from './AdditionalBasicDetails';
import { resetSurvey } from '../../dfg/actions';
import AssignOrganizationRoleTableView from './AssignOrganizationRoleTableView';
import ComplaintEscalationMatrixList from './ComplaintEscalationMatrixList';
import AssignCustomersToServiceWorkerView from './AssignCustomersToServiceWorkerView';
import { findTabIndex, getTabDetails } from '../../../utils/TabUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';
import { hasAccessPermission } from '../../../utils/PermissionUtils';

const { AppBar, Tabs, CardComponent } = Components;

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 275
  },
  root2: {
    flexGrow: 10,
    backgroundColor: theme.palette.background.paper
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  colorPrimary: commonTheme.tabAppbarColorPrimary
}));
const TABS = {
  BASIC_DEATAILS: { name: 'basic', label: 'tab_details', component: <AddOrganization />, disabled: false },
  ASSIGN_USER: { name: 'assignUser', label: 'tab_assign_users', component: <AssignUsers /> },
  ADDITIONAL_DETAILS: { name: 'additionalBasicDetails', label: 'additional_basic_details', component: <AdditionalBasicDetails /> },
  ASSIGN_VENDOR_ITEM: { name: 'assignVendorItem', label: 'assign_item', component: <AssignVendorItem /> },
  ASSIGN_ORGANIZATION: { name: 'assignOrganization', label: 'associate_organization', component: <AssignOrganization /> },
  ASSIGN_ROLES: { name: 'assignRole', label: 'assign_roles', component: <AssignOrganizationRoleTableView /> },
  ASSIGN_MODULE: { name: 'assignModule', label: 'tab_assign_module', component: <AssignModule /> },
  SERVICE_PROVIDER: { name: 'serviceprovider', label: 'tab_service_provider', component: <ServiceProvider /> },
  API_PROVIDER: { name: 'apiProvider', label: 'tab_api_provider', component: <ApiProviderNewView /> },
  ASSIGN_TEMPLATE: { name: 'assignTemplate', label: 'tab_assign_template', component: <AssignTemplate /> },
  ASSIGN_CUSTOMER_TO_SERVICE_WORKER: { name: 'assignCustomerToServiceWorker', label: 'assign_customer_to_serviceworker', component: <AssignCustomersToServiceWorkerView /> },
  COMPLAINT_ESCALATION_MATRIX: { name: 'complaintescalationmatrix', label: 'complaint_escalation_matrix', component: <ComplaintEscalationMatrixList /> }
};

export const OrganizationMainPageView = () => {
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  let organizationTabArray = [];
  const { commonTemplate: { selected = 0 } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
  let curPath = location.hash.split('/');
  let lastPath = curPath.pop();
  let organizationType = localStorage.getItem('typeOfOrganization') || '';
  const PERMISSION = {
    BASIC_DEATAILS: hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_DETAILS, ACTION_MAPPING.ORGANIZATION_DETAILS.ACCESS_IN_TAB),
    ASSIGN_USER: hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_ASSIGN_USER, ACTION_MAPPING.ORGANIZATION_ASSIGN_USER.ACCESS_IN_TAB),
    ADDITIONAL_DETAILS: hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_ADDITIONAL_DETAILS, ACTION_MAPPING.ORGANIZATION_ADDITIONAL_DETAILS.ACCESS_IN_TAB),
    ASSIGN_VENDOR_ITEM: hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_ASSIGN_VENDOR_ITEM, ACTION_MAPPING.ORGANIZATION_ASSIGN_VENDOR_ITEM.ACCESS_IN_TAB),
    ASSIGN_ORGANIZATION: hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_ASSIGN_ORGANIZATION, ACTION_MAPPING.ORGANIZATION_ASSIGN_ORGANIZATION.ACCESS_IN_TAB),
    ASSIGN_ROLES: hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_ASSIGN_ROLE, ACTION_MAPPING.ORGANIZATION_ASSIGN_ROLE.ACCESS_IN_TAB),
    ASSIGN_MODULE: hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_ASSIGN_MODULE_MODULES, ACTION_MAPPING.ORGANIZATION_ASSIGN_MODULE_MODULES.ACCESS_IN_TAB),
    SERVICE_PROVIDER: hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER.ACCESS_IN_TAB),
    API_PROVIDER: hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_API_PROVIDER, ACTION_MAPPING.ORGANIZATION_API_PROVIDER.ACCESS_IN_TAB),
    ASSIGN_TEMPLATE: hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_ASSIGN_TEMPLATE, ACTION_MAPPING.ORGANIZATION_ASSIGN_TEMPLATE.ACCESS_IN_TAB),
    ASSIGN_CUSTOMER_TO_SERVICE_WORKER: hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_ASSIGN_CUSTOMER_TO_SERVICE_WORKER, ACTION_MAPPING.ORGANIZATION_ASSIGN_CUSTOMER_TO_SERVICE_WORKER.ACCESS_IN_TAB),
    COMPLAINT_ESCALATION_MATRIX: hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_COMPLAINT_ESCALATION_MATRIX, ACTION_MAPPING.ORGANIZATION_COMPLAINT_ESCALATION_MATRIX.ACCESS_IN_TAB)
  };
  if (organizationType === '') {
    if (PERMISSION.BASIC_DEATAILS || false) {
      organizationTabArray.push({ name: 'basic', label: 'tab_details', component: <AddOrganization />, disabled: false });
    }
  } else if (organizationType === ORG_TYPE.MCF) {
    if (PERMISSION.BASIC_DEATAILS || false) {
      organizationTabArray.push({ name: 'basic', label: 'tab_details', component: <AddOrganization />, disabled: false });
    }
    if (PERMISSION.ASSIGN_USER || false) {
      organizationTabArray.push(TABS.ASSIGN_USER);
    }
    if (PERMISSION.ADDITIONAL_DETAILS || false) {
      organizationTabArray.push(TABS.ADDITIONAL_DETAILS);
    }
  } else if (organizationType === ORG_TYPE.CKC) {

    if (PERMISSION.BASIC_DEATAILS || false) {
      organizationTabArray.push(TABS.BASIC_DEATAILS);
    }
    if (PERMISSION.ASSIGN_USER || false) {
      organizationTabArray.push(TABS.ASSIGN_USER);
    }
    if (PERMISSION.ASSIGN_VENDOR_ITEM || false) {
      organizationTabArray.push(TABS.ASSIGN_VENDOR_ITEM);
    }

  } else if (organizationType === ORG_TYPE.CKC_VENDOR) {

    if (PERMISSION.BASIC_DEATAILS || false) {
      organizationTabArray.push(TABS.BASIC_DEATAILS);
    }
    if (PERMISSION.ASSIGN_VENDOR_ITEM || false) {
      organizationTabArray.push(TABS.ASSIGN_VENDOR_ITEM);
    }

  } else if (organizationType === ORG_TYPE.VENDOR) {
    if (PERMISSION.BASIC_DEATAILS || false) {
      organizationTabArray.push(TABS.BASIC_DEATAILS);
    }
    if (PERMISSION.ASSIGN_VENDOR_ITEM || false) {
      organizationTabArray.push(TABS.ASSIGN_VENDOR_ITEM);
    }
  } else if (organizationType === ORG_TYPE.RRF) {
    if (PERMISSION.BASIC_DEATAILS || false) {
      organizationTabArray.push(TABS.BASIC_DEATAILS);
    }
    if (PERMISSION.ASSIGN_USER || false) {
      organizationTabArray.push(TABS.ASSIGN_USER);
    }
    if (PERMISSION.ASSIGN_ORGANIZATION || false) {
      organizationTabArray.push(TABS.ASSIGN_ORGANIZATION);
    }
  } else if (organizationType === ORG_TYPE.LSGI_VENDOR) {
    if (PERMISSION.BASIC_DEATAILS || false) {
      organizationTabArray.push(TABS.BASIC_DEATAILS);
    }
    if (PERMISSION.ASSIGN_VENDOR_ITEM || false) {
      organizationTabArray.push(TABS.ASSIGN_VENDOR_ITEM);
    }

  } else if (organizationType === ORG_TYPE.GO_DOWN) {
    if (PERMISSION.BASIC_DEATAILS || false) {
      organizationTabArray.push(TABS.BASIC_DEATAILS);
    }
  } else if ((organizationType === ORG_TYPE.PANCHAYATH) || (organizationType === ORG_TYPE.CORPORATION) || (organizationType === ORG_TYPE.MUNICIPALITY) || (organizationType === ORG_TYPE.BLOCK_PANCHAYATH) || (organizationType === ORG_TYPE.DISTRICT_PANCHAYATH)) {
    if (PERMISSION.BASIC_DEATAILS || false) {
      organizationTabArray.push(TABS.BASIC_DEATAILS);
    }
    if (PERMISSION.ASSIGN_USER || false) {
      organizationTabArray.push(TABS.ASSIGN_USER);
    }
    if (PERMISSION.ASSIGN_ROLES || false) {
      organizationTabArray.push(TABS.ASSIGN_ROLES);
    }
    if (PERMISSION.ASSIGN_MODULE || false) {
      organizationTabArray.push(TABS.ASSIGN_MODULE);
    }
    if (PERMISSION.SERVICE_PROVIDER || false) {
      organizationTabArray.push(TABS.SERVICE_PROVIDER);
    }
    if (PERMISSION.API_PROVIDER || false) {
      organizationTabArray.push(TABS.API_PROVIDER);
    }
    if (PERMISSION.ASSIGN_TEMPLATE || false) {
      organizationTabArray.push(TABS.ASSIGN_TEMPLATE);
    }
    if (PERMISSION.ASSIGN_CUSTOMER_TO_SERVICE_WORKER || false) {
      organizationTabArray.push(TABS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER);
    }
    if (PERMISSION.COMPLAINT_ESCALATION_MATRIX || false) {
      organizationTabArray.push(TABS.COMPLAINT_ESCALATION_MATRIX);
    }

  } else {
    if (PERMISSION.BASIC_DEATAILS || false) {
      organizationTabArray.push(TABS.BASIC_DEATAILS);
    }
    if (PERMISSION.ASSIGN_USER || false) {
      organizationTabArray.push();
    }
    if (PERMISSION.ASSIGN_ROLES || false) {
      organizationTabArray.push({ name: 'assignRole', label: 'assign_roles', component: <AssignOrganizationRoleTableView /> });
    }
    if (PERMISSION.ASSIGN_MODULE || false) {
      organizationTabArray.push({ name: 'assignModule', label: 'tab_assign_module', component: <AssignModule /> });
    }
    if (PERMISSION.SERVICE_PROVIDER || false) {
      organizationTabArray.push({ name: 'serviceprovider', label: 'tab_service_provider', component: <ServiceProvider /> });
    }
    if (PERMISSION.API_PROVIDER || false) {
      organizationTabArray.push({ name: 'apiProvider', label: 'tab_api_provider', component: <ApiProviderNewView /> });
    }
    if (PERMISSION.ASSIGN_TEMPLATE || false) {
      organizationTabArray.push({ name: 'assignTemplate', label: 'tab_assign_template', component: <AssignTemplate /> });
    }
    if (PERMISSION.ASSIGN_CUSTOMER_TO_SERVICE_WORKER || false) {
      organizationTabArray.push({ name: 'assignCustomerToServiceWorker', label: 'assign_customer_to_serviceworker', component: <AssignCustomersToServiceWorkerView /> });
    }
    if (PERMISSION.COMPLAINT_ESCALATION_MATRIX || false) {
      organizationTabArray.push({ name: 'complaintescalationmatrix', label: 'complaint_escalation_matrix', component: <ComplaintEscalationMatrixList /> });
    }
    if (PERMISSION.ASSIGN_VENDOR_ITEM || false) {
      organizationTabArray.push({ name: 'assignVendorItem', label: 'assign_item', component: <AssignVendorItem /> });
    }
    if (PERMISSION.ASSIGN_ORGANIZATION || false) {
      organizationTabArray.push({ name: 'assignOrganization', label: 'associate_organization', component: <AssignOrganization /> });
    }
    if (PERMISSION.ADDITIONAL_DETAILS || false) {
      organizationTabArray.push({ name: 'additionalBasicDetails', label: 'additional_basic_details', component: <AdditionalBasicDetails /> });
    }
  }
  const tabChangeCheck = (tabNo) => {
    dispatch(setTabIndex(tabNo));
  };

  const setTab = (type) => {
    let index = findTabIndex(organizationTabArray, type);

    switch (type) {
      case 'basic': {
        history.push(`${PATH.ORGANIZATION}/${id}/basic`);
        tabChangeCheck(index);
        break;
      }
      case 'assignUser':
        history.push(`${PATH.ORGANIZATION}/${id}/assignUser`);
        tabChangeCheck(index);
        break;

      case 'assignRole':
        history.push(`${PATH.ORGANIZATION}/${id}/assignRole`);
        tabChangeCheck(index);
        break;
      case 'assignModule':
        history.push(`${PATH.ORGANIZATION}/${id}/assignModule`);
        tabChangeCheck(index);
        break;
      case 'serviceprovider':
        history.push(`${PATH.ORGANIZATION}/${id}/serviceprovider`);
        tabChangeCheck(index);
        break;
      case 'apiProvider':
        history.push(`${PATH.ORGANIZATION}/${id}/apiProvider`);
        tabChangeCheck(index);
        break;
      case 'assignTemplate':
        history.push(`${PATH.ORGANIZATION}/${id}/assignTemplate`);

        tabChangeCheck(index);
        break;
      case 'assignCustomerToServiceWorker':
        history.push(`${PATH.ORGANIZATION}/${id}/assignCustomerToServiceWorker`);
        tabChangeCheck(index);
        break;
      case 'assignVendorItem':
        history.push(`${PATH.ORGANIZATION}/${id}/assignVendorItem`);
        tabChangeCheck(index);
        break;
      case 'assignOrganization':
        history.push(`${PATH.ORGANIZATION}/${id}/assignOrganization`);
        tabChangeCheck(index);
        break;
      case 'additionalBasicDetails':
        history.push(`${PATH.ORGANIZATION}/${id}/additionalBasicDetails`);
        tabChangeCheck(index);
        break;
      case 'complaintescalationmatrix':
        history.push(`${PATH.ORGANIZATION}/${id}/complaintescalationmatrix`);
        tabChangeCheck(index);
        break;

      default:

        break;
    }
  };

  useEffect(() => {
    organizationTabArray.length > 0 && setTab(findTabIndex(organizationTabArray, lastPath) > -1 ? lastPath : organizationTabArray[0].name);
    dispatch(resetSurvey());
    return () => {
      organizationTabArray = [];
      dispatch(resetFormChange());

    };
  }, []);
  let { tabs, tabPanels } = getTabDetails(organizationTabArray, setTab, selected);


  return (
    < CardComponent >
      <div className={classes.root2}>
        <AppBar position="static" className={classes.colorPrimary} >
          <Tabs value={selected}
            aria-label="Organization Tabs"
            variant="scrollable"
            scrollButtons="on"
          >
            {tabs}
          </Tabs>
        </AppBar>
        {tabPanels}
      </div>
    </CardComponent >
  );
};

export default OrganizationMainPageView;
