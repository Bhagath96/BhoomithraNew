import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm, Form, reset } from 'redux-form';
import utils from '../../../utils';
import { assignComplaintsServiceWorker, fetchComplaintDetails } from '../actions';
import * as commonActions from '../../common/actions';
import { createStructuredSelector } from 'reselect';
import { TABLE_IDS, BASE64_APPEND } from '../constant';
import { Components, I18n } from '../../../common/components';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
import { getAssignServiceWorker, getTableProps } from '../../common/selectors';
import { getComplaintList } from '../selectors';
import { URL } from '../../../common';
import { onFilterChangeFn } from '../../../utils/ApiUtils';
import { resetTableDropdownFilterList, fetchTableDropdownFilterList, setTablePagination, setTableFilterChips, setTableFilterState, setPassedColumns, resetFilter, setFilterValuesFromInitialStates } from '../../common/actions';
import { convertToLocal, convertToLocalDate } from '../../../utils/DateUtils';
import isBase64 from 'is-base64';
import { renderSelect } from '../../../utils/FormUtils';
import DottedMenu from '../../../common/components/custom/DottedMenu';
import Colors from '../../../common/components/custom/Colors';

import { Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from '@material-ui/core';
import { getEmptyPicky, getTableData } from '../../../utils/CommonUtils';
import { EMPTY_VALUE } from '../../customers/constants';

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

const { MUIDataTable, PickySelect, Button, LoadingOverlay, Dialog: DialogCustom } = Components;
const { lodashUtils: _ } = utils;

function ListComplaint(props) {

    const dispatch = useDispatch();
    const {
        listComplaints: { requestInProgress = false, data: { content = [] } = {}, searchKeys },
        modalProps: { serviceProviders = {}, swSupervisors = {}, serviceWorkers = {} } } = props;
    const { getDropdownFilterList, setComplaintFilter, setPassedColumnsForTable, setPagination, setChips, setPageProps, loadComplaints } = props;
    const { tableProps: { [TABLE_IDS.LIST_COMPLAINT]: { filterState = {}, filterOptions = {}, pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} } } = useSelector(state => state.common);
    const [selectedValue, setSelectedValueForPopup] = React.useState('');
    const [isOpenAssignServiceWorker, setIsOpenAssignServiceWorker] = React.useState(false);
    const descriptionElementRef = React.useRef(null);
    const [modalOrganization, setModalOrganization] = React.useState(null);
    const [modalServiceProvider, setModalServiceProvider] = React.useState(null);
    const [modalSupervisor, setModalSupervisor] = React.useState(null);
    const [modalWard, setModalWard] = React.useState(null);
    const [modalComplaintId, setModalComplaintId] = React.useState(null);

    useEffect(() => {
        if (isOpenAssignServiceWorker) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [isOpenAssignServiceWorker]);

    const passedColumns = [
        { columnLabel: 'id', columnName: 'id', apiParam: 'id', filterBy: 'id' },
        { columnLabel: 'customer_name', columnName: 'customerName', apiParam: 'customerNames', filterBy: 'name', searchKey: 'customer.customerName' },
        { columnLabel: 'complaint_label', columnName: 'complaintLabel', apiParam: 'complaintLabels', filterBy: 'name', searchKey: 'm_complaint_config_label.complaintName' },
        { columnLabel: 'complaint_status', columnName: 'complaintStatus.name', apiParam: 'complaintStatuses', filterBy: 'name', searchKey: 'm_status_label.requestStatus' },
        { columnLabel: 'photo', columnName: 'photo', apiParam: '', filterBy: 'name' },
        { columnLabel: 'organization', columnName: 'organization.name', apiParam: 'organizations', filterBy: 'name', searchKey: 'organization.name' },
        { columnLabel: 'service_provider', columnName: 'serviceProvider.name', apiParam: 'serviceProviders', filterBy: 'name', searchKey: 'organization_service_provider.serviceProviderName' },
        { columnLabel: 'service_worker', columnName: 'serviceWorker.name', apiParam: 'serviceWorkers', filterBy: 'name', searchKey: 'user.serviceWorkerName' },
        { columnLabel: 'supervisor', columnName: 'supervisor.name', apiParam: 'supervisors', filterBy: 'name', searchKey: 'user.supervisorName' },
        { columnLabel: 'service_type', columnName: 'serviceType.name', apiParam: 'serviceTypes', filterBy: 'name', searchKey: 'm_service_type_label.serviceType' },
        { columnLabel: 'complaint_raised_by', columnName: 'raisedBy.name', apiParam: '', filterBy: 'name', searchKey: '' },
        { columnLabel: 'reported_date', columnName: 'reportedDate', apiParam: 'reportedDate', filterBy: 'id', searchKey: 'complaint.reportedDate' },
        { columnLabel: 'resolved_at', columnName: 'resolvedAt', apiParam: '', filterBy: 'name', searchKey: '' },
        { columnLabel: 'last_escalated_to', columnName: 'lastEscalatedTo.name', apiParam: 'lastEscalatedTo', filterBy: 'name', searchKey: 'complaint.lastEscalatedTo' },
        { columnLabel: 'last_escalated_at', columnName: 'lastEscalatedAt', apiParam: 'lastEscalatedAt', filterBy: 'id', searchKey: 'complaint.lastEscalatedAt' },
        { columnLabel: 'ward', columnName: 'ward', apiParam: 'wards', filterBy: 'name', searchKey: 'complaint.ward' },
        { columnLabel: 'organization', columnName: 'organization', apiParam: 'organizations', filterBy: 'name', searchKey: 'organization.name' },
        { columnLabel: 'service_provider', columnName: 'serviceProvider', apiParam: 'serviceProviders', filterBy: 'name', searchKey: 'organization_service_provider.serviceProviderName' }

    ];
    const setFilterItems = (data) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(data);
        loadComplaints();
    };
    useEffect(() => {
        setPassedColumnsForTable(passedColumns);
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(resetFilter({ key: TABLE_IDS.LIST_COMPLAINT }));
        setChips({});
        loadComplaints();
    }, []);

    const columns = [
        {
            name: passedColumns[0].columnName,
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
                                        setComplaintFilter({ [passedColumns[1].apiParam]: { value, property: [passedColumns[1].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, `${passedColumns[1].searchKey}`), [passedColumns[1].columnName]);
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
                                        setComplaintFilter({ [passedColumns[2].apiParam]: { value, property: [passedColumns[2].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, `${passedColumns[2].searchKey}`), [passedColumns[2].columnName]);
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
                                        setComplaintFilter({ [passedColumns[3].apiParam]: { value, property: [passedColumns[3].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, `${passedColumns[3].searchKey}`), [passedColumns[3].columnName]);

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
                customBodyRender: (value) => {
                    return <div>
                        {isBase64(value) ? <img
                            style={{ width: '50px', height: 100, cursor: 'pointer' }}
                            src={`${BASE64_APPEND}${value}`} alt=''
                            onClick={() => setSelectedValueForPopup(`${BASE64_APPEND}${value}`)}
                        /> : <p></p>}
                    </div>;
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
                                        setComplaintFilter({ [passedColumns[5].apiParam]: { value, property: [passedColumns[5].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, `${passedColumns[5].searchKey}`), [passedColumns[5].columnName]);
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
                                        setComplaintFilter({ [passedColumns[6].apiParam]: { value, property: [passedColumns[6].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, `${passedColumns[6].searchKey}`), [passedColumns[6].columnName]);
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
                                        setComplaintFilter({ [passedColumns[7].apiParam]: { value, property: [passedColumns[7].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, `${passedColumns[7].searchKey}`), [passedColumns[7].columnName]);

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
                                        setComplaintFilter({ [passedColumns[8].apiParam]: { value, property: [passedColumns[8].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, `${passedColumns[8].searchKey}`), [passedColumns[8].columnName]);

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
                                        setComplaintFilter({ [passedColumns[9].apiParam]: { value, property: [passedColumns[9].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, `${passedColumns[9].searchKey}`), [passedColumns[9].columnName]);

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
                filter: false
            }
        },
        {
            name: passedColumns[11].columnName,
            label: I18n.t([passedColumns[11].columnLabel]),
            options: {
                filter: true,
                customBodyRender: (value) => convertToLocalDate(value),
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[11].columnLabel])}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[11].columnName] || []}
                                    value={filterState?.[passedColumns[11].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setComplaintFilter({ [passedColumns[11].apiParam]: { value, property: passedColumns[11].filterBy } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, `${passedColumns[11].searchKey}`), [passedColumns[11].columnName]);

                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: passedColumns[12].columnName,
            label: I18n.t([passedColumns[12].columnLabel]),
            options: {
                filter: false,
                customBodyRender: (value) => convertToLocal(value)
            }
        },
        {
            name: passedColumns[13].columnName,
            label: I18n.t([passedColumns[13].columnLabel]),
            options: {
                filter: true,
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[13].columnLabel])}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[13].columnName] || []}
                                    value={filterState?.[passedColumns[13].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setComplaintFilter({ [passedColumns[13].apiParam]: { value, property: [passedColumns[13].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, `${passedColumns[13].searchKey}`), [passedColumns[13].columnName]);

                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: passedColumns[14].columnName,
            label: I18n.t([passedColumns[14].columnLabel]),
            options: {
                filter: true,
                customBodyRender: (value) => convertToLocal(value),
                filterType: 'custom',

                filterOptions: {
                    names: [],
                    display: (filterList, onChange, index, column) => {
                        return (
                            <>
                                <Typography variant='h7'>{I18n.t([passedColumns[14].columnLabel])}</Typography>
                                <PickySelect
                                    id='name'
                                    name='name'
                                    options={filterOptions[passedColumns[14].columnName] || []}
                                    value={filterState?.[passedColumns[14].apiParam]?.value}
                                    multiple={true}
                                    includeSelectAll={true}
                                    includeFilter={true}
                                    onChange={value => {
                                        setComplaintFilter({ [passedColumns[14].apiParam]: { value, property: [passedColumns[14].filterBy] } });
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList(val, _.get(searchKeys, `${passedColumns[14].searchKey}`), [passedColumns[14].columnName]);

                                    }}
                                />
                            </>
                        );

                    }
                }
            }
        },
        {
            name: passedColumns[15].columnName,
            label: I18n.t(passedColumns[15].columnLabel),
            options: {
                filter: false,
                display: 'excluded',
                customBodyRender: (value) => _.get(value, 'name', EMPTY_VALUE)
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
        }

    ];

    const openServiceWorkerModal = ({ organization, complaintId, ward }) => {
        let wardId = _.get(ward, 'id', null);
        dispatch(commonActions.getAllServiceProviderUnderOrg({ organizationId: _.get(organization, 'id', null), wardId }));
        setIsOpenAssignServiceWorker(true);
        setModalOrganization(organization);
        setModalComplaintId(complaintId);
        setModalServiceProvider({});
        setModalWard(ward);
        setModalSupervisor({});
        props.change('ward', ward || null);

        // props.change('ward', getEmptyPicky());
        props.change('serviceProvider', getEmptyPicky());
        props.change('superVisor', getEmptyPicky());
        props.change('serviceWorker', getEmptyPicky());
    };

    const showActionMenu = true;

    if (showActionMenu) {
        let actions = {
            name: 'Actions',
            label: I18n.t('actions'),
            options: {
                ...TABLE_STICKY_ACTIONS,
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    let menuActions = [];
                    let { rowData } = tableMeta;
                    // if (hasAccessPermission(RESOURCE_MAPPING.SCHEDULE, ACTION_MAPPING.SCHEDULE.SHOW_HISTORY)) {
                    let complaintId = getTableData(rowData, columns, 'id');
                    let organization = getTableData(rowData, columns, 'organization');
                    let organizationId = _.get(organization, 'id', null);
                    let serviceProviderId = _.get(getTableData(rowData, columns, 'serviceProvider'), 'id', null);
                    let serviceWorkerId = _.get(getTableData(rowData, columns, 'serviceWorker'), 'id', null);
                    let supervisorId = _.get(getTableData(rowData, columns, 'supervisor'), 'id', null);
                    let ward = getTableData(rowData, columns, 'ward');
                    let wardId = _.get(ward, 'id', null);
                    if (!serviceProviderId && !serviceWorkerId && !supervisorId && organizationId && complaintId && wardId) {
                        menuActions.push({ name: I18n.t('assignServiceWorker'), fn: () => openServiceWorkerModal({ organization, complaintId, ward }) });
                    }
                    // }
                    return <DottedMenu options={menuActions} />;
                }
            }
        };
        columns.push(actions);
    }
    const resettingChip = (chipIndex, chipValue, chipList) => {
        let currentFilters = filterState[passedColumns[chipIndex].apiParam]?.value || [];
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        setComplaintFilter({ [passedColumns[chipIndex].apiParam]: { value: newFilters, property: 'id' } });
        let { filterObj, chipExists } = onFilterChangeFn(chipList, passedColumns);


        //if no chip in table
        if (!chipExists) {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_COMPLAINT }));
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
        onFilterDialogOpen: () => dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_COMPLAINT })),
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(resetFilter({ key: TABLE_IDS.LIST_COMPLAINT }));

                    break;
                default:
                    break;
            }
        }
    };

    const submit = (values) => {
        let request = {
            complaintId: modalComplaintId,
            serviceProviderId: _.get(values, 'serviceProvider.id', null),
            supervisorId: _.get(values, 'superVisor.id', null),
            serviceWorkerId: _.get(values, 'serviceWorker.id', null)
        };
        if (request.complaintId && request.serviceProviderId && request.supervisorId && request.serviceWorkerId) {
            dispatch(assignComplaintsServiceWorker(request));
            setIsOpenAssignServiceWorker(false);
            dispatch(reset('ListComplaint'));
        } else {
            alert(`${I18n.t('missing')} : ${I18n.t('complaint')} ${I18n.t('id')}/${I18n.t('service_provider')}/${I18n.t('supervisor')}/${I18n.t('serviceWorker')}`, 'error');
        }
    };

    return (
        <div>
            <MUIDataTable
                title={I18n.t('complaints')}
                data={content}
                columns={columns}
                options={options}
                requestInProgress={requestInProgress}
            />
            <DialogCustom
                title={selectedValue.toString().includes(BASE64_APPEND) ? I18n.t('photo') : I18n.t('')}
                body={<div style={{ wordBreak: 'break-all', objectFit: 'contain' }}>
                    {selectedValue.toString().includes(BASE64_APPEND) ? <div style={{ textAlign: 'center' }}>
                        <img
                            style={{ width: 360, maxWidth: 360, height: 640 }}
                            src={selectedValue} alt={''}
                            onClick={() => setSelectedValueForPopup(true)}
                        />
                    </div> : <p>{selectedValue}</p>
                    }
                </div>}
                onCancel={() => setSelectedValueForPopup(false)}
                cancelText={I18n.t('ok')}
                isOPen={selectedValue}
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
                            <LoadingOverlay active={requestInProgress}>
                                <Grid container direction="row"
                                    justify="center"
                                    alignItems="center" spacing={2}>
                                    <Field disabled={true} name='ward' label={I18n.t('ward')} component={renderSelect} />
                                    <Field spinnerProps={_.get(serviceProviders, 'requestInProgress', false)} name='serviceProvider' label={I18n.t('serviceProvider')} component={renderSelect}
                                        onChange={(item) => {
                                            setModalServiceProvider(item);
                                            // setModalWard({});
                                            setModalSupervisor({});
                                            // props.change('ward', getEmptyPicky());
                                            props.change('superVisor', getEmptyPicky());
                                            props.change('serviceWorker', getEmptyPicky());
                                            let organizationId = _.get(modalOrganization, 'id', null);
                                            let serviceProviderId = _.get(item, 'id', null);
                                            let wardId = _.get(modalWard, 'id', null);
                                            if (organizationId && serviceProviderId && wardId) {
                                                // dispatch(commonActions.getAllWardsUnderServiceProvider({ organizationId, serviceProviderId }));
                                                dispatch(commonActions.getAllSwSuperVisorUnderWard({ organizationId, serviceProviderId, wardId }));
                                            } else {
                                                // need to handle messages
                                                alert('parameter Missing');
                                            }
                                        }}>
                                        {
                                            _.get(serviceProviders, `data[${_.get(modalOrganization, 'id', null)}]`, [])
                                        }
                                    </Field>


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
                                    <Field spinnerProps={_.get(serviceWorkers, 'requestInProgress', false)} name='serviceWorker' label={I18n.t('serviceWorker')} component={renderSelect}>
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
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    listComplaints: getComplaintList,
    tableProps: getTableProps,
    modalProps: getAssignServiceWorker
});

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: (searchValue, searchKey, columnName) => {
        if (searchValue && searchValue?.length > 2) {
            dispatch(fetchTableDropdownFilterList({ searchValue, searchKey, columnName, key: TABLE_IDS.LIST_COMPLAINT, url: URL.COMPLAINT.LIST_COMPLAINT }));
        }
        if (searchValue === '') {
            dispatch(setFilterValuesFromInitialStates({ key: TABLE_IDS.LIST_COMPLAINT }));
        }
    },
    setPassedColumnsForTable: (data) => dispatch(setPassedColumns({ key: TABLE_IDS.LIST_COMPLAINT, passedColumns: data })),
    setComplaintFilter: (data) => {
        dispatch(setTableFilterState({ key: TABLE_IDS.LIST_COMPLAINT, filterState: data }));
    },
    loadComplaints: (data) => dispatch(fetchComplaintDetails(data)),
    setPageProps: (data) => {
        dispatch(resetTableDropdownFilterList({ key: TABLE_IDS.LIST_COMPLAINT }));
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_COMPLAINT, pagination: data }));
        dispatch(fetchComplaintDetails());
    },
    setChips: (data) => dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_COMPLAINT, chips: data })),
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_COMPLAINT, pagination: data }))
});

const validateAssignServiceWorker = (values) => {
    const errors = {};
    if (_.get(values, 'ward.id', null) === null) {
        errors.ward = I18n.t('required', { type: I18n.t('ward') });
    }
    if (_.get(values, 'serviceProvider.id', null) === null) {
        errors.serviceProvider = I18n.t('required', { type: I18n.t('serviceProvider') });
    }
    if (_.get(values, 'superVisor.id', null) === null) {
        errors.superVisor = I18n.t('required', { type: I18n.t('superVisor') });
    }
    if (_.get(values, 'serviceWorker.id', null) === null) {
        errors.serviceWorker = I18n.t('required', { type: I18n.t('serviceWorker') });
    }
    return errors;
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'ListComplaint',
    enableReinitialize: true,
    validate: validateAssignServiceWorker
})(ListComplaint));
