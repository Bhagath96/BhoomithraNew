import { I18n } from '../../../common/components';
const checkIfDuplicateExists = (w) => {
    return new Set(w).size !== w.length;
};

const validate = values => {
    const errors = {};
    let newArray = [];
    let sortOrderCheckArray = [];
    let duplicateSortOrder = false;
    let duplicateExist = false;

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
    if (!values.label || !values.label.length) {
        errors.label = { _error: I18n.t('required', { type: I18n.t('label') }) };
    } else {
        const membersArrayErrors = [];
        values.label.forEach((member, memberIndex) => {
            const memberErrors = {};
            if (!member || !member.label) {
                memberErrors.label = I18n.t('required', { type: I18n.t('label') });
                membersArrayErrors[memberIndex] = memberErrors;
            }
            if (!member || !member.langId) {
                memberErrors.langId = I18n.t('required', { type: I18n.t('language') });
                membersArrayErrors[memberIndex] = memberErrors;
            }
            if (member.langId) {
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
            errors.label = membersArrayErrors;
        }
    }

    if (!values.data || !values.data.length) {
        errors.data = I18n.t('required', { type: I18n.t('label') });
    } else {
        const membersArrayErrors = [];
        values.data.forEach((member, memberIndex) => {
            const memberErrors = {};
            if (!member || !member.title) {
                memberErrors.title = I18n.t('required', { type: I18n.t('title') });
                membersArrayErrors[memberIndex] = memberErrors;
            }
            if (!member || !member.sort) {
                memberErrors.sort = I18n.t('required', { type: I18n.t('sort_order') });
                membersArrayErrors[memberIndex] = memberErrors;
            } if (isNaN(Number(member.sort))) {
                memberErrors.sort = I18n.t('must_be_number');
                membersArrayErrors[memberIndex] = memberErrors;
            }

            if (member.sort) {
                sortOrderCheckArray.push(Number(member.sort));

            }
            if (sortOrderCheckArray.length > 0) {
                duplicateSortOrder = checkIfDuplicateExists(sortOrderCheckArray);
            }
            if (duplicateSortOrder === true && sortOrderCheckArray.length > 0) {
                memberErrors.sort = I18n.t('same_values_error', { type: I18n.t('sort_order') });
                membersArrayErrors[memberIndex] = memberErrors;
            }
        });
        if (membersArrayErrors.length) {
            errors.data = membersArrayErrors;
        }
    }
    return errors;
};

export default validate;
