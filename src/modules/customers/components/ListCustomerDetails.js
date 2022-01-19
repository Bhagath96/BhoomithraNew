import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import Swal from 'sweetalert2';
import { createStructuredSelector } from 'reselect';
import { Grid } from '@material-ui/core';

import { history } from '../../../common';
import { PATH } from '../../../routes';
import utils from '../../../utils';
import { COLUMN_ORDER, EMPTY_VALUE, STATE_REDUCER_KEY, TABLE_IDS } from '../constants';
import { deleteCustomerDetails, resetFilter, setFilter, listJsonData } from '../actions';
import { Components, I18n } from '../../../common/components';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { MUI_COMMON_OPTIONS, DEFAULT_TABLE_PROPS, TABLE_STICKY_ACTIONS } from '../../../common/constants';
const { MUIDataTable, DottedMenu, PickySelect, AlertDialog, StatusModal, Dialog, CustomRadio } = Components;
const { apiUtils: { getKeyByValue, convertKeyValuesToBase64 }, lodashUtils: _ } = utils;
import { STATE_REDUCER_KEY as DFG_STATE_REDUCER_KEY } from '../../dfg/constants';
import { tableFilterDestructuringArray } from '../../../utils/ApiUtils';
import { getTableProps } from '../../common/selectors';
import { setTablePagination, setTableFilterChips } from '../../common/actions';
import * as dfgActions from '../../dfg/actions';
import * as Actions from '../actions';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';

const ListCustomerDetails = (props) => {
    const dispatch = useDispatch();
    const { setPagination, setChips, setPageProps, loadFragment, tableProps: { [TABLE_IDS.LIST_CUSTOMERS]: { pagination: { page, size, count } = DEFAULT_TABLE_PROPS } = {} }, getDropdownFilterList } = props;
    const { currentFilterState: filterState = {}, filterResponse, listCustomerDetails: { data: { headers = {}, newHeader = {}, response = [] } = {}, requestInProgress = false } = {} } = useSelector(state => state[STATE_REDUCER_KEY]);
    const { completedSurveys = {} } = useSelector(state => state[DFG_STATE_REDUCER_KEY]);
    const [open, setOpen] = React.useState(false);
    const [serviceEnrollmentDetails, setServiceEnrollmentDetails] = React.useState([]);
    const [serviceEnrollmentTypeId, setServiceEnrollmentTypeId] = React.useState('');
    const [selectedSurveyId, setSelectedSurveyId] = React.useState(null);

    const deletePressed = (rowData) => {
        Swal.fire({
            title: I18n.t('are_you_sure_to_delete'),
            showCancelButton: true,
            confirmButtonText: I18n.t('yes'),
            cancelButtonText: I18n.t('no')
        }).then((result) => {
            if (result.value) {
                dispatch(deleteCustomerDetails({ surveyId: rowData[0] }));
            }
        });
    };

    const editPressed = (rowData) => {
        dispatch(Actions.editCustomerDetails({
            surveyId: rowData[0]
        }));
    };

    const getAdditionalInfoDetails = (additionalInfo = [], key = '') => {
        let info = _.find(additionalInfo, ['key', key]);
        return info ? info : {};
    };

    const startCustomerServiceEnrollment = () => {
        if (selectedSurveyId && serviceEnrollmentTypeId) {
            dispatch(Actions.customerServiceEnrollmentDetails({ surveyId: selectedSurveyId, templateTypeId: serviceEnrollmentTypeId }));
        } else {
            Swal.fire(I18n.t('missing'), `${I18n.t('survey_id')} / ${I18n.t('template_type_id')}  ${I18n.t('missing')}`, 'error');
        }
    };

    const generateModalBody = (details = []) => {
        let body = details.map((detail, index) => {
            let surveyId = _.get(detail, 'serviceEnrollmentId', null);
            if (!selectedSurveyId && surveyId && index === 0) {
                setSelectedSurveyId(surveyId);
            }
            return <>
                <Grid item xs={1}><CustomRadio checked={selectedSurveyId === surveyId}
                    onChange={() => setSelectedSurveyId(surveyId)}
                    value={surveyId}
                    name="radio-buttons" /></Grid>
                <Grid item xs={4}>{_.get(detail, 'serviceWorker.name', EMPTY_VALUE)}</Grid>
                <Grid item xs={7}>{_.get(detail, 'serviceEnrollmentId', EMPTY_VALUE)}</Grid>
            </>;
        });
        return [
            <>
                <Grid item xs={1}></Grid>
                <Grid item xs={4}>{I18n.t('service_worker')}</Grid>
                <Grid item xs={7}>{I18n.t('survey_id')}</Grid>
            </>,
            ...body || []
        ];
    };

    const qrEnrollment = ({ qrCodeEnrollment, qrCodeEnrollmentTemplateType, organizationId, customerEnrollmentId }) => {
        let surveyId = _.get(qrCodeEnrollment, 'value', undefined);
        let templateTypeId = _.get(qrCodeEnrollmentTemplateType, 'value', undefined);
        if (surveyId && templateTypeId) {
            dispatch(Actions.customerQREnrollmentDetails({ surveyId, templateTypeId, organizationId }));
        } else {
            dispatch(Actions.customerQREnrollmentDetails({ templateTypeId, organizationId, customerEnrollmentId }));
        }
    };

    const viewPressed = (rowData) => {
        let id = rowData[0];
        history.push(`${PATH.CUSTOMER_DATA}/${id}/view`);
    };

    const startServiceEnrollment = ({ enrollmentDetails, enrollmentTypeId }) => {
        setServiceEnrollmentDetails(enrollmentDetails);
        setServiceEnrollmentTypeId(enrollmentTypeId);
        setSelectedSurveyId(null);
        setOpen(true);

    };

    const showActionMenu = true;
    const getAction = () => {
        return ({
            filter: false,
            ...TABLE_STICKY_ACTIONS,
            customBodyRender: (value, tableMeta) => {
                let { rowData, tableData, rowIndex } = tableMeta;
                let additionalInfo = _.get(tableData[rowIndex] || {}, 'additionalInfo', []);
                let customerEnrollmentId = _.get(tableData[rowIndex] || {}, 'id', undefined);
                let menuActions = [{ name: I18n.t('view'), fn: () => viewPressed(rowData) }];
                if (hasAccessPermission(RESOURCE_MAPPING.CUSTOMER, ACTION_MAPPING.CUSTOMER.EDIT_CUSTOMER)) {
                    menuActions.push({ name: I18n.t('edit'), fn: () => editPressed(rowData) });
                }
                if (hasAccessPermission(RESOURCE_MAPPING.CUSTOMER, ACTION_MAPPING.CUSTOMER.DELETE_CUSTOMER)) {
                    menuActions.push({ name: I18n.t('delete'), fn: () => deletePressed(rowData) });
                }
                if (hasAccessPermission(RESOURCE_MAPPING.SERVICE_ENROLLMENT, ACTION_MAPPING.CUSTOMER.EDIT_SERVICE_ENROLLMENT)) {
                    let serviceEnrollments = getAdditionalInfoDetails(additionalInfo, 'serviceEnrollments');
                    let enrollmentDetails = _.get(serviceEnrollments, 'value', []);
                    let serviceEnrollmentTemplateType = getAdditionalInfoDetails(additionalInfo, 'serviceEnrollmentTemplateTypeId');
                    let enrollmentTypeId = _.get(serviceEnrollmentTemplateType, 'value', null);

                    if (enrollmentDetails.length > 0 && enrollmentTypeId) {
                        menuActions.push({
                            name: I18n.t('service_enrollment'), fn: () => {
                                startServiceEnrollment({ enrollmentDetails, enrollmentTypeId });
                            }
                        });
                    }
                }
                let qrCodeEnrollment = getAdditionalInfoDetails(additionalInfo, 'qrCodeEnrollmentId');
                let qrCodeEnrollmentTemplateType = getAdditionalInfoDetails(additionalInfo, 'qrCodeEnrollmentTemplateTypeId');
                let organizationId = _.get(getAdditionalInfoDetails(additionalInfo, 'organizationId'), 'value', undefined);
                menuActions.push({ name: I18n.t('qr_enrollment'), fn: () => qrEnrollment({ qrCodeEnrollment, qrCodeEnrollmentTemplateType, organizationId, customerEnrollmentId }) });
                return (
                    <DottedMenu options={menuActions} />
                );
            }
        });
    };

    const getOptions = () => {
        return ({
            display: 'excluded',
            filter: false
        });
    };

    const getTableHeaders = () => {
        const tempHeaders = {};
        for (const column in COLUMN_ORDER) {
            tempHeaders[column] = I18n.t(COLUMN_ORDER[column]);
            if (_.has(headers, column)) {
                delete headers[column];
            }
        }
        let sortedHeaders = { ...tempHeaders, ...headers };
        let tableHeader = [];
        tableHeader.push({
            name: 'id', label: I18n.t('id'), options: getOptions()
        });
        _.forEach(sortedHeaders, (header) => {
            let key = getKeyByValue(sortedHeaders, header);
            tableHeader.push({
                name: key,
                label: header,
                options: {
                    filterType: 'custom',
                    filter: true,
                    filterOptions: {
                        names: [],
                        display: (filterList, onChange, index, column) => {
                            return (

                                <PickySelect
                                    label={header}
                                    id={`id_${key} `}
                                    name={header}
                                    options={filterResponse[key] || []}
                                    value={filterState?.[key]?.value}
                                    multiple={true}
                                    onChange={(value) => {
                                        //storing values to reducer when picky is selected
                                        dispatch(setFilter({ [key]: { value, property: 'name' } }));
                                        filterList[index] = value.map(val => val.name);
                                        onChange(filterList[index], index, column);
                                    }}
                                    dropdownHeight={600}
                                    getFilterValue={val => {
                                        getDropdownFilterList({ searchValue: val, searchKey: key, columnName: key });
                                    }}
                                />
                            );

                        }
                    }
                }
            });
        });
        tableHeader.push({
            name: 'Actions', label: I18n.t('actions'), options: showActionMenu ? getAction() : {}
        });
        tableHeader.push({
            name: 'additionalInfo', label: '', options: getOptions()
        });
        tableHeader.push({
            name: 'dataSources', label: '', options: getOptions()
        });
        return tableHeader;
    };

    useEffect(() => {
        setPagination(DEFAULT_TABLE_PROPS);
        dispatch(Actions.resetFilter());
        setChips({});
        // changeOverlayModal(false);
    }, []);

    const setFilterItems = (val) => {
        setPagination(DEFAULT_TABLE_PROPS);
        setChips(val);
        loadFragment();
    };
    useEffect(() => {
        setFilterItems(tableFilterDestructuringArray(filterState));
    }, [filterState]);

    const generatePassedColumns = () => {
        let columns = [];
        const tempHeaders = {};
        for (const column in COLUMN_ORDER) {
            tempHeaders[column] = I18n.t(COLUMN_ORDER[column]);
            if (_.has(newHeader, column)) {
                delete headers[column];
            }
        }
        let sortedHeaders = { ...tempHeaders, ...newHeader };
        _.forEach(sortedHeaders, (header) => {
            let key = getKeyByValue(newHeader, header);
            columns.push({ columnLabel: header, columnName: key, apiParam: key, filterBy: 'name' });
        });
        return columns;
    };

    const resetChip = ({ index: chipIndex, removedFilter: chipValue, filterList: chipList }) => {
        let passedColumns = generatePassedColumns() || [];
        let currentFilters = _.get(filterState, `${passedColumns[chipIndex - 1].columnName}.value`, []);
        let newFilters = _.remove(currentFilters, (item) => item.name !== chipValue);
        dispatch(setFilter({ [passedColumns[chipIndex - 1]?.apiParam]: { value: newFilters, property: 'id' } }));
        let newObj = {}, chipExists = false;
        chipList?.map((item, index) => {
            if (item.length > 0) {
                chipExists = true;
                _.set(newObj, `passedColumns.${index}.apiParam`, `${item} `);
            }
        });
        // let newFilterItem = convertKeyValuesToBase64(newObj);
        // if no chip in table
        if (!chipExists) {
            dispatch(resetFilter());
        } else {
            setFilterItems(newObj);
        }
    };

    const options = {
        ...MUI_COMMON_OPTIONS,
        page: page,
        rowsPerPage: size,
        count: count,
        onFilterChipClose: (index, removedFilter, filterList) => {
            //function to call when one chip is closed
            resetChip({ index, removedFilter, filterList });
        },
        onTableChange: (action, tableState) => {
            switch (action) {
                case 'changePage':
                    setPageProps({ page: tableState.page });
                    break;
                case 'changeRowsPerPage':
                    setPageProps({ page: 0, size: tableState.rowsPerPage });
                    break;
                case 'resetFilters':
                    dispatch(Actions.resetFilter());
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
                title={I18n.t('customers')}
                data={response}
                columns={getTableHeaders()}
                options={options}
                requestInProgress={requestInProgress}
            />
            <Dialog
                isOPen={open}
                title={I18n.t('please_select_value')}
                body={
                    <Grid container spacing={2}>
                        {generateModalBody(serviceEnrollmentDetails)}
                    </Grid>
                }
                disableOk={!selectedSurveyId || !serviceEnrollmentTypeId}
                onOk={() => startCustomerServiceEnrollment()}
                okText={I18n.t('edit')}
                onCancel={() => setOpen(false)}
                cancelText={I18n.t('cancel')}
                requestInProgress={false}
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
                    icon={<CloudDownloadOutlinedIcon />}
                    content={I18n.t('downloading_survey_data')}
                />
            }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    tableProps: getTableProps
});

const mapDispatchToProps = dispatch => ({
    getDropdownFilterList: ({ searchValue, searchKey, columnName }) => {
        if (searchValue && searchValue?.length > 1) {
            dispatch(listJsonData({ searchValue, searchKey, columnName }));
        }
        if (searchValue === '') {
            dispatch(Actions.setFilterValuesFromInitialStates());
        }
    },
    loadFragment: (data) => dispatch(Actions.fetchCustomerDetails(data)),
    setPageProps: (data) => {
        dispatch(Actions.resetTableDropdownFilterListForCustomers());
        dispatch(setTablePagination({ key: TABLE_IDS.LIST_CUSTOMERS, pagination: data }));
        dispatch(Actions.fetchCustomerDetails());
    },
    setChips: (data) => {
        let newFilterItem = convertKeyValuesToBase64(data);
        dispatch(setTableFilterChips({ key: TABLE_IDS.LIST_CUSTOMERS, chips: newFilterItem }));
    },
    setPagination: (data) => dispatch(setTablePagination({ key: TABLE_IDS.LIST_CUSTOMERS, pagination: data }))
});


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'ListCustomerDetailsView',
    enableReinitialize: true
})(ListCustomerDetails));

