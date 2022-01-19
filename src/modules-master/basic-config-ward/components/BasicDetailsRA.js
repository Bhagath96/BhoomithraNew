import React, { useEffect } from 'react';
import { Field, Form, FormSection, reduxForm, FieldArray, isDirty } from 'redux-form';
import { renderTextField, renderSimpleSelect } from '../../../utils/FormUtils';
import { Components, makeStyles, Icons, I18n } from '../../../common/components';
import _ from '../../../utils/LodashUtils';
import { useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import * as Actions from '../actions';
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
import { resetFormChange } from '../../../modules/common/actions';

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
        textAlign: 'center'
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
const CustomButton = withStyles({
    root: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: Colors['color-success-500'],
        minWidth: '150px',
        padding: '10px',
        borderRadius: '50px',
        justifyContent: 'space-evenly',
        margin: '0 auto',
        '&:hover': {
            backgroundColor: Colors['color-success-600']
        }
    },
    label: {
        '&:hover': {
            color: 'white'
        }
    }
})(Button);
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
        errors.name = 'Name Required';
    }
    if (!values.lsgi) {
        errors.lsgi = 'LSGI Required';
    }
    if (!values.sort) {
        errors.sort = 'Sort Required';
    }
    if (!values.raId) {
        errors.raId = 'Sort Required';
    }

    // if (isNaN(Number(values.ward))) {
    //     errors.ward = 'Must be a number';
    // }
    if (isNaN(Number(values.sort))) {
        errors.sort = 'Must be a number';
    }
    // if (isNaN(Number(values.code))) {
    //     errors.code = 'Must be a number';
    // }
    // if (!values.label || values.label.length < 0) {
    //     console.log('inside the condition came')
    //     _.set(errors, 'label', 'At least one Option must be entered');
    //     // errors.label = 'At least one label must be entered';
    // }
    if (!values.labels || !values.labels.length) {
        // _.set(errors, 'labels', { _error: I18n.t('no_label_error') });
        _.set(errors, 'labels', { _error: I18n.t('no_label_error') });
    } else {
        const membersArrayErrors = [];
        values.labels.forEach((member, memberIndex) => {
            const memberErrors = {};
            if (!member || !member.label) {
                _.set(memberErrors, 'label', I18n.t('required', { type: I18n.t('label') }));
                membersArrayErrors[memberIndex] = memberErrors;
            }
            if (!member || !member.langId) {
                _.set(memberErrors, 'langId', I18n.t('required', { type: I18n.t('language') }));
                membersArrayErrors[memberIndex] = memberErrors;
            } else if (member.langId) {
                newArray.push(Number(member.langId));
            }
            if (newArray.length > 0) {
                duplicateExist = checkIfDuplicateExists(newArray);
            }
            if (duplicateExist === true && newArray.length > 0) {
                _.set(memberErrors, 'langId', I18n.t('same_values_error', { type: I18n.t('language') }));
                membersArrayErrors[memberIndex] = memberErrors;
            }
        });
        if (membersArrayErrors.length) {
            errors.labels = membersArrayErrors;
        }
    }
    return errors;
};

const renderLabel = ({ fields = [], shortLabelDisplay,
    meta: { error = null },
    languages, title = 'Label' }) => {
    // fields.length < 1 && fields.push({ langId: null, label: null });
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
                                    <Typography>{`Label ${index + 1}`}</Typography>
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
                                <Field name={`${member}.langId`} label="language" component={renderSimpleSelect} >
                                    {
                                        _.get(languages, 'data', [])
                                    }
                                </Field>
                            </Grid>
                            <Grid item xs={shortLabelDisplay ? 4 : 6} >
                                <Field name={`${member}.label`} label="label" component={renderTextField} />
                            </Grid>
                            {
                                shortLabelDisplay ?
                                    <Grid item xs={3} >
                                        <Field name={`${member}.shortLabel`} label="short label" component={renderTextField} />
                                    </Grid> : null
                            }
                            {/* </AccordionDetails> */}
                        </Grid>
                    </Accordion>
                </Card>
            ))}
            {error && I18n.t('no_label_error')}
        </CardContent>
    </Card >;
};

export const BasicDetailsRA = (props) => {
    const classes = useStyles();
    let { wardId = null, id = null } = useParams();
    const { allLanguages: languages } = useSelector(state => state.common);
    const { selectedWard = {} } = useSelector(state => state.wards);
    const dispatch = useDispatch();
    const lsgiId = selectedWard?.data?.lsgi?.id;
    const { change, handleSubmit, dirty } = props;

    useEffect(() => {
        // dispatch(actions.fetchAllAssociationType());
        dispatch(actions.fetchAllState());
        dispatch(getAllLanguages());
    }, []);

    const submit = (values) => {
        wardId = +wardId;
        let sort = +values.sort;
        const objToSend = {
            ...values,
            sort,
            lsgiId,
            wardId
        };
        if (id) {
            dispatch(actions.updateRAData(objToSend, id));

        } else {
            dispatch(actions.addRAData(objToSend));
            dispatch(actions.setSelectedRA(objToSend));
        }
        dispatch(Action.resetFormChange());

    };

    useEffect(() => {
        dispatch(Action.setFormChange({ form: 'basicRADetails', isDirty: true }));
    }, [dirty, id]);

    useEffect(() => {
        dispatch(resetFormChange());
    }, []);
    return (
        <CardComponent >
            <Form onSubmit={handleSubmit(submit)} style={{ overflowY: 'scroll' }}>
                <LoadingOverlay active={false}>
                    <FormSection>
                        <Grid container className={classes.item}>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name="name" label="Name" component={renderTextField} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name="raId" label="Registration Number" type='text' component={renderTextField}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <FieldArray name="labels" component={renderLabel}
                                    languages={languages}
                                    change={change}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name="sort" label="Sort" type='number' component={renderTextField}
                                />
                            </Grid>
                        </Grid>

                        {/* </FormSection> */}
                        <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                            <CustomButton type="submit">{id ? 'Update' : 'Submit'}</CustomButton>
                        </Grid>
                    </FormSection>
                </LoadingOverlay>
            </Form >
        </CardComponent>
    );
};

// export default (reduxForm({
//     // validate: questionGeneration,
//     form: 'basicWardDetails',
//     initialValues: ''
//     enableReinitialize: true,
//     validate
// }))(BasicDetails);
export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].selectedRA?.data,
    dirty: isDirty('basicRADetails')
}))(reduxForm({
    form: 'basicRADetails',
    enableReinitialize: true,
    validate
})(BasicDetailsRA));

