import React, { useEffect } from 'react';
import { Field, Form, FormSection, reduxForm } from 'redux-form';
import { Components, makeStyles } from '../../../common/components';
import { STATE_REDUCER_KEY } from '../constants';
import _ from '../../../utils/LodashUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as Actions from '../actions';
import { useParams } from 'react-router-dom';
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';


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
const renderCheckBoxes = (list) => {
    let data = list.map((item) => {
        return <Grid key={item.id} item xs={6} sm={6} md={6}>
            <Field
                component="input"
                name={item.id}
                type="checkbox" />
            <label htmlFor={item.id} >{item.name}</label>
        </Grid>;
    });
    return data;
};

function AssignOrganisation(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const OrganizationDetails = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));
    const { assignOrganisationList, updateModuleMapping } = OrganizationDetails;
    const { id } = useParams();
    props.change('organizationId', id);

    useEffect(() => {
        dispatch(Actions.loadOrganisationListForModule(id));
    }, []);

    const submit = (values) => {
        dispatch(Actions.updateUserOrganizationMapping(id, values));
    };
    return (
        <div>
            <Form onSubmit={props.handleSubmit(submit)}>
                <LoadingOverlay active={assignOrganisationList.requestInProgress || updateModuleMapping.requestInProgress}>

                    <FormSection name="users">
                        <Grid container>
                            {renderCheckBoxes(_.get(assignOrganisationList, 'data', []))}
                        </Grid>
                    </FormSection>
                    <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                        <Button type="submit">{'Submit'}</Button>
                    </Grid>
                </LoadingOverlay>
            </Form>
        </div>
    );
}


export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].assignOrganisation
}))(reduxForm({
    form: 'AssignUsersForm',
    enableReinitialize: true
})(AssignOrganisation));

