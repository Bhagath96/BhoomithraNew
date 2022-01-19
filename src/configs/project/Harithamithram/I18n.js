const defaultValues = {
    defaultLanguage: 'en-IN',
    en: {
        harithamithram: 'Harithamithram',
        govOfKerala: 'Govt. Of Kerala',
        slogan: 'Progress is impossible without change, and those who cannot change their minds cannot change anything'
    },
    ml: {
        harithamithram: 'ഹരിതമിത്രം',
        govOfKerala: 'കേരള സർക്കാർ',
        slogan: 'മാറ്റമില്ലാതെ പുരോഗതി അസാധ്യമാണ്, മനസ്സ് മാറ്റാൻ കഴിയാത്തവർക്ക് ഒന്നും മാറ്റാൻ കഴിയില്ല'
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
