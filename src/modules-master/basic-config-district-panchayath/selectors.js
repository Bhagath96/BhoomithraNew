import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constant';


const getDistrictPanchayath = state => state[STATE_REDUCER_KEY];

const districtPanchayath = dPanchayath => dPanchayath.listDistrictPanchayathDetails;
export const getDistrictPanchayaths = flow(getDistrictPanchayath, districtPanchayath);
