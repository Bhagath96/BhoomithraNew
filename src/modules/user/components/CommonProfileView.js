import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Components, I18n } from '../../../common/components';
import commonTheme from '../../../common/theme';
import ProfileDetailView from './ProfileDetailView';
import ChangePassword from './ChangePassword';
import { PATH } from '../../../routes';
import { setTabIndex } from '../actions';
import { resetFormChange } from '../../common/actions';
import { useDispatch, useSelector } from 'react-redux';
import { STATE_REDUCER_KEY } from '../constants';
import { history } from '../../../common';


const { Box, Typography, Tab, Tabs, AppBar, CardComponentForList } = Components;
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
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const useStyles = makeStyles(() => ({
    colorPrimary: commonTheme.tabAppbarColorPrimary,
    indicator: {
        backgroundColor: 'white',
        height: 3
    }
}));

function CommonProfileView() {
    let curPath = location.hash.split('/');
    let lastPath = curPath.pop();
    const { commonTemplate: { selected = 0 } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);

    const dispatch = useDispatch();

    const tabChangeCheck = (tabNo) => {
        dispatch(resetFormChange());
        dispatch(setTabIndex(tabNo));
    };
    const setTab = (type) => {
        switch (type) {
            case 'details': {
                history.push(`${PATH.PROFILE}/details`);
                tabChangeCheck(0);
                break;
            }
            case 'changePassword':
                history.push(`${PATH.PROFILE}/change_password`);
                tabChangeCheck(1);
                break;
            default:
                history.push(`${PATH.PROFILE}/details`);
                tabChangeCheck(0);
                break;
        }
    };

    const classes = useStyles();
    useEffect(() => {
        setTab(lastPath || 'details');
        return () => {
            dispatch(resetFormChange());
        };
    }, []);

    return (
        <CardComponentForList>
            <div className={classes.root}>
                <AppBar position="static" className={classes.colorPrimary}>
                    <Tabs value={selected}
                        aria-label="Profile Tabs"
                        variant="scrollable"
                        scrollButtons="on"
                    >
                        <Tab label={I18n.t('details')}{...a11yProps(0)} onClick={() => setTab('details')} />
                        <Tab label={I18n.t('change_password')}{...a11yProps(1)} onClick={() => setTab('changePassword')} />
                    </Tabs>
                </AppBar>
                <TabPanel value={selected} index={0}>
                    <ProfileDetailView />
                </TabPanel>
                <TabPanel value={selected} index={1}>
                    <ChangePassword />
                </TabPanel>
            </div>
        </CardComponentForList>

    );
}

export default CommonProfileView;
