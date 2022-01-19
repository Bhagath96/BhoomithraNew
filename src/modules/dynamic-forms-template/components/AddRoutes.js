import React, { useEffect } from 'react';
import { Field, Form, reduxForm, FieldArray } from 'redux-form';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { API_PROPS } from '../../../common/constants';
import { Components, makeStyles, Icons } from '../../../common/components';
import utils from '../../../utils';

import { STATE_REDUCER_KEY, getEmptyNextPrevious, getDefaultNextPrevious } from '../constants';
import { resetAddRouteForm, fetchFragmentsByTemplate, saveTemplateRoutes, fetchTemplateRouteById, fetchFragmentsByFragmentId, setSelectedFragmentDetails } from '../actions';
import { addRouteValidation } from '../validations';
// import TreeView from './TreeView';
import i18n from '../../../i18n';
import { getEmptyPicky } from '../../../utils/CommonUtils';
import Colors from '../../../common/components/custom/Colors';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';
import swlt from 'sweetalert2';

const { formUtils: { renderSelect }, commonUtils: { toNumber }, lodashUtils: _ } = utils;
const { IndeterminateCheckBoxTwoTone, AddBoxTwoTone } = Icons;
const { Grid, Button, IconButton, CardHeader, Card, LoadingOverlay, CardComponent, CardContent } = Components;

const customCss = {
    customCardStyle: {
        borderRadius: '16px',
        backgroundColor: Colors['color-primary-100'],
        paddingBottom: '100px',
        marginTop: '10px'
    }
};

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

const renderOptions = ({ fields, meta: { error },
    change, options, fragmentList, disabled, title = i18n.t('options') }) => (
    <Card style={customCss.customCardStyle}>
        <CardHeader
            action={
                <IconButton className='addButton' aria-label="Options" disabled={disabled} onClick={() => fields.push({})}>
                    <AddBoxTwoTone />
                </IconButton>
            }
            title={title}
        />
        <CardContent style={{ paddingBottom: '0px', padding: '0px' }}>
            {fields.map((member, index) => (
                <Card variant="outlined" style={customCss.customCardStyle} key={index}>
                    <CardHeader
                        action={
                            <IconButton aria-label="Validations" disabled={disabled} onClick={() => fields.remove(index)}>
                                <IndeterminateCheckBoxTwoTone />
                            </IconButton>
                        }
                        title={''}
                    />
                    <CardContent style={{ paddingBottom: '0px', padding: '0px' }}>
                        <Grid container spacing={3} key={index}>
                            <Grid item xs={12} sm={12} md={12} >
                                <Field name={`${member}.optionId`} label={i18n.t('options')} disabled={disabled} component={renderSelect} onChange={(value) =>
                                    change(`${member}.optionId`, value)} >
                                    {
                                        options
                                    }
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} >
                                <Field name={`${member}.next`} label={i18n.t('next_fragment')} disabled={disabled} component={renderSelect} onChange={(value) => change(`${member}.next`, value)}
                                    filterable>
                                    {
                                        [getEmptyNextPrevious(), ...fragmentList]
                                    }
                                </Field>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
        </CardContent>
        {error && <li className="error">{error}</li>}
    </Card >
);


const AddTemplateRoutes = (props) => {

    const dispatch = useDispatch();
    const { id = null, fragmentId = null } = useParams();
    const classes = useStyles();
    const initialValues = useSelector(state => _.get(state, 'form.addTemplateRoutes', {}));
    const formValues = _.get(initialValues, 'values', {});
    const { handleSubmit, submitting, change } = props;
    const {
        listFragments: { data: fragmentsList = [] },
        routesGenerationDetails: { titles = [], questions = {}, options = {} }
    } = useSelector(state => state[STATE_REDUCER_KEY]);
    useEffect(() => {
        if (id !== null) {
            dispatch(fetchFragmentsByTemplate({ templateId: id, type: API_PROPS.DROP_DOWN }));
            if (fragmentId !== null) {
                dispatch(fetchTemplateRouteById(id, fragmentId));
                dispatch(fetchFragmentsByFragmentId(fragmentId));
            }
        } else {
            dispatch(resetAddRouteForm());
        }
    }, []);

    useEffect(() => {
        dispatch(setSelectedFragmentDetails(toNumber(fragmentId)));
    }, [fragmentsList]);


    const submit = (values) => {
        const filterData = fragmentId ? _.filter(fragmentsList, ['id', Number(fragmentId)])[0] : values.fragment;
        if (Object.keys(filterData).length > 0) {
            const submitData = {
                ...values,
                fragment: filterData
            };
            dispatch(saveTemplateRoutes({ templateId: id, fragmentId, ...submitData }));
        } else {
            swlt.fire({
                title: i18n.t('unknown_error'),
                showCancelButton: false,
                confirmButtonText: i18n.t('ok')
            });
        }
    };

    const readOnly = hasAccessPermission(RESOURCE_MAPPING.TEMPLATE_ROUTE_DETAILS, ACTION_MAPPING.TEMPLATE_ROUTE_DETAILS.READ_ONLY);

    return (
        <CardComponent>
            <div>
                <Form onSubmit={handleSubmit(submit)}>
                    <LoadingOverlay active={false}>
                        {/* <FormSection name="template"> */}
                        <Grid container spacing={3} className={classes.item}>

                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name="fragment" label={i18n.t('fragment')} component={renderSelect} disabled={readOnly} onChange={(value) => {
                                    value.id && dispatch(fetchFragmentsByFragmentId(value.id || null));
                                }}
                                    filterable>
                                    {
                                        [getEmptyPicky(), ...fragmentId ? _.filter(fragmentsList, ['id', Number(fragmentId)]) : fragmentsList || []]
                                    }
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name="title" label={i18n.t('titles')} component={renderSelect} disabled={readOnly} onChange={(value) => change('title', value)}
                                    filterable>
                                    {
                                        [getEmptyPicky(), ...titles || []]
                                    }
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                <Field name="question" label={i18n.t('questions')} disabled={readOnly} component={renderSelect} onChange={(value) => {
                                    change('question', value);
                                    change('option', []);
                                }}
                                    filterable>
                                    {
                                        [getEmptyPicky(), ...questions[_.get(formValues, 'title.id', '')] || []]
                                    }
                                </Field>
                            </Grid>
                            {(options[_.get(formValues, 'question.id', '')] || []).length > 0 &&
                                <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                    <FieldArray name='option' disabled={readOnly} component={renderOptions} change={change} options={options[_.get(formValues, 'question.id', '')] || []} fragmentList={fragmentsList} />
                                </Grid>
                            }
                            <>
                                <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                    <Field name="next" label={i18n.t('next_fragment')} disabled={readOnly} component={renderSelect} onChange={(value) => change('next', value)}
                                        filterable>
                                        {
                                            (fragmentsList && fragmentsList?.length > 0) ? (

                                                [...getDefaultNextPrevious(), ...fragmentsList]
                                            ) : [...getDefaultNextPrevious()]
                                        }
                                    </Field>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                    <Field name="prev" label={i18n.t('previous_fragment')} disabled={readOnly} component={renderSelect} onChange={(value) => change('prev', value)}
                                        filterable>
                                        {
                                            (fragmentsList && fragmentsList?.length > 0) ? (

                                                [...getDefaultNextPrevious(), ...fragmentsList]
                                            ) : [...getDefaultNextPrevious()]
                                        }
                                    </Field>
                                </Grid>
                            </>
                            <Grid item xs={12} sm={12} md={12} className={classes.item}>
                                {/* <TreeView fragments={fragments.data} /> */}
                            </Grid>
                        </Grid>
                        {!readOnly &&
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Button type="submit" disabled={submitting} >{i18n.t('submit')}</Button>
                            </Grid>
                        }
                        {/* </FormSection> */}
                    </LoadingOverlay>
                </Form >
            </div>
        </CardComponent>
    );

};

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].fetchRoutesFromTemplate?.data?.fragmentJson?.formData ? state[STATE_REDUCER_KEY].fetchRoutesFromTemplate?.data?.fragmentJson?.formData : state[STATE_REDUCER_KEY].setFragmentValueToAssignRoute
    // {}
}))(reduxForm({
    form: 'addTemplateRoutes',
    enableReinitialize: true,
    validate: addRouteValidation
})(AddTemplateRoutes));

