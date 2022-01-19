import React from 'react';
import ReactExport from '@ibrahimrahmani/react-export-excel';
import { Button } from '@material-ui/core';
import { GridOn } from '@material-ui/icons';
import { I18n } from '../..';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExcelExport = ({ data: requestData = {} }) => {
    const {
        // config = {},
        head = {}, excel = {} } = requestData;
    const {
        // generatedBy = EMPTY_PDF_REPORT_VALUE,
        // generatedAt = convertToLocal(moment.now()),
        // title = '',
        fileName = I18n.t('download') } = head;

    const { data = [], columns = [] } = excel;
    const reportDetails = [
        { sheetName: I18n.t('details'), records: data || [] }
    ];
    return (
        <ExcelFile element={<Button variant='outlined' startIcon={<GridOn />}>{I18n.t('export_to_excel')}</Button>} filename={fileName}>
            {
                reportDetails.map((reportItem, index) => <ExcelSheet data={reportItem.records} key={index} name={reportItem.sheetName}>
                    {columns.map((col, i) => <ExcelColumn key={i} label={col.label} value={col.name} />)}
                </ExcelSheet>
                )
            }

        </ExcelFile>
    );
};

export default ExcelExport;
