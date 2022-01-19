import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { PdfMake } from '../handleExport/Pdf-export';
import { ExcelExport } from '../handleExport/Excel-export';
import { ImportExportOutlined } from '@material-ui/icons';

const ITEM_HEIGHT = 48;

export default function HandleExport({ data }) {
    const { pdf = null, excel = null } = data;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <ImportExportOutlined />
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
                <MenuItem>
                    {
                        pdf && <PdfMake data={data} />
                    }

                </MenuItem>
                <MenuItem>
                    {
                        excel && <ExcelExport data={data} />
                    }

                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
