import React, { useEffect } from 'react';
import { makeStyles, Components } from '../../../common/components';
import EditRolePermission from './EditRolePermission';
import EditRoleView from './EditRoleView';
import { useDispatch, useSelector } from 'react-redux';
import { setEditTabIndex } from '../actions';
import { STATE_REDUCER_KEY } from '../constants';
import { history } from '../../../common';
import { PATH } from '../../../routes';
import { useParams } from 'react-router-dom';
import commonTheme from '../../../common/theme';
import RoleAssignToUserTableView from './RoleAssignToUserTableView';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';
import { findTabIndex, getTabDetails } from '../../../utils/TabUtils';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import ConfigDataAccess from './ConfigDataAccess';

const { Tabs, AppBar, CardComponent } = Components;
const useStyles = makeStyles(() => ({
  colorPrimary: commonTheme.tabAppbarColorPrimary

}));
function CommonEditView() {
  const classes = useStyles();
  const { id, roleType } = useParams();
  const dispatch = useDispatch();
  const { commonEditTemplate: { selected = 0 } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
  let curPath = location.hash.split('/');
  let lastPath = curPath.pop();
  const setRoleTypePath = () => {
    let selectedPath = '';
    if (+roleType === 0) {
      // is ORGANIZATION_ROLE
      selectedPath = PATH.ORG_ROLE;
    } else if (+roleType === 1) {
      // is REGULAR_ROLE
      selectedPath = PATH.REG_ROLE;
    }
    return selectedPath;
  };


  const roleTabArray = [];


  if (hasAccessPermission(RESOURCE_MAPPING.ROLES_REGULAR_DETAILS, ACTION_MAPPING.ROLES_REGULAR_DETAILS.ACCESS_IN_TAB) || hasAccessPermission(RESOURCE_MAPPING.ROLES_ORGANIZATIONAL_DETAILS, ACTION_MAPPING.ROLES_ORGANIZATIONAL_DETAILS.ACCESS_IN_TAB) || false) {
    roleTabArray.push({ name: 'roles', label: 'roles', component: <EditRoleView /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.ROLES_REGULAR_PERMISSION, ACTION_MAPPING.ROLES_REGULAR_PERMISSION.ACCESS_IN_TAB) || hasAccessPermission(RESOURCE_MAPPING.ROLES_ORGANIZATIONAL_PERMISSION, ACTION_MAPPING.ROLES_ORGANIZATIONAL_PERMISSION.ACCESS_IN_TAB) || false) {
    roleTabArray.push({ name: 'permissions', label: 'permissions', component: <EditRolePermission /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.ROLES_REGULAR_ASSIGNEE, ACTION_MAPPING.ROLES_REGULAR_ASSIGNEE.ACCESS_IN_TAB) || hasAccessPermission(RESOURCE_MAPPING.ROLES_ORGANIZATIONAL_ASSIGNEE, ACTION_MAPPING.ROLES_ORGANIZATIONAL_ASSIGNEE.ACCESS_IN_TAB) || false) {
    roleTabArray.push({ name: 'dataAccess', label: 'data_access', component: <ConfigDataAccess /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.ROLES_REGULAR_ASSIGNEE, ACTION_MAPPING.ROLES_REGULAR_ASSIGNEE.ACCESS_IN_TAB) || hasAccessPermission(RESOURCE_MAPPING.ROLES_ORGANIZATIONAL_ASSIGNEE, ACTION_MAPPING.ROLES_ORGANIZATIONAL_ASSIGNEE.ACCESS_IN_TAB) || false) {
    roleTabArray.push({ name: 'assignees', label: 'assignees', component: <RoleAssignToUserTableView /> });
  }


  const setTab = (type) => {
    let index = findTabIndex(roleTabArray, type);
    switch (type) {
      case 'roles': {
        history.push(`${setRoleTypePath()}/${roleType}/${id}/roles`);
        dispatch(setEditTabIndex(index));
        break;
      }
      case 'permissions':
        history.push(`${setRoleTypePath()}/${roleType}/${id}/permissions`);
        dispatch(setEditTabIndex(index));
        break;
      case 'assignees':
        history.push(`${setRoleTypePath()}/${roleType}/${id}/assignees`);
        dispatch(setEditTabIndex(index));
        break;
      case 'dataAccess':
        history.push(`${setRoleTypePath()}/${roleType}/${id}/dataAccess`);
        dispatch(setEditTabIndex(index));
        break;

      default:
        history.push(`${setRoleTypePath()}/${roleType}/${id}/roles} `);
        dispatch(setEditTabIndex(index));
        break;
    }
  };

  let { tabs, tabPanels } = getTabDetails(roleTabArray, setTab, selected);

  useEffect(() => {
    setTab(findTabIndex(roleTabArray, lastPath) > -1 ? lastPath : roleTabArray[0].name);
  }, []);

  return (
    <CardComponent>
      <div className={classes.root}>
        <AppBar position="static" className={classes.colorPrimary}>
          <Tabs value={selected}
            aria-label="UserGroup Tabs"
            variant="scrollable"
            scrollButtons="on"
          >
            {tabs}
          </Tabs>
        </AppBar>
        {tabPanels}
      </div>
    </CardComponent>

  );
}

export default CommonEditView;
