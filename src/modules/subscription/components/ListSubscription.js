import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import utils from '../../../utils';
import { fetchSubscriptionDetails } from '../actions';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS } from '../constant';
import { Components, I18n } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS } from '../../../common/constants';
import { getTableProps } from '../../common/selectors';
import { getSubscriptions } from '../selectors';
const { MUIDataTable, PickySelect, Typography } = Components;
const { lodashUtils: _ } = utils;
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setAdditionalTableFilters, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../common/actions';
import { URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';


function ListSubscription(props) {

    const dispatch = useDispatch();
    const { setPassedColumnsForTable, getDropdownFilterList, setsubscriptionFilter, listSubscriptions: { requestInProgress = false, data: { content: tableData = [] }, searchKeys } } = props;
    const { tableProps: { [TABLE_IDS.LIST_SUBSCRIPTION]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);

    const { setPagination, setChips, setPageProps, loadSubscription } = props;
    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'customer_name', columnName: 'name', apiParam: 'customerNames', filterBy: 'name' },
        { columnLabel: 'customer_number', columnName: 'customerNumber', apiParam: 'customerNumbers', filterBy: 'name' },
        { columnLabel: 'customer_qrCode', columnName: 'qrCode', apiParam: 'qrCodes', filterBy: 'name' },
        { columnLabel: 'organization', columnName: 'organization.name', apiParam: 'organizations', filterBy: 'name' },
        { columnLabel: 'ward', columnName: 'ward.name', apiParam: 'wards', filterBy: 'name' },
        { columnLabel: 'service_config', columnName: 'serviceConfig.name', apiParam: 'serviceConfigs', filterBy: 'name' },
        { columnLabel: 'service_provider', columnName: 'serviceProvider.name', apiParam: 'serviceProviders', filterBy: 'name' },
        { columnLabel: 'service_type', columnName: 'serviceType.name', apiParam: 'serviceTypes', filterBy: 'name' }

    ];
    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadSubscription();
    };
    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_SUBSCRIPTION }));
        setChips({});
        loadSubscription();
    }, []);

    const columns = [
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
                                        setsubscriptionFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'user.customerName'), [passedColumns[1].columnName]);
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
                                        setsubscriptionFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        if (val.length > 1) {
                                            getDropdownFilterList(val, _.get(searchKeys, 'user.customerName'), [passedColumns[2].columnName]);
                                        }
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
            label: I18n.t(passedColumns[3].columnLabel),
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
                                        setsubscriptionFilter({ [passedColumns[3].apiParam]: { value, property: [passedColumns[3].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'customer.qrcode'), [passedColumns[3].columnName]);
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
            label: I18n.t(passedColumns[4].columnLabel),
            options: {

                filter: true,
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
                                        setsubscriptionFilter({ [passedColumns[4].apiParam]: { value, property: [passedColumns[4].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'organization.name'), [passedColumns[4].columnName]);
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
            label: I18n.t(passedColumns[5].columnLabel),
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
                                        setsubscriptionFilter({ [passedColumns[5].apiParam]: { value, property: [passedColumns[5].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'ward.label'), [passedColumns[5].columnName]);
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
            label: I18n.t(passedColumns[6].columnLabel),
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
                                        setsubscriptionFilter({ [passedColumns[6].apiParam]: { value, property: [passedColumns[6].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'm_service_config_label.serviceName'), [passedColumns[6].columnName]);
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
            label: I18n.t(passedColumns[7].columnLabel),
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
                                        setsubscriptionFilter({ [passedColumns[7].apiParam]: { value, property: [passedColumns[7].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'organization_service_provider.serviceProviderName'), [passedColumns[7].columnName]);
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
            label: I18n.t(passedColumns[8].columnLabel),
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
                                        setsubscriptionFilter({ [passedColumns[8].apiParam]: { value, property: [passedColumns[8].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'm_service_type_label.serviceType'), [passedColumns[8].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }

        }

    ];
    const resettingChip = (chipIndex, chipValue, chipList) => {
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setsubscriptionFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
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
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_SUBSCRIPTION })),
        onFilterChange: onFilterChange,
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_SUBSCRIPTION }));
                    setFilterItems({});
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div>
            <MUIDataTable
                title={I18n.t('subscription')}
                data={tableData}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    listSubscriptions: getSubscriptions,
    tableProps: getTableProps
});
const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_SUBSCRIPTION, url: URL.LIST_SUBSCRIPTION.LIST_SUBSCRIPTION }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_SUBSCRIPTION }));

        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_SUBSCRIPTION, passedColumns: data })),
    resetTableFilterList: () => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_SUBSCRIPTION }));
        dispatch(setAdditionalTableFilters({ key: TABLE_IDS.LIST_SUBSCRIPTION, additionalFilters: { unassignedUsersOnly: false, member: false } }));
    },
    setsubscriptionFilter: (data) => dispatch(setTableFilterState({ key: TABLE_IDS.LIST_SUBSCRIPTION, filterState: data })),

    loadSubscription: (data) => dispatch(fetchSubscriptionDetails(data)),
    setPageProps: (data) => {
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_SUBSCRIPTION, pagination: data }));
        dispatch(fetchSubscriptionDetails());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_SUBSCRIPTION, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_SUBSCRIPTION, pagination: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListSubscription);

