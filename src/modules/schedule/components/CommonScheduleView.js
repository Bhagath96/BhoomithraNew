import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

import { makeStyles, Components, I18n } from '../../../common/components';
import { resetFormChange } from '../../common/actions';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setEditTabIndex } from '../actions';
import { STATE_REDUCER_KEY } from '../constants';
import { history } from '../../../common';
import { PATH } from '../../../routes';
import { CreateOrEditSchedule, ListSchedules } from '.';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { themeColors } from '../../../common/theme';
import { findTabIndex, getTabDetails } from '../../../utils/TabUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';
const { Box, Typography, Tabs, AppBar, CardComponent, SomethingWrong } = Components;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};


const useStyles = makeStyles(() => ({
  colorPrimary: {
    backgroundColor: themeColors.themePrimaryColor

  }
}));
const CommonScheduleView = withErrorBoundary(() => {
  const classes = useStyles();
  const { formChange } = useSelector(state => state.common);
  const dispatch = useDispatch();
  const { commonEditTemplate: { selected = 0 } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
  let curPath = location.hash.split('/');
  let lastPath = curPath.pop();

  const tabChangeCheck = (tabNo) => {
    if (formChange?.isDirty) {
      Swal.fire({
        title: I18n.t('unsaved_changes_warning'),
        showCancelButton: true,
        confirmButtonText: I18n.t('yes'),
        cancelButtonText: I18n.t('no')
      }).then((result) => {
        if (result.value) {
          dispatch(resetFormChange());
          dispatch(setEditTabIndex(tabNo));

        }
      });
    } else {
      dispatch(setEditTabIndex(tabNo));
    }
  };
  const scheduleTabArray = [];

  if (hasAccessPermission(RESOURCE_MAPPING.SCHEDULE_CREATE_SCHEDULE, ACTION_MAPPING.SCHEDULE_CREATE_SCHEDULE.ACCESS_IN_TAB) || false) {
    scheduleTabArray.push({ name: 'create', label: 'create', component: <CreateOrEditSchedule /> });
  }
  if (hasAccessPermission(RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE.ACCESS_IN_TAB) || false) {
    scheduleTabArray.push({ name: 'list', label: 'list_schedule', component: <ListSchedules /> });
  }
  const setTab = (type) => {
    let index = findTabIndex(scheduleTabArray, type);
    switch (type) {
      case 'create': {
        history.push(`${PATH.SCHEDULE}/create`);
        tabChangeCheck(index);
        break;
      }
      case 'list':
        history.push(`${PATH.SCHEDULE}/list`);
        tabChangeCheck(index);
        break;

      default:
        history.push(`${PATH.SCHEDULE}`);
        tabChangeCheck(index);
        break;
    }
  };

  let { tabs, tabPanels } = getTabDetails(scheduleTabArray, setTab, selected);

  useEffect(() => {
    setTab(findTabIndex(scheduleTabArray, lastPath) > -1 ? lastPath : scheduleTabArray[0]?.name);
    return () => {
      dispatch(resetFormChange());
    };
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
},
  {
    FallbackComponent: SomethingWrong
  });

export default CommonScheduleView;
