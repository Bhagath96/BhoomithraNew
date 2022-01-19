import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { history } from '../../../common';
import swlt from 'sweetalert2';
import utils from '../../../utils';
import { listComplaintEscalation, deleteComplaintEscalation, resetComplaintEscalationForm } from '../actions';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS } from '../constants';
import { Components, I18n, Icons } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { getTableProps } from '../../../modules/common/selectors';
import { getComplaintEscalationList } from '../selectors';
import { URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { PATH } from '../../../routes';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../../modules/common/actions';
import { useParams } from 'react-router-dom';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const { MUIDataTable, DottedMenu, PickySelect, Typography } = Components;
const { lodashUtils: _ } = utils;
const { AddIcon } = Icons;


function ListComplaintEscalationList(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { listComplaintEscalationList: { requestInProgress = false, data: { content = [] } = {}, searchKeys } } = props;
    const { getDropdownFilterList, setStateFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadCEM } = props;
    const { tableProps: { [TABLE_IDS.COMPLAINT_EM]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);

    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadCEM(id);
    };

    //triggered when add button is pressed
    const handleClick = () => {
        dispatch(resetComplaintEscalationForm());
        history.push(`${PATH.ORGANIZATION}/${id}/ComplaintEscalationMatrix/create`);
    };


    //function for edit
    const editPressed = (rowData) => {
        let complaintEscalationId = rowData[0];
        history.push(`${PATH.ORGANIZATION}/${id}/ComplaintEscalationMatrix/${complaintEscalationId}`);
    };
    //function for delete
    const deletePressed = (rowData) => {
        let cemId = rowData[0];
        swlt.fire({
            title: I18n.t('are_you_sure_to_delete'),
            text: I18n.t('removing_warning'),
            showCancelButton: true,
            confirmButtonText: I18n.t('yes'),
            cancelButtonText: I18n.t('no')
        }).then((result) => {
            if (result.value) {
                dispatch(deleteComplaintEscalation(cemId, id));
            }
        });
    };
    // Complaint, Service, Role, Min Mins, Max Mins, Template Type, Template
    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'complaints', columnName: 'mxConfig.name', apiParam: 'complaintLabels', filterBy: 'name' },
        { columnLabel: 'service', columnName: 'service.name', apiParam: 'serviceNames', filterBy: 'name' },
        { columnLabel: 'role_name', columnName: 'role.name', apiParam: 'roles', filterBy: 'name' },
        { columnLabel: 'min_mins', columnName: 'minMinutes', apiParam: 'minMinutes', filterBy: 'name' },
        { columnLabel: 'max_mins', columnName: 'maxMinutes', apiParam: 'maxMinute', filterBy: 'name' },
        { columnLabel: 'templates', columnName: 'template.name', apiParam: 'templates', filterBy: 'name' },
        { columnLabel: 'template_type', columnName: 'templateType.name', apiParam: 'templateTypes', filterBy: 'name' }
    ];

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.COMPLAINT_EM }));
        setChips({});
        loadCEM(id);
    }, []);

    const columns = [
        {
            name: passedColumns[0].columnName,
            label: I18n.t([passedColumns[0].columnLabel]),
            options: {
                display: 'excluded',
                filter: false
            }
        },
        {
            name: passedColumns[1].columnName,
            label: I18n.t([passedColumns[1].columnLabel]),
            options: {

                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[1].columnLabel])}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[1].columnName] || []}
                                    value={filterState?.[passedColumns[1].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'organization_escalation.complaintLabel'), [passedColumns[1].columnName], id);
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
            label: I18n.t([passedColumns[2].columnLabel]),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[2].columnLabel])}</Typography>
                                <PickySelect
                                    id='code'
                                    name='code'
                                    options={filterOptions[passedColumns[2].columnName] || []}
                                    value={filterState?.[passedColumns[2].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'organization_escalation.serviceName'), [passedColumns[2].columnName], id);
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
            label: I18n.t([passedColumns[3].columnLabel]),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[3].columnLabel])}</Typography>
                                <PickySelect
                                    id='code'
                                    name='code'
                                    options={filterOptions[passedColumns[3].columnName] || []}
                                    value={filterState?.[passedColumns[3].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[3].apiParam]: { value, property: [passedColumns[3].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'organization_escalation.roleName'), [passedColumns[3].columnName], id);
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
            label: I18n.t([passedColumns[4].columnLabel]),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[4].columnLabel])}</Typography>
                                <PickySelect
                                    id='code'
                                    name='code'
                                    options={filterOptions[passedColumns[4].columnName] || []}
                                    value={filterState?.[passedColumns[4].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[4].apiParam]: { value, property: [passedColumns[4].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'organization_escalation.minMins'), [passedColumns[4].columnName], id);
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
            label: I18n.t([passedColumns[5].columnLabel]),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[5].columnLabel])}</Typography>
                                <PickySelect
                                    id='code'
                                    name='code'
                                    options={filterOptions[passedColumns[5].columnName] || []}
                                    value={filterState?.[passedColumns[5].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[5].apiParam]: { value, property: [passedColumns[5].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'organization_escalation.maxMins'), [passedColumns[5].columnName], id);
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
            label: I18n.t([passedColumns[6].columnLabel]),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[6].columnLabel])}</Typography>
                                <PickySelect
                                    id='code'
                                    name='code'
                                    options={filterOptions[passedColumns[6].columnName] || []}
                                    value={filterState?.[passedColumns[6].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[6].apiParam]: { value, property: [passedColumns[6].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'organization_escalation.templateName'), [passedColumns[6].columnName], id);
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
            label: I18n.t([passedColumns[7].columnLabel]),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[7].columnLabel])}</Typography>
                                <PickySelect
                                    id='code'
                                    name='code'
                                    options={filterOptions[passedColumns[7].columnName] || []}
                                    value={filterState?.[passedColumns[7].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[7].apiParam]: { value, property: [passedColumns[7].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'organization_escalation.templateTypeName'), [passedColumns[7].columnName], id);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        }

    ];
    const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_COMPLAINT_ESCALATION_MATRIX, ACTION_MAPPING.ORGANIZATION_COMPLAINT_ESCALATION_MATRIX.ADD);
    const viewPermission = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_COMPLAINT_ESCALATION_MATRIX_DETAILS, ACTION_MAPPING.ORGANIZATION_COMPLAINT_ESCALATION_MATRIX_DETAILS.ACCESS_IN_TAB);
    const editPermission = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_COMPLAINT_ESCALATION_MATRIX, ACTION_MAPPING.ORGANIZATION_COMPLAINT_ESCALATION_MATRIX.EDIT_IN_ACTION);
    const deletePermission = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_COMPLAINT_ESCALATION_MATRIX, ACTION_MAPPING.ORGANIZATION_COMPLAINT_ESCALATION_MATRIX.DELETE_IN_ACTION);

    const showActionMenu = viewPermission || editPermission || deletePermission || false;

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
                    if (viewPermission) {
                        menuActions.push({ name: I18n.t('view'), fn: () => editPressed(rowData) });
                    }
                    if (editPermission) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                    }
                    if (deletePermission) {
                        menuActions.push({ name: I18n.t('delete'), fn: () => deletePressed(rowData) });
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
        setStateFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
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
    const readOnlyPermission = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_COMPLAINT_ESCALATION_MATRIX, ACTION_MAPPING.ORGANIZATION_COMPLAINT_ESCALATION_MATRIX.READ_ONLY);

    const options = {
        ...MUI_COMMON_OPTIONS,
        page,
        rowsPerPage: size,
        count,
        customActions: showAddIcon && !readOnlyPermission && [
            { handleClick: handleClick, icon: < AddIcon />, toolTip: I18n.t('add') }
        ],
        onFilterChange: onFilterChange,
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.COMPLAINT_EM })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page }, id);
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage }, id);
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.COMPLAINT_EM }));
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div>
            <MUIDataTable
                title={I18n.t('complaint_escalation_matrix')}
                data={content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    listComplaintEscalationList: getComplaintEscalationList,
    tableProps: getTableProps
});
const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName, id) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.COMPLAINT_EM, url: URL.ORGANIZATION.COMPLAINT_ESCALATION_MATRIX.replace(':organizationId', id) }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.COMPLAINT_EM }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.COMPLAINT_EM, passedColumns: data })),
    setStateFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.COMPLAINT_EM, filterState: data }));
    },
    loadCEM: (data) => dispatch(listComplaintEscalation(data)),
    setPageProps: (data, id) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.COMPLAINT_EM }));
        dispatch(setTablePagination({ key: TABLE_IDS.COMPLAINT_EM, pagination: data }));
        dispatch(listComplaintEscalation(id));
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.COMPLAINT_EM, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.COMPLAINT_EM, pagination: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListComplaintEscalationList);

