import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Components, Icons, I18n } from '../../../common/components';
import { renderCard } from '../../../assets/css/bhoom';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { renderSimpleSelect, renderTextField } from '../../../utils/FormUtils';
import { Field, FieldArray, Form, reduxForm } from 'redux-form';
import { useDispatch, useSelector, connect } from 'react-redux';
import { STATE_REDUCER_KEY } from '../constants';
import { fetchLevels, fetchViews, getDatatAccessById, submitDataAccess } from '../actions';
import { useParams } from 'react-router';
import _ from 'lodash';
import dataAccessValidations from './validate';

const { Grid, Button, IconButton, CardHeader, CardContent, Card, CardComponent, Colors } = Components;
const { AddBoxTwoTone, DeleteForeverIcon } = Icons;
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


const renderLevels = ({ fields, shortLabelDisplay,
    meta: { error }, levels, title }) => {
    // fields.length < 1 && fields.push({});
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
                                        <Typography>{`${I18n.t('level')} ${index + 1}`}</Typography>
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
                                    <Field name={`${member}.dataAccessId`} label={I18n.t('level')} component={renderSimpleSelect}
                                    // onChange={(value) =>
                                    //     change(`${member}.level`, value.target.value)}
                                    >
                                        {
                                            _.map(levels.data, item => ({ id: item.id, name: item.label }))
                                        }
                                    </Field>
                                </Grid>
                                <Grid item xs={shortLabelDisplay ? 4 : 6} >
                                    <label>{I18n.t('is_multiple')}</label>
                                    <Field name={`${member}.multiData`} component="input" type="checkbox" label={I18n.t('is_multiple')} />
                                </Grid>
                                <Grid item xs={shortLabelDisplay ? 4 : 6} >
                                    <Field name={`${member}.noOfData`} type='number' label={I18n.t('no_of_data')} defaultValue={1} component={renderTextField} />
                                </Grid>
                            </Grid>
                        </Accordion>
                    </Card>
                ))}
                {error && <small style={{ color: 'red' }}>{error}</small>}
            </CardContent>
        </Card >
    );
};
const ConfigDataAccess = (props) => {
    const { handleSubmit, change } = props;
    const dispatch = useDispatch();
    const { id = null } = useParams();
    const { listDataAccess = {}, listDataAccessViews: { data: views } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    const { dataAccess: { syncErrors = {} } } = useSelector(state => state.form);

    useEffect(() => {
        dispatch(fetchViews());
        dispatch(fetchLevels());
        dispatch(getDatatAccessById(id));

    }, []);
    const submit = (values) => {

        if (Object.keys(syncErrors).length === 0) {
            let viewArray = _.entries(values).map(item => {
                return _.map(item[1], level => {
                    const { dataAccessId, noOfData = 1 } = level;
                    return {
                        ...level,
                        noOfData: Number(noOfData),
                        dataAccessId: dataAccessId?.id ? dataAccessId.id : dataAccessId,
                        dataCaptureViewId: Number(item[0])
                    };
                });
            });
            viewArray = _.flatten(viewArray);
            const dataAccessObj = [{
                roleId: id,
                dataCaptureViewRequests: viewArray
            }];
            dispatch(submitDataAccess({ roleId: id, dataAccessObj }));
        }
    };
    return (
        <CardComponent>
            <Typography>Data Access</Typography>
            <Form onSubmit={handleSubmit(submit)} >
                {
                    views.map(view => <FieldArray key={view.id} name={view.id} component={renderLevels} shortLabelDisplay={true} levels={listDataAccess} change={change} title={view.name} />)
                }
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Button type="submit">{I18n.t('submit')}</Button>
                </Grid>
            </Form>
        </CardComponent>
    );
};
export default
    connect(state => ({
        initialValues: state[STATE_REDUCER_KEY].dataAccessGetById.data
    }))(reduxForm({
        form: 'dataAccess',
        enableReinitialize: true,
        validate: dataAccessValidations
    })(ConfigDataAccess));
// export default ConfigDataAccess;
