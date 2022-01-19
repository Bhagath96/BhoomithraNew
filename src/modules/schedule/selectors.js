import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constants';

export const getSchedule = state => state[STATE_REDUCER_KEY];

const scheduleDetails = schedule => schedule.scheduleDetails;
export const getScheduleDetails = flow(getSchedule, scheduleDetails);

const fullSchedules = schedules => schedules.listSchedule;
export const getAllSchedule = flow(getSchedule, fullSchedules);

const history = schedule => schedule.history;
export const getHistory = flow(getSchedule, history);

const specialService = schedule => schedule.specialService;
export const getSpecialServices = flow(getSchedule, specialService);

const specialServiceSchedule = schedule => schedule.specialServiceSchedule;
export const getSpecialServiceSchedule = flow(getSchedule, specialServiceSchedule);

const processSchedule = schedule => schedule.processSchedule;
export const getSpecialServiceProcessSchedule = flow(getSchedule, processSchedule);

const specialServiceChips = schedule => schedule.specialServiceChips;
export const getSpecialServiceChips = flow(getSchedule, specialServiceChips);

const specialServicePageProps = specialServices => specialServices.pageProps;
export const getSpecialServicePageProps = flow(getSpecialServices, specialServicePageProps);

const customerListByScheduleID = schedule => schedule.customerListByScheduleID;
export const getCustomerListByScheduleID = flow(getSchedule, customerListByScheduleID);

const scheduleDetailsById = schedule => schedule.schedule?.data;
export const getScheduleDetailsById = flow(getSchedule, scheduleDetailsById);
