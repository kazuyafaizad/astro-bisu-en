import en from "./en.json";

const translations = {
    en,
};

export default function getTranslations(lang) {
    const language = translations[lang] || {};

    return {
        ...en, // Use en as a fallback in case there are translations missing for the desired language.
        ...language,
    };
}
