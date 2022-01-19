import React, { useEffect } from 'react';
import { Form, reduxForm, Field } from 'redux-form';
import { Components, I18n, makeStyles } from '../../../common/components';
import { DEFAULT_TABLE_PROPS, MUI_COMMON_OPTIONS } from '../../../common/constants';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as Actions from '../actions';
import _ from 'lodash';
import cronstrue from 'cronstrue';
import { useParams } from 'react-router-dom';
import { renderSelect } from '../../../utils/FormUtils';
import cronValidator from 'cron-expression-validator';
import { createStructuredSelector } from 'reselect';
import { STATE_REDUCER_KEY, TABLE_IDS, RESIDENTIAL_CATEGORIES } from '../constants';
import { getTableProps } from '../../../modules/common/selectors';
import { getCustomerListByScheduleID, getScheduleDetailsById } from '../selectors';
import { URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../../modules/common/actions';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const { MUIDataTable, PickySelect, Typography, Button, CardComponent, Grid, Alert } = Components;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    item: {
        padding: theme.spacing(1)
    },
    submit: {
        textAlign: 'center',
        paddingBottom: '5vh'
    },
    divIsDisabled: {
        pointerEvents: 'none',
        opacity: ' 0.7'
    }
}));
const ScheduledCustomer = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { id, type } = useParams();
    const [isSelectedAll, setIsSelectedAll] = React.useState(false);
    const [isTableDisabled, setIsTableDisabled] = React.useState(false);
    const [tableIndex, setTableIndex] = React.useState([]);
    // eslint-disable-next-line no-unused-vars
    const [selected, setSelected] = React.useState([]);
    const { handleSubmit, change } = props;

    const { customerListByScheduleID: { requestInProgress = false, data: { content = [] } = {}, searchKeys } } = props;
    const { getDropdownFilterList, setCustomerFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadCustomerListByScheduleID } = props;
    const { tableProps: { [TABLE_IDS.LIST_CUSTOMERS_SCHEDULE]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);
    const { schedule = {} } = useSelector(state => state[STATE_REDUCER_KEY]);

    const [quartzCron, setQuartzCron] = React.useState('');
    const [currentResidenceCategory, setCurrentResidenceCategory] = React.useState({});

    useEffect(() => {
        // console.log({ schedule });
        const { data: { cronExpression = null, residenceCategory = {}, residenceOrTradingType = {} } = {} } = schedule;
        if (cronValidator.isValidCronExpression(cronExpression)) {
            setQuartzCron(cronstrue.toString(cronExpression));
        } else {
            setQuartzCron(I18n.t('invalid_expression'));
        }
        setCurrentResidenceCategory(residenceCategory);
        let refData = { id: _.get(residenceOrTradingType, 'id', null), name: _.get(residenceOrTradingType, 'name', null) };
        if (residenceCategory.id === RESIDENTIAL_CATEGORIES.RESIDENTIAL) {
            change('residenceType', refData);
        } else if (residenceCategory.id === RESIDENTIAL_CATEGORIES.NON_RESIDENTIAL) {
            change('tradingType', refData);
        } else {
            change('residenceType', null);
            change('tradingType', null);
        }
    }, [schedule]);

    const setFilterItems = (val) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(val);
        loadCustomerListByScheduleID({ queryData: { id, type } });
    };

    useEffect(() => {
        dispatch(Actions.fetchScheduleById(id));
    }, []);

    const setSelectedRows = (tableState) => {
        const { selectedRows, displayData } = tableState;
        let indexData = _.map(selectedRows.data, (row) => row.dataIndex);
        setTableIndex(indexData);
        let selectedCustomers = _.filter(displayData, (row) => indexData.includes(row.dataIndex));
        let ids = _.map(selectedCustomers, (customer) => ({
            customerNumber: customer.data[1],
            ospscId: customer.data[7]
        }));
        setSelected(ids);
    };
    const checkBoxClick = () => {
        setIsTableDisabled(!isTableDisabled);
        setIsSelectedAll(!isSelectedAll);
        props.change('allSelected', isSelectedAll);
    };
    let submitButtonName = type === 'new' ? 'add' : 'remove';

    const passedColumns = [
        { columnLabel: 'customer_id', columnName: 'customerId', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'name', columnName: 'name', apiParam: '', filterBy: 'name' },
        { columnLabel: 'building_type', columnName: 'buildingType', apiParam: '', filterBy: 'name' },
        { columnLabel: 'building_number', columnName: 'buildingNumber', apiParam: '', filterBy: 'name' },
        { columnLabel: 'association_shop_name', columnName: 'assocOrShopName', apiParam: '', filterBy: 'name' },
        { columnLabel: 'address', columnName: 'address', apiParam: '', filterBy: 'name' },
        { columnLabel: 'association_shop_number', columnName: 'assocOrShopName', apiParam: '', filterBy: 'name' },
        { columnLabel: 'customer_num', columnName: 'customerNumber', apiParam: '', filterBy: 'name' },
        { columnLabel: 'ospscId', columnName: 'ospscId' }
    ];

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_CUSTOMERS_SCHEDULE }));
        setChips({});
        loadCustomerListByScheduleID({ queryData: { id, type } });
    }, []);
    const resettingChip = (chipIndex, chipValue, chipList) => {
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setCustomerFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let { filterObj, chipExists } = onFilterChangeFn(chipList, passedColumns);
        if (!chipExists) {
            setFilterItems(filterObj);
        } else {
            setFilterItems(filterObj);
        }
    };

    const onFilterChange = (chipValue, chipList) => {
        let { filterObj } = onFilterChangeFn(chipList, passedColumns);
        setFilterItems(filterObj);

    };
    const options = {
        ...MUI_COMMON_OPTIONS,
        page: page,
        rowsPerPage: size,
        count: count,
        selectableRows: 'multiple',
        filter: true,
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onFilterChange: onFilterChange,
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_CUSTOMERS_SCHEDULE })),
        onTableChange: (action, tableState) => {

            switch (action) {
                case 'changePage':
                    setPageProps({ queryData: { id, type }, pagination: { page: tableState.page } });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({
                        queryData: { id, type },
                        pagination: {
                            page: 0, size: tableState.rowsPerPage
                        }
                    });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_CUSTOMERS_SCHEDULE }));
                    break;
                case 'rowSelectionChange':
                    setSelectedRows(tableState);
                    break;
                default:
                    break;
            }
        },
        rowsSelected: tableIndex
    };

    const columns = [
        {
            name: passedColumns[0].columnName,
            label: I18n.t(passedColumns[0].columnLabel),
            options: {
                display: 'excluded',
                filter: false
            }
        },
        {
            name: passedColumns[7].columnName,
            label: I18n.t(passedColumns[7].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t(passedColumns[7].columnLabel)}</Typography>
                                <PickySelect
                                    id='code7'
                                    name='code7'
                                    options={filterOptions[passedColumns[7].columnName] || []}
                                    value={filterState?.[passedColumns[7].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setCustomerFilter({ [passedColumns[7].apiParam]: { value, property: [passedColumns[7].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'asId'), [passedColumns[7].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: passedColumns[1].columnName,
            label: I18n.t(passedColumns[1].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t(passedColumns[1].columnLabel)}</Typography>
                                <PickySelect
                                    id='code1'
                                    name='code1'
                                    options={filterOptions[passedColumns[1].columnName] || []}
                                    value={filterState?.[passedColumns[1].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setCustomerFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'name'), [passedColumns[1].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }

        },
        {
            name: passedColumns[2].columnName,
            label: I18n.t(passedColumns[2].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t(passedColumns[2].columnLabel)}</Typography>
                                <PickySelect
                                    id='code2'
                                    name='code2'
                                    options={filterOptions[passedColumns[2].columnName] || []}
                                    value={filterState?.[passedColumns[2].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setCustomerFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'buildingType'), [passedColumns[2].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: passedColumns[3].columnName,
            label: I18n.t(passedColumns[3].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t(passedColumns[3].columnLabel)}</Typography>
                                <PickySelect
                                    id='code3'
                                    name='code3'
                                    options={filterOptions[passedColumns[3].columnName] || []}
                                    value={filterState?.[passedColumns[3].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setCustomerFilter({ [passedColumns[3].apiParam]: { value, property: [passedColumns[3].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'buildingNum'), [passedColumns[3].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: passedColumns[4].columnName,
            label: I18n.t(passedColumns[4].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t(passedColumns[4].columnLabel)}</Typography>
                                <PickySelect
                                    id='code4'
                                    name='code4'
                                    options={filterOptions[passedColumns[4].columnName] || []}
                                    value={filterState?.[passedColumns[4].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setCustomerFilter({ [passedColumns[4].apiParam]: { value, property: [passedColumns[4].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'bName'), [passedColumns[4].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: passedColumns[5].columnName,
            label: I18n.t(passedColumns[5].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t(passedColumns[5].columnLabel)}</Typography>
                                <PickySelect
                                    id='code5'
                                    name='code5'
                                    options={filterOptions[passedColumns[5].columnName] || []}
                                    value={filterState?.[passedColumns[5].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setCustomerFilter({ [passedColumns[5].apiParam]: { value, property: [passedColumns[5].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'address'), [passedColumns[5].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },

        {
            name: passedColumns[8].columnName,
            label: I18n.t(passedColumns[8].columnLabel),
            options: {
                filter: false,
                display: 'excluded'
            }
        }

    ];
    const submit = () => {
        let object = {
            allSelected: isSelectedAll
        };
        object.customerNumbers = isSelectedAll ? [] : selected;
        if (object.customerNumbers.length > 0 || object.allSelected) {
            if (type === 'new') {
                dispatch(Actions.addCustomerDataByScheduleId(object, id));
            } else if (type === 'existing') {
                dispatch(Actions.removeCustomerDataByScheduleId(object, id));
            }
        }
        setTableIndex([]);
        change('allSelected', false);
    };

    return (
        <CardComponent>
            <Form onSubmit={handleSubmit(submit)}>
                <Grid container className={classes.item}>
                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field disabled={true} name="organization" label={I18n.t('organization')} component={renderSelect} />
                    </Grid>

                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field disabled={true} name="serviceProvider" label={I18n.t('service_provider')} component={renderSelect} />
                    </Grid>

                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field disabled={true} name="ward" label={I18n.t('ward')} component={renderSelect} />
                    </Grid>

                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field disabled={true} name="serviceWorker" label={I18n.t('gt')} component={renderSelect} />
                    </Grid>

                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field disabled={true} name="residenceCategory" label={I18n.t('residence_category')} component={renderSelect} />
                    </Grid>

                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field disabled={true} name="serviceConfig" label={I18n.t('service')} component={renderSelect} />
                    </Grid>

                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field disabled={true} name="lastExecutionDate" label={I18n.t('last_execution_date')} component={renderSelect} />
                    </Grid>

                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field disabled={true} name="nextExecutionDate" label={I18n.t('next_execution_date')} component={renderSelect} />
                    </Grid>

                    {_.get(currentResidenceCategory, 'id', 0) === RESIDENTIAL_CATEGORIES.RESIDENTIAL &&
                        <Grid item xs={6} sm={6} md={6} className={classes.item}>
                            <Field disabled={true} name="residenceType" label={I18n.t('residence_associations')} component={renderSelect} />
                        </Grid>}

                    {_.get(currentResidenceCategory, 'id', 0) === RESIDENTIAL_CATEGORIES.NON_RESIDENTIAL &&
                        <Grid item xs={6} sm={6} md={6} className={classes.item}>
                            <Field disabled={true} name="tradingType" label={I18n.t('trading_type')} component={renderSelect} />
                        </Grid>
                    }

                    <Grid item xs={6} sm={6} md={6} className={classes.item}>
                        <Field disabled={true} name="serviceInterval" label={I18n.t('interval')} component={renderSelect} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>
                        <Alert type='success' title={<strong>{quartzCron}</strong>} icon=' ' />
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12} className={classes.submit}>
                    <Button type="submit" >{I18n.t(submitButtonName)}</Button>
                </Grid>

                <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                        {
                            hasAccessPermission(RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE_ADD_CUSTOMER, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE_ADD_CUSTOMER.ALL_SELECTED) || hasAccessPermission(RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE_REMOVE_CUSTOMER, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE_REMOVE_CUSTOMER.ALL_SELECTED) &&
                            <> <Field component="input" name='allSelected' type="checkbox" onClick={() => checkBoxClick()} /> <span>{I18n.t('all_selected')}</span></>
                        }
                    </Grid>
                </Grid>
                <div className={(isTableDisabled) ? classes.divIsDisabled : ''}>
                    <MUIDataTable
                        title={I18n.t('scheduled_customer')}
                        options={options}
                        columns={columns}
                        data={content}
                        requestInProgress={requestInProgress}
                    />
                </div>
            </Form >
        </CardComponent>
    );
};
const mapStateToProps = createStructuredSelector({
    tableProps: getTableProps,
    customerListByScheduleID: getCustomerListByScheduleID,
    initialValues: getScheduleDetailsById

    // initialValues: getAllSchedule

});
const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_CUSTOMERS_SCHEDULE, url: URL.SCHEDULE.FETCH_CUSTOMERS_BY_SCHEDULE_ID }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_CUSTOMERS_SCHEDULE }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_CUSTOMERS_SCHEDULE, passedColumns: data })),
    setCustomerFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_CUSTOMERS_SCHEDULE, filterState: data }));
    },
    loadCustomerListByScheduleID: (data) => dispatch(Actions.fetchCustomerDataByScheduleId(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_CUSTOMERS_SCHEDULE }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_CUSTOMERS_SCHEDULE, pagination: data.pagination }));
        dispatch(Actions.fetchCustomerDataByScheduleId(data));
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_CUSTOMERS_SCHEDULE, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_CUSTOMERS_SCHEDULE, pagination: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'ScheduledCustomer',
    enableReinitialize: true
})(ScheduledCustomer));
