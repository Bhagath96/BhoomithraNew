import { I18n } from '../../../../common/components';
const checkIfDuplicateExists = (w) => {
    return new Set(w).size !== w.length;
};

const validate = values => {
    // let newArray = [];
    let arrayForLanguages = [];
    let duplicateExistForLabel = false;


    const errors = {};
    if (!values.label || !values.label.length) {
        // errors.label = { _error: 'At least one label must be entered' };
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
                memberErrors.langId = I18n.t(I18n.t('required'));
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
    return errors;

};

export default validate;
