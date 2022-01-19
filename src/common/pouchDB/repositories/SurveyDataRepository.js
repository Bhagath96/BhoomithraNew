import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import Schemas, { getPouchDB } from '../pouchDB';

const { SurveyDataSchema, SurveyDataReadOnlySchema } = Schemas;

const getDB = (isReadOnly) => {
    let schema = isReadOnly ? SurveyDataReadOnlySchema.name : SurveyDataSchema.name;
    return getPouchDB(schema);
};

async function findDataById(id, isReadOnly = false) {
    if (!id) {
        throw 'Error: id cannot be empty';
    }
    const db = getDB(isReadOnly);
    await db.createIndex({
        index: {
            fields: ['id']
        }
    });
    const responseObj = await db.find({
        selector: {
            id: id
        }
    });

    const data = _.head(_.get(responseObj, 'docs', []));
    return data;
}

const SurveyDataRepository = {

    findById: async (id, useReadOnlySchema) => {
        const data = await findDataById(id, useReadOnlySchema);
        return data;
    },

    findBasicDetailsById: async (id) => {
        const data = await findDataById(id);
        if (data) {
            return {
                completed: data.completed,
                waitingForSync: data.waitingForSync,
                lastModifiedAt: data.lastModifiedAt
            };
        } else {
            return data;
        }
    },

    findDataSourcesById: async (id) => {
        const data = await findDataById(id);
        if (data) {
            return JSON.parse(data.dataSources);
        } else {
            return data;
        }
    },

    findPhotoById: async (id, photoId) => {
        const data = await findDataById(id);
        return JSON.parse(data.answers)[photoId];
    },

    // findPhotosOf: (input) => {
    //     const output = {};
    //     if (_.isEmpty(input)) {
    //         return output;
    //     }
    //     const realmObjects = realm.objects(SurveyDataSchema.name).filtered(Object.keys(input).map((item) => 'id = "' + item + '"').join(' OR '));
    //     if (realmObjects.isEmpty()) {
    //         return output;
    //     }
    //     realmObjects.forEach(realmObject => {
    //         output[realmObject.id] = JSON.parse(realmObject.answers)[input[realmObject.id]];
    //     });
    //     return output;
    // },

    existsById: async (id, useReadOnlySchema) => {
        const data = await findDataById(id, useReadOnlySchema);
        return data ? true : false;
    },

    isEmpty: async (useReadOnlySchema) => {
        const db = getDB(useReadOnlySchema);
        const responseObj = await db.allDocs();
        return _.isEmpty(_.get(responseObj, 'rows', []));
    },

    findByTemplateTypeIdAndSynced: async (templateTypeId, synced, sortDescriptor) => {
        const { descriptor = 'templateTypeId', reverse = false } = sortDescriptor;
        const db = getDB();
        await db.createIndex({
            index: {
                fields: ['templateTypeId', 'synced']
            }
        });

        let responseObj = await db.find({
            selector: {
                templateTypeId: templateTypeId,
                synced: { $and: synced }
            },
            sort: [{ [descriptor]: reverse ? 'desc' : 'asc' }]
        });

        const data = _.get(responseObj, 'docs', []);
        return data;
    },

    save: async (input, useReadOnlySchema) => {
        if (!input) {
            throw 'Error: input is empty';
        }
        const { id: inputId, ...rest } = input;
        const db = getDB(useReadOnlySchema);
        const currentId = inputId || uuidv4();
        let response = await db.upsert(currentId, function () {
            return {
                _id: currentId,
                id: currentId,
                ...rest
            };
        });
        const data = await findDataById(response.id);
        return data;

        // const data = findDataById(currentId, useReadOnlySchema);
        // let dataObj = {
        //     _id: currentId,
        //     id: currentId,
        //     ...rest
        // };

        // if (data) {
        //     dataObj._rev = data._rev;
        // }

        // let savedObj = await db.put(dataObj, { force: true });
        // return savedObj;
    },

    // saveCustomerProfileSurveyData: (input) => {
    //     if (_.isEmpty(input)) {
    //         return;
    //     }
    //     const accumulator = [];
    //     if (Array.isArray(input)) {
    //         accumulator.push(...input);
    //     } else {
    //         accumulator.push(input);
    //     }
    //     realm.write(() => {
    //         _.forEach(accumulator, (surveyData) => {
    //             _.forOwn(surveyData, (object) => {
    //                 // For some template types, 'object' can be instance of Array.
    //                 // For others 'object' can be instance of Object.
    //                 if (Array.isArray(object) && object.length) {
    //                     _.forEach(object, (newItem) => {
    //                         realm.create(SurveyDataSchema.name, transformInput(surveyDataDictionaryKeys, newItem), UpdateMode.Modified);
    //                     });
    //                 } else if (!_.isEmpty(object)) {
    //                     const newItem = object;
    //                     realm.create(SurveyDataSchema.name, transformInput(surveyDataDictionaryKeys, newItem), UpdateMode.Modified);
    //                 }
    //             });
    //         });
    //     });
    // },

    deleteById: async (id, useReadOnlySchema) => {
        const data = await findDataById(id, useReadOnlySchema);
        const currentDB = getDB(useReadOnlySchema);
        let deletedId;
        if (data) {
            const response = currentDB.remove(data._id);
            if (_.get(response, 'ok', false)) {
                deletedId = id;
            }
        }
        return deletedId;
    },

    deleteByTemplateTypeIdAndCompleted: async (templateTypeId, completed) => {
        let deletedIds = [];
        const db = getDB();
        await db.createIndex({
            index: {
                fields: ['templateTypeId', 'completed']
            }
        });

        let responseObj = await db.find({
            selector: {
                templateTypeId: templateTypeId,
                completed: { $and: completed }
            }
        });

        const filtered = _.get(responseObj, 'docs', []);

        if (filtered.length) {
            for (const item of filtered) {
                let response = await db.remove(item);
                if (_.get(response, 'ok', false)) {
                    deletedIds.push(item.id);
                }
            }
        }
        return deletedIds;
    },

    findByWaitingForSync: async (waitingForSync, sortDescriptor = {}) => {
        const db = getDB();
        const { descriptor = 'templateTypeId', reverse = false } = sortDescriptor;

        await db.createIndex({
            index: {
                fields: ['templateTypeId', 'waitingForSync']
            }
        });

        let responseObj = await db.find({
            selector: {
                $and: [
                    { templateTypeId: { $gt: null } },
                    { waitingForSync: waitingForSync }
                ]
            },
            sort: [
                { [descriptor]: reverse ? 'desc' : 'asc' }
            ]
        });

        const data = _.get(responseObj, 'docs', []);
        return data;
    },

    deleteSyncedData: async (waitingForSync, sortDescriptor = {}) => {
        const db = getDB();
        const { descriptor = 'templateTypeId', reverse = false } = sortDescriptor;

        await db.createIndex({
            index: {
                fields: ['templateTypeId', 'waitingForSync']
            }
        });

        let responseObj = await db.find({
            selector: {
                $and: [
                    { templateTypeId: { $gt: null } },
                    { waitingForSync: waitingForSync }
                ]
            },
            sort: [
                { [descriptor]: reverse ? 'desc' : 'asc' }
            ]
        });

        const filtered = _.get(responseObj, 'docs', []);
        let deletedIds = [];
        if (filtered.length) {
            for (const item of filtered) {
                let response = await db.remove(item);
                if (_.get(response, 'ok', false)) {
                    deletedIds.push(item.id);
                }
            }
        }
        return deletedIds;
    },

    // existsByWaitingForSync: (waitingForSync) => {
    //     const realmObjects = realm.objects(SurveyDataSchema.name);
    //     let filtered = realmObjects.filtered('waitingForSync == $0', waitingForSync);
    //     return !filtered.isEmpty();
    // },

    findByTemplateTypeIdAndAdditionalInfo: async (templateTypeId, additionalInfo) => {
        if (!Array.isArray(additionalInfo)) {
            throw 'Error: additionalInfo must be of type array';
        }
        const db = getDB();
        await db.createIndex({
            index: {
                fields: ['templateTypeId', 'additionalInfo']
            }
        });
        let selector = { templateTypeId };
        if (additionalInfo.length > 0) {
            selector.$and = [
                {
                    'additionalInfo.key': _.get(additionalInfo[0], 'key', 0),
                    'additionalInfo.value': _.get(additionalInfo[0], 'value', '')
                }
            ];
        }

        let responseObj = await db.find({
            selector: selector
        });
        const filteredResponse = _.get(responseObj, 'docs', []);
        let filtered = [];

        for (const filterItem of filteredResponse) {
            let exists = true;
            let currentAdditionalIfo = _.get(filterItem, 'additionalInfo', []);
            for (const additionalInfoItem of additionalInfo) {
                if (!_.find(currentAdditionalIfo, { key: additionalInfoItem.key || 0, value: JSON.stringify(additionalInfoItem.value) })) {
                    exists = false;
                }
            }
            if (exists) {
                filtered.push(filterItem);
            }
        }

        const length = filtered.length;
        if (length > 1) {
            throw 'Error: Query expected to return 0 or 1 record but received ' + length + 'records';
        } else if (filtered.isEmpty()) {
            return undefined;
        } else {
            const response = filtered[0];
            const output = {
                id: response.id,
                completed: response.completed
            };
            return output;
        }
    },

    // countByTemplateTypeIdAndCompletedAndSynced: (templateTypeId, completed, synced) => {
    //     const realmObjects = realm.objects(SurveyDataSchema.name);
    //     const filtered = realmObjects.filtered('templateTypeId == $0 && completed == $1 && synced == $2', templateTypeId, completed, synced);
    //     return filtered.length;
    // },

    // findByTemplateTypeId: (templateTypeId) => {
    //     const realmObjects = realm.objects(SurveyDataSchema.name);
    //     const filtered = realmObjects.filtered('templateTypeId == $0', templateTypeId);
    //     const output = filtered.toJSON();
    //     return _.isEmpty(output) ? undefined : transformOutput(surveyDataDictionaryKeys, output);
    // },

    // existsByCompleted: (completed) => {
    //     const realmObjects = realm.objects(SurveyDataSchema.name);
    //     const filtered = realmObjects.filtered('completed == $0', completed);
    //     return !filtered.isEmpty();
    // },

    deleteAll: (useReadOnlySchema) => {
        const currentDB = getDB(useReadOnlySchema);
        currentDB.destroy();
    }

};

export default SurveyDataRepository;
