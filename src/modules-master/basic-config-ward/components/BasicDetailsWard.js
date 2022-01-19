import React, { useEffect } from 'react';
import { Field, Form, FormSection, reduxForm, FieldArray } from 'redux-form';
import { renderTextField, renderSelect, renderSimpleSelect } from '../../../utils/FormUtils';
import { Components, makeStyles, Icons, I18n } from '../../../common/components';
import _ from '../../../utils/LodashUtils';
import { useParams } from 'react-router-dom';
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { renderCard } from '../../../assets/css/bhoom';
import { useSelector, useDispatch, connect } from 'react-redux';
import { getAllLanguages } from '../../../modules/common/actions';
import * as actions from '../actions';
import { STATE_REDUCER_KEY } from '../constants';
import * as Action from '../../../modules/common/actions';
import { setDefaultOrganization } from '../../../modules/user/actions';

const { AddBoxTwoTone, DeleteForeverIcon } = Icons;
const { Grid, Button, IconButton, CardHeader, CardContent, Card, CardComponent, Colors } = Components;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    item: {
        padding: theme.spacing(1)
    },
    submit: {
        textAlign: 'center',
        marginBottom: '25px'
    }
}));

const Accordion = withStyles({
    root: {
        boxShadow: 'none',
        // '&:not(:last-child)': {
        // },
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

const AccordionSummary = withStyles({
    root: {
        backgroundColor: Colors['color-success-transparent-100'],
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

const checkIfDuplicateExists = (w) => {
    return new Set(w).size !== w.length;
};
const validate = (values) => {
    const errors = {};
    let newArray = [];
    let duplicateExist = false;

    if (!values.name) {
        errors.name = I18n.t('required', { type: I18n.t('name') });
    }
    if (!values.lsgi) {
        errors.lsgi = I18n.t('required', { type: I18n.t('lsgi') });
    }
    if (!values.wardNumber) {
        errors.wardNumber = I18n.t('required', { type: I18n.t('ward_number') });
    }
    if (isNaN(Number(values.ward))) {
        errors.ward = I18n.t('Must be a number');
    }
    if (isNaN(Number(values.sort))) {
        errors.sort = I18n.t('Must be a number');
    }
    if (isNaN(Number(values.code))) {
        errors.code = I18n.t('Must be a number');
    }
    if (!values.labels || !values.labels.length) {
        errors.labels = { _error: I18n.t('required', { type: I18n.t('label') }) };
    } else {
        const membersArrayErrors = [];
        values.labels.forEach((member, memberIndex) => {
            const memberErrors = {};
            if (!member || !member.label) {
                memberErrors.label = I18n.t('required', { type: I18n.t('label') });
                membersArrayErrors[memberIndex] = memberErrors;
            }
            if (!member || !member.langId) {
                memberErrors.langId = I18n.t('required', { type: I18n.t('language') });
                membersArrayErrors[memberIndex] = memberErrors;
            } else if (member.langId) {
                newArray.push(Number(member.langId));
            }
            if (newArray.length > 0) {
                duplicateExist = checkIfDuplicateExists(newArray);
            }
            if (duplicateExist === true && newArray.length > 0) {
                memberErrors.langId = I18n.t('same_values_error', { type: I18n.t('language') });
                membersArrayErrors[memberIndex] = memberErrors;
            }
        });
        if (membersArrayErrors.length) {
            errors.labels = membersArrayErrors;
        }
    }
    return errors;
};

const renderLabelFieldArray = ({ fields = [], shortLabelDisplay,
    // meta: { error = '' },
    change, languages, title = I18n.t('label') }) => {
    fields.length < 1 && fields.push({});
    return <Card style={renderCard.options} >
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
                            {fields.length !== 1 && <Grid item xs={1} sm={1} md={1} >
                                <IconButton aria-label="Options" onClick={() => fields.remove(index)}>
                                    <DeleteForeverIcon />
                                </IconButton>
                            </Grid>}
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

            {
                fields.length < 1 ? <small style={{ color: 'red' }}>{I18n.t('required', { type: I18n.t('label') })}</small> : <small></small>
            }
        </CardContent>
    </Card >;
};

export const BasicDetails = (props) => {
    const classes = useStyles();
    const { change, handleSubmit } = props;
    const { allLanguages: languages } = useSelector(state => state.common);
    const { listAllLsgi: lsgiData = {}, listAllState: stateData = {}, listAllDistrict: districtData = {}, selectedWard: { data: dataById } } = useSelector(state => state.wards);
    const dispatch = useDispatch();
    const { id = null } = useParams();
    useEffect(() => {
        dispatch(actions.fetchAllState());
        dispatch(getAllLanguages());
    }, []);
    useEffect(() => {
        if (id) {
            dispatch(actions.fetchWardById(id));
        }
    }, [id]);
    useEffect(() => {
        if (id) {
            dispatch(actions.fetchAllDistrict(dataById?.district?.id));
            dispatch(actions.fetchAllLsgi(dataById?.lsgi?.id));
            dispatch(setDefaultOrganization({ id: dataById?.organizationId }));

        }
    }, [dataById]);

    const submit = (values) => {
        const objToSend = {
            ...values,
            lsgiId: values.lsgi.id
        };
        if (id) {
            dispatch(actions.updateWardData(id, objToSend));
        } else {
            dispatch(actions.addWardData(objToSend));
        }
        dispatch(Action.resetFormChange());

    };
    return (
        <CardComponent >
            <Form onSubmit={handleSubmit(submit)} style={{ overflowY: 'scroll' }}>
                <LoadingOverlay active={false}>
                    <FormSection>
                        <Grid container className={classes.item}>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name="name" label={I18n.t('name')} component={renderTextField} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <FieldArray dispatch={dispatch} name="labels" component={renderLabelFieldArray}
                                    languages={languages}
                                    change={change}
                                />

                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name="state" label={I18n.t('state')} component={renderSelect} onChange={(value) => {
                                    dispatch(actions.fetchAllDistrict(value.id));
                                    change('ward.state', value);
                                    change('district', null);
                                    change('lsgi', null);

                                }}>
                                    {
                                        _.get(stateData, 'data', [])
                                    }
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name="district" label={I18n.t('district')} component={renderSelect} onChange={(value) => {
                                    dispatch(actions.fetchAllLsgi(value.id));
                                    change('ward.district', value);
                                    change('lsgi', null);
                                }} >
                                    {
                                        _.get(districtData, 'data', [])
                                    }
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name="lsgi" label={I18n.t('lsgi')} component={renderSelect} onChange={(value) =>
                                    change('ward.lsgi', value)} >
                                    {
                                        _.get(lsgiData, 'data', [])
                                    }
                                </Field>
                            </Grid>


                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name="wardNumber" label={I18n.t('ward_number')} type='number' component={renderTextField}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name="sort" label={I18n.t('sort')} type='number' component={renderTextField}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name="code" label={I18n.t('code')} type='number' component={renderTextField} />
                            </Grid>
                        </Grid>
                        {/* </FormSection> */}
                        <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                            <Button type="submit">{id !== null ? I18n.t('update') : I18n.t('submit')}</Button>
                        </Grid>
                    </FormSection>
                </LoadingOverlay>
            </Form >
        </CardComponent>
    );
};

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].selectedWard?.data
}))(reduxForm({
    form: 'basicWardDetailss',
    enableReinitialize: true,
    validate
})(BasicDetails));

