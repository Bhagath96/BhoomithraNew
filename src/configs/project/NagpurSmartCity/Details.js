import Logo from '../../../assets/image/NagpurSmartCity/Logo.png';
import Banner from '../../../assets/image/NagpurSmartCity/Banner.png';

const defaultValues = {
    LOGO_MENU: Logo,
    LOGO_LOGIN: Logo,
    BANNER_LOGIN: Banner,
    VERSION: '1.0.0',
    NAME: 'nagpurSmartCity',
    COPY_RIGHT: 'nagpurSmartCity',
    POWERED_BY: 'nagpurSmartCity',
    SLOGAN: 'slogan',
    REPORT: {
        header1: 'harithamithram',
        header2: 'govOfKerala',
        logo1: 'data:image/png;base64,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'
    }
};

const details = {
    local: {
        ...defaultValues
    },
    dev: {
        ...defaultValues
    },
    stage: {
        ...defaultValues
    },
    test: {
        ...defaultValues
    },
    prod: {
        ...defaultValues
    }
};

export default details;
