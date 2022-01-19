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

function PlanEnabledResidential() {
    const DATE_FORMAT = 'dd-MM-yyyy';
    const [CommonFilter, setCommonFilter] = useState({});
    const columns = [
        {
            name: 'Surveyor',
            label: 'Surveyor'
        },
        {
            name: 'HouseCount',
            label: 'House Count'
        },
        {
            name: 'FlatCount',
            label: 'Flat Count'
        },
        {
            name: 'HospitalCount',
            label: 'Hospital Count'
        },
        {
            name: 'ShopCount',
            label: 'Shop Count'
        },
        {
            name: 'OfficeCount',
            label: 'Office Count'
        },
        {
            name: 'AuditoriumCount',
            label: 'Auditorium Count'
        },
        {
            name: 'MarketCount',
            label: 'Market Count'
        },
        {
            name: 'PublicPlaceCount',
            label: 'Public Place Count'
        },
        {
            name: 'ReligiousInstitution',
            label: 'Religious Institution'
        },
        {
            name: 'TotalCount',
            label: 'TotalCount'
        }
    ];
    const data2 = [
        {
            Surveyor: 100,
            HouseCount: '100',
            FlatCount: '100',
            HospitalCount: '122',
            ShopCount: '124',
            OfficeCount: '222',
            AuditoriumCount: '123',
            MarketCount: '166',
            PublicPlaceCount: '234',
            ReligiousInstitution: 8.3662165850982,
            TotalCount: 772222222222.199295550216
        },
        {
            Surveyor: 100,
            HouseCount: '100',
            FlatCount: '100',
            HospitalCount: '122',
            ShopCount: '124',
            OfficeCount: '222',
            AuditoriumCount: '123',
            MarketCount: '166',
            PublicPlaceCount: '234',
            ReligiousInstitution: 8.3662165850982,
            TotalCount: 772222222222.199295550216
        },
        {
            Surveyor: 100,
            HouseCount: '100',
            FlatCount: '100',
            HospitalCount: '122',
            ShopCount: '124',
            OfficeCount: '222',
            AuditoriumCount: '123',
            MarketCount: '166',
            PublicPlaceCount: '234',
            ReligiousInstitution: 8.3662165850982,
            TotalCount: 772222222222.199295550216
        }

    ];

    let report = {
        head: getReportInfo('plan_enabled_residential'),
        config: { watermark: true },
        pdf: null,
        excel: null
    };
    let viewColumnFlag = false;
    let filterFlag = false;
    let ExportArray = [];
    if (hasAccessPermission(RESOURCE_MAPPING.REPORT_PLAN_ENABLED_RESIDENTIAL, ACTION_MAPPING.REPORT_PLAN_ENABLED_RESIDENTIAL.TABLE_COLUMN)) {
        viewColumnFlag = true;
    }
    if (hasAccessPermission(RESOURCE_MAPPING.REPORT_PLAN_ENABLED_RESIDENTIAL, ACTION_MAPPING.REPORT_PLAN_ENABLED_RESIDENTIAL.TABLE_FILTER)) {
        filterFlag = true;
    }
    if (hasAccessPermission(RESOURCE_MAPPING.REPORT_PLAN_ENABLED_RESIDENTIAL_EXPORT, ACTION_MAPPING.REPORT_PLAN_ENABLED_RESIDENTIAL_EXPORT.PDF)) {
        report.pdf = getPdfTableData({ columns, data: data2 });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.REPORT_PLAN_ENABLED_RESIDENTIAL_EXPORT, ACTION_MAPPING.REPORT_PLAN_ENABLED_RESIDENTIAL_EXPORT.EXCEL)) {
        report.excel = getExcelTableData({ columns, data: data2 });
    }
    if (hasAccessPermission(RESOURCE_MAPPING.REPORT_PLAN_ENABLED_RESIDENTIAL, ACTION_MAPPING.REPORT_PLAN_ENABLED_RESIDENTIAL.TABLE_EXPORT)) {
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
                title={I18n.t('plan_enabled_residential')}
                data={data2}
                columns={columns}
                options={options}
            />
        </div>
    );
}
export default reduxForm({
    form: 'PlanEnabledResidential'
})(PlanEnabledResidential);

