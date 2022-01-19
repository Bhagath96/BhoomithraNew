
import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { history, URL } from '../../../../common';
import { Components, I18n } from '../../../../common/components';
import { useParams } from 'react-router-dom';
import {
    DEFAULT_TABLE_PROPS,
    MUI_COMMON_OPTIONS
    // ACTION_MAPPING, RESOURCE_MAPPING, TABLE_STICKY_ACTIONS
} from '../../../../common/constants';
import ActionButtons from '../../../../common/components/custom/mui-data-table/ActionButtons';
import AddIcon from '@material-ui/icons/Add';
import _ from '../../../../utils/LodashUtils';
import { PATH } from '../../../../routes';
import * as Actions from '../../actions';
// import { hasAccessPermission } from '../../../../utils/PermissionUtils';
// import DottedMenu from '../../../../common/components/custom/DottedMenu';
import { createStructuredSelector } from 'reselect';
import { onFilterChangeFn } from '../../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../../common/actions';
import { TABLE_IDS } from '../../constants';
import { getTableProps } from '../../../common/selectors';
import { getListService } from '../../selectors';

const { MUIDataTable, PickySelect } = Components;

function ServiceList(props) {
    const dispatch = useDispatch();
    const { id, providerId } = useParams();
    const serviceProviderId = providerId;
    let renderPath = `${PATH.ORGANIZATION}/${id}/serviceProvider/${providerId}/service/create`;

    const { listService: { requestInProgress = false, data: content = [], searchKeys } } = props;
    const { getDropdownFilterList, setServiceFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadService } = props;
    const { tableProps: { [TABLE_IDS.LIST_SERVICE]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);

    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadService({ serviceProviderId });
    };

    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'residence_category', columnName: 'residenceCategory.name', apiParam: 'residenceCategories', filterBy: 'name', contentKey: 'service_config.residenceCategoryLabel' },
        { columnLabel: 'service_type', columnName: 'serviceType.name', apiParam: 'serviceTypes', filterBy: 'name', contentKey: 'service_config.serviceTypeLabel' },
        { columnLabel: 'service', columnName: 'serviceConfig.name', apiParam: 'serviceConfigs', filterBy: 'name', contentKey: 'service_config.serviceConLabel' },
        { columnLabel: 'bundled_service', columnName: 'bundledServiceConfig.name', apiParam: 'bundledServiceConfigs', filterBy: 'name', contentKey: 'service_config.serviceBunConLabel' },
        { columnLabel: 'templates', columnName: 'serviceTemplateNames', apiParam: 'serviceTemplateNames', filterBy: 'name' },
        { columnLabel: 'rate_type', columnName: 'rateType.name', apiParam: 'serviceRateTypes', filterBy: 'name', contentKey: 'service_config.serviceRateTypeLabel' },
        { columnLabel: 'payment_collection', columnName: 'paymentCollection.name', apiParam: 'paymentCollections', filterBy: 'name', contentKey: 'service_config.serviceChargeCollectionLabel' },
        { columnLabel: 'service_interval', columnName: 'serviceInterval.name', apiParam: 'serviceIntervals', filterBy: 'name', contentKey: 'service_config.serviceIntervalLabel' },
        { columnLabel: 'special_service', columnName: 'specialService', apiParam: 'specialService', filterBy: 'name' },
        { columnLabel: 'active', columnName: 'active', apiParam: 'active', filterBy: 'name' }

    ];
    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_SERVICE }));
        setChips({});
        loadService({ serviceProviderId });
    }, []);
    const handleClick = () => {
        dispatch(Actions.resetService());
        history.push(renderPath);
    };

    //function called when chip is resetted
    const resettingChip = (chipIndex, chipValue, chipList) => {
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setServiceFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let { filterObj, chipExists } = onFilterChangeFn(chipList, passedColumns);
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_SERVICE }));
            setFilterItems(filterObj);
        } else {
            setFilterItems(filterObj);
        }
    };

    const onFilterChange = (chipValue, chipList) => {
        let { filterObj } = onFilterChangeFn(chipList, passedColumns);
        setFilterItems(filterObj);

    };

    const editPressed = (serviceId) => {
        if (providerId) {
            history.push(`/admin/index/organization/${id}/serviceProvider/${providerId}/service/${serviceId}`);
        }
    };
    const toggleStatus = (val) => {
        dispatch(Actions.toggleStatus({ val: val[0], serviceProviderId: providerId }));
    };
    const deletePressed = (organization) => {
        Swal.fire({
            title: I18n.t('are_you_sure_to_delete'),
            showCancelButton: true,
            confirmButtonText: I18n.t('yes'),
            cancelButtonText: I18n.t('no')
        }).then((result) => {
            if (result.value) {
                organization.map((item) => {
                    dispatch(Actions.deleteService(item || 0, page, size, count, providerId));
                });
            }
        });
    };

    const columns = [
        {
            name: passedColumns[0].columnName,
            label: I18n.t(passedColumns[0].columnLabel),
            options: {
                display: 'excuded',
                filter: false
            }
        },
        {
            name: passedColumns[1].columnName,
            label: I18n.t(passedColumns[1].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <PickySelect
                                id={passedColumns[1].columnName}
                                name={passedColumns[1].columnName}
                                label={I18n.t(passedColumns[1].columnLabel)}
                                options={filterOptions[passedColumns[1]?.columnName] || []}
                                value={filterState?.[passedColumns[1].apiParam]?.value}
                                multiple={true}
                                onChange={(value) => {
                                    //storing values to reducer when picky is selected
                                    setServiceFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    //called when searchFilter typed 3 character
                                    getDropdownFilterList(val, searchKeys[passedColumns[1].contentKey], [passedColumns[1].columnName]);
                                }}
                            />
                        );

                    }
                }

            }
        },
        {
            name: passedColumns[2].columnName,
            label: I18n.t(passedColumns[2].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <PickySelect
                                id={passedColumns[2].columnName}
                                name={passedColumns[2].columnName}
                                label={I18n.t(passedColumns[2].columnLabel)}
                                options={filterOptions[passedColumns[2]?.columnName] || []}
                                value={filterState?.[passedColumns[2].apiParam]?.value}
                                multiple={true}
                                onChange={(value) => {
                                    //storing values to reducer when picky is selected
                                    setServiceFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    //called when searchFilter typed 3 character
                                    getDropdownFilterList(val, searchKeys[passedColumns[2].contentKey], [passedColumns[2].columnName]);
                                }}
                            />
                        );

                    }
                }

            }
        },
        {
            name: passedColumns[3].columnName,
            label: I18n.t(passedColumns[3].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <PickySelect
                                id={passedColumns[3].columnName}
                                name={passedColumns[3].columnName}
                                label={I18n.t(passedColumns[3].columnLabel)}
                                options={filterOptions[passedColumns[3]?.columnName] || []}
                                value={filterState?.[passedColumns[3].apiParam]?.value}
                                multiple={true}
                                onChange={(value) => {
                                    //storing values to reducer when picky is selected
                                    setServiceFilter({ [passedColumns[3].apiParam]: { value, property: [passedColumns[3].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    //called when searchFilter typed 3 character
                                    getDropdownFilterList(val, searchKeys[passedColumns[3].contentKey], [passedColumns[3].columnName]);
                                }}
                            />
                        );

                    }
                }

            }
        },
        {
            name: passedColumns[4].columnName,
            label: I18n.t(passedColumns[4].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <PickySelect
                                id={passedColumns[4].columnName}
                                name={passedColumns[4].columnName}
                                label={I18n.t(passedColumns[4].columnLabel)}
                                options={filterOptions[passedColumns[4]?.columnName] || []}
                                value={filterState?.[passedColumns[4].apiParam]?.value}
                                multiple={true}
                                onChange={(value) => {
                                    //storing values to reducer when picky is selected
                                    setServiceFilter({ [passedColumns[4].apiParam]: { value, property: [passedColumns[4].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    //called when searchFilter typed 3 character
                                    getDropdownFilterList(val, searchKeys[passedColumns[4].contentKey], [passedColumns[4].columnName]);
                                }}
                            />
                        );

                    }
                }

            }
        },
        {
            name: passedColumns[5].columnName,
            label: I18n.t(passedColumns[5].columnLabel),
            options: {
                filterType: 'custom',
                filter: false
            }
        },
        {
            name: passedColumns[6].columnName,
            label: I18n.t(passedColumns[6].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <PickySelect
                                id='orgNameId'
                                name='orgName'
                                label={I18n.t(passedColumns[6].columnLabel)}
                                options={filterOptions[passedColumns[6]?.columnName] || []}
                                value={filterState?.[passedColumns[6].apiParam]?.value}
                                multiple={true}
                                onChange={(value) => {
                                    //storing values to reducer when picky is selected
                                    setServiceFilter({ [passedColumns[6].apiParam]: { value, property: [passedColumns[6].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    //called when searchFilter typed 3 character
                                    getDropdownFilterList(val, searchKeys[passedColumns[6].contentKey], [passedColumns[6].columnName]);
                                }}
                            />
                        );

                    }
                }

            }
        },
        {
            name: passedColumns[7].columnName,
            label: I18n.t(passedColumns[7].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <PickySelect
                                id={passedColumns[7].columnName}
                                name={passedColumns[7].columnName}
                                label={I18n.t(passedColumns[7].columnLabel)}
                                options={filterOptions[passedColumns[7]?.columnName] || []}
                                value={filterState?.[passedColumns[7].apiParam]?.value}
                                multiple={true}
                                onChange={(value) => {
                                    //storing values to reducer when picky is selected
                                    setServiceFilter({ [passedColumns[7].apiParam]: { value, property: [passedColumns[7].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    getDropdownFilterList(val, searchKeys[passedColumns[7].contentKey], [passedColumns[7].columnName]);
                                }}
                            />
                        );

                    }
                }

            }
        },
        {
            name: passedColumns[8].columnName,
            label: I18n.t(passedColumns[8].columnLabel),
            options: {
                filterType: 'custom',
                filter: true,
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <PickySelect
                                id={passedColumns[8].columnName}
                                name={passedColumns[8].columnName}
                                label={I18n.t(passedColumns[8].columnLabel)}
                                options={filterOptions[passedColumns[8]?.columnName] || []}
                                value={filterState?.[passedColumns[8].apiParam]?.value}
                                multiple={true}
                                onChange={(value) => {
                                    //storing values to reducer when picky is selected
                                    setServiceFilter({ [passedColumns[8].apiParam]: { value, property: [passedColumns[8].filterBy] } });
                                    filterList[index] = value.map(val => val.name);
                                    onChange(filterList[index], index, column);
                                }}
                                dropdownHeight={600}
                                getFilterValue={val => {
                                    getDropdownFilterList(val, searchKeys[passedColumns[8].contentKey], [passedColumns[8].columnName]);
                                }}
                            />
                        );

                    }
                }

            }
        },
        {
            name: passedColumns[9].columnName,
            label: I18n.t(passedColumns[9].columnLabel),
            options: {
                filter: false,
                customBodyRender: (val) => {
                    return val === true ? 'true' : 'false';
                }
                // display: 'excluded'
            }
        },
        {
            name: passedColumns[10].columnName,
            label: I18n.t(passedColumns[10].columnLabel),
            options: {
                filter: false,
                customBodyRender: (val) => {
                    return val === true ? 'true' : 'false';
                }
                // display: 'excluded'
            }
        },
        {
            name: 'Actions',
            options: {
                filter: false,
                setCellProps: () => ({
                    style: {
                        whiteSpace: 'nowrap',
                        position: 'sticky',
                        right: '0',
                        background: 'white',
                        zIndex: 100
                    }
                }),
                customBodyRender: (value, tableMeta) => {
                    return (
                        <ActionButtons menuActions={[{ name: 'View', fn: editPressed }, { name: 'Edit', fn: editPressed }, { name: 'Delete', fn: deletePressed }, { name: tableMeta.rowData[8] ? I18n.t('inactive') : I18n.t('active'), fn2: toggleStatus }, tableMeta]} />
                    );
                }
            }
        }

    ];


    // NEED TO ENABLE THIS AFTER ADDING PERMISSIONS

    // const showActionMenu = hasAccessPermission(RESOURCE_MAPPING.SERVICE, ACTION_MAPPING.SERVICE.EDIT_SERVICE) || hasAccessPermission(RESOURCE_MAPPING.SERVICE, ACTION_MAPPING.SERVICE.DELETE_SERVICE)
    //     || false; // set to false after adding permissions
    // const showAddIcon = hasAccessPermission(RESOURCE_MAPPING.SERVICE, ACTION_MAPPING.SERVICE.ADD_SERVICE)
    //     || false;// set to false after adding permissions
    // if (showActionMenu) {
    //     let actions = {
    //         name: 'Actions',
    //         label: I18n.t('actions'),
    //         options: {
    //             filter: false,
    //             ...TABLE_STICKY_ACTIONS,
    //             customBodyRender: (value, tableMeta) => {
    //                 let { rowData } = tableMeta;
    //                 let menuActions = [];
    //                 if (hasAccessPermission(RESOURCE_MAPPING.SERVICE, ACTION_MAPPING.SERVICE.EDIT_SERVICE)) {
    //                     menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
    //                 }
    //                 if (hasAccessPermission(RESOURCE_MAPPING.SERVICE, ACTION_MAPPING.SERVICE.DELETE_SERVICE)) {
    //                     menuActions.push({ name: I18n.t('delete'), fn: () => deletePressed(rowData) });
    //                 }
    //                 return <DottedMenu options={menuActions} />;
    //             }
    //         }
    //     };
    //     columns.push(actions);
    // }

    const options = {
        ...MUI_COMMON_OPTIONS,
        page,
        rowsPerPage: size,
        count,
        onFilterChange: onFilterChange,
        customActions:
            // showAddIcon &&
            [
                { handleClick: handleClick, icon: < AddIcon />, toolTip: I18n.t('add') }
            ],
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page, serviceProviderId });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage, serviceProviderId });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_SERVICE }));
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <div style={{ overflow: 'scroll' }}>
            <MUIDataTable
                title={I18n.t('service')}
                data={content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    listService: getListService,
    tableProps: getTableProps
});
const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_SERVICE, url: URL.BASIC_CONFIG.LIST_SERVICE }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_SERVICE }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_SERVICE, passedColumns: data })),
    setServiceFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_SERVICE, filterState: data }));
    },
    loadService: (data) => dispatch(Actions.listService(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_SERVICE }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_SERVICE, pagination: data }));
        dispatch(Actions.listService(data));
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_SERVICE, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_SERVICE, pagination: data }))
});
export default connect(mapStateToProps, mapDispatchToProps)(ServiceList);
