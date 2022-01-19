import Schemas, { getPouchDB } from '../pouchDB';

/**
 * TODO
 *
 * For Removing all PouchDBs in Single Instance
 *
 * // https://github.com/pouchdb-community/pouchdb-all-dbs
 *
 */

const CommonRepository = {
    destroyAll: async () => {
        getPouchDB(Schemas.SurveyDataSchema.name).destroy();
        getPouchDB(Schemas.SurveyDataReadOnlySchema.name).destroy();
    }
};

export default CommonRepository;
