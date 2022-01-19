import React, { useEffect } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { renderTextField, renderTextAreaField } from '../../../utils/FormUtils';
import { makeStyles, Components } from '../../../common/components';
import { useDispatch, connect, useSelector } from 'react-redux';
import { STATE_REDUCER_KEY } from '../constants';
import { useParams } from 'react-router-dom';
import { getModuleDetailsById, editModuleDetails } from '../actions';
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';


const { Grid, Button } = Components;
const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Name is Required';
    }
    if (!values.title) {
        errors.title = 'Title is Required';
    }
    if (!values.description) {
        errors.description = 'Description Required';
    }
    if (!values.key) {
        errors.key = 'Description Required';
    }
    return errors;
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

function ModuleDetailsView(props) {

    const initialValues = useSelector(state => state[STATE_REDUCER_KEY]);
    const { updateModule } = initialValues;
    const classes = useStyles();
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getModuleDetailsById(id));
    }, []);

    const { handleSubmit } = props;

    const submit = (values) => {
        dispatch(editModuleDetails(id, values));
    };
    return (
        <div>
            <Form onSubmit={handleSubmit(submit)} >
                <LoadingOverlay active={updateModule.requestInProgress}>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <Field name='name' label="Name" type='text' component={renderTextField} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <Field name='title' label="Title" type='text' component={renderTextField} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <Field name='description' label="Description" type='text' placeholder='Description' component={renderTextAreaField} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <Field name='key' label="key" type='text' placeholder='Key' component={renderTextField} disabled={true} />
                    </Grid>
                    <Grid item xs={12} className={classes.submit}>
                        <Button type="submit">Submit</Button>
                    </Grid>
                </LoadingOverlay>
            </Form>
        </div>
    );
}

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].getModuleById.data
}))(reduxForm({
    form: 'ModuleEditForm',
    enableReinitialize: true,
    validate
})(ModuleDetailsView));
