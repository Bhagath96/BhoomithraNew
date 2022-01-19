import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Colors from './Colors';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: Colors['color-basic-100'],
        border: `4px solid ${Colors['color-basic-900']}`,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));
const CustomModal = (props) => {
    const classes = useStyles();
    let { isOpen = false, title = '', content } = props;
    // const [open, setOpen] = React.useState(isOpen || false);
    return (<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        // onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500
        }}
    >
        <Fade in={isOpen}>
            <div className={classes.paper} >
                {title && <h2 id="transition-modal-title">{title}</h2>}
                {content && <h4 id="transition-modal-description">{content}</h4>}
            </div>
        </Fade>
    </Modal>
    );
};

export default CustomModal;
