const defaultValues = {
    defaultLanguage: 'en-IN',
    en: {
        nagpurSmartCity: 'Nagpur Smart City',
        slogan: 'Progress is impossible without change, and those who cannot change their minds cannot change anything'
    },
    mr: {
        nagpurSmartCity: 'नागपूर स्मार्ट सिटी',
        slogan: 'बदल केल्याशिवाय प्रगती अशक्य आहे आणि जे आपले विचार बदलू शकत नाहीत ते काहीही बदलू शकत नाहीत'
    }
};

const language = {
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

export default language;
