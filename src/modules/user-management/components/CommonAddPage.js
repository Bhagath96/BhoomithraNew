import React, { useEffect } from 'react';
import { makeStyles, Components } from '../../../common/components';
import AddUserView from './AddUserView';
import AddContact from './AddContact';
import AddPassword from './AddPassword';
import UpdateAddress from './UpdateAddress';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../common';
import { PATH } from '../../../routes';
import { STATE_REDUCER_KEY } from '../constants';
import { setTabIndexForUser } from '../actions';
import { useParams } from 'react-router-dom';
import commonTheme from '../../../common/theme';
import AssignOrganizationTableView from './AssignOrganizationTableView';
import AssignRoleTableView from './AssignRoleTableView';
import AssignUserGroupTableView from './AssignUserGroupTableView';
import { findTabIndex, getTabDetails } from '../../../utils/TabUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';
import { hasAccessPermission } from '../../../utils/PermissionUtils';

const { Tabs, AppBar, CardComponent } = Components;
const useStyles = makeStyles(() => ({
  colorPrimary: commonTheme.tabAppbarColorPrimary
}));

function CommonAddPage() {

  const { commonTemplateForUser: { selected = 0 } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const classes = useStyles();
  const userTabArray = [];

  let curPath = location.hash.split('/');
  let lastPath = curPath.pop();

  if (hasAccessPermission(RESOURCE_MAPPING.USER_DETAILS, ACTION_MAPPING.USER_DETAILS.ACCESS_IN_TAB) || false) {
    userTabArray.push({ name: 'details', label: 'details', component: <AddUserView /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.USER_CONTACT, ACTION_MAPPING.USER_CONTACT.ACCESS_IN_TAB) || false) {
    userTabArray.push({ name: 'addContact', label: 'contact', component: <AddContact /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.USER_CHANGE_PASSWORD, ACTION_MAPPING.USER_CHANGE_PASSWORD.ACCESS_IN_TAB) || false) {
    userTabArray.push({ name: 'addPassword', label: 'change_password', component: <AddPassword /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.USER_UPDATE_ADDRESS, ACTION_MAPPING.USER_UPDATE_ADDRESS.ACCESS_IN_TAB) || false) {
    userTabArray.push({ name: 'updateAddress', label: 'update_address', component: <UpdateAddress /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.USER_ASSIGN_ORGANIZATION, ACTION_MAPPING.USER_ASSIGN_ORGANIZATION.ACCESS_IN_TAB) || false) {
    userTabArray.push({ name: 'assignOrganizations', label: 'assign_organization', component: <AssignOrganizationTableView /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.USER_ASSIGN_ROLES, ACTION_MAPPING.USER_ASSIGN_ROLES.ACCESS_IN_TAB) || false) {
    userTabArray.push({ name: 'assignRolesView', label: 'assign_roles', component: <AssignRoleTableView /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.USER_ASSIGN_USER_GROUPS, ACTION_MAPPING.USER_ASSIGN_USER_GROUPS.ACCESS_IN_TAB) || false) {
    userTabArray.push({ name: 'assignUserGroupView', label: 'assign_user_group', component: <AssignUserGroupTableView /> });
  }


  const setTab = (type) => {
    let index = findTabIndex(userTabArray, type);
    switch (type) {
      case 'details': {
        history.push(`${PATH.USER}/${id}/details`);
        dispatch(setTabIndexForUser(index));
        break;
      }
      case 'addContact':
        history.push(`${PATH.USER}/${id}/addContact`);
        dispatch(setTabIndexForUser(index));
        break;
      case 'addPassword':
        history.push(`${PATH.USER}/${id}/addPassword`);
        dispatch(setTabIndexForUser(index));
        break;
      case 'updateAddress':
        history.push(`${PATH.USER}/${id}/updateAddress`);
        dispatch(setTabIndexForUser(index));
        break;
      case 'assignOrganizations':
        history.push(`${PATH.USER}/${id}/assignOrganizations`);
        dispatch(setTabIndexForUser(index));
        break;
      case 'assignRolesView':
        history.push(`${PATH.USER}/${id}/assignRolesView`);
        dispatch(setTabIndexForUser(index));
        break;
      case 'assignUserGroupView':
        history.push(`${PATH.USER}/${id}/assignUserGroupView`);
        dispatch(setTabIndexForUser(index));
        break;
      default:
        history.push(`${PATH.USER}/${id}/details`);
        dispatch(setTabIndexForUser(index));
        break;
    }
  };
  let { tabs, tabPanels } = getTabDetails(userTabArray, setTab, selected);

  useEffect(() => {
    userTabArray.length > 0 && setTab(findTabIndex(userTabArray, lastPath) > -1 ? lastPath : userTabArray[0].name);
  }, []);

  return (
    <CardComponent>
      <div className={classes.root}>
        <AppBar position="static" className={classes.colorPrimary}>
          <Tabs value={selected}
            aria-label="User Tabs"
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
}

export default CommonAddPage;
