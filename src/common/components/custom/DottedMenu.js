import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import _ from 'lodash';
import { I18n } from '..';

const ITEM_HEIGHT = 48;

export default function DottedMenu({ options = [] }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '25ch'
                    }
                }}
            >
                {_.isEmpty(options) ? <MenuItem disabled>
                    <>
                        <SentimentVeryDissatisfiedIcon style={{ color: 'red' }} />
                        <div style={{ color: 'red', fontWeight: 'fontWeightMedium' }}>{I18n.t('no_actions_available')}</div>
                    </>
                </MenuItem> : options.map((option) => (
                    <MenuItem key={option.name} onClick={
                        () => {
                            option.fn();
                            setAnchorEl(null);
                        }
                    }>
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </div >
    );
}
