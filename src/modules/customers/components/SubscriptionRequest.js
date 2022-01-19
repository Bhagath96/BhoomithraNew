import { Chip, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Field, reduxForm, Form, reset } from 'redux-form';
import { EMPTY_VALUE, TABLE_IDS } from '../constants';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import { Components, I18n, Icons } from '../../../common/components';
import { DEFAULT_TABLE_PROPS, MUI_COMMON_OPTIONS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { STATUS_RECORD, ACTION_TYPES } from '../../common/constants';
import { convertToLocal } from '../../../utils/DateUtils';
import { getEmptyPicky, getTableData } from '../../../utils/CommonUtils';
import { renderSelect } from '../../../utils/FormUtils';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import * as Actions from '../actions';
import { getSubscriptions } from '../selectors';
import { getTableProps, getAssignServiceWorker } from '../../common/selectors';
import { URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../../modules/common/actions';
import * as commonActions from '../../common/actions';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';


const { MUIDataTable, DottedMenu, Typography, Colors, PickySelect, Button, LoadingOverlay, Switch } = Components;
const { Help, Cancel, CheckCircle, Info, Error } = Icons;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const styles = {
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
};

const passedColumns = [
    { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
    { columnLabel: 'customer_name', columnName: 'customerName', apiParam: 'customerNames', filterBy: 'id' },
    { columnLabel: 'customer_number', columnName: 'customerNumber', apiParam: 'customerNumbers', filterBy: 'id' },
    { columnLabel: 'phone_number', columnName: 'phoneNumber', apiParam: 'phoneNumbers', filterBy: 'id' },
    { columnLabel: 'status', columnName: 'requestStatus', apiParam: 'statuses', filterBy: 'id' },
    { columnLabel: 'service_name', columnName: 'service.name', apiParam: 'serviceNames', filterBy: 'id' },
    { columnLabel: 'service_type', columnName: 'serviceType.name', apiParam: 'serviceTypes', filterBy: 'id' },
    { columnLabel: 'service_interval', columnName: 'serviceInterval.name', apiParam: 'serviceInterval', filterBy: 'id' },
    { columnLabel: 'organization', columnName: 'organization', apiParam: 'organizationNames', filterBy: 'id' },
    { columnLabel: 'service_worker', columnName: 'serviceWorker.name', apiParam: 'serviceWorkers', filterBy: 'id' },
    { columnLabel: 'service_provider', columnName: 'serviceProvider.name', apiParam: 'serviceProviders', filterBy: 'id' },
    { columnLabel: 'supervisor', columnName: 'supervisor.name', apiParam: 'supervisors', filterBy: 'id' },
    { columnLabel: 'opt_in', columnName: 'optIn', apiParam: 'optIns', filterBy: 'id' },
    { columnLabel: 'approved_by', columnName: 'approvedBy', apiParam: 'approvedBy', filterBy: 'id' },
    { columnLabel: 'approved_at', columnName: 'approvedAt', apiParam: 'approvedAt', filterBy: 'id' },
    { columnLabel: 'requested_at', columnName: 'requestedAt', apiParam: 'requestedAt', filterBy: 'id' },
    { columnLabel: 'ward', columnName: 'ward', apiParam: 'wards', filterBy: 'id' },
    { columnLabel: 'serviceProviders', columnName: 'serviceProvider', apiParam: 'serviceProviders', filterBy: 'id' },
    { columnLabel: 'supervisor', columnName: 'supervisor', apiParam: 'supervisors', filterBy: 'id' },
    { columnLabel: 'service_worker', columnName: 'serviceWorker', apiParam: 'serviceWorkers', filterBy: 'id' }

];

const SubscriptionRequest = (props) => {
    const dispatch = useDispatch();

    const { subscriptions: { requestInProgress = false, data: { content = [] } = {}, searchKeys }, processSubscriptionRequest } = props;
    const { getDropdownFilterList, setFilterSubscription, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadSubscriptions, modalProps: { swSupervisors = {}, serviceWorkers = {} } } = props;
    const { tableProps: { [TABLE_IDS.LIST_SUBSCRIPTIONS]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);

    const optInValue = [{ id: 'true', name: 'true' }, { id: 'false', name: 'false' }];

    const descriptionElementRef = React.useRef(null);
    const [isOpenAssignServiceWorker, setIsOpenAssignServiceWorker] = React.useState(false);
    const [modalOrganization, setModalOrganization] = React.useState(null);
    const [modalServiceProvider, setModalServiceProvider] = React.useState(null);
    const [modalSupervisor, setModalSupervisor] = React.useState(null);
    const [modalWard, setModalWard] = React.useState(null);
    const [modalServiceRequestId, setModalServiceRequestId] = React.useState(null);


    useEffect(() => {
        if (isOpenAssignServiceWorker) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [isOpenAssignServiceWorker]);

    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadSubscriptions();
    };

    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_SUBSCRIPTIONS }));
        setChips({});
        loadSubscriptions();
    }, []);

    const submit = (values) => {
        let request = {
            subScriptionRequestId: modalServiceRequestId,
            supervisorId: _.get(values, 'superVisor.id', null),
            serviceWorkerId: _.get(values, 'serviceWorker.id', null)
        };
        if (request.subScriptionRequestId && request.supervisorId && request.serviceWorkerId) {
            dispatch(Actions.assignSpecialServiceRequestsServiceWorker(request));
            setIsOpenAssignServiceWorker(false);
            dispatch(reset('SubscriptionRequest'));

        } else {
            alert(`${I18n.t('missing')} : ${I18n.t('special_service_request')} ${I18n.t('id')}/${I18n.t('supervisor')}/${I18n.t('serviceWorker')}`, 'error');
        }
    };


    const makeDecision = ({ data: rowData, type }) => {
        let id = rowData[0];
        processSubscriptionRequest({ id, type });
    };

    const getStatusProps = (status) => {
        switch (status) {
            case STATUS_RECORD.SERVICE_ENROLLMENT_REQUESTED:
                return { icon: <Info style={{ color: 'white' }} />, color: Colors['color-warning-600'] };
            case STATUS_RECORD.SERVICE_ENROLLMENT_APPROVED:
                return { icon: <CheckCircle style={{ color: 'white' }} />, color: Colors['color-success-600'] };
            case STATUS_RECORD.SERVICE_ENROLLMENT_DECLINED:
                return { icon: <Error style={{ color: 'white' }} />, color: Colors['color-danger-600'] };
            case STATUS_RECORD.SERVICE_ENROLLMENT_CANCELLED:
                return { icon: <Cancel style={{ color: 'white' }} />, color: Colors['color-cancelled-600'] };
            default:
                return { icon: <Help style={{ color: 'white' }} />, color: 'grey' };
        }
    };

    const resettingChip = (chipIndex, chipValue, chipList) => {
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setFilterSubscription({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
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
    let options = {
        ...MUI_COMMON_OPTIONS,
        page,
        rowsPerPage: size,
        count,
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resettingChip(index, removedFilter, filterList);
        },
        onFilterChange: onFilterChange,
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_SUBSCRIPTIONS })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_SUBSCRIPTIONS }));
                    break;
                default:
                    break;
            }
        }
    };

    const columProps = [
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
                                <Typography variant='h7'>{[I18n.t([passedColumns[1].columnLabel])]}</Typography>
                                <PickySelect
                                    id={passedColumns[1].columnName}
                                    name={passedColumns[1].columnName}
                                    options={filterOptions[passedColumns[1].columnName] || []}
                                    value={filterState?.[passedColumns[1].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setFilterSubscription({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'customer.customerName'), [passedColumns[1].columnName]);
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
                                <Typography variant='h7'>{[I18n.t([passedColumns[2].columnLabel])]}</Typography>
                                <PickySelect
                                    id={passedColumns[2].columnName}
                                    name={passedColumns[2].columnName}
                                    options={filterOptions[passedColumns[2].columnName] || []}
                                    value={filterState?.[passedColumns[2].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setFilterSubscription({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
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
                                <Typography variant='h7'>{[I18n.t([passedColumns[3].columnLabel])]}</Typography>
                                <PickySelect
                                    id={passedColumns[3].columnName}
                                    name={passedColumns[3].columnName}
                                    options={filterOptions[passedColumns[3].columnName] || []}
                                    value={filterState?.[passedColumns[3].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setFilterSubscription({ [passedColumns[3].apiParam]: { value, property: [passedColumns[3].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'customer.phoneNumber'), [passedColumns[3].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        }, {
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
                                <Typography variant='h7'>{[I18n.t([passedColumns[4].columnLabel])]}</Typography>
                                <PickySelect
                                    id={passedColumns[4].columnName}
                                    name={passedColumns[4].columnName}
                                    options={filterOptions[passedColumns[4].columnName] || []}
                                    value={filterState?.[passedColumns[4].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setFilterSubscription({ [passedColumns[4].apiParam]: { value, property: [passedColumns[4].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'm_status_label.requestStatus'), [passedColumns[4].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                },
                customBodyRender: (value) => {
                    let { icon, color } = getStatusProps(value.id);
                    return <Chip style={{ backgroundColor: color, color: 'white' }}
                        icon={icon}
                        label={value.name || I18n.t('invalid')}
                    />;
                }
            }
        }, {
            name: passedColumns[5].columnName,
            label: I18n.t(passedColumns[5].columnLabel),
            options: {
                filter: false,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t([passedColumns[5].columnLabel])]}</Typography>
                                <PickySelect
                                    id={passedColumns[5].columnName}
                                    name={passedColumns[5].columnName}
                                    options={filterOptions[passedColumns[5].columnName] || []}
                                    value={filterState?.[passedColumns[5].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setFilterSubscription({ [passedColumns[5].apiParam]: { value, property: [passedColumns[5].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'm_service_config_label.serviceName'), [passedColumns[5].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        }, {
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
                                <Typography variant='h7'>{[I18n.t([passedColumns[6].columnLabel])]}</Typography>
                                <PickySelect
                                    id={passedColumns[6].columnName}
                                    name={passedColumns[6].columnName}
                                    options={filterOptions[passedColumns[6].columnName] || []}
                                    value={filterState?.[passedColumns[6].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setFilterSubscription({ [passedColumns[6].apiParam]: { value, property: [passedColumns[6].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'm_service_type_label.serviceType'), [passedColumns[6].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        }, {
            name: passedColumns[7].columnName,
            label: I18n.t(passedColumns[7].columnLabel),
            options: {
                filter: false
            }
        }, {
            name: passedColumns[8].columnName,
            label: I18n.t(passedColumns[8].columnLabel),
            options: {
                filter: false,
                customBodyRender: (value) => _.get(value, 'name', EMPTY_VALUE)
            }
        }, {
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
                                <Typography variant='h7'>{[I18n.t([passedColumns[9].columnLabel])]}</Typography>
                                <PickySelect
                                    id={passedColumns[9].columnName}
                                    name={passedColumns[9].columnName}
                                    options={filterOptions[passedColumns[9].columnName] || []}
                                    value={filterState?.[passedColumns[9].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setFilterSubscription({ [passedColumns[9].apiParam]: { value, property: [passedColumns[9].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'user.serviceWorkerName'), [passedColumns[9].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        }, {
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
                                <Typography variant='h7'>{[I18n.t([passedColumns[10].columnLabel])]}</Typography>
                                <PickySelect
                                    id={passedColumns[10].columnName}
                                    name={passedColumns[10].columnName}
                                    options={filterOptions[passedColumns[10].columnName] || []}
                                    value={filterState?.[passedColumns[10].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setFilterSubscription({ [passedColumns[10].apiParam]: { value, property: [passedColumns[10].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'm_service_provider_type.serviceProvider'), [passedColumns[10].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        }, {
            name: passedColumns[11].columnName,
            label: I18n.t(passedColumns[11].columnLabel),
            options: {
                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t([passedColumns[11].columnLabel])]}</Typography>
                                <PickySelect
                                    id={passedColumns[11].columnName}
                                    name={passedColumns[11].columnName}
                                    options={filterOptions[passedColumns[11].columnName] || []}
                                    value={filterState?.[passedColumns[11].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setFilterSubscription({ [passedColumns[11].apiParam]: { value, property: [passedColumns[11].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'user.supervisorName'), [passedColumns[11].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        }, {
            name: passedColumns[12].columnName,
            label: I18n.t(passedColumns[12].columnLabel),
            options: {
                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{[I18n.t([passedColumns[12].columnLabel])]}</Typography>
                                <PickySelect
                                    id={passedColumns[12].columnName}
                                    name={passedColumns[12].columnName}
                                    options={optInValue || []}
                                    value={filterState?.[passedColumns[12].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setFilterSubscription({ [passedColumns[12].apiParam]: { value, property: [passedColumns[12].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, 'customer_service_optin_optout_request.opt_in'), [passedColumns[12].columnName]);
                                    }}
                                />
                            </>
                        );

                    }
                },
                customBodyRender: (value) => {
                    return <Switch checked={value || false}
                        tooltip={_.capitalize(value || false)} />;
                }
            }
        }, {
            name: passedColumns[13].columnName,
            label: I18n.t(passedColumns[13].columnLabel),
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return _.get(value, 'name', '');
                }
            }
        }, {
            name: passedColumns[14].columnName,
            label: I18n.t(passedColumns[14].columnLabel),
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return convertToLocal(value);
                }
            }
        }, {
            name: passedColumns[15].columnName,
            label: I18n.t(passedColumns[15].columnLabel),
            options: {
                filter: false,
                customBodyRender: (value) => {
                    return convertToLocal(value);
                }
            }
        },
        {
            name: passedColumns[16].columnName,
            label: I18n.t(passedColumns[16].columnLabel),
            options: {
                filter: false,
                display: 'excluded',
                customBodyRender: (value) => _.get(value, 'name', EMPTY_VALUE)
            }
        },
        {
            name: passedColumns[17].columnName,
            label: I18n.t(passedColumns[17].columnLabel),
            options: {
                filter: false,
                display: 'excluded',
                customBodyRender: (value) => _.get(value, 'name', EMPTY_VALUE)
            }
        },
        {
            name: passedColumns[18].columnName,
            label: I18n.t(passedColumns[18].columnLabel),
            options: {
                filter: false,
                display: 'excluded',
                customBodyRender: (value) => _.get(value, 'name', EMPTY_VALUE)
            }
        },
        {
            name: passedColumns[19].columnName,
            label: I18n.t(passedColumns[19].columnLabel),
            options: {
                filter: false,
                display: 'excluded',
                customBodyRender: (value) => _.get(value, 'name', EMPTY_VALUE)
            }
        }
    ];

    const openServiceWorkerModal = ({ organization, serviceProvider, ward, specialId }) => {
        let organizationId = _.get(organization, 'id', null);
        let serviceProviderId = _.get(serviceProvider, 'id', null);
        let wardId = _.get(ward, 'id', null);
        dispatch(commonActions.getAllSwSuperVisorUnderWard({ organizationId, serviceProviderId, wardId }));
        setIsOpenAssignServiceWorker(true);
        setModalOrganization(organization);
        setModalServiceRequestId(specialId);
        setModalServiceProvider(serviceProvider);
        setModalWard(ward);
        setModalSupervisor({});

        props.change('ward', ward || null);
        props.change('serviceProvider', serviceProvider || null);
        props.change('superVisor', getEmptyPicky());
        props.change('serviceWorker', getEmptyPicky());
    };
    const showActionMenu =
        hasAccessPermission(RESOURCE_MAPPING.SUBSCRIPTION_REQUEST, ACTION_MAPPING.SUBSCRIPTION_REQUEST.APPROVE) ||
        hasAccessPermission(RESOURCE_MAPPING.SUBSCRIPTION_REQUEST, ACTION_MAPPING.SUBSCRIPTION_REQUEST.DECLINE);
    if (showActionMenu) {
        let actions = {
            name: 'Actions',
            label: I18n.t('actions'),
            options: {
                ...TABLE_STICKY_ACTIONS,
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    let { rowData } = tableMeta;
                    let statusId = _.get(rowData[_.findIndex(passedColumns, ['columnName', 'requestStatus'])], 'id', null);
                    let menuActions = [];
                    let organization = getTableData(rowData, columProps, 'organization');
                    let specialId = getTableData(rowData, columProps, 'id');
                    let organizationId = _.get(organization, 'id', null);
                    let serviceProvider = getTableData(rowData, columProps, 'serviceProvider');
                    let serviceProviderId = _.get(serviceProvider, 'id', null);
                    let serviceWorkerId = _.get(getTableData(rowData, columProps, 'serviceWorker'), 'id', null);

                    let superVisor = getTableData(rowData, columProps, 'supervisor');
                    let supervisorId = _.get(superVisor, 'id', null);


                    let ward = getTableData(rowData, columProps, 'ward');
                    let wardId = _.get(ward, 'id', null);
                    if (serviceWorkerId === 0 && supervisorId === 0 && organizationId && serviceProviderId && specialId && wardId) {
                        menuActions.push({ name: I18n.t('assignServiceWorker'), fn: () => openServiceWorkerModal({ specialId, organization, serviceProvider, ward }) });
                    }
                    if (serviceWorkerId && supervisorId) {
                        if (statusId === STATUS_RECORD.SERVICE_ENROLLMENT_REQUESTED) {
                            if (hasAccessPermission(RESOURCE_MAPPING.SUBSCRIPTION_REQUEST, ACTION_MAPPING.SUBSCRIPTION_REQUEST.APPROVE)) {
                                menuActions.push({ name: I18n.t('approve'), fn: () => makeDecision({ data: rowData, type: ACTION_TYPES.ACCEPT }) });
                            }
                            if (hasAccessPermission(RESOURCE_MAPPING.SUBSCRIPTION_REQUEST, ACTION_MAPPING.SUBSCRIPTION_REQUEST.DECLINE)) {
                                menuActions.push({ name: I18n.t('reject'), fn: () => makeDecision({ data: rowData, type: ACTION_TYPES.REJECT }) });
                            }
                        }

                    }
                    return <DottedMenu options={menuActions} />;
                }
            }
        };
        columProps.push(actions);
    }

    return (
        <>
            <MUIDataTable
                title={I18n.t('subscription_request')}
                data={content}
                columns={columProps}
                options={options}
                requestInProgress={requestInProgress}
            />
            <Dialog
                open={isOpenAssignServiceWorker}
                onClose={() => setIsOpenAssignServiceWorker(false)}
                scroll='paper'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                TransitionComponent={Transition}
                fullWidth
                maxWidth="sm"
            >
                <Form onSubmit={props.handleSubmit(submit)}>
                    <DialogTitle id="scroll-dialog-title" style={{ backgroundColor: Colors['color-basic-800'] }}>
                        <Typography style={{ color: 'white', fontWeight: 800 }} >{I18n.t('assignServiceWorker')}</Typography></DialogTitle>
                    <DialogContent dividers={true}>
                        <DialogContentText
                            id="scroll-dialog-description"
                            ref={descriptionElementRef}
                            style={styles.content}
                        >
                            <LoadingOverlay active={false}>
                                <Grid container direction="row"
                                    justify="center"
                                    alignItems="center" spacing={2}>
                                    <Field disabled={true} name='ward' label={I18n.t('ward')} component={renderSelect} />
                                    <Field disabled={true} name='serviceProvider' label={I18n.t('serviceProvider')} component={renderSelect} />
                                    <Field spinnerProps={_.get(swSupervisors, 'requestInProgress', false)} name='superVisor' label={I18n.t('superVisor')} component={renderSelect}
                                        onChange={(item) => {
                                            setModalSupervisor(item);
                                            props.change('serviceWorker', getEmptyPicky());
                                            let organizationId = _.get(modalOrganization, 'id', null);
                                            let serviceProviderId = _.get(modalServiceProvider, 'id', null);
                                            let wardId = _.get(modalWard, 'id', null);
                                            let supervisorId = _.get(item, 'id', null);
                                            if (organizationId && serviceProviderId && wardId && supervisorId) {
                                                dispatch(commonActions.getAllServiceWorkersUnderSupervisor({ organizationId, serviceProviderId, wardId, supervisorId }));
                                            } else {
                                                // need to handle messages
                                                alert('parameter Missing');
                                            }
                                        }}>
                                        {
                                            _.get(swSupervisors, `data[${_.get(modalWard, 'id', 0)}]`, [])
                                        }
                                    </Field>
                                    <Field spinnerProps={_.get(serviceWorkers, 'requestInProgress', false)} name='serviceWorker' label={I18n.t('serviceWorker')} component={renderSelect}
                                    >
                                        {
                                            _.get(serviceWorkers, `data[${_.get(modalSupervisor, 'id', 0)}]`, [])
                                        }
                                    </Field>
                                </Grid>
                            </LoadingOverlay>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={styles.content}><Button onClick={() => setIsOpenAssignServiceWorker(false)}>
                        {I18n.t('cancel')}
                    </Button>
                        <Button type='submit' autoFocus disabled={false}>
                            {I18n.t('assign')}
                        </Button>
                    </DialogActions>
                </Form>
            </Dialog >
        </>
    );
};

const mapStateToProps = createStructuredSelector({
    subscriptions: getSubscriptions,
    tableProps: getTableProps,
    modalProps: getAssignServiceWorker

});

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_SUBSCRIPTIONS, url: URL.SUBSCRIPTION_REQUEST.LIST_SUBSCRIPTIONS }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_SUBSCRIPTIONS }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_SUBSCRIPTIONS, passedColumns: data })),
    setFilterSubscription: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_SUBSCRIPTIONS, filterState: data }));
    },
    loadSubscriptions: (data) => dispatch(Actions.fetchAllSubscriptions(data)),
    processSubscriptionRequest: (data) => dispatch(Actions.processSubscriptionRequest(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_SUBSCRIPTIONS }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_SUBSCRIPTIONS, pagination: data }));
        dispatch(Actions.fetchAllSubscriptions());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_SUBSCRIPTIONS, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_SUBSCRIPTIONS, pagination: data }))
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'SubscriptionRequest',
    enableReinitialize: true
})(SubscriptionRequest));
