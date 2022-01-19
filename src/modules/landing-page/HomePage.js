import React from 'react';
import { useSelector } from 'react-redux';
import { getCompleteSideMenus } from '../../routes/route-path';
function HomePage() {
    const { info: { firstName = '', lastName = '', middleName = '' } } = useSelector(state => state.user);
    let fullPermissions = getCompleteSideMenus();
    if (fullPermissions?.length > 0) {
        let { component: DashBoard = <></> } = fullPermissions.splice(0, 1)[0];
        return (
            <DashBoard />
        );
    }
    return (
        <div style={{ textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold' }}>
            <h2>Welcome {firstName || ''.toUpperCase()} {middleName || ''.toUpperCase()} {lastName || ''.toUpperCase()}</h2>
        </div>
    );

}

export default HomePage;
