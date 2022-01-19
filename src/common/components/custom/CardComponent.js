import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';


const useStyles = makeStyles(() => ({
    cardStyle: {
        // position: 'relative',
        borderStyle: 'none',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
        // width: '100%',
        padding: '2%',
        background: 'white',
        // overflow: 'visible',
        marginBottom: '60px'
        // overflowY: 'scroll'
    }
}));
function CardComponent(props) {
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.cardStyle}>
                {props.children}
            </Card>
        </div>
    );
}

export default CardComponent;
