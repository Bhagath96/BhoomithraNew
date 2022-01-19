import { PORTALS } from '..';

const defaultValues =
{
    [PORTALS.ADMIN]: {
        url: 'https://portal.harithamithram.suchitwamission.com/'
    },
    [PORTALS.WEB]: {
        url: 'https://mail.google.com/'
    }
};

const portal = {
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

export default portal;

