import { I18n } from '../../common/components';

export const validateDataAccessPermissionLevelSelector = values => {
    const errors = {};
    if (!values.state) {
        errors.state = I18n.t('required', { type: I18n.t('state') });
    }
    if (!values.district) {
        errors.district = I18n.t('required', { type: I18n.t('district') });
    }
    if (!values.municipality) {
        errors.municipality = I18n.t('required', { type: I18n.t('municipality') });
    }
    if (!values.ward) {
        errors.ward = I18n.t('required', { type: I18n.t('ward') });
    }
    if (!values.districtPanchayath) {
        errors.districtPanchayath = I18n.t('required', { type: I18n.t('district_panchayath') });
    }
    if (!values.panchayath) {
        errors.panchayath = I18n.t('required', { type: I18n.t('panchayath') });
    }
    if (!values.municipality) {
        errors.municipality = I18n.t('required', { type: I18n.t('municipality') });
    }
    if (!values.corporation) {
        errors.corporation = I18n.t('required', { type: I18n.t('corporation') });
    }
    if (!values.lsgi) {
        errors.lsgi = I18n.t('required', { type: I18n.t('lsgi') });
    }
    if (!values.blockPanchayath) {
        errors.blockPanchayath = I18n.t('required', { type: I18n.t('block_panchayath') });
    }
    if (!values.residenceCategory) {
        errors.residenceCategory = I18n.t('required', { type: I18n.t('residence_category') });
    }


    return errors;
};
