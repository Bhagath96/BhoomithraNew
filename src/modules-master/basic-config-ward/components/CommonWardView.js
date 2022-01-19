import React, { useEffect } from 'react';
import { Components, makeStyles, I18n } from '../../../common/components';
import commonTheme from '../../../common/theme';
import BasicDetailsWard from './BasicDetailsWard';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ListResidentialAsscociations from './ListResidentialAssociations';
import { resetFormChange } from '../../../modules/common/actions';
import * as dfgActions from '../../../modules/dfg/actions';
import { STATE_REDUCER_KEY } from '../../../modules/dfg/constants';
import { STATE_REDUCER_KEY as WARD_REDUCER_KEY } from '../constants';
import { history } from '../../../common';
import { PATH } from '../../../routes';
import { setTabIndex } from '../actions';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import { findTabIndex, getTabDetails } from '../../../utils/TabUtils';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';


const {
  AppBar,
  Tabs,
  CardComponent,
  AlertDialog
} = Components;

const useStyles = makeStyles(() => ({
  colorPrimary: commonTheme.tabAppbarColorPrimary
}));

function CommonWardView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id: wardId } = useParams();
  let curPath = location.hash.split('/');
  let lastPath = curPath.pop();
  const { completedSurveys, surveyTemplateFetchStatus } = useSelector((state) => state[STATE_REDUCER_KEY]);
  const { commonTemplate: { selected = 0 } = {}, selectedWard: { data: { organizationId = null } } } = useSelector(state => state[WARD_REDUCER_KEY]);
  const clearMessage = () => {
    dispatch(dfgActions.clearSurveyDataFetchMessage());
  };
  const userTabArray = [];
  const setTab = (type) => {
    let index = findTabIndex(userTabArray, type);
    if (wardId) {
      switch (type) {
        case 'details': {
          history.push(`${PATH.BASIC_CONFIG_WARD}/${wardId}/details`);
          dispatch(setTabIndex(index));
          break;
        }
        case 'residentialAssociation':
          organizationId && history.push(`${PATH.BASIC_CONFIG_WARD}/${wardId}/residentialAssociation`);
          dispatch(setTabIndex(index));
          break;
        default:
          history.push(`${PATH.BASIC_CONFIG_WARD}/${wardId}/details`);
          dispatch(setTabIndex(index));
          break;
      }
    } else {
      switch (type) {
        case 'details': {
          history.push(`${PATH.BASIC_CONFIG_WARD}/create`);
          dispatch(setTabIndex(index));
          break;
        }
        default:
          history.push(`${PATH.BASIC_CONFIG_WARD}/create`);
          dispatch(setTabIndex(index));
          break;
      }
    }

  };
  useEffect(() => {
    setTab(lastPath || 'details');
    return () => {
      dispatch(resetFormChange());
    };
  }, []);
  if (hasAccessPermission(RESOURCE_MAPPING.WARD, ACTION_MAPPING.WARD.EDIT_WARD) || false) {
    userTabArray.push({ name: 'details', label: 'details', component: <BasicDetailsWard /> });
  } if (hasAccessPermission(RESOURCE_MAPPING.WARD, ACTION_MAPPING.WARD.EDIT_WARD) || false) {
    userTabArray.push({ name: 'residentialAssociation', label: 'residential_association', component: <ListResidentialAsscociations /> });
  }

  let { tabs, tabPanels } = getTabDetails(userTabArray, setTab, selected);
  useEffect(() => {
    setTab(findTabIndex(userTabArray, lastPath) > -1 ? lastPath : userTabArray[0].name);
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
        {
          <AlertDialog
            isOPen={completedSurveys?.infoMessage}
            content={I18n.t(completedSurveys?.infoMessage)}
            onOk={clearMessage}
          />
        }
        {
          <AlertDialog
            isOPen={completedSurveys?.showDownloadingSurveyDataModal}
            icon={<CloudDownloadOutlinedIcon />}
            content={I18n.t('downloading_survey_data')}
          />
        }
        {
          <AlertDialog
            isOPen={surveyTemplateFetchStatus?.message !== undefined}
            content={I18n.t(surveyTemplateFetchStatus?.message)}
            onOk={() => {
              // set message as undefined
              dispatch(dfgActions.setSurveyTemplateMessage(undefined));
            }}
            onCancel={() => { }}
          />
        }
      </div>
    </CardComponent>
  );
}

export default CommonWardView;
