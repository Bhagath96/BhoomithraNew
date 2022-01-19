import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchSalesDetails } from '../actions';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS } from '../constant';
import { Components, I18n } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { getTableProps } from '../../common/selectors';
import { getSales } from '../selectors';
import utils from '../../../utils';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../common/actions';
import { history, URL } from '../../../common';
import { PATH } from '../../../routes';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import DottedMenu from '../../../common/components/custom/DottedMenu';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const { MUIDataTable, Typography, PickySelect } = Components;
const { lodashUtils: _ } = utils;

function ListSales(props) {

    const dispatch = useDispatch();
    const { listSales: { requestInProgress = false, data: { content = [] } = {}, searchKeys } } = props;
    const { getDropdownFilterList, setStateFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadSales } = props;
    const { tableProps: { [TABLE_IDS.LIST_RRF_SALES]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);

    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadSales();
    };

    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'organization', columnName: 'organization.name', apiParam: 'organizations', filterBy: 'name' },
        { columnLabel: 'vendor', columnName: 'vendor.name', apiParam: 'vendorName', filterBy: 'name' },
        { columnLabel: 'total', columnName: 'total', apiParam: 'total', filterBy: 'name' },
        { columnLabel: 'remarks', columnName: 'code', apiParam: 'codes', filterBy: 'name' },
        { columnLabel: 'transactedBy', columnName: 'transactedBy.name', apiParam: 'userNames', filterBy: 'name' },
        { columnLabel: 'handedOver_by_name', columnName: 'handedOverByName', apiParam: 'handedOverNames', filterBy: 'name' },
        { columnLabel: 'handedOver_by_designation', columnName: 'handedOverByDesignation', apiParam: 'handedOverDesignations', filterBy: 'name' },
        { columnLabel: 'received_by_name', columnName: 'receivedByName', apiParam: 'receivedByName', filterBy: 'name' },
        { columnLabel: 'received_by_designation', columnName: 'receivedByDesignation', apiParam: 'receivedByDesignation', filterBy: 'name' },
        { columnLabel: 'received_by_mobile', columnName: 'receivedByMobile', apiParam: 'codes', filterBy: 'name' }

    ];

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_RRF_SALES }));
        loadSales();
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
            name: passedColumns[2].columnName,
            label: I18n.t([passedColumns[2].columnLabel]),
            options: {

                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[2].columnLabel])}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[2].columnName] || []}
                                    value={filterState?.[passedColumns[2].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
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
            name: passedColumns[3].columnName,
            label: I18n.t([passedColumns[3].columnLabel]),
            options: {

                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[3].columnLabel])}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[3].columnName] || []}
                                    value={filterState?.[passedColumns[3].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[3].apiParam]: { value, property: [passedColumns[3].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'mcf_rrf_ckc_sale.total'), [passedColumns[7].columnName]);
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

                filter: false,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[4].columnLabel])}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[4].columnName] || []}
                                    value={filterState?.[passedColumns[4].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[4].apiParam]: { value, property: [passedColumns[4].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'state.name'), [passedColumns[4].columnName]);
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

                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[5].columnLabel])}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[5].columnName] || []}
                                    value={filterState?.[passedColumns[5].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[5].apiParam]: { value, property: [passedColumns[5].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'mcf_rrf_ckc_sale.transactedBy'), [passedColumns[5].columnName]);
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

                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[6].columnLabel])}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[6].columnName] || []}
                                    value={filterState?.[passedColumns[6].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[6].apiParam]: { value, property: [passedColumns[6].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'mcf_rrf_ckc_sale.handedOverName'), [passedColumns[6].columnName]);
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

                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[7].columnLabel])}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[7].columnName] || []}
                                    value={filterState?.[passedColumns[7].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[7].apiParam]: { value, property: [passedColumns[7].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'mcf_rrf_ckc_sale.handedOverDesignation'), [passedColumns[7].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: passedColumns[8].columnName,
            label: I18n.t([passedColumns[8].columnLabel]),
            options: {

                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[8].columnLabel])}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[8].columnName] || []}
                                    value={filterState?.[passedColumns[8].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[8].apiParam]: { value, property: [passedColumns[8].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'mcf_rrf_ckc_sale.receivedByName'), [passedColumns[8].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: passedColumns[9].columnName,
            label: I18n.t([passedColumns[9].columnLabel]),
            options: {

                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[9].columnLabel])}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[9].columnName] || []}
                                    value={filterState?.[passedColumns[9].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[9].apiParam]: { value, property: [passedColumns[9].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'mcf_rrf_ckc_sale.receivedByDesignation'), [passedColumns[9].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: passedColumns[10].columnName,
            label: I18n.t([passedColumns[10].columnLabel]),
            options: {

                filter: false,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[10].columnLabel])}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[10].columnName] || []}
                                    value={filterState?.[passedColumns[10].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setStateFilter({ [passedColumns[10].apiParam]: { value, property: [passedColumns[10].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'state.name'), [passedColumns[10].columnName]);
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
        history.push(`${PATH.RRF_SALES}/${id}/view`);
    };
    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.RRF_SALES, ACTION_MAPPING.RRF_SALES.ACCESS_RRF_SALES_IN_NAV) || false;
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
        onFilterChange: onFilterChange,
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_RRF_SALES })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_RRF_SALES }));
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div>
            <MUIDataTable
                title={I18n.t('rrf_sales')}
                data={content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    listSales: getSales,
    tableProps: getTableProps
});
const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_RRF_SALES, url: URL.RRF.LIST_SALES }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_RRF_SALES }));
        }
    },
    setStateFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_RRF_SALES, filterState: data }));
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_RRF_SALES, passedColumns: data })),
    loadSales: (data) => dispatch(fetchSalesDetails(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_RRF_SALES }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_RRF_SALES, pagination: data }));
        dispatch(fetchSalesDetails());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_RRF_SALES, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_RRF_SALES, pagination: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListSales);

