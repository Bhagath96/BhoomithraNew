import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Field, Form, FormSection, isDirty, reduxForm } from 'redux-form';
import { Components, makeStyles, I18n } from '../../../../common/components';
import { STATE_REDUCER_KEY } from '../../constants';
import _ from '../../../../utils/LodashUtils';
import * as Actions from '../../actions';
import LoadingOverlay from '../../../../common/components/custom/LoadingOverlay.js';
import * as Action from '../../../common/actions';
import { hasAccessPermission } from '../../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../../common/Permissions';
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

export const AssignModulesView = (props) => {

    const renderCheckBoxes = (list, disabled) => {
        let data = list.map((item) => {
            return <Grid key={item.id} item xs={4} sm={4} md={4} >
                <Field
                    component="input"
                    name={item.id}
                    type="checkbox"
                    disabled={disabled}
                    id={item.id}
                />
                <label htmlFor={item.id} >{item.name}</label>

            </Grid>;
        });

        return data;
    };
    const classes = useStyles();
    const dispatch = useDispatch();
    const moduleAssignList = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));
    const { assignModuleList, saveModuleList } = moduleAssignList;
    const { id } = useParams();


    useEffect(() => {
        dispatch(Actions.fetchModulesforChk(id));
    }, []);

    const submit = (values) => {
        dispatch(Actions.saveModulesinOrgChk({ ...values, organizationId: id }));
        dispatch(Action.resetFormChange());
    };

    useEffect(() => {
        if (props.dirty) {
            dispatch(Action.setFormChange({ form: 'AssignModulesView', isDirty: true }));
        }
    }, [props.dirty]);
    const readOnlyPermission = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_ASSIGN_MODULE_MODULES, ACTION_MAPPING.ORGANIZATION_ASSIGN_MODULE_MODULES.READ_ONLY);

    return (
        <Form onSubmit={props.handleSubmit(submit)}>
            <LoadingOverlay active={assignModuleList.requestInProgress || saveModuleList.requestInProgress}>
                <FormSection name="formData">
                    <Grid container >

                        {renderCheckBoxes(_.get(assignModuleList, 'data', []), readOnlyPermission)}
                    </Grid>
                </FormSection>
                {!readOnlyPermission && <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                    <Button type="submit">{I18n.t('submit')}</Button>
                </Grid>
                }
            </LoadingOverlay>
        </Form >
    );
};

export default connect(state => ({
    initialValues: state[STATE_REDUCER_KEY].assignModulesView,
    dirty: isDirty('AssignModulesView')
}))(reduxForm({
    form: 'AssignModulesView',
    enableReinitialize: true
})(AssignModulesView));
