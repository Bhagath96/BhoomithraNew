import React, { useEffect } from 'react';
import { makeStyles, Components } from '../../../common/components';
import CreateComplaintConfig from './CreateComplaintConfig';
import ComplaintConfigAssociation from './ComplaintConfigAssociation';
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
function CommonComplaintEdit() {
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
    if (hasAccessPermission(RESOURCE_MAPPING.COMPLAINT_CONFIG, ACTION_MAPPING.COMPLAINT_CONFIG.LIST_COMPLAINT_CONFIG) || false) {
        tabArray.push({ name: 'details', label: 'details', component: <CreateComplaintConfig /> });
    } if (hasAccessPermission(RESOURCE_MAPPING.COMPLAINT_CONFIG, ACTION_MAPPING.COMPLAINT_CONFIG.LIST_COMPLAINT_CONFIG) || false) {
        tabArray.push({ name: 'association', label: 'association', component: <ComplaintConfigAssociation /> });
    }
    let { tabs, tabPanels } = getTabDetails(tabArray, setTab, value);

    return (
        <CardComponent>
            <div className={classes.root}>
                <AppBar position="static" className={classes.colorPrimary}>
                    <Tabs value={value} onChange={handleChange}
                        aria-label="Complaint Tabs"
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

export default CommonComplaintEdit;
