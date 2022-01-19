import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Components } from '../../../common/components';
import commonTheme from '../../../common/theme';
import FragmentBasicDetailView from './FragmentBasicDetailView';
import FragmentTitleAssociationView from './FragmentTitleAssociationView';
import FragmentQsLoop from './FragmentQsLoop';
import CurrentAssociationFragment from './CurrentAssociationFragment';
import { useDispatch, useSelector } from 'react-redux';
import { resetFormChange } from '../../common/actions';
import { STATE_REDUCER_KEY } from '../constants';
import { useParams } from 'react-router-dom';
import { history } from '../../../common';
import { PATH } from '../../../routes';
import { setTabIndex } from '../actions';

import { findTabIndex, getTabDetails } from '../../../utils/TabUtils';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';


const { Box, Tabs, AppBar, CardComponent } = Components;
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
                    <div>{children}</div>
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
    colorPrimary: commonTheme.tabAppbarColorPrimary
}));
function CommonFragmentEditView() {
    const classes = useStyles();
    const { commonTemplate: { selected = 0 } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);

    const dispatch = useDispatch();
    const { id } = useParams();
    let curPath = location.hash.split('/');
    let lastPath = curPath.pop();

    const tabChangeCheck = (tabNo) => {
        dispatch(resetFormChange());
        dispatch(setTabIndex(tabNo));
    };

    const commonFragmentEditViewTabArray = [];


    if (hasAccessPermission(RESOURCE_MAPPING.FRAGMENT_DETAILS, ACTION_MAPPING.FRAGMENT_DETAILS.ACCESS_IN_TAB) || false) {
        commonFragmentEditViewTabArray.push({ name: 'details', label: 'details', component: <FragmentBasicDetailView /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.FRAGMENT_ASSIGN_TITLE, ACTION_MAPPING.FRAGMENT_ASSIGN_TITLE.ACCESS_IN_TAB) || false) {
        commonFragmentEditViewTabArray.push({ name: 'assignTitle', label: 'assign_title', component: <FragmentTitleAssociationView /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.FRAGMENT_QUESTION_FRAGMENT_LOOP, ACTION_MAPPING.FRAGMENT_QUESTION_FRAGMENT_LOOP.ACCESS_IN_TAB) || false) {
        commonFragmentEditViewTabArray.push({ name: 'fragmentQuestionLoop', label: 'fragment_question_loop', component: <FragmentQsLoop /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.FRAGMENT_CURRENT_ASSOCIATION, ACTION_MAPPING.FRAGMENT_CURRENT_ASSOCIATION.ACCESS_IN_TAB) || false) {
        commonFragmentEditViewTabArray.push({ name: 'currentAssociation', label: 'current_association', component: <CurrentAssociationFragment /> });
    }


    const setTab = (type) => {
        let index = findTabIndex(commonFragmentEditViewTabArray, type);
        switch (type) {
            case 'details': {
                history.push(`${PATH.DYNAMIC_FRAGMENT}/${id}/details`);
                tabChangeCheck(index);
                break;
            }
            case 'assignTitle':
                history.push(`${PATH.DYNAMIC_FRAGMENT}/${id}/assignTitle`);
                tabChangeCheck(index);
                break;
            case 'fragmentQuestionLoop':
                history.push(`${PATH.DYNAMIC_FRAGMENT}/${id}/fragmentQuestionLoop`);
                tabChangeCheck(index);
                break;
            case 'currentAssociation':
                history.push(`${PATH.DYNAMIC_FRAGMENT}/${id}/currentAssociation`);
                tabChangeCheck(index);
                break;
            default:
                history.push(`${PATH.DYNAMIC_FRAGMENT}/${id}/details`);
                tabChangeCheck(index);
                break;
        }
    };
    let { tabs, tabPanels } = getTabDetails(commonFragmentEditViewTabArray, setTab, selected);

    useEffect(() => {
        setTab(findTabIndex(commonFragmentEditViewTabArray, lastPath) > -1 ? lastPath : commonFragmentEditViewTabArray[0].name);
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
}

export default CommonFragmentEditView;
