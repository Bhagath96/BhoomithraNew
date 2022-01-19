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
        ...defaultValues
    }
};

export default urls;
