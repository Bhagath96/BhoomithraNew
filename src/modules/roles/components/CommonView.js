import React, { useEffect } from 'react';
import ListRegularRole from './ListRegularRole';
import OrganisationRoles from './OrganisationRoles';
import { makeStyles, Components } from '../../../common/components';
import commonTheme from '../../../common/theme';
import { useDispatch, useSelector } from 'react-redux';
import { STATE_REDUCER_KEY } from '../constants';
import { history } from '../../../common';
import { PATH } from '../../../routes';
import { setTabIndex } from '../actions';
import { findTabIndex, getTabDetails } from '../../../utils/TabUtils';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const { Tabs, AppBar, CardComponentForList } = Components;
const useStyles = makeStyles(() => ({
  colorPrimary: commonTheme.tabAppbarColorPrimary
}));
function commonView() {
  const classes = useStyles();
  const { commonTemplate: { selected = 0 } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
  const dispatch = useDispatch();
  let curPath = location.hash.split('/');
  let lastPath = curPath.pop();

  const commonViewTabArray = [];


  if (hasAccessPermission(RESOURCE_MAPPING.ROLES_REGULAR, ACTION_MAPPING.ROLES_REGULAR.ACCESS_IN_TAB) || false) {
    commonViewTabArray.push({ name: 'regularRoles', label: 'regular_roles', component: <ListRegularRole /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.ROLES_ORGANIZATIONAL, ACTION_MAPPING.ROLES_ORGANIZATIONAL.ACCESS_IN_TAB) || false) {
    commonViewTabArray.push({ name: 'organization-role', label: 'organization_roles', component: <OrganisationRoles /> });
  }


  const setTab = (type) => {
    let index = findTabIndex(commonViewTabArray, type);
    switch (type) {
      case 'regularRoles': {
        history.push(`${PATH.REG_ROLE}`);
        dispatch(setTabIndex(index));
        break;
      }
      case 'organization-role':
        history.push(`${PATH.ORG_ROLE}`);
        dispatch(setTabIndex(index));
        break;
      default:
        history.push(`${PATH.REG_ROLE}`);
        dispatch(setTabIndex(index));
        break;
    }
  };

  let { tabs, tabPanels } = getTabDetails(commonViewTabArray, setTab, selected);

  useEffect(() => {
    commonViewTabArray.length > 0 && setTab(findTabIndex(commonViewTabArray, lastPath) > -1 ? lastPath : commonViewTabArray[0].name);
  }, []);

  return (
    <CardComponentForList>
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
    </CardComponentForList>

  );
}

export default commonView;
