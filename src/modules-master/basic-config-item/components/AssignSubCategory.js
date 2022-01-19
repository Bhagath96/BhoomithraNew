import React, { useEffect } from 'react';
import { Components, I18n } from '../../../common/components';
import { makeStyles, Paper } from '@material-ui/core';
import { renderSelect } from '../../../utils/FormUtils';
import { Field, Form, reduxForm } from 'redux-form';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as Actions from '../actions';
import { STATE_REDUCER_KEY } from '../constant';
import { useParams } from 'react-router-dom';
import _ from '../../../utils/LodashUtils';
import swlt from 'sweetalert2';
import validate from './validate';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';
const { Grid, Button, MUIDataTable, DottedMenu } = Components;

const useStyles = makeStyles((theme) => ({

    item: {
        padding: theme.spacing(3)
    }
}));


const AssignSubCategory = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(Actions.fetchSubCategoryItems());
        dispatch(Actions.fetchSubCategoryItemsById(id));
    }, []);

    const categoryDetails = useSelector(state => state[STATE_REDUCER_KEY]);
    const { fetchSubCategoryById: { data: content = [], requestInProgress = false } = {} } = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));
    const { listSubCategoryItemDetails = {} } = categoryDetails;
    const { data } = listSubCategoryItemDetails;
    let { content: dropDownContent = [] } = data;

    const submit = (values) => {
        const { subCategory = {} } = values;
        const itemSubCatId = _.get(subCategory, 'id', 0);
        dispatch(Actions.saveSubCategoryItems(id, itemSubCatId));

    };

    //function for delete
    const deletePressed = (rowData) => {
        let itemSubCategoryId = rowData[0];
        swlt.fire({
            title: I18n.t('are_you_sure_to_delete'),
            showCancelButton: true,
            confirmButtonText: I18n.t('yes'),
            cancelButtonText: I18n.t('no')
        }).then((result) => {
            if (result.value) {
                dispatch(Actions.deleteItemSubCategoryById(id, itemSubCategoryId));
            }
        });
    };

    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'name', columnName: 'name', apiParam: 'names', filterBy: 'name' }

    ];
    const columns = [
        {
            name: 'id',
            label: I18n.t([passedColumns[0].columnLabel])
        },
        {
            name: 'name',
            label: I18n.t([passedColumns[1].columnLabel])

        }

    ];
    let actions = {
        name: 'Actions',
        label: I18n.t('actions'),
        options: {
            customBodyRender: (value, tableMeta) => {
                let { rowData } = tableMeta;
                let menuActions = [];
                if (hasAccessPermission(RESOURCE_MAPPING.ITEM_SUBCATEGORY, ACTION_MAPPING.ITEM_SUBCATEGORY.DELETE_ITEM_SUBCATEGORY)) {
                    menuActions.push({ name: I18n.t('remove'), fn: () => deletePressed(rowData) });
                }
                return <DottedMenu options={menuActions} />;
            }
        }
    };
    columns.push(actions);

    const options = {
        filter: false
    };

    return (
        <>
            <Paper elevation={3} style={{ marginBottom: 15 }}>
                <Form onSubmit={props.handleSubmit(submit)}>
                    <Grid container className={classes.item} direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <Grid item lg={4} xs={6} sm={6} md={6} className={classes.item}>
                            <Field name="subCategory" label={I18n.t('sub_category')} component={renderSelect}>
                                {dropDownContent}
                            </Field>
                        </Grid>
                        <Button type='submit'>{I18n.t('add')}</Button>
                    </Grid>
                </Form>
                <MUIDataTable
                    title={I18n.t('sub_category')}
                    options={options}
                    columns={columns}
                    data={content?.content || []}
                    requestInProgress={requestInProgress}
                />
            </Paper>
        </>
    );

};

export default connect()(reduxForm({
    form: 'AssignSubCategory',
    validate
})(AssignSubCategory));
