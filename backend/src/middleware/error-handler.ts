import type { NextFunction, Request, Response } from "express";

export default function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  const t = (req as any).t ?? ((k: string) => k);
  const status = err.status ?? 500;
  const code = err.code ?? "SERVER_ERROR";
  res
    .status(status)
    .json({ code, message: t(`errors:${code.toLowerCase()}`, { defaultValue: t("errors:server") }), details: err.details ?? undefined });
}
