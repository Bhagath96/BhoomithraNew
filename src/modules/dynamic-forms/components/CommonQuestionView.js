import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Components } from '../../../common/components';
import commonTheme from '../../../common/theme';
import GenerateQuestion from './GenerateQuestion';
import CurrentAssociationQuestion from './CurrentAssociationQuestion';
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

function CommonQuestionView() {
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

    const commonQuestionViewTabArray = [];

    if (hasAccessPermission(RESOURCE_MAPPING.QUESTION_DETAILS, ACTION_MAPPING.QUESTION_DETAILS.ACCESS_IN_TAB) || false) {
        commonQuestionViewTabArray.push({ name: 'details', label: 'details', component: <GenerateQuestion /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.QUESTION_CURRENT_ASSOCIATION, ACTION_MAPPING.QUESTION_CURRENT_ASSOCIATION.ACCESS_IN_TAB) || false) {
        commonQuestionViewTabArray.push({ name: 'currentAssociation', label: 'current_association', component: <CurrentAssociationQuestion /> });
    }
    const setTab = (type) => {
        let index = findTabIndex(commonQuestionViewTabArray, type);
        switch (type) {
            case 'details': {
                history.push(`${PATH.DYNAMIC_QUESTION}/${id}/details`);
                tabChangeCheck(index);
                break;
            }
            case 'currentAssociation':
                history.push(`${PATH.DYNAMIC_QUESTION}/${id}/currentAssociation`);
                tabChangeCheck(index);
                break;
            default:
                history.push(`${PATH.DYNAMIC_QUESTION}/${id}/details`);
                tabChangeCheck(index);
                break;
        }
    };
    let { tabs, tabPanels } = getTabDetails(commonQuestionViewTabArray, setTab, selected);

    useEffect(() => {
        setTab(findTabIndex(commonQuestionViewTabArray, lastPath) > -1 ? lastPath : commonQuestionViewTabArray[0].name);
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

export default CommonQuestionView;
