import { CRON_EXPRESSIONS, WEEK_DAYS } from './constants';
import moment from 'moment';
import _ from '../../utils/LodashUtils';

const fetchFromCron = (current, type) => {
    const expArray = _.split(current, ' ');
    if (expArray.length < 6) {
        return '0';
    }
    if (type === 999) {
        return `${expArray[3]}/${expArray[4]}/${expArray[6]}`;
    }
    return expArray[type];
};


export const formatServiceIntervalForCron = (serviceInterval, dependantCron) => {
    // this objects added because only monthly data came from backend if every data came we can remove this oobjects
    // let obj1 = {
    //     id: 3,
    //     name: 'Weekly'
    // };
    // let obj2 = {
    //     id: 4,
    //     name: 'Fortnight'
    // };
    // let obj3 = {
    //     id: 2,
    //     name: 'Daily'
    // };
    // let obj4 = {
    //     id: 5,
    //     name: 'Date'
    // };
    // serviceInterval.push(obj1, obj2, obj3, obj4);
    serviceInterval?.map((item) => {
        if (item.id === 1) {
            item.cronExpression = CRON_EXPRESSIONS.EVERY_MONTH;
            item.day = { id: +fetchFromCron(dependantCron, 3), name: '' + fetchFromCron(dependantCron, 3) };
        }
        if (item.id === 2) {
            item.cronExpression = CRON_EXPRESSIONS.EVERY_DAY;
        }
        if (item.id === 3) {
            item.cronExpression = CRON_EXPRESSIONS.EVERY_WEEK;
            item.weekDay = _.find(WEEK_DAYS, ['id', fetchFromCron(dependantCron, 5)]);
        }
        if (item.id === 4) {
            item.cronExpression = CRON_EXPRESSIONS.FORT_NIGHT;
        }
        if (item.id === 5) {
            item.cronExpression = CRON_EXPRESSIONS.EVERY_DATE;
            let momentDate = moment(fetchFromCron(dependantCron, 999)).format('YYYY-MM-DD');
            item.date = momentDate.toString();
        }
    });
    return serviceInterval;
};
