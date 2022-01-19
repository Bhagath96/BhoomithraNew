//import useState hook to create menu collapse state
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//import react pro sidebar components
import {
    ProSidebar,
    SidebarHeader,
    SidebarContent
} from 'react-pro-sidebar';
import { SketchPicker } from 'react-color';

import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';

import { makeStyles, Icons } from '../../../../common/components';

const { MenuIcon } = Icons;

import * as Actions from '../../actions';
import { Scrollbar } from 'react-scrollbars-custom';

//import sidebar css from react-pro-sidebar module and our custom css
import 'react-pro-sidebar/dist/css/styles.css';
import './SideBar.css';
import DragComponent from './DragComponent';
import { STATE_REDUCER_KEY } from '../../constant';
const useStyles = makeStyles((theme) => ({
    color: {
        position: 'absolute!important',
        marginTop: '25px'
    },
    root: {
        flexGrow: 1
    },
    item: {
        padding: theme.spacing(1)
    },
    submit: {
        textAlign: 'center'
    },
    card: {
        marginTop: '10px'
    }
}));

const Header = ({ routesArray = [] }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [selectedColor, setSelectedColor] = useState('grey');


    const { wayPoints: { data: waypoints = [] } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);

    React.useEffect(() => {
    }, [waypoints]);
    const [menuCollapse, setMenuCollapse] = useState(true);

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    return (
        <>
            <div id="header">
                <ProSidebar collapsed={menuCollapse} style={{ scrollBehavior: 'auto' }}>
                    <SidebarHeader>
                        <div className="logotext">
                            <p>{menuCollapse ? <MenuIcon style={{ cursor: 'pointer' }} onClick={menuIconClick} /> : 'Location'}</p>
                        </div>
                        <div className="closemenu" onClick={menuIconClick}>
                            {/* changing menu collapse icon on click */}
                            {menuCollapse ? (
                                <FiArrowRightCircle />
                            ) : (
                                    <FiArrowLeftCircle />
                                )}
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <Scrollbar >
                            <DragComponent routesArray={routesArray} />

                            <SketchPicker className={classes.color} color={selectedColor} onChange={(picked) => {
                                dispatch(Actions.setRouteColor(picked.hex));
                                setSelectedColor(picked.hex);
                            }
                            } />
                        </Scrollbar>
                    </SidebarContent>

                </ProSidebar>
            </div>
        </>
    );
};

export default Header;
