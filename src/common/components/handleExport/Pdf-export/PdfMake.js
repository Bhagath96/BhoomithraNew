import React from 'react';
import moment from 'moment';
import { PictureAsPdf } from '@material-ui/icons';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from '../../../../assets/js/vfs_fonts';
import { Components, makeStyles } from '../..';
import { convertToLocal } from '../../../../utils/DateUtils';
import { defaultPdfStyles, EMPTY_PDF_REPORT_VALUE, getEncryptionAndPrivilege, getFileInfo, getHeaderDetails, getWatermark, pdfStyles, getTitle } from '../../../../utils/PdfMakeUtils';
import { I18n } from '../..';

const { Button } = Components;

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0, 0, 0)
    }
}
));

const PdfMake = ({ data = {} }) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const style = useStyles();
    const { config = {}, head = {}, pdf = {} } = data;
    const { orientation = 'landscape', size = 'A4', encrypt = false, password, watermark = false, showHeader = true, showTitle = true } = config;
    const { generatedBy = EMPTY_PDF_REPORT_VALUE, generatedAt = convertToLocal(moment.now()), title = '', fileName = I18n.t('download') } = head;

    const generatePdf = () => {
        let labelGeneratedBy = I18n.t('generated_by');
        let labelGeneratedAt = I18n.t('generated_at');

        let report = {
            pageSize: size,
            pageOrientation: orientation,
            pageMargins: [20, 20],
            ...getEncryptionAndPrivilege({ encrypt, password }),
            ...getWatermark(watermark),
            ...getFileInfo({ title, generatedBy }),
            footer: (currentPage, pageCount) => ({ text: currentPage.toString() + ' / ' + pageCount, alignment: 'center' }),
            content: [
                ...getHeaderDetails(showHeader),
                getTitle({ title, showTitle }),
                {
                    columns: [
                        {
                            text: `${labelGeneratedBy}: ${generatedBy || EMPTY_PDF_REPORT_VALUE}`,
                            style: ['small', 'bold', 'italics'],
                            alignment: 'left'
                        },
                        {
                            text: `${labelGeneratedAt}: ${generatedAt || convertToLocal(moment.now())}`,
                            style: ['small', 'bold', 'italics'],
                            alignment: 'right'
                        }
                    ]
                },
                '\n',
                {
                    ...pdf
                }
            ],
            defaultStyle: defaultPdfStyles(),
            styles: pdfStyles
        };

        /**
         * in fonts normal,bold,italics,bolditalics is a must,
         * if not exists provide the same font
         */
        pdfMake.fonts = {
            malayalam: {
                normal: 'Gayathri.ttf',
                bold: 'Gayathri.ttf',
                italics: 'Gayathri.ttf',
                bolditalics: 'Gayathri.ttf'
            },
            marathi: {
                normal: 'Mangal Regular.ttf',
                bold: 'Mangal Regular.ttf',
                italics: 'Mangal Regular.ttf',
                bolditalics: 'Mangal Regular.ttf'
            }
        };

        pdfMake.createPdf(report).download(`${fileName}.pdf`);
    };

    return (
        <div>
            <Button
                style={{ display: 'inline-block' }}
                onClick={generatePdf}
                startIcon={<PictureAsPdf />}
                className={style.root}
            >
                {I18n.t('export_to_pdf')}
            </Button>
        </div >
    );
};

export default PdfMake;

