import _ from '../../../utils/LodashUtils';
import { I18n } from '../../../common/components';
const checkIfDuplicateExists = (w) => {
    return new Set(w).size !== w.length;
};
//Validations for TitleQuestionValidation
export const titleQuestionValidation = (values) => {
    let validations = _.get(values, 'questionValidation', []);
    let comparisonsArray = [];
    let duplicateExist = false;
    const errors = {};
    if (validations?.length > 0) {
        for (let [index, validation] of validations.entries()) {
            if (_.get(validation, 'question', null) === null) {
                _.set(errors, `questionValidation[${index}].question`, I18n.t('required'));
            } else if (_.get(validation, 'validationType', null) === null) {
                _.set(errors, `questionValidation[${index}].validationType`, I18n.t('required'));
            } else if (_.get(validation, 'dependentQuestion', null) === null) {
                _.set(errors, `questionValidation[${index}].dependentQuestion`, I18n.t('required'));
            } else {
                if (typeof _.find(comparisonsArray, validation) === 'undefined') {
                    comparisonsArray.push(validation);
                } else {
                    _.set(errors, `questionValidation[${index}].question`, I18n.t('duplicate_question_error'));
                    _.set(errors, `questionValidation[${index}].validationType`, I18n.t('duplicate_question_error'));
                    _.set(errors, `questionValidation[${index}].dependentQuestion`, I18n.t('duplicate_question_error'));
                }
            }
            if (_.get(validation, 'errorMessages', []).length === 0) {
                _.set(errors, `questionValidation[${index}].errorMessages`, I18n.t('required'));
            } else {
                const membersArrayErrors = [];
                let newArray = [];
                _.get(validation, 'errorMessages', []).forEach((member, memberIndex) => {
                    const memberErrors = {};
                    if (!member || !member.label) {
                        memberErrors.label = I18n.t('required', { type: I18n.t('label') });
                        membersArrayErrors[memberIndex] = memberErrors;
                    }
                    if (!member || !member.langId) {
                        memberErrors.langId = I18n.t('required', { type: I18n.t('language') });
                        membersArrayErrors[memberIndex] = memberErrors;
                    } else if (member.langId) {
                        newArray.push(Number(member.langId));
                    }
                    if (newArray.length > 0) {
                        duplicateExist = checkIfDuplicateExists(newArray);
                    }
                    if (duplicateExist === true && newArray.length > 0) {
                        memberErrors.langId = I18n.t('same_values_error', { type: I18n.t('language') });
                        membersArrayErrors[memberIndex] = memberErrors;
                    }
                });
                if (membersArrayErrors.length) {
                    _.set(errors, `questionValidation[${index}].errorMessages`, membersArrayErrors);
                }
            }
        }
    }
    return errors;
};

//
const validate = (values) => {
    let validations = _.get(values, 'option', []);
    let comparisonsArray = [];
    let duplicateExist = false;
    const errors = {};
    if (!values.name) {
        errors.name = I18n.t('required', { type: I18n.t('name') });
    }
    if (values.name?.length > 20) {
        errors.name = I18n.t('length_error', { type: I18n.t('name'), size: 20 });

    }
    if (!values.key) {
        errors.key = I18n.t('required', { type: I18n.t('key') });
    }
    if (values.key?.length > 20) {
        errors.key = I18n.t('length_error', { type: I18n.t('key'), size: 20 });
    }
    if (validations?.length > 0) {
        for (let [index, validation] of validations.entries()) {
            if (_.get(validation, 'question', null) === null) {
                _.set(errors, `option[${index}].question`, I18n.t('required'));
            } else if (_.get(validation, 'validationType', null) === null) {
                _.set(errors, `option[${index}].validationType`, I18n.t('required'));
            } else if (_.get(validation, 'questionOption', null) === null) {
                _.set(errors, `option[${index}].questionOption`, I18n.t('required'));
            } else if (_.get(validation, 'dependentQuestion', null) === null) {
                _.set(errors, `option[${index}].dependentQuestion`, I18n.t('required'));
            } else {
                if (typeof _.find(comparisonsArray, validation) === 'undefined') {
                    comparisonsArray.push(validation);
                } else {
                    _.set(errors, `option[${index}].question`, I18n.t('duplicate_question_error'));
                    _.set(errors, `option[${index}].validationType`, I18n.t('duplicate_question_error'));
                    _.set(errors, `option[${index}].dependentQuestion`, I18n.t('duplicate_question_error'));
                }
            }
            if (_.get(validation, 'errorMessages', []).length === 0) {
                _.set(errors, `option[${index}].errorMessages`, I18n.t('required'));
            } else {
                const membersArrayErrors = [];
                let newArray = [];
                _.get(validation, 'errorMessages', []).forEach((member, memberIndex) => {
                    const memberErrors = {};
                    if (!member || !member.label) {
                        memberErrors.label = I18n.t('required', { type: I18n.t('label') });
                        membersArrayErrors[memberIndex] = memberErrors;
                    }
                    if (!member || !member.langId) {
                        memberErrors.langId = I18n.t('required', { type: I18n.t('language') });
                        membersArrayErrors[memberIndex] = memberErrors;
                    } else if (member.langId) {
                        newArray.push(Number(member.langId));
                    }
                    if (newArray.length > 0) {
                        duplicateExist = checkIfDuplicateExists(newArray);
                    }
                    if (duplicateExist === true && newArray.length > 0) {
                        memberErrors.langId = I18n.t('same_values_error', { type: I18n.t('language') });
                        membersArrayErrors[memberIndex] = memberErrors;
                    }
                });
                if (membersArrayErrors.length) {
                    _.set(errors, `option[${index}].errorMessages`, membersArrayErrors);
                }
            }
        }
    }
    return errors;
};

export default validate;
