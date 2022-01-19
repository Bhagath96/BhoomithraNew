import { STATE_REDUCER_KEY } from './constants';
import flow from 'lodash/fp/flow';

const getPGM = state => state[STATE_REDUCER_KEY];

const pgmDetails = pgm => pgm.listPublicGatheringMethod;
export const getPGMs = flow(getPGM, pgmDetails);
