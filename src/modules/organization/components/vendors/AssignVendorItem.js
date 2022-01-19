import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { history } from '../../../../common';
import swlt from 'sweetalert2';
import utils from '../../../../utils';
import { fetchVendorDetails, deleteVendorData, clearVendorReducer } from '../../actions';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS } from '../../constants';
import { Components, I18n, Icons } from '../../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, TABLE_STICKY_ACTIONS } from '../../../../common/constants';
import { hasAccessPermission } from '../../../../utils/PermissionUtils';
import { getTableProps } from '../../../../modules/common/selectors';
import { getVendors } from '../../selectors';
import { onFilterChangeFn } from '../../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../../../modules/common/actions';
import { URL } from '../../../../common';
import { PATH } from '../../../../routes';
import { useParams } from 'react-router-dom';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../../common/Permissions';

const { MUIDataTable, DottedMenu, PickySelect, Typography } = Components;
const { lodashUtils: _ } = utils;
const { AddIcon } = Icons;


function ListVendors(props) {
    const { id: orgId } = useParams();
    const dispatch = useDispatch();
    const { listVendors: { requestInProgress = false, data: { content = [] } = {}, searchKeys } } = props;
    const { getDropdownFilterList, setVendorFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadVendors } = props;
    const { tableProps: { [TABLE_IDS.LIST_VENDOR]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);
    const { id: organizationId } = useParams();
    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadVendors({ organizationId });
    };

    //triggered when add button is pressed
    const handleClick = () => {
        dispatch(clearVendorReducer());
        history.push(`${PATH.ORGANIZATION}/${organizationId}/assignVendorItem/create`);
    };


    //function for edit
    const editPressed = (rowData) => {
        let id = rowData[0];
        history.push(`/admin/index/organization/${orgId}/assignVendorItem/${id}`);
    };
    //function for delete
    const deletePressed = (rowData) => {
        let id = rowData[0];
        swlt.fire({
            title: I18n.t('are_you_sure_to_delete'),
            text: I18n.t('removing_warning'),
            showCancelButton: true,
            confirmButtonText: I18n.t('yes'),
            cancelButtonText: I18n.t('no')
        }).then((result) => {
            if (result.value) {
                dispatch(deleteVendorData({ orgId, id }));
            }
        });
    };

    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'item', columnName: 'item.name', apiParam: 'items', filterBy: 'id' },
        { columnLabel: 'item_type', columnName: 'itemType.name', apiParam: 'itemTypes', filterBy: 'id' },
        { columnLabel: 'organization', columnName: 'organization.name', apiParam: 'organizations', filterBy: 'id' },
        { columnLabel: 'rate_per_gram', columnName: 'ratePerGram', apiParam: 'ratePerGrams', filterBy: 'id' }

    ];

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_VENDOR }));
        setChips({});
        loadVendors({ organizationId });
    }, []);

    const columns = [
        {
            name: 'id',
            label: I18n.t([passedColumns[0].columnLabel]),
            options: {
                display: 'excluded',
                filter: false
            }
        },
        {
            name: 'item.name',
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
                                        setVendorFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'organization_vendor_item_name.itemLabel'), [passedColumns[1].columnName], organizationId);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }

        },
        {
            name: 'itemType.name',
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
                                        setVendorFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'organization_vendor_item_type.itemTypeLabel'), [passedColumns[2].columnName], organizationId);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: 'organization.name',
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
                                        setVendorFilter({ [passedColumns[3].apiParam]: { value, property: [passedColumns[3].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'organization_vendor_organization_name.organizationName'), [passedColumns[3].columnName], organizationId);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: 'ratePerGram',
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
                                        setVendorFilter({ [passedColumns[4].apiParam]: { value, property: [passedColumns[4].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'organization_vendor_item.price'), [passedColumns[4].columnName], organizationId);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        }
    ];
    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_ASSIGN_VENDOR_ITEM, ACTION_MAPPING.ORGANIZATION_ASSIGN_VENDOR_ITEM.EDIT_IN_ACTION) || hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_ASSIGN_VENDOR_ITEM, ACTION_MAPPING.ORGANIZATION_ASSIGN_VENDOR_ITEM.DELETE_IN_ACTION) || false;
    const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_ASSIGN_VENDOR_ITEM, ACTION_MAPPING.ORGANIZATION_ASSIGN_VENDOR_ITEM.ADD);
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
                    if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_ASSIGN_VENDOR_ITEM, ACTION_MAPPING.ORGANIZATION_ASSIGN_VENDOR_ITEM.EDIT_IN_ACTION)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.ORGANIZATION_ASSIGN_VENDOR_ITEM, ACTION_MAPPING.ORGANIZATION_ASSIGN_VENDOR_ITEM.DELETE_IN_ACTION)) {
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
        setVendorFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
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
        page,
        rowsPerPage: size,
        count,
        customActions: showAddIcon && [
            { handleClick: handleClick, icon: < AddIcon />, toolTip: I18n.t('add') }
        ],
        onFilterChange: onFilterChange,
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_VENDOR })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ organizationId, pagination: { page: tableState.page } });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ organizationId, pagination: { page: 0, size: tableState.rowsPerPage } });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_VENDOR }));
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div>
            <MUIDataTable
                title={I18n.t('assign_item')}
                data={content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    listVendors: getVendors,
    tableProps: getTableProps
});
const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName, organizationId) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_VENDOR, url: URL.ORGANIZATION.ASSIGN_VENDORS_LIST.replace(':organizationId', organizationId) }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_VENDOR }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_VENDOR, passedColumns: data })),
    setVendorFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_VENDOR, filterState: data }));
    },
    loadVendors: (data) => dispatch(fetchVendorDetails(data)),
    setPageProps: ({ organizationId, pagination }) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_VENDOR }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_VENDOR, pagination: pagination }));
        dispatch(fetchVendorDetails({ organizationId }));
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_VENDOR, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_VENDOR, pagination: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListVendors);

