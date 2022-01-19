import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constants';


const getAdministrationType = state => state[STATE_REDUCER_KEY];

const administrationType = administration => administration.listAdministrationType;
export const getAdministrationTypes = flow(getAdministrationType, administrationType);

