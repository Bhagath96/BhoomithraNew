import React, { useEffect, useState } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { STATE_REDUCER_KEY } from '../constants';
import { Components, I18n } from '../../../common/components';
import { TABLE_IDS } from '../constants';
import * as Actions from '../actions';
import { DEFAULT_TABLE_PROPS, MUI_COMMON_OPTIONS } from '../../../common/constants';
import { getTableProps } from '../../common/selectors';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setAdditionalTableFilters, resetFormChange, setSelectedIds, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../common/actions';
import { URL } from '../../../common';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';
import { DataAccessPermission } from '../../data-access-permission/components';
import { addDataAccessPermissionItem, fetchRoleAssigneeDataAccessPermissions, removeDataAccessPermissionItem } from '../../data-access-permission/actions';
import { STATE_REDUCER_KEY as DATA_ACCESS_PERMISSION_STATE_REDUCER_KEY } from '../../data-access-permission/constants';
import { Stack } from '@mui/material';
import swlt from 'sweetalert2';
import { DATA_ACCESS_CAPTURE_VIEW } from '../../common/constants';

const { Grid, Button, MUIDataTable, PickySelect, Typography } = Components;

const passedColumns = [
    { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
    { columnLabel: 'name', columnName: 'name', apiParam: 'userNames', filterBy: 'id' }
];

const EMPTY_SELECTION = { ids: [], details: [] };

const RoleAssignToUserTableView = (props) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [member, setMember] = useState(false);
    const [unassignedUsersOnly, setUnassignedUsersOnly] = useState(false);
    const [rowsSelected, setRowsSelected] = useState([]);
    const [tableView, setTableView] = useState(true);

    const {
        getDropdownFilterList, resetTableFilterList, setAssignUsersFilter, setPassedColumnsForTable,
        conditionalReload, setPagination, setChips, setPageProps,
        loadAssignRoleToUser, setSelectedUsers,
        tableProps: {
            [TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER]: {
                selectedIds = []
            } = {} }
    } = props;
    const { tableProps: { [TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);
    const {
        assignRoleToUser: { data: assignUserGroupData = [], requestInProgress = false, searchKeys = [] } = {}
    } = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));

    const {
        dataAccessPermissionRoleAssignee: { data: dataAccessPermissions = [], requestInProgress: dataAccessPermissionsRequestInProgress = false } = {}
    } = useSelector(state => _.get(state, DATA_ACCESS_PERMISSION_STATE_REDUCER_KEY, {}));


    const setFilterItems = (data) => {
        setChips(data);
        loadAssignRoleToUser();
    };

    const setSelectedRows = (tableState) => {
        const { selectedRows, displayData } = tableState;
        let indexData = _.map(selectedRows.data, (row) => row.dataIndex);
        setRowsSelected(indexData);
        let selectedCustomers = _.filter(displayData, (row) => indexData.includes(row.dataIndex));
        let ids = _.map(selectedCustomers, (customer) => customer.data[0]);
        setSelectedUsers({ ids, details: selectedCustomers });
    };

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        resetTableFilterList({ roleId: id });
        dispatch(resetFilter({ key: TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER }));
        setChips({});
        setSelectedUsers(EMPTY_SELECTION);
        loadAssignRoleToUser();

    }, []);

    useEffect(() => {
        if (selectedIds.length === 0) {
            setRowsSelected([]);
        }
    }, [selectedIds]);

    const resettingChip = (chipIndex, chipValue, chipList) => {
        setSelectedUsers(EMPTY_SELECTION);
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setAssignUsersFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let newObj = {}, chipExists = false;
        chipList?.map((item, index) => {
            if (item.length > 0) {
                chipExists = true;
                newObj[passedColumns[index].apiParam] = `${item}`;
            }
        });
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER }));
            setFilterItems({});
        } else {
            setFilterItems(newObj);
        }
    };

    const onFilterChange = (chipValue, chipList) => {
        setSelectedUsers(EMPTY_SELECTION);
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
        rowsSelected: rowsSelected,
        onFilterChange: onFilterChange,
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setSelectedUsers(EMPTY_SELECTION);
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setSelectedUsers(EMPTY_SELECTION);
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    setSelectedUsers(EMPTY_SELECTION);
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER }));
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
                                        setAssignUsersFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'user.name', ''), [passedColumns[1].columnName], id);
                                    }}
                                />
                            </>
                        );
                    }
                }
            }
        }
    ];

    const assignUsers = () => {
        let assignRoleObj = {
            idsToAssociate: selectedIds,
            member
        };
        dispatch(Actions.submitAssignRole({ assignRoleObj, roleId: id }));
        setMember(false);
        props.change('member', false);
        conditionalReload({ unassignedUsersOnly, member: false, roleId: id });
        setRowsSelected([]);

    };

    const editDataAccess = () => {
        // @TODO make Single API to save data access Permission & Assign Assignee
        if (!member) {
            assignUsers();
        }
        if (rowsSelected.length > 0) {
            dispatch(fetchRoleAssigneeDataAccessPermissions({ roleId: id, tableId: TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER, viewId: DATA_ACCESS_CAPTURE_VIEW.ROLES_ASSIGNEES }));
            setTableView(false);
        } else {
            swlt.fire({
                title: I18n.t('select_one_user'),
                showCancelButton: false,
                confirmButtonText: I18n.t('ok')
            });
        }
    };

    const submitAssignDataAccess = () => {
        dispatch(Actions.submitDataAccessAssignee({ roleId: id }));
        setTableView(true);
    };

    const onUnassignedUsersOnlyClick = event => {
        setSelectedUsers(EMPTY_SELECTION);
        let flag = event.target.checked || false;
        setUnassignedUsersOnly(flag);
        conditionalReload({ unassignedUsersOnly: flag, member, roleId: id });
    };

    const onMemberClick = event => {
        setUnassignedUsersOnly(false);
        setSelectedUsers(EMPTY_SELECTION);
        let flag = event.target.checked || false;
        setMember(flag);
        props.change('unassignedUsersOnly', false);
        conditionalReload({ unassignedUsersOnly, member: flag, roleId: id });
    };

    const onAssigneeRemoveClick = ({ id: userId, componentId, itemId }) => {
        dispatch(removeDataAccessPermissionItem({ userId, componentId, itemId }));
    };

    const onAssigneeAddItemClick = ({ accordionId: userId, componentId, multiData, noOfData, response }) => {
        dispatch(addDataAccessPermissionItem({ userId, componentId, multiData, noOfData, response }));
    };

    const rolesInCurrentOrgPermission = (hasAccessPermission(RESOURCE_MAPPING.ROLES_REGULAR_ASSIGNEE, ACTION_MAPPING.ROLES_REGULAR_ASSIGNEE.USER_BELONG_TO_CURRENT_ROLE) || hasAccessPermission(RESOURCE_MAPPING.ROLES_ORGANIZATIONAL_ASSIGNEE, ACTION_MAPPING.ROLES_ORGANIZATIONAL_ASSIGNEE.USER_BELONG_TO_CURRENT_ROLE) || false);
    const rolesNotIncludedInAnyOrgPermission = (hasAccessPermission(RESOURCE_MAPPING.ROLES_REGULAR_ASSIGNEE, ACTION_MAPPING.ROLES_REGULAR_ASSIGNEE.USER_DONT_HAVE_ANY_ROLE_ASSOCIATION) || hasAccessPermission(RESOURCE_MAPPING.ROLES_ORGANIZATIONAL_ASSIGNEE, ACTION_MAPPING.ROLES_ORGANIZATIONAL_ASSIGNEE.USER_DONT_HAVE_ANY_ROLE_ASSOCIATION) || true);


    return (
        <>
            {tableView && <Form >
                <Grid container>
                    {rolesInCurrentOrgPermission && <Grid item xs={12} sm={6} ><Field component="input" name='member' type="checkbox" onClick={onMemberClick} /><span>{I18n.t('users_belongs_to_the_current_role')}</span><br /><br /></Grid>}
                    {!member && rolesNotIncludedInAnyOrgPermission && <Grid item xs={12} sm={6}><Field component="input" name='unassignedUsersOnly' type="checkbox" onClick={onUnassignedUsersOnlyClick} /><span>{I18n.t('users_dont_have_any_role_association')}</span><br /><br /></Grid>}
                </Grid>
                <MUIDataTable
                    title={I18n.t('assign_user')}
                    options={options}
                    columns={columProps}
                    data={assignUserGroupData?.content || []}
                    requestInProgress={requestInProgress}
                />
                <Stack direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1} >
                    <Button onClick={editDataAccess}>{I18n.t(member ? 'edit_data_access' : 'assign')}</Button>
                    {member && <Button onClick={assignUsers}>{I18n.t('unassign')}</Button>}
                </Stack>
            </Form>}
            {
                !tableView && <DataAccessPermission data={dataAccessPermissions} requestInProgress={dataAccessPermissionsRequestInProgress} onRemove={onAssigneeRemoveClick} onAdd={onAssigneeAddItemClick} onCancel={setTableView} onSubmit={submitAssignDataAccess} />
            }
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName, roleId) => {
        if (searchValue && searchValue?.length > 2) {

            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER, url: URL.ROLE.FETCH_ASSIGN_ROLE_TO_USER.replace(':roleId', roleId) }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER }));
        }
    },
    loadAssignRoleToUser: () => dispatch(Actions.fetchAssignRoleToUser({ pagination: false })),
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER, passedColumns: data })),
    resetForm: () => dispatch(resetFormChange()),
    setAssignUsersFilter: (data) => dispatch(setTableFilterState({ key: TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER, filterState: data })),
    resetTableFilterList: ({ roleId }) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER }));
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER, additionalFilters: { unassignedUsersOnly: false, member: false, roleId } }));
    },
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER, pagination: data }));
        dispatch(Actions.fetchAssignRoleToUser());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER, pagination: data })),
    conditionalReload: (data) => {
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER, additionalFilters: data }));
        dispatch(Actions.fetchAssignRoleToUser());
    },
    setSelectedUsers: ({ ids = [], details = [] }) => {
        dispatch(setSelectedIds({ key: TABLE_IDS.LIST_ASSIGN_ROLE_TO_USER, selectedIds: ids, selectedDetails: details }));
    }
});

const mapStateToProps = createStructuredSelector({
    tableProps: getTableProps
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'RoleAssignToUserTableView'
})(RoleAssignToUserTableView));
