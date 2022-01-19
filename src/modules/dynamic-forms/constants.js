const STATE_REDUCER_KEY = 'questions';
export const FORM_NAME = 'GenerateQuestionForm';

const REQUEST_STATUS = {
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED'
};

export { STATE_REDUCER_KEY, REQUEST_STATUS };

export const TYPE = {
    TEXT: 'Text',
    DROPDOWN: 'Dropdown',
    MULTI_DROPDOWN: 'Multi Dropdown',
    OPTION: 'Option',
    CHECKBOX: 'Checkbox',
    DIGIT: 'Digit',
    DATE: 'Date',
    WARD: 'Ward',
    RESIDENTIAL_ASSOCIATION: 'Residential Association',
    TRADING_TYPE: 'Trading Type',
    SHOP_TYPE: 'Shop type',
    BUILDING_TYPE: 'Building Type',
    IMAGE: 'Photo',
    LOCATION: 'Location',
    OPTION_WITH_ICON: 'Option with Icon'
};

export const VALIDATION = {
    IS_READ_ONLY: 'Read Only',
    IS_MANDATORY: 'Mandatory',
    IS_PHONE: 'Phone',
    IS_EMAIL: 'Email',
    IS_DECIMAL: 'Decimal',
    SHOW_DECIMAL: 'Show Decimal'
};
export const TABLE_IDS = {
    LIST_QUESTIONS: 'LIST_QUESTIONS'
};

export const OPTION_TYPES = ['OPTION', 'DROPDOWN'];
