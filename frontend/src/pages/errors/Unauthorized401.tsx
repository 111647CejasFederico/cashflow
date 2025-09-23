import { useTranslation } from "react-i18next";

export default function Unauthorized401() {
  const { t } = useTranslation("ui");
  return (
    <div className="p-6">
      <h1 className="text-2xl">401</h1>
      <p>{t("errors.error401")}</p>
    </div>
  );
}
