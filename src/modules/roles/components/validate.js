import { I18n } from '../../../common/components';
import _ from 'lodash';
export const checkIfDuplicateExists = (w) => {
    return new Set(w).size !== w.length;
};
const dataAccessValidations = values => {
    // let newArray = [];
    let duplicateExistForLabel = false;

    const errors = {};
    Object.keys(values).forEach(element => {
        if (element.length === 0) {
            errors[element] = I18n.t('required', { type: I18n.t('level') });
        } else {
            let arrayForDataAccess = [];
            const membersArrayErrors = [];
            values[element].forEach((member, memberIndex) => {
                const memberErrors = {};
                if (member.dataAccessId) {
                    arrayForDataAccess.push(Number(_.get(member, 'dataAccessId.id', _.get(member, 'dataAccessId', 0))));
                }
                if (!member || !member.dataAccessId) {
                    memberErrors.dataAccessId = I18n.t(I18n.t('required'));
                    membersArrayErrors[memberIndex] = memberErrors;
                }
                if (!member || !member.noOfData) {
                    memberErrors.noOfData = I18n.t(I18n.t('required'));
                    membersArrayErrors[memberIndex] = memberErrors;
                } else if (member.noOfData === 0) {
                    memberErrors.noOfData = I18n.t(I18n.t('required'));
                    membersArrayErrors[memberIndex] = memberErrors;
                }
                if (arrayForDataAccess.length > 0) {
                    duplicateExistForLabel = checkIfDuplicateExists(arrayForDataAccess);
                }
                if (duplicateExistForLabel === true && arrayForDataAccess.length > 0) {
                    memberErrors.dataAccessId = I18n.t('same_values_error', { type: I18n.t('level') });
                    membersArrayErrors[memberIndex] = memberErrors;
                }

            });
            if (membersArrayErrors.length) {
                errors[element] = membersArrayErrors;
            }
        }
    });
    return errors;

};
export default dataAccessValidations;
