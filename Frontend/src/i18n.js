import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi) // Load translations from JSON files
  .use(LanguageDetector) // Detect the user's preferred language
  .use(initReactI18next) // Pass the i18n instance to react-i18next
  .init({
    supportedLngs: ['en', 'ar'], // Only English and Arabic
    fallbackLng: 'en', // Default language
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie'], // Cache detected language
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Path to translation files
    },
    react: {
      useSuspense: false, // Disable suspense fallback (optional)
    },
  });

export default i18n;
