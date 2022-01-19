import _ from '../../../utils/LodashUtils';
import { I18n } from '../../../common/components';

const checkIfDuplicateExists = (w) => {
    return new Set(w).size !== w.length;
};

const validate = values => {
    // let newArray = [];
    let arrayForLanguages = [];
    let duplicateExistForLabel = false;


    const errors = {};
    if (!values.label || !values.label.length) {
        errors.label = { _error: I18n.t('required', { type: I18n.t('label') }) };
    }
    if (!values.name) {
        errors.name = I18n.t('required', { type: I18n.t('name') });
    } else if (values.name?.length > 20) {
        errors.name = I18n.t('length_error', { type: I18n.t('name'), size: 20 });
    } else if (!/^[a-zA-Z0-9]*$/.test(values.name)) {
        errors.name = I18n.t('no_whitespace');
    }
    // if (!values.key) {
    //     errors.key = 'Key Required';
    // } else if (values.key?.length > 20) {
    //     errors.key = 'Key should be less than 20 character';
    // }
    if (!values.type) {
        errors.type = I18n.t('required', { type: I18n.t('type') });
    }
    if (!values.option || !values.option.length) {
        errors.option = I18n.t('required', { type: I18n.t('type') });
    } else {
        let newArray = [];
        let newArrayForSortCheck = [];

        values.option.forEach((member, memberIndex) => {
            if (_.get(member, 'value', null) !== null) {
                if (newArray.includes(Number(member.value))) {
                    _.set(errors, `option[${memberIndex}].value`, I18n.t('same_values_error', { type: I18n.t('value') }));
                } else {
                    newArray.push(Number(member.value));
                }
            }
            if (!member.label || !member.label.length) {
                _.set(errors, `option[${memberIndex}].label`, { _error: I18n.t('no_label_error') });
            }
            if (_.get(member, 'sortOrder', null) !== null) {
                if (newArrayForSortCheck.includes(Number(member.sortOrder))) {
                    _.set(errors, `option[${memberIndex}].sortOrder`, I18n.t('same_values_error', { type: I18n.t('sort_order') }));
                } else {
                    newArrayForSortCheck.push(Number(member.sortOrder));
                }
            }
            if (_.get(member, 'value', null) === null) {
                _.set(errors, `option[${memberIndex}].value`, I18n.t('required'));
            }
            if (_.get(member, 'sortOrder', null) === null) {
                _.set(errors, `option[${memberIndex}].sortOrder`, I18n.t('required'));
            }


            let labelOptionArray = member.label;
            let arrayForLabelInsideOption = [];

            labelOptionArray?.map((item, itemIndex) => {
                let langId = _.get(item, 'langId', null);
                if (langId !== null) {
                    if (arrayForLabelInsideOption.includes(Number(item.langId))) {
                        _.set(errors, `option[${memberIndex}].label[${itemIndex}].langId`, I18n.t('same_values_error', { type: I18n.t('language') }));
                    } else {
                        arrayForLabelInsideOption.push(Number(item.langId));
                    }
                } else {
                    _.set(errors, `option[${memberIndex}].label[${itemIndex}].langId`, I18n.t('required'));
                }

                if (_.get(item, 'label', null) === null) {
                    _.set(errors, `option[${memberIndex}].label[${itemIndex}].label`, I18n.t('required'));
                }
            });
        });
    }

    if (!values.label || !values.label.length) {
        errors.label = I18n.t('required', { type: I18n.t('label') });
    } else {
        const membersArrayErrors = [];
        values.label.forEach((member, memberIndex) => {
            const memberErrors = {};
            if (member.langId) {
                arrayForLanguages.push(Number(member.langId));
            }
            if (!member || !member.langId) {
                memberErrors.langId = I18n.t('required');
                membersArrayErrors[memberIndex] = memberErrors;
            }
            if (!member || !member.label) {
                memberErrors.label = I18n.t('required');
                membersArrayErrors[memberIndex] = memberErrors;
            }
            if (arrayForLanguages.length > 0) {
                duplicateExistForLabel = checkIfDuplicateExists(arrayForLanguages);
            }
            if (duplicateExistForLabel === true && arrayForLanguages.length > 0) {
                memberErrors.langId = I18n.t('same_values_error', { type: I18n.t('language') });
                membersArrayErrors[memberIndex] = memberErrors;
            }

        });
        if (membersArrayErrors.length) {
            errors.label = membersArrayErrors;
        }
    }

    if (!values.validation || !values.validation.length) {
        errors.validation = I18n.t('required', { type: I18n.t('label') });
    } else {
        const membersArrayErrors = [];

        values.validation.forEach((member, memberIndex) => {
            let arrayForLabelsInValidation = [];
            let labelOptionArray = member.errorMessage;
            labelOptionArray?.map((item, itemIndex) => {
                let langId = _.get(item, 'langId', null);
                if (langId !== null) {
                    if (arrayForLabelsInValidation.includes(Number(langId))) {
                        _.set(errors, `validation[${memberIndex}].errorMessage[${itemIndex}].langId`, I18n.t('same_values_error', { type: I18n.t('language') }));
                    } else {
                        arrayForLabelsInValidation.push(Number(langId));
                    }
                } else {
                    _.set(errors, `validation[${memberIndex}].errorMessage[${itemIndex}].langId`, I18n.t('required'));
                }

                if (_.get(item, 'label', null) === null) {
                    _.set(errors, `validation[${memberIndex}].errorMessage[${itemIndex}].label`, I18n.t('required'));
                }
            });

        });
        if (membersArrayErrors.length) {
            errors.validation = membersArrayErrors;
        }
    }

    return errors;
};

export default validate;
