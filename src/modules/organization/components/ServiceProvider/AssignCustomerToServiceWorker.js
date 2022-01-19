import React, { useEffect } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { Components, makeStyles, I18n } from '../../../../common/components';
import { STATE_REDUCER_KEY, TABLE_IDS } from '../../constants';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as Actions from '../../actions';
import { useParams } from 'react-router-dom';
import { renderSelect } from '../../../../utils/FormUtils';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS } from '../../../../common/constants';
import { getTableProps } from '../../../common/selectors';
import { getOrganizationAssignGTList } from '../../selectors';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setAdditionalTableFilters, resetFormChange, setSelectedIds, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates, setDropdownFilterOptions } from '../../../common/actions';

import _ from 'lodash';
import { URL } from '../../../../common';
const { Grid, Button, MUIDataTable, PickySelect, Typography, Tabs, Tab, HorizontalTabPanel: TabPanel } = Components;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 5,
        display: 'flex'
    },
    item: {
        padding: theme.spacing(1)
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    submit: {
        textAlign: 'center'
    },
    divIsDisabled: {
        pointerEvents: 'none',
        opacity: ' 0.7'
    }
}));
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const passedColumns = [
    { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
    { columnLabel: 'name', columnName: 'name', apiParam: 'customerNames', filterBy: 'id' },
    { columnLabel: 'mobile', columnName: 'mobile', apiParam: 'mobiles', filterBy: 'id' },
    { columnLabel: 'customer_number', columnName: 'customerNumber', apiParam: 'customerNumbers', filterBy: 'id' },
    { columnLabel: 'ward', columnName: 'ward.name', apiParam: 'ward', filterBy: 'id' },
    { columnLabel: 'address', columnName: 'address', apiParam: 'address', filterBy: 'id' },
    { columnLabel: 'association_name', columnName: 'associationName', apiParam: 'associationName', filterBy: 'id' },
    { columnLabel: 'member', columnName: 'member', apiParam: '', filterBy: 'id' }
];
function AssignCustomerToServiceWorker(props) {
    const {
        getDropdownFilterList, resetTableFilterList, setAssignGTFilter, setPassedColumnsForTabel,
        conditionalReload, setPagination, setChips, setPageProps, setPassedColumnsForTable,
        loadUsers, setSelectedUsers,
        tableProps: {
            [TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER]: {
                selectedIds = []
            } = {} },
        AssignGT: {
            requestInProgress: AssignGTListRequestInProgress = false,

            searchKeys }
    } = props;
    const { tableProps: { [TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);

    const { wardsByProviderId = {}, swSuperVisorForWard = {}, serviceWorkerFromSwSuperVisor, assignCustomerToServiceWorker: { data: assignCustomerToServiceWorkerData = [] } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    const [checkValue, setCheckValue] = React.useState(true);
    const [currentWard, setCurrentWard] = React.useState({});
    const [currentSwSuperVisor, setcurrentSwSuperVisor] = React.useState({});
    const [currentServiceWorkerFromSuperVisor, setcurrentServiceWorkerFromSuperVisor] = React.useState({});
    const [member, setMember] = React.useState(false);
    const [unassignedUsersOnly, setUnassignedUsersOnly] = React.useState(false);
    const [rowsSelected, setRowsSelected] = React.useState([]);
    const [isTableDisabled, setIsTableDisabled] = React.useState(false);

    const classes = useStyles();
    const dispatch = useDispatch();
    const { id, providerId } = useParams();

    useEffect(() => {
        dispatch(Actions.getWardsUnderProviderId(id, providerId));
        dispatch(Actions.getSuperVisors(id, providerId));
        return () => {
            dispatch(Actions.cleanAssignServiceWorkerToSupervisor());
        };
    }, [providerId]);

    const checkBoxClick = () => {
        setIsTableDisabled(!isTableDisabled);
        setCheckValue(!checkValue);
        props.change('allSelected', checkValue);

    };
    const submit = (values) => {
        if (values.allSelected) {
            let customerToServiceWorkerObj = {
                member: member,
                allSelected: true,
                customerNumbers: []
            };
            dispatch(Actions.submitcustomerNumbers({ customerToServiceWorkerObj, organizationId: id, serviceProviderId: providerId, supervisorId: currentSwSuperVisor?.id, gtId: currentServiceWorkerFromSuperVisor?.id, allSelected: true, wardId: currentWard?.id }));

        } else {
            let customerToServiceWorkerObj = {
                member: member,
                allSelected: false,
                customerNumbers: selectedIds
            };
            dispatch(Actions.submitcustomerNumbers({ customerToServiceWorkerObj, organizationId: id, serviceProviderId: providerId, supervisorId: currentSwSuperVisor?.id, gtId: currentServiceWorkerFromSuperVisor?.id, allSelected: false, wardId: currentWard?.id }));
        }
    };

    const onMemberClick = (params) => {
        let flag = params;
        let dropdownFilterOptions = flag ? { member: true } : {};
        dispatch(setDropdownFilterOptions({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER, dropdownFilterOptions }));
        setUnassignedUsersOnly(false);
        setSelectedUsers([]);
        setMember(flag);
        props.change('unassignedUsersOnly', false);
        if (currentWard?.id && currentSwSuperVisor?.id) {
            conditionalReload({ unassignedUsersOnly, member: flag, organizationId: Number(id), serviceProviderId: Number(providerId), wardId: currentWard?.id, gtId: currentServiceWorkerFromSuperVisor?.id, apiCallFlag: true, supervisorId: currentSwSuperVisor?.id });
        }
    };

    const setFilterItems = (data) => {
        setChips(data);
        loadUsers();
    };

    const setSelectedRows = (tableState) => {
        const { selectedRows, displayData } = tableState;
        let indexData = _.map(selectedRows.data, (row) => row.dataIndex);
        setRowsSelected(indexData);
        let selectedCustomers = _.filter(displayData, (row) => indexData.includes(row.dataIndex));
        let ids = _.map(selectedCustomers, (customer) => customer.data[3]);
        setSelectedUsers(ids);
    };

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPassedColumnsForTabel(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        resetTableFilterList({ organizationId: id });
        dispatch(resetFilter({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER }));
        setChips({});
        setSelectedUsers([]);
    }, []);

    useEffect(() => {
        if (selectedIds.length === 0) {
            setRowsSelected([]);
        }
    }, [selectedIds]);


    const resettingChip = (chipIndex, chipValue, chipList) => {
        setSelectedUsers([]);
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setAssignGTFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let newObj = {}, chipExists = false;
        chipList?.map((item, index) => {
            if (item.length > 0) {
                chipExists = true;
                newObj[passedColumns[index].apiParam] = `${item}`;
            }
        });
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER }));
            setFilterItems({});
        } else {
            setFilterItems(newObj);
        }
    };

    const onFilterChange = (chipValue, chipList) => {
        setSelectedUsers([]);
        let newObj = {}, chipExists = false;
        chipList?.map((item, index) => {
            if (item.length > 0) {
                chipExists = true;
                newObj[passedColumns[index].apiParam] = `${item}`;
            }
        });
        if (!chipExists) {
            setFilterItems({});
        } else {
            setFilterItems(newObj);
        }
    };

    let options = {
        ...MUI_COMMON_OPTIONS,
        page,
        rowsPerPage: size,
        count,
        selectableRows: 'multiple',
        selectableRowsHeader: true,
        rowsSelected: rowsSelected,
        onFilterChange: onFilterChange,
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER })),

        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setSelectedUsers([]);
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setSelectedUsers([]);
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    setSelectedUsers([]);
                    dispatch(resetFilter({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER }));
                    setFilterItems({});
                    break;
                case 'rowSelectionChange':
                    setSelectedRows(tableState);
                    break;
                default:
                    break;
            }
        }
    };
    const columProps = [
        {
            name: passedColumns[0].columnName,
            label: I18n.t(passedColumns[0].columnLabel),
            options: {
                display: 'excluded',
                filter: false
            }
        },
        {
            name: passedColumns[1].columnName,
            label: I18n.t(passedColumns[1].columnLabel),
            options: {
                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t([passedColumns[1].columnLabel])]}</Typography>
                                <PickySelect
                                    id={passedColumns[1].columnName}
                                    name={passedColumns[1].columnName}
                                    options={filterOptions[passedColumns[1].columnName] || []}
                                    value={filterState?.[passedColumns[1].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setAssignGTFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, passedColumns[1].columnName, 'customer.customerName'), [passedColumns[1].columnName], id, currentServiceWorkerFromSuperVisor?.id, currentWard?.id, currentSwSuperVisor?.id, providerId);
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
                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t([passedColumns[2].columnLabel])]}</Typography>
                                <PickySelect
                                    id={passedColumns[2].columnName}
                                    name={passedColumns[2].columnName}
                                    options={filterOptions[passedColumns[2].columnName] || []}
                                    value={filterState?.[passedColumns[2].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setAssignGTFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, passedColumns[2].columnName, 'customer.phoneNumber'), [passedColumns[2].columnName], id, currentServiceWorkerFromSuperVisor?.id, currentWard?.id, currentSwSuperVisor?.id, providerId);
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
                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t([passedColumns[3].columnLabel])]}</Typography>
                                <PickySelect
                                    id={passedColumns[3].columnName}
                                    name={passedColumns[3].columnName}
                                    options={filterOptions[passedColumns[3].columnName] || []}
                                    value={filterState?.[passedColumns[3].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setAssignGTFilter({ [passedColumns[3].apiParam]: { value, property: [passedColumns[3].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, passedColumns[3].columnName, 'customer.customerNumber'), [passedColumns[3].columnName], id, currentServiceWorkerFromSuperVisor?.id, currentWard?.id, currentSwSuperVisor?.id, providerId);
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
                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t([passedColumns[4].columnLabel])]}</Typography>
                                <PickySelect
                                    id={passedColumns[4].columnName}
                                    name={passedColumns[4].columnName}
                                    options={filterOptions[passedColumns[4].columnName] || []}
                                    value={filterState?.[passedColumns[4].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setAssignGTFilter({ [passedColumns[4].apiParam]: { value, property: [passedColumns[4].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, passedColumns[4].columnName, 'ward.label'), [passedColumns[4].columnName], id, currentServiceWorkerFromSuperVisor?.id, currentWard?.id, currentSwSuperVisor?.id, providerId);
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
                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t([passedColumns[5].columnLabel])]}</Typography>
                                <PickySelect
                                    id={passedColumns[4].columnName}
                                    name={passedColumns[4].columnName}
                                    options={filterOptions[passedColumns[5].columnName] || []}
                                    value={filterState?.[passedColumns[5].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setAssignGTFilter({ [passedColumns[5].apiParam]: { value, property: [passedColumns[4].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, passedColumns[5].columnName, 'customer.address'), [passedColumns[4].columnName], id, currentServiceWorkerFromSuperVisor?.id, currentWard?.id, currentSwSuperVisor?.id, providerId);
                                    }}
                                />
                            </>
                        );
                    }
                }
            }
        },
        {
            name: passedColumns[6].columnName,
            label: I18n.t(passedColumns[6].columnLabel),
            options: {
                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t([passedColumns[6].columnLabel])]}</Typography>
                                <PickySelect
                                    id={passedColumns[6].columnName}
                                    name={passedColumns[6].columnName}
                                    options={filterOptions[passedColumns[6].columnName] || []}
                                    value={filterState?.[passedColumns[6].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setAssignGTFilter({ [passedColumns[6].apiParam]: { value, property: [passedColumns[6].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, passedColumns[6].columnName, 'customer.associationName'), [passedColumns[6].columnName], id, currentServiceWorkerFromSuperVisor?.id, currentWard?.id, currentSwSuperVisor?.id, providerId);
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
                filter: false,
                display: 'excluded'
            }
        }
    ];
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Form onSubmit={props.handleSubmit(submit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} spacing={2} className={classes.item}>

                        <Field spinnerProps="selectTagProp" name='wards' label={I18n.t('ward')} component={renderSelect}
                            onChange={(resourceItem) => {
                                props.change('gt', null);
                                props.change('swSuperVisor', null);
                                props.change('serviceWorker', null);
                                props.change('member', false);
                                setCurrentWard(resourceItem);
                                dispatch(Actions.getSwSuperVisorForWard({ wardId: resourceItem.id, orgId: id, providerId: providerId }));
                            }}>
                            {
                                _.get(wardsByProviderId, 'data', [])

                            }
                        </Field>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>

                        <Field spinnerProps={swSuperVisorForWard?.requestInProgress} name='swSuperVisor' label={I18n.t('sw_superVisor')} component={renderSelect}
                            onChange={(resourceItem) => {
                                setcurrentSwSuperVisor(resourceItem);
                                dispatch(Actions.getServiceWorkerFromSWSuperVisor({ swSuperVisorId: resourceItem.id, wardId: currentWard?.id, orgId: id, providerId: providerId }));
                            }}>
                            {
                                _.get(swSuperVisorForWard, 'data', [])

                            }
                        </Field>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.item}>

                        <Field spinnerProps={serviceWorkerFromSwSuperVisor?.requestInProgress} name='serviceWorker' label={I18n.t('service_worker')} component={renderSelect}
                            onChange={(resourceItem) => {
                                setcurrentServiceWorkerFromSuperVisor(resourceItem);
                                setMember(false);
                                props.change('unassignedUsersOnly', false);
                                conditionalReload({ unassignedUsersOnly, member: false, organizationId: Number(id), serviceProviderId: Number(providerId), wardId: currentWard?.id, gtId: resourceItem?.id, apiCallFlag: true, supervisorId: currentSwSuperVisor?.id });
                            }}>
                            {
                                _.get(serviceWorkerFromSwSuperVisor, 'data', [])

                            }
                        </Field>
                    </Grid>

                    <div className={classes.root}>
                        <Tabs value={value} onChange={handleChange} aria-label="Vertical tabs example" orientation='vertical' style={{ width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className={classes.tabs}>
                            <Tab label={I18n.t('show_customers_without_service_worker')} {...a11yProps(0)} onClick={() => onMemberClick(false)} />
                            <Tab label={I18n.t('show_customer_with_service_worker')} {...a11yProps(1)} onClick={() => onMemberClick(true)} />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Field component="input" name='allSelected' type="checkbox" onClick={() => checkBoxClick()} /><span>{I18n.t('all_selected')}</span>
                            </Grid>
                            <div className={(isTableDisabled) ? classes.divIsDisabled : ''}>
                                <MUIDataTable
                                    title={I18n.t('assign_customer_to_serviceworker')}
                                    options={options}
                                    columns={columProps}
                                    data={assignCustomerToServiceWorkerData}
                                    requestInProgress={AssignGTListRequestInProgress}
                                />
                            </div>
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Button type="submit" >{I18n.t('assign')}</Button>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Field component="input" name='allSelected' type="checkbox" onClick={() => checkBoxClick()} /><span>{I18n.t('all_selected')}</span>
                            </Grid>
                            <div className={(isTableDisabled) ? classes.divIsDisabled : ''}>
                                <MUIDataTable
                                    title={I18n.t('assign_customer_to_serviceworker')}
                                    options={options}
                                    columns={columProps}
                                    data={assignCustomerToServiceWorkerData}
                                    requestInProgress={AssignGTListRequestInProgress}
                                />
                            </div>
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Button type="submit" >{I18n.t('unassign')}</Button>
                            </Grid>
                        </TabPanel>
                    </div>
                </Grid>
            </Form>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName, organizationId, gtId, wardId, supervisorId, serviceProviderId) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER, url: URL.ORGANIZATION.GET_DATAS_FOR_CUSTOMER_TO_SERVICE_WORKER.replace(':organizationId', organizationId).replace(':gtId', gtId).replace(':wardId', wardId).replace(':supervisorId', supervisorId).replace(':serviceProviderId', serviceProviderId) }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER }));
        }
    },
    loadUsers: () => dispatch(Actions.fetchOrganizationAssignGT({ pagination: false })),
    setPassedColumnsForTabel: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER, passedColumns: data })),
    updateGtCustomerMapping: (data) => dispatch(Actions.updateGtCustomerMapping(data)),
    resetForm: () => dispatch(resetFormChange()),
    setAssignGTFilter: (data) => dispatch(setTableFilterState({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER, filterState: data })),
    resetTableFilterList: ({ organizationId }) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER }));
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER, additionalFilters: { unassignedUsersOnly: false, member: false, organizationId } }));
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER, passedColumns: data })),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER }));
        dispatch(setTablePagination({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER, pagination: data }));
        // dispatch()
        dispatch(Actions.fetchOrganizationAssignGT());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER, pagination: data })),
    conditionalReload: (data) => {
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER, additionalFilters: data }));
        if (data.apiCallFlag) {
            dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER }));
            // console.log('insidefe flag trueeetyy')
            dispatch(Actions.fetchOrganizationAssignGT());

        }
    },
    setSelectedUsers: (data) => dispatch(setSelectedIds({ key: TABLE_IDS.ASSIGN_CUSTOMER_TO_SERVICE_WORKER, selectedIds: data }))
});
const mapStateToProps = createStructuredSelector({
    tableProps: getTableProps,
    AssignGT: getOrganizationAssignGTList
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'AssignCustomerToServiceWorker'
})(AssignCustomerToServiceWorker));

