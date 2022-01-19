import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
// import PouchDBDebug from 'pouchdb-debug';
import PouchDBUpsert from 'pouchdb-upsert';

import Schemas from './schemas';

PouchDB.plugin(PouchDBFind);
PouchDB.plugin(PouchDBUpsert);

/**
 * For Debugging DB
 */
// PouchDB.plugin(PouchDBDebug);
// PouchDB.debug.enable('*');

export const getPouchDB = (name) => new PouchDB(name);

export default Schemas;
