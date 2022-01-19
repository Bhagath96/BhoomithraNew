export const STATE_REDUCER_KEY = 'schedule';

export const FORM_NAME = 'Schedule';

export const CRON_EXPRESSIONS = {
    EVERY_DAY: '0 0 0 * * ?',
    EVERY_WEEK: '0 0 0 ? * SUN *',
    FORT_NIGHT: '0 0 0 14/14 * ?',
    EVERY_MONTH: '0 0 0 1 * ?',
    EVERY_DATE: '0 0 0 1 JAN ? 1997'
};

export const CRON_EXPRESSIONS_LABEL = {
    EVERY_DAY: 'every_day',
    EVERY_WEEK: 'every_week',
    FORT_NIGHT: 'fort_night',
    EVERY_MONTH: 'every_month',
    EVERY_DATE: 'every_date'
};

export const CRON_SIMPLE = [
    { id: CRON_EXPRESSIONS.EVERY_DAY, name: CRON_EXPRESSIONS_LABEL.EVERY_DAY },
    { id: CRON_EXPRESSIONS.EVERY_WEEK, name: CRON_EXPRESSIONS_LABEL.EVERY_WEEK },
    { id: CRON_EXPRESSIONS.FORT_NIGHT, name: CRON_EXPRESSIONS_LABEL.FORT_NIGHT },
    { id: CRON_EXPRESSIONS.EVERY_MONTH, name: CRON_EXPRESSIONS_LABEL.EVERY_MONTH },
    { id: CRON_EXPRESSIONS.EVERY_DATE, name: CRON_EXPRESSIONS_LABEL.EVERY_DATE }

];

export const WEEK_DAYS = [
    { id: 'SUN', name: 'sunday' },
    { id: 'MON', name: 'monday' },
    { id: 'TUE', name: 'tuesday' },
    { id: 'WED', name: 'wednesday' },
    { id: 'THU', name: 'thursday' },
    { id: 'FRI', name: 'friday' },
    { id: 'SAT', name: 'saturday' }
];

export const DAYS = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
    { id: 7, name: '7' },
    { id: 8, name: '8' },
    { id: 9, name: '9' },
    { id: 10, name: '10' },
    { id: 11, name: '11' },
    { id: 12, name: '12' },
    { id: 13, name: '13' },
    { id: 14, name: '14' },
    { id: 15, name: '15' },
    { id: 16, name: '16' },
    { id: 17, name: '17' },
    { id: 18, name: '18' },
    { id: 19, name: '19' },
    { id: 20, name: '20' },
    { id: 21, name: '21' },
    { id: 22, name: '22' },
    { id: 23, name: '23' },
    { id: 24, name: '24' },
    { id: 25, name: '25' },
    { id: 26, name: '26' },
    { id: 27, name: '27' },
    { id: 28, name: '28' },
    { id: 29, name: '29' },
    { id: 30, name: '30' },
    { id: 31, name: '31' }
];
export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
export const TABLE_IDS = {
    LIST_SCHEDULE: 'LIST_SCHEDULE',
    LIST_CUSTOMERS_SCHEDULE: 'LIST_CUSTOMERS_SCHEDULE',
    LIST_SPECIAL_SERVICE_REQUEST: 'LIST_SPECIAL_SERVICE_REQUEST'
};


export const RESIDENTIAL_CATEGORIES = {
    RESIDENTIAL: 1,
    NON_RESIDENTIAL: 2
};
