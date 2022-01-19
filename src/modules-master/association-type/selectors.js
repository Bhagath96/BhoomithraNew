import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constants';


const getAssociationType = state => state[STATE_REDUCER_KEY];

const associationType = association => association.listAssocationType;
export const getAssociationTypes = flow(getAssociationType, associationType);
