import { useTranslation } from "react-i18next";

export default function NotFound404() {
  const { t } = useTranslation("ui");
  return (
    <div className="p-6">
      <h1 className="text-2xl">404</h1>
      <p>{t("errors.error404")}</p>
    </div>
  );
}
