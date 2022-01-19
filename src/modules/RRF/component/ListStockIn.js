import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchLStockInDetails } from '../actions';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS } from '../constant';
import { Components, I18n } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { getTableProps } from '../../common/selectors';
import { getStockInList } from '../selectors';
import { history, URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../common/actions';
import utils from '../../../utils';
import { PATH } from '../../../routes';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import DottedMenu from '../../../common/components/custom/DottedMenu';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';


const { MUIDataTable, Typography, PickySelect } = Components;
const { lodashUtils: _ } = utils;

function ListStockIn(props) {

    const dispatch = useDispatch();
    const { listStockIn: { requestInProgress = false, data: { content = [] } = {}, searchKeys } } = props;
    const { getDropdownFilterList, setStateFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadStockIn } = props;
    const { tableProps: { [TABLE_IDS.LIST_RRF_STOCK_IN]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);


    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadStockIn();
    };
    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'organization', columnName: 'organization.name', apiParam: 'organizations', filterBy: 'name' },
        { columnLabel: 'service_provider', columnName: 'serviceProvider.name', apiParam: 'serviceProviders', filterBy: 'name' },
        { columnLabel: 'transactedBy', columnName: 'transactedBy.name', apiParam: 'userNames', filterBy: 'name' },
        { columnLabel: 'remarks', columnName: 'remarks', apiParam: 'codes', filterBy: 'name' }

    ];

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_RRF_STOCK_IN }));
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
                                        getDropdownFilterList(val, _.get(searchKeys, 'organization_service_provider.serviceProviderName'), [passedColumns[2].columnName]);
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
                                        getDropdownFilterList(val, _.get(searchKeys, 'mcf_rrf_ckc_sale.transactedBy'), [passedColumns[3].columnName]);
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
                                        getDropdownFilterList(val, _.get(searchKeys, ''), [passedColumns[4].columnName]);
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
        history.push(`${PATH.RRF_STOCK_IN}/${id}/view`);
    };
    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.RRF_STOCK_IN, ACTION_MAPPING.RRF_STOCK_IN.ACCESS_RRF_STOCK_IN_NAV) || false;
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
                    menuActions.push({ name: I18n.t('view'), fn: () => viewPressed(rowData[0]) });
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
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_RRF_STOCK_IN })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_RRF_STOCK_IN }));
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
    listStockIn: getStockInList,
    tableProps: getTableProps
});
const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_RRF_STOCK_IN, url: URL.RRF.LIST_STOCK_IN }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_RRF_STOCK_IN }));
        }
    },
    setStateFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_RRF_STOCK_IN, filterState: data }));
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_RRF_STOCK_IN, passedColumns: data })),
    loadStockIn: (data) => dispatch(fetchLStockInDetails(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_RRF_STOCK_IN }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_RRF_STOCK_IN, pagination: data }));
        dispatch(fetchLStockInDetails());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_RRF_STOCK_IN, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_RRF_STOCK_IN, pagination: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListStockIn);

