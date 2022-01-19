import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Field, Form, FormSection, reduxForm } from 'redux-form';
import { Components, makeStyles } from '../../../../common/components';
import { STATE_REDUCER_KEY } from '../../constants';
import _ from '../../../../utils/LodashUtils';
import * as Actions from '../../actions';
import LoadingOverlay from '../../../../common/components/custom/LoadingOverlay.js';
import * as Action from '../../../common/actions';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../../common/Permissions';

import { hasAccessPermission } from '../../../../utils/PermissionUtils';
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
const renderCheckBoxes = (list, readOnylFlag) => {
    let data = list.map((item) => {
        return <Grid key={item.id} item xs={4} sm={4} md={4}>
            <Field
                component="input"
                disabled={readOnylFlag}
                name={item.id}
                type="checkbox"
            />
            <label htmlFor={item.id} >{item.name}</label>
        </Grid>;
    });
    return data;
};

function AssignedLocatiion(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const moduleAssignList = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));
    const { assignedLocation } = moduleAssignList;
    const { id, providerId } = useParams();
    // props.change('organizationId', id);


    useEffect(() => {
        dispatch(Actions.fetchLocationForOrganisation(id, providerId));
    }, []);
    const submit = (values) => {
        dispatch(Actions.updateAssignedLOcations(values, id, providerId));
        dispatch(Action.resetFormChange());
    };

    const readOnly = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_LOCATION, ACTION_MAPPING.ORGANIZATION_SERVICE_PROVIDER_ASSIGN_LOCATION.READ_ONLY);

    return (
        <Form onSubmit={props.handleSubmit(submit)}>
            <LoadingOverlay active={assignedLocation.requestInProgress || assignedLocation.requestInProgress}>

                <FormSection name="formData" >
                    <Grid container>
                        {renderCheckBoxes(_.get(assignedLocation, 'data', []), readOnly)}
                    </Grid>
                </FormSection>

                {!readOnly &&
                    <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                        <Button type="submit">{'Submit'}</Button>
                    </Grid>
                }

            </LoadingOverlay>
        </Form >
    );
}

// export default AssignedLocatiion;
export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].assignedLocationView
}))(reduxForm({
    form: 'AssignModulesView',
    enableReinitialize: true
})(AssignedLocatiion));
