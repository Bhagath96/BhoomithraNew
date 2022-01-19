import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import utils from '../../../utils';
import { fetchStockInDetails } from '../actions';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS } from '../constant';
import { Components, I18n } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { getTableProps } from '../../../modules/common/selectors';
import { getStockes } from '../selectors';
import { history, URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../../modules/common/actions';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { PATH } from '../../../routes';
import DottedMenu from '../../../common/components/custom/DottedMenu';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const { MUIDataTable, PickySelect, Typography } = Components;
const { lodashUtils: _ } = utils;


function ListStockIn(props) {

    const dispatch = useDispatch();
    const { listStockes: { requestInProgress = false, data: { content = [] } = {}, searchKeys } } = props;
    const { getDropdownFilterList, setStateFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadStockIn } = props;
    const { tableProps: { [TABLE_IDS.LIST_STOCK_IN]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);


    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadStockIn();
    };

    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'remarks', columnName: 'remarks', apiParam: 'remarks', filterBy: 'name' },
        { columnLabel: 'organization', columnName: 'organization.name', apiParam: 'organizations', filterBy: 'id' },
        { columnLabel: 'service_provider', columnName: 'serviceProvider.name', apiParam: 'serviceProviders', filterBy: 'id' },
        { columnLabel: 'transacted_by', columnName: 'transactedBy.name', apiParam: 'transactedBy.name', filterBy: 'id' }

    ];

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_STOCK_IN }));
        setChips({});
        loadStockIn();
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
            name: 'remarks',
            label: I18n.t([passedColumns[1].columnLabel]),
            options: {
                filterType: 'custom',
                filter: false,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[1].columnLabel])}</Typography>
                                <PickySelect
                                    id='code'
                                    name='code'
                                    options={filterOptions[passedColumns[1].columnName] || []}
                                    value={filterState?.[passedColumns[1].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'state.code'), [passedColumns[1].columnName]);
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
                                        getDropdownFilterList(val, _.get(searchKeys, 'organization_vendor_organization_name.organizationName'), [passedColumns[2].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: 'serviceProvider.name',
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
                                        getDropdownFilterList(val, _.get(searchKeys, 'organization_service_provider.serviceProviderName'), [passedColumns[3].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: 'transactedBy.name',
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
                                        getDropdownFilterList(val, _.get(searchKeys, 'mcf_rrf_ckc_sale.transactedBy'), [passedColumns[4].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        }
    ];
    const viewPressed = (id) => {
        history.push(`${PATH.MCF_STOCK_IN}/${id}/view`);
    };
    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.MCF, ACTION_MAPPING.MCF.ACCESS_MCF_STOCK_IN_IN_WEB_NAV) || true;
    if (showActionMenu) {
        let actions = {
            name: 'Actions',
            label: I18n.t('actions'),
            options: {
                ...TABLE_STICKY_ACTIONS,
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    let { tableData, rowIndex } = tableMeta;
                    let id = _.get(tableData[rowIndex] || {}, 'id', null);
                    let menuActions = [];
                    menuActions.push({ name: I18n.t('view'), fn: () => viewPressed(id) });
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

    const options = {
        ...MUI_COMMON_OPTIONS,
        page,
        rowsPerPage: size,
        count,
        // customActions: showAddIcon && [
        //     { handleClick: handleClick, icon: < AddIcon />, toolTip: I18n.t('add') }
        // ],
        onFilterChange: onFilterChange,
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_STOCK_IN })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_STOCK_IN }));
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div>
            <MUIDataTable
                title={I18n.t('stock_in')}
                data={content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    listStockes: getStockes,
    tableProps: getTableProps
});
const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_STOCK_IN, url: URL.MCF.GET_ALL_MCF_STOCKS_IN }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_STOCK_IN }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_STOCK_IN, passedColumns: data })),
    setStateFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_STOCK_IN, filterState: data }));
    },
    loadStockIn: (data) => dispatch(fetchStockInDetails(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_STOCK_IN }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_STOCK_IN, pagination: data }));
        dispatch(fetchStockInDetails());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_STOCK_IN, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_STOCK_IN, pagination: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListStockIn);

