export type ToastType = "info" | "success" | "error";
export type ToastMsg = { id: number; text: string; type?: ToastType };

export const toastBus = new EventTarget();

export function toast(text: string, type: ToastType = "info") {
  toastBus.dispatchEvent(
    new CustomEvent<Omit<ToastMsg, "id">>("toast", { detail: { text, type } })
  );
}
