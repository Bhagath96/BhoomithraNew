import React, { useEffect, useState } from 'react';
import { useDispatch, connect, useSelector } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { STATE_REDUCER_KEY } from '../constants';
import { STATE_REDUCER_KEY as DATA_ACCESS_PERMISSION_STATE_REDUCER_KEY } from '../../data-access-permission/constants';
import { renderSelect } from '../../../utils/FormUtils';
import { Components, I18n, makeStyles } from '../../../common/components';
import { TABLE_IDS } from '../constants';
import * as Actions from '../actions';
import { submitDataAccessAssignee } from '../../roles/actions';
import { DEFAULT_TABLE_PROPS, MUI_COMMON_OPTIONS, RESPONSE_TYPE } from '../../../common/constants';
import { DATA_ACCESS_CAPTURE_VIEW } from '../../common/constants';
import { getTableProps } from '../../common/selectors';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setAdditionalTableFilters, setSelectedIds, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../common/actions';
import { URL } from '../../../common';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { DataAccessPermission } from '../../data-access-permission/components';
import { addDataAccessPermissionItem, fetchRoleAssigneeDataAccessPermissions, removeDataAccessPermissionItem } from '../../data-access-permission/actions';
import { Stack } from '@mui/material';
import swlt from 'sweetalert2';

const { Grid, Button, MUIDataTable, PickySelect, Typography } = Components;

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

const passedColumns = [
    { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
    { columnLabel: 'name', columnName: 'name', apiParam: 'userNames', filterBy: 'id' }
];

const EMPTY_SELECTION = { ids: [], details: [] };

const AssignOrgRoleTableView = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [member, setMember] = useState(false);
    const [unassignedUsersOnly, setUnassignedUsersOnly] = useState(false);
    const [rowsSelected, setRowsSelected] = useState([]);
    const [selectedValue, setSelectedValue] = React.useState(null);
    const [labelError, setLabelError] = React.useState(null);
    const [tableView, setTableView] = useState(true);

    const {
        getDropdownFilterList, resetTableFilterList, setAssignUsersFilter, setPassedColumnsForTable,
        conditionalReload, setPagination, setChips, setPageProps,
        loadAssignRoleToUser, setSelectedUsers,
        tableProps: {
            [TABLE_IDS.ASSIGN_ROLE]: {
                selectedIds = []
            } = {} }
    } = props;
    const { tableProps: { [TABLE_IDS.ASSIGN_ROLE]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);
    const { assignRole: { data: assignRoleData = [], requestInProgress = false, searchKeys = [] } = {}, organizationRoleTypes = {} } = useSelector(state => _.get(state, STATE_REDUCER_KEY, {}));

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
        resetTableFilterList({ organizationId: id });
        dispatch(resetFilter({ key: TABLE_IDS.ASSIGN_ROLE }));
        setChips({});
        setSelectedUsers(EMPTY_SELECTION);
        dispatch(Actions.loadOrganizationRoleTypes(RESPONSE_TYPE.DROP_DOWN));
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
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.ASSIGN_ROLE }));
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
    const readOnlyPermission = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_ASSIGN_ROLE, ACTION_MAPPING.ORGANIZATION_ASSIGN_ROLE.READ_ONLY);

    let options = {
        ...MUI_COMMON_OPTIONS,
        page,
        rowsPerPage: size,
        count,
        selectableRows: readOnlyPermission ? 'none' : 'multiple',
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
                    dispatch(resetFilter({ key: TABLE_IDS.ASSIGN_ROLE }));
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
                                        getDropdownFilterList(val, _.get(searchKeys, 'user.name', ''), [passedColumns[1].columnName], id, selectedValue);
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
            member: member
        };
        dispatch(Actions.submitAssignRole({ assignRoleObj, organizationId: id, roleId: selectedValue }));
        conditionalReload({ roleId: selectedValue, unassignedUsersOnly, member, organizationId: id });
        setRowsSelected([]);
    };

    const editDataAccess = () => {
        if (rowsSelected.length > 0) {
            if (!member) {
                assignUsers();
            }
            dispatch(fetchRoleAssigneeDataAccessPermissions({ roleId: selectedValue, tableId: TABLE_IDS.ASSIGN_ROLE, viewId: DATA_ACCESS_CAPTURE_VIEW.ORGANIZATION_ASSIGN_ROLES }));
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
        dispatch(submitDataAccessAssignee({ roleId: selectedValue }));
        setTableView(true);
    };

    const onUnassignedUsersOnlyClick = event => {
        if (selectedValue !== null) {
            setLabelError('');
            setSelectedUsers(EMPTY_SELECTION);
            let flag = event.target.checked || false;
            setUnassignedUsersOnly(flag);
            conditionalReload({ roleId: selectedValue, unassignedUsersOnly: flag, member, organizationId: id });
        } else {
            setLabelError(I18n.t('please_select_role'));
        }
    };

    const onMemberClick = event => {
        if (selectedValue !== null) {
            setLabelError('');
            setUnassignedUsersOnly(false);
            setSelectedUsers(EMPTY_SELECTION);
            let flag = event.target.checked || false;
            setMember(flag);
            props.change('unassignedUsersOnly', false);
            conditionalReload({ roleId: selectedValue, unassignedUsersOnly, member: flag, organizationId: id });
        } else {
            setLabelError(I18n.t('please_select_role'));
        }
    };

    const onAssigneeRemoveClick = ({ id: userId, componentId, itemId }) => {
        dispatch(removeDataAccessPermissionItem({ userId, componentId, itemId }));
    };

    const onAssigneeAddItemClick = ({ accordionId: userId, componentId, multiData, noOfData, response }) => {
        dispatch(addDataAccessPermissionItem({ userId, componentId, multiData, noOfData, response }));
    };

    const rolesInCurrentOrgPermission = (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_ASSIGN_ROLE, ACTION_MAPPING.ORGANIZATION_ASSIGN_ROLE.USERS_BELONG_TO_CURRENT_ROLE) || false);
    const rolesNotIncludedInAnyOrgPermission = (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_ASSIGN_ROLE, ACTION_MAPPING.ORGANIZATION_ASSIGN_ROLE.USERS_DONT_HAVE_ANY_ROLE) || false);

    return (
        <>
            {tableView &&
                <Form>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} className={classes.item}>

                            <Field spinnerProps="selectTagProp" name='Role' label={I18n.t('roles')} component={renderSelect}
                                onChange={(resourceItem) => {
                                    setLabelError('');
                                    setSelectedValue(resourceItem.id);
                                    conditionalReload({ roleId: resourceItem.id, unassignedUsersOnly, member: false, organizationId: id });

                                }}>
                                {
                                    organizationRoleTypes?.dropdown?.map(item => ({ id: item.id, name: item.name }))
                                }
                            </Field>
                        </Grid>
                        {
                            labelError ? <div style={{ color: 'red' }}>{labelError}</div> : <div></div>
                        }
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            {rolesInCurrentOrgPermission && <Grid item xs={12} sm={6} ><Field component="input" name='member' type="checkbox" onClick={onMemberClick} /><span>{I18n.t('user_belongs_to_the_above_selected_role_in_the_current_organization')}</span><br /><br /></Grid>}
                            {!member && rolesNotIncludedInAnyOrgPermission && <Grid item xs={12} sm={6}><Field component="input" name='unassignedUsersOnly' type="checkbox" onClick={onUnassignedUsersOnlyClick} /><span>{I18n.t('user_dont_have_any_role_in_current_organization')}</span><br /><br /></Grid>}
                        </div>
                    </Grid>

                    <MUIDataTable
                        title={I18n.t('assign_user')}
                        options={options}
                        columns={columProps}
                        data={assignRoleData?.content || []}
                        requestInProgress={requestInProgress}
                    />
                    {!readOnlyPermission &&
                        <Stack direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1} >
                            <Button onClick={editDataAccess}>{I18n.t(member ? 'edit_data_access' : 'assign')}</Button>
                            {member && <Button onClick={assignUsers}>{I18n.t('unassign')}</Button>}
                        </Stack>
                    }
                </Form >}
            {
                !tableView && <DataAccessPermission data={dataAccessPermissions} requestInProgress={dataAccessPermissionsRequestInProgress} onRemove={onAssigneeRemoveClick} onAdd={onAssigneeAddItemClick} onCancel={setTableView} onSubmit={submitAssignDataAccess} />
            }
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName, organizationId, selectedValue) => {
        if (searchValue && searchValue?.length > 2) {

            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.ASSIGN_ROLE, url: URL.ORGANIZATION.FETCH_ASSIGN_ROLE.replace(':orgId', organizationId).replace(':roleId', selectedValue) }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.ASSIGN_ROLE }));
        }
    },
    loadAssignRoleToUser: () => dispatch(Actions.fetchAssignRoleInOrg()),
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.ASSIGN_ROLE, passedColumns: data })),
    updateUserOrganizationMapping: (data) => dispatch(Actions.updateUserOrganizationMapping(data)),
    setAssignUsersFilter: (data) => dispatch(setTableFilterState({ key: TABLE_IDS.ASSIGN_ROLE, filterState: data })),
    resetTableFilterList: ({ organizationId }) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.ASSIGN_ROLE }));
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.ASSIGN_ROLE, additionalFilters: { unassignedUsersOnly: false, member: false, organizationId } }));
    },
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.ASSIGN_ROLE }));
        dispatch(setTablePagination({ key: TABLE_IDS.ASSIGN_ROLE, pagination: data }));
        dispatch(Actions.fetchAssignRoleInOrg());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.ASSIGN_ROLE, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.ASSIGN_ROLE, pagination: data })),
    conditionalReload: (data) => {
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.ASSIGN_ROLE, additionalFilters: data }));
        dispatch(Actions.fetchAssignRoleInOrg());
    },
    setSelectedUsers: ({ ids = [], details = [] }) => {
        dispatch(setSelectedIds({ key: TABLE_IDS.ASSIGN_ROLE, selectedIds: ids, selectedDetails: details }));
    }
});

const mapStateToProps = createStructuredSelector({
    tableProps: getTableProps
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'AssignRoleOrgTableView'
})(AssignOrgRoleTableView));
