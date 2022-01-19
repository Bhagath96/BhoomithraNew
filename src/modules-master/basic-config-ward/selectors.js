import { STATE_REDUCER_KEY } from './constants';
import flow from 'lodash/fp/flow';

// export const getSurveyDetails = state => state[STATE_REDUCER_KEY];

const getWard = state => state[STATE_REDUCER_KEY];

const wardDetails = ward => ward.listAllWards;
export const getWards = flow(getWard, wardDetails);

const raDetails = ra => ra.listAllResidentialAssociations;
export const getResidentialAssociations = flow(getWard, raDetails);
