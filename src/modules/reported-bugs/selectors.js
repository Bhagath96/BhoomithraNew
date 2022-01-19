import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';


const getReportedBugs = state => state[STATE_REDUCER_KEY];

const bugs = state => state.listReportedBugs;
export const getReportedBugsList = flow(getReportedBugs, bugs);
