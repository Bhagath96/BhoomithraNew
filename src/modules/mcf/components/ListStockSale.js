import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import utils from '../../../utils';
import { fetchStockSaleDetails } from '../actions';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS } from '../constant';
import { Components, I18n } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { getTableProps } from '../../../modules/common/selectors';
import { getStockSale } from '../selectors';
import { history, URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../../modules/common/actions';
import { PATH } from '../../../routes';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import DottedMenu from '../../../common/components/custom/DottedMenu';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const { MUIDataTable, PickySelect, Typography } = Components;
const { lodashUtils: _ } = utils;


function ListStockSale(props) {

    const dispatch = useDispatch();
    const { listStockes: { requestInProgress = false, data: { content = [] } = {}, searchKeys } } = props;
    const { getDropdownFilterList, setStateFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadStockIn } = props;
    const { tableProps: { [TABLE_IDS.LIST_STOCK_SALE]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);


    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadStockIn();
    };

    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'organization', columnName: 'organization.name', apiParam: 'organizations', filterBy: 'id' },
        { columnLabel: 'vendor', columnName: 'vendor.name', apiParam: 'vendors', filterBy: 'id' },
        { columnLabel: 'total', columnName: 'total', apiParam: 'totals', filterBy: 'id' },
        { columnLabel: 'handed_over_by_name', columnName: 'handedOverByName', apiParam: 'handedOverNames', filterBy: 'id' },
        { columnLabel: 'handed_over_by_designation', columnName: 'handedOverByDesignation', apiParam: 'handedOverByDesignations', filterBy: 'id' },
        { columnLabel: 'handed_over_by_mobile', columnName: 'handedOverByMobile', apiParam: 'handedOverByMobiles', filterBy: 'id' },
        { columnLabel: 'received_by_name', columnName: 'receivedByName', apiParam: 'receivedByNames', filterBy: 'id' },
        { columnLabel: 'received_by_designation', columnName: 'receivedByDesignation', apiParam: 'receivedByDesignations', filterBy: 'id' },
        { columnLabel: 'received_by_mobile', columnName: 'receivedByMobile', apiParam: 'receivedByMobile', filterBy: 'id' },
        { columnLabel: 'remarks', columnName: 'remarks', apiParam: 'remarks', filterBy: 'id' },
        { columnLabel: 'transacted_by', columnName: 'transactedBy', apiParam: 'transactedBys', filterBy: 'id' }

    ];

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_STOCK_SALE }));
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
            name: 'organization.name',
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
                                        getDropdownFilterList(val, _.get(searchKeys, 'organization_vendor_organization_name.organizationName'), [passedColumns[1].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }

        },
        {
            name: 'vendor.name',
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
                                        getDropdownFilterList(val, _.get(searchKeys, 'mcf_rrf_ckc_sale.vendorName'), [passedColumns[2].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: 'total',
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
                                        getDropdownFilterList(val, _.get(searchKeys, 'mcf_rrf_ckc_sale.total'), [passedColumns[3].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: 'handedOverByName',
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
                                        getDropdownFilterList(val, _.get(searchKeys, 'mcf_rrf_ckc_sale.handedOverName'), [passedColumns[4].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: 'handedOverByDesignation',
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
                                        getDropdownFilterList(val, _.get(searchKeys, 'mcf_rrf_ckc_sale.handedOverDesignation'), [passedColumns[5].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: 'handedOverByMobile',
            label: I18n.t([passedColumns[6].columnLabel]),
            options: {
                filterType: 'custom',
                filter: false,
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
                                        getDropdownFilterList(val, _.get(searchKeys, 'state.code'), [passedColumns[6].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: 'receivedByName',
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
                                        getDropdownFilterList(val, _.get(searchKeys, 'mcf_rrf_ckc_sale.receivedByName'), [passedColumns[7].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: 'receivedByDesignation',
            label: I18n.t([passedColumns[8].columnLabel]),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[8].columnLabel])}</Typography>
                                <PickySelect
                                    id='code'
                                    name='code'
                                    options={filterOptions[passedColumns[8].columnName] || []}
                                    value={filterState?.[passedColumns[8].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[8].apiParam]: { value, property: [passedColumns[8].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'mcf_rrf_ckc_sale.receivedByDesignation'), [passedColumns[8].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: 'receivedByMobile',
            label: I18n.t([passedColumns[9].columnLabel]),
            options: {
                filterType: 'custom',
                filter: false,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[9].columnLabel])}</Typography>
                                <PickySelect
                                    id='code'
                                    name='code'
                                    options={filterOptions[passedColumns[9].columnName] || []}
                                    value={filterState?.[passedColumns[9].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[9].apiParam]: { value, property: [passedColumns[9].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'state.code'), [passedColumns[9].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: 'remarks',
            label: I18n.t([passedColumns[10].columnLabel]),
            options: {
                filterType: 'custom',
                filter: false,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[10].columnLabel])}</Typography>
                                <PickySelect
                                    id='code'
                                    name='code'
                                    options={filterOptions[passedColumns[10].columnName] || []}
                                    value={filterState?.[passedColumns[10].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[10].apiParam]: { value, property: [passedColumns[10].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'state.code'), [passedColumns[10].columnName]);
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
            label: I18n.t([passedColumns[11].columnLabel]),
            options: {

                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[11].columnLabel])}</Typography>
                                <PickySelect
                                    id='code'
                                    name='code'
                                    options={filterOptions[passedColumns[11].columnName] || []}
                                    value={filterState?.[passedColumns[11].apiParam]?.value}
                                    multiple={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[11].apiParam]: { value, property: [passedColumns[11].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'mcf_rrf_ckc_sale.transactedBy'), [passedColumns[11].columnName]);
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
        history.push(`${PATH.MCF_STOCK_SALE}/${id}/view`);
    };
    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.MCF, ACTION_MAPPING.MCF.ACCESS_MCF_SALE_IN_WEB_NAV) || true;
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
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_STOCK_SALE })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_STOCK_SALE }));
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div>
            <MUIDataTable
                title={I18n.t('stock_sale')}
                data={content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    listStockes: getStockSale,
    tableProps: getTableProps
});
const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_STOCK_SALE, url: URL.MCF.GET_ALL_MCF_STOCKS_SALE }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_STOCK_SALE }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_STOCK_SALE, passedColumns: data })),
    setStateFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_STOCK_SALE, filterState: data }));
    },
    loadStockIn: (data) => dispatch(fetchStockSaleDetails(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_STOCK_SALE }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_STOCK_SALE, pagination: data }));
        dispatch(fetchStockSaleDetails());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_STOCK_SALE, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_STOCK_SALE, pagination: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListStockSale);

