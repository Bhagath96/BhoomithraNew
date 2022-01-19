import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import utils from '../../../utils';
import { fetchCustomerDetails } from '../actions';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS } from '../constant';
import { Components, I18n } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { getTableProps } from '../../common/selectors';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { addCustomerIdsToREducer } from '../actions';
import { useHistory } from 'react-router-dom';
import { getCustomers } from '../selectors';

import { URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../../modules/common/actions';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';
import { PATH } from '../../../routes';

const { MUIDataTable, PickySelect, Typography, DottedMenu } = Components;
const { lodashUtils: _ } = utils;

function ListCustomerDetails(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { listCustomers: { requestInProgress = false, data: tableData = [], searchKeys } } = props;
    const { getDropdownFilterList, setCustomerFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadCustomer } = props;
    const { tableProps: { [TABLE_IDS.LIST_CUSTOMER]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);

    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'qr_code', columnName: 'qrCode', apiParam: 'qrCodes', filterBy: 'name' },
        { columnLabel: 'customer_number', columnName: 'customerNumber', apiParam: 'customerNumbers', filterBy: 'name' },
        { columnLabel: 'conflict_customer_number', columnName: 'conflictCustomerNumbers', apiParam: 'conflictCustomerNumbers', filterBy: 'name' },

        { columnLabel: 'customerEnrollmentId', columnName: 'customerEnrollmentId', apiParam: 'customerEnrollmentId', filterBy: 'id' },
        { columnLabel: 'conflictCustomerEnrollmentId', columnName: 'conflictCustomerEnrollmentId', apiParam: 'customerEnrollmentId', filterBy: 'id' },
        { columnLabel: 'conflictCustomerTemplateTypeId', columnName: 'conflictCustomerTemplateTypeId', apiParam: 'customerEnrollmentId', filterBy: 'id' },
        { columnLabel: 'customerTemplateTypeId', columnName: 'customerTemplateTypeId', apiParam: 'customerEnrollmentId', filterBy: 'id' }

    ];

    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadCustomer();
    };
    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_CUSTOMER }));
        setChips({});
        loadCustomer();
    }, []);

    const viewPressed = (data) => {
        let customerTemplateTypeId = data[4];
        let customerEnrollMentId = data[7];
        let conflictCustomerTemplateTypeId = data[5];
        let conflictCustomerEnrollmentId = data[6];
        dispatch(addCustomerIdsToREducer({ customerTemplateTypeId, customerEnrollMentId, conflictCustomerTemplateTypeId, conflictCustomerEnrollmentId }));
        history.push(`${PATH.VIEW_CUSTOMER_DATA_CORRECTION}/${customerEnrollMentId}/${conflictCustomerEnrollmentId}/${customerTemplateTypeId}/${conflictCustomerTemplateTypeId}`);
    };

    const columns = [
        {
            name: 'id',
            label: I18n.t(passedColumns[0].columnLabel),
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'qrCode',
            label: I18n.t(passedColumns[1].columnLabel),
            options: {

                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t('qr_code')}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[1].columnName] || []}
                                    value={filterState?.[passedColumns[1].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setCustomerFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'customer.qrcode'), [passedColumns[1].columnName]);

                                    }}
                                />
                            </>
                        );

                    }
                }
            }

        },
        {
            name: 'customerNumber',
            label: I18n.t(passedColumns[2].columnLabel),
            options: {

                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t('customer_number')}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[2].columnName] || []}
                                    value={filterState?.[passedColumns[2].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setCustomerFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'customer.customerNumber'), [passedColumns[2].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }

        },
        {
            name: 'conflictCustomerNumber',
            label: I18n.t(passedColumns[3].columnLabel),
            options: {

                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t('conflict_customer_number')}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[3].columnName] || []}
                                    value={filterState?.[passedColumns[3].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setCustomerFilter({ [passedColumns[3].apiParam]: { value, property: [passedColumns[3].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'customer.conflictCustomerNumber'), [passedColumns[3].columnName]);

                                    }}
                                />
                            </>
                        );

                    }
                }
            }

        },
        {
            name: 'customerTemplateTypeId',
            label: I18n.t(passedColumns[7].columnLabel),
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'conflictCustomerTemplateTypeId',
            label: I18n.t(passedColumns[6].columnLabel),
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'conflictCustomerEnrollmentId',
            label: I18n.t(passedColumns[5].columnLabel),
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: 'customerEnrollmentId',
            label: I18n.t(passedColumns[4].columnLabel),
            options: {
                filter: false,
                display: false
            }
        }
    ];
    const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.CUSTOMER, ACTION_MAPPING.CUSTOMER.VIEW_CUSTOMER_DATA_CORRECTION) || false;
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
                    if (hasAccessPermission(RESOURCE_MAPPING.CUSTOMER, ACTION_MAPPING.CUSTOMER.VIEW_CUSTOMER_DATA_CORRECTION)) {
                        menuActions.push({ name: I18n.t('view'), fn: () => viewPressed(rowData) });
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
        setCustomerFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let { filterObj, chipExists } = onFilterChangeFn(chipList, passedColumns);

        //if no chip in table
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_CUSTOMER }));
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
        onFilterChange: onFilterChange,
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_CUSTOMER })),

        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_CUSTOMER }));
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div>
            <MUIDataTable
                title={I18n.t('customer_data_correction')}
                data={tableData?.content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    listCustomers: getCustomers,
    tableProps: getTableProps
});

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_CUSTOMER, url: URL.CUSTOMER_DATA_CURRECTION.LIST_CUSTOMER_DATA_CURRECTION }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_CUSTOMER }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_CUSTOMER, passedColumns: data })),
    setCustomerFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_CUSTOMER, filterState: data }));
    },
    loadCustomer: (data) => dispatch(fetchCustomerDetails(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_CUSTOMER }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_CUSTOMER, pagination: data }));
        dispatch(fetchCustomerDetails());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_CUSTOMER, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_CUSTOMER, pagination: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListCustomerDetails);

