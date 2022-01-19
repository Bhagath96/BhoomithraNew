import React, { forwardRef, useState } from 'react';
// import utils from '../../../utils';
import { Field, Form, reduxForm } from 'redux-form';
import { Components, I18n } from '../../../common/components';
import { MUI_COMMON_OPTIONS } from '../../../common/constants';
import { HandleExport } from '../../../common/components/handleExport';
import { renderSimpleSelect } from '../../../utils/FormUtils';
import DatePicker from 'react-datepicker';
import { withStyles } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { getReportInfo } from '../../../utils/PdfMakeUtils';
import { getExcelTableData, getPdfTableData } from '../../../utils/ReportUtils';
import { hasAccessPermission } from '../../../utils/PermissionUtils';
import { ACTION_MAPPING, RESOURCE_MAPPING } from '../../../common/Permissions';


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

function ListDoorStatus() {
    const DATE_FORMAT = 'dd-MM-yyyy';
    const [CommonFilter, setCommonFilter] = useState({});
    const columns = [
        {
            name: 'Name',
            label: 'Name'
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
            name: 'BuildingType',
            label: 'Building Type'
        },
        {
            name: 'BuildingName',
            label: 'Building Name'
        },
        {
            name: 'BuildingNumber',
            label: 'Building Number'
        },
        {
            name: 'LeadPersonPhone',
            label: 'LeadPerson Phone'
        },
        {
            name: 'Latitude',
            label: 'Latitude'
        },
        {
            name: 'Longitude',
            label: 'Longitude'
        }
    ];


    const data2 = [
        {
            Name: '',
            CustomerId: 'TMC0010009',
            Ward: 'Kazhakootam',
            Date: '24-02-2021',
            BuildingType: 'House',
            BuildingName: 'Hv7',
            BuildingNumber: '6g',
            AssociationName: '',
            AssociationNumber: 'hh',
            Latitude: 8.3662165850982,
            Longitude: 77.199295550216,
            LeadPersonPhone: ''
        },
        {
            Name: '',
            CustomerId: 'TMC0230045',
            Ward: 'Kowdiar',
            Date: '30-12-2020',
            BuildingType: 'House',
            BuildingName: 'Ghhh',
            BuildingNumber: 'hhu',
            AssociationName: 'ABC Residential Association',
            AssociationNumber: 'hhhh',
            Latitude: 1,
            Longitude: 1,
            LeadPersonPhone: ''
        },
        {
            Name: '',
            CustomerId: 'TMC0230020',
            Ward: 'Kowdiar',
            Date: '27-12-2020',
            BuildingType: 'Shop',
            BuildingName: '',
            BuildingNumber: '',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.5568957,
            Longitude: 76.8821176,
            LeadPersonPhone: ''
        },
        {
            Name: '',
            CustomerId: 'TMC0230019',
            Ward: 'Kowdiar',
            Date: '27-12-2020',
            BuildingType: 'Shop',
            BuildingName: '',
            BuildingNumber: '',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 1,
            Longitude: 1,
            LeadPersonPhone: ''
        },
        {
            Name: '',
            CustomerId: 'TMC0160006',
            Ward: 'Medical College',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Lakshmi Villas',
            BuildingNumber: '2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        },
        {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        },
        {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }, {
            Name: '',
            CustomerId: 'TMC0230006',
            Ward: 'Kowdiar',
            Date: '10-11-2020',
            BuildingType: 'House',
            BuildingName: 'Thattam Vilakam',
            BuildingNumber: 'TC 2/2345',
            AssociationName: '',
            AssociationNumber: '',
            Latitude: 8.3729686,
            Longitude: 77.198298,
            LeadPersonPhone: ''
        }
    ];

    let report = {
        head: getReportInfo('door_status'),
        config: { watermark: true },
        pdf: null,
        excel: null
    };
    let viewColumnFlag = false;
    let filterFlag = false;
    let ExportArray = [];
    if (hasAccessPermission(RESOURCE_MAPPING.REPORT_DOOR_STATUS, ACTION_MAPPING.REPORT_DOOR_STATUS.TABLE_COLUMN)) {
        viewColumnFlag = true;
    }
    if (hasAccessPermission(RESOURCE_MAPPING.REPORT_DOOR_STATUS, ACTION_MAPPING.REPORT_DOOR_STATUS.TABLE_FILTER)) {
        filterFlag = true;
    }
    if (hasAccessPermission(RESOURCE_MAPPING.REPORT_DOOR_STATUS_EXPORT, ACTION_MAPPING.REPORT_DOOR_STATUS_EXPORT.PDF)) {
        report.pdf = getPdfTableData({ columns, data: data2 });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.REPORT_DOOR_STATUS_EXPORT, ACTION_MAPPING.REPORT_DOOR_STATUS_EXPORT.EXCEL)) {
        report.excel = getExcelTableData({ columns, data: data2 });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.REPORT_DOOR_STATUS, ACTION_MAPPING.REPORT_DOOR_STATUS.TABLE_EXPORT)) {
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
        <DatePickerButton startIcon={<DateRangeIcon style={{ color: 'black' }} />} disableElevation variant='contained' onClick={onClick} ref={ref}>
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
                            <Field name='district' label={I18n.t('district')} component={renderSimpleSelect} >
                                {[{ id: 'kannur', name: 'kannur' }]}
                            </Field>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                            <Field name='lsgiType' label={I18n.t('lsgi_type')} component={renderSimpleSelect} >
                                {[{ id: 'kannur', name: 'kannur' }]}

                            </Field>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                            <Field name='lsgi' label={I18n.t('lsgi')} component={renderSimpleSelect} >
                                {[{ id: 'kannur', name: 'kannur' }]}

                            </Field>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                            <Field name='ward' label={I18n.t('ward')} component={renderSimpleSelect} >
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
                title={I18n.t('door_status')}
                data={data2}
                columns={columns}
                options={options}
            />
        </div>
    );
}
export default reduxForm({
    form: 'ListDoorStatus'
})(ListDoorStatus);

