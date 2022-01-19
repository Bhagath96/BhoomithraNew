import { STATE_REDUCER_KEY } from './constant';
import flow from 'lodash/fp/flow';

const getMCF = state => state[STATE_REDUCER_KEY];

const mcfDetails = mcf => mcf.listMCF;
export const getMCFs = flow(getMCF, mcfDetails);
