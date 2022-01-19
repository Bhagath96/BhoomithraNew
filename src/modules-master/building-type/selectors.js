import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constants';


const getBuildingType = state => state[STATE_REDUCER_KEY];

const buildingType = building => building.listBuildingType;
export const getBuildingTypes = flow(getBuildingType, buildingType);
