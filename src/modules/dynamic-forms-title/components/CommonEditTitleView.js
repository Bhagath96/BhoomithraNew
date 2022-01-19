import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Components } from '../../../common/components';
import commonTheme from '../../../common/theme';
import TitleBasciDetailView from './TitleBasciDetailView';
import QuestionsListView from './QuestionsListView';
import TitleQuestionValidation from './TitleQuestionValidation';
import TitileQuestionOptionMap from './TitileQuestionOptionMap';
import TitleCurrentAssociation from './TitleCurrentAssociation';
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
function CommonEditTitleView() {
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

    const commonEditTitleViewTabArray = [];

    if (hasAccessPermission(RESOURCE_MAPPING.TITLE_DETAILS, ACTION_MAPPING.TITLE_DETAILS.ACCESS_IN_TAB) || false) {
        commonEditTitleViewTabArray.push({ name: 'details', label: 'details', component: <TitleBasciDetailView /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.TITLE_QUESTION, ACTION_MAPPING.TITLE_QUESTION.ACCESS_IN_TAB) || false) {
        commonEditTitleViewTabArray.push({ name: 'questions', label: 'questions', component: <QuestionsListView /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.TITLE_QUESTION_VALIDATION, ACTION_MAPPING.TITLE_QUESTION_VALIDATION.ACCESS_IN_TAB) || false) {
        commonEditTitleViewTabArray.push({ name: 'questionsValidation', label: 'questions_validation', component: <TitleQuestionValidation /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.TITLE_QUESTION_OPTION_ASSOCIATION, ACTION_MAPPING.TITLE_QUESTION_OPTION_ASSOCIATION.ACCESS_IN_TAB) || false) {
        commonEditTitleViewTabArray.push({ name: 'questionOptionAssociation', label: 'question_option_association', component: <TitileQuestionOptionMap /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.TITLE_CURRENT_ASSOCIATION, ACTION_MAPPING.TITLE_CURRENT_ASSOCIATION.ACCESS_IN_TAB) || false) {
        commonEditTitleViewTabArray.push({ name: 'currentAssociation', label: 'current_association', component: <TitleCurrentAssociation /> });
    }


    const setTab = (type) => {
        let index = findTabIndex(commonEditTitleViewTabArray, type);
        switch (type) {
            case 'details': {
                history.push(`${PATH.DYNAMIC_TITLE}/${id}/details`);
                tabChangeCheck(index);
                break;
            }
            case 'questions':
                history.push(`${PATH.DYNAMIC_TITLE}/${id}/questions`);
                tabChangeCheck(index);
                break;
            case 'questionsValidation':
                history.push(`${PATH.DYNAMIC_TITLE}/${id}/questionsValidation`);
                tabChangeCheck(index);
                break;
            case 'questionOptionAssociation':
                history.push(`${PATH.DYNAMIC_TITLE}/${id}/questionOptionAssociation`);
                tabChangeCheck(index);
                break;
            case 'currentAssociation':
                history.push(`${PATH.DYNAMIC_TITLE}/${id}/currentAssociation`);
                tabChangeCheck(index);
                break;
            default:
                history.push(`${PATH.DYNAMIC_TITLE}/${id}/details`);
                tabChangeCheck(index);
                break;
        }
    };
    let { tabs, tabPanels } = getTabDetails(commonEditTitleViewTabArray, setTab, selected);

    useEffect(() => {
        setTab(findTabIndex(commonEditTitleViewTabArray, lastPath) > -1 ? lastPath : commonEditTitleViewTabArray[0].name);
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

export default CommonEditTitleView;
