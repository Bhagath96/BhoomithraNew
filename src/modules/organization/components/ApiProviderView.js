import React, { useEffect } from 'react';
import { makeStyles, Components } from '../../../common/components';
import EmailApiProvider from './EmailApiProvider';
import NotificationApiProvider from './NotificationApiProvider';
import PaymentGateWay from './PaymentGateWay';
import { useDispatch } from 'react-redux';
import { loadAPIProviders } from '../actions';
import { organizationTypeChecking } from '../../../utils/ApiUtils';
import { useHistory, useParams } from 'react-router-dom';
import { getTabDetails } from '../../../utils/TabUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
const { Tabs } = Components;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 5,
        display: 'flex'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    MuiTabTextColorInherit: {
    }
}));

function ApiProviderNewView() {
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        let organizationType = organizationTypeChecking(id);
        if (organizationType) {
            dispatch(loadAPIProviders());
        } else {
            history.push(`/admin/index/organization/${id}/basic`);
            window.location.reload();
        }
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const apiProviderArray = [];

    if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_API_PROVIDER_EMAIL, ACTION_MAPPING.ORGANIZATION_API_PROVIDER_EMAIL.ACCESS_IN_TAB) || false) {
        apiProviderArray.push({ name: 'email', label: 'email', component: <EmailApiProvider /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_API_PROVIDER_NOTIFICATION, ACTION_MAPPING.ORGANIZATION_API_PROVIDER_NOTIFICATION.ACCESS_IN_TAB) || false) {
        apiProviderArray.push({ name: 'notifications', label: 'notifications', component: <NotificationApiProvider /> });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_API_PROVIDER_PAYMENT_GATEWAY, ACTION_MAPPING.ORGANIZATION_API_PROVIDER_PAYMENT_GATEWAY.ACCESS_IN_TAB) || false) {
        apiProviderArray.push({ name: 'payment_gateway', label: 'payment_gateway', component: <PaymentGateWay /> });
    }

    let { tabs, tabPanels } = getTabDetails(apiProviderArray, () => { }, value);

    return (
        <div className={classes.root}>
            <Tabs value={value} onChange={handleChange} aria-label="Vertical tabs example" orientation='vertical' style={{ width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className={classes.tabs}>
                {tabs}
            </Tabs>
            {tabPanels}
        </div>
    );
}

export default ApiProviderNewView;

