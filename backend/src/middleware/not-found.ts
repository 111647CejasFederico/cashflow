import type { Request, Response } from "express";

export default function notFound(_req: Request, res: Response) {
  const t = (res.req as Request).t ?? ((k: string) => k);
  res.status(404).json({ code: "NOT_FOUND", message: t("errors:notFound") });
}
