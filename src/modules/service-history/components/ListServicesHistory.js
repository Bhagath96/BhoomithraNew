import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import utils from '../../../utils';
import * as Actions from '../actions';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS } from '../constant';
import { Components, I18n } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { history } from '../../../common';
import { getTableProps } from '../../common/selectors';
import { getServiceHistories } from '../selectors';
const { MUIDataTable, PickySelect, Typography, DottedMenu, AlertDialog, StatusModal } = Components;
const { lodashUtils: _ } = utils;
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../../modules/common/actions';
import { AccessTimeTwoTone, Check, CloudDownloadOutlined } from '@material-ui/icons';
import { convertToLocal } from '../../../utils/DateUtils';
import Swal from 'sweetalert2';
import * as dfgActions from '../../dfg/actions';
import { STATE_REDUCER_KEY as DFG_STATE_REDUCER_KEY } from '../../dfg/constants';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

function ListServiceHistory(props) {

    const dispatch = useDispatch();
    const { listServiceHistories: { requestInProgress = false, data: { content = [] } = {}, searchKeys } } = props;
    const { getDropdownFilterList, setServiceHistoryFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadServiceHistories } = props;
    const { tableProps: { [TABLE_IDS.LIST_SERVICE_HISTORY]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);
    const { completedSurveys } = useSelector(state => state[DFG_STATE_REDUCER_KEY]);

    const passedColumns = [
        { columnLabel: 'id', columnName: 'serviceExecutionId', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'customer_name', columnName: 'customer.name', apiParam: 'customerNames', filterBy: 'name' },
        { columnLabel: 'customer_number', columnName: 'customer.customerNumber', apiParam: 'customerNumbers', filterBy: 'name' },
        { columnLabel: 'customer_qrCode', columnName: 'customer.qrCode', apiParam: 'qrCodes', filterBy: 'name' },
        { columnLabel: 'ward', columnName: 'customer.ward.name', apiParam: 'wardNames', filterBy: 'name' },
        { columnLabel: 'service_worker', columnName: 'customer.serviceWorker.name', apiParam: 'serviceWorkerNames', filterBy: 'name' },
        { columnLabel: 'supervisor', columnName: 'customer.supervisor.name', apiParam: 'supervisorNames', filterBy: 'name' },
        { columnLabel: 'service_provider', columnName: 'customer.serviceProvider.name', apiParam: 'serviceProviderNames', filterBy: 'name' },
        { columnLabel: 'residence_category', columnName: 'customer.residenceCategory.name', apiParam: 'residenceCategoryNames', filterBy: 'name' },
        { columnLabel: 'service_type', columnName: 'serviceType.name', apiParam: 'serviceTypeNames', filterBy: 'name' },
        { columnLabel: 'service_config', columnName: 'serviceConfig.name', apiParam: 'serviceConfigNames', filterBy: 'name' },
        { columnLabel: 'is_downloaded', columnName: 'downloaded', apiParam: 'names', filterBy: 'name' },
        { columnLabel: 'service_executionDate', columnName: 'serviceExecutionDate', apiParam: 'names', filterBy: 'name' },
        { columnLabel: 'service_completionDate', columnName: 'serviceCompletionDate', apiParam: 'names', filterBy: 'name' },
        { columnLabel: 'template_type_id', columnName: 'customer.templateTypeId', apiParam: 'names', filterBy: 'name' },
        { columnLabel: 'customer_enrollment_id', columnName: 'customer.customerEnrollmentId', apiParam: 'names', filterBy: 'name' }
    ];

    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadServiceHistories();
    };
    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_SERVICE_HISTORY }));
        setChips({});
        loadServiceHistories();
    }, []);
    const viewPressed = (rowData) => {
        let surveyIds = rowData[rowData?.length - 2];
        let templateTypeId = 13;
        history.push(`/admin/index/serviceHistory/${surveyIds}/${templateTypeId}/view`);
    };

    const editServiceHistory = ({ rowData }) => {
        let { customer: { customerEnrollmentId: surveyId } } = rowData;
        if (surveyId) {
            dispatch(Actions.editServiceHistory({ surveyId }));
        } else {
            Swal.fire(I18n.t('missing'), `${I18n.t('survey_id')}  ${I18n.t('missing')}`, 'error');
        }
    };

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
                                        setServiceHistoryFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
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
                                        setServiceHistoryFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
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
                                        setServiceHistoryFilter({ [passedColumns[3].apiParam]: { value, property: [passedColumns[3].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'customer.customerNumber'), [passedColumns[3].columnName]);

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
                                        setServiceHistoryFilter({ [passedColumns[4].apiParam]: { value, property: [passedColumns[4].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'ward.label'), [passedColumns[4].columnName]);

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
                                        setServiceHistoryFilter({ [passedColumns[5].apiParam]: { value, property: [passedColumns[5].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'user.serviceWorkerName'), [passedColumns[5].columnName]);

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
                                        setServiceHistoryFilter({ [passedColumns[6].apiParam]: { value, property: [passedColumns[6].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'user.supervisorName'), [passedColumns[6].columnName]);

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
                                        setServiceHistoryFilter({ [passedColumns[7].apiParam]: { value, property: [passedColumns[7].filterBy] } });
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
                                        setServiceHistoryFilter({ [passedColumns[8].apiParam]: { value, property: [passedColumns[8].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'm_residence_category_label.label'), [passedColumns[8].columnName]);

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
            label: I18n.t(passedColumns[9].columnLabel),
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
                                        setServiceHistoryFilter({ [passedColumns[9].apiParam]: { value, property: [passedColumns[9].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        if (val.length > 1) {
                                            getDropdownFilterList(val, _.get(searchKeys, 'm_service_type_label.serviceType'), [passedColumns[9].columnName]);
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
            name: passedColumns[10].columnName,
            label: I18n.t(passedColumns[10].columnLabel),
            options: {

                filter: true,
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
                                        setServiceHistoryFilter({ [passedColumns[10].apiParam]: { value, property: [passedColumns[10].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        if (val.length > 1) {
                                            getDropdownFilterList(val, _.get(searchKeys, 'm_service_config_label.serviceName'), [passedColumns[10].columnName]);
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
            name: passedColumns[11].columnName,
            label: I18n.t(passedColumns[11].columnLabel),
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return <div style={{ textAlign: 'center' }}>{value ? <Check /> : <AccessTimeTwoTone />}</div>;
                }
            }

        },
        {
            name: passedColumns[12].columnName,
            label: I18n.t(passedColumns[12].columnLabel),
            options: {
                filter: false,
                customBodyRender: (value) => convertToLocal(value)
            }
        },
        {
            name: passedColumns[13].columnName,
            label: I18n.t(passedColumns[13].columnLabel),
            options: {
                filter: false,
                customBodyRender: (value) => convertToLocal(value)
            }
        },
        {
            name: 'customer.templateTypeId',
            label: I18n.t('template_type_id'),
            options: {
                filter: false,
                display: 'excluded'
            }
        },
        {
            name: 'customer.customerEnrollmentId',
            label: I18n.t('template_type_id'),
            options: {
                filter: false,
                display: 'excluded'
            }
        }

    ];
    const showActionMenu =
        hasAccessPermission(RESOURCE_MAPPING.SERVICE, ACTION_MAPPING.SERVICE.VIEW_SERVICE) ||
        hasAccessPermission(RESOURCE_MAPPING.SERVICE, ACTION_MAPPING.SERVICE.EDIT_SERVICE_HISTORY) || false;

    if (showActionMenu) {
        let actions = {
            name: 'Actions',
            label: I18n.t('actions'),
            options: {
                ...TABLE_STICKY_ACTIONS,
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    let { rowData, tableData, rowIndex } = tableMeta;
                    let menuActions = [];
                    if (hasAccessPermission(RESOURCE_MAPPING.SERVICE, ACTION_MAPPING.SERVICE.VIEW_SERVICE)) {
                        menuActions.push({ name: I18n.t('view'), fn: () => viewPressed(rowData) });
                    }
                    if (hasAccessPermission(RESOURCE_MAPPING.SERVICE, ACTION_MAPPING.SERVICE.EDIT_SERVICE_HISTORY)) {
                        menuActions.push({ name: I18n.t('edit'), fn: () => editServiceHistory({ rowData: tableData[rowIndex] }) });
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
        setServiceHistoryFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let { filterObj, chipExists } = onFilterChangeFn(chipList, passedColumns);

        //if no chip in table
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_SERVICE_HISTORY }));
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
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_SERVICE_HISTORY })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_SERVICE_HISTORY }));
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div>
            <MUIDataTable
                title={I18n.t('service_history')}
                data={content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
            {
                <AlertDialog
                    isOPen={completedSurveys?.infoMessage}
                    content={I18n.t(completedSurveys?.infoMessage)}
                    onOk={() => dispatch(dfgActions.clearSurveyDataFetchMessage())}
                />
            }
            {
                <StatusModal
                    isOpen={completedSurveys?.showDownloadingSurveyDataModal}
                    icon={<CloudDownloadOutlined />}
                    content={I18n.t('downloading_survey_data')}
                />
            }
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    listServiceHistories: getServiceHistories,
    tableProps: getTableProps
});
const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_SERVICE_HISTORY, url: URL.LIST_SERVICE.LIST_SERVICE }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_SERVICE_HISTORY }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_SERVICE_HISTORY, passedColumns: data })),
    setServiceHistoryFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_SERVICE_HISTORY, filterState: data }));
    },
    loadServiceHistories: (data) => dispatch(Actions.fetchServiceHistoryDetails(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_SERVICE_HISTORY }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_SERVICE_HISTORY, pagination: data }));
        dispatch(Actions.fetchServiceHistoryDetails());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_SERVICE_HISTORY, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_SERVICE_HISTORY, pagination: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(ListServiceHistory);

