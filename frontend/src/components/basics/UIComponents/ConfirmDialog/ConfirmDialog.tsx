import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "../../FormComponents/Button";
import { confirmBus, type ConfirmPayload } from "./ConfirmDialogBus";

type Ask = ConfirmPayload & { id: number };

export default function ConfirmDialog() {
  const [q, setQ] = useState<Ask | null>(null);
  const { t } = useTranslation("ui");

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<ConfirmPayload>;
      setQ({ id: Date.now(), ...ce.detail });
    };
    confirmBus.addEventListener("confirm", handler);
    return () => confirmBus.removeEventListener("confirm", handler);
  }, []);

  if (!q) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-4 rounded shadow max-w-sm w-full">
        <h3 className="font-semibold mb-2">{q.title}</h3>
        {q.message && <p className="mb-4">{q.message}</p>}
        <div className="flex justify-end gap-2">
          <Button
            className="border px-3 py-1"
            onClick={() => {
              q.resolve(false);
              setQ(null);
            }}
          >
            {t("ConfirmDialog.cancel")}
          </Button>
          <Button
            className="border px-3 py-1 bg-red-600 text-white"
            onClick={() => {
              q.resolve(true);
              setQ(null);
            }}
          >
            {t("ConfirmDialog.confirm")}
          </Button>
        </div>
      </div>
    </div>
  );
}
