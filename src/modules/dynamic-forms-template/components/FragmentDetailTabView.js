import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Components } from '../../../common/components';
import commonTheme from '../../../common/theme';
import AddFragment from './AddFragment';
import i18n from '../../../i18n';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const { Box, Typography, Tab, Tabs, AppBar, CardComponent } = Components;

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
    colorPrimary: commonTheme.tabAppbarColorPrimary
}));


function FragmentDetailTabView() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <CardComponent>
                <div className={classes.root}>
                    <AppBar position="static" className={classes.colorPrimary}>
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            {
                                hasAccessPermission(RESOURCE_MAPPING.TEMPLATE_FRAGMENT_DETAILS, ACTION_MAPPING.TEMPLATE_FRAGMENT_DETAILS.ACCESS_IN_TAB) || false &&
                                <Tab label={i18n.t('details')} {...a11yProps(0)} />
                            }

                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <AddFragment />
                    </TabPanel>
                </div>
            </CardComponent>
        </div>
    );
}

export default FragmentDetailTabView;
