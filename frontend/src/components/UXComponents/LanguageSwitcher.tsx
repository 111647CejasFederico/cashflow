import { useTranslation } from "react-i18next";

import { Button } from "../basics";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation("LanguageSwitcher");
  const change = (lng: "en" | "es") => i18n.changeLanguage(lng);
  const currentLang = i18n.language.split("-")[0] as "en" | "es";
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Button onClick={() => change("en")} disabled={currentLang === "en"}>
        {t("en")}
      </Button>
      <Button onClick={() => change("es")} disabled={currentLang === "es"}>
        {t("es")}
      </Button>
    </div>
  );
}
