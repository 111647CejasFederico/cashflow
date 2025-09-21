// src/utils/query.ts
import type { Request } from "express";

type FieldType = "string" | "number" | "boolean" | undefined;
type Spec = Record<string, FieldType>;

type Out<S extends Spec> = {
  [K in keyof S]: S[K] extends "string"
    ? string | undefined
    : S[K] extends "number"
    ? number | undefined
    : S[K] extends "boolean"
    ? boolean | undefined
    : undefined;
};

const pickRaw = (req: Request, k: string): unknown => {
  return (req.body as any)[k];
};

const parse = (raw: unknown, t: FieldType) => {
  if (raw === undefined) return undefined;
  if (raw === null) return null;

  if (t === "number") {
    if (raw === "") return null;
    if (typeof raw === "number") return raw;
    if (typeof raw === "string") {
      const n = Number(raw);
      return Number.isNaN(n) ? undefined : n;
    }
    return undefined;
  }

  if (t === "boolean") {
    if (raw === "") return null;
    if (typeof raw === "boolean") return raw;
    if (typeof raw === "string") {
      const s = raw.toLowerCase();
      if (s === "true") return true;
      if (s === "false") return false;
    }
    return undefined;
  }

  if (t === "string") {
    if (typeof raw === "string") return raw;
    if (typeof raw === "number") return String(raw);
    return undefined;
  }

  return raw;
};

export const mapBody = <S extends Spec>(req: Request, spec: S): Out<S> => {
  const out: any = {};
  for (const k of Object.keys(spec)) {
    out[k] = parse(pickRaw(req, k), spec[k]);
  }
  return out as Out<S>;
};
