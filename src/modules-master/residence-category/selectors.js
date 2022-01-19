import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constants';


const getResidenceCategory = state => state[STATE_REDUCER_KEY];

const residenceCategory = residence => residence.listResidenceCategory;
export const getResidenceCategories = flow(getResidenceCategory, residenceCategory);
