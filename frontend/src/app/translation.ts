import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../locales/en.json";
import es from "../locales/es.json";
const ENV = import.meta.env.VITE_ENV;

export const resources = {
  en,
  es,
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "es"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "cookie"],
      caches: ["localStorage"],
    },
    nsSeparator: ".",
    debug: ENV === "development",
  });

export default i18n;
