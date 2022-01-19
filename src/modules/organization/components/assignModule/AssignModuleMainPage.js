import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Components } from '../../../../common/components';
import AssignModulesView from '../assignModule/AssignModulesView.js';
import ModuleRoleMapping from '../assignModule/moduleRoleMapping.js';
import * as Actions from '../../actions';
import Colors from '../../../../common/components/custom/Colors';
import { organizationTypeChecking } from '../../../../utils/ApiUtils';
import { useHistory, useParams } from 'react-router-dom';
import { getTabDetails } from '../../../../utils/TabUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../../common/Permissions';
import { hasAccessPermission } from '../../../../utils/PermissionUtils';
const { Tabs } = Components;
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 5,
        display: 'flex'
    },
    tabs: {
        backgroundColor: Colors['theme-primary-color'],
        borderRight: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    MuiTabTextColorInherit: {
        color: 'black',
        opacity: '0.7'

    }
}));

function AssignModuleMainPage() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        dispatch(Actions.clearCheckListInReducer());
        setValue(newValue);
    };
    useEffect(() => {
        let organizationType = organizationTypeChecking(id);
        if (!organizationType) {
            history.push(`/admin/index/organization/${id}/basic`);
            window.location.reload();
        }
    }, []);

    const assignModuleTabArray = [];

    if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_ASSIGN_MODULE_MODULES, ACTION_MAPPING.ORGANIZATION_ASSIGN_MODULE_MODULES.ACCESS_IN_TAB) || false) {
        assignModuleTabArray.push({ name: 'module', label: 'module', component: <AssignModulesView /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_ASSIGN_MODULE_ASSIGN_ROLE, ACTION_MAPPING.ORGANIZATION_ASSIGN_MODULE_ASSIGN_ROLE.ACCESS_IN_TAB) || false) {
        assignModuleTabArray.push({ name: 'assign_roles', label: 'assign_roles', component: <ModuleRoleMapping /> });
    }
    let { tabs, tabPanels } = getTabDetails(assignModuleTabArray, () => { }, value);

    return (
        <div className={classes.root}>
            <Tabs value={value} onChange={handleChange} aria-label="Vertical tabs example" orientation='vertical' style={{ width: '19%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className={classes.tabs}>
                {tabs}
            </Tabs>
            {tabPanels}
        </div>

    );
}

export default AssignModuleMainPage;

