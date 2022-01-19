import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchAllWards, deleteWardData, clearSelectedWard } from '../actions';
import { Components, I18n, Icons } from '../../../common/components';
import utils from '../../../utils';
import Swal from 'sweetalert2';
import { DEFAULT_TABLE_PROPS, MUI_COMMON_OPTIONS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { PATH } from '../../../routes';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS } from '../constants';
import { getTableProps } from '../../../modules/common/selectors';
import { getWards } from '../selectors';
import { URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../../modules/common/actions';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const { MUIDataTable, DottedMenu, PickySelect, Typography } = Components;
const { AddIcon } = Icons;
const { lodashUtils: _ } = utils;


const ListWards = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();

    const { listAllWards: { requestInProgress = false, data: { content = [] } = {}, searchKeys } } = props;
    const { getDropdownFilterList, setWardFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadWards } = props;
    const { tableProps: { [TABLE_IDS.LIST_WARD]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);
    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'name', columnName: 'name', apiParam: 'names', filterBy: 'name' },
        { columnLabel: 'lsgi', columnName: 'lsgi.name', apiParam: 'lsgiNames', filterBy: 'name' },
        { columnLabel: 'code', columnName: 'code', apiParam: 'codes', filterBy: 'name' },
        { columnLabel: 'ward_number', columnName: 'wardNumber', apiParam: 'wardNumbers', filterBy: 'name' }
    ];

    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadWards();
    };
    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_WARD }));
        setChips({});
        loadWards();
    }, []);


    const editPressed = (rowData) => {
        let id = rowData[0];
        history.push(`${PATH.BASIC_CONFIG_WARD}/${id}/details`);
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
                dispatch(deleteWardData(id));
            }
        });
    };
    const handleClick = () => {
        dispatch(clearSelectedWard());
        history.push(`${PATH.BASIC_CONFIG_WARD}/create`);
    };

    const columns = [
        {
            name: 'id',
            label: I18n.t('id'),
            options: {
                display: 'excluded',
                filter: false
            }
        },
        {
            name: 'name',
            label: I18n.t('name'),
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
                                        setWardFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'ward.label'), [passedColumns[1].columnName]);

                                    }}
                                />
                            </>
                        );

                    }
                }
            }

        },
        {
            name: 'lsgi.name',
            label: I18n.t('lsgi'),
            options: {

                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t('lsgi')]}</Typography>
                                <PickySelect
                                    id='lsgi'
                                    name='lsgi'
                                    options={filterOptions[passedColumns[2].columnName] || []}
                                    value={filterState?.[passedColumns[2].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setWardFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'ward.lsgiLabel'), [passedColumns[2].columnName]);

                                    }}
                                />
                            </>
                        );

                    }
                }
            }

        },
        {
            name: 'code',
            label: I18n.t('code'),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t('code')]}</Typography>
                                <PickySelect
                                    id='code'
                                    name='code'
                                    options={filterOptions[passedColumns[3].columnName] || []}
                                    value={filterState?.[passedColumns[3].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setWardFilter({ [passedColumns[3].apiParam]: { value, property: [passedColumns[3].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'ward.code'), [passedColumns[3].columnName]);

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
                                <Typography variant='h7'>{[I18n.t([passedColumns[4].columnLabel])]}</Typography>
                                <PickySelect
                                    id='code'
                                    name='code'
                                    options={filterOptions[passedColumns[4].columnName] || []}
                                    value={filterState?.[passedColumns[4].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setWardFilter({ [passedColumns[4].apiParam]: { value, property: [passedColumns[4].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'ward.wardNumber'), [passedColumns[4].columnName]);

                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        }
    ];
    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.WARD, ACTION_MAPPING.WARD.EDIT_WARD) || hasAccessPermission(RESOURCE_MAPPING.WARD, ACTION_MAPPING.WARD.DELETE_WARD);
    const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.WARD, ACTION_MAPPING.WARD.ADD_WARD);
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
                    if (hasAccessPermission(RESOURCE_MAPPING.WARD, ACTION_MAPPING.WARD.EDIT_WARD)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.WARD, ACTION_MAPPING.WARD.DELETE_WARD)) {
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
        setWardFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let { filterObj, chipExists } = onFilterChangeFn(chipList, passedColumns);

        //if no chip in table
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_WARD }));
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
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onFilterChange: onFilterChange,
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_WARD })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_WARD }));
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <MUIDataTable
            title={I18n.t('ward')}
            data={content}
            columns={columns}
            options={options}
            requestInProgress={requestInProgress}
        />
    );
};
const mapStateToProps = createStructuredSelector({
    listAllWards: getWards,
    tableProps: getTableProps
});

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_WARD, url: URL.WARD.LIST_WARDS }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_WARD }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_WARD, passedColumns: data })),
    setWardFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_WARD, filterState: data }));
    },
    loadWards: (data) => dispatch(fetchAllWards(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_WARD }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_WARD, pagination: data }));
        dispatch(fetchAllWards());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_WARD, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_WARD, pagination: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListWards);
