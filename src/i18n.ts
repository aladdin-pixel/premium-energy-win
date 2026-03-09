import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import de from "./locales/de.json";

const resources = {
  en: { translation: en },
  de: { translation: de },
};

const savedLang = localStorage.getItem("premium-energy-lang") as "en" | "de" | null;
const initialLang = savedLang && (savedLang === "en" || savedLang === "de") ? savedLang : "en";

i18n.use(initReactI18next).init({
  resources,
  lng: initialLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

document.documentElement.lang = initialLang;

export default i18n;
