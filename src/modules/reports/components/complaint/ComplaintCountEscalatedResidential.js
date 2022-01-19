import React, { forwardRef, useState } from 'react';
// import utils from '../../../utils';
import { Field, Form, reduxForm } from 'redux-form';
import { Components, I18n } from '../../../../common/components';
import { MUI_COMMON_OPTIONS } from '../../../../common/constants';
import { HandleExport } from '../../../../common/components/handleExport';
import { renderSimpleSelect } from '../../../../utils/FormUtils';
import DatePicker from 'react-datepicker';
import { withStyles } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { getReportInfo } from '../../../../utils/PdfMakeUtils';
import { getExcelTableData, getPdfTableData } from '../../../../utils/ReportUtils';
import { hasAccessPermission } from '../../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../../common/Permissions';


const { Button, Card, Grid, Typography } = Components;


const { MUIDataTable } = Components;
// const { lodashUtils: _ } = utils;
const DatePickerButton = withStyles(() => ({
    root: {
        backgroundColor: 'white',
        border: '1px solid grey !important',
        '&:hover': {
            backgroundColor: 'white'
        }
    },
    label: {
        color: 'black',
        '&:hover': {
            color: 'black'
        }
    },
    startIcon: {
        color: 'black'
    }
}))(Button);

function ComplaintCountEscalatedResidentialReport() {
    const DATE_FORMAT = 'dd-MM-yyyy';
    const [CommonFilter, setCommonFilter] = useState({});
    const columns = [{ name: 'CustomerName', label: 'CustomerName' }, { name: 'CustomerId', label: 'CustomerId' }, { name: 'Service', label: 'Service' }, { name: 'GreenTechnician', label: 'GreenTechnician' }, { name: 'Association', label: 'Association' }, { name: 'AssociationNumber', label: 'AssociationNumber' }, { name: 'ScheduledDate', label: 'ScheduledDate' }];


    const data2 = [
        {
            CustomerName: 'Bhagath',
            CustomerId: 'TMC0010009',
            Service: 'Kazhakootam',
            GreenTechnician: '24-02-2021',
            Association: 'House',
            AssociationNumber: 'Hv7',
            ScheduledDate: '6g'
        },
        {
            CustomerName: 'Adarsh',
            CustomerId: 'TMC0010009',
            Service: 'Kazhakootam',
            GreenTechnician: '24-02-2021',
            Association: 'House',
            AssociationNumber: 'Hv7',
            ScheduledDate: '6g'
        },
        {
            CustomerName: 'Adarsh',
            CustomerId: 'TMC0010009',
            Service: 'Kazhakootam',
            GreenTechnician: '24-02-2021',
            Association: 'House',
            AssociationNumber: 'Hv7',
            ScheduledDate: '6g'
        },
        {
            CustomerName: 'Adarsh',
            CustomerId: 'TMC0010009',
            Service: 'Kazhakootam',
            GreenTechnician: '24-02-2021',
            Association: 'House',
            AssociationNumber: 'Hv7',
            ScheduledDate: '6g'
        }

    ];
    let report = {
        head: getReportInfo('complaint_count_residential'),
        config: { watermark: true },
        pdf: null,
        excel: null
    };

    let viewColumnFlag = false;
    let filterFlag = false;
    let ExportArray = [];
    if (hasAccessPermission(RESOURCE_MAPPING.REPORT_COMPLAINT_COUNT_ESCALATED_RESIDENTIAL, ACTION_MAPPING.REPORT_COMPLAINT_COUNT_ESCALATED_RESIDENTIAL.TABLE_COLUMN)) {
        viewColumnFlag = true;
    }
    if (hasAccessPermission(RESOURCE_MAPPING.REPORT_COMPLAINT_COUNT_ESCALATED_RESIDENTIAL, ACTION_MAPPING.REPORT_COMPLAINT_COUNT_ESCALATED_RESIDENTIAL.TABLE_FILTER)) {
        filterFlag = true;
    }
    if (hasAccessPermission(RESOURCE_MAPPING.REPORT_COMPLAINT_COUNT_ESCALATED_RESIDENTIAL_EXPORT, ACTION_MAPPING.REPORT_COMPLAINT_COUNT_ESCALATED_RESIDENTIAL_EXPORT.PDF)) {
        report.pdf = getPdfTableData({ columns, data: data2 });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.REPORT_COMPLAINT_COUNT_ESCALATED_RESIDENTIAL_EXPORT, ACTION_MAPPING.REPORT_COMPLAINT_COUNT_ESCALATED_RESIDENTIAL_EXPORT.EXCEL)) {
        report.excel = getExcelTableData({ columns, data: data2 });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.REPORT_COMPLAINT_COUNT_ESCALATED_RESIDENTIAL, ACTION_MAPPING.REPORT_COMPLAINT_COUNT_ESCALATED_RESIDENTIAL.TABLE_EXPORT)) {
        ExportArray.push({ customComponent: < HandleExport data={report} /> });
    }
    const options = {
        ...MUI_COMMON_OPTIONS,
        viewColumns: viewColumnFlag,
        filter: filterFlag,
        serverside: false,
        customActions: ExportArray
    };

    const CustomDatePicker = forwardRef(({ value, onClick }, ref) => (
        <DatePickerButton startIcon={<DateRangeIcon style={{ color: 'black' }} />} disableElevation variant="contained" onClick={onClick} ref={ref}>
            {value}
        </DatePickerButton>
    ));

    return (
        <div>
            <Card style={{ padding: '10px' }}>
                <Typography>Filter</Typography>
                <Form>
                    <Grid style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <Grid item xs={3}>
                            <Field name="zone" label={I18n.t('zone')} component={renderSimpleSelect} >
                                {[{ id: 'kannur', name: 'kannur' }]}
                            </Field>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                            <Field name="circle" label={I18n.t('circle')} component={renderSimpleSelect} >
                                {[{ id: 'kannur', name: 'kannur' }]}

                            </Field>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                            <Field name="ward" label={I18n.t('ward')} component={renderSimpleSelect} >
                                {[{ id: 'kannur', name: 'kannur' }]}

                            </Field>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                            <Field name="association" label={I18n.t('association')} component={renderSimpleSelect} >
                                {[{ id: 'kannur', name: 'kannur' }]}

                            </Field>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                            <Field name="status" label={I18n.t('status')} component={renderSimpleSelect} >
                                {[{ id: 'kannur', name: 'kannur' }]}

                            </Field>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                            <Field name="service" label={I18n.t('service')} component={renderSimpleSelect} >
                                {[{ id: 'kannur', name: 'kannur' }]}

                            </Field>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                            <Field name="supervisor" label={I18n.t('supervisor')} component={renderSimpleSelect} >
                                {[{ id: 'kannur', name: 'kannur' }]}

                            </Field>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                            <Field name="supervisor" label={I18n.t('GreenTechnician')} component={renderSimpleSelect} >
                                {[{ id: 'kannur', name: 'kannur' }]}

                            </Field>
                        </Grid>
                        <Grid item xs={1}></Grid>

                        <Grid item xs={3} >
                            <DatePicker
                                selectsRange
                                selected={new Date()}
                                startDate={CommonFilter?.startDate}
                                endDate={CommonFilter?.endDate}
                                onChange={(update) => {
                                    setCommonFilter({ startDate: update[0], endDate: update[1] });
                                    if (update[1]) {
                                        // loadDashBoard();
                                    }
                                }}
                                dateFormat={DATE_FORMAT}
                                customInput={<CustomDatePicker />}
                            />
                        </Grid>

                    </Grid>
                    <Button>View</Button>
                </Form>
            </Card>
            <MUIDataTable
                title={I18n.t('complaint_count_residential')}
                data={data2}
                columns={columns}
                options={options}
            />
        </div>
    );
}
export default reduxForm({
    form: 'ComplaintCountEscalatedResidentialReport'
})(ComplaintCountEscalatedResidentialReport);

