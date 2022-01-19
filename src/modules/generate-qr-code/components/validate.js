import { I18n } from '../../../common/components';

const validate = values => {
    // let newArray = [];
    const errors = {};
    if (!values.noQRCode || !values.noQRCode) {
        errors.noQRCode = I18n.t('required', { type: I18n.t('no_of_QR_codes') });
    } else if (values.noQRCode > 50) {
        errors.noQRCode = I18n.t('maximum_allowed_count', { count: 50 });
    }
    if (!values.organization) {
        errors.organization = I18n.t('required', { type: I18n.t('organization') });
    }
    return errors;
};

export default validate;
