import React, { useEffect } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { makeStyles, Components } from '../../../common/components';
import { useDispatch, connect, useSelector } from 'react-redux';
import { STATE_REDUCER_KEY } from '../constants';
import { useParams } from 'react-router-dom';
import { renderSimpleSelect } from '../../../utils/FormUtils';
import * as Actions from '../actions';
const { Grid, Button } = Components;
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';


const useStyles = makeStyles((theme) => ({
    item: {
        padding: theme.spacing(1)
    },
    submit: {
        textAlign: 'center'
    },
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}));
function ModulePermission(props) {
    const { id } = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { change, handleSubmit } = props;
    useEffect(() => {
        dispatch(Actions.listPermissionControllers());
    }, []);
    const ModuleDetails = useSelector(state => state[STATE_REDUCER_KEY]);
    const { listFullPermission: { data: resources } = {}, requestInProgress, addModulePermission } = ModuleDetails;
    const submit = (values) => {
        dispatch(Actions.saveResourceActions(values));
    };

    return (
        <div>
            <Form onSubmit={handleSubmit(submit)}>
                <LoadingOverlay active={addModulePermission.requestInProgress}>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <Field showLoader={requestInProgress} spinnerProps="selectTagProp" name='resourceId' label="Resource" component={renderSimpleSelect}
                            onChange={(resource) => {
                                change('resourceId', resource.target.value);
                                change('actions', {});
                                dispatch(Actions.fetchResourceActions({ resourceId: resource.target.value, roleId: id }));
                            }}>
                            {
                                resources?.map(item => ({ id: item.id, name: item.label }))
                            }
                        </Field>
                        {/* <FormSection name="actions">
                        <Grid container>
                            {renderCheckBoxes(_.get(resourceActionsList, 'data.resource.resourceActions', []))}
                        </Grid>
                    </FormSection> */}
                    </Grid>
                    <Grid item xs={12} className={classes.submit}>
                        <Button type="submit">Submit</Button>
                    </Grid>
                </LoadingOverlay>
            </Form>
        </div>
    );
}

export default
    connect(state => ({
        initialValues: state[STATE_REDUCER_KEY].resourceActions
    }))(reduxForm({
        form: 'EditModulePermission'
    })(ModulePermission));
