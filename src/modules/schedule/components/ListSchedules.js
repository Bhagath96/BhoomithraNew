import _ from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Components, I18n } from '../../../common/components';
import { DEFAULT_TABLE_PROPS, MUI_COMMON_OPTIONS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import * as Actions from '../actions';
import { TABLE_IDS } from '../constants';
import LoadingOverlay from '../../../common/components/custom/LoadingOverlay.js';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import * as Routes from '../../../routes';
import { useParams } from 'react-router-dom';
import { convertToLocal } from '../../../utils/DateUtils';
import cronstrue from 'cronstrue';
import cronValidator from 'cron-expression-validator';
import { getTableProps } from '../../common/selectors';
import { Typography } from '@material-ui/core';
import PickySelect from '../../../common/components/custom/PickySelect';
import { getAllSchedule } from '../selectors';
import { URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../../modules/common/actions';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const { MUIDataTable, DottedMenu } = Components;


const ListSchedules = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // eslint-disable-next-line no-unused-vars
    const { dummy } = useParams();
    // eslint-disable-next-line no-unused-vars
    const [currentFormValues, setCurrentFormValue] = React.useState({});

    const { listSchedule: { requestInProgress = false, data: { content = [] } = {}, searchKeys } } = props;
    const { getDropdownFilterList, setScheduleFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadSchedule } = props;
    const { tableProps: { [TABLE_IDS.LIST_SCHEDULE]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);

    const setFilterItems = (val) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(val);
        loadSchedule(currentFormValues);
    };

    const editPressed = (rowData) => {
        let id = rowData[0];
        history.push(`${Routes.PATH.SCHEDULE}/${id}`);
    };
    const addCustomerPressed = (rowData) => {
        let id = rowData[0];
        history.push(`${Routes.PATH.SCHEDULE}/${id}/new`);
    };
    const removeCustomerPressed = (rowData) => {
        let id = rowData[0];
        history.push(`${Routes.PATH.SCHEDULE}/${id}/existing`);
    };
    const showHistory = (rowData) => {
        let id = rowData[0];
        history.push(`${Routes.PATH.SCHEDULE}/${id}/history`);
    };

    const deletePressed = (rowData) => {
        let id = rowData[0];
        Swal.fire({
            title: I18n.t('are_you_sure_to_delete'),
            showCancelButton: true,
            confirmButtonText: I18n.t('yes'),
            cancelButtonText: I18n.t('no')
        }).then((result) => {
            if (result.value) {
                dispatch(Actions.deleteScheduleData(id || 0, { size, page }));
            }
        });
    };
    const passedColumns = [
        { columnName: 'id', columnLabel: 'id', apiParam: 'id', filterBy: 'id' },
        { columnName: 'organization', columnLabel: 'organization', apiParam: 'organizationNames', filterBy: 'name' },
        { columnName: 'serviceProvider', columnLabel: 'service_provider', apiParam: 'serviceProviderNames', filterBy: 'name' },
        { columnName: 'serviceWorker', columnLabel: 'service_worker', apiParam: 'serviceWorkerNames', filterBy: 'name' },
        { columnName: 'ward', columnLabel: 'ward', apiParam: 'wardNames', filterBy: 'name' },
        { columnName: 'serviceConfig', columnLabel: 'service', apiParam: 'serviceConfigNames', filterBy: 'name' },
        { columnName: 'serviceInterval', columnLabel: 'service_interval', apiParam: 'serviceIntervalNames', filterBy: 'name' },
        { columnName: 'residenceCategory', columnLabel: 'residence_category', apiParam: 'residenceCategoryNames', filterBy: 'name' },
        { columnName: 'cronExpression', columnLabel: 'cron_expression', apiParam: '', filterBy: 'name' },
        { columnName: 'lastExecutionDate', columnLabel: 'last_execution_time', apiParam: '', filterBy: 'name' },
        { columnName: 'nextExecutionDate', columnLabel: 'next_execution_time', apiParam: '', filterBy: 'name' }
    ];
    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_SCHEDULE }));
        setChips({});
        loadSchedule();
    }, []);


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
            name: passedColumns[1].columnName,
            label: I18n.t(passedColumns[1].columnLabel),
            options: {
                customBodyRender: (value) => {
                    return value.name;
                },
                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t(passedColumns[1].columnLabel)]}</Typography>
                                <PickySelect
                                    id='organization'
                                    name='organization'
                                    options={filterOptions[passedColumns[1].columnName] || []}
                                    value={filterState?.[passedColumns[1].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setScheduleFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'organization.name'), [passedColumns[1].columnName]);
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
                customBodyRender: (value) => {
                    return value.name;
                },
                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t(passedColumns[2].columnLabel)]}</Typography>
                                <PickySelect
                                    id='service_provider'
                                    name='service_provider'
                                    options={filterOptions[passedColumns[2].columnName] || []}
                                    value={filterState?.[passedColumns[2].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setScheduleFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'organization_service_provider.serviceProviderName'), [passedColumns[2].columnName]);
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
                customBodyRender: (value) => {
                    return value.name;
                },
                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t(passedColumns[3].columnLabel)]}</Typography>
                                <PickySelect
                                    id='service_worker'
                                    name='service_worker'
                                    options={filterOptions[passedColumns[3].columnName] || []}
                                    value={filterState?.[passedColumns[3].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setScheduleFilter({ [passedColumns[3].apiParam]: { value, property: [passedColumns[3].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'user.serviceWorkerName'), [passedColumns[3].columnName]);
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
                customBodyRender: (value) => {
                    return value.name;
                },
                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t(passedColumns[4].columnLabel)]}</Typography>
                                <PickySelect
                                    id='ward.label'
                                    name='ward.label'
                                    options={filterOptions[passedColumns[4].columnName] || []}
                                    value={filterState?.[passedColumns[4].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setScheduleFilter({ [passedColumns[4].apiParam]: { value, property: [passedColumns[4].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'ward.label'), [passedColumns[4].columnName]);
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
                customBodyRender: (value) => {
                    return value.name;
                },
                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t(passedColumns[5].columnLabel)]}</Typography>
                                <PickySelect
                                    id='service_config'
                                    name='service_config'
                                    options={filterOptions[passedColumns[5].columnName] || []}
                                    value={filterState?.[passedColumns[5].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setScheduleFilter({ [passedColumns[5].apiParam]: { value, property: [passedColumns[5].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'm_service_config_label.serviceName'), [passedColumns[5].columnName]);
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
                customBodyRender: (value) => {
                    return value.name;
                },
                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t(passedColumns[6].columnLabel)]}</Typography>
                                <PickySelect
                                    id='service_interval'
                                    name='service_interval'
                                    options={filterOptions[passedColumns[6].columnName] || []}
                                    value={filterState?.[passedColumns[6].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setScheduleFilter({ [passedColumns[6].apiParam]: { value, property: [passedColumns[6].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'm_service_interval_label.label'), [passedColumns[6].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }

            }
        },
        {
            name: passedColumns[7].columnName,
            label: I18n.t(passedColumns[7].columnLabel),
            options: {
                customBodyRender: (value) => {
                    return value.name;
                },
                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t(passedColumns[7].columnLabel)]}</Typography>
                                <PickySelect
                                    id='residence_category'
                                    name='residence_category'
                                    options={filterOptions[passedColumns[7].columnName] || []}
                                    value={filterState?.[passedColumns[7].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setScheduleFilter({ [passedColumns[7].apiParam]: { value, property: [passedColumns[7].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'm_residence_category_label.label'), [passedColumns[7].columnName]);
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
                customBodyRender: (value) => {
                    let responseCron = '';
                    if (cronValidator.isValidCronExpression(value)) {
                        responseCron = cronstrue.toString(value);
                    } else {
                        responseCron = I18n.t('invalid_expression');
                    }
                    return responseCron;
                }
            }
        },
        {
            name: passedColumns[9].columnName,
            label: I18n.t(passedColumns[9].columnLabel),
            options: {
                filter: false,
                customBodyRender: (value) => convertToLocal(value)
            }
        },
        {
            name: passedColumns[10].columnName,
            label: I18n.t(passedColumns[10].columnLabel),
            options: {
                filter: false,
                customBodyRender: (value) => convertToLocal(value)
            }
        }
    ];
    const showActionMenu =
        hasAccessPermission(RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE.EDIT_IN_ACTION) ||
        hasAccessPermission(RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE.DELETE_IN_ACTION) ||
        hasAccessPermission(RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE.ADD_CUSTOMER_IN_ACTION) ||
        hasAccessPermission(RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE.REMOVE_CUSTOMER_IN_ACTION) ||
        hasAccessPermission(RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE.SHOW_HISTORY_IN_ACTION);
    if (showActionMenu) {
        let actions = {
            name: 'Actions',
            label: I18n.t('actions'),
            options: {
                ...TABLE_STICKY_ACTIONS,
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    let { rowData } = tableMeta;
                    let menuActions = [];
                    if (hasAccessPermission(RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE.VIEW_IN_ACTION)) {
                        menuActions.push({ name: I18n.t('view'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE.EDIT_IN_ACTION)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE.DELETE_IN_ACTION)) {
                        menuActions.push({ name: I18n.t('delete'), fn: () => deletePressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE.ADD_CUSTOMER_IN_ACTION)) {
                        menuActions.push({ name: I18n.t('add_customer'), fn: () => addCustomerPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE.REMOVE_CUSTOMER_IN_ACTION)) {
                        menuActions.push({ name: I18n.t('remove_customer'), fn: () => removeCustomerPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.SCHEDULE_LIST_SCHEDULE, ACTION_MAPPING.SCHEDULE_LIST_SCHEDULE.SHOW_HISTORY_IN_ACTION)) {
                        menuActions.push({ name: I18n.t('show_history'), fn: () => showHistory(rowData) });
                    }
                    return <DottedMenu options={menuActions} />;
                }
            }
        };
        columns.push(actions);
    }

    const resettingChip = (chipIndex, chipValue, chipList) => {
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setScheduleFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
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
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onFilterChange: onFilterChange,
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_SCHEDULE })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ formatRequest: currentFormValues, pagination: { page: tableState.page } });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ formatRequest: currentFormValues, pagination: { page: 0, size: tableState.rowsPerPage } });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_SCHEDULE }));
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <>
            <LoadingOverlay active={requestInProgress || false}>
                <MUIDataTable
                    title={I18n.t('schedule')}
                    options={options}
                    columns={columns}
                    data={content || []}
                    requestInProgress={requestInProgress}
                />
            </LoadingOverlay>
        </>
    );
};


const mapStateToProps = createStructuredSelector({
    tableProps: getTableProps,
    listSchedule: getAllSchedule

});

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_SCHEDULE, url: URL.SCHEDULE.FETCH_SCHEDULE }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_SCHEDULE }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_SCHEDULE, passedColumns: data })),
    setScheduleFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_SCHEDULE, filterState: data }));
    },
    loadSchedule: (data) => dispatch(Actions.fetchSchedules(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_SCHEDULE }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_SCHEDULE, pagination: data.pagination }));
        dispatch(Actions.fetchSchedules(data.formatRequest));
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_SCHEDULE, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_SCHEDULE, pagination: data }))
});


export default connect(mapStateToProps, mapDispatchToProps)(ListSchedules);
