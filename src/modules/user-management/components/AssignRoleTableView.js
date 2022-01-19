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
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setAdditionalTableFilters, setSelectedIds, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates, setAdditionalDropDownFilters } from '../../common/actions';
import { URL } from '../../../common';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';
import { STATE_REDUCER_KEY as DATA_ACCESS_PERMISSION_STATE_REDUCER_KEY } from '../../data-access-permission/constants';
import { DATA_ACCESS_CAPTURE_VIEW } from '../../common/constants';
import { DataAccessPermission } from '../../data-access-permission/components';
import { addUserDataAccessPermissionItem, fetchUserRoleDataAccessPermissions, removeUserDataAccessPermissionItem } from '../../data-access-permission/actions';
import { Stack } from '@mui/material';
import swlt from 'sweetalert2';

const { Grid, Button, MUIDataTable, PickySelect, Typography } = Components;

const passedColumns = [
    { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
    { columnLabel: 'name', columnName: 'name', apiParam: 'roleNames', filterBy: 'id' }

];

const EMPTY_SELECTION = { ids: [], details: [] };

const AssignRoleUnderUserView = (props) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [member, setMember] = useState(false);
    const [unassignedRolesOnly, setUnassignedUsersOnly] = useState(false);
    const [rowsSelected, setRowsSelected] = useState([]);
    const [tableView, setTableView] = useState(true);

    const {
        getDropdownFilterList, resetTableFilterList, setAssignUsersFilter, setPassedColumnsForTable,
        conditionalReload, setPagination, setChips, setPageProps,
        loadRoleUnderUser, setSelectedUsers,
        tableProps: {
            [TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER]: {
                selectedIds = []
            } = {} }
    } = props;
    const { tableProps: { [TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);
    const { assignRoleForUser: { data: assignRoleUserData = [], requestInProgress = false, searchKeys = [] } = {} } = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));
    const {
        dataAccessPermissionUserRole: { data: dataAccessPermissions = [], requestInProgress: dataAccessPermissionsRequestInProgress = false } = {}
    } = useSelector(state => _.get(state, DATA_ACCESS_PERMISSION_STATE_REDUCER_KEY, {}));


    const setFilterItems = (data) => {
        setChips(data);
        loadRoleUnderUser();
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
        resetTableFilterList({ userId: id });
        dispatch(resetFilter({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER }));
        setChips({});
        setSelectedUsers(EMPTY_SELECTION);
        loadRoleUnderUser();
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
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER }));
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
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER }));
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
                                        getDropdownFilterList(val, _.get(searchKeys, 'role.name', ''), [passedColumns[1].columnName], id, member);
                                    }}
                                />
                            </>
                        );
                    }
                }
            }
        }
    ];

    const assignRoles = () => {
        let assignRoleObj = {
            idsToAssociate: selectedIds,
            member: member
        };
        dispatch(Actions.submitAssignRoleUnderUser({ assignRoleObj, userId: id }));
        conditionalReload({ unassignedRolesOnly, member, userId: id });
        setRowsSelected([]);
    };

    const editDataAccess = () => {
        if (rowsSelected.length > 0) {
            if (!member) {
                assignRoles();
            }
            dispatch(fetchUserRoleDataAccessPermissions({ userId: id, tableId: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER, viewId: DATA_ACCESS_CAPTURE_VIEW.USER_ASSIGN_ROLES }));
            setTableView(false);
        } else {
            swlt.fire({
                title: I18n.t('select_one_role'),
                showCancelButton: false,
                confirmButtonText: I18n.t('ok')
            });
        }
    };

    const submitAssignDataAccess = () => {
        dispatch(Actions.submitDataAccessUserRoles({ userId: id }));
        setTableView(true);
    };

    const onRemoveItemClick = ({ id: userId, componentId, itemId }) => {
        dispatch(removeUserDataAccessPermissionItem({ userId, componentId, itemId }));
    };

    const onAddItemClick = ({ accordionId: userId, componentId, multiData, noOfData, response }) => {
        dispatch(addUserDataAccessPermissionItem({ userId, componentId, multiData, noOfData, response }));
    };

    const onUnassignedUsersOnlyClick = event => {
        setSelectedUsers(EMPTY_SELECTION);
        let flag = event.target.checked || false;
        setUnassignedUsersOnly(flag);
        dispatch(setAdditionalDropDownFilters({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER, additionalDropdownFilters: { member: member, unassignedRolesOnly: flag } }));
        conditionalReload({ unassignedRolesOnly: flag, member, userId: id });
    };

    const onMemberClick = event => {
        setUnassignedUsersOnly(false);
        setSelectedUsers([]);
        let flag = event.target.checked || false;
        setMember(flag);
        props.change('unassignedRolesOnly', false);
        dispatch(setAdditionalDropDownFilters({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER, additionalDropdownFilters: { member: flag, unassignedRolesOnly: unassignedRolesOnly } }));
        conditionalReload({ unassignedRolesOnly, member: flag, userId: id });
    };
    const rolesInCurrentUserPermission = (hasAccessPermission(RESOURCE_MAPPING.USER_ASSIGN_ROLES, ACTION_MAPPING.USER_ASSIGN_ROLES.ROLES_BELONG_TO_CURRENT_USER) || false);
    const rolesNotIncludedInAnyUserPermission = (hasAccessPermission(RESOURCE_MAPPING.USER_ASSIGN_ROLES, ACTION_MAPPING.USER_ASSIGN_ROLES.ROLES_DONT_HAVE_ANY_USER_ASSOCIATION) || false);

    return (
        <>
            {tableView &&
                <Form>
                    <Grid container>
                        {rolesInCurrentUserPermission && <Grid item xs={12} sm={6} ><Field component="input" name='member' type="checkbox" onClick={onMemberClick} /><span>{I18n.t('roles_belongs_to_the_current_user')}</span><br /><br /></Grid>}
                        {!member && rolesNotIncludedInAnyUserPermission && <Grid item xs={12} sm={6}><Field component="input" name='unassignedRolesOnly' type="checkbox" onClick={onUnassignedUsersOnlyClick} /><span>{I18n.t('roles_dont_have_any_user_associations')}</span><br /><br /></Grid>}
                    </Grid>
                    <MUIDataTable
                        title={I18n.t('assign_roles')}
                        options={options}
                        columns={columProps}
                        data={assignRoleUserData?.content || []}
                        requestInProgress={requestInProgress}
                    />
                    <Stack direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1} >
                        <Button onClick={editDataAccess}>{I18n.t(member ? 'edit_data_access' : 'assign')}</Button>
                        {member && <Button onClick={assignRoles}>{I18n.t('unassign')}</Button>}
                    </Stack>
                </Form >}
            {
                !tableView && <DataAccessPermission data={dataAccessPermissions} requestInProgress={dataAccessPermissionsRequestInProgress} onRemove={onRemoveItemClick} onAdd={onAddItemClick} onCancel={setTableView} onSubmit={submitAssignDataAccess} />
            }
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName, userId, member) => {
        if (searchValue && searchValue?.length > 2) {

            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER, url: URL.USER_MANAGEMENT.FETCH_ASSIGN_ROLES.replace(':userId', userId), member }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER }));
        }
    },
    loadRoleUnderUser: () => dispatch(Actions.fetchAssignRoleForUsers({ pagination: false })),
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER, passedColumns: data })),
    updateUserOrganizationMapping: (data) => dispatch(Actions.updateUserOrganizationMapping(data)),
    setAssignUsersFilter: (data) => dispatch(setTableFilterState({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER, filterState: data })),
    resetTableFilterList: ({ userId }) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER }));
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER, additionalFilters: { unassignedRolesOnly: false, member: false, userId } }));
        dispatch(setAdditionalDropDownFilters({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER, setAdditionalDropDownFilters: { member: false, unassignedRolesOnly: false } }));

    },
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER, pagination: data }));
        dispatch(Actions.fetchAssignRoleForUsers());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER, pagination: data })),
    conditionalReload: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER }));
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER, additionalFilters: data }));
        dispatch(Actions.fetchAssignRoleForUsers());
    },
    setSelectedUsers: ({ ids = [], details = [] }) => {
        dispatch(setSelectedIds({ key: TABLE_IDS.LIST_ASSIGN_ROLE_UNDER_USER, selectedIds: ids, selectedDetails: details }));
    }
});

const mapStateToProps = createStructuredSelector({
    tableProps: getTableProps
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'AssignRoleUnderUserView'
})(AssignRoleUnderUserView));
