import React, { useEffect, useState } from 'react';
import { Field, Form, reduxForm, FieldArray } from 'redux-form';
import { useParams } from 'react-router-dom';
import { renderTextField, renderSimpleSelect, renderSelect } from '../../../utils/FormUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { renderCard } from '../../../assets/css/bhoom';
import { makeStyles, Components, Icons } from '../../../common/components';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { STATE_REDUCER_KEY } from '../constant';
import _ from '../../../utils/LodashUtils';
import * as CommonAction from '../../../modules/common/actions';
import * as CommonConstants from '../../../modules/common';
import * as Actions from '../actions';
import validate from './validate';
import { I18n } from '../../../common/components';
import { SketchPicker } from 'react-color';

const { AddBoxTwoTone, DeleteForeverIcon } = Icons;

const { Grid, Button, CardComponent, IconButton, CardHeader, CardContent, Card, Colors } = Components;

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    },
    color: {
        position: 'absolute!important',
        marginTop: '25px'
    },
    pickBtn: {
        fontSize: 'smaller'
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

const renderLabels = ({ fields, shortLabelDisplay,
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

function CreateMCF(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [labelError, SetLabelError] = useState('');
    const [formError, SetFormError] = useState('');
    const [colorPicker, setColorPicker] = useState('');
    const [colourPickerVisible, setColorPickerVisible] = useState(false);
    const { allLanguages: languages } = useSelector(state => state[CommonConstants.STATE_REDUCER_KEY]);
    const { fetchLSGIList, fetchStateById, fetchDistrictById, fetchWardById } = useSelector(state => state[STATE_REDUCER_KEY]);
    const { change } = props;
    const classes = useStyles();
    const { handleSubmit } = props;
    useEffect(() => {
        if (id) {
            dispatch(Actions.fetchMCFbyId(id));
        }
    }, [id]);
    useEffect(() => {
        dispatch(CommonAction.getAllLanguages());
        dispatch(Actions.fetchState());
    }, []);
    const handleChangeColorComplete = (color) => {
        change('color', color.hex);
        setColorPicker(color.hex);
    };
    const selectPicker = () => {
        setColorPickerVisible(!colourPickerVisible);
    };
    const submit = (values) => {
        SetFormError('');
        SetLabelError('');
        let object = {
            name: '',
            sort: 0,
            labels: [],
            latitude: 0,
            longitude: 0,
            lsgiId: [],
            wardId: [],
            color: ''
        };
        if (id) {
            object.name = values.name;
            object.sort = values.sort;
            object.latitude = values.latitude;
            object.longitude = values.longitude;
            object.latitude = values.latitude;
            object.lsgiId = values.lsgi.id;
            object.wardId = values.ward.id;
            object.color = values.color;
            if (values.labels?.length > 0) {
                object.labels = values.labels;
                dispatch(Actions.updatesMCFData(id, object));
            } else {
                SetLabelError(I18n.t('At_least_one_label_must_be_entered'));
            }

        } else {
            object.name = values.name;
            object.sort = values.sort;
            object.latitude = values.latitude;
            object.longitude = values.longitude;
            object.latitude = values.latitude;
            object.lsgiId = values.lsgi?.id;
            object.wardId = values.ward?.id;
            object.color = values?.color;
            if (values.labels?.length > 0) {
                object.labels = values.labels;
                dispatch(Actions.saveMCFData(object));
            } else {
                SetLabelError(I18n.t('At_least_one_label_must_be_entered'));
            }

        }
    };

    return (
        <CardComponent>
            <Form onSubmit={handleSubmit(submit)} autoComplete='off'>
                <Grid container>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='name' label={I18n.t('name')} type='text' component={renderTextField} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='description' label={I18n.t('description')} type='text' component={renderTextField} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} >
                        <FieldArray name='labels' labelError={labelError} component={renderLabels} languages={languages} change={change} />
                        {
                            labelError ? <small style={{ color: 'red' }}>{labelError}</small> : <small></small>
                        }
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='latitude' label={I18n.t('latitude')} type='number' component={renderTextField} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='longitude' label={I18n.t('longitude')} type='number' component={renderTextField} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='sort' label={I18n.t('sort_order')} type='number' component={renderTextField} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='state' label={I18n.t('state')} component={renderSelect} onChange={(value) => {
                            change('district', null);
                            change('lsgi', null);
                            change('ward', null);
                            dispatch(Actions.fetchDistrictByState(value.id));
                        }}>
                            {_.get(fetchStateById, 'data', {})}
                        </Field>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='district' label={I18n.t('district')} type='text' component={renderSelect} onChange={(value) => {
                            change('lsgi', null);
                            change('ward', null);
                            dispatch(Actions.fetchLSGI(value.id));
                        }}>
                            {_.get(fetchDistrictById, 'data', [])}
                        </Field>
                    </Grid> <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='lsgi' label={I18n.t('lsgi')} type='text' component={renderSelect} onChange={(value) => {
                            change('ward', null);
                            dispatch(Actions.fetchWardByLSGI(value.id));
                        }}>
                            {_.get(fetchLSGIList, 'data', [])}
                        </Field>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field name='ward' label={I18n.t('ward')} type='text' component={renderSelect}>
                            {_.get(fetchWardById, 'data', [])}

                        </Field>
                    </Grid>

                    <Grid item xs={2} sm={2} md={2} className={classes.item}>
                        <Field name='color' label={I18n.t('color')} type='text' disabled={true} component={renderTextField} />
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} className={classes.item}>
                        <Button className={classes.pickBtn} onClick={() => selectPicker()}>{I18n.t('color_picker')}</Button>
                    </Grid>
                    {colourPickerVisible ? <Grid item xs={1} sm={1} md={1} className={classes.item}>
                        <SketchPicker className={classes.color}
                            color={colorPicker}
                            onChange={(value) => handleChangeColorComplete(value)}
                        />
                    </Grid>
                        : ''
                    }
                    <Grid item xs={2} sm={2} md={2}></Grid>
                    <Grid item xs={12} className={classes.submit}>
                        <Button type="submit">{I18n.t('submit')}</Button>
                        {
                            formError ? <small style={{ color: 'red' }}>{formError}</small> : <small></small>
                        }
                    </Grid>
                </Grid>
            </Form>
        </CardComponent >
    );
}
export default
    connect(state => ({
        initialValues: state[STATE_REDUCER_KEY].fetchMCFById.data
    }))(reduxForm({
        form: 'CreateMCF',
        enableReinitialize: true,
        validate
    })(CreateMCF));

