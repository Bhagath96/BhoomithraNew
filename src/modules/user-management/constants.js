import i18n from '../../i18n';

const STATE_REDUCER_KEY = 'user-management';

const REQUEST_STATUS = {
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED'
};

const ADDRESS_TYPES = [
    { id: 1, name: 'Permanent' },
    { id: 2, name: 'Current' }
];

const TABLE_IDS = {
    LIST_USERS: 'LIST_USERS',
    LIST_ASSIGN_ORGANIZATION_UNDER_USER: 'LIST_ASSIGN_ORGANIZATION_UNDER_USER',
    LIST_ASSIGN_ROLE_UNDER_USER: 'LIST_ASSIGN_ROLE_UNDER_USER',
    LIST_ASSIGN_USER_GROUP_UNDER_USER: 'LIST_ASSIGN_USER_GROUP_UNDER_USER'
};
const GENDER = () => {
    const array = [
        { id: 1, name: i18n.t('male') },
        { id: 2, name: i18n.t('female') },
        { id: 3, name: i18n.t('others') }
    ];
    return array;
};


export { STATE_REDUCER_KEY, REQUEST_STATUS, ADDRESS_TYPES, TABLE_IDS, GENDER };
