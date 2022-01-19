import { STATE_REDUCER_KEY } from './constants';
import flow from 'lodash/fp/flow';

const getTerraceFarming = state => state[STATE_REDUCER_KEY];

const terraceFarmingDetails = terraceFarming => terraceFarming.listTerraceFarming;
export const getTerraceFarmings = flow(getTerraceFarming, terraceFarmingDetails);
