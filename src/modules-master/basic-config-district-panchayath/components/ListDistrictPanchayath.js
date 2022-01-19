import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { history } from '../../../common';
import swlt from 'sweetalert2';
import utils from '../../../utils';
import { fetchDistrictPanchayathDetails, deleteDistrictPanchayathData, clearReducer } from '../actions';
import { Components, I18n, Icons } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import * as Routes from '../../../routes';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS } from '../constant';
import { getTableProps } from '../../../modules/common/selectors';
import { getDistrictPanchayaths } from '../selectors';
import { URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../../modules/common/actions';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';
const { MUIDataTable, DottedMenu, PickySelect, Typography } = Components;
const { lodashUtils: _ } = utils;
const { AddIcon } = Icons;

function ListDistrictPanchayath(props) {

    const dispatch = useDispatch();
    const { listDistrictPanchayathDetails: { requestInProgress = false, data: { content = [] } = {}, searchKeys } } = props;
    const { getDropdownFilterList, setDistrictPFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadDistrictPanchayath } = props;
    const { tableProps: { [TABLE_IDS.LIST_DISTRICT_PANCHAYATH]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);

    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadDistrictPanchayath();
    };

    //triggered when add button is pressed
    const handleClick = () => {
        dispatch(clearReducer());
        history.push(`${Routes.PATH.BASIC_CONFIG_DISTRICT_PANCHAYATH}/create`);
    };


    //function for edit
    const editPressed = (rowData) => {
        let id = rowData[0];
        history.push(`${Routes.PATH.BASIC_CONFIG_DISTRICT_PANCHAYATH}/${id}`);
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
                dispatch(deleteDistrictPanchayathData(id || 0, size, page));
            }
        });
    };


    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'name', columnName: 'name', apiParam: 'names', filterBy: 'name' },
        { columnLabel: 'code', columnName: 'code', apiParam: 'codes', filterBy: 'name' },
        { columnLabel: 'district', columnName: 'district', apiParam: 'districtNames', filterBy: 'name' }
    ];

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_DISTRICT_PANCHAYATH }));
        setChips({});
        loadDistrictPanchayath();
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
                                        setDistrictPFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'districtPanchayath.label'), [passedColumns[1].columnName]);
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
            label: I18n.t([passedColumns[2].columnLabel]),
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
                                    options={filterOptions[passedColumns[2].columnName] || []}
                                    value={filterState?.[passedColumns[2].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setDistrictPFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'districtPanchayath.code'), [passedColumns[2].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: 'district.name',
            label: I18n.t([passedColumns[3].columnLabel]),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t('district')]}</Typography>
                                <PickySelect
                                    id='district'
                                    name='district'
                                    options={filterOptions[passedColumns[3].columnName] || []}
                                    value={filterState?.[passedColumns[3].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setDistrictPFilter({ [passedColumns[3].apiParam]: { value, property: [passedColumns[3].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'districtPanchayath.districtLabel'), [passedColumns[3].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        }
    ];
    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.DISTRICT_PANCHAYATH, ACTION_MAPPING.DISTRICT_PANCHAYATH.EDIT_DISTRICT_PANCHAYATH) || hasAccessPermission(RESOURCE_MAPPING.DISTRICT_PANCHAYATH, ACTION_MAPPING.DISTRICT_PANCHAYATH.DELETE_DISTRICT_PANCHAYATH) || false;
    const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.DISTRICT_PANCHAYATH, ACTION_MAPPING.DISTRICT_PANCHAYATH.ADD_DISTRICT_PANCHAYATH);
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
                    if (hasAccessPermission(RESOURCE_MAPPING.DISTRICT_PANCHAYATH, ACTION_MAPPING.DISTRICT_PANCHAYATH.EDIT_DISTRICT_PANCHAYATH)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.DISTRICT_PANCHAYATH, ACTION_MAPPING.DISTRICT_PANCHAYATH.DELETE_DISTRICT_PANCHAYATH)) {
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
        setDistrictPFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
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
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onFilterChange: onFilterChange,
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_DISTRICT_PANCHAYATH })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_DISTRICT_PANCHAYATH }));
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div>
            <MUIDataTable
                title={I18n.t('district_panchayath')}
                data={content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    listDistrictPanchayathDetails: getDistrictPanchayaths,
    tableProps: getTableProps
});
const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_DISTRICT_PANCHAYATH, url: URL.BASIC_CONFIG.LIST_DISTRICT_PANCHAYATH }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_DISTRICT_PANCHAYATH }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_DISTRICT_PANCHAYATH, passedColumns: data })),
    setDistrictPFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_DISTRICT_PANCHAYATH, filterState: data }));
    },
    loadDistrictPanchayath: (data) => dispatch(fetchDistrictPanchayathDetails(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_DISTRICT_PANCHAYATH }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_DISTRICT_PANCHAYATH, pagination: data }));
        dispatch(fetchDistrictPanchayathDetails());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_DISTRICT_PANCHAYATH, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_DISTRICT_PANCHAYATH, pagination: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListDistrictPanchayath);

