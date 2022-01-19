import _ from 'lodash';
import { I18n } from '../../common/components';
import cronValidator from 'cron-expression-validator';

export const submitSchedule = (values) => {
    const errors = {};
    if (!_.has(values, 'organization') || _.get(values, 'organization.id', null) === null) {
        _.set(errors, 'organization', I18n.t('required', { type: I18n.t('organization') }));
    }

    if (!_.has(values, 'serviceProvider') || _.get(values, 'serviceProvider.id', null) === null) {
        _.set(errors, 'serviceProvider', I18n.t('required', { type: I18n.t('service_provider') }));
    }

    if (!_.has(values, 'ward') || _.get(values, 'ward.id', null) === null) {
        _.set(errors, 'ward', I18n.t('required', { type: I18n.t('ward') }));
    }

    if (!_.has(values, 'serviceWorker') || _.get(values, 'serviceWorker.id', null) === null) {
        _.set(errors, 'serviceWorker', I18n.t('required', { type: I18n.t('service_worker') }));
    }

    if (!_.has(values, 'serviceConfig') || _.get(values, 'serviceConfig.id', null) === null) {
        _.set(errors, 'serviceConfig', I18n.t('required', { type: I18n.t('service') }));
    }

    if (!_.has(values, 'serviceInterval') || _.get(values, 'serviceInterval.id', null) === null) {
        _.set(errors, 'serviceInterval', I18n.t('required', { type: I18n.t('service_interval') }));
    }

    if (!_.has(values, 'residenceCategory') || _.get(values, 'residenceCategory.id', null) === null) {
        _.set(errors, 'residenceCategory', I18n.t('required', { type: I18n.t('residence_category') }));
    }

    //     if (!_.has(values, 'tradingType') || _.get(values, 'tradingType.id', null) === null) {
    //         _.set(errors, 'tradingType', I18n.t('required', { type: I18n.t('trading_type') }));
    //     }
    //     if (!_.has(values, 'residenceType') || _.get(values, 'residenceType.id', null) === null) {
    //         _.set(errors, 'residenceType', I18n.t('required', { type: I18n.t('residence_associations') }));
    //     }

    if (!_.has(values, 'cronExpression')) {
        _.set(errors, 'cronExpression', I18n.t('required'));
    } else {
        if (!cronValidator.isValidCronExpression(_.get(values, 'cronExpression', null))) {
            _.set(errors, 'cronExpression', I18n.t('invalid_expression'));
        }
    }

    return errors;
};


export const scheduleSearch = (values) => {
    const errors = {};

    if (!_.has(values, 'organization') || _.get(values, 'organization.id', null) === null) {
        _.set(errors, 'organization', I18n.t('required', { type: I18n.t('organization') }));
    }

    if (!_.has(values, 'serviceProvider') || _.get(values, 'serviceProvider.id', null) === null) {
        _.set(errors, 'serviceProvider', I18n.t('required', { type: I18n.t('service_provider') }));
    }

    if (!_.has(values, 'ward') || _.get(values, 'ward.id', null) === null) {
        _.set(errors, 'ward', I18n.t('required', { type: I18n.t('ward') }));
    }

    if (!_.has(values, 'serviceWorker') || _.get(values, 'serviceWorker.id', null) === null) {
        _.set(errors, 'serviceWorker', I18n.t('required', { type: I18n.t('service_worker') }));
    }

    if (!_.has(values, 'serviceConfig') || _.get(values, 'serviceConfig.id', null) === null) {
        _.set(errors, 'serviceConfig', I18n.t('required', { type: I18n.t('service') }));
    }

    if (!_.has(values, 'serviceInterval') || _.get(values, 'serviceInterval.id', null) === null) {
        _.set(errors, 'serviceInterval', I18n.t('required', { type: I18n.t('service_interval') }));
    }

    if (!_.has(values, 'residenceCategory') || _.get(values, 'residenceCategory.id', null) === null) {
        _.set(errors, 'residenceCategory', I18n.t('required', { type: I18n.t('residence_category') }));
    }

    return errors;
};
