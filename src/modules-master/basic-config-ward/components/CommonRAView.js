import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Components, makeStyles, I18n } from '../../../common/components';
import commonTheme from '../../../common/theme';
import BasicDetailsRA from './BasicDetailsRA';

import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { STATE_REDUCER_KEY, TEMPLATE_TYPES, TEMPLATE_TYPE_IDS } from '../../../modules/dfg/constants';
import { fetchRAById, fetchResidentialAssociationTemplate, residentialAssociationTemalateLoadFlag } from '../actions';
// import Swal from 'sweetalert2';
import { STATE_REDUCER_KEY as WARD_REDUCER_KEY } from '../constants';
import { history } from '../../../common';
import { PATH } from '../../../routes';
import { setTabIndexRA } from '../actions';
import { resetFormChange } from '../../../modules/common/actions';
import { DynamicForm } from '../../../modules/dfg/containers';
import { setDefaultOrganization } from '../../../modules/user/actions';
import { fetchWardById } from '../actions';
import { clearSurveyDataFetchMessage, resetSurvey } from '../../../modules/dfg/actions';
import LoadingCustomOverlay from '../../../common/components/custom/LoadingOverlay';


const { AppBar, Tabs, Tab, HorizontalTabPanel: TabPanel, CardComponent, AlertDialog } = Components;

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}
const useStyles = makeStyles(() => ({
    colorPrimary: commonTheme.tabAppbarColorPrimary
}));

function CommonRAView() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id: RAId, wardId } = useParams();
    let curPath = location.hash.split('/');
    let lastPath = curPath.pop();
    const { completedSurveys
        // ,surveyTemplateFetchStatus
    } = useSelector(state => state[STATE_REDUCER_KEY]);
    const { selectedRA: { data: { id: residentialId, answerId: surveyId = null } } } = useSelector(state => state.wards);
    const { commonTemplateRA: { selected = 0 } = {}, selectedWard: { data: { organizationId = null } }, templateLoaded = false } = useSelector(state => state[WARD_REDUCER_KEY]);
    const id = RAId ? RAId : residentialId;
    // const surveyId = selectedRA?.data?.surveyId ? selectedRA.data.surveyId : false;
    useEffect(() => {
        id && dispatch(fetchWardById(wardId));
        if (!isNaN(id)) {
            dispatch(fetchRAById(id));
        }
        dispatch(resetFormChange());
    }, []);
    useEffect(() => {
        if (residentialId && organizationId) {
            dispatch(setDefaultOrganization({ id: organizationId }));
            dispatch(fetchResidentialAssociationTemplate({
                surveyId,
                templateTypeId: TEMPLATE_TYPE_IDS[TEMPLATE_TYPES.RESIDENTIAL_ASSOCIATION],
                organizationId,
                residentialAssociationId: id,
                wardId
            }));

        }

    }, [residentialId, organizationId]);

    const onTabChange = () => {
        // dispatch(({
        //     surveyId: residentialId,
        //     templateTypeId: TEMPLATE_TYPE_IDS[TEMPLATE_TYPES.SERVICE_PROVIDER],
        //     id
        // }));
    };
    const tabChangeCheck = (tabNo) => {
        dispatch(resetFormChange());
        dispatch(setTabIndexRA(tabNo));

    };

    const clearMessage = () => {
        dispatch(clearSurveyDataFetchMessage());
    };

    const setTab = (type) => {
        if (id) {
            switch (type) {
                case 'details': {
                    history.push(`${PATH.BASIC_CONFIG_WARD}/${wardId}/residentialAssociation/${id}/details`);
                    tabChangeCheck(0);
                    break;
                }
                case 'contact':
                    history.push(`${PATH.BASIC_CONFIG_WARD}/${wardId}/residentialAssociation/${id}/contact`);
                    tabChangeCheck(1);
                    break;
                default:
                    history.push(`${PATH.BASIC_CONFIG_WARD}/${wardId}/residentialAssociation/${id}/details`);
                    tabChangeCheck(0);
                    break;
            }
        } else {
            history.push(`${PATH.BASIC_CONFIG_WARD}/${wardId}/residentialAssociation/create`);
            tabChangeCheck(0);
        }
    };
    React.useEffect(() => {
        setTab(lastPath || 'details');
        return () => {
            dispatch(resetFormChange());
            dispatch(residentialAssociationTemalateLoadFlag(false));
            dispatch(resetSurvey());
        };
    }, []);
    const multipleFunctionCall = (type) => {
        onTabChange();
        setTab(type);
    };
    return (
        <CardComponent>
            <div className={classes.root}>
                <AppBar position="static" className={classes.colorPrimary}>
                    <Tabs value={selected}
                        aria-label="UserGroup Tabs"
                        variant="scrollable"
                        scrollButtons="on"
                    >
                        <Tab label={I18n.t('basic_details')}{...a11yProps(0)} onClick={() => multipleFunctionCall('details')} />
                        {(residentialId || surveyId) && organizationId ? <Tab label={I18n.t('contact_details')}{...a11yProps(1)} onClick={() => multipleFunctionCall('contact')} /> : null}
                    </Tabs>
                </AppBar>
                <TabPanel value={selected} index={0}>
                    <BasicDetailsRA />
                </TabPanel>
                <TabPanel value={selected} index={1}>
                    {templateLoaded ? <DynamicForm /> : <div style={{ width: '100%', height: '100px' }}>
                        <LoadingCustomOverlay active={!templateLoaded} />
                    </div>}
                </TabPanel>
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
                {/* {
                    <AlertDialog
                        isOPen={surveyTemplateFetchStatus?.message !== undefined}
                        content={I18n.t(surveyTemplateFetchStatus?.message)}
                        onOk={() => {
                            // set message as undefined
                            dispatch(dfgActions.setSurveyTemplateMessage(undefined));

                        }}
                        onCancel={clearMessage} />
                } */}
            </div>
        </CardComponent>

    );
}

export default CommonRAView;
