import { Button } from '@material-ui/core';
import { PictureAsPdf } from '@material-ui/icons';
import React from 'react';
import { I18n } from '../..';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PdfExport = ({ data = {} }) => {
    const { columns = [], data: report, configs = {}, head = {} } = data;
    const { orientation = 'l' } = configs; // l : landscape , p: portrait
    const { generatedBy = '', generatedAt = '', title = '', fileName = I18n.t('download') } = head;
    const doc = new jsPDF({ orientation });
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const PageCenterX = pageWidth / 2;
    // const PageCenterY = pageHeight / 2;
    const leftMargin = 18, rightMargin = 18;
    const HEIGHT_OFFSET = 10;
    let heightOffset = 0;
    const getHeightOffset = () => {
        heightOffset = heightOffset + HEIGHT_OFFSET;
        return heightOffset;
    };

    const getTextWidth = (document, text) => {
        return document.getStringUnitWidth(text) * document.internal.getFontSize() / document.internal.scaleFactor;
    };

    const getCenterPosition = (document, text) => {
        return (pageWidth - getTextWidth(document, text)) / 2;
    };

    const downloadPdf = () => {
        doc.setFontSize(18);
        doc.text(title, getCenterPosition(doc, title), getHeightOffset());
        doc.setFontSize(8);
        let generatedByY = getHeightOffset();
        // let repeatedHeaderY = 0;
        doc.text(`generatedBy: ${generatedBy}`, leftMargin, generatedByY);
        doc.text(`generatedAt: ${generatedAt}`, pageWidth - rightMargin - getTextWidth(doc, `generatedAt: ${generatedAt}`), generatedByY);
        doc.setFontSize(12);
        let header = function () {
            // repeatedHeaderY = getHeightOffset();
            // doc.setFontSize(18);
            // doc.setTextColor(40);
            // doc.setFontStyle('normal');
            //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
            // doc.text("Testing Report", getCenterPosition(doc, "Testing Report"), repeatedHeaderY);
        };

        let options = {
            beforePageContent: header,
            startY: getHeightOffset()
        };

        doc.autoTable(
            columns.map(col => ({ title: col.label, dataKey: col.name })),
            report,
            options
        );

        let totalPageCount = doc.internal.getNumberOfPages(); //Total Page Number
        for (let i = 0; i < totalPageCount; i++) {
            doc.setPage(i);
            let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //Current Page
            doc.setFontSize(12);
            doc.text(pageCurrent + '/' + totalPageCount, PageCenterX, pageHeight - 10);
        }
        doc.save(`${fileName}.pdf`);
    };
    return (
        <div>
            <Button
                variant='outlined'
                style={{ display: 'inline-block' }}
                onClick={downloadPdf}
                startIcon={<PictureAsPdf />}
            >
                {I18n.t('export_to_pdf')}
            </Button>
        </div>
    );
};

export default PdfExport;
