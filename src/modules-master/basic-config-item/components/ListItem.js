import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { history } from '../../../common';
import swlt from 'sweetalert2';
import utils from '../../../utils';
import { fetchItemDetails, deleteItemData, clearItemReducer } from '../actions';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS } from '../constant';
import { Components, I18n, Icons } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { getTableProps } from '../../../modules/common/selectors';
import { getItems } from '../selectors';
import { URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../../modules/common/actions';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const { MUIDataTable, DottedMenu, PickySelect, Typography, Switch } = Components;
const { lodashUtils: _ } = utils;
const { AddIcon } = Icons;


function ListItem(props) {

    const dispatch = useDispatch();
    const { listItems: { requestInProgress = false, data: { content = [] } = {}, searchKeys } } = props;
    const { getDropdownFilterList, setItemFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadItems } = props;
    const { tableProps: { [TABLE_IDS.LIST_ITEM]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);


    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadItems();
    };

    //triggered when add button is pressed
    const handleClick = () => {
        dispatch(clearItemReducer());
        history.push('/admin/index/item/create');
    };


    //function for edit
    const editPressed = (rowData) => {
        let id = rowData[0];
        history.push(`/admin/index/item/${id}`);
    };

    //function for item subCategory
    const subCategoryPressed = (rowData) => {
        let id = rowData[0];
        history.push(`/admin/index/item/${id}/sub-category`);
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
                dispatch(deleteItemData(id || 0, size, page));
            }
        });
    };

    const negaiveRateValues = [{ id: 'true', name: 'true' }, { id: 'false', name: 'false' }];


    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'name', columnName: 'name', apiParam: 'names', filterBy: 'name' },
        { columnLabel: 'negative_rate', columnName: 'negativeRate', apiParam: 'negativeRates', filterBy: 'id' }

    ];

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_ITEM }));
        setChips({});
        loadItems();
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
            name: 'name',
            label: I18n.t([passedColumns[1].columnLabel]),
            options: {

                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t('name')]}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[1].columnName] || []}
                                    value={filterState?.[passedColumns[1].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setItemFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'm_item.label'), [passedColumns[1].columnName]);
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
                                    options={negaiveRateValues || []}
                                    value={filterState?.[passedColumns[2].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setItemFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'customer_service_optin_optout_request.opt_in'), [passedColumns[2].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                },
                customBodyRender: (value) => {
                    return <Switch checked={value || false} tooltip={value || false} />;
                }
            }
        }
    ];
    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.ITEM, ACTION_MAPPING.ITEM.EDIT_ITEM_CONFIG) || hasAccessPermission(RESOURCE_MAPPING.ITEM, ACTION_MAPPING.ITEM.ASSIGN_SUBCATEGORY_ITEM_CONFIG) || false;
    const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.ITEM, ACTION_MAPPING.ITEM.ADD_ITEM_ITEM_CONFIG);
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
                    if (hasAccessPermission(RESOURCE_MAPPING.ITEM, ACTION_MAPPING.ITEM.EDIT_ITEM_CONFIG)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.ITEM, ACTION_MAPPING.ITEM.ASSIGN_SUBCATEGORY_ITEM_CONFIG)) {
                        menuActions.push({ name: I18n.t('add_item_subcategory'), fn: () => subCategoryPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.ITEM, ACTION_MAPPING.ITEM.DELETE_ITEM_CONFIG)) {
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
        setItemFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
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
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_ITEM })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_ITEM }));
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div>
            <MUIDataTable
                title={I18n.t('item')}
                data={content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    listItems: getItems,
    tableProps: getTableProps
});
const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_ITEM, url: URL.BASIC_CONFIG.LIST_ITEM }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_ITEM }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_ITEM, passedColumns: data })),
    setItemFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_ITEM, filterState: data }));
    },
    loadItems: (data) => dispatch(fetchItemDetails(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_ITEM }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_ITEM, pagination: data }));
        dispatch(fetchItemDetails());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_ITEM, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_ITEM, pagination: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);

