export type ConfirmPayload = { title: string; message?: string; resolve: (v: boolean) => void };
export const confirmBus = new EventTarget();

export function confirm(opts: { title: string; message?: string }): Promise<boolean> {
  return new Promise((resolve) => {
    const detail: ConfirmPayload = { ...opts, resolve };
    confirmBus.dispatchEvent(new CustomEvent<ConfirmPayload>("confirm", { detail }));
  });
}
