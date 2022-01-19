export const STATE_REDUCER_KEY = 'data-access-permission';

export const API_IDENTIFIER = 'DataAccess';


export const DATA_ACCESS_LEVEL = {
    STATE: { id: 1, level: 1, label: 'state' },
    DISTRICT: { id: 2, level: 2, label: 'district' },
    CORPORATION: { id: 3, level: 3, label: 'corporation' },
    MUNICIPALITY: { id: 4, level: 3, label: 'municipality' },
    DISTRICT_PANCHAYATH: { id: 5, level: 3, label: 'district_panchayath' },
    BLOCK_PANCHAYATH: { id: 6, level: 3, label: 'district_panchayath' },
    GRAMA_PANCHAYATH: { id: 7, level: 3, label: 'district_panchayath' },
    WARD: { id: 8, level: 4, label: 'ward' },
    RESIDENCE_TYPE: { id: 9, level: 4, label: 'residence_type' }
};

export const DATA_ACCESS_LEVEL_KEY_MAPPING = {
    1: 'STATE',
    2: 'DISTRICT',
    3: 'CORPORATION',
    4: 'MUNICIPALITY',
    5: 'DISTRICT_PANCHAYATH',
    6: 'BLOCK_PANCHAYATH',
    7: 'GRAMA_PANCHAYATH',
    8: 'WARD',
    9: 'RESIDENCE_TYPE'
};

export const DB_PB_MASTER = {
    CORPORATION: 3,
    MUNICIPALITY: 4,
    GRAMA_PANCHAYATH: 5
};

export const COMPONENT_ID_FIELD_NAME_MAPPING = {
    STATE: 'state',
    DISTRICT: 'district',
    CORPORATION: 'corporation',
    MUNICIPALITY: 'municipality',
    GRAMA_PANCHAYATH: 'panchayath',
    DISTRICT_PANCHAYATH: 'districtPanchayath',
    BLOCK_PANCHAYATH: 'blockPanchayath',
    WARD: 'ward',
    RESIDENCE_TYPE: 'residence'
};
