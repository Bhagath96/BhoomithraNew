import _ from 'lodash';
import { I18n } from '../../../common/components';

const checkIfDuplicateExists = (w) => {
    return new Set(w).size !== w.length;
};

const validate = values => {
    // let newArray = [];
    let arrayForLanguages = [];
    let duplicateExistForLabel = false;


    const errors = {};
    if (!values.labels || !values.labels.length) {
        errors.label = { _error: I18n.t('no_label_error') };
    }
    if (!values.name) {
        errors.name = I18n.t('required', { type: I18n.t('name') });
    } else if (values.name?.length > 20) {
        errors.name = I18n.t('length_error', { type: I18n.t('name'), size: 20 });
    } else if (!/^[a-zA-Z0-9]*$/.test(values.name)) {
        errors.name = I18n.t('no_whitespace');
    }
    if (!values.code) {
        errors.code = I18n.t('required', { type: I18n.t('code') });
    }
    if (!values.state) {
        errors.state = I18n.t('required', { type: I18n.t('state') });
    }
    if (!values.district) {
        errors.district = I18n.t('required', { type: I18n.t('district') });
    }
    if (!_.has(values, 'sort') || _.get(values, 'sort', null) === null) {
        _.set(errors, 'sort', I18n.t('required', { type: I18n.t('sort') }));
    }
    if (!values.labels || !values.labels.length) {
        errors.labels = I18n.t('no_label_error');
    } else {
        const membersArrayErrors = [];
        values.labels.forEach((member, memberIndex) => {
            const memberErrors = {};
            if (member.langId) {
                arrayForLanguages.push(Number(member.langId));
            }
            if (!member || !member.langId) {
                memberErrors.langId = I18n.t('required', { type: I18n.t('language') });
                membersArrayErrors[memberIndex] = memberErrors;
            }
            if (!member || !member.label) {
                memberErrors.label = I18n.t('required', { type: I18n.t('label') });
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
            errors.labels = membersArrayErrors;
        }
    }
    return errors;

};

export default validate;
