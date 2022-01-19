import _ from '../../utils/LodashUtils';
import { I18n } from '../../common/components';

export const addTemplate = (values) => {
    let version = _.get(values, 'version', null);
    const errors = {};
    if (_.get(values, 'name', null) === null) {
        _.set(errors, 'name', I18n.t('required'));
    }
    if (_.get(values, 'key', null) === null) {
        _.set(errors, 'key', I18n.t('required'));
    }
    if (version === null) {
        _.set(errors, 'version', I18n.t('required'));
    } else if (!/^[0-9]\d{0,2}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}(?:,\d{0,2})?$/.test(version)) {
        _.set(errors, 'version', I18n.t('invalid_version_format'));
    }
    if (_.get(values, 'templateTypeId.id', null) === null) {
        _.set(errors, 'templateTypeId', I18n.t('required'));
    }
    return errors;
};

export const assignFragment = (values) => {
    const errors = {};
    let sort = _.get(values, 'sort', null);

    if (sort === null) {
        _.set(errors, 'sort', I18n.t('required'));
    } else if (!/^[0-9]*$/.test(sort)) {
        _.set(errors, 'sort', I18n.t('must_be_number'));
    }

    if (_.get(values, 'fragment.id', null) === null) {
        _.set(errors, 'fragment', I18n.t('required'));
    }
    return errors;
};

export const addRouteValidation = (values) => {
    const errors = {};
    // can be 0 || -1 then prev and next can be same
    let prev = _.get(values, 'prev.id', 0);
    let next = _.get(values, 'next.id', 0);
    let current = _.get(values, 'fragment.id', null);
    let option = _.get(values, 'option', []);

    if (prev === next && !(prev === 0 || prev === -1)) {
        _.set(errors, 'prev', I18n.t('same_fragment_error'));
    }

    if (option.length > 0) {
        for (let [index, item] of option.entries()) {
            if (_.get(item, 'optionId', null) === null) {
                _.set(errors, `option[${index}].optionId`, I18n.t('required'));
            }
            if (_.get(item, 'next', 0) === 0) {
                _.set(errors, `option[${index}].next`, I18n.t('required'));
            }
        }
        if (next !== -1) {
            _.set(errors, 'next', I18n.t('if_option_dynamic_fragment_error'));
        }
    } else {
        // if (next === -1) {
        //     _.set(errors, 'next', 'At least one Option must be entered');
        // }
        // else if (prev === -1) {
        //     _.set(errors, 'prev', 'At least one Option must be entered');
        // }
    }

    if (current === null) {
        _.set(errors, 'fragment', I18n.t('required', { type: I18n.t('fragment') }));
    } else {
        if (current === next) {
            _.set(errors, 'fragment', I18n.t('same_fragment_error'));
        } else if (current === prev) {
            _.set(errors, 'fragment', I18n.t('same_fragment_error'));
        }
    }

    return errors;
};
