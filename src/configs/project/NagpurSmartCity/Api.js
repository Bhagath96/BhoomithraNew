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
        ...defaultValues,
        apiServer: {
            url: 'https://api-dev.smartgms.in:9443'
        },
        authServer: {
            url: 'https://api-dev.smartgms.in:8443'
        }
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
            url: 'https://api-nagpursmartcity.smartgms.in:9443'
        },
        authServer: {
            url: 'https://api-nagpursmartcity.smartgms.in:8443'
        }
    }
};

export default urls;
