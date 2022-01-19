import React, { useEffect } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { Components, makeStyles, I18n } from '../../../../common/components';
import { STATE_REDUCER_KEY } from '../../constants';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as Actions from '../../actions';
import { useParams } from 'react-router-dom';
import { renderSelect } from '../../../../utils/FormUtils';
import _ from '../../../../utils/LodashUtils';

const { Grid, Button } = Components;
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
const validate = values => {
    const errors = {};
    if (values.superVisor && values.TosuperVisor) {
        if (values?.superVisor?.id === values?.TosuperVisor?.id) {
            errors.superVisor = { _error: I18n.t('from_eql_to') };
            errors.TosuperVisor = { _error: I18n.t('from_eql_to') };
        }
    } else {
        if (!values.superVisor) {
            errors.superVisor = I18n.t('required', { type: I18n.t('supervisor') });
        }
        if (!values.TosuperVisor) {
            errors.TosuperVisor = I18n.t('required', { type: I18n.t('to_supervisor') });
        }
    }
    if (_.get(values, 'toGt', [])?.length === 0) {
        errors.toGt = I18n.t('minimum_required', { type: I18n.t('gt'), count: 1 });
    }
    return errors;
};

function ReassignSupervisor(props) {
    const { getAllSuperVisors = {}, getToGtWithProviderId = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id, providerId } = useParams();
    const [currentSuperVisor, setCurrentSuperVisor] = React.useState({});

    useEffect(() => {
        dispatch(Actions.getSuperVisors(id, providerId));
    }, []);

    const submit = (values) => {
        let request = {
            allSelected: false,
            gtIds: _.get(values, 'toGt', []).map((item) => item.id)
        };
        dispatch(Actions.updateReAssignSuperVisor(request, _.get(values, 'superVisor.id', null), _.get(values, 'TosuperVisor.id', null), id, providerId));
    };
    return (
        <div>
            <Form onSubmit={props.handleSubmit(submit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <Field spinnerProps="selectTagProp" name='superVisor' label={I18n.t('from_supervisor')} component={renderSelect}
                            onChange={(resourceItem) => {
                                setCurrentSuperVisor(resourceItem);
                                dispatch(Actions.getToGt(id, providerId, resourceItem.id));
                                props.change('toGt', []);
                                props.change('TosuperVisor', null);

                            }}>
                            {
                                _.get(getAllSuperVisors, 'data', [])
                            }
                        </Field>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <Field name='toGt' label={I18n.t('gt')} component={renderSelect} multiple={true} selectAll selectAllText={I18n.t('select_all')}
                        >
                            {
                                _.get(getToGtWithProviderId, `formateDataForGT.${_.get(currentSuperVisor, 'id', '')}`, [])
                            }
                        </Field>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <Field spinnerProps="selectTagProp" name='TosuperVisor' label={I18n.t('to_supervisor')} component={renderSelect}>
                            {
                                _.filter(_.get(getAllSuperVisors, 'data', []), (item) => item.id !== currentSuperVisor.id)
                            }
                        </Field>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Button type="submit" >{I18n.t('submit')}</Button>
                </Grid>
            </Form>
        </div >
    );
}
export default
    connect(state => ({
        initialValues: state[STATE_REDUCER_KEY].reAssignSupervisor
    }))(reduxForm({
        form: 'ReassignSupervisor',
        enableReinitialize: true,
        validate
    })(ReassignSupervisor));

