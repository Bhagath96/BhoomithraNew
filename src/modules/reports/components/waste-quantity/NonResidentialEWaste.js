import React, { forwardRef, useState } from 'react';
// import utils from '../../../utils';
import { Field, Form, reduxForm } from 'redux-form';
import { Components, I18n } from '../../../../common/components';
import { MUI_COMMON_OPTIONS } from '../../../../common/constants';
import { HandleExport } from '../../../../common/components/handleExport';
import { renderSimpleSelect, renderTextField } from '../../../../utils/FormUtils';
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

function NonResidentialEWaste() {
    const DATE_FORMAT = 'dd-MM-yyyy';
    const [CommonFilter, setCommonFilter] = useState({});
    const columns = [
        {
            name: 'CustomerName',
            label: 'Customer Name'
        },
        {
            name: 'CustomerId',
            label: 'Customer Id'
        },
        {
            name: 'Ward',
            label: 'Ward'
        },
        {
            name: 'GreenTechnician',
            label: 'Green Technician'
        },
        {
            name: 'QuantityCollected',
            label: 'Quantity Collected'
        },
        {
            name: 'Association',
            label: 'Office Count'
        },
        {
            name: 'CompletedDate',
            label: 'Completed Date'
        }
    ];
    const data = [
        {
            CustomerName: 'Regil',
            CustomerId: 'TMC0230058',
            Ward: 'Kowdiar',
            Service: 'Plastic Waste Collection',
            GreenTechnician: 'greentechnician',
            QuantityCollected: 2,
            Association: 'ABC Residential Association',
            CompletedDate: '24-May-2021'
        },
        {
            CustomerName: 'Owner2',
            CustomerId: 'TMC0230057',
            Ward: 'Kowdiar',
            Service: 'Glass Waste Collection',
            GreenTechnician: 'greentechnician',
            QuantityCollected: 10,
            Association: 'ABC Residential Association',
            CompletedDate: '20-May-2021'
        },
        {
            CustomerName: 'Owner',
            CustomerId: 'TMC0230016',
            Ward: 'Kowdiar',
            Service: 'Plastic Waste Collection',
            GreenTechnician: 'greentechnician',
            QuantityCollected: 5,
            Association: 'ABC Residential Association',
            CompletedDate: '21-May-2021'
        },
        {
            CustomerName: 'Nikhil Kumar',
            CustomerId: 'TMC0160010',
            Ward: 'Medical College',
            Service: 'Plastic Waste Collection',
            GreenTechnician: 'Shiju',
            QuantityCollected: 1,
            Association: '',
            CompletedDate: '03-Feb-2021'
        },
        {
            CustomerName: 'Krishnan AS',
            CustomerId: 'TMC0230060',
            Ward: 'Kowdiar',
            Service: 'Plastic Waste Collection',
            GreenTechnician: 'Shiju',
            QuantityCollected: 10,
            Association: '',
            CompletedDate: '03-Feb-2021'
        },
        {
            CustomerName: 'Owner',
            CustomerId: 'TMC0230016',
            Ward: 'Kowdiar',
            Service: 'Glass Waste Collection',
            GreenTechnician: 'greentechnician',
            QuantityCollected: 10,
            Association: 'ABC Residential Association',
            CompletedDate: '23-Dec-2020'
        }
    ];

    let report = {
        head: getReportInfo('non_residential_e_waste'),
        config: { watermark: true },
        pdf: null,
        excel: null
    };
    let viewColumnFlag = false;
    let filterFlag = false;
    let ExportArray = [];
    if (hasAccessPermission(RESOURCE_MAPPING.REPORT_E_WASTE_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_E_WASTE_NON_RESIDENTIAL.TABLE_COLUMN)) {
        viewColumnFlag = true;
    }
    if (hasAccessPermission(RESOURCE_MAPPING.REPORT_E_WASTE_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_E_WASTE_NON_RESIDENTIAL.TABLE_FILTER)) {
        filterFlag = true;
    }
    if (hasAccessPermission(RESOURCE_MAPPING.REPORT_E_WASTE_NON_RESIDENTIAL_EXPORT, ACTION_MAPPING.REPORT_E_WASTE_NON_RESIDENTIAL_EXPORT.PDF)) {
        report.pdf = getPdfTableData({ columns, data: data });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.REPORT_E_WASTE_NON_RESIDENTIAL_EXPORT, ACTION_MAPPING.REPORT_E_WASTE_NON_RESIDENTIAL_EXPORT.EXCEL)) {
        report.excel = getExcelTableData({ columns, data: data });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.REPORT_E_WASTE_NON_RESIDENTIAL, ACTION_MAPPING.REPORT_E_WASTE_NON_RESIDENTIAL.TABLE_EXPORT)) {
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
                            <Field name="district" label={I18n.t('survey_count')} component={renderTextField} >
                                {[{ id: '0', name: '1' }]}
                            </Field>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                            <Field name="lsgiType" label={I18n.t('ward')} component={renderSimpleSelect} >
                                {[{ id: 'kannur', name: 'kannur' }]}

                            </Field>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                            <Field name="lsgi" label={I18n.t('survey_Agency')} component={renderSimpleSelect} >
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
                title={I18n.t('non_residential_e_waste')}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    );
}
export default reduxForm({
    form: 'NonResidentialEWaste'
})(NonResidentialEWaste);

