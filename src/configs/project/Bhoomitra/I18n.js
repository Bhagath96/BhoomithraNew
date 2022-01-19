const defaultValues = {
    defaultLanguage: 'en-IN',
    en: {
        bhoomitra: 'Bhoomithra',
        trois: 'Trois Infotech',
        slogan: 'Progress is impossible without change, and those who cannot change their minds cannot change anything'
    },
    ml: {
        bhoomitra: 'ഭൂമിത്ര',
        trois: 'ട്രോയിസ് ഇൻഫോടെക്',
        slogan: 'മാറ്റമില്ലാതെ പുരോഗതി അസാധ്യമാണ്, മനസ്സ് മാറ്റാൻ കഴിയാത്തവർക്ക് ഒന്നും മാറ്റാൻ കഴിയില്ല'
    },
    mr: {
        bhoomitra: 'भूमित्रा',
        trois: 'ट्रॉइस इन्फोटेक',
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
