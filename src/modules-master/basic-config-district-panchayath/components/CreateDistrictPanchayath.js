import React, { useEffect, useState } from 'react';
import { Field, Form, reduxForm, FieldArray } from 'redux-form';
import { useParams } from 'react-router-dom';
import { renderTextField, renderSelect, renderSimpleSelect } from '../../../utils/FormUtils';
import { renderCard } from '../../../assets/css/bhoom';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles, Components, Icons } from '../../../common/components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import _ from '../../../utils/LodashUtils';
import * as CommonAction from '../../../modules/common/actions';
import * as CommonConstants from '../../../modules/common/constants';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as Actions from '../actions';
import * as constant from '../constant';
import { I18n } from '../../../common/components';
import validate from '../../basic-config-district-panchayath/components/validate';

const { AddBoxTwoTone, DeleteForeverIcon } = Icons;

const { Grid, Button, CardComponent, IconButton, CardHeader, CardContent, Card, Colors } = Components;


const Accordion = withStyles({
    root: {
        boxShadow: 'none',
        '&:not(:last-child)': {
        },
        borderBottom: 0,
        '&:before': {
            display: 'none'
        },
        '&$expanded': {
            margin: 'auto'
        }
    },
    expanded: {}
})(MuiAccordion);
const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    },
    item: {
        padding: theme.spacing(1)
    },
    submit: {
        textAlign: 'center'
    },
    '.MuiButton-label': {
        '&:hover': {
            color: 'black'
        }
    }


}));
const AccordionSummary = withStyles({
    root: {
        backgroundColor: Colors['color-primary-100'],
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56
        }
    },
    content: {
        '&$expanded': {
            margin: '12px 0'
        }
    },
    expanded: {}
})(MuiAccordionSummary);

const renderLabels = ({ fields, shortLabelDisplay,
    //meta: { touched, error, submitFailed },
    change, languages, title = 'Label' }) => {
    fields.length < 1 && fields.push({});
    return (
        <Card style={renderCard.options} >
            <CardHeader
                action={
                    <IconButton className='addButton' aria-label="Options" onClick={() => fields.push({})}>
                        <AddBoxTwoTone />
                    </IconButton>
                }
                title={title}
            />
            <CardContent style={renderCard.content}>
                {fields.map((member, index) => (
                    <Card key={index} style={renderCard.accordion}>
                        <Accordion defaultExpanded={true} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Grid container alignItems='center'>
                                    <Grid item>
                                        <Typography>{`${I18n.t('label')} ${index + 1}`}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={1} sm={1} md={1} >
                                    <IconButton aria-label="Options" onClick={() => fields.remove(index)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Grid>
                            </AccordionSummary>
                            <Grid container spacing={2} key={index} style={renderCard.gridCenter}>
                                <Grid item xs={shortLabelDisplay ? 3 : 4} >
                                    <Field name={`${member}.langId`} label={I18n.t('language')} component={renderSimpleSelect} onChange={(value) =>
                                        change(`${member}.langId`, value.target.value)} >
                                        {
                                            _.get(languages, 'data', [])
                                        }
                                    </Field>
                                </Grid>
                                <Grid item xs={shortLabelDisplay ? 4 : 6} >
                                    <Field name={`${member}.label`} label={I18n.t('label')} component={renderTextField} />
                                </Grid>
                                {
                                    shortLabelDisplay ?
                                        <Grid item xs={3} >
                                            <Field name={`${member}.shortLabel`} label={I18n.t('short_label')} component={renderTextField} />
                                        </Grid> : null
                                }
                                {/* </AccordionDetails> */}
                            </Grid>
                        </Accordion>
                    </Card>
                ))}
            </CardContent>
        </Card >
    );
};

function CreateDistrictPanchayath(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [labelError, SetLabelError] = useState('');
    const [formError, SetFormError] = useState('');
    const classes = useStyles();
    const { handleSubmit, change } = props;
    const { allLanguages: languages } = useSelector(state => state[CommonConstants.STATE_REDUCER_KEY]);
    const { fetchStateList, fetchDistrictListForDistrictPanchayath } = useSelector(state => state[constant.STATE_REDUCER_KEY]);
    useEffect(() => {
        if (id) {
            dispatch(Actions.fetchDistrictPanchayathById(id));
        }
    }, [id]);

    useEffect(() => {
        dispatch(CommonAction.fetchStateList());
    }, []);

    const submit = (values) => {
        SetFormError('');
        SetLabelError('');
        let object = {
            name: '',
            code: '',
            sort: 0,
            districtId: ''
        };
        if (values.name && values.code && values.sort) {
            if (id) {
                object.name = values.name;
                object.code = values.code;
                object.sort = values.sort;
                object.districtId = values.district?.id;
                if (values.labels?.length > 0) {
                    object.labels = values.labels;
                    dispatch(Actions.updateDistrictPanchayathData(id, object));
                } else {
                    SetLabelError(I18n.t('no_label_error'));
                }

            } else {
                object.name = values.name;
                object.code = values.code;
                object.sort = values.sort;
                object.districtId = values.district?.id;
                if (values.labels?.length > 0) {
                    object.labels = values.labels;
                    dispatch(Actions.saveDistrictPanchayathData(object));
                } else {
                    SetLabelError(I18n.t('no_label_error'));

                }
            }
        } else {
            SetFormError(I18n.t('check_your_entered_data'));
        }
    };
    return (
        <CardComponent>
            <Form onSubmit={handleSubmit(submit)} autoComplete='off'>
                <Grid container>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='code' label={I18n.t('code')} type='text' component={renderTextField} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='name' label={I18n.t('name')} type='text' component={renderTextField} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} >
                        <FieldArray name='labels' labelError={labelError} component={renderLabels} languages={languages} change={change} title={I18n.t('label')} />
                        {
                            labelError ? <small style={{ color: 'red' }}>{labelError}</small> : <small></small>
                        }
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='sort' label={I18n.t('sort_order')} type='number' component={renderTextField} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item} style={{ marginBottom: '20px', maxHeight: '100%', overflow: 'scrollbars' }}>
                        <Field name='state' label={I18n.t('state')} type='text' component={renderSelect} style={{ position: 'absolute' }}
                            onChange={(value) => {
                                dispatch(Actions.fetchDistrictList(value.id));

                            }} >
                            {
                                fetchStateList?.data.length > 0 ? _.get(fetchStateList, 'data', []) : []
                            }
                        </Field>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item} style={{ marginBottom: '20px', maxHeight: '100%', overflow: 'scrollbars' }}>
                        <Field name='district' label={I18n.t('district')} type='text' component={renderSelect} style={{ position: 'absolute' }}
                            onChange={(value) =>
                                value} >
                            {
                                fetchDistrictListForDistrictPanchayath?.data.length > 0 ? _.get(fetchDistrictListForDistrictPanchayath, 'data', []) : []
                            }
                        </Field>
                    </Grid>
                    <Grid container></Grid>
                    <Grid item xs={12} className={classes.submit}>
                        <Button type="submit">{I18n.t('submit')}</Button>
                        {
                            formError ? <small style={{ color: 'red' }}>{formError}</small> : <small></small>
                        }
                    </Grid>
                </Grid>
            </Form>
        </CardComponent>
    );
}
export default connect(state => ({
    initialValues: state[constant.STATE_REDUCER_KEY].fetchDistrictPanchayathById.data
}))(reduxForm({
    form: 'createDistrictPanchayath',
    enableReinitialize: true,
    validate
})(CreateDistrictPanchayath));
