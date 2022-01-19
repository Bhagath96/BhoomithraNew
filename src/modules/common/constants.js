import { I18n } from '../../common/components';

function SetDefaultLanguageID() {
    let DefaultLanguageID = 1;
    const defaultLanguageValue = I18n.language;
    if (defaultLanguageValue === 'en-IN') {
        DefaultLanguageID = 1;
    } else if (defaultLanguageValue === 'ml-IN') {
        DefaultLanguageID = 2;
    } else if (defaultLanguageValue === 'mr-IN') {
        DefaultLanguageID = 3;
    }
    return DefaultLanguageID;

}
export const STATE_REDUCER_KEY = 'common';

export const DEFAULT_LANGUAGE = { id: SetDefaultLanguageID(), locale: I18n.language };

export const PICKY_EMPTY = { id: null, name: 'drop_down_select' };

export const REQUEST_STATUS = {
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED'
};

export const ACTION_TYPES = {
    ACCEPT: 'ACCEPT',
    REJECT: 'REJECT'
};

export const MESSAGE_TYPES = {
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warning',
    SUCCESS: 'success'
};

export const HIERARCHY_INDEX = {
    state: 0,
    district: 1,
    lsgiType: 2,
    blockPanchayath: 3,
    districtPanchayath: 3,
    lsgi: 4
};

export const HIERARCHY_LABEL = {
    STATE: 'state',
    DISTRICT: 'district',
    LSGI_TYPE: 'lsgiType',
    BLOCK_PANCHAYATH: 'blockPanchayath',
    DISTRICT_PANCHAYATH: 'districtPanchayath',
    LSGI: 'lsgi'
};

export const DB_KEYS = {
    PANCHAYATH: 5 //(PK from DB)used to Identify is Panchayth or not
};

export const LSGI_TYPE = {
    PANCHAYATH: 'Panchayath',
    CORPORATION: 'Corporation',
    MUNICIPALITY: 'Municipality'
};

export const PANCHAYATH_TYPES = {
    DISTRICT_PANCHAYATH: 'DISTRICT_PANCHAYATH',
    BLOCK_PANCHAYATH: 'BLOCK_PANCHAYATH'
};

export const STATUS_RECORD = {
    DELETED: 0,
    ALLOWED: 1,
    SERVICE_SCHEDULED: 2,
    SERVICE_RE_SCHEDULED: 3,
    SERVICE_CANCELLED: 4,
    SERVICE_SKIPPED: 5,
    SPECIAL_SERVICE_REQUESTED: 6,
    SPECIAL_SERVICE_CANCELLED: 7,
    SPECIAL_SERVICE_APPROVED: 8,
    SPECIAL_SERVICE_DECLINED: 9,
    SERVICE_ENROLLMENT_REQUESTED: 10,
    SERVICE_ENROLLMENT_CANCELLED: 11,
    SERVICE_ENROLLMENT_APPROVED: 12,
    SERVICE_ENROLLMENT_DECLINED: 13
};

export const FILE_UPLOAD_FORMAT = {
    ICO: '.ico',
    JPEG: '.jpeg',
    SVG: '.svg',
    PNG: '.png'
};
export const ORG_TYPES = {
    orgTypes: 'Corporation,Municipality,Panchayath,Block Panchayath,District Panchayath'
};


export const DATA_ACCESS_CAPTURE_VIEW = {
    ROLES_ASSIGNEES: 1,
    USER_ASSIGN_ROLES: 2,
    ORGANIZATION_ASSIGN_ROLES: 3
};

