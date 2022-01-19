import React, { useEffect } from 'react';
import { Field, FieldArray, Form, reduxForm } from 'redux-form';
import { Components, Icons } from '../../../common/components';
import { renderTextField, renderSelect } from '../../../utils/FormUtils';
import { useDispatch, useSelector, connect } from 'react-redux';
import { getTitlesForDropDown, sentFragmentTitleAssociationForEdit, getFragmentTitleAssociation } from '../actions';
import { STATE_REDUCER_KEY } from '../constants';
import _ from '../../../utils/LodashUtils';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useParams } from 'react-router-dom';
import validate from './validate';
import { liteBoxShadow } from '../../../assets/css/bhoom';
import * as Action from '../../common/actions';
import LoadingCustomOverlay from '../../../common/components/custom/LoadingOverlay';
import i18n from '../../../i18n';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const { Grid, Button, IconButton, CardHeader, CardComponent } = Components;

const { AddBoxTwoTone } = Icons;


const renderTitle = ({ fields, meta: { error }, titles, disabled }) => (
    <ul>
        <li style={{ listStyle: 'none' }}>
            <CardHeader style={{ marginLeft: '-57px' }}
                action={
                    <IconButton aria-label="Options" disabled={disabled} onClick={() => fields.push({})} className='addButton'>
                        <AddBoxTwoTone />
                    </IconButton>
                }
                title={i18n.t('title')}

            />

        </li>
        {fields?.map((labelItem, index) => (
            <div key={index}>
                <Grid container spacing={1} key={index} style={{ marginBottom: '20px', padding: '0 20px' }} justify="space-around" alignItems="center">
                    <Grid item xs={4} >
                        <Field name={`${labelItem}.title`} label={i18n.t('title')} disabled={disabled} component={renderSelect} filterable onChange={(value) =>
                            value} >
                            {
                                _.get(titles, 'data', [])
                            }
                        </Field>
                    </Grid>
                    <Grid item xs={4} >
                        <Field
                            name={`${labelItem}.sort`}
                            type="number"
                            component={renderTextField}
                            label={i18n.t('sort_order')}
                            disabled={disabled}
                        />
                    </Grid>
                    <Grid item xs={2} style={{ marginTop: '30px' }}>
                        <Field
                            component="input"
                            name={`${labelItem}.showLabel`}
                            disabled={disabled}
                            type="checkbox" />
                        <span>{i18n.t('label')}</span>
                    </Grid>
                    <Grid item xs={2} >
                        <IconButton style={{ marginTop: '28px' }} disabled={disabled} onClick={() => fields.remove(index)}> <DeleteForeverIcon /></IconButton>
                    </Grid>
                </Grid>
            </div>
        ))}
        {error && <li className="error">{error}</li>}
    </ul>
);

function FragmentTitleAssociationView(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { change, handleSubmit, submitting } = props;

    const fragmentDetails = useSelector(state => state[STATE_REDUCER_KEY]);
    const { title, titleFragmentAssociation } = fragmentDetails;

    useEffect(() => {
        dispatch(getTitlesForDropDown());

        if (id) {
            dispatch(getFragmentTitleAssociation(id));
        }
    }, []);
    const submit = (values) => {
        let newArray = values.data?.map((item) => {
            let object = {
                id: '',
                sort: '',
                showLabel: false
            };
            object.id = item.title.id;
            object.sort = Number(item.sort);
            object.showLabel = item.showLabel ? item.showLabel : false;
            return object;
        });
        dispatch(sentFragmentTitleAssociationForEdit(id, newArray));
        dispatch(Action.resetFormChange());

    };
    const readOnly = hasAccessPermission(RESOURCE_MAPPING.FRAGMENT_ASSIGN_TITLE, ACTION_MAPPING.FRAGMENT_ASSIGN_TITLE.READ_ONLY);
    return (
        <CardComponent>
            <LoadingCustomOverlay active={titleFragmentAssociation.requestInProgress}>
                <Form onSubmit={handleSubmit(submit)}>
                    <Grid container spacing={2} padding={2} direction='column' justify='space-between'>
                        <Grid item style={liteBoxShadow} xs={12} sm={12} md={12}>
                            <FieldArray name="data" disabled={readOnly} component={renderTitle} titles={title} change={change} />
                        </Grid>
                        {!readOnly &&
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Button type="submit" disabled={submitting} >{i18n.t('submit')}</Button>
                            </Grid>
                        }
                    </Grid>
                </Form>
            </LoadingCustomOverlay>
        </CardComponent>
    );
}
export default
    connect(state => ({
        initialValues: state[STATE_REDUCER_KEY].titleFragmentAssociation
    }))(reduxForm({
        form: 'FragmentTitleAssociationViewForm',
        enableReinitialize: true,
        validate
    })(FragmentTitleAssociationView));

