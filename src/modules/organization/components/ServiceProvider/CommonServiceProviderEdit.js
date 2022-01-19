import React, { useEffect } from 'react';
import { Components, I18n, makeStyles } from '../../../../common/components';
import BasicDetailEdit from './BasicDetailEdit';
import AssignedLocatiion from './AssignedLocatiion';
import AssignServiceAdmin from './AssignServiceAdmin';
import AssignWorkerLocation from './AssignWorkerLocation';
import AssignSuperVisorToWorker from './AssignSuperVisorToWorker';
import commonTheme from '../../../../common/theme';
import * as EnrollmentActions from '../../../dfg/actions';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { STATE_REDUCER_KEY as ENROLLMENT_STATE_REDUCER_KEY } from '../../../dfg/constants';
import ServiceList from './ServiceList';
import { STATE_REDUCER_KEY, serviceProviderTypeName } from '../../constants';
import { setTabIndexForServiceProvider, serviceProviderContactDetails } from '../../actions';
import { PATH } from '../../../../routes';
import { history } from '../../../../common';
import AlertDialog from '../../../../common/components/custom/AlertDialog';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import ReAssignSuperVisors from './ReAssignSuperVisors';
import ReAssignWorker from './ReAssignWorker';
import { DynamicForm } from '../../../dfg/containers';
import { TEMPLATE_TYPE_IDS, TEMPLATE_TYPES } from '../../../dfg/constants';
import { setDefaultOrganization } from '../../../user/actions';
import { findTabIndex, getTabDetails } from '../../../../utils/TabUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../../common/Permissions';
import { hasAccessPermission } from '../../../../utils/PermissionUtils';


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

function CommonServiceProviderEdit() {
    const { id, providerId: currentProviderId } = useParams();
    const providerId = currentProviderId ? Number(currentProviderId) : null;
    const classes = useStyles();
    const dispatch = useDispatch();
    const { completedSurveys, surveyTemplateFetchStatus } = useSelector(state => state[ENROLLMENT_STATE_REDUCER_KEY]);
    const { serviceProviderById: { data: { answerId = null } } } = useSelector(state => state.organization);
    let tabHiddingFlag = true;
    const { commonTemplateForServiceProvider: { selected = 0 } = {}, contactFormDfgLoaded } = useSelector(state => state[STATE_REDUCER_KEY]);
    let commonDetails = JSON.parse(localStorage.getItem('persist:root'));
    let providerTypeData = JSON.parse(commonDetails.common);
    let provider = providerTypeData?.serviceProviderTypeData?.serviceProviderTypeName || '';

    if (provider === serviceProviderTypeName) {
        tabHiddingFlag = false;
    } else {
        tabHiddingFlag = true;
    }

    let curPath = location.hash.split('/');
    let lastPath = curPath.pop();

    const userTabArray = [];
    const setTab = (type) => {
        let index = findTabIndex(userTabArray, type);

        switch (type) {
            case 'details':
                history.push(`${PATH.ORGANIZATION}/${id}/serviceProvider/${providerId}/details`);
                dispatch(setTabIndexForServiceProvider(index));
                break;
            case 'assignedLocation':
                history.push(`${PATH.ORGANIZATION}/${id}/serviceProvider/${providerId}/assignedLocation`);
                dispatch(setTabIndexForServiceProvider(index));
                break;
            case 'assignworker':
                history.push(`${PATH.ORGANIZATION}/${id}/serviceProvider/${providerId}/assignworker`);
                dispatch(setTabIndexForServiceProvider(index));
                break;
            case 'assignedWorkerLocation':
                history.push(`${PATH.ORGANIZATION}/${id}/serviceProvider/${providerId}/assignedWorkerLocation`);
                dispatch(setTabIndexForServiceProvider(index));
                break;
            case 'assignedWorkerToSuperVisor':
                history.push(`${PATH.ORGANIZATION}/${id}/serviceProvider/${providerId}/assignedWorkerToSuperVisor`);
                dispatch(setTabIndexForServiceProvider(index));
                break;
            case 'service':
                history.push(`${PATH.ORGANIZATION}/${id}/serviceProvider/${providerId}/service`);
                dispatch(setTabIndexForServiceProvider(index));
                break;
            case 'contactDetail':
                history.push(`${PATH.ORGANIZATION}/${id}/serviceProvider/${providerId}/contactDetail`);
                dispatch(setTabIndexForServiceProvider(index));
                break;
            case 'reassignSuperVisor':
                history.push(`${PATH.ORGANIZATION}/${id}/serviceProvider/${providerId}/reassignSuperVisor`);
                dispatch(setTabIndexForServiceProvider(index));
                break;
            case 'reAssignWorker':
                history.push(`${PATH.ORGANIZATION}/${id}/serviceProvider/${providerId}/reAssignWorker`);
                dispatch(setTabIndexForServiceProvider(index));
                break;
            default:
                history.push(`${PATH.ORGANIZATION}/${id}/basic`);
                dispatch(setTabIndexForServiceProvider(index));
                break;
        }
    };
    useEffect(() => {
        dispatch(setDefaultOrganization({ id: Number(id) }));
        if ((!contactFormDfgLoaded) && (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_CONTACT, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_CONTACT.ACCESS_IN_TAB) || false)) {
            dispatch(serviceProviderContactDetails({
                surveyId: answerId,
                templateTypeId: TEMPLATE_TYPE_IDS[TEMPLATE_TYPES.SERVICE_PROVIDER],
                id: Number(id),
                providerId
            }));
        }
    }, [answerId]);

    const clearMessage = () => {
        dispatch(EnrollmentActions.clearSurveyDataFetchMessage());
    };

    if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_DETAILS, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_DETAILS.ACCESS_IN_TAB) || false) {
        userTabArray.push({ name: 'details', label: 'basic_details', component: <BasicDetailEdit /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_LOCATION, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_LOCATION.ACCESS_IN_TAB) || false) {
        userTabArray.push({ name: 'assignedLocation', label: 'assigned_location', component: <AssignedLocatiion /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER.ACCESS_IN_TAB) || false) {
        userTabArray.push({ name: 'assignworker', label: 'assign_worker', component: <AssignServiceAdmin /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER_LOCATION, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER_LOCATION.ACCESS_IN_TAB) || false) {
        userTabArray.push({ name: 'assignedWorkerLocation', label: 'assign_worker_location', component: <AssignWorkerLocation /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER_TO_SUPERVISOR, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_WORKER_TO_SUPERVISOR.ACCESS_IN_TAB) || false) {
        userTabArray.push({ name: 'assignedWorkerToSuperVisor', label: 'assign_worker_to_super_visor', component: <AssignSuperVisorToWorker /> });
    }
    if (tabHiddingFlag && hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_SERVICE, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_SERVICE.ACCESS_IN_TAB) || false) {
        userTabArray.push({ name: 'service', label: 'service', component: <ServiceList /> });
    } if (contactFormDfgLoaded && hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_CONTACT, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_CONTACT.ACCESS_IN_TAB) || false) {
        userTabArray.push({ name: 'contactDetail', label: 'contact_details', component: <DynamicForm /> });
    } if (tabHiddingFlag && hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_REASSIGN_SUPERVISOR, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_REASSIGN_SUPERVISOR.ACCESS_IN_TAB) || false) {
        userTabArray.push({ name: 'reassignSuperVisor', label: 'reassign_supervisor', component: <ReAssignSuperVisors /> });
    } if (tabHiddingFlag && hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_REASSIGN_WORKER, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_REASSIGN_WORKER.ACCESS_IN_TAB) || false) {
        userTabArray.push({ name: 'reAssignWorker', label: 'reassign_worker', component: <ReAssignWorker /> });
    }

    useEffect(() => {
        userTabArray.length > 0 && setTab(findTabIndex(userTabArray, lastPath) > -1 ? lastPath : userTabArray[0].name);
    }, []);
    let { tabs, tabPanels } = getTabDetails(userTabArray, setTab, selected);
    return (
        <CardComponent>
            <div className={classes.root2}>
                <AppBar position="static" className={classes.colorPrimary}>
                    <Tabs value={selected}
                        aria-label="Organization Tabs"
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
                            dispatch(EnrollmentActions.setSurveyTemplateMessage(undefined));

                        }}
                        onCancel={() => { }} />
                }
            </div >
        </CardComponent >

    );
}

export default CommonServiceProviderEdit;
