import { useTranslation } from "react-i18next";

export default function Error500() {
  const { t } = useTranslation("ui");
  return (
    <div className="p-6">
      <h1 className="text-2xl">500</h1>
      <p>{t("errors.error500")}</p>
    </div>
  );
}
