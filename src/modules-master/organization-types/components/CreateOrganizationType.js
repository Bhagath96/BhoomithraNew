import React, { useEffect } from 'react';
import { Field, FieldArray, Form, reduxForm } from 'redux-form';
import { Components, I18n, Icons } from '../../../common/components';
import { renderTextField, renderSimpleSelect } from '../../../utils/FormUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import { loadLanguagesForTitle } from '../../../modules/dynamic-forms-title/actions';
import { useParams } from 'react-router-dom';
import { STATE_REDUCER_KEY } from '../constants';
import _ from '../../../utils/LodashUtils';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import validate from './validate';
import { renderCard } from '../../../assets/css/bhoom';
import * as Actions from '../actions';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { withStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const { Grid, Button, CardComponent, IconButton, CardHeader, CardContent, Card, Colors, Typography } = Components;

const { AddBoxTwoTone } = Icons;
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
const validate = (values) => {
    const errors = {};
    let arrayForLanguages = [];
    let duplicateExistForLabel = false;
    const checkIfDuplicateExists = (w) => {
        return new Set(w).size !== w.length;
    };
    if (!values.labels || !values.labels.length) {
        errors.labels = I18n.t('required', { type: I18n.t('label') });
    } else {
        const membersArrayErrors = [];
        values.labels.forEach((member, memberIndex) => {
            const memberErrors = {};
            if (member.langId) {
                arrayForLanguages.push(Number(member.langId));
            }
            if (!member || !member.langId) {
                memberErrors.langId = I18n.t('required', { type: I18n.t('language') });
                membersArrayErrors[memberIndex] = memberErrors;
            }
            if (!member || !member.label) {
                memberErrors.label = I18n.t('required', { type: I18n.t('label') });
                membersArrayErrors[memberIndex] = memberErrors;
            }
            if (arrayForLanguages.length > 0) {
                duplicateExistForLabel = checkIfDuplicateExists(arrayForLanguages);
            }
            if (duplicateExistForLabel === true && arrayForLanguages.length > 0) {
                memberErrors.langId = I18n.t('same_values_error', { type: I18n.t('language') });
                membersArrayErrors[memberIndex] = memberErrors;
            }

        });
        if (membersArrayErrors.length) {
            errors.labels = membersArrayErrors;
        }
    }
    if (!_.has(values, 'name') || _.get(values, 'name', null) === null) {
        _.set(errors, 'name', I18n.t('required', { type: I18n.t('name') }));
    }
    if (!_.has(values, 'sort') || _.get(values, 'sort', null) === null) {
        _.set(errors, 'sort', I18n.t('required', { type: I18n.t('sort') }));
    }
    return errors;
};
const renderLabel = ({ fields, shortLabelDisplay,
    //meta: { touched, error, submitFailed },
    change, languages, title = I18n.t('label') }) => {
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
                                        <Typography>{`${I18n.t('label')}${index + 1}`}</Typography>
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

function CreateOrganizationType(props) {
    const [checkValue, setCheckValue] = React.useState(false);

    const checkBoxClick = () => {
        setCheckValue(!checkValue);
        // _.set(sameValues, 'currentAddress.defaultAddress', false);
        props.change('isLsgiType', !checkValue);

    };
    const dispatch = useDispatch();
    const { id } = useParams();
    const { handleSubmit, submitting, change } = props;
    useEffect(() => {
        dispatch(loadLanguagesForTitle());
    }, []);
    useEffect(() => {
        if (id) {
            dispatch(Actions.getOrganizationTypeById(id));
        }
    }, [id]);
    const titleDetails = useSelector(state => state.title);
    const { languages } = titleDetails;
    const submit = (values) => {
        let objToSend = {
            isLsgiType: false,
            ...values

        };
        if (id) {
            dispatch(Actions.editOrganizationType(id, objToSend));

        } else {
            dispatch(Actions.sentOrganizationType(objToSend));
        }

    };
    return (
        <CardComponent >
            <Form onSubmit={handleSubmit(submit)}>

                <Grid container>
                    <Grid item xs={6} className='fieldContainer' >
                        <Field
                            name='name'
                            type="text"
                            component={renderTextField}
                            label={I18n.t('name')}
                        />
                    </Grid>
                    <Grid item xs={6} className='fieldContainer' >
                        <Field
                            name='sort'
                            type="number"
                            component={renderTextField}
                            label={I18n.t('sort')}
                        />
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid style={{ marginTop: '12px', marginLeft: '77px' }}>

                        <Field component="input" name='isLsgiType' type="checkbox" onClick={() => checkBoxClick()} /><span>{I18n.t('is_lsgi_type')}</span><br /><br />
                    </Grid>

                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <FieldArray name="labels" component={renderLabel} languages={languages} change={change} title={I18n.t('label')} />
                </Grid>

                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Button type="submit" disabled={submitting} >{I18n.t('submit')}</Button>
                </Grid>
            </Form>
        </CardComponent>

    );
}

// export default reduxForm({
//     initialValues: state[STATE_REDUCER_KEY].getUserContactDetail.data,
//     form: 'CreateOrganizationTypeForm',
//     enableReinitialize: true,

//     // validate
// })(CreateOrganizationType);
export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].getOrganizationTypeById?.data
}))(reduxForm({
    form: 'CreateOrganizationTypeForm',
    enableReinitialize: true,
    validate
})(CreateOrganizationType));


