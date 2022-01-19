import React, { useEffect } from 'react';
import { makeStyles, Components } from '../../../common/components';
import CreateBundledServiceConfig from './CreateBundledServiceConfig';
import BundleServiceConfigAssociation from './BundleServiceConfigAssociation';
import { useDispatch } from 'react-redux';
import { resetFormChange } from '../../../modules/common/actions';
import commonTheme from '../../../common/theme';

import { getTabDetails } from '../../../utils/TabUtils';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';


const { Tabs, AppBar, CardComponent } = Components;

const useStyles = makeStyles(() => ({
    colorPrimary: commonTheme.tabAppbarColorPrimary

}));
function CommonBundledServiceEdit() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();
    const tabArray = [];
    const setTab = {};

    const handleChange = (event, newValue) => {
        dispatch(resetFormChange());
        setValue(newValue);
    };
    useEffect(() => {
        return () => {
            dispatch(resetFormChange());
        };
    }, []);
    if (hasAccessPermission(RESOURCE_MAPPING.BUNDLED_SERVICE_CONFIG, ACTION_MAPPING.BUNDLED_SERVICE_CONFIG.LIST_BUNDLED_SERVICE_CONFIG) || false) {
        tabArray.push({ name: 'details', label: 'details', component: <CreateBundledServiceConfig /> });
    } if (hasAccessPermission(RESOURCE_MAPPING.BUNDLED_SERVICE_CONFIG, ACTION_MAPPING.BUNDLED_SERVICE_CONFIG.LIST_BUNDLED_SERVICE_CONFIG) || false) {
        tabArray.push({ name: 'association', label: 'association', component: <BundleServiceConfigAssociation /> });
    }
    let { tabs, tabPanels } = getTabDetails(tabArray, setTab, value);

    return (
        <CardComponent>
            <div className={classes.root}>
                <AppBar position="static" className={classes.colorPrimary}>
                    <Tabs value={value} onChange={handleChange}
                        aria-label="BundledService Tabs"
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

export default CommonBundledServiceEdit;
