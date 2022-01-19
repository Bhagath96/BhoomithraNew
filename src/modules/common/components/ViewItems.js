import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { Components, I18n } from '../../../common/components';
import Colors from '../../../common/components/custom/Colors';
const { CardComponent, Typography } = Components;

const useStyles = makeStyles({
    root: {

    },
    title: {
        fontWeight: 'bold',
        fontSize: '24px',
        textTransform: 'capitalize'
    },
    fieldContainer: {
        marginBottom: '12px',
        backgroundColor: Colors['color-primary-100'],
        padding: '8px',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    label: {
        fontWeight: 'bold',
        width: '50%',
        textTransform: 'capitalize'
    },
    value: {
        width: '50%',
        textTransform: 'capitalize'
    }
});

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const ViewItemsRRF = ({ data = [] }) => {
    const classes = useStyles();
    return (
        <Grid className={classes.root}>
            <Typography className={classes.title}>{I18n.t('items')}</Typography>
            {data.map(item => <CardComponent key={item.id}>
                <Grid className={classes.fieldContainer}>
                    <Typography className={classes.label}>{I18n.t('item_name')}</Typography>
                    <Typography className={classes.value}>{item?.itemLabel}</Typography>
                </Grid>
                {item?.itemTypeLabel && <Grid className={classes.fieldContainer}>
                    <Typography className={classes.label}>{I18n.t('type_label')}</Typography>
                    <Typography className={classes.value}>{item?.itemTypeLabel}</Typography>
                </Grid>}
                <Grid className={classes.fieldContainer}>
                    <Typography className={classes.label}>{I18n.t('negative_rate')}</Typography>
                    <Typography className={classes.value}>{item?.negativeRate ? I18n.t('yes') : I18n.t('no')}</Typography>
                </Grid>
                {item?.quantity && <Grid className={classes.fieldContainer}>
                    <Typography className={classes.label}>{I18n.t('quantity_in_kg')}</Typography>
                    <Typography className={classes.value}>{numberWithCommas(item?.quantity)}</Typography>
                </Grid>
                }
                {item?.rate && <Grid className={classes.fieldContainer}>
                    <Typography className={classes.label}>{I18n.t('rate')}</Typography>
                    <Typography className={classes.value}>{item?.rate}</Typography>
                </Grid>
                }
                {item?.total && <Grid className={classes.fieldContainer}>
                    <Typography className={classes.label}>{I18n.t('total')}</Typography>
                    <Typography className={classes.value}>{item?.total}</Typography>
                </Grid>
                }
            </CardComponent>)}
        </Grid>
    );
};

export default ViewItemsRRF;
