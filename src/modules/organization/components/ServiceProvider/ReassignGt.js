import React, { useEffect } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { Components, makeStyles, I18n } from '../../../../common/components';
import { STATE_REDUCER_KEY } from '../../constants';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as Actions from '../../actions';
import { useParams } from 'react-router-dom';
import { renderSelect } from '../../../../utils/FormUtils';
import { MUI_COMMON_OPTIONS } from '../../../../common/constants';
import _ from 'lodash';

const { Grid, Button, MUIDataTable } = Components;
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    item: {
        padding: theme.spacing(1)
    },
    submit: {
        textAlign: 'center'
    },
    divIsDisabled: {
        pointerEvents: 'none',
        opacity: ' 0.7'
    }
}));

const validate = values => {
    const errors = {};
    if (!_.has(values, 'wards') || _.get(values, 'wards.id', null) === null) {
        _.set(errors, 'wards', I18n.t('required', { type: I18n.t('ward') }));
    }
    if (!_.has(values, 'superVisor') || _.get(values, 'superVisor.id', null) === null) {
        _.set(errors, 'superVisor', I18n.t('required', { type: I18n.t('supervisor') }));
    }
    if (!(!_.has(values, 'gt') || _.get(values, 'gt.id', null) === null) && !(!_.has(values, 'toGt') || _.get(values, 'toGt.id', null) === null)) {
        if (values?.gt?.id === values?.toGt?.id) {
            errors.gt = { _error: I18n.t('from_gt_eql_to_gt') };
            errors.toGt = { _error: I18n.t('from_gt_eql_to_gt') };
        }
    } else {
        if (!_.has(values, 'gt') || _.get(values, 'gt.id', null) === null) {
            _.set(errors, 'gt', I18n.t('required', { type: I18n.t('gt') }));
        }
        if (!_.has(values, 'toGt') || _.get(values, 'toGt.id', null) === null) {
            _.set(errors, 'toGt', I18n.t('required', { type: I18n.t('to_gt') }));
        }
    }
    return errors;
};

function ReassignGt(props) {

    const [checkValue, setCheckValue] = React.useState(true);
    const [page, setPage] = React.useState(0);
    const [size, setrowsPerPageState] = React.useState(10);
    const [isTableDisabled, setIsTableDisabled] = React.useState(false);
    const [currentWard, setCurrentWard] = React.useState({});
    const [currentSuperVisor, setCurrentSuperVisor] = React.useState({});
    const [selectedTableData, setSelectedTableData] = React.useState([]);
    const [tableIndex, setTableIndex] = React.useState([]);
    // const [isSelectedAll, setIsSelectedAll] = React.useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id, providerId } = useParams();
    const { wardsByProviderId = {}, getGtBasedOnWardId = {}, listCostomers: { totalCount: count, requestInProgress } = {}, customersBasedOnGt: { data: { content: customerData = [] } = {} } = {}, getAllSuperVisors = {}, getToGtWithProviderId = {}, isReAssignGTSaved: { isSaved } } = useSelector(state => state[STATE_REDUCER_KEY]);
    useEffect(() => {
        return () => {
            dispatch(Actions.resetReAssignGt());
        };
    }, []);
    useEffect(() => {
        dispatch(Actions.getWardsUnderProviderId(id, providerId));
        dispatch(Actions.getSuperVisors(id, providerId));
    }, [providerId]);
    const clearForm = () => {
        props.change('wards', null);
        props.change('gt', null);
        props.change('superVisor', null);
        props.change('toGt', null);
        setCheckValue(false);
        setIsTableDisabled(false);
        props.change('allSelected', false);
        setCurrentSuperVisor({});
        setCurrentWard({});
    };
    const submit = (values) => {
        let newObj = {
            customerEnrollmentIds: selectedTableData,
            allSelected: false
        };
        newObj.allSelected = values.allSelected;
        if (customerData?.length > 0) {
            dispatch(Actions.postReassignGt(newObj, values.gt?.id, values?.toGt?.id));
        }
        setTableIndex([]);
        setSelectedTableData([]);
    };
    useEffect(() => {
        if (isSaved === true) {
            clearForm();
        }
    }, [isSaved]);
    //wrked when checkbox is clicked
    const checkBoxClick = () => {
        setIsTableDisabled(!isTableDisabled);
        setCheckValue(!checkValue);
        props.change('allSelected', checkValue);

    };
    const setSelectedRows = (tableState) => {
        const { selectedRows, displayData } = tableState;
        let indexData = _.map(selectedRows.data, (row) => row.dataIndex);
        setTableIndex(indexData);
        let selectedCustomers = _.filter(displayData, (row) => indexData.includes(row.dataIndex));
        let ids = _.map(selectedCustomers, (customer) => customer.data[0]);
        setSelectedTableData(ids);
    };
    const columns = [
        {
            name: 'id',
            label: I18n.t('id')
        },
        {
            name: 'name',
            label: I18n.t('name')
        }
    ];
    const changePage = (pagess) => {
        setPage(pagess);
    };
    //triggered when add button is pressed
    //triggerd when perPage is clicked
    const changeRowsPerPage = (rowsPerPage) => {
        setrowsPerPageState(rowsPerPage);
    };

    const options = {
        ...MUI_COMMON_OPTIONS,
        selectableRows: 'multiple',
        page: page,
        rowsPerPage: size,
        count: count,
        customActions: [
        ],
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    changePage(tableState.page);
                    break;
                case 'changeRowsPerPage':
                    changeRowsPerPage(tableState.rowsPerPage);
                    break;
                case 'rowSelectionChange':
                    setSelectedRows(tableState);
                    dispatch(Actions.getUuidsOfCustomers(Object.keys(tableState.selectedRows.lookup), customerData));
                    break;

                default:
                    break;
            }
        },
        rowsSelected: tableIndex

    };


    return (
        <div>
            <Form onSubmit={props.handleSubmit(submit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} spacing={2} className={classes.item}>

                        <Field spinnerProps="selectTagProp" name='wards' label={I18n.t('ward')} component={renderSelect}
                            onChange={(resourceItem) => {
                                props.change('gt', null);
                                setCurrentWard(resourceItem);
                                dispatch(Actions.getGtBasedOnWardId(providerId, resourceItem.id));
                            }}>
                            {
                                _.filter(_.get(wardsByProviderId, 'data', []), ['member', true])

                            }
                        </Field>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>

                        <Field spinnerProps={getGtBasedOnWardId?.requestInProgress} name='gt' label={I18n.t('gt')} component={renderSelect}
                            onChange={(resourceItem) => {
                                dispatch(Actions.getCustomersBasedOnGt({ gtId: resourceItem.id, size, page }));
                            }}>
                            {
                                _.get(getGtBasedOnWardId, `data.${_.get(currentWard, 'id', '')}`, [])

                            }
                        </Field>
                    </Grid>
                    {/* <div> */}
                    {/* </div> */}
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>

                        <Field spinnerProps="selectTagProp" name='superVisor' label={I18n.t('supervisor')} component={renderSelect}
                            onChange={(resourceItem) => {
                                props.change('toGt', '');
                                setCurrentSuperVisor(resourceItem);
                                dispatch(Actions.getToGt(id, providerId, resourceItem.id));
                            }}
                        >
                            {
                                _.get(getAllSuperVisors, 'data', [])
                            }
                        </Field>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>

                        <Field spinnerProps={getToGtWithProviderId?.requestInProgress} name='toGt' label={I18n.t('to_gt')} component={renderSelect}

                        >
                            {
                                _.get(getToGtWithProviderId, `formateDataForGT.${_.get(currentSuperVisor, 'id', '')}`, [])

                            }
                        </Field>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Field component="input" name='allSelected' type="checkbox" onClick={() => checkBoxClick()} /><span>{I18n.t('all_selected')}</span>
                    </Grid>
                </Grid>

                <div className={(isTableDisabled) ? classes.divIsDisabled : ''}>
                    {/* {customerData.length > 0 ? */}
                    <MUIDataTable
                        title={I18n.t('customers')}
                        data={customerData}
                        columns={columns}
                        options={options}
                        requestInProgress={requestInProgress}
                    />
                    {/* } */}
                </div>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Button type="submit" >{I18n.t('submit')}</Button>
                </Grid>
            </Form>
        </div>
    );
}
export default
    connect(state => ({
        initialValues: state[STATE_REDUCER_KEY].reAssignGT
    }))(reduxForm({
        form: 'ReassignGt',
        enableReinitialize: true,
        validate
    })(ReassignGt));
