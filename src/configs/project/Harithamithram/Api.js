const defaultValues = {
    apiServer: {
        url: 'https://api-dev.smartgms.in:9443'
    },
    authServer: {
        url: 'https://api-dev.smartgms.in:8443'
    }
};

const urls = {
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
        ...defaultValues,
        apiServer: {
            url: 'https://api.harithamithram.suchitwamission.com:9443'
        },
        authServer: {
            url: 'https://api.harithamithram.suchitwamission.com:8443'
        }
    }
};

export default urls;
