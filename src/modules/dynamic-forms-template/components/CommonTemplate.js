import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Components } from '../../../common/components';
import commonTheme from '../../../common/theme';
import AddTemplate from './AddTemplate';
import ListFragments from './ListFragments';
import CurrentAssociation from './CurrentAssociation';
import ListRoutes from './ListRoutes';
import { history } from '../../../common';
import { PATH } from '../../../routes';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTabIndex } from '../actions';
import { STATE_REDUCER_KEY } from '../constants';
import { resetFormChange } from '../../common/actions';
import { findTabIndex, getTabDetails } from '../../../utils/TabUtils';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';


const { Box, Typography, Tabs, AppBar, CardComponent } = Components;
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
    colorPrimary: commonTheme.tabAppbarColorPrimary
}));
function CommonEditTitleView() {
    const dispatch = useDispatch();
    const { commonTemplate: { selected = 0 } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    const classes = useStyles();
    const { id } = useParams();
    let location = useLocation();
    let curPath = location.pathname.split('/');
    let lastPath = curPath.pop();

    const tabChangeCheck = (tabNo) => {
        dispatch(resetFormChange());
        dispatch(setTabIndex(tabNo));
    };

    useEffect(() => {
        return () => {
            dispatch(resetFormChange());
        };
    }, []);


    const commonTemplateTabArray = [];

    if (hasAccessPermission(RESOURCE_MAPPING.TEMPLATE_DETAILS, ACTION_MAPPING.TEMPLATE_DETAILS.ACCESS_IN_TAB) || false) {
        commonTemplateTabArray.push({ name: 'basic', label: 'details', component: <AddTemplate /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.TEMPLATE_FRAGMENT, ACTION_MAPPING.TEMPLATE_FRAGMENT.ACCESS_IN_TAB) || false) {
        commonTemplateTabArray.push({ name: 'fragment', label: 'fragments', component: <ListFragments /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.TEMPLATE_ROUTE, ACTION_MAPPING.TEMPLATE_ROUTE.ACCESS_IN_TAB) || false) {
        commonTemplateTabArray.push({ name: 'routes', label: 'routes', component: <ListRoutes /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.TEMPLATE_CURRENT_ASSOCIATION, ACTION_MAPPING.TEMPLATE_CURRENT_ASSOCIATION.ACCESS_IN_TAB) || false) {
        commonTemplateTabArray.push({ name: 'currentAssociation', label: 'current_association', component: <CurrentAssociation /> });
    }

    const setTab = (type) => {
        let index = findTabIndex(commonTemplateTabArray, type);
        switch (type) {
            case 'basic':
                history.push(`${PATH.DYNAMIC_TEMPLATE}/${id}/basic`);
                tabChangeCheck(index);
                break;
            case 'fragment':
                history.push(`${PATH.DYNAMIC_TEMPLATE}/${id}/fragment`);
                tabChangeCheck(index);
                break;
            case 'routes':
                history.push(`${PATH.DYNAMIC_TEMPLATE}/${id}/routes`);
                tabChangeCheck(index);
                break;
            case 'currentAssociation':
                history.push(`${PATH.DYNAMIC_TEMPLATE}/${id}/currentAssociation`);
                tabChangeCheck(index);
                break;
            default:
                history.push(`${PATH.DYNAMIC_TEMPLATE}/${id}/basic`);
                tabChangeCheck(index);
                break;
        }
    };
    let { tabs, tabPanels } = getTabDetails(commonTemplateTabArray, setTab, selected);

    useEffect(() => {
        setTab(findTabIndex(commonTemplateTabArray, lastPath) > -1 ? lastPath : commonTemplateTabArray[0].name);
        return () => {
            dispatch(resetFormChange());
        };
    }, []);

    return (
        <CardComponent>
            <div className={classes.root}>
                <AppBar position="static" className={classes.colorPrimary}>
                    <Tabs value={selected} aria-label="simple tabs example">
                        {tabs}
                    </Tabs>
                </AppBar>
                {tabPanels}
            </div>
        </CardComponent>
    );
}

export default CommonEditTitleView;
