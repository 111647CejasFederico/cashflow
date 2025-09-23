import { useEffect, useState } from "react";

import { toastBus, type ToastMsg } from "./ToastBus";

export default function ToastContainer() {
  const [items, setItems] = useState<ToastMsg[]>([]);
  useEffect(() => {
    const h = (e: Event) => {
      const ce = e as CustomEvent<Omit<ToastMsg, "id">>;
      const id = Date.now() + Math.random();
      const item: ToastMsg = { id, ...ce.detail };
      setItems((v) => [...v, item]);
      setTimeout(() => setItems((v) => v.filter((x) => x.id !== id)), 3000);
    };
    toastBus.addEventListener("toast", h);
    return () => toastBus.removeEventListener("toast", h);
  }, []);

  return (
    <div className="fixed right-4 bottom-4 space-y-2 z-50">
      {items.map((i) => (
        <div
          key={i.id}
          className={`px-3 py-2 rounded shadow text-white ${
            i.type === "error"
              ? "bg-red-600"
              : i.type === "success"
                ? "bg-green-600"
                : "bg-gray-800"
          }`}
        >
          {i.text}
        </div>
      ))}
    </div>
  );
}
