import _ from 'lodash';
import moment from 'moment';
import { I18n } from '../common/components';
import Colors from '../common/components/custom/Colors';
import { PROJECT_CONFIG_PROPS } from '../common/constants';
import { store } from '../redux/store';
import { getProjectProps } from './ConfigUtils';
import { convertToLocal } from './DateUtils';

const PROJECT_DETAILS = getProjectProps(PROJECT_CONFIG_PROPS.DETAILS);
const { REPORT: { header1 = null, header2 = null, logo1 = null } = {} } = PROJECT_DETAILS;

export const EMPTY_PDF_REPORT_VALUE = '- - -';

export const pdfStyles = {
    header: {
        fontSize: 18,
        bold: true
    },
    subheader: {
        fontSize: 15,
        bold: true
    },
    title: {
        fontSize: 12,
        bold: true
    },
    quote: {
        italics: true
    },
    small: {
        fontSize: 8
    },
    bold: {
        bold: true
    },
    italics: {
        italics: true
    },
    qrCodeText: {
        fontSize: 10,
        alignment: 'center'
    }

};

export const defaultPdfStyles = (font = 'malayalam') => {
    return { font };
};


export const getReportInfo = (title = '') => {
    let user = store.getState();
    const { user: { info: { firstName = '', lastName = '' } = {} } = {} } = user;
    let generatedAt = convertToLocal(moment.now());
    return {
        generatedBy: firstName + ' ' + lastName,
        generatedAt,
        title: I18n.t(title),
        fileName: `${I18n.t(title)} ${generatedAt}`
    };
};

export const mm2pt = (mm) => parseFloat(mm) * 2.8346456692913384;

export const getEncryptionAndPrivilege = (data) => {
    const KEY = 'Admin123456';
    const { encrypt, password } = data;
    if (encrypt) {
        return {
            userPassword: _.toString(password || 12345678),
            ownerPassword: KEY,
            permissions: {
                printing: 'highResolution',
                modifying: false,
                copying: false,
                annotating: true,
                fillingForms: true,
                contentAccessibility: true,
                documentAssembly: true
            }
        };
    } else {
        return {};
    }
};

export const getWatermark = (watermark = false) => watermark ? { watermark: { text: I18n.t(PROJECT_DETAILS.NAME), color: Colors['color-primary-800'], opacity: 0.05, bold: true } } : {};

export const getFileInfo = ({ title = '', generatedBy = I18n.t(PROJECT_DETAILS.NAME) }) => ({
    info: {
        title,
        generatedBy,
        author: I18n.t(PROJECT_DETAILS.COPY_RIGHT),
        producer: I18n.t(PROJECT_DETAILS.COPY_RIGHT),
        creator: I18n.t(PROJECT_DETAILS.COPY_RIGHT),
        subject: `${title} Report`,
        keywords: `${title} ${generatedBy}`
    }
});

export const getHeaderDetails = (showHeader) => {
    if (showHeader) {
        return [
            {
                image: logo1,
                alignment: 'center',
                width: 100
            },
            {
                text: I18n.t(header1),
                alignment: 'center',
                style: ['header']
            },
            {
                text: `(${I18n.t(header2)})`,
                alignment: 'center',
                style: ['small', 'bold']
            },
            '\n\n'
        ];
    } else {
        return [];
    }
};

export const getTitle = ({ title, showTitle }) => {
    if (showTitle && title && title.length > 0) {
        return {
            text: title,
            alignment: 'center',
            style: ['title']
        };
    } else {
        return {};
    }
};
